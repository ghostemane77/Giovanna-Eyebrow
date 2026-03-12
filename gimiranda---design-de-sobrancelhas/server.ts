import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";

dotenv.config();

// ── Supabase Server Client (Lazy Init) ────────────────────────────
let _supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (_supabase) return _supabase;
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[Supabase] Not configured. API routes will return mock data.");
    return null;
  }
  _supabase = createClient(url, key);
  return _supabase;
}

// ── Mock Services (fallback when Supabase not configured) ─────────
const MOCK_SERVICES = [
  { id: "1", name: "Design de Sobrancelhas", description: "Design personalizado de sobrancelhas com técnicas avançadas de visagismo.", price: 45, duration_minutes: 50, active: true },
  { id: "2", name: "Design + Henna", description: "Design de sobrancelhas com aplicação de henna para um resultado mais marcante.", price: 75, duration_minutes: 60, active: true },
  { id: "3", name: "Manutenção de Sobrancelhas", description: "Manutenção para manter o formato perfeito das sobrancelhas.", price: 35, duration_minutes: 30, active: true },
  { id: "4", name: "Laminação de Sobrancelhas", description: "Técnica que alinha os fios para um efeito penteado e natural.", price: 120, duration_minutes: 60, active: true },
  { id: "5", name: "Avaliação Gratuita", description: "Avaliação sem compromisso para definir o melhor formato para seu rosto.", price: 0, duration_minutes: 20, active: true },
];

// ── Google Calendar Setup ─────────────────────────────────────────
function getCalendarClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

// ── WhatsApp Helper ───────────────────────────────────────────────
async function sendWhatsAppMessage(phone: string, message: string): Promise<boolean> {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const apiToken = process.env.WHATSAPP_API_TOKEN;

  if (!apiUrl || !apiToken) {
    console.log(`[WhatsApp Simulated] To: ${phone} | Message: ${message}`);
    return true;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiToken}` },
      body: JSON.stringify({ phone, message }),
    });
    return response.ok;
  } catch (error) {
    console.error("[WhatsApp Error]", error);
    return false;
  }
}

// ── Helpers ─────────────────────────────────────────────────────
function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatDateBR(dateStr: string): string {
  const [y, mo, d] = dateStr.split("-");
  return `${d}/${mo}/${y}`;
}

function generateLocalSlots(date: string): string[] {
  const d = new Date(date + "T00:00:00");
  const isSunday = d.getDay() === 0;
  const endHour = isSunday ? 17 : 18;
  const slots: string[] = [];
  const now = new Date();
  const isToday = date === now.toISOString().split("T")[0];

  for (let m = 8 * 60; m + 50 <= endHour * 60; m += 50) {
    if (isToday && m <= now.getHours() * 60 + now.getMinutes()) continue;
    slots.push(minutesToTime(m));
  }
  return slots;
}

// ── Server ────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3001", 10);

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", supabase: !!getSupabase(), timestamp: new Date().toISOString() });
  });

  // ── GET /api/services ─────────────────────────────────────────
  app.get("/api/services", async (_req, res) => {
    try {
      const db = getSupabase();
      if (!db) return res.json({ success: true, data: MOCK_SERVICES });

      const { data, error } = await db.from("services").select("*").eq("active", true).order("sort_order");
      if (error) throw error;
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("[Services Error]", error);
      res.json({ success: true, data: MOCK_SERVICES }); // fallback
    }
  });

  // ── GET /api/appointments/availability ────────────────────────
  app.get("/api/appointments/availability", async (req, res) => {
    try {
      const { date } = req.query;
      if (!date || typeof date !== "string") {
        return res.status(400).json({ success: false, error: "Date parameter required (YYYY-MM-DD)" });
      }

      const db = getSupabase();
      if (!db) {
        return res.json({ success: true, slots: generateLocalSlots(date) });
      }

      const targetDate = new Date(date + "T00:00:00");
      const weekday = targetDate.getDay();

      const { data: hours } = await db.from("business_hours").select("*").eq("weekday", weekday).eq("active", true).single();
      if (!hours) return res.json({ success: true, slots: [], message: "Closed" });

      const { data: existing } = await db.from("appointments").select("start_time, end_time").eq("appointment_date", date).in("status", ["pendente", "confirmado"]);
      const { data: blocked } = await db.from("blocked_slots").select("start_time, end_time").eq("block_date", date);

      const slots: string[] = [];
      const openMin = timeToMinutes(hours.open_time);
      const closeMin = timeToMinutes(hours.close_time);
      const now = new Date();
      const isToday = date === now.toISOString().split("T")[0];

      for (let m = openMin; m + 50 <= closeMin; m += 50) {
        if (isToday && m <= now.getHours() * 60 + now.getMinutes()) continue;

        const hasConflict = (existing || []).some((a: any) => m < timeToMinutes(a.end_time) && m + 50 > timeToMinutes(a.start_time));
        const isBlocked = (blocked || []).some((b: any) => m < timeToMinutes(b.end_time) && m + 50 > timeToMinutes(b.start_time));

        if (!hasConflict && !isBlocked) slots.push(minutesToTime(m));
      }

      res.json({ success: true, slots, businessHours: hours });
    } catch (error: any) {
      console.error("[Availability Error]", error);
      const date = req.query.date as string;
      res.json({ success: true, slots: generateLocalSlots(date || new Date().toISOString().split("T")[0]) });
    }
  });

  // ── POST /api/appointments ────────────────────────────────────
  app.post("/api/appointments", async (req, res) => {
    try {
      const { customer_name, customer_phone, customer_email, service_id, appointment_date, start_time, notes } = req.body;

      if (!customer_name || !customer_phone || !service_id || !appointment_date || !start_time) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      const db = getSupabase();

      // Get service for duration
      let service = MOCK_SERVICES.find(s => s.id === service_id);
      if (db) {
        const { data } = await db.from("services").select("*").eq("id", service_id).single();
        if (data) service = data;
      }

      const duration = service?.duration_minutes || 50;
      const startMin = timeToMinutes(start_time);
      const end_time = minutesToTime(startMin + duration);

      if (db) {
        // Check conflicts
        const { data: conflicts } = await db.from("appointments").select("id").eq("appointment_date", appointment_date).in("status", ["pendente", "confirmado"]).gte("end_time", start_time).lte("start_time", end_time);
        if (conflicts && conflicts.length > 0) {
          return res.status(409).json({ success: false, error: "Time slot already taken" });
        }

        // Create appointment
        const { data: appointment, error } = await db.from("appointments").insert({
          customer_name,
          customer_phone,
          customer_email: customer_email || null,
          service_id,
          appointment_date,
          start_time,
          end_time,
          notes: notes || null,
          status: "pendente",
        }).select().single();

        if (error) throw error;

        // Google Calendar
        let googleEventId: string | null = null;
        const calendar = getCalendarClient();
        if (calendar) {
          try {
            const event = await calendar.events.insert({
              calendarId: "primary",
              requestBody: {
                summary: `${service?.name || "Atendimento"} - ${customer_name}`,
                description: `Cliente: ${customer_name}\nTelefone: ${customer_phone}\nServiço: ${service?.name}`,
                start: { dateTime: `${appointment_date}T${start_time}:00`, timeZone: "America/Sao_Paulo" },
                end: { dateTime: `${appointment_date}T${end_time}:00`, timeZone: "America/Sao_Paulo" },
              },
            });
            googleEventId = event.data.id || null;
          } catch (e) { console.error("[Google Calendar]", e); }
        } else {
          googleEventId = `sim_${Date.now()}`;
        }

        if (googleEventId) {
          await db.from("appointments").update({ google_calendar_event_id: googleEventId }).eq("id", appointment.id);
        }

        // WhatsApp
        const msg = `Olá, ${customer_name}! ✨\n\nSeu horário para *${service?.name}* foi confirmado para *${formatDateBR(appointment_date)}* às *${start_time}*.\n\nSe precisar remarcar, entre em contato.\n\n— Giovanna Miranda`;
        const whatsappSent = await sendWhatsAppMessage(customer_phone, msg);

        if (whatsappSent) {
          await db.from("appointments").update({ whatsapp_sent: true, status: "confirmado" }).eq("id", appointment.id);
        }

        return res.json({ success: true, data: { ...appointment, google_calendar_event_id: googleEventId, whatsapp_sent: whatsappSent } });
      }

      // No Supabase - simulated mode
      const mockAppointment = {
        id: `mock_${Date.now()}`,
        customer_name,
        customer_phone,
        service_id,
        appointment_date,
        start_time,
        end_time,
        status: "confirmado",
      };

      const msg = `Olá, ${customer_name}! ✨\nSeu horário para *${service?.name}* foi confirmado para *${formatDateBR(appointment_date)}* às *${start_time}*.\n— Giovanna Miranda`;
      await sendWhatsAppMessage(customer_phone, msg);

      res.json({ success: true, data: mockAppointment, simulated: true });
    } catch (error: any) {
      console.error("[Appointment Error]", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // ── Vite middleware ───────────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ Server running on http://localhost:${PORT}`);
    console.log(`   Supabase: ${getSupabase() ? "Connected" : "Mock Mode"}`);
  });
}

startServer();
