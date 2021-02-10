import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({timestamps: true, autoIndex: true})
export class Users {

  @Prop({required: true})
  login: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop()
  user_role: string;

  @Prop({required: false})
  user_email: string;

  @Prop()
  special_link: string;

  @Prop({default: 0})
  total_visited: number;

  @Prop({default: 0})
  total_subscribe: number;

  @Prop({default: 0})
  balance: number;

}

export const UsersSchema = SchemaFactory.createForClass(Users);