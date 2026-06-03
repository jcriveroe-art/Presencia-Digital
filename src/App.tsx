import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CircleDollarSign, LineChart, Clock, Camera, MessageSquareWarning, Boxes, Eye, Film, MessagesSquare, MapPin, CalendarCheck } from 'lucide-react';

type Message = {
  role: 'bot' | 'user';
  text: ReactNode;
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: (
        <>
          Â¡Hola! Soy el asistente de <strong>Presencia Digital</strong>. CuÃ©ntame sobre tu negocio o pregÃºntame lo que quieras saber del servicio. ðŸ‘‹
        </>
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const getAIResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // IA & Fotos
    if (q.includes('ia') || q.includes('funciona') || q.includes('fotos') || q.includes('fotografÃ­a')) {
      return 'Â¡Es la mejor parte! **No necesitas enviarnos fotos profesionales.** Nuestra IA genera imÃ¡genes y videos de alta calidad basados en tu giro de negocio. Si tienes fotos de tus productos reales, podemos usarlas, pero si no, nosotros creamos todo el contenido visual para que luzcas como una marca de primer nivel.';
    }

    // Contratos & Plazos
    if (q.includes('contrato') || q.includes('plazo') || q.includes('permanencia') || q.includes('forzoso')) {
      return 'En Presencia Digital **no tenemos plazos forzosos**. Queremos que te quedes con nosotros por los resultados, no por un papel. Puedes cancelar o cambiar de plan en cualquier momento avisÃ¡ndonos con 5 dÃ­as de anticipaciÃ³n al siguiente mes.';
    }

    // Paquetes & Conveniencia
    if (q.includes('paquete') || q.includes('conviene') || q.includes('recomiendas')) {
      return 'Depende de tu objetivo:\n- Para **Contenido IA**, el **Pro ($1,500)** es nuestra mejor recomendaciÃ³n (es el mÃ¡s vendido).\n- Si buscas algo **bÃ¡sico**, el **Starter ($800)** funciona de maravilla.\n- Si quieres la **cara de tu marca**, el **Influencer Digital ($3,500 pago Ãºnico)** cambiarÃ¡ tu juego.';
    }

    // Tiempos
    if (q.includes('tiempo') || q.includes('cuÃ¡ndo') || q.includes('inicio') || q.includes('empezar')) {
      return 'Â¡Somos muy rÃ¡pidos! Una vez que eliges tu plan, **empezamos a entregar o publicar en menos de 48 horas**. Tu contenido estarÃ¡ listo para aprobaciÃ³n casi de inmediato.';
    }

    // Redes abandonadas
    if (q.includes('abandonadas') || q.includes('viejas') || q.includes('cero')) {
      return 'No te preocupes, es nuestra especialidad. Si tienes cuentas abandonadas, les damos una "limpieza facial" profesional. Si no tienes nada, las creamos desde cero para que desde el primer dÃ­a transmitas confianza a tus clientes.';
    }

    // Precios genÃ©ricos
    if (q.includes('precio') || q.includes('cuÃ¡nto') || q.includes('costo')) {
      return 'Manejamos paquetes de **Contenido IA** desde **$800 MXN/mes**. TambiÃ©n creamos tu **Influencer Digital** por un pago Ãºnico de **$3,500 MXN**. Â¿En quÃ© Ã¡rea te gustarÃ­a enfocarte?';
    }

    // AprobaciÃ³n
    if (q.includes('ajuste') || q.includes('cambio') || q.includes('revisar') || q.includes('aprobar')) {
      return 'TÃº tienes el control total. Antes de publicar, te enviamos el calendario. Si algo no te gusta, pedimos a la IA que lo ajuste o lo cambiamos. **Nada se publica sin tu visto bueno.**';
    }

    return 'Â¡Excelente pregunta! Lo mejor es platicarlo 5 minutos para darte una soluciÃ³n a medida. Â¿Te gustarÃ­a agendar una llamada rÃ¡pida o prefieres que te mande mÃ¡s ejemplos por WhatsApp?';
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: formatText(getAIResponse(text)) }]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  return (
    <div className="overflow-x-hidden selection:bg-accent selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 glass-effect" data-purpose="main-navigation">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2" data-purpose="logo-container">
            <div className="w-8 h-8 bg-accent rounded-lg rotate-12 flex items-center justify-center">
              <span className="font-heading font-extrabold text-black text-xl italic">P</span>
            </div>
            <span className="font-heading font-bold text-xl tracking-tighter">Presencia Digital IA</span>
          </div>
          {/* Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400" data-purpose="nav-links">
            <a className="hover:text-accent transition-colors" href="#servicios">Servicios</a>
            <a className="hover:text-accent transition-colors" href="#paquetes">Paquetes</a>
            <a className="hover:text-accent transition-colors" href="#proceso">CÃ³mo funciona</a>
            <a className="hover:text-accent transition-colors" href="#chat">Contacto</a>
          </div>
          {/* CTA */}
          <div data-purpose="nav-cta">
            <a
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-accent hover:text-black transition-all duration-300"
              href="https://wa.me/525647943262?text=Hola,%20vi%20tu%20pÃ¡gina%20de%20Presencia%20Digital%20y%20me%20gustarÃ­a%20recibir%20mÃ¡s%20informaciÃ³n."
              target="_blank"
              rel="noreferrer"
            >
              Contactar
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-bg bg-black" id="hero" data-purpose="hero">
          {/* Static Image Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img 
              src="/hero-on-cafe.png" 
              alt="Negocio local pasando de apagado a presencia digital ON" 
              className="w-full h-full object-cover object-[75%_center] md:object-right opacity-100 transition-opacity duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Overlays for legibility - Optimized for Left-aligned text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 hidden md:block"></div>
          <div className="absolute inset-0 bg-black/40 z-10 md:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10"></div>
          
          {/* Subtle grid accent */}
          <div className="absolute inset-0 grid-bg opacity-15 z-10"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left max-w-2xl"
            >
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 text-accent text-xs font-bold tracking-widest uppercase mb-6 bg-accent/5 backdrop-blur-sm">
                âœ¦ Presencia Digital ON
              </span>
              <h1 className="font-heading text-6xl md:text-8xl font-extrabold leading-tight mb-8 text-white tracking-tighter">
                ENCIENDE TU <span className="accent-gradient">NEGOCIO.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed font-medium">
                Haz que tu negocio se vea mejor, atienda mejor y venda con menos caos. Presencia visual, contenido, WhatsApp Business y sistema simple para negocios locales. No hacemos posts. Encendemos negocios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block text-center px-10 py-4 bg-accent text-black rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(204,255,0,0.6)] transition-all"
                  href="https://wa.me/525647943262?text=Hola,%20quiero%20poner%20mi%20negocio%20en%20ON"
                  target="_blank"
                  rel="noreferrer"
                >
                  Quiero poner mi negocio en ON
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-10 py-4 glass-effect rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-white border border-white/10"
                  href="#proceso"
                >
                  Ver cÃ³mo funciona
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-glow-pulse z-10"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-container/10 rounded-full blur-[120px] animate-glow-pulse z-10" style={{ animationDelay: '1.5s' }}></div>
        </section>

        {/* Influencer Digital Section */}
        <motion.section 
          {...fadeInUp}
          className="py-24 bg-black relative" id="influencer"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border border-white/5 rounded-[2.5rem] p-8 lg:p-16 bg-gradient-to-br from-white/[0.03] to-transparent shadow-[0_0_50px_rgba(204,255,0,0.05)] relative overflow-hidden group">
              {/* Neon border accent */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-cyan-400 to-lime-400 opacity-20 group-hover:opacity-40 transition-opacity duration-700 [mask-image:linear-gradient(white,white),linear-gradient(white,white)] [mask-clip:content-box,padding-box] [mask-composite:exclude]"></div>
              
              <div className="relative z-10">
                <span className="inline-block py-1 px-3 rounded-full border border-cyan-400/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 bg-cyan-400/5 backdrop-blur-sm">
                  âœ¦ El Futuro del Branding
                </span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tighter">
                  Creamos tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">Influencer Digital</span>: La cara de tu marca en la era de la IA
                </h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      <Sparkles className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Identidad Ãšnica</h4>
                      <p className="text-gray-400 text-sm">Personalidad y estÃ©tica diseÃ±ada exclusivamente para conectar con tu audiencia ideal.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                      <CircleDollarSign className="w-6 h-6 text-lime-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Ahorro de Costos</h4>
                      <p className="text-gray-400 text-sm">Sin viÃ¡ticos, sin problemas de agenda y sin costos recurrentes de modelos reales.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      <LineChart className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Escalabilidad</h4>
                      <p className="text-gray-400 text-sm">Contenido infinito 24/7. Tu influencer nunca duerme y siempre estÃ¡ en tendencia.</p>
                    </div>
                  </div>
                </div>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block text-center px-10 py-4 bg-gradient-to-r from-cyan-400 to-lime-400 text-black rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all"
                  href="https://wa.me/525647943262?text=Hola,%20me%20interesa%20crear%20mi%20propio%20Influencer%20Digital."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero mi Influencer
                </motion.a>
              </div>
              
              <div className="relative z-10 flex justify-center">
                <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group-hover:border-cyan-400/30 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
                  <video 
                    key="influencer-video"
                    src="/influencer_demo.mp4" 
                    poster="/influencer_promo.jpg.jpeg"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 relative z-0"
                  >
                    <source src="/influencer_demo.mp4" type="video/mp4" />
                    <img src="/influencer_promo.jpg.jpeg" alt="AI Influencer Fallback" className="w-full h-full object-cover" />
                  </video>
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full border border-white/50 bg-accent/20 backdrop-blur-sm"></div>
                      <div className="h-2 w-24 bg-white/30 rounded-full"></div>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "33%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-cyan-400"
                      ></motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative floating elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/20 blur-[60px] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-lime-400/20 blur-[60px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Problem Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20" id="servicios"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">Â¿Te identificas?</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">Tu negocio puede ser bueno, pero verse apagado.</h2>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto font-medium">Si tus redes se ven improvisadas, tu WhatsApp estÃ¡ desordenado o tus clientes se pierden entre mensajes, tu negocio pierde confianza antes de vender.</p>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
            >
              {[
                { icon: Clock, title: "Perfil poco profesional", desc: "El negocio te consume. Las redes sociales siempre quedan para despuÃ©s." },
                { icon: Camera, title: "Fotos y contenido sin intenciÃ³n", desc: "Un fotÃ³grafo sale caro y el resultado llega semanas despuÃ©s." },
                { icon: MessageSquareWarning, title: "WhatsApp sin orden", desc: "Los mensajes se mezclan, las dudas se pierden y atender se vuelve caos." },
                { icon: Boxes, title: "Contenido genÃ©rico", desc: "Las agencias tradicionales te dan lo mismo que a todos. Nosotros creamos piezas especÃ­ficas para tu giro y tu cliente." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: "rgba(204, 255, 0, 0.3)" }}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 transition-all group"
                >
                  <div className="w-12 h-12 mb-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-16 flex items-center justify-center space-x-4">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-gray-500 uppercase text-xs tracking-widest font-bold">La soluciÃ³n</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
          </div>
        </motion.section>

        {/* Solutions Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-[#0a0a0a] border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">Nuestras soluciones</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">De negocio OFF a negocio ON.</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">Ordenamos cÃ³mo se ve tu negocio, cÃ³mo te escriben y cÃ³mo atiendes a tus clientes.</p>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { icon: Eye, title: "Presencia visual ON", desc: "PÃ¡ginas y perfiles que transmiten claridad y confianza." },
                { icon: Film, title: "Contenido y reels", desc: "Contenido pensado para inspirar, conectar y generar mÃ¡s mensajes." },
                { icon: MessagesSquare, title: "WhatsApp Business", desc: "Organiza tus mensajes y atiende mejor sin perder oportunidades." },
                { icon: MapPin, title: "Google Maps", desc: "Aparece cuando te buscan y guÃ­a a tus clientes con mÃ¡s claridad." },
                { icon: CalendarCheck, title: "Clientes, citas y seguimiento", desc: "Control de pedidos, citas y seguimiento sin caos." }
              ].map((val, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.06)", borderColor: "rgba(204, 255, 0, 0.5)" }}
                  className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 transition-all group shadow-xl"
                >
                  <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                    <val.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 text-white">{val.title}</h3>
                  <p className="text-gray-300 text-base leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>


        {/* Pricing Section */}
        <motion.section 
          {...fadeInUp}
          className="py-24" id="paquetes"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">Tarifas</span>
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Paquetes para encender tu negocio</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Elige el nivel de presencia y orden que necesita tu negocio para verse mejor, atender mejor y vender con menos caos.</p>
            </div>

            {/* NEGOCIO ON */}
            <div className="mb-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div className="text-left">
                  <h3 className="font-heading text-3xl font-bold text-accent mb-2">NEGOCIO ON</h3>
                  <p className="text-gray-400">Sistema visual y operativo para negocios locales</p>
                </div>
              </div>
              
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
              >
                {/* Starter */}
                <motion.div variants={fadeInUp} className="p-8 rounded-3xl glass-effect border border-white/5 flex flex-col hover:border-white/20 transition-all group">
                  <h4 className="font-heading text-2xl font-bold mb-2">Starter ON</h4>
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-white">$800</span>
                    <span className="text-gray-500 text-sm ml-2">MXN / mes</span>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-400 mb-10 flex-1">
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> 8 imÃ¡genes IA</li>
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> Captions + hashtags</li>
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> 1 red social</li>
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> Entrega en carpeta organizada</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all" 
                    href="https://wa.me/525647943262?text=Hola,%20me%20interesa%20el%20paquete%20Starter%20de%20Contenido%20IA." 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Seleccionar
                  </motion.a>
                </motion.div>

                {/* Pro */}
                <motion.div 
                  variants={fadeInUp}
                  className="p-8 rounded-3xl bg-accent text-black flex flex-col relative transform md:scale-105 shadow-2xl z-10"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-tighter px-4 py-1 rounded-full shadow-xl">MÃ¡s Popular</div>
                  <h4 className="font-heading text-2xl font-bold mb-2">Pro ON</h4>
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold">$1,500</span>
                    <span className="text-black/60 text-sm ml-2">MXN / mes</span>
                  </div>
                  <ul className="space-y-4 text-sm text-black/80 mb-10 flex-1">
                    <li className="flex items-start"><span className="mr-3 font-bold">âœ“</span> 16 imÃ¡genes IA</li>
                    <li className="flex items-start"><span className="mr-3 font-bold">âœ“</span> 4 videos cortos IA (15â€“30s)</li>
                    <li className="flex items-start"><span className="mr-3 font-bold">âœ“</span> Captions con CTA de ventas</li>
                    <li className="flex items-start"><span className="mr-3 font-bold">âœ“</span> 2 redes sociales</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center py-4 rounded-xl bg-black text-white font-bold hover:bg-black/90 transition-all shadow-lg" 
                    href="https://wa.me/525647943262?text=Hola,%20me%20interesa%20el%20paquete%20Pro%20de%20Contenido%20IA." 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Seleccionar
                  </motion.a>
                </motion.div>

                {/* Full Pack */}
                <motion.div variants={fadeInUp} className="p-8 rounded-3xl glass-effect border border-white/5 flex flex-col hover:border-white/20 transition-all">
                  <h4 className="font-heading text-2xl font-bold mb-2">Full ON</h4>
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-white">$2,500</span>
                    <span className="text-gray-500 text-sm ml-2">MXN / mes</span>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-400 mb-10 flex-1">
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> 20 imÃ¡genes IA</li>
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> 5 videos cortos IA</li>
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> Copy completo para cada pieza</li>
                    <li className="flex items-start"><span className="text-accent mr-3 font-bold">âœ“</span> Entrega semanal</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all" 
                    href="https://wa.me/525647943262?text=Hola,%20me%20interesa%20el%20paquete%20Full%20Pack%20de%20Contenido%20IA." 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Seleccionar
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            {/* EXTRAS Y PRODUCTOS IA */}
            <div>
              <div className="text-left mb-10">
                <h3 className="font-heading text-3xl font-bold text-accent mb-2">EXTRAS Y PRODUCTOS IA</h3>
                <p className="text-gray-400">Soluciones adicionales para marcas que quieren contenido mÃ¡s avanzado.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* CreaciÃ³n del Influencer */}
                <motion.div 
                  variants={fadeInUp}
                  className="p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-cyan-400/10 to-transparent flex flex-col hover:border-cyan-400/30 transition-all shadow-xl group"
                >
                  <h4 className="font-heading text-2xl font-bold mb-2 text-white">CreaciÃ³n del Influencer</h4>
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-white">$3,500</span>
                    <span className="text-gray-500 text-sm ml-2 font-bold">MXN (Pago Ãºnico)</span>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-300 mb-10 flex-1">
                    <li className="flex items-start"><span className="text-cyan-400 mr-3 font-bold">âœ¦</span> DiseÃ±o de personaje completo</li>
                    <li className="flex items-start"><span className="text-cyan-400 mr-3 font-bold">âœ¦</span> 8 piezas iniciales de contenido</li>
                    <li className="flex items-start"><span className="text-cyan-400 mr-3 font-bold">âœ¦</span> GuÃ­a de uso</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center py-4 rounded-2xl bg-cyan-400 text-black font-bold transition-all" 
                    href="https://wa.me/525647943262?text=Hola,%20me%20interesa%20el%20servicio%20de%20CreaciÃ³n%20de%20Influencer%20Digital." 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Empezar ahora
                  </motion.a>
                </motion.div>

                {/* Influencer + Contenido */}
                <motion.div 
                  variants={fadeInUp}
                  className="p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-lime-400/10 to-transparent flex flex-col hover:border-lime-400/30 transition-all shadow-xl group"
                >
                  <h4 className="font-heading text-2xl font-bold mb-2 text-white">Influencer + Contenido</h4>
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-white">$2,000</span>
                    <span className="text-gray-500 text-sm ml-2 font-bold">MXN / mes</span>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-300 mb-10 flex-1">
                    <li className="flex items-start"><span className="text-lime-400 mr-3 font-bold">âœ¦</span> 12 imÃ¡genes IA con tu influencer</li>
                    <li className="flex items-start"><span className="text-lime-400 mr-3 font-bold">âœ¦</span> 3 videos cortos IA (15â€“30s)</li>
                    <li className="flex items-start"><span className="text-lime-400 mr-3 font-bold">âœ¦</span> Captions en la voz del personaje</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(163, 230, 53, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center py-4 rounded-2xl bg-lime-400 text-black font-bold transition-all" 
                    href="https://wa.me/525647943262?text=Hola,%20me%20interesa%20el%20paquete%20de%20Influencer%20+%20Contenido." 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Seleccionar
                  </motion.a>
                </motion.div>
              </div>
            </div>

            {/* Extras */}
            <motion.div 
              {...fadeInUp}
              className="mt-20 max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <span className="text-accent text-sm font-bold uppercase tracking-widest bg-accent/10 px-4 py-1 rounded-full border border-accent/20">Servicios adicionales</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.02, borderColor: "rgba(204, 255, 0, 0.5)" }}
                  className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex justify-between items-center hover:bg-white/[0.06] transition-all cursor-pointer group shadow-lg"
                >
                  <div className="text-left">
                    <h4 className="font-bold text-xl text-white mb-1">Landing page con IA</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Sitio web profesional optimizado, listo en 48h.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-accent font-extrabold text-2xl">$1,500</span>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase">Pago Ãºnico</span>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02, borderColor: "rgba(204, 255, 0, 0.5)" }}
                  className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex justify-between items-center hover:bg-white/[0.06] transition-all cursor-pointer group shadow-lg"
                >
                  <div className="text-left">
                    <h4 className="font-bold text-xl text-white mb-1">Redes desde cero</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">ConfiguraciÃ³n experta y optimizaciÃ³n de perfiles.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-accent font-extrabold text-2xl">$2,500</span>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase">Pago Ãºnico</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-surface" id="proceso"
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">CÃ³mo funciona</span>
            <h2 className="font-heading text-4xl font-bold mb-8 text-white">Un sistema simple para encender tu negocio.</h2>
            <motion.div 
               variants={staggerContainer}
               initial="initial"
               whileInView="whileInView"
               viewport={{ once: true }}
              className="space-y-0 text-left"
            >
              {[
                { step: "01", title: "Revisamos tu presencia actual", desc: "Vemos cÃ³mo se ve tu negocio hoy en redes, WhatsApp, Google y puntos de contacto." },
                { step: "02", title: "Mejoramos cÃ³mo se ve tu negocio", desc: "Ajustamos imagen, claridad visual y mensajes para que transmitas mÃ¡s confianza." },
                { step: "03", title: "Ordenamos tu WhatsApp y clientes", desc: "Definimos una forma simple de atender, responder y no perder oportunidades." },
                { step: "04", title: "Creamos contenido visual", desc: "Creamos piezas, reels y textos que hacen que tu negocio se vea activo y comprable." },
                { step: "05", title: "Medimos y ajustamos", desc: "Revisamos quÃ© funciona y afinamos presencia, atenciÃ³n y seguimiento." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start p-8 border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                >
                  <span className="w-10 h-10 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold mr-6 shrink-0 group-hover:scale-110 transition-transform">{item.step}</span>
                  <div>
                    <h3 className="font-heading font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* AI Chat Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20" id="chat"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">Asistente ON</span>
            <h2 className="font-heading text-4xl font-bold mb-4 text-white">Â¿Tienes dudas? Pregunta aquÃ­</h2>
            <p className="text-gray-400 mb-8 font-medium">Nuestro asistente responde al instante sobre servicios, precios y cÃ³mo podemos ayudar a tu negocio.</p>
            
            <div className="glass-effect rounded-3xl overflow-hidden text-left border border-white/10 shadow-2xl relative">
              <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-white/[0.02]">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-bold text-white">Asistente Presencia Digital</p>
                  <p className="text-[10px] text-gray-500">Responde en segundos Â· Con IA</p>
                </div>
              </div>
              
              <div className="h-80 overflow-y-auto p-6 space-y-4 bg-background/20" id="chat-msgs" ref={msgsRef}>
                <AnimatePresence>
                  {messages.map((m, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`msg ${m.role} p-4 rounded-2xl text-sm max-w-[85%] ${m.role === 'user' ? 'ml-auto' : 'w-fit shadow-lg'}`}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="msg bot p-4 rounded-2xl text-sm max-w-[85%] flex space-x-1 w-fit"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="p-4 border-t border-white/10 flex flex-wrap gap-2 bg-white/[0.01]">
                <button className="px-3 py-1 text-[10px] border border-white/10 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors" onClick={() => handleSend('Â¿Necesito enviarte fotos?')}>Â¿Necesito enviarte fotos?</button>
                <button className="px-3 py-1 text-[10px] border border-white/10 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors" onClick={() => handleSend('Â¿Hay plazos forzosos?')}>Â¿Hay plazos forzosos?</button>
                <button className="px-3 py-1 text-[10px] border border-white/10 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors" onClick={() => handleSend('Â¿CÃ³mo empezamos?')}>Â¿CÃ³mo empezamos?</button>
              </div>
              
              <div className="p-4 border-t border-white/10 flex space-x-2 bg-white/[0.02]">
                <input 
                  className="flex-1 bg-white/5 border-0 focus:ring-1 focus:ring-accent rounded-xl text-sm px-4 focus:bg-white/10 transition-colors py-2 text-white" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe el giro de tu negocio..." 
                  type="text" 
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent text-black px-4 py-2 rounded-xl font-bold text-sm shadow-lg active:shadow-inner" 
                  onClick={() => handleSend(inputValue)}
                >
                  Enviar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section 
          {...fadeInUp}
          className="py-20 relative overflow-hidden" data-purpose="cta-section"
        >
          <div className="absolute inset-0 bg-accent/5"></div>
          <motion.div 
            style={{ y: -50 }}
            animate={{ y: 50 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full"
          />
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <h2 className="font-heading text-5xl md:text-7xl font-extrabold mb-6 text-white">Â¿Tu negocio ya tiene valor. <span className="italic text-accent">Ahora hay que encenderlo.</span></h2>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto font-medium">Haz que tu presencia digital estÃ© al nivel de lo que realmente ofreces.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(204, 255, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-accent text-black px-12 py-5 rounded-2xl font-black text-xl transition-all" 
                href="https://wa.me/525647943262?text=Hola,%20quiero%20empezar%20con%20Presencia%20Digital%20para%20mi%20negocio" 
                target="_blank" 
                rel="noreferrer"
              >
                Cotizar por WhatsApp
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-block glass-effect px-12 py-5 rounded-2xl font-bold text-xl transition-all" 
                href="#proceso"
              >
                Ver cÃ³mo funciona
              </motion.a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5" data-purpose="main-footer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="font-heading font-extrabold text-black text-xl italic">P</span>
                </div>
                <span className="font-heading font-bold text-xl tracking-tighter">Presencia Digital IA</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">Presencia Digital IA enciende negocios locales: mejor imagen, mejor atenciÃ³n y menos caos.</p>
              <p className="text-xs text-gray-600">SatÃ©lite Â· Lomas Verdes Â· Naucalpan Â· CDMX</p>
              <p className="text-accent font-bold mt-2">
                <a 
                  className="hover:translate-x-1 transition-transform inline-block" 
                  href="https://wa.me/525647943262?text=Hola,%20tengo%20una%20pregunta%20sobre%20Presencia%20Digital."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  5647943262
                </a>
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-6 text-white">Servicios</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a className="hover:text-accent transition-colors hover:translate-x-1 block" href="#servicios">Negocio ON</a></li>
                <li><a className="hover:text-accent transition-colors hover:translate-x-1 block" href="#influencer">Influencer Digital</a></li>
                <li><a className="hover:text-accent transition-colors hover:translate-x-1 block" href="#paquetes">Landing Pages</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-6 text-white">CompaÃ±Ã­a</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a className="hover:text-accent transition-colors hover:translate-x-1 block" href="#hero">Sobre nosotros</a></li>
                <li><a className="hover:text-accent transition-colors hover:translate-x-1 block" href="#proceso">CÃ³mo funciona</a></li>
                <li><a className="hover:text-accent transition-colors hover:translate-x-1 block" href="#chat">Contacto</a></li>
                <li><a className="hover:text-accent transition-colors hover:translate-x-1 block" href="#">Aviso de Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px]">
            <p>Â© 2024 Presencia Digital. Todos los derechos reservados.</p>
            <p className="mt-4 md:mt-0">DiseÃ±ado para la nueva generaciÃ³n de negocios locales.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

