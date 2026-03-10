import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, Calendar } from 'lucide-react';
import { Button } from '../ui/button';

export function Location() {
  return (
    <section id="localizacao" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium mb-6">
              <MapPin size={14} className="fill-current" />
              <span>Atendimento em São Vicente</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 leading-tight">
              Seu novo espaço de <span className="italic text-[var(--color-primary)]">beleza e bem-estar.</span>
            </h2>

            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Localizado no coração de São Vicente, nosso estúdio oferece um ambiente climatizado, aconchegante e preparado para receber você com todo o conforto que merece.
            </p>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/8 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Endereço</h4>
                  <p className="text-sm text-gray-500 mt-1">Av. Presidente Wilson, 1234 - Sala 56<br />Centro, São Vicente - SP, 11320-000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/8 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Horário de Funcionamento</h4>
                  <p className="text-sm text-gray-500 mt-1">Segunda a Sábado: 08:00 às 18:00<br />Domingo: 08:00 às 17:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/8 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Atendimento</h4>
                  <p className="text-sm text-gray-500 mt-1">Exclusivamente com horário marcado.</p>
                </div>
              </div>
            </div>

            <Button
              className="w-full sm:w-auto h-12 px-8 rounded-full hover:scale-[1.02] transition-transform"
              onClick={() => window.open('https://maps.google.com/?q=São+Vicente+SP', '_blank')}
            >
              <Navigation className="mr-2" size={18} />
              Como chegar
            </Button>
          </motion.div>

          {/* Map/Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden relative z-10 w-full shadow-2xl shadow-black/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58321.03458!2d-46.4!3d-23.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce1b7e2f!4m2!3e0!4m2!3e0!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização - Giovanna Miranda"
                className="w-full h-full"
              />

              <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Estúdio Giovanna Miranda</p>
                  <p className="text-xs text-gray-500">São Vicente, SP</p>
                </div>
                <div className="w-10 h-10 bg-[var(--color-primary)]/15 rounded-xl flex items-center justify-center text-[var(--color-primary)]">
                  <MapPin size={18} className="fill-current" />
                </div>
              </div>
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[var(--color-primary)]/8 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
