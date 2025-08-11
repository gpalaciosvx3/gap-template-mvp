/**
 * DTOs del caso de uso de Login.
 */
export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  token: string;
};
