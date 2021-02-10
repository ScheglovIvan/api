import { forwardRef, Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ParseModule } from '../parse/parse.module';
import { PuppeteerService } from '../parse/parse.service';
import { CryptService } from './crypt.service';
import { InstagrammController } from './insta.controller';
import { InstaService } from './insta.service';
import { InstaAccount, InstaSchema } from './insta.shcema';
import { StatsModule } from '../statistic/stats.module';
import { MailModule } from '../mail/mail.module';

@Module({
    controllers: [InstagrammController],
    providers: [InstaService, CryptService],
    imports: [
        StatsModule,
        ConfigModule,
        MailModule,
        forwardRef(() => ParseModule),
        MongooseModule.forFeature(
            [{name: InstaAccount.name, schema: InstaSchema}]
        )
    ],
    exports: [InstaService],
})
export class InstaModule {}