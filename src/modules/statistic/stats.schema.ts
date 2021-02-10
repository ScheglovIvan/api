import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type StatsDocument = Stats & Document;

@Schema({timestamps: true})
export class Stats {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'InstaAccount' })
  account_id: object;

  @Prop({type: Object, required: false})
  visited_stats: object;

  @Prop({required: false, type: Object})
  actived_stats: object

  @Prop({required: false, type: Object})
  balance_stats: object;

  @Prop({required: false, type: Object})
  total_stats: object;

}
export const StatsSchema = SchemaFactory.createForClass(Stats);