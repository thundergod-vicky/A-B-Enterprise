import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Calculator, ShieldCheck, FileText, 
  RefreshCw, Truck, ChevronRight, Compass,
  ArrowRight, CheckCircle2, Star, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, desc, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    style={{
      background: 'rgba(30, 41, 59, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '32px',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      transition: 'all 0.3s ease'
    }}
  >
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)'
    }}>
      <Icon size={28} />
    </div>
    <div>
      <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>{desc}</p>
    </div>
    <Link 
      to={link}
      style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#10b981',
        fontSize: '14px',
        fontWeight: 700,
        textDecoration: 'none'
      }}
    >
      Learn More <ArrowRight size={16} />
    </Link>
  </motion.div>
);

const Home = () => {
  const services = [
    { icon: FileText, title: 'Building Plans', desc: 'Expert architectural blueprints and 3D modeling tailored to your vision.', link: '#' },
    { icon: Calculator, title: 'Real-time Estimate', desc: 'Precision cost projection based on current Burdwan market material rates.', link: '/build' },
    { icon: ShieldCheck, title: 'Full Contract Home', desc: 'Turnkey construction solutions from foundation to final paint.', link: '#' },
    { icon: RefreshCw, title: 'Mutation', desc: 'Hassle-free assistance with land record updates and legal documentation.', link: '#' },
    { icon: Compass, title: 'Conversion', desc: 'Professional guidance for land-use conversion and regulatory approvals.', link: '#' },
    { icon: Truck, title: 'Material Supply', desc: 'Premium building materials delivered directly to your site at wholesale rates.', link: '#' },
  ];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav style={{
        padding: '24px 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(20px)',
        background: 'rgba(15, 23, 42, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={20} color="white" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>A B Enterprise</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link to="/build" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Analytics</Link>
          <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Services</a>
          <Link 
            to="/build" 
            style={{ 
              padding: '12px 24px', 
              background: '#10b981', 
              color: 'white', 
              borderRadius: '12px', 
              textDecoration: 'none', 
              fontSize: '14px', 
              fontWeight: 800,
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)'
            }}
          >
            Get Estimate
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '200px 5% 100px', textAlign: 'center', position: 'relative' }}>
        {/* Background Gradients */}
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '100px', color: '#34d399', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }}>
            <Star size={14} /> Burdwan's Premier Construction Partner
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-2px' }}>
            Build Your Legacy with <br />
            <span style={{ background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Absolute Precision.</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            From architectural blueprints to material logistics and full contract construction. 
            We provide data-driven estimates and turnkey solutions for modern living in Burdwan.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link 
              to="/build" 
              style={{ padding: '18px 36px', background: '#10b981', color: 'white', borderRadius: '14px', textDecoration: 'none', fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 12px 24px rgba(16, 185, 129, 0.3)' }}
            >
              Start Estimation <ArrowRight size={20} />
            </Link>
            <button style={{ padding: '18px 36px', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', fontSize: '16px', fontWeight: 800 }}>
              View Our Work
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section id="services" style={{ padding: '100px 5%', background: 'rgba(2, 6, 23, 0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Our Comprehensive Solutions</h2>
          <p style={{ color: '#94a3b8' }}>Every tool and service you need to build your dream home, all in one place.</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 5%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { label: 'Successful Projects', val: '250+' },
            { label: 'Happy Families', val: '180+' },
            { label: 'Years Experience', val: '12+' },
            { label: 'Cost Accuracy', val: '98%' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#10b981', marginBottom: '8px' }}>{stat.val}</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '64px 5% 40px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#475569', fontWeight: 700, letterSpacing: '1px' }}>
          © 2026 A B ENTERPRISE · BURDWAN DIVISION · ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
};

export default Home;
