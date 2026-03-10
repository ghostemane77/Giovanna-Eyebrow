import { Instagram, MapPin, Phone, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-dark)] text-white/80 py-16 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-1">
            <a href="#" className="font-serif text-3xl font-semibold tracking-tight text-white mb-6 block">
              Gi Miranda<span className="text-[var(--color-primary)]">.</span>
            </a>
            <p className="text-sm font-light text-gray-400 leading-relaxed max-w-xs">
              Especialista em design de sobrancelhas, realçando a beleza natural com técnicas de visagismo e atendimento humanizado.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/gimiranda.sobrancelhas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:bg-white/10 hover:border-[var(--color-primary)]/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/5513981596725"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-white/10 hover:border-green-500/30 transition-all"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-medium text-white mb-6">Contato</h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--color-primary)] shrink-0" />
                <span>(13) 98159-6725</span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} className="text-[var(--color-primary)] shrink-0" />
                <a href="https://instagram.com/gimiranda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@gimiranda</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--color-primary)] shrink-0" />
                <span>contato@gimiranda.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-medium text-white mb-6">Endereço</h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--color-primary)] shrink-0 mt-1" />
                <span>
                  Av. Presidente Wilson, 1234 - Sala 56<br />
                  Centro, São Vicente - SP<br />
                  CEP: 11320-000
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-medium text-white mb-6">Horários</h4>
            <ul className="space-y-3 text-sm font-light text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Segunda a Sábado</span>
                <span className="text-white font-medium">08:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Domingo</span>
                <span className="text-white font-medium">08:00 - 17:00</span>
              </li>
              <li className="text-xs text-gray-500 pt-1 italic">
                Atendimento com horário marcado
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs font-light text-gray-500 gap-4">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} Giovanna Miranda. Feito com <Heart size={12} className="text-[var(--color-primary)] fill-current" /> em São Vicente.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
