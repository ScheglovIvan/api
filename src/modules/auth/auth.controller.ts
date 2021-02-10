import { Controller, Post, Request, Body, Res, HttpStatus, UseGuards, Get, Response } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "src/roles/role.enum";
import { Roles } from "src/roles/roles.decorator";
import { LoginUserDto } from "../users/dto/user.login.dto";
import { CreateUserDto } from "../users/dto/user.register.dto";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { RolesGuard } from "./roles.guard";

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService, private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Roles(Role.User)
    @Post('/login')
    async login(@Body() LoginUserDto: LoginUserDto, @Request() req, @Response() resp) {
        const r = await this.authService.createToken(req.user);
        return resp.json(r);
    }

    @Get('/logout')
    async logout(@Request() req, @Res() res) {
        req.logout();
        return res.redirect('/login');
    }

    @Roles(Role.User)
    @Post('/register')
    async register(@Body() CreateUserDto: CreateUserDto, @Res() res): Promise<any>  {
         const resultCreateUser = await this.userService.create(CreateUserDto);
         res.status(HttpStatus.OK).send(resultCreateUser);
    }

    @Roles(Role.Customer)
    @Post('/register_user')
    async registerUser(@Body() CreateUserDto: CreateUserDto, @Res() res): Promise<any>  {
        const resultCreateUser = await this.userService.create(CreateUserDto);
        res.status(HttpStatus.OK).send(resultCreateUser);
    }

}