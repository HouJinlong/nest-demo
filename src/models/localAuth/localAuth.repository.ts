import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocalAuth } from './localAuth.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BaseRepository } from '../base.repository';
/**
 * 用户实体
 */
export type LocalAuthEntity = LocalAuth;
/**
 * 用户模型
 */
export type LocalAuthModel = ReturnModelType<typeof LocalAuth>;
/**
 * 用户模型名称
 */
export const LocalAuthModelName = LocalAuth.modelName;

@Injectable()
export class LocalAuthRepository extends BaseRepository<LocalAuth>{
    constructor(@InjectModel(LocalAuthModelName) private readonly _LocalAuthModel: LocalAuthModel) {
        super(_LocalAuthModel);
    }
}