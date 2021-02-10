import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Users } from '../users/user.schema';
import { Document } from 'mongoose';

export type InstaDocument = InstaAccount & Document;

@Schema({timestamps: true})
export class InstaAccount {

    @Prop({required: true})
    login: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    nickname: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    user: Users

    @Prop()
    profile_url: string;

    @Prop()
    profile_avatar_url: string;

    @Prop()
    profile_name: string;

    @Prop()
    profile_nickname: string;

    @Prop({default: null})
    profile_number: string;

    @Prop({required: false, default: 10})
    cost_subscribe: number;

    @Prop({default: 0})
    total_visited: number;

    @Prop({default: false})
    main: boolean;

    @Prop({default: 0})
    total_subscribe: number;

    @Prop({default: null})
    special_link: string;

    @Prop()
    created_at: Date;

}

export const InstaSchema = SchemaFactory.createForClass(InstaAccount);