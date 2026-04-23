export const ocrService = {
  scanVehicleRegistration: async (imageUri) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      brand: 'Kia',
      model: 'Sorento',
      plateNumber: 'OCR-789',
      year: 2023,
    };
  },
};
