import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import setupApp from './core/setup/index';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  // https://github.com/nestjs/nest/issues/1052
  app.init()
  setupApp(app)
  // 启动服务
  await app.listen(configService.get<number>('environment.port'), configService.get<string>('environment.host'));
}
bootstrap();

