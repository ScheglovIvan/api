import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Users } from '../user.schema';

export type CustomerDocument = Customer & Document;

@Schema({timestamps: true, autoIndex: true})
export class Customer {

    @Prop({required: true})
    profile_nickname: string;

    @Prop({required: true})
    email: string;

    @Prop({required: false})
    profile_name: string;

    @Prop({required: true})
    profile_avatar_url: string;

    @Prop({default: false})
    is_active: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    user_invited: Users

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'InstaAccount'})
    account_invited: object

    @Prop()
    purchases: Array<any>

}


export const UserCustomerSchema = SchemaFactory.createForClass(Customer);