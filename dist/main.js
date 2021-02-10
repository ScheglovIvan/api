"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const secureSession = require('fastify-secure-session');
const common_1 = require("@nestjs/common");
const hbs = require("hbs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const fs = require('fs');
var helpers = require('handlebars-helpers')();
const http_exception_filter_1 = require("./filters/http-exception.filter");
var paginate = require('handlebars-paginate');
hbs.registerPartial('footer', fs.readFileSync(path_1.join(__dirname, '../', 'views/partials/footer.hbs'), 'utf8'));
hbs.registerPartial('header', fs.readFileSync(path_1.join(__dirname, '../', 'views/partials/header.hbs'), 'utf8'));
hbs.registerPartial('menu_top', fs.readFileSync(path_1.join(__dirname, '../', 'views/partials/menu_top.hbs'), 'utf8'));
hbs.registerPartial('menu_sidebar', fs.readFileSync(path_1.join(__dirname, '../', 'views/partials/menu_sidebar.hbs'), 'utf8'));
hbs.registerPartial('form_insta_add', fs.readFileSync(path_1.join(__dirname, '../', 'views/partials/add_insta.hbs'), 'utf8'));
hbs.registerPartial('insta_list', fs.readFileSync(path_1.join(__dirname, '../', 'views/partials/insta_list.hbs'), 'utf8'));
hbs.registerHelper('paginate', paginate);
for (const helper in helpers) {
    hbs.registerHelper(helper, helpers[helper]);
}
hbs.registerHelper('ifSign', function (a, b, options) {
    if (Math.sign(a) === 1 || Math.sign(a) === 0) {
        return options.fn(this);
    }
    return options.inverse(this);
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useStaticAssets(path_1.join(__dirname, '..', 'static/purpose/assets/'));
    app.setBaseViewsDir(path_1.join(__dirname, '../', 'views'));
    app.setViewEngine('hbs');
    app.set('view options', { layout: 'layout.hbs' });
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store');
        next();
    });
    app.set('etag', false);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map