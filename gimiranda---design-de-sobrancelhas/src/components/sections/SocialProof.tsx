import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

export function SocialProof() {
  const posts = [
    { id: 1, image: '/images/gallery/depois.jpg', likes: '1.2k', comments: '45' },
    { id: 2, image: '/images/gallery/antes.jpg', likes: '856', comments: '23' },
    { id: 3, image: '/images/gallery/profile.jpg', likes: '2.1k', comments: '112' },
    { id: 4, image: '/images/gallery/depois.jpg', likes: '943', comments: '38' },
  ];

  return (
    <section className="py-24 bg-[var(--color-bg-light)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-[var(--color-primary)] text-sm font-medium mb-6">
              <Instagram size={14} />
              <span>Marca ativa no Instagram</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 leading-tight">
              Conteúdo real, rotina real,{' '}
              <span className="italic text-[var(--color-primary)]">clientes reais.</span>
            </h2>

            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Acompanhe resultados, bastidores, dicas e transformações diárias. Uma profissional presente no dia a dia das clientes, com resultados reais, conteúdo ativo e atendimento humanizado.
            </p>

            <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
              <div>
                <p className="text-2xl font-serif font-medium text-gray-900">15k+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Seguidores</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-medium text-gray-900">850+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Publicações</p>
              </div>
            </div>

            <Button
              className="w-full sm:w-auto h-12 px-8 rounded-full hover:scale-[1.02] transition-transform"
              onClick={() => window.open('https://instagram.com/gimiranda', '_blank')}
            >
              <Instagram className="mr-2" size={18} />
              Seguir @gimiranda
            </Button>
          </motion.div>

          {/* Instagram Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart size={18} className="fill-current" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={18} className="fill-current" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
