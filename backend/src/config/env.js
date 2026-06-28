export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
}

