/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// These should be in .env.local for local development and Vercel environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Mock data for development when Supabase is not fully configured
export const MOCK_SERVICES = [
  {
    id: '1',
    name: 'Design de Sobrancelhas',
    description: 'Mapeamento facial, design personalizado e finalização.',
    duration_minutes: 50,
    price: 60,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Design com Henna',
    description: 'Design personalizado com aplicação de henna para preenchimento e volume.',
    duration_minutes: 50,
    price: 80,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Brow Lamination',
    description: 'Alinhamento dos fios, hidratação e design para um visual mais volumoso e natural.',
    duration_minutes: 50,
    price: 150,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Alinhamento / Correção',
    description: 'Correção de assimetrias e alinhamento estratégico dos fios.',
    duration_minutes: 50,
    price: 70,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Manutenção',
    description: 'Limpeza e manutenção do design (até 20 dias).',
    duration_minutes: 50,
    price: 50,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Avaliação Personalizada',
    description: 'Análise do formato do rosto e indicação do melhor procedimento.',
    duration_minutes: 30,
    price: 0,
    active: true,
    created_at: new Date().toISOString(),
  }
];
