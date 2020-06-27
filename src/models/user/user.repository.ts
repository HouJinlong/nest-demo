import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { BaseRepository } from '../base.repository';
/**
 * 用户实体
 */
export type UserEntity = User;
/**
 * 用户模型
 */
export type UserModel = ReturnModelType<typeof User>;
/**
 * 用户模型名称
 */
export const userModelName = User.modelName;

@Injectable()
export class UserRepository extends BaseRepository<User>{
    constructor(@InjectModel(userModelName) private readonly _userModel: UserModel) {
        super(_userModel);
    }
}