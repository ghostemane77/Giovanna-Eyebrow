import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Calendar as CalendarIcon, Clock, User, Phone, FileText, CheckCircle2, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MOCK_SERVICES } from '../../lib/supabase';

export function Booking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate next 14 days for date selection
  const today = startOfToday();
  const availableDates = Array.from({ length: 14 }).map((_, i) => addDays(today, i));

  // Fetch available time slots when date changes
  const fetchAvailability = useCallback(async (date: Date) => {
    setIsLoadingSlots(true);
    setAvailableSlots([]);
    setSelectedTime(null);

    const dateStr = format(date, 'yyyy-MM-dd');

    try {
      const response = await fetch(`/api/appointments/availability?date=${dateStr}`);
      const result = await response.json();

      if (result.success) {
        setAvailableSlots(result.slots);
      } else {
        // Fallback: generate slots locally
        setAvailableSlots(generateLocalSlots(date));
      }
    } catch {
      // Fallback: generate slots locally
      setAvailableSlots(generateLocalSlots(date));
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  // Local slot generation fallback
  function generateLocalSlots(date: Date): string[] {
    const slots: string[] = [];
    const isSunday = date.getDay() === 0;
    const startHour = 8;
    const endHour = isSunday ? 17 : 18;
    const duration = 50;

    for (let m = startHour * 60; m + duration <= endHour * 60; m += duration) {
      if (isSameDay(date, new Date())) {
        const now = new Date();
        if (m <= now.getHours() * 60 + now.getMinutes()) continue;
      }
      const h = Math.floor(m / 60);
      const min = m % 60;
      slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
    }
    return slots;
  }

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, fetchAvailability]);

  const handleNextStep = () => {
    if (step === 1 && selectedService) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          service_id: selectedService,
          appointment_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          start_time: selectedTime,
          notes: formData.notes || undefined
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setStep(4);
      } else if (response.status === 409) {
        alert('Este horário já foi reservado. Por favor, escolha outro horário.');
        setStep(2);
        if (selectedDate) fetchAvailability(selectedDate);
      } else {
        throw new Error(result.error || 'Erro ao agendar');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Ocorreu um erro ao agendar. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceData = MOCK_SERVICES.find(s => s.id === selectedService);

  return (
    <section id="agendamento" className="py-24 bg-[var(--color-bg-dark)] text-[var(--color-text-light)] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase mb-3">
            Agendamento Online
          </h2>
          <div className="section-divider mb-6" />
          <h3 className="text-4xl md:text-5xl font-serif font-medium mb-6">
            Reserve seu <span className="italic">horário</span>
          </h3>
          <p className="text-gray-400 font-light">
            Siga os passos abaixo para garantir o seu atendimento exclusivo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden text-gray-900">

          {/* Progress Bar */}
          <div className="flex bg-gray-50 border-b border-gray-100">
            {[
              { num: 1, label: 'Serviço' },
              { num: 2, label: 'Data e Hora' },
              { num: 3, label: 'Seus Dados' }
            ].map((s) => (
              <div
                key={s.num}
                className={`flex-1 py-4 text-center text-sm font-medium transition-all duration-300 ${step === s.num ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-white' :
                  step > s.num ? 'text-gray-900 bg-green-50/50' : 'text-gray-400'
                  }`}
              >
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">Passo {s.num}</span>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-10 min-h-[420px]">

            {/* Step 1: Services */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h4 className="text-xl font-serif font-medium mb-6">Escolha o serviço desejado</h4>
                <div className="grid gap-3">
                  {MOCK_SERVICES.filter(s => s.active).map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedService === service.id
                        ? 'border-[var(--color-primary)] bg-pink-50/50 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <h5 className="font-medium text-gray-900">{service.name}</h5>
                        <span className="font-medium text-[var(--color-primary)]">
                          {service.price > 0 ? `R$ ${service.price.toFixed(2)}` : 'Gratuito'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={12} />
                        <span>{service.duration_minutes} min</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleNextStep}
                    disabled={!selectedService}
                    className="px-8 rounded-full"
                  >
                    Próximo
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h4 className="text-xl font-serif font-medium mb-6">Escolha a data e horário</h4>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <CalendarIcon size={16} className="text-[var(--color-primary)]" />
                    Datas Disponíveis
                  </label>
                  <div className="flex gap-2.5 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {availableDates.map((date, i) => {
                      const isSelected = selectedDate && isSameDay(date, selectedDate);
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={`flex flex-col items-center justify-center min-w-[68px] h-[80px] rounded-xl border-2 transition-all duration-300 shrink-0 ${isSelected
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                          <span className="text-[10px] uppercase font-semibold opacity-70">
                            {format(date, 'EEE', { locale: ptBR })}
                          </span>
                          <span className="text-xl font-bold mt-0.5">
                            {format(date, 'dd')}
                          </span>
                          <span className="text-[10px] opacity-60">
                            {format(date, 'MMM', { locale: ptBR })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-[var(--color-primary)]" />
                      Horários Disponíveis
                    </label>
                    {isLoadingSlots ? (
                      <div className="flex items-center justify-center py-8 text-gray-400">
                        <Loader2 className="animate-spin mr-2" size={20} />
                        <span className="text-sm">Consultando horários...</span>
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                        {availableSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${selectedTime === time
                              ? 'border-[var(--color-primary)] bg-pink-50 text-[var(--color-primary)] shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <CalendarIcon size={32} className="mx-auto mb-2 opacity-30" />
                        <p className="text-sm italic">Nenhum horário disponível para esta data.</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-10 flex justify-between">
                  <Button variant="ghost" onClick={handlePrevStep} className="rounded-full">
                    <ArrowLeft className="mr-2" size={16} />
                    Voltar
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={!selectedDate || !selectedTime}
                    className="px-8 rounded-full"
                  >
                    Próximo
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: User Details */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h4 className="text-xl font-serif font-medium mb-6">Seus dados para contato</h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <User size={14} className="text-[var(--color-primary)]" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none transition-all"
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Phone size={14} className="text-[var(--color-primary)]" />
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none transition-all"
                      placeholder="(13) 98159-6725"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <FileText size={14} className="text-[var(--color-primary)]" />
                      Observações (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none transition-all resize-none"
                      placeholder="Alguma informação importante?"
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-r from-pink-50 to-[var(--color-nude)]/20 p-5 rounded-xl mt-4">
                    <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)]" />
                      Resumo do Agendamento
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                      <li><span className="font-medium">Serviço:</span> {selectedServiceData?.name}</li>
                      <li><span className="font-medium">Data:</span> {selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ''}</li>
                      <li><span className="font-medium">Horário:</span> {selectedTime}</li>
                      {selectedServiceData && selectedServiceData.price > 0 && (
                        <li><span className="font-medium">Valor:</span> R$ {selectedServiceData.price.toFixed(2)}</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <Button type="button" variant="ghost" onClick={handlePrevStep} className="rounded-full">
                      <ArrowLeft className="mr-2" size={16} />
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.phone}
                      className="px-8 rounded-full shadow-lg shadow-[var(--color-primary)]/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Confirmando...
                        </>
                      ) : (
                        <>
                          Confirmar Agendamento
                          <CheckCircle2 className="ml-2" size={16} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-2xl font-serif font-medium mb-4 text-gray-900">Agendamento Confirmado!</h4>
                <p className="text-gray-600 font-light mb-3 max-w-md mx-auto">
                  Seu horário foi reservado com sucesso.
                </p>
                <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
                  Você receberá uma mensagem de confirmação no WhatsApp em instantes. ✨
                </p>
                <Button
                  onClick={() => {
                    setStep(1);
                    setSelectedService(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setFormData({ name: '', phone: '', notes: '' });
                    setIsSuccess(false);
                  }}
                  variant="outline"
                  className="rounded-full"
                >
                  Fazer novo agendamento
                </Button>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
