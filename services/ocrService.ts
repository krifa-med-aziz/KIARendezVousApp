export const ocrService = {
  scanVehicleRegistration: async (imageUri: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      brand: 'Kia',
      model: 'Sorento',
      plateNumber: 'OCR-789',
      year: 2023,
    };
  },
};
