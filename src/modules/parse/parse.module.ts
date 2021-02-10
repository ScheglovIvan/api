import { forwardRef, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptService } from '../insta/crypt.service';
import { InstaModule } from '../insta/insta.module';
import { InstaService } from '../insta/insta.service';
import { PuppeteerService } from "./parse.service";


@Module({
    imports: [
        forwardRef(() => InstaModule),
    ],
    providers: [PuppeteerService, CryptService, ConfigService],
    exports: [PuppeteerService]
})
export class ParseModule {}