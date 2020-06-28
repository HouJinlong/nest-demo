import { prop, pre } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { encryptMD5 } from 'src/shared';
import { BaseModel } from '../base.model';
import { fail } from 'assert';

@pre<User>('save', function (next) {
    const now = new Date();
    (this as User).updated_at = now;
    next();
})
export class User extends BaseModel {
    get avatar_url(): string {
        const url = this.avatar || `//gravatar.com/avatar/${encryptMD5(this.email)}?size=48`;
        return url;
    }
    @prop({
        type: Schema.Types.String,
    })
    name: string;

    @prop({
        index: true,
        unique: true,
        type: Schema.Types.String,
    })
    email: string;

    @prop({
        type: Schema.Types.String,
    })
    avatar: string;

    @prop({
        type: Schema.Types.Boolean,
        default:false
    })
    active: boolean;
}