export const appointmentService = {
  getAgencies: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      { id: '1', name: 'Kia Central Garage', address: '123 Main St, City' },
      { id: '2', name: 'Kia North Service', address: '456 North Ave, City' },
    ];
  },
  getServices: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      { id: '1', name: 'Standard Maintenance', duration: '60 min', price: 150 },
      { id: '2', name: 'Oil Change', duration: '30 min', price: 80 },
      { id: '3', name: 'Brake Inspection', duration: '45 min', price: 120 },
    ];
  },
  bookAppointment: async (appointmentData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { id: Math.random().toString(), status: 'confirmed', ...appointmentData };
  },
};
