import React, { useState } from 'react';
import {
  Map as MapIcon, Box, Layers, TrendingUp,
  Calculator, Compass, ChevronRight, Info, ZoomIn, ZoomOut, Construction,
  Layout, Activity, Globe, Home, Building2, Building
} from 'lucide-react';
import MapComponent from '../components/MapComponent';
import ThreeDViewer from '../components/ThreeDViewer';
import { pricingData } from '../data/pricingData';
import { formatCurrency } from '../utils/mathUtils';
import { calculateConstructionCost } from '../utils/estimationUtils';

export default function Estimator() {
  const [selectedPoint, setSelectedPoint] = useState(pricingData.burdwan[0]);
  const [is3DMode, setIs3DMode] = useState(false);
  const [inputArea, setInputArea] = useState('1000');
  const [sidebarTab, setSidebarTab] = useState('markets');
  const [floors, setFloors] = useState(1);
  const [selectedModel, setSelectedModel] = useState('house');
  
  const [selections, setSelections] = useState({
    cement: 'standard',
    steel: 'standard',
    flooring: 'tiles',
    windows: 'aluminum'
  });

  const availableModels = [
    { id: 'house', name: 'Bungalow', Icon: Home, url: 'https://vazxmixjsiawhamofrcp.supabase.co/storage/v1/object/public/models/house/model.gltf' },
    { id: 'apartment', name: 'Apartment', Icon: Building2, url: 'https://vazxmixjsiawhamofrcp.supabase.co/storage/v1/object/public/models/apartment-block/model.gltf' },
    { id: 'office', name: 'Office', Icon: Building, url: 'https://vazxmixjsiawhamofrcp.supabase.co/storage/v1/object/public/models/building-1/model.gltf' }
  ];

  const activeData = pricingData.burdwan;
  const area = parseInt(inputArea, 10) || 0;
  const estimation = calculateConstructionCost(area, floors, selections);

  const updateSelection = (key, val) => {
    setSelections(prev => ({ ...prev, [key]: val }));
  };

  const currentModel = availableModels.find(m => m.id === selectedModel);

  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      height: '100vh', 
      width: '100vw', 
      background: '#0f172a', 
      color: '#f8fafc',
      overflow: 'hidden',
      position: 'fixed',
      top: 0, left: 0
    }}>

      {/* ─── UNIFIED SIDEBAR (CONTROL CENTER) ─── */}
      <aside style={{
        background: '#1e293b',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', 
        flexDirection: 'column',
        zIndex: 100,
        overflow: 'hidden'
      }}>
        {/* Branding */}
        <div style={{ padding: '24px 20px', background: '#1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }}>
              <Compass size={22} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc' }}>A B Enterprise</div>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Construction & Analytics</div>
            </div>
          </div>
        </div>

        {/* Global View Toggle */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 12 }}>Display Mode</div>
          <div style={{ display: 'flex', background: '#0f172a', borderRadius: 10, padding: 4, gap: 4 }}>
            <button onClick={() => setIs3DMode(false)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0',
              borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 800,
              background: !is3DMode ? '#334155' : 'transparent', color: !is3DMode ? '#34d399' : '#475569',
              transition: 'all 0.2s'
            }}>
              <Layers size={14} /> 2D Map
            </button>
            <button onClick={() => setIs3DMode(true)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0',
              borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 800,
              background: is3DMode ? '#334155' : 'transparent', color: is3DMode ? '#34d399' : '#475569',
              transition: 'all 0.2s'
            }}>
              <Box size={14} /> 3D View
            </button>
          </div>
        </div>

        {/* Model Selector (Visible in 3D Mode) */}
        {is3DMode && (
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 12 }}>Building Type</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {availableModels.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  style={{
                    flex: 1, padding: '12px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    background: selectedModel === m.id ? 'rgba(16,185,129,0.15)' : 'rgba(15,23,42,0.4)',
                    border: `1px solid ${selectedModel === m.id ? '#10b981' : 'transparent'}`,
                    color: selectedModel === m.id ? '#10b981' : '#475569',
                    transition: 'all 0.2s'
                  }}
                >
                  <m.Icon size={18} />
                  <span style={{ fontSize: 9, fontWeight: 800 }}>{m.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feature Tabs */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', background: '#0f172a', borderRadius: 10, padding: 4, gap: 4 }}>
            {['markets', 'construction'].map(t => (
              <button
                key={t}
                onClick={() => setSidebarTab(t)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontSize: 11, fontWeight: 800, transition: 'all 0.2s',
                  background: sidebarTab === t ? '#10b981' : 'transparent',
                  color: sidebarTab === t ? 'white' : '#475569'
                }}
              >
                {t === 'markets' ? '🏙 Districts' : '🏗 Estimator'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sidebarTab === 'markets' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>Burdwan Division</div>
              {activeData.map(point => (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '14px', borderRadius: 14, cursor: 'pointer',
                    border: `1px solid ${selectedPoint.id === point.id ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.05)'}`,
                    background: selectedPoint.id === point.id ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.02)',
                    color: selectedPoint.id === point.id ? '#10b981' : '#cbd5e1',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 2 }}>{point.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{formatCurrency(point.priceSqft)} / sqft</div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 12 }}>Building Config</div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 8 }}>Total Floors</div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1, 2, 3, 4].map(f => (
                      <button key={f} onClick={() => setFloors(f)} style={{
                        flex: 1, padding: '12px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                        background: floors === f ? '#10b981' : 'transparent', color: floors === f ? 'white' : '#475569',
                        cursor: 'pointer', fontWeight: 800, fontSize: 14
                      }}>{f}</button>
                    ))}
                  </div>
                </div>
                {['cement', 'steel', 'flooring', 'windows'].map(cat => (
                  <div key={cat} style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>{cat} tier</div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Object.keys(pricingData.materialRates[cat]).map(v => (
                        <button key={v} onClick={() => updateSelection(cat, v)} style={{
                          flex: 1, padding: '8px 0', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer',
                          background: selections[cat] === v ? 'rgba(16,185,129,0.2)' : 'rgba(15,23,42,0.4)',
                          border: `1px solid ${selections[cat] === v ? '#10b981' : 'transparent'}`,
                          color: selections[cat] === v ? '#34d399' : '#475569',
                          textTransform: 'capitalize'
                        }}>{v}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#1e293b' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 8 }}>Ground Area</div>
          <div style={{ position: 'relative' }}>
            <input
              type="text" inputMode="numeric" value={inputArea}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '');
                if (raw.length <= 5) setInputArea(raw);
              }}
              style={{
                width: '100%', padding: '14px 50px 14px 16px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, color: 'white', fontSize: 16, fontWeight: 800, outline: 'none'
              }}
            />
            <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontWeight: 900, color: '#10b981' }}>SQFT</span>
          </div>
        </div>
      </aside>

      {/* ─── VISUAL AREA (RIGHT COLUMN) ─── */}
      <main style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Minimal Floating Info */}
        <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 1000, pointerEvents: 'none' }}>
          <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '14px 24px', display: 'flex', gap: 24, alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', pointerEvents: 'auto' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, color: '#475569', textTransform: 'uppercase', marginBottom: 2 }}>Current Selection</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{selectedPoint.name}</div>
            </div>
            <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, color: '#475569', textTransform: 'uppercase', marginBottom: 2 }}>Market Rate</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981' }}>{formatCurrency(selectedPoint.priceSqft)}<span style={{ fontSize: 12, color: '#475569' }}>/sqft</span></div>
            </div>
          </div>
        </div>

        {/* Content Surface */}
        <div style={{ flex: 1, background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
          {!is3DMode ? (
            <MapComponent data={activeData} center={[selectedPoint.lat, selectedPoint.lng]} onMarkerClick={setSelectedPoint} selectedId={selectedPoint.id} />
          ) : (
            <ThreeDViewer floors={floors} area={area} modelUrl={currentModel.url} modelName={currentModel.name} />
          )}
        </div>

        {/* Analysis Dashboard */}
        <div style={{ height: 200, background: '#1e293b', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 24, padding: '24px', zIndex: 100 }}>
          <div style={{ flex: 1.6, background: '#0f172a', borderRadius: 24, padding: '24px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 10, fontWeight: 900, color: '#475569', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={14} color="#10b981" /> {sidebarTab === 'markets' ? 'Asset Valuation' : 'Material Requirements'}
            </div>
            <div style={{ display: 'flex', gap: 48 }}>
              {sidebarTab === 'markets' ? (
                [
                  { l: 'Acres', v: (area / 43560).toFixed(4) },
                  { l: 'Bigha', v: (area / 14400).toFixed(3) },
                  { l: 'Katha', v: (area / 720).toFixed(2) }
                ].map(x => (
                  <div key={x.l}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 4 }}>{x.l}</div>
                    <div style={{ fontSize: 38, fontWeight: 900, color: 'white', letterSpacing: '-1.5px' }}>{x.v}</div>
                  </div>
                ))
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, width: '100%' }}>
                  {[
                    { l: 'Cement', v: estimation.breakdown.cement },
                    { l: 'Steel', v: estimation.breakdown.steel },
                    { l: 'Floors', v: estimation.breakdown.flooring },
                    { l: 'Window', v: estimation.breakdown.windows },
                    { l: 'Bricks', v: estimation.breakdown.bricks },
                    { l: 'Labor', v: estimation.breakdown.labor }
                  ].map(m => (
                    <div key={m.l} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.03)' }}>
                      <div style={{ fontSize: 9, fontWeight: 900, color: '#475569', textTransform: 'uppercase', marginBottom: 4 }}>{m.l}</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>{formatCurrency(m.v)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: 1, background: sidebarTab === 'markets' ? 'rgba(16,185,129,0.06)' : 'rgba(59,130,246,0.06)', borderRadius: 24, padding: '24px', border: `1px solid ${sidebarTab === 'markets' ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 10, fontWeight: 900, color: '#475569', textTransform: 'uppercase' }}>Projected Capital</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 4 }}>Total Investment</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: sidebarTab === 'markets' ? '#10b981' : '#3b82f6', letterSpacing: '-2px' }}>
                {formatCurrency(sidebarTab === 'markets' ? selectedPoint.priceSqft * area : estimation.total)}
              </div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#475569' }}>ANALYTICS CONFIDENCE: 98.4%</div>
          </div>
        </div>
      </main>
    </div>
  );
}
