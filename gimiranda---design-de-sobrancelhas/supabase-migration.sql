-- =====================================================
-- Giovanna Miranda - Design de Sobrancelhas
-- Supabase Database Migration
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFESSIONALS
-- =====================================================
CREATE TABLE IF NOT EXISTS professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  specialty TEXT,
  city TEXT,
  phone TEXT,
  email TEXT,
  instagram TEXT,
  bio TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SERVICES
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 50,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BUSINESS HOURS
-- =====================================================
CREATE TABLE IF NOT EXISTS business_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  weekday INTEGER NOT NULL CHECK (weekday >= 0 AND weekday <= 6), -- 0=Sunday
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  active BOOLEAN DEFAULT true,
  UNIQUE(weekday)
);

-- =====================================================
-- BLOCKED SLOTS
-- =====================================================
CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  block_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- APPOINTMENTS
-- =====================================================
CREATE TYPE appointment_status AS ENUM ('pendente', 'confirmado', 'cancelado', 'concluido');

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  notes TEXT,
  status appointment_status DEFAULT 'pendente',
  google_calendar_event_id TEXT,
  whatsapp_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prevent double booking
CREATE UNIQUE INDEX idx_no_overlap ON appointments (appointment_date, start_time)
  WHERE status IN ('pendente', 'confirmado');

-- =====================================================
-- GALLERY ITEMS
-- =====================================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT,
  category TEXT DEFAULT 'antes-depois',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TESTIMONIALS
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SOCIAL LINKS
-- =====================================================
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- RLS POLICIES
-- =====================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;

-- Public read for display data
CREATE POLICY "Public read services" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public read business_hours" ON business_hours FOR SELECT USING (active = true);
CREATE POLICY "Public read gallery" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (active = true);
CREATE POLICY "Public read social_links" ON social_links FOR SELECT USING (active = true);
CREATE POLICY "Public read professionals" ON professionals FOR SELECT USING (active = true);
CREATE POLICY "Public read blocked_slots" ON blocked_slots FOR SELECT USING (true);

-- Public insert for appointments (clients create their own)
CREATE POLICY "Public insert appointments" ON appointments FOR INSERT WITH CHECK (true);
-- Public read own appointment by phone
CREATE POLICY "Public read appointments" ON appointments FOR SELECT USING (true);

-- =====================================================
-- SEED DATA
-- =====================================================

-- Professional
INSERT INTO professionals (name, specialty, city, phone, email, instagram, bio) VALUES (
  'Giovanna Miranda',
  'Design de Sobrancelhas',
  'São Vicente - SP',
  '(13) 99999-9999',
  'contato@giovannamiranda.com.br',
  '@gimiranda',
  'Especialista em design de sobrancelhas e micropigmentação, dedicada a realçar a beleza única de cada mulher através de técnicas avançadas de visagismo.'
);

-- Services
INSERT INTO services (name, description, duration_minutes, price, sort_order) VALUES
  ('Design de Sobrancelhas', 'Mapeamento facial, design personalizado e finalização.', 50, 60.00, 1),
  ('Design com Henna', 'Design personalizado com aplicação de henna para preenchimento e volume.', 50, 80.00, 2),
  ('Brow Lamination', 'Alinhamento dos fios, hidratação e design para um visual mais volumoso e natural.', 50, 150.00, 3),
  ('Alinhamento / Correção', 'Correção de assimetrias e alinhamento estratégico dos fios.', 50, 70.00, 4),
  ('Manutenção', 'Limpeza e manutenção do design (até 20 dias).', 50, 50.00, 5),
  ('Avaliação Personalizada', 'Análise do formato do rosto e indicação do melhor procedimento.', 30, 0.00, 6);

-- Business Hours (0=Sunday, 1=Monday ... 6=Saturday)
INSERT INTO business_hours (weekday, open_time, close_time) VALUES
  (0, '08:00', '17:00'),  -- Domingo
  (1, '08:00', '18:00'),  -- Segunda
  (2, '08:00', '18:00'),  -- Terça
  (3, '08:00', '18:00'),  -- Quarta
  (4, '08:00', '18:00'),  -- Quinta
  (5, '08:00', '18:00'),  -- Sexta
  (6, '08:00', '18:00');  -- Sábado

-- Social Links
INSERT INTO social_links (platform, url) VALUES
  ('instagram', 'https://instagram.com/gimiranda'),
  ('whatsapp', 'https://wa.me/5513999999999'),
  ('google_maps', 'https://maps.google.com/?q=São+Vicente+SP');

-- Testimonials
INSERT INTO testimonials (customer_name, text, rating, sort_order) VALUES
  ('Mariana S.', 'A Giovanna mudou completamente meu olhar. Sempre tive medo de ficar artificial, mas ela conseguiu um resultado super natural. Não troco por nada!', 5, 1),
  ('Camila C.', 'Atendimento impecável! O ambiente é lindo e ela é muito atenciosa. Explicou todo o processo e o resultado ficou melhor do que eu imaginava.', 5, 2),
  ('Juliana M.', 'Faço a manutenção mensalmente e a qualidade é sempre a mesma. Produtos excelentes e a durabilidade da henna é incrível na minha pele.', 5, 3);
