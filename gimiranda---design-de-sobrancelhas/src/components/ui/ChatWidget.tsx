import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Calendar, X } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const phone = '5513981596725'; // From the Booking component placeholder
    const message = encodeURIComponent('Olá Giovanna! Estava vendo o seu site e gostaria de tirar uma dúvida sobre os serviços.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  const handleSchedule = () => {
    document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-100 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-serif font-medium text-gray-900">Como posso ajudar?</h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500 font-light mb-2">
              Escolha uma opção abaixo para falar comigo ou agendar seu horário.
            </p>
            
            <button
              onClick={handleSchedule}
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-pink-50 to-[var(--color-nude)]/20 hover:from-pink-100 hover:to-[var(--color-nude)]/40 text-gray-800 transition-all font-medium text-sm border border-pink-100/50"
            >
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Calendar size={18} className="text-[var(--color-primary)]" />
              </div>
              Quero Agendar
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-gray-800 transition-all font-medium text-sm border border-[#25D366]/20"
            >
              <div className="bg-white p-2 rounded-full shadow-sm text-[#25D366]">
                <MessageCircle size={18} className="fill-current" />
              </div>
              Tirar Dúvida
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-full text-white shadow-xl shadow-[var(--color-primary)]/30 flex items-center justify-center animate-pulse-soft z-50 hover:shadow-2xl hover:shadow-[var(--color-primary)]/40 transition-all"
        aria-label="Abrir opções de contato"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={28} className="fill-white/20" />
        )}
      </motion.button>
    </div>
  );
}
