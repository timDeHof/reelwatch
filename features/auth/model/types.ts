export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  error: string;
}

export interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  showPasswords: boolean;
}
