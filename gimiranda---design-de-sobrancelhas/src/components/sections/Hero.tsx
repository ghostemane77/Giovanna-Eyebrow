import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ArrowRight, Star, MapPin, Sparkles, Shield } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[var(--color-bg-light)]"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[var(--color-primary)]/8 to-transparent rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[var(--color-nude)]/20 to-transparent rounded-full blur-3xl -z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium mb-6"
            >
              <MapPin size={14} className="fill-current" />
              <span>Especialista em Sobrancelhas • São Vicente</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.08] text-[var(--color-text-dark)] mb-6">
              Design de sobrancelhas{' '}
              <span className="italic text-[var(--color-primary)]">personalizado</span>{' '}
              para valorizar sua beleza natural.
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed font-light">
              Atendimento em São Vicente com foco em simetria, naturalidade e autoestima. Realce sua expressão e valorize o que você tem de único.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-base h-14 px-8 rounded-full shadow-xl shadow-[var(--color-primary)]/30 hover:shadow-2xl hover:shadow-[var(--color-primary)]/50 hover:scale-[1.03] transition-all duration-300 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] border-0"
                onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Agendar seu Horário
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base h-14 px-8 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[var(--color-primary)]/30 transition-all duration-300"
                onClick={() => document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver resultados
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Star size={14} className="text-[var(--color-primary)] fill-current" />
                </div>
                <span>Resultados reais</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Sparkles size={14} className="text-[var(--color-primary)]" />
                </div>
                <span>Atendimento personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Shield size={14} className="text-[var(--color-primary)]" />
                </div>
                <span>Horário marcado</span>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[700px] flex items-center justify-center"
          >
            {/* Decorative ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-[var(--color-primary)]/15 rounded-[2.5rem] -z-0" />

            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/15">
              <img
                src="/images/gallery/depois.jpg"
                alt="Design de Sobrancelhas Premium - Resultado"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[var(--color-primary)]/15 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                  <Star className="fill-current" size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Atendimento Humanizado</p>
                  <p className="text-xs text-gray-500">Experiência única e personalizada</p>
                </div>
              </motion.div>
            </div>

            {/* Small floating card - Before/After */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -left-4 top-1/4 glass p-3 rounded-xl shadow-lg hidden lg:flex items-center gap-3 animate-float"
            >
              <img src="/images/gallery/antes.jpg" alt="Antes" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-semibold text-gray-800">Transformação</p>
                <p className="text-[10px] text-gray-500">Antes & Depois</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
