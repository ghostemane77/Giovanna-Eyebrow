import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      before: '/images/gallery/antes.jpg',
      after: '/images/gallery/depois.jpg',
      title: 'Design Personalizado'
    },
    {
      before: '/images/gallery/antes01.jpeg',
      after: '/images/gallery/depois01.jpeg',
      title: 'Harmonia Facial'
    },
    {
      before: '/images/gallery/ante02.jpeg',
      after: '/images/gallery/depois02.jpeg',
      title: 'Naturalidade & Simetria'
    },
  ];

  const singleImages = [
    '/images/gallery/depois.jpg',
    '/images/gallery/depois01.jpeg',
    '/images/gallery/depois02.jpeg',
    '/images/gallery/depois03.jpeg',
    '/images/gallery/antes03.jpeg',
    '/images/gallery/profile.jpg',
  ];

  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Portfólio
          </h2>
          <div className="section-divider mb-6" />
          <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
            Resultados <span className="italic">reais</span>
          </h3>
          <p className="text-gray-600 font-light">
            Confira algumas das transformações realizadas. Cada design é único e pensado para valorizar a beleza natural de cada cliente.
          </p>
        </div>

        {/* Before/After Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-premium overflow-hidden group flex flex-col"
            >
              <div className="grid grid-cols-2 gap-0 flex-grow">
                {/* Before */}
                <div
                  className="relative aspect-[3/4] cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(item.before)}
                >
                  <img
                    src={item.before}
                    alt={`Antes - ${item.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium tracking-wider uppercase">Antes</span>
                  </div>
                </div>
                {/* After */}
                <div
                  className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-gray-50"
                  onClick={() => setSelectedImage(item.after)}
                >
                  <img
                    src={item.after}
                    alt={`Depois - ${item.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium tracking-wider uppercase">Depois</span>
                  </div>
                </div>
              </div>
              <div className="p-5 text-center bg-white border-t border-gray-50">
                <h4 className="font-serif text-lg font-medium text-gray-900">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Single Images Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-4">
          {singleImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${index < 2 ? 'col-span-2 aspect-square md:aspect-[4/3] lg:aspect-square' : 'aspect-square'}`}
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Resultado ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Resultado ampliado"
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
