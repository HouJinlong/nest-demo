import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import loadConfig from './config/load-config';
import validationSchema from './config/env-schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            load: loadConfig,
            validationSchema
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('database.url'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }),
            inject: [ConfigService],
        }),
    ]
})
export class CoreModule {}
