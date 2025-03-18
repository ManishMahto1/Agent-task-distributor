export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validateMobile = (mobile: string): boolean => {
    const re = /^\+\d{10,15}$/;
    return re.test(mobile);
  };