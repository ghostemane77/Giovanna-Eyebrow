import { motion } from 'motion/react';
import { Coffee, Heart, Sparkles, UserCheck } from 'lucide-react';

export function Experience() {
  const features = [
    {
      icon: <Coffee size={24} />,
      title: 'Ambiente Acolhedor',
      description: 'Um espaço preparado com carinho para você relaxar enquanto cuidamos da sua beleza.'
    },
    {
      icon: <UserCheck size={24} />,
      title: 'Escuta Ativa',
      description: 'Entendemos seus desejos e medos antes de qualquer procedimento, garantindo segurança.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Cuidado em cada detalhe',
      description: 'Desde a recepção até o pós-atendimento, tudo é pensado para sua melhor experiência.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Personalização Total',
      description: 'Seu rosto é único. Adaptamos as técnicas para valorizar o seu estilo e formato de rosto.'
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-bg-dark)] text-[var(--color-text-light)] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3"
          >
            A Experiência
          </motion.h2>
          <div className="section-divider mb-6" />
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-medium mb-6 leading-tight"
          >
            Muito além de um procedimento estético
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-light leading-relaxed"
          >
            Acreditamos que o cuidado com a beleza deve ser um momento de pausa, relaxamento e reconexão consigo mesma.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-dark p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-[var(--color-primary)]/20 rounded-2xl flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:scale-110 group-hover:bg-[var(--color-primary)]/30 transition-all duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-serif font-medium mb-3">{feature.title}</h4>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
