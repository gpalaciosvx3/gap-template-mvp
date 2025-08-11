/**
 * Declaraciones mínimas para bcryptjs usadas en el proyecto.
 */
declare module 'bcryptjs' {
  export function hashSync(plain: string, rounds?: number): string;
  export function compare(plain: string, hash: string): Promise<boolean>;
  export function compareSync(plain: string, hash: string): boolean;
}


