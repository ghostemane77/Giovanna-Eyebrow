import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { SocialProof } from './components/sections/SocialProof';
import { Services } from './components/sections/Services';
import { Gallery } from './components/sections/Gallery';
import { Experience } from './components/sections/Experience';
import { Differentials } from './components/sections/Differentials';
import { Testimonials } from './components/sections/Testimonials';
import { Location } from './components/sections/Location';
import { Booking } from './components/sections/Booking';
import { BookingCTA } from './components/sections/BookingCTA';
import { FAQ } from './components/sections/FAQ';
import { Footer } from './components/sections/Footer';
import { ChatWidget } from './components/ui/ChatWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] font-sans text-[var(--color-text-dark)]">
      <Header />
      <main>
        <Hero />
        <About />
        <SocialProof />
        <Services />
        <Gallery />
        <Experience />
        <Differentials />
        <Testimonials />
        <Location />
        <BookingCTA />
        <Booking />
        <FAQ />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
