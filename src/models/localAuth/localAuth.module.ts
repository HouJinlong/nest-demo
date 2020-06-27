import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalAuthRepository } from './localAuth.repository';
import { LocalAuth } from './localAuth.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: LocalAuth.modelName, schema: LocalAuth.schema }]),
    ],
    providers: [LocalAuthRepository],
    exports: [LocalAuthRepository],
})
export class LocalAuthModelModule {}