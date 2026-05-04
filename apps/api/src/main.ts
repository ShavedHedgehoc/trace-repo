import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.API_PORT || 7000;
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  app.use(cookieParser());

  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
