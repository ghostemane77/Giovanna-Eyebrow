import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export function About() {
  const stats = [
    { label: 'Anos de Experiência', value: '5+' },
    { label: 'Clientes Atendidas', value: '2.000+' },
    { label: 'Certificações', value: '15+' },
  ];

  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative z-10 w-full max-w-md mx-auto lg:ml-auto shadow-2xl shadow-black/10">
              <img
                src="/images/gallery/profile.jpg"
                alt="Giovanna Miranda - Especialista em Design de Sobrancelhas"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative background shape */}
            <div className="absolute top-8 -left-6 w-[calc(100%+12px)] h-full border border-[var(--color-primary)]/20 rounded-[2rem] -z-0 hidden md:block" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[var(--color-primary)]/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
              Sobre a Especialista
            </h2>
            <div className="section-divider !mx-0 mb-6" />
            <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 leading-tight">
              Mais do que sobrancelhas bonitas,{' '}
              <span className="italic">um atendimento pensado para realçar sua expressão.</span>
            </h3>

            <div className="space-y-5 text-gray-600 font-light leading-relaxed mb-10">
              <p>
                Olá, sou a <strong className="font-medium text-gray-800">Giovanna Miranda</strong>. Especialista em design de sobrancelhas, dedicada a realçar a beleza única de cada mulher através de técnicas avançadas de visagismo.
              </p>
              <p>
                Cada atendimento é pensado de forma única para harmonizar o seu rosto e destacar a sua beleza com naturalidade. Meu trabalho não é sobre seguir padrões, mas sim sobre entender a sua anatomia facial, respeitar a sua essência e entregar um resultado que traga harmonia e sofisticação.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                'Atendimento Personalizado',
                'Foco em Naturalidade',
                'Técnica de Visagismo',
                'Presença Ativa nas Redes'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-[var(--color-primary)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-serif font-medium text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
