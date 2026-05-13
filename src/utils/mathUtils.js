import { UNIT_CONVERSIONS } from '../data/pricingData';

export const convertUnits = (sqftValue) => {
  const katha = sqftValue / UNIT_CONVERSIONS.SQFT_TO_KATHA;
  const bigha = katha / UNIT_CONVERSIONS.KATHA_TO_BIGHA;
  const acres = sqftValue / UNIT_CONVERSIONS.SQFT_TO_ACRE;

  return {
    sqft: sqftValue,
    katha: Number(katha.toFixed(2)),
    bigha: Number(bigha.toFixed(2)),
    acres: Number(acres.toFixed(4)),
  };
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};
