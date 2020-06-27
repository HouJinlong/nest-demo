import { prop, pre } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { BaseModel } from '../base.model';
import { userModelName } from "../user/user.repository";

@pre<LocalAuth>('save', function (next) {
    const now = new Date();
    (this as LocalAuth).updated_at = now;
    next();
})
export class LocalAuth extends BaseModel {
    @prop({
        type: Schema.Types.ObjectId,
        ref:userModelName
    })
    userid: string;

    @prop({
        type: Schema.Types.String,
    })
    pass: string;
}