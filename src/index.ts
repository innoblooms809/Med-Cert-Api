import { Server } from 'http';
import app from './app';

import config from './config/config';
import logger from './config/logger';
import connectDB from './db/connect'; // Change to sequelize connection
import { seedRoles } from './seeder/roleSeeder';
import { seedProfiles } from './seeder/profile.seeder';
import { seedSpecializations } from './seeder/specialization.seeder';
import { seedSubSpecializations } from './seeder/subSpecialization.seeder';
let server: Server;

const bootApp = async () => {
  // Seed roles BEFORE server starts
  await seedRoles();
  await seedProfiles();
  await seedSpecializations();
  await seedSubSpecializations();
console.log("All seeders run successfully!")

  server = app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });
};

connectDB(bootApp);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
