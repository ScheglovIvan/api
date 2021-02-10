import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
const secureSession = require('fastify-secure-session');
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as hbs from 'hbs';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
const passport = require('passport');
const fs = require('fs');

var helpers = require('handlebars-helpers')();
import * as exphbs from 'hbs';
import { HttpExceptionFilter } from './filters/http-exception.filter';

// paginate helper
var paginate = require('handlebars-paginate');


// handlebars partinials

// hbs.registerPartials(join(__dirname, '../', 'views/partials/'), function (err) {});
hbs.registerPartial('footer', fs.readFileSync(join(__dirname, '../', 'views/partials/footer.hbs'), 'utf8'));
hbs.registerPartial('header', fs.readFileSync(join(__dirname, '../', 'views/partials/header.hbs'), 'utf8'));
hbs.registerPartial('menu_top', fs.readFileSync(join(__dirname, '../', 'views/partials/menu_top.hbs'), 'utf8'));
hbs.registerPartial('menu_sidebar', fs.readFileSync(join(__dirname, '../', 'views/partials/menu_sidebar.hbs'), 'utf8'));
hbs.registerPartial('form_insta_add', fs.readFileSync(join(__dirname, '../', 'views/partials/add_insta.hbs'), 'utf8'));
hbs.registerPartial('insta_list', fs.readFileSync(join(__dirname, '../', 'views/partials/insta_list.hbs'), 'utf8'));
hbs.registerHelper('paginate', paginate);

for(const helper in helpers ) {
  hbs.registerHelper(helper, helpers[helper]);
}

hbs.registerHelper('ifSign', function(a, b, options) {
  if (Math.sign(a) === 1 || Math.sign(a) === 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'static/purpose/assets/'));
  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'layout.hbs' });
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
  app.set('etag', false)
  await app.listen(3000);
}

bootstrap();