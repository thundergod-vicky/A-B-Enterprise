import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Map as MapIcon, Globe, Box, Layers, TrendingUp,
  Calculator, Compass, ChevronRight, Info, ZoomIn, ZoomOut
} from 'lucide-react';
import MapComponent from './components/MapComponent';
import ThreeDViewer from './components/ThreeDViewer';
import { pricingData } from './data/pricingData';
import { formatCurrency } from './utils/mathUtils';

export default function App() {
  const [section, setSection] = useState('national');
  const [region, setRegion] = useState('west_bengal');
  const [selectedPoint, setSelectedPoint] = useState(pricingData.west_bengal[0]);
  const [is3DMode, setIs3DMode] = useState(false);
  const [inputArea, setInputArea] = useState('1000');

  const activeData = region === 'west_bengal' ? pricingData.west_bengal : pricingData.national;

  const handleRegion = (r) => {
    setRegion(r);
    setSelectedPoint(r === 'west_bengal' ? pricingData.west_bengal[0] : pricingData.national[0]);
  };

  const area = parseInt(inputArea, 10) || 0;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#0f172a', fontFamily: "'Outfit', sans-serif", color: '#f8fafc' }}>

      {/* ─── SIDEBAR ─── */}
      <aside style={{
        width: 300, minWidth: 300, height: '100%',
        background: '#1e293b',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
        zIndex: 20,
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(16,185,129,0.3)',
            }}>
              <Compass size={20} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px', color: '#f8fafc' }}>Enterprise</div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: '#10b981', textTransform: 'uppercase' }}>Ground Analytics</div>
            </div>
          </div>
        </div>

        {/* National / Intl Toggle */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', background: '#0f172a', borderRadius: 10, padding: 4, gap: 4 }}>
            {['national', 'international'].map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                style={{
                  flex: 1, padding: '8px 0',
                  borderRadius: 7, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 700,
                  fontFamily: "'Outfit', sans-serif",
                  transition: 'all 0.25s',
                  background: section === s ? (s === 'national' ? '#10b981' : '#f59e0b') : 'transparent',
                  color: section === s ? 'white' : '#64748b',
                  boxShadow: section === s ? `0 4px 12px rgba(${s === 'national' ? '16,185,129' : '245,158,11'},0.35)` : 'none',
                }}
              >
                {s === 'national' ? '🗺 National' : '🌐 Intl'}
              </button>
            ))}
          </div>
        </div>

        {/* Fixed: Region Selector */}
        {section === 'national' && (
          <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: '#475569', textTransform: 'uppercase', marginBottom: 10 }}>Select Region</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'west_bengal', label: 'West Bengal' },
                { key: 'all_india', label: 'All India' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleRegion(key)}
                  style={{
                    flex: 1, padding: '8px 0',
                    borderRadius: 8, cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 11, fontWeight: 700,
                    border: `1px solid ${region === key ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.06)'}`,
                    background: region === key ? 'rgba(16,185,129,0.1)' : 'transparent',
                    color: region === key ? '#34d399' : '#64748b',
                    transition: 'all 0.2s',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable City List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 0' }}>
          {section === 'national' ? (
            <>
              {/* City List */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: '#475569', textTransform: 'uppercase', marginBottom: 10 }}>Markets</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {activeData.map((point) => {
                    const isActive = selectedPoint.id === point.id;
                    return (
                      <button
                        key={point.id}
                        onClick={() => setSelectedPoint(point)}
                        style={{
                          width: '100%', textAlign: 'left',
                          padding: '10px 12px',
                          borderRadius: 10, cursor: 'pointer',
                          border: `1px solid ${isActive ? 'rgba(16,185,129,0.4)' : 'transparent'}`,
                          background: isActive ? 'rgba(16,185,129,0.08)' : 'transparent',
                          fontFamily: "'Outfit', sans-serif",
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#34d399' : '#cbd5e1', marginBottom: 2 }}>
                          {point.name}
                        </div>
                        <div style={{ fontSize: 11, color: isActive ? '#6ee7b7' : '#64748b', fontWeight: 600 }}>
                          {formatCurrency(point.priceSqft)} <span style={{ fontWeight: 400, color: '#64748b' }}>/ sqft</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>


            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 48 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', boxShadow: '0 0 30px rgba(245,158,11,0.1)',
              }}>
                <Globe size={32} color="#f59e0b" />
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#f59e0b', letterSpacing: '-0.5px', marginBottom: 8 }}>Coming Soon</div>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.7, padding: '0 16px' }}>
                International market data is being integrated into our real-time pricing engine.
              </div>
            </div>
          )}
        </div>

        {/* Pinned Area Input — Always Visible */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, background: '#1e293b' }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: '#475569', textTransform: 'uppercase', marginBottom: 8 }}>Area Input</div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              inputMode="numeric"
              value={inputArea}
              onChange={(e) => {
                // Only allow digits, max 5 characters
                const raw = e.target.value.replace(/[^0-9]/g, '');
                if (raw.length <= 5) setInputArea(raw);
              }}
              placeholder="Enter area..."
              style={{
                width: '100%',
                padding: '12px 52px 12px 14px',
                background: '#0f172a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, color: '#f8fafc',
                fontSize: 15, fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#10b981'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <span style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              fontSize: 10, fontWeight: 800, color: '#10b981', letterSpacing: '0.1em',
            }}>SQFT</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#334155', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live · Q2 2026 Estimates</span>
        </div>
      </aside>

      {/* ─── MAIN AREA ─── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

        {/* Header floating over map */}
        <div style={{
          position: 'absolute', top: 20, left: 20, right: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          zIndex: 400, pointerEvents: 'none',
        }}>
          {/* Active market card */}
          <div style={{
            background: 'rgba(15,23,42,0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            padding: '14px 20px',
            display: 'flex', gap: 20, alignItems: 'center',
            pointerEvents: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 3 }}>Active Market</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>{selectedPoint.name}</div>
            </div>
            <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)' }} />
            <div>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 3 }}>Ground Price</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981', letterSpacing: '-0.5px' }}>
                {formatCurrency(selectedPoint.priceSqft)}
                <span style={{ fontSize: 12, fontWeight: 500, color: '#475569', marginLeft: 4 }}>/ sqft</span>
              </div>
            </div>
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: 8, pointerEvents: 'auto' }}>
            {[
              { id: false, Icon: Layers, label: 'Map' },
              { id: true, Icon: Box, label: '3D' },
            ].map(({ id, Icon, label }) => (
              <button
                key={String(id)}
                onClick={() => setIs3DMode(id)}
                style={{
                  width: 46, height: 46, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                  background: is3DMode === id ? '#10b981' : 'rgba(15,23,42,0.92)',
                  backdropFilter: 'blur(12px)',
                  color: is3DMode === id ? 'white' : '#64748b',
                  transition: 'all 0.2s',
                  boxShadow: is3DMode === id ? '0 8px 20px rgba(16,185,129,0.4)' : '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Map / 3D View */}
        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            {!is3DMode ? (
              <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', width: '100%' }}>
                <MapComponent
                  data={activeData}
                  center={[selectedPoint.lat, selectedPoint.lng]}
                  onMarkerClick={setSelectedPoint}
                  selectedId={selectedPoint.id}
                />
              </motion.div>
            ) : (
              <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', width: '100%', padding: 24 }}>
                <ThreeDViewer />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── BOTTOM METRICS BAR ─── */}
        <div style={{
          height: 160,
          background: '#1e293b',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', gap: 16, padding: '16px 20px',
          overflow: 'hidden',
        }}>

          {/* Unit Conversions Card */}
          <div style={{
            flex: 1,
            background: '#0f172a',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '14px 20px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Calculator size={14} color="#10b981" />
              <span style={{ fontSize: 9, fontWeight: 800, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Unit Equivalents · {area.toLocaleString()} Sq.Ft
              </span>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {[
                { label: 'Acres', value: (area / 43560).toFixed(4) },
                { label: 'Bigha', value: (area / 14400).toFixed(3) },
                { label: 'Katha', value: (area / 720).toFixed(2) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#f8fafc', letterSpacing: '-1px', lineHeight: 1 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: '#1e3a5f', marginTop: 8 }}>1 Katha = 720 Sq.Ft · 1 Bigha = 20 Katha · 1 Acre = 43,560 Sq.Ft</div>
          </div>

          {/* Acquisition Estimate Card */}
          <div style={{
            flex: 1,
            background: 'rgba(16,185,129,0.04)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 16,
            padding: '14px 20px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <TrendingUp size={14} color="#10b981" />
              <span style={{ fontSize: 9, fontWeight: 800, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Acquisition Estimate</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Total Asset Value</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#10b981', letterSpacing: '-1.5px', lineHeight: 1 }}>
                  {formatCurrency(selectedPoint.priceSqft * area)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  display: 'inline-block', padding: '5px 12px',
                  background: 'rgba(16,185,129,0.15)', borderRadius: 20,
                  fontSize: 10, fontWeight: 800, color: '#34d399', marginBottom: 4,
                  letterSpacing: '0.05em',
                }}>
                  ↗ {selectedPoint.trend.toUpperCase()} TREND
                </div>
                <div style={{ fontSize: 10, color: '#475569', fontWeight: 600 }}>Market Stability: High</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {[
                { label: 'Per Bigha', value: formatCurrency(selectedPoint.priceSqft * 14400) },
                { label: 'Per Katha', value: formatCurrency(selectedPoint.priceSqft * 720) },
                { label: 'Per Acre', value: formatCurrency(selectedPoint.priceSqft * 43560) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#334155', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
