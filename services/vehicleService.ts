export const vehicleService = {
  getVehicles: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      { id: '1', brand: 'Kia', model: 'Sportage', plateNumber: '123-ABC', year: 2022 },
      { id: '2', brand: 'Kia', model: 'Rio', plateNumber: '456-DEF', year: 2020 },
    ];
  },
  addVehicle: async (vehicle) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id: Math.random().toString(), ...vehicle };
  },
};
