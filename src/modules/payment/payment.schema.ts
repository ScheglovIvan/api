import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Users } from '../users/user.schema';

export type PaymentsDocument = Payments & Document;

@Schema({timestamps: true})
export class Payments {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    user: Users

    @Prop({required: true})
    payment_id: string;

}
export const PaymentsSchema = SchemaFactory.createForClass(Payments);