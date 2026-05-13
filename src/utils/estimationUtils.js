import { CONSTRUCTION_CONSTANTS, pricingData } from '../data/pricingData';

export const calculateConstructionCost = (area, floors, customSelections) => {
  const rates = pricingData.materialRates;
  const totalArea = area * floors;

  // Default selections if missing
  const selections = {
    cement: 'standard',
    steel: 'standard',
    flooring: 'tiles',
    windows: 'aluminum',
    ...customSelections
  };

  const materialCosts = {
    cement: totalArea * CONSTRUCTION_CONSTANTS.CEMENT_PER_SQFT * rates.cement[selections.cement],
    steel: totalArea * CONSTRUCTION_CONSTANTS.STEEL_PER_SQFT * rates.steel[selections.steel],
    bricks: totalArea * CONSTRUCTION_CONSTANTS.BRICKS_PER_SQFT * (rates.bricks / 1000),
    sand: totalArea * CONSTRUCTION_CONSTANTS.SAND_PER_SQFT * rates.sand,
    aggregate: totalArea * CONSTRUCTION_CONSTANTS.AGGREGATE_PER_SQFT * rates.aggregate,
    labor: totalArea * rates.labor,
    // Finishing components
    flooring: totalArea * rates.flooring[selections.flooring],
    windows: totalArea * rates.windows[selections.windows],
    otherFinishing: totalArea * 250, // Fixed baseline for plumbing, electric, paint
  };

  const total = Object.values(materialCosts).reduce((acc, val) => acc + val, 0);

  return {
    breakdown: materialCosts,
    total: total,
    perSqFt: total / totalArea
  };
};
