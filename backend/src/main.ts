import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`✅ Listening on http://localhost:${PORT}/`);
  });
}
bootstrap();
