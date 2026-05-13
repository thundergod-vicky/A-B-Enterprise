import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatCurrency } from '../utils/mathUtils';

const FlyTo = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 12, { duration: 1.2 });
  }, [center, map]);
  return null;
};

const MapComponent = ({ data, center, onMarkerClick, selectedId }) => {
  useEffect(() => {
    // No-op: markers are added imperatively via useEffect below
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      zoomControl={false}
      style={{ height: '100%', width: '100%', background: '#0f172a' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution="© CARTO"
      />
      <FlyTo center={center} />
      <MarkerLayer data={data} onMarkerClick={onMarkerClick} selectedId={selectedId} />
    </MapContainer>
  );
};

const MarkerLayer = ({ data, onMarkerClick, selectedId }) => {
  const map = useMap();

  useEffect(() => {
    const markers = [];
    data.forEach((point) => {
      const isSelected = point.id === selectedId;
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:${isSelected ? 34 : 26}px;
          height:${isSelected ? 34 : 26}px;
          background:${isSelected ? '#059669' : '#10b981'};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px ${isSelected ? 30 : 16}px rgba(16,185,129,${isSelected ? 0.8 : 0.5});
          cursor:pointer;
          transition: all 0.2s;
        "></div>`,
        iconSize: [isSelected ? 34 : 26, isSelected ? 34 : 26],
        iconAnchor: [isSelected ? 17 : 13, isSelected ? 17 : 13],
      });

      const marker = L.marker([point.lat, point.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="padding:14px; font-family:'Outfit',sans-serif; min-width:160px;">
            <div style="font-weight:700; font-size:15px; color:#f8fafc; margin-bottom:6px;">${point.name}</div>
            <div style="font-size:20px; font-weight:800; color:#10b981;">${formatCurrency(point.priceSqft)}</div>
            <div style="font-size:11px; color:#94a3b8; margin-top:2px;">per sq. ft</div>
            <div style="margin-top:10px; font-size:11px; padding:4px 8px; background:${point.trend === 'up' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)'}; border-radius:6px; color:${point.trend === 'up' ? '#34d399' : '#fbbf24'}; display:inline-block;">
              ${point.trend === 'up' ? '↗ Rising' : '→ Stable'}
            </div>
          </div>
        `)
        .on('click', () => onMarkerClick(point));
      markers.push(marker);
    });

    return () => markers.forEach(m => map.removeLayer(m));
  }, [data, map, onMarkerClick, selectedId]);

  return null;
};

export default MapComponent;
