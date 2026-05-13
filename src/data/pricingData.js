/**
 * Realistic Ground Price Data for Burdwan Region
 * Prices in INR per Square Foot (Avg)
 */

export const pricingData = {
  burdwan: [
    { id: 'curzon-gate', name: 'Curzon Gate (Main Town)', lat: 23.2378, lng: 87.8657, priceSqft: 4500, trend: 'up' },
    { id: 'renaissance', name: 'Renaissance Township', lat: 23.2200, lng: 87.8400, priceSqft: 4200, trend: 'up' },
    { id: 'golapbag', name: 'Golapbag (University)', lat: 23.2500, lng: 87.8450, priceSqft: 3500, trend: 'stable' },
    { id: 'keshabganj', name: 'Keshabganj Chatti', lat: 23.2450, lng: 87.8550, priceSqft: 3200, trend: 'up' },
    { id: 'vivekananda', name: 'Vivekananda College Area', lat: 23.2400, lng: 87.8300, priceSqft: 3000, trend: 'stable' },
    { id: 'badshahi-road', name: 'Badshahi Road', lat: 23.2250, lng: 87.8800, priceSqft: 2800, trend: 'up' },
    { id: 'shaktigarh', name: 'Shaktigarh', lat: 23.2160, lng: 87.9620, priceSqft: 1800, trend: 'up' },
    { id: 'memari', name: 'Memari', lat: 23.1670, lng: 88.1150, priceSqft: 1500, trend: 'stable' },
    { id: 'kalna', name: 'Kalna', lat: 23.2100, lng: 88.3600, priceSqft: 1200, trend: 'stable' },
    { id: 'katwa', name: 'Katwa', lat: 23.6400, lng: 88.1300, priceSqft: 1100, trend: 'stable' },
  ],
  materialRates: {
    cement: { basic: 420, standard: 450, premium: 510 },
    steel: { basic: 72000, standard: 75000, premium: 82000 },
    flooring: { tiles: 120, marble: 250, granite: 400 },
    windows: { aluminum: 350, upvc: 600, wood: 950 },
    bricks: 12000,
    sand: 65,
    aggregate: 80,
    labor: 280,
  }
};

export const CONSTRUCTION_CONSTANTS = {
  // Quantities per sq ft (approx for standard RCC construction)
  CEMENT_PER_SQFT: 0.45, // bags
  STEEL_PER_SQFT: 0.004, // tons
  BRICKS_PER_SQFT: 20, // units
  SAND_PER_SQFT: 1.8, // cu ft
  AGGREGATE_PER_SQFT: 1.3, // cu ft
};

export const UNIT_CONVERSIONS = {
  SQFT_TO_KATHA: 720, // 1 Katha = 720 Sqft (Standard in WB)
  KATHA_TO_BIGHA: 20, // 20 Katha = 1 Bigha
  SQFT_TO_ACRE: 43560, // 1 Acre = 43560 Sqft
};
