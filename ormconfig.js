const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = [
  {
    type: 'postgres',
    url: process.env.DB_URL,
    host: process.env.DB_COMPOSE_HOST || process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: [
      `./${isDevelopment ? 'src' : 'dist'}/database/migrations/*{.ts,.js}`,
    ],
    cli: {
      migrationsDir: `./${isDevelopment ? 'src' : 'dist'}/database/migrations`,
    },
    entities: [`./${isDevelopment ? 'src' : 'dist'}/models/**/*{.ts,.js}`],
    logging: process.env.DB_LOGGING_LEVEL ? process.env.DB_LOGGING_LEVEL.split(',') : undefined,
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'seed',
    type: 'postgres',
    url: process.env.DB_URL || process.env.DATABASE_URL,
    host: process.env.DB_COMPOSE_HOST || process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: [
      `./${isDevelopment ? 'src' : 'dist'}/database/seeds/*{.ts,.js}`,
    ],
    cli: {
      migrationsDir: `./${isDevelopment ? 'src' : 'dist'}/database/seeds`,
    },
    entities: [`./${isDevelopment ? 'src' : 'dist'}/models/**/*{.ts,.js}`],
    logging: process.env.DB_LOGGING_LEVEL ? process.env.DB_LOGGING_LEVEL.split(',') : undefined,
    ssl: { rejectUnauthorized: false }
  }
];
