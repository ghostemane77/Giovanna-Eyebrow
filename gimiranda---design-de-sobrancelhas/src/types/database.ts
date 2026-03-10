export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      professionals: {
        Row: {
          id: string
          name: string
          phone: string
          email: string
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email: string
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string
          active?: boolean
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          duration_minutes: number
          price: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          duration_minutes: number
          price: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          duration_minutes?: number
          price?: number
          active?: boolean
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          customer_name: string
          customer_phone: string
          customer_email: string | null
          service_id: string
          appointment_date: string
          start_time: string
          end_time: string
          notes: string | null
          status: 'pendente' | 'confirmado' | 'cancelado' | 'concluido'
          google_calendar_event_id: string | null
          whatsapp_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          service_id: string
          appointment_date: string
          start_time: string
          end_time: string
          notes?: string | null
          status?: 'pendente' | 'confirmado' | 'cancelado' | 'concluido'
          google_calendar_event_id?: string | null
          whatsapp_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          service_id?: string
          appointment_date?: string
          start_time?: string
          end_time?: string
          notes?: string | null
          status?: 'pendente' | 'confirmado' | 'cancelado' | 'concluido'
          google_calendar_event_id?: string | null
          whatsapp_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      business_hours: {
        Row: {
          id: string
          weekday: number // 0 = Sunday, 1 = Monday, etc.
          open_time: string
          close_time: string
          active: boolean
        }
        Insert: {
          id?: string
          weekday: number
          open_time: string
          close_time: string
          active?: boolean
        }
        Update: {
          id?: string
          weekday?: number
          open_time?: string
          close_time?: string
          active?: boolean
        }
      }
      blocked_slots: {
        Row: {
          id: string
          block_date: string
          start_time: string
          end_time: string
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          block_date: string
          start_time: string
          end_time: string
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          block_date?: string
          start_time?: string
          end_time?: string
          reason?: string | null
          created_at?: string
        }
      }
    }
  }
}
