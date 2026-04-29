import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, MapPin, Phone, ArrowUpRight, MousePointer2, Play } from "lucide-react";
import Showcase from "./components/Showcase";
import Inventory from "./components/Inventory";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Our Collection", type: "page" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Investors", href: "#" },
];

const faqItems = [
  { q: "What are the requirements to book?", a: "You must be at least 21 years old (25 for certain elite models), have a valid driver's license, and provide proof of full coverage insurance." },
  { q: "What if I don't have full coverage insurance?", a: "We offer various rental car damage protection options. Please contact our team for details on opting in." },
  { q: "Do I still need personal car insurance if I opt in for protection?", a: "Rental damage protection is not a substitute for personal liability insurance. Requirements vary, so please confirm with your agent." },
  { q: "Can I add an additional driver to my rental?", a: "Yes, additional drivers can be added for a fee, provided they meet all age and insurance requirements." },
  { q: "What if my insurance deductible is over $2,500?", a: "We may require an additional security deposit or supplemental coverage in certain high-deductible cases." },
  { q: "Do you have any extra hidden fees?", a: "Transparency is key. We detail all costs upfront, including delivery, fuel, and security deposits." },
  { q: "Insurance requirements for business rentals?", a: "Business rentals require commercial insurance coverage or a verified corporate policy. Contact us for specifics." },
  { q: "Do you offer delivery service?", a: "Yes! We offer delivery to Hartsfield-Jackson Atlanta International Airport (ATL) and custom locations across the Atlanta area." },
  { q: "How many miles are included with my rental?", a: "Standard rentals typically include 100-150 miles per day. Excess mileage fees apply thereafter." },
  { q: "What is your security deposit policy?", a: "A refundable security deposit is required for all rentals. The amount varies based on the vehicle selected." },
  { q: "What is your cancellation policy?", a: "Cancellations made 72+ hours in advance are eligible for a credit. Late cancellations may incur fees." },
  { q: "Do you offer pick-up or drop-off outside of business hours?", a: "Yes, we offer flexible pick-up and drop-off options. Please coordinate with our team in advance for after-hours service." },
  { q: "Do you offer roadside assistance?", a: "Every rental includes 24/7 roadside assistance for your peace of mind while exploring the Atlanta area." },
  { q: "Less than 72 hour reservation?", a: "While we prefer advance booking, we can often accommodate last-minute requests. Check availability directly for same-day requests." },
  { q: "Do you offer military discount?", a: "We are proud to support our service members. Please inquire about our military discount program when booking." },
];

const specs = [
  { val: "$850", label: "Starting / Day" },
  { val: "Switch", label: "Collection" },
  { val: "ATL LA MIA", label: "Service" },
  { val: "VIP", label: "Concierge" },
];

export default function App() {
  const [showInventory, setShowInventory] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div className="relative bg-white font-sans selection:bg-accent selection:text-white overflow-x-hidden" id="home">
      {/* Background HUD Layers */}
      <div className="fixed inset-0 z-0 bg-grid-scan opacity-20 pointer-events-none" />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black opacity-[0.02]" />
      </div>

      {/* Floating HUD Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2 px-2 py-2 bg-white/40 backdrop-blur-xl border border-black/10 rounded-full pointer-events-auto shadow-sm">
        <div className="flex items-center gap-3 px-6 py-2 border-r border-black/10">
          <span className="text-xl font-bold tracking-tighter text-black hidden md:block uppercase font-mono">Switch Exotics</span>
        </div>
        <div className="flex items-center gap-1 md:gap-4 px-2">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.type === "page") {
                  e.preventDefault();
                  setShowInventory(true);
                }
              }}
              className="px-4 py-2 text-[9px] uppercase tracking-widest font-bold text-black/50 hover:text-black transition-colors cursor-pointer rounded-full hover:bg-black/5"
            >
              {link.name}
            </motion.a>
          ))}
        </div>
        <button 
          onClick={() => setShowInventory(true)}
          className="ml-2 bg-accent text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-accent/80 transition-colors shadow-sm"
        >
          Reserve
        </button>
      </nav>

      {/* HERO SECTION: IMMERSIVE EDITORIAL LAYOUT */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-12 py-32"
      >
        <div className="relative w-full max-w-[1800px] min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-0 overflow-hidden rounded-[2rem] bg-luxury-grey">
          {/* Subtle Video/Image Background for the entire container */}
          <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover grayscale opacity-[0.07] scale-110"
                referrerPolicy="no-referrer"
              />
          </div>

          {/* Left: Rail Navigation / Metadata */}
          <div className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col gap-12 z-20">
            <div className="flex flex-col gap-4">
              {["ATL", "LA", "MIA"].map((city, i) => (
                <div key={city} className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-[10px] font-mono text-black/20 group-hover:text-black transition-colors">0{i+1}</span>
                  <span className="text-xs font-bold tracking-[0.3em] uppercase group-hover:text-black text-black/40">{city}</span>
                </div>
              ))}
            </div>
            <div className="h-24 w-[1px] bg-black/10 mx-auto" />
            <div className="[writing-mode:vertical-rl] text-[8px] font-mono uppercase tracking-[0.8em] text-black/20">Active_Fleet_Status</div>
          </div>

          {/* Center: Major Title & Visual Interaction */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 lg:py-0">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >

              <h1 className="text-7xl md:text-9xl lg:text-[180px] font-accent font-extrabold leading-[0.75] uppercase tracking-[-0.06em] mb-12">
                Switch<br/>
                <span className="text-outline">Perception.</span>
              </h1>

              <div className="max-w-xl mx-auto mb-12">
                <p className="text-black/50 text-sm md:text-lg tracking-wide uppercase font-medium leading-relaxed">
                  Redefining automotive luxury across the US. <br className="hidden md:block" />
                  Premium fleets curated for the absolute elite.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => setShowInventory(true)}
                  className="w-full md:w-auto bg-black text-white px-12 py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-black/90 transition-all rounded-full shadow-lg flex items-center justify-center gap-4 group"
                >
                  Enter Registry
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <div className="flex gap-4">
                  <div className="p-5 border border-black/10 rounded-full hover:bg-white transition-all cursor-pointer">
                    <MousePointer2 size={20} className="text-black/40" />
                  </div>
                  <div className="p-5 border border-black/10 rounded-full hover:bg-white transition-all cursor-pointer">
                    <Play size={20} fill="currentColor" className="text-black" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Visual Accents */}
          <div className="absolute right-0 bottom-0 w-full lg:w-1/2 h-1/2 lg:h-full z-0 opacity-40 lg:opacity-100 pointer-events-none">
            <div className="absolute inset-0 bg-linear-to-r from-luxury-grey via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* HUD Overlay Elements: Floating Metadata */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:flex flex-col gap-24 z-20">
          <div className="text-right">
             <span className="text-[8px] font-mono text-black/30 tracking-[0.4em] uppercase block mb-2">COORD_SYS_88</span>
             <div className="text-2xl font-display font-light uppercase tracking-tighter">33.7490° N</div>
             <div className="text-2xl font-display font-light uppercase tracking-tighter">84.3880° W</div>
          </div>
          <div className="text-right">
             <span className="text-[8px] font-mono text-black/30 tracking-[0.4em] uppercase block mb-2">CURR_METRIC</span>
             <div className="text-xl font-bold uppercase tracking-widest text-accent">9.8s Access</div>
             <div className="text-[10px] font-mono text-black/20 uppercase mt-1">Response_Delta</div>
          </div>
        </div>
      </motion.section>

      {/* SHOWCASE SECTION */}
      <div id="fleet" className="relative z-10">
        <Showcase />
      </div>

      {/* SERVICES: BENTO DATA GRID */}
      <section id="services" className="relative z-20 py-40 bg-white px-10 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-accent mb-6 block">Concierge Protocols</span>
              <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase leading-[0.85]">Bespoke <br/> <span className="text-outline">Assistance.</span></h2>
            </div>
            <div className="flex flex-col items-end text-right">
              <p className="text-black/40 text-sm leading-relaxed max-w-xs mb-8 uppercase tracking-widest font-mono">
                White-glove logistics / 24-7 Client service / Seamless delivery
              </p>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-accent" />)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
            {/* Featured Bento Item */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:col-span-8 group relative bg-luxury-grey rounded-sm overflow-hidden border border-black/5 corner-bracket"
            >
              <img src="https://static.wixstatic.com/media/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-editorial grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent h-full" />
              <div className="absolute bottom-12 left-12">
                <span className="text-[10px] font-bold text-accent mb-4 block uppercase tracking-widest font-mono">MOD_LUXE_PRO</span>
                <h3 className="text-4xl font-bold mb-4 uppercase">Elegant Portraits</h3>
                <p className="text-black/40 text-sm max-w-xs uppercase tracking-widest leading-loose">High-fidelity imagery for our most prestigious marques.</p>
              </div>
              <div className="absolute top-12 right-12 text-3xl font-bold text-black/10 group-hover:text-accent/40 transition-colors">01</div>
            </motion.div>

            {/* Square Bento Item */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="md:col-span-4 group bg-accent p-12 rounded-sm flex flex-col justify-between hover:bg-accent/90 transition-colors cursor-pointer"
            >
              <div className="text-black">
                <span className="text-[10px] font-bold text-black/50 mb-4 block uppercase tracking-widest font-mono">MOD_ROM_PKG</span>
                <h3 className="text-4xl font-bold mb-6 uppercase">Goldline Journey</h3>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-black/70 text-xs uppercase tracking-[0.2em] leading-relaxed">Elevate your presence with bespoke livery and private entry concierge services.</p>
                <ArrowUpRight size={48} className="text-black/20 group-hover:text-black transition-all transform group-hover:translate-x-2 group-hover:-translate-y-2" />
              </div>
            </motion.div>

            {/* Small Bento Item */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:col-span-4 bg-luxury-grey p-10 border border-black/5 hover:border-accent/40 transition-colors"
            >
              <div className="flex flex-col h-full justify-between">
                <div className="w-12 h-12 bg-black/5 flex items-center justify-center rounded-sm">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase">24/7 Logistics</h4>
                  <p className="text-black/30 text-[10px] uppercase tracking-widest leading-relaxed">Round-the-clock technical and logistical support for all clients.</p>
                </div>
              </div>
            </motion.div>

            {/* Horizontal Bento Item */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:col-span-8 group relative bg-luxury-grey rounded-sm overflow-hidden border border-black/5 flex items-center p-12"
            >
              <div className="flex flex-col md:flex-row gap-12 items-center w-full">
                <div className="w-24 h-24 border border-accent/40 flex items-center justify-center rounded-full hud-glow shrink-0">
                  <div className="w-16 h-16 border border-black/10 rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4 uppercase">Bespoke Valet Delivery</h3>
                  <p className="text-black/40 text-sm uppercase tracking-widest leading-loose">Seamless door-to-door transit and personalized handover at any of our served multi-state locations.</p>
                </div>
                <button className="px-8 py-4 bg-black/5 border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors shrink-0">Inquire</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT: INDUSTRIAL STYLE */}
      <section id="about" className="relative z-20 py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-[1px] bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-accent">Core Protocol</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-display font-bold tracking-tighter uppercase leading-[0.85] mb-12">Total <br/> <span className="text-outline">Excellence.</span></h2>
              <div className="space-y-8 text-black/50 text-xl leading-relaxed font-light font-mono">
                <p>
                  &gt; SWITCH EXOTICS IS MORE THAN RENTALS.<br/>
                  &gt; WE ARE THE PREMIER OPERATORS OF ATL, LA, AND MIA.
                </p>
                <p className="text-base text-black/30 uppercase tracking-widest leading-loose">
                  Our fleet is a curated selection of automotive perfection. We provide the entry to the most exclusive destinations, maintained to obsessive standards of excellence and delivered with absolute discretion in major metropolitan hubs.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-2 gap-12 border-t border-black/5 pt-16">
                <div>
                  <p className="text-5xl font-bold mb-2">04</p>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold">Primary Hubs</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold">Execution</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative aspect-3/4 bg-black/[0.02] border border-black/10 flex items-center justify-center p-12 corner-bracket">
              <div className="absolute inset-0 opacity-10 blur-3xl bg-accent/20" />
              <img 
                src="https://static.wixstatic.com/media/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg" 
                className="w-full h-full object-cover border border-black/5 grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              {/* Technical Overlay */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-accent/40" />
              <div className="absolute top-0 left-1/2 w-px h-full bg-accent/40" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER: TECHNICAL DARK */}
      <footer id="contact" className="relative z-20 bg-white border-t border-black/5 px-10 pt-40 pb-20 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-4 mb-12">
              <div>
                <span className="text-2xl font-bold tracking-tighter text-black leading-none block uppercase font-mono">Switch Exotics</span>
                <span className="text-[10px] tracking-[0.4em] text-black/40 font-bold uppercase mt-1">Premier Registry</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-[9px] font-mono uppercase tracking-[0.2em] text-black/30">
              <p>REGIONS: ATL // LA // MIA</p>
              <p>STATUS: UNWAVERING_SERVICE</p>
              <p>ESTABLISHED: MMXXIV</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] mb-12 text-accent">The Collection</h4>
            <div className="flex flex-col gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-black/50">
              {["Master Registry", "Concierge Hub", "Client Portal", "Private Inquiry"].map(label => (
                <a key={label} href="#" className="hover:text-accent transition-colors w-fit">{label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] mb-12 text-accent">Contact Protocol</h4>
            <div className="flex flex-col gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-black/30">
              <p>Direct: GA_REGION_HUBS</p>
              <p>Secure: ENCRYPTED_INBOX</p>
              <p>Global: HUB_LOGISTICS</p>
            </div>
          </div>

          <div className="relative p-12 bg-black/[0.02] border border-black/10 corner-bracket overflow-hidden group">
            <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <h4 className="relative text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-black">Private Inquiry</h4>
            <button className="relative w-full py-5 bg-accent text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-sm">
              Initialize Experience
            </button>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto border-t border-black/5 pt-10 flex justify-between items-center">
          <p className="text-[9px] font-mono tracking-[0.4em] text-black/10 uppercase">© 2026 SWITCH_EXOTICS_OPERATIONS // ALL_RIGHTS_RESERVED.</p>
          <div className="hidden md:flex gap-10">
            {["Terms", "Privacy", "System"].map(link => (
              <a key={link} href="#" className="text-[9px] font-mono tracking-[0.4em] text-black/10 hover:text-black transition-colors uppercase">{link}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Grid Lines Global Overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none border-x border-black opacity-[0.03] mx-auto max-w-[1400px]" />

      {/* Fleet Overlay Component */}
      <AnimatePresence>
        {showInventory && (
          <Inventory onClose={() => setShowInventory(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}



