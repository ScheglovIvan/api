import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { InstaModule } from "../insta/insta.module";
import { PaymentsController } from "./payment.controller";
import { Payments, PaymentsSchema } from "./payment.schema";

@Module({
    controllers: [PaymentsController],
    providers: [],
    imports: [
        InstaModule,
        MongooseModule.forFeature([
            {name: Payments.name, schema: PaymentsSchema}
        ]),
    ],
    exports: [],
})
export class PaymentsModule {}