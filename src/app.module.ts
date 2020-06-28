import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { ServicesModule } from './shared/services/services.module';

@Module({
  imports: [CoreModule, FeatureModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
