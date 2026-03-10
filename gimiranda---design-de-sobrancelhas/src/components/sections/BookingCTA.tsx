import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { CalendarCheck, MessageCircle } from 'lucide-react';

export function BookingCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-white to-[var(--color-nude)]/20 -z-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--color-primary)]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-[var(--color-nude)]/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center glass p-12 md:p-16 rounded-[3rem] shadow-xl"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-nude)] rounded-2xl flex items-center justify-center text-[var(--color-primary)] mx-auto mb-8">
            <CalendarCheck size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 mb-6 leading-tight">
            Pronta para <span className="italic text-[var(--color-primary)]">transformar</span> seu olhar?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Agende seu horário de forma rápida e prática. Vagas limitadas para garantir o atendimento exclusivo que você merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-base h-14 px-10 rounded-full shadow-xl shadow-[var(--color-primary)]/25 hover:shadow-[var(--color-primary)]/40 hover:scale-[1.02] transition-all duration-300"
              onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reservar meu horário
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base h-14 px-10 rounded-full hover:scale-[1.02] transition-all duration-300"
              onClick={() => window.open('https://wa.me/5513981596725', '_blank')}
            >
              <MessageCircle className="mr-2" size={18} />
              Falar no WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
