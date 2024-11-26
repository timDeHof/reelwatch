import { LoginFormState, RegisterFormState } from './types';

export const INITIAL_FORM_STATE: LoginFormState = {
  email: '',
  password: '',
  showPassword: false,
  error: ''
};

export const INITIAL_REGISTER_FORM_STATE: RegisterFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: '',
  showPasswords: false,
};