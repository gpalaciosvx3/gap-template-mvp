/**
 * Logger centralizado (Winston) para toda la app.
 * Formato: [YYYY-MM-DD HH:mm:ss] nivel: mensaje
 */
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

/**
 * Crea un formateador que inyecta un timestamp local en el `info` del log.
 * @returns Formato de Winston que añade `timestamp` (YYYY-MM-DD HH:mm:ss)
 */
function createLocalTimeFormatter(): winston.Logform.Format {
  return winston.format(
    (
      info: winston.Logform.TransformableInfo,
    ): winston.Logform.TransformableInfo => {
      const date = new Date();
      const pad = (n: number): string => String(n).padStart(2, "0");
      const yyyy = date.getFullYear();
      const mm = pad(date.getMonth() + 1);
      const dd = pad(date.getDate());
      const hh = pad(date.getHours());
      const min = pad(date.getMinutes());
      const ss = pad(date.getSeconds());
      (
        info as winston.Logform.TransformableInfo & { timestamp?: string }
      ).timestamp = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      return info;
    },
  )();
}

/**
 * Formato de salida en consola.
 * @param info Entrada de log enriquecida con `timestamp`
 * @returns Línea formateada
 */
const consoleFormat = winston.format.printf(
  (info: winston.Logform.TransformableInfo & { timestamp?: string }): string =>
    `[${info.timestamp ?? ""}] - [${info.level}]: ${String(info.message)}`,
);

/**
 * Logger principal de la aplicación con rotación diaria de archivos.
 */
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    createLocalTimeFormatter(),
    winston.format.errors({ stack: true }),
    consoleFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
