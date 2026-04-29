export type ScannedFields = {
  plate: string | null;
  vin: string | null;
  brand: string | null;
  model: string | null;
  ownerName: string | null;
  cin: string | null;
  dpmc: string | null;
  address: string | null;
};

export type ScanResult = {
  success: boolean;
  data?: ScannedFields;
  confidence?: number;
  matchPercent?: number;
  error?: string;
};
