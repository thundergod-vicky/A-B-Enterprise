import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, HardHat, Ruler, Zap, Hammer, 
  Briefcase, Phone, Mail, MapPin, ArrowRight,
  Star, Quote, ChevronRight, Menu, X, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation Constants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const NavLink = ({ href, children }) => (
  <motion.a 
    href={href} 
    whileHover={{ scale: 1.05, color: '#facc15' }}
    style={{ 
      color: '#94a3b8', 
      textDecoration: 'none', 
      fontSize: '14px', 
      fontWeight: 700,
      transition: 'color 0.3s',
      letterSpacing: '1px'
    }}
  >
    {children}
  </motion.a>
);

const ServiceBox = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ 
      y: -15, 
      backgroundColor: 'rgba(250, 204, 21, 0.05)',
      borderColor: 'rgba(250, 204, 21, 0.3)'
    }}
    style={{
      background: 'rgba(15, 15, 15, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '48px 40px',
      borderRadius: '32px',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
    }}
  >
    <div style={{ 
      width: '64px', height: '64px', background: '#facc15', 
      borderRadius: '16px', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', color: '#000', marginBottom: '32px',
      boxShadow: '0 10px 30px rgba(250, 204, 21, 0.3)'
    }}>
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px', color: 'white', letterSpacing: '-0.5px' }}>{title}</h3>
    <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>{desc}</p>
    <motion.div whileHover={{ x: 10 }} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#facc15', fontSize: '13px', fontWeight: 900, cursor: 'pointer' }}>
      VIEW DETAILS <ArrowUpRight size={16} />
    </motion.div>
  </motion.div>
);

const Home = () => {
  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* ─── NAVIGATION ─── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '24px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <div style={{ width: 44, height: 44, background: '#facc15', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 color="black" size={24} strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 900, fontSize: '24px', letterSpacing: '-1px' }}>AB ENTERPRISE</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', gap: '40px', alignItems: 'center' }}
        >
          <NavLink href="#whyus">WHY US?</NavLink>
          <NavLink href="#reviews">REVIEWS</NavLink>
          <NavLink href="#about">ABOUT US</NavLink>
          <Link to="/build" style={{ 
            background: '#facc15', color: 'black', padding: '12px 24px', 
            borderRadius: '12px', textDecoration: 'none', fontWeight: 900, fontSize: '14px',
            boxShadow: '0 10px 25px rgba(250, 204, 21, 0.25)',
            transition: 'transform 0.2s'
          }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            GET ESTIMATE
          </Link>
        </motion.div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <header style={{ 
        height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', padding: '0 5%', position: 'relative', overflow: 'hidden'
      }}>
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ position: 'absolute', top: '20%', left: '30%', width: '600px', height: '600px', background: 'radial-gradient(circle, #facc15 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '32px' }}
          >
            READY TO
          </motion.div>
          <h3 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: '#94a3b8', marginBottom: '10px', letterSpacing: '-1px' }}>TURN YOUR VISION INTO</h3>
          <h1 style={{ fontSize: 'clamp(64px, 12vw, 160px)', fontWeight: 950, color: 'white', marginBottom: '60px', letterSpacing: '-6px', lineHeight: 0.9 }}>
            REALITY<span style={{ color: '#facc15' }}>?</span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}
          >
            <a href="#contact" style={{ padding: '20px 48px', background: '#facc15', color: 'black', borderRadius: '14px', textDecoration: 'none', fontWeight: 900, fontSize: '18px', boxShadow: '0 15px 35px rgba(250, 204, 21, 0.3)' }}>CONTACT US</a>
            <a href="#projects" style={{ padding: '20px 48px', background: 'transparent', border: '2px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '14px', textDecoration: 'none', fontWeight: 900, fontSize: '18px' }}>OUR WORKS</a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '40px', color: '#facc15' }}
        >
          <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, #facc15, transparent)' }} />
        </motion.div>
      </header>

      {/* ─── WHY US ─── */}
      <section id="whyus" style={{ padding: '160px 10%', background: '#050505' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 {...fadeInUp} style={{ fontSize: '48px', fontWeight: 950, marginBottom: '48px', color: 'white', letterSpacing: '-2px' }}>
            WHY <span style={{ color: '#facc15' }}>AB ENTERPRISE?</span>
          </motion.h2>
          <motion.p {...fadeInUp} transition={{ delay: 0.2 }} style={{ fontSize: '22px', lineHeight: '1.8', color: '#94a3b8', fontWeight: 400 }}>
            AB Enterprise excels in delivering high-quality construction projects with a focus on civil works. Our commitment to crafting quality and building trust is the foundation of our business. With a proven track record of successful completions, we bring expertise, precision, and reliability to every project. We pride ourselves on timely delivery and cost-effective solutions.
          </motion.p>
        </div>
      </section>

      {/* ─── ABOUT US ─── */}
      <section id="about" style={{ padding: '160px 10%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '100px', alignItems: 'center' }}>
          <motion.div {...fadeInUp}>
            <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '4px', marginBottom: '24px' }}>OUR LEGACY</h2>
            <h3 style={{ fontSize: '56px', fontWeight: 950, marginBottom: '32px', lineHeight: 1.1, letterSpacing: '-2px' }}>Crafting Quality, <br/>Building <span style={{ color: '#facc15' }}>Trust.</span></h3>
            <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.8', marginBottom: '48px' }}>
              Founded by Akshoy Kumar Paul in Durgapur, we have grown from a local contractor to a respected leader in development. Our journey began with a vision to transform the landscape through innovative building solutions.
            </p>
            <div style={{ display: 'flex', gap: '32px' }}>
              <a href="#reviews" style={{ color: '#facc15', fontWeight: 900, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, fontSize: '14px' }}>TESTIMONY <ArrowRight size={18}/></a>
              <a href="#projects" style={{ color: '#facc15', fontWeight: 900, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, fontSize: '14px' }}>KNOW MORE <ArrowRight size={18}/></a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ position: 'relative' }}
          >
            <div style={{ width: '100%', height: '500px', background: 'rgba(250, 204, 21, 0.05)', borderRadius: '48px', border: '1px solid rgba(250, 204, 21, 0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', background: '#facc15', padding: '48px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', color: 'black' }}>
              <div style={{ fontSize: '48px', fontWeight: 950, lineHeight: 1 }}>12+</div>
              <div style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '1px', marginTop: '8px' }}>YEARS OF EXCELLENCE</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN SERVICES ─── */}
      <section id="projects" style={{ padding: '160px 10%', background: '#050505' }}>
        <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '6px', marginBottom: '24px' }}>EXPERTISE</h2>
          <h3 style={{ fontSize: '48px', fontWeight: 950, letterSpacing: '-2px' }}>MAIN SERVICES</h3>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          <ServiceBox delay={0.1} icon={HardHat} title="CONSTRUCTION" desc="Comprehensive construction services for residential, commercial, and industrial projects." />
          <ServiceBox delay={0.2} icon={Ruler} title="ARCHITECTURAL DESIGN" desc="Creating functional designs that transform your vision into reality, blending beauty and utility." />
          <ServiceBox delay={0.3} icon={Zap} title="ELECTRICAL WORKS" desc="Integrating modern electronic systems in new constructions for enhanced efficiency." />
          <ServiceBox delay={0.4} icon={Hammer} title="RECONSTRUCTION" desc="Breathing new life into existing structures, modernizing and revitalizing buildings." />
          <ServiceBox delay={0.5} icon={Briefcase} title="GENERAL CONTRACTING" desc="Managing all aspects of your project, ensuring seamless coordination." />
          <ServiceBox delay={0.6} icon={Building2} title="GOVT CONSTRUCTION" desc="Trusted partner for large-scale public infrastructure and government projects." />
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" style={{ padding: '160px 10%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '6px', marginBottom: '80px' }}>TESTIMONIALS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {[
            { text: "AB Enterprise partnership was outstanding. Professionalism and dedication ensured our project's success. Highly recommended collaboration.", author: "MANISHANKAR BUILDER" },
            { text: "Working with AB Enterprise was a pleasure. A standout client.", author: "TEAM PIXELATE" },
            { text: "Partnering with AB Enterprise was exceptional. Professional, dedicated, and collaborative, ensuring successful projects.", author: "BIDUT MONDAL & SYED SALAUDDIN" }
          ].map((rev, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '56px 48px', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              <Quote size={48} color="#facc15" style={{ marginBottom: '32px', opacity: 0.4 }} />
              <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.8' }}>"{rev.text}"</p>
              <div style={{ fontSize: '14px', fontWeight: 950, color: '#facc15', letterSpacing: '1px' }}>- {rev.author}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT US ─── */}
      <section id="contact" style={{ padding: '160px 10%', background: '#0a0a0a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '100px' }}>
          <div>
            <motion.h2 {...fadeInUp} style={{ fontSize: '48px', fontWeight: 950, marginBottom: '32px', letterSpacing: '-2px' }}>GET IN <span style={{ color: '#facc15' }}>TOUCH</span></motion.h2>
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#facc15', marginBottom: '12px' }}>AKSHOY KUMAR PAUL</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.8' }}>
                GOVERNMENT CONTRACTOR & DEVELOPER. CIVIL CONSTRUCTION, ELECTRICAL, ROAD WORK, MECHANICAL, EXPERT IN PILING WORK.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(250, 204, 21, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 900 }}>Headquarters</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>1/3, Abbasan Pally, Durgapur-713201</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(250, 204, 21, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>
                  <Phone size={24} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>+91 93336 55599 / 93823 74057</div>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(250, 204, 21, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>
                  <Mail size={24} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>contact@abenterpriseco.com</div>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '56px', borderRadius: '48px', border: '1px solid rgba(255, 255, 255, 0.05)' }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px' }}>Inquire Now</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '20px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', color: 'white', outline: 'none' }} />
              <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '20px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', color: 'white', outline: 'none' }} />
              <textarea placeholder="Tell us about your project" rows={5} style={{ width: '100%', padding: '20px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', color: 'white', outline: 'none', resize: 'none' }} />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ padding: '20px', background: '#facc15', color: 'black', borderRadius: '16px', fontWeight: 950, border: 'none', cursor: 'pointer', fontSize: '16px', marginTop: '12px' }}>
                SUBMIT INQUIRY
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: '64px 10%', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ fontSize: '12px', color: '#475569', fontWeight: 900, letterSpacing: '2px' }}>
          © 2026 AB ENTERPRISE · DURGAPUR OFFICE · ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
};

export default Home;
