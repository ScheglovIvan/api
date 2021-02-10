import { Get, Controller, Render, UseGuards, Request } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/authenticated.guard';

// @Controller()
// export class HomeController {

//   @UseGuards(AuthenticatedGuard)
//   @Get('/')
//   @Render('home/home.hbs')
//   root(@Request() req) {
//     return {bodyClass: 'application application-offset', user: req.user._doc, account: 1};
//   }

//   @Get('/login')
//   @Render('auth/login.hbs')
//   indexLogin() {}

//   @Get('/register')
//   @Render('auth/register.hbs')
//   indexRegister() {}

//   @UseGuards(AuthenticatedGuard)
//   @Get('/recovery')
//   @Render('auth/recovery.hbs')
//   indexRecovery(@Request() req) {
//       return {message: '', user: req.user}
//   }

// }