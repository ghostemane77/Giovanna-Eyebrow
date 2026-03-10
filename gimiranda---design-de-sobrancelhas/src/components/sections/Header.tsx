import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        isScrolled
          ? 'glass shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-serif text-2xl font-semibold tracking-tight text-[var(--color-text-dark)]">
          Gi Miranda<span className="text-[var(--color-primary)]">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[var(--color-primary)] after:transition-all hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/gimiranda"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/5513981596725"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone size={18} />
            </a>
            <Button
              className="rounded-full px-6"
              onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Agendar Horário
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 glass shadow-lg border-t border-gray-100 lg:hidden"
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="py-3 px-4 text-sm font-medium text-gray-800 border-b border-gray-50 hover:bg-pink-50/50 hover:text-[var(--color-primary)] transition-colors rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-3 px-4 py-3">
                <a href="https://instagram.com/gimiranda" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-[var(--color-primary)]">
                  <Instagram size={20} />
                </a>
                <a href="https://wa.me/5513981596725" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-green-600">
                  <Phone size={20} />
                </a>
              </div>
              <div className="p-4 mt-2">
                <Button
                  className="w-full rounded-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Agendar Horário
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
