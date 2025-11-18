const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'K Life',
};

export default env;