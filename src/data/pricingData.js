/**
 * Realistic Ground Price Data (Mocked API)
 * Prices in INR per Square Foot (Avg)
 */

export const pricingData = {
  west_bengal: [
    { id: 'kolkata-south', name: 'South Kolkata', lat: 22.5147, lng: 88.3497, priceSqft: 7500, trend: 'up' },
    { id: 'kolkata-north', name: 'North Kolkata', lat: 22.6105, lng: 88.3794, priceSqft: 6200, trend: 'stable' },
    { id: 'new-town', name: 'New Town / Rajarhat', lat: 22.5851, lng: 88.4607, priceSqft: 8500, trend: 'up' },
    { id: 'salt-lake', name: 'Salt Lake (Bidhannagar)', lat: 22.5867, lng: 88.4171, priceSqft: 9500, trend: 'up' },
    { id: 'howrah', name: 'Howrah City', lat: 22.5958, lng: 88.2636, priceSqft: 4500, trend: 'stable' },
    { id: 'durgapur', name: 'Durgapur', lat: 23.5204, lng: 87.3119, priceSqft: 2800, trend: 'up' },
    { id: 'siliguri', name: 'Siliguri', lat: 26.7271, lng: 88.3953, priceSqft: 3500, trend: 'up' },
    { id: 'asansol', name: 'Asansol', lat: 23.6739, lng: 86.9524, priceSqft: 2200, trend: 'stable' },
    { id: 'kharagpur', name: 'Kharagpur', lat: 22.3302, lng: 87.3237, priceSqft: 1800, trend: 'up' },
    { id: 'haldia', name: 'Haldia', lat: 22.0620, lng: 88.0698, priceSqft: 2500, trend: 'stable' },
  ],
  national: [
    { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777, priceSqft: 25000, trend: 'up' },
    { id: 'delhi', name: 'Delhi NCR', lat: 28.6139, lng: 77.2090, priceSqft: 18000, trend: 'up' },
    { id: 'bangalore', name: 'Bangalore', lat: 12.9716, lng: 77.5946, priceSqft: 12000, trend: 'up' },
    { id: 'pune', name: 'Pune', lat: 18.5204, lng: 73.8567, priceSqft: 8500, trend: 'up' },
    { id: 'hyderabad', name: 'Hyderabad', lat: 17.3850, lng: 78.4867, priceSqft: 9000, trend: 'up' },
    { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, priceSqft: 10500, trend: 'stable' },
  ]
};

export const UNIT_CONVERSIONS = {
  SQFT_TO_KATHA: 720, // 1 Katha = 720 Sqft (Standard in WB)
  KATHA_TO_BIGHA: 20, // 20 Katha = 1 Bigha
  SQFT_TO_ACRE: 43560, // 1 Acre = 43560 Sqft
};
