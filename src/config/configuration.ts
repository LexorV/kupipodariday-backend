export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: 'student',
    password: '666777',
    databaseName: 'kupipodariday',
  },
  jwtSecret: 'jwtSecret',
});
