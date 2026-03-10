import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Quanto tempo dura o atendimento?',
      answer: 'O atendimento dura em média 50 minutos. Esse tempo é necessário para realizar o mapeamento facial, o design com calma e a finalização perfeita.',
    },
    {
      question: 'O design é personalizado?',
      answer: 'Sim! Cada design é feito sob medida, analisando o formato do rosto, os traços faciais e a personalidade de cada cliente. Não usamos moldes ou padrões prontos.',
    },
    {
      question: 'Como funciona o agendamento?',
      answer: 'Você pode agendar diretamente pelo site, escolhendo o serviço, a data e o horário disponível. Após a confirmação, você receberá uma mensagem no WhatsApp com todos os detalhes.',
    },
    {
      question: 'Atende por horário marcado?',
      answer: 'Sim, atendemos exclusivamente com horário marcado para garantir que cada cliente receba toda a atenção que merece, sem espera e com conforto.',
    },
    {
      question: 'Tem atendimento aos domingos?',
      answer: 'Sim, atendemos aos domingos das 08:00 às 17:00, mediante agendamento prévio.',
    },
    {
      question: 'Posso remarcar meu horário?',
      answer: 'Sim! Pedimos apenas que a remarcação seja feita com no mínimo 24 horas de antecedência para que possamos reorganizar a agenda e disponibilizar o horário para outra cliente.',
    },
    {
      question: 'Onde fica o atendimento?',
      answer: 'Nosso estúdio fica em São Vicente, SP. O endereço completo é informado na seção de localização aqui no site. Você também pode clicar em "Como chegar" para abrir o mapa.',
    },
    {
      question: 'O procedimento dói?',
      answer: 'O design de sobrancelhas com pinça ou linha pode causar um leve desconforto, mas é totalmente suportável. Utilizamos técnicas para minimizar qualquer incômodo.',
    },
    {
      question: 'Quanto tempo dura o resultado da Henna?',
      answer: 'A durabilidade da henna varia de acordo com o tipo de pele. Em peles oleosas, dura de 3 a 5 dias. Em peles secas ou normais, pode durar até 10 dias.',
    },
    {
      question: 'Quais as formas de pagamento?',
      answer: 'Aceitamos PIX, cartões de crédito e débito, e dinheiro.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[var(--color-bg-light)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Dúvidas Frequentes
          </h2>
          <div className="section-divider mb-6" />
          <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
            Perguntas <span className="italic">comuns</span>
          </h3>
          <p className="text-gray-600 font-light">
            Tudo o que você precisa saber antes do seu atendimento.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900 pr-8 group-hover:text-[var(--color-primary)] transition-colors">{faq.question}</span>
                <ChevronDown
                  className={`text-gray-400 transition-transform duration-300 shrink-0 ${openIndex === index ? 'rotate-180 text-[var(--color-primary)]' : ''}`}
                  size={20}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 font-light leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
