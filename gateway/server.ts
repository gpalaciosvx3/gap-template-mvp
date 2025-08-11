/**
 * Entry point local para levantar el Gateway.
 * Usa `createGatewayApp` para construir la app y ejecuta `listen`.
 */
import { createGatewayApp } from './app';

const app = createGatewayApp();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const server = app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Gateway corriendo en puerto ${PORT}`);
});

export default server;


