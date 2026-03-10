import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Mariana S.',
      role: 'Cliente há 2 anos',
      text: 'A Giovanna mudou completamente meu olhar. Sempre tive medo de ficar artificial, mas ela conseguiu um resultado super natural. Não troco por nada!',
      rating: 5,
    },
    {
      name: 'Camila C.',
      role: 'Primeira vez',
      text: 'Atendimento impecável! O ambiente é lindo e ela é muito atenciosa. Explicou todo o processo e o resultado ficou melhor do que eu imaginava.',
      rating: 5,
    },
    {
      name: 'Juliana M.',
      role: 'Cliente fiel',
      text: 'Faço a manutenção mensalmente e a qualidade é sempre a mesma. Produtos excelentes e a durabilidade da henna é incrível na minha pele.',
      rating: 5,
    },
    {
      name: 'Fernanda R.',
      role: 'Cliente há 1 ano',
      text: 'Melhor profissional da região! O cuidado com cada detalhe faz toda a diferença. Minhas sobrancelhas nunca ficaram tão bonitas e naturais.',
      rating: 5,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const visibleTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="depoimentos" className="py-24 bg-[var(--color-bg-light)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Depoimentos
          </h2>
          <div className="section-divider mb-6" />
          <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
            O que dizem as <span className="italic">clientes</span>
          </h3>
          <p className="text-gray-600 font-light">
            A satisfação de quem já transformou o olhar com a Giovanna.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium p-8 flex flex-col h-full"
            >
              <div className="flex items-center gap-1 text-[var(--color-primary)] mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-nude)] flex items-center justify-center text-[var(--color-primary)] font-serif font-semibold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-full border border-gray-200 text-gray-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPage === i
                      ? 'bg-[var(--color-primary)] w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-full border border-gray-200 text-gray-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
