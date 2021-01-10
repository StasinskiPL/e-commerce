export enum LoginType {
  login,
  registration,
}

export interface LoginModalText {
  header: string;
  body: string;
  footer: {
    text: string;
    toggle: string;
  };
}

export const loginText: LoginModalText = {
  header: "Sign In",
  body: "sign in",
  footer: {
    text: "Don't have an account?",
    toggle: "Sign Up",
  },
};
export const registrationText: LoginModalText = {
  header: "Sign Up",
  body: "sign Up",
  footer: {
    text: "Have an account?",
    toggle: "Sign In",
  },
};


