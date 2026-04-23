export const authService = {
  login: async (email, password) => {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email && password) {
      return { user: { id: '1', email, name: 'John Doe' }, token: 'mock-jwt-token' };
    }
    throw new Error('Invalid credentials');
  },
  signup: async (email, password, name) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { user: { id: '2', email, name }, token: 'mock-jwt-token' };
  },
};
