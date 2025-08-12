/**
 * Steps BDD para Auth - Login.
 * Cubre credenciales inválidas y éxito, mockeando puertos de dominio.
 */
import path from 'path';

import { loadFeature, defineFeature } from 'jest-cucumber';

import type { LoginInput } from '../../../../src/auth/application/dto/LoginDto';
import { LoginUseCase } from '../../../../src/auth/application/usecases/LoginUseCase';
import loginPayload from '../input/login-payload.json';
import { buildLoginUseCaseWithMocks } from '../mock/Auth.mocks';
import expectedError from '../output/login-error-response.json';
import expectedSuccess from '../output/login-success-response.json';
import { toPlainError } from '../utils/ErrorHelper';

const feature = loadFeature(path.resolve(__dirname, '../login.feature'));

defineFeature(feature, (test) => {
  test('Al ejecutar login con credenciales inválidas', ({ given, when, then }) => {
    let input: LoginInput | undefined;
    let respuesta: unknown;

    const { authRepository, passwordHasher, tokenProvider, authService } =
      buildLoginUseCaseWithMocks();
    const useCase = new LoginUseCase(authService, tokenProvider);

    given(/^Ingresamos un payload (.*) (.*)$/, async (_input: string, casuistica: string) => {
      const data = (loginPayload as Record<string, unknown>)[casuistica] as
        | { data: LoginInput }
        | undefined;
      input = data?.data as LoginInput;

      if (casuistica === 'INVALID_EMAIL') {
        jest.spyOn(authRepository, 'findByEmail').mockResolvedValue(null);
      } else if (casuistica === 'INVALID_PASSWORD') {
        jest.spyOn(authRepository, 'findByEmail').mockResolvedValue({
          id: 'user-1',
          email: (input as LoginInput).email,
          passwordHash: 'hash',
        } as { id: string; email: string; passwordHash: string });
        jest.spyOn(passwordHasher, 'compare').mockResolvedValue(false);
      }
    });

    when('Ejecutamos el caso de uso', async () => {
      try {
        respuesta = await useCase.execute(input as LoginInput);
      } catch (error) {
        respuesta = toPlainError(error);
      }
    });

    then(/^Se mostrará respuesta (.*) (.*)$/, (_resultado: string, casuistica: string) => {
      const esperado = (expectedError as Record<string, unknown>)[casuistica];
      expect(respuesta).toEqual(esperado);
    });
  });

  test('Al ingresar credenciales correctas se devuelve un token', ({ given, and, when, then }) => {
    let input: LoginInput | undefined;
    let respuesta: unknown;

    const { authRepository, passwordHasher, tokenProvider, authService } =
      buildLoginUseCaseWithMocks();
    const useCase = new LoginUseCase(authService, tokenProvider);

    given(/^Ingresamos un payload (.*) (.*)$/, async (_input: string, casuistica: string) => {
      const data = (loginPayload as Record<string, unknown>)[casuistica] as
        | { data: LoginInput }
        | undefined;
      input = data?.data as LoginInput;
    });

    and(/^Mockeamos dependencias (.*) (.*)$/, async (_mockData: string, casuistica: string) => {
      if (casuistica === 'EXITOSO') {
        jest.spyOn(authRepository, 'findByEmail').mockResolvedValue({
          id: 'user-1',
          email: (input as LoginInput).email,
          passwordHash: 'hash',
        } as { id: string; email: string; passwordHash: string });
        jest.spyOn(passwordHasher, 'compare').mockResolvedValue(true);
        jest.spyOn(tokenProvider, 'sign').mockResolvedValue('fake.jwt.token');
      }
    });

    when('Ejecutamos el caso de uso', async () => {
      try {
        respuesta = await useCase.execute(input as LoginInput);
      } catch (error) {
        respuesta = toPlainError(error);
      }
    });

    then(/^Se mostrará respuesta (.*) (.*)$/, (_resultado: string, casuistica: string) => {
      const esperado = (expectedSuccess as Record<string, unknown>)[casuistica];
      expect(respuesta).toEqual(esperado);
    });
  });
});
