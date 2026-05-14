import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, HardHat, Ruler, Zap, Hammer, 
  Briefcase, Phone, Mail, MapPin, ArrowRight, Quote, ArrowUpRight, Box
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Google Form Submission (entry IDs extracted from source)
    const GFORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdYoQo8gTL-sLdrq97rzhejDAwiRq04EA5WUbcUqydtm5T_vA/formResponse';
    
    const googleFormData = new FormData();
    googleFormData.append('entry.1996467476', formData.name);
    googleFormData.append('entry.429778815', formData.email);
    googleFormData.append('entry.683007506', formData.phone);
    googleFormData.append('entry.1133538738', formData.address);
    googleFormData.append('entry.1106594072', formData.projectType);
    googleFormData.append('entry.1301261820', formData.description);

    try {
      // Background submission to Google Forms
      await fetch(GFORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });

      // Prepare WhatsApp message
      const message = `*New Project Inquiry - AB Enterprise*%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Phone:* ${formData.phone}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Project Address:* ${formData.address}%0A` +
        `*Project Type:* ${formData.projectType}%0A` +
        `*Requirements:* ${formData.description}`;

      // Forward to WhatsApp
      window.location.href = `https://wa.me/917908926139?text=${message}`;
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* ─── NAVIGATION ─── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        background: isScrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent', 
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        padding: isScrolled ? '16px 5%' : '32px 5%', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'all 0.4s ease'
      }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <div style={{ width: 44, height: 44, background: '#facc15', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 color="black" size={24} strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 900, fontSize: '24px', letterSpacing: '-1px', textShadow: isScrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.5)' }}>AB ENTERPRISE</span>
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
        textAlign: 'center', padding: '0 5%', position: 'relative', overflow: 'hidden',
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%), url("/hero-bg.png")',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
      }}>
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
            style={{ fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '32px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            READY TO
          </motion.div>
          <h3 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: '#f8fafc', marginBottom: '10px', letterSpacing: '-1px', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>TURN YOUR DREAM INTO</h3>
          <h1 style={{ fontSize: 'clamp(64px, 12vw, 160px)', fontWeight: 950, color: 'white', marginBottom: '60px', letterSpacing: '-6px', lineHeight: 0.9, textShadow: '0 10px 40px rgba(0,0,0,0.9)' }}>
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
            AB Enterprise excels in delivering high-quality construction projects with a focus on civil works. Our commitment to crafting quality and building trust is the foundation of our business.
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
              Founded by Nilanjan Chatterjee in Barddhaman, we have grown from a local contractor to a respected leader in development.
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
            <img 
              src="/updated.png" 
              alt="AB Enterprise Excellence"
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '48px', border: '1px solid rgba(250, 204, 21, 0.1)' }} 
            />
            <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', background: '#facc15', padding: '48px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', color: 'black' }}>
              <div style={{ fontSize: '48px', fontWeight: 950, lineHeight: 1 }}>5+</div>
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
          <ServiceBox delay={0.1} icon={Box} title="FOUNDATION AND STRUCTURE" desc="Our core expertise: specialized in high-integrity foundation work and complex structural engineering." />
          <ServiceBox delay={0.2} icon={Ruler} title="ARCHITECTURAL DESIGN" desc="Innovative 2D/3D building plans that blend aesthetic appeal with structural functionality." />
          <ServiceBox delay={0.3} icon={Briefcase} title="GENERAL CONTRACTING" desc="End-to-end management of construction projects, ensuring precision and timely delivery." />
          <ServiceBox delay={0.4} icon={Zap} title="ELECTRICAL WORKS" desc="Modern electrical system integration for residential complexes and commercial units." />
          <ServiceBox delay={0.5} icon={Hammer} title="RENOVATION" desc="Professional structural retrofitting and revitalization of existing buildings." />
          <ServiceBox delay={0.6} icon={HardHat} title="CIVIL MAINTENANCE" desc="Expert repair and upkeep services for existing structures, ensuring longevity and safety." />
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" style={{ padding: '160px 10%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '6px', marginBottom: '80px' }}>TESTIMONIALS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {[
            { text: "Nilanjan's expertise in foundation and structural work is unmatched. They delivered our apartment complex ahead of schedule.", author: "SUBRATA BANERJEE (ARCHITECT)" },
            { text: "From initial building plans to the final electrical finishing, AB Enterprise handled our dream home project with extreme professionalism.", author: "MRS. PRIYANKA DAS (HOME OWNER)" },
            { text: "Their team's dedication to structural safety and adherence to modern building standards make them the best contractors in Barddhaman.", author: "RAJESH MONDAL (DEVELOPER)" }
          ].map((rev, i) => (
            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.2 }} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '56px 48px', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#facc15', marginBottom: '12px' }}>NILANJAN CHATTERJEE</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.8' }}>
                CONTRACTOR . CIVIL CONSTRUCTION, ELECTRICAL, EXPERT IN FOUNDATION AND STRUCTURE.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(250, 204, 21, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 900 }}>Headquarters</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>KabarKhana, Natunpally, Barddhaman, WestBengal</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(250, 204, 21, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>
                  <Phone size={24} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>+91 79089 26139</div>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(250, 204, 21, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>
                  <Mail size={24} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>abenterprise.bwn@gmail.com</div>
              </div>
            </div>
          </div>
          
          <motion.div {...fadeInUp} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '56px', borderRadius: '48px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px' }}>Inquire Now</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input 
                name="name" type="text" placeholder="Full Name" required 
                value={formData.name} onChange={handleInputChange}
                style={{ gridColumn: 'span 2', padding: '18px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} 
              />
              <input 
                name="email" type="email" placeholder="Email Address" required 
                value={formData.email} onChange={handleInputChange}
                style={{ padding: '18px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} 
              />
              <input 
                name="phone" type="tel" placeholder="Phone Number" required 
                value={formData.phone} onChange={handleInputChange}
                style={{ padding: '18px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} 
              />
              <input 
                name="address" type="text" placeholder="Project Site Address" required 
                value={formData.address} onChange={handleInputChange}
                style={{ gridColumn: 'span 2', padding: '18px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', outline: 'none' }} 
              />
              <select 
                name="projectType" required value={formData.projectType} onChange={handleInputChange}
                style={{ gridColumn: 'span 2', padding: '18px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', outline: 'none', appearance: 'none', cursor: 'pointer' }}
              >
                <option value="" disabled>Select Project Type</option>
                <option value="residential">Residential Construction</option>
                <option value="commercial">Commercial Complex</option>
                <option value="government">Government Infrastructure</option>
                <option value="architectural">Architectural Design & 3D</option>
                <option value="mutation">Mutation & Conversion</option>
                <option value="supply">Material Supply</option>
              </select>
              <textarea 
                name="description" placeholder="Describe your project requirements..." rows={4} required 
                value={formData.description} onChange={handleInputChange}
                style={{ gridColumn: 'span 2', padding: '18px', background: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white', outline: 'none', resize: 'none' }} 
              />
              <motion.button 
                type="submit" disabled={isSubmitting}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
                style={{ gridColumn: 'span 2', padding: '18px', background: '#facc15', color: 'black', borderRadius: '12px', fontWeight: 950, border: 'none', cursor: 'pointer', fontSize: '15px', marginTop: '10px', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'PROCESSING...' : 'SUBMIT PROJECT INQUIRY'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#050505', padding: '100px 10% 40px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '80px', marginBottom: '80px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '24px' }}>
              <div style={{ width: 40, height: 40, background: '#facc15', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 color="black" size={20} strokeWidth={2.5} />
              </div>
              <span style={{ fontWeight: 900, fontSize: '20px', letterSpacing: '-0.5px' }}>AB ENTERPRISE</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.8' }}>
              Leading construction and structural engineering firm in Barddhaman. Dedicated to foundation integrity since 2012.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '2px', marginBottom: '32px' }}>QUICK LINKS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>About Us</a>
              <a href="#projects" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Our Services</a>
              <a href="#reviews" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Testimonials</a>
              <Link to="/build" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Get Estimate</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '2px', marginBottom: '32px' }}>EXPERTISE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Foundation & Structure</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Architectural Design</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Civil Maintenance</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Renovation</div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#facc15', letterSpacing: '2px', marginBottom: '32px' }}>CONTACT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Phone size={16} color="#facc15" />
                <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>+91 79089 26139</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Mail size={16} color="#facc15" />
                <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>abenterprise.bwn@gmail.com</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={16} color="#facc15" style={{ marginTop: '4px' }} />
                <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>KabarKhana, Natunpally, Barddhaman</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#475569', fontWeight: 700, letterSpacing: '1px' }}>
            © 2026 AB ENTERPRISE · BARDDHAMAN · WEST BENGAL
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
