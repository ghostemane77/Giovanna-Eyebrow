import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Clock } from 'lucide-react';
import { MOCK_SERVICES } from '../../lib/supabase';

export function Services() {
  return (
    <section id="servicos" className="py-24 bg-[var(--color-bg-light)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Meus Serviços
          </h2>
          <div className="section-divider mb-6" />
          <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
            Experiências <span className="italic">exclusivas</span>
          </h3>
          <p className="text-gray-600 font-light">
            Cada procedimento é realizado com técnicas avançadas e produtos de alta qualidade, garantindo resultados naturais e duradouros.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SERVICES.filter(s => s.active).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium p-8 flex flex-col h-full group"
            >
              <div className="mb-6">
                <h4 className="text-xl font-serif font-medium text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {service.name}
                </h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100/80">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={16} />
                    <span>{service.duration_minutes} min</span>
                  </div>
                  <div className="text-lg font-serif font-medium text-gray-900">
                    {service.price > 0 ? `R$ ${service.price.toFixed(2)}` : <span className="text-[var(--color-primary)]">Gratuito</span>}
                  </div>
                </div>

                <Button
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform"
                  variant="outline"
                  onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agendar este serviço
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
