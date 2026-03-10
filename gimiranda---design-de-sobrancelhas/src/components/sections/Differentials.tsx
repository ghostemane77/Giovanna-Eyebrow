import { motion } from 'motion/react';
import { Sparkles, Heart, ShieldCheck, Clock, CheckCircle2, MapPin } from 'lucide-react';

export function Differentials() {
  const differentials = [
    {
      icon: <Heart size={24} />,
      title: 'Atendimento Personalizado',
      description: 'Cada cliente é única. O design é feito sob medida para o seu rosto.',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Naturalidade e Simetria',
      description: 'Foco em realçar a sua beleza natural, sem exageros ou marcações fortes.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Materiais de Qualidade',
      description: 'Utilizamos apenas produtos premium, hipoalergênicos e esterilizados.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Horário Marcado',
      description: 'Organização impecável para que você não precise esperar.',
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: 'Design Visagista',
      description: 'Técnicas de visagismo para harmonizar as sobrancelhas com seus traços.',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Ambiente Confortável',
      description: 'Um espaço pensado para o seu relaxamento e bem-estar.',
    },
  ];

  return (
    <section className="py-24 bg-[var(--color-bg-dark)] text-[var(--color-text-light)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Diferenciais
          </h2>
          <div className="section-divider mb-6" />
          <h3 className="text-4xl md:text-5xl font-serif font-medium mb-6">
            Por que escolher a <span className="italic">Giovanna?</span>
          </h3>
          <p className="text-gray-400 font-light">
            Compromisso com a excelência em cada detalhe do seu atendimento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-[1.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="text-xl font-serif font-medium mb-3">{item.title}</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
