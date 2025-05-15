export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

export function isValidPhone(phone: string): boolean {
  // Contoh sederhana: minimal 10 digit angka
  const re = /^\d{10,}$/;
  return re.test(phone);
}

export function isStrongPassword(password: string): boolean {
  // Minimal 8 karakter, huruf besar, kecil, angka, dan simbol
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
}
