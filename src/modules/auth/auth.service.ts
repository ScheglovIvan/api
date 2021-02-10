import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/user.login.dto';
import { User, UserService } from '../users/user.service';
import { BcryptService } from './bcrypt.service';



@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private bcryptService: BcryptService) {}

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.userService.findLogin(login);
        if (user && await this.bcryptService.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async createToken(user: any) {

        const {_id, email, login} = user._doc;
        return {
            id: _id,
            email, login,
            access_token: this.jwtService.sign(user),
        };
    }

    async login(user: any) {
        // const payload = {username: user.login, sub: user.userId}
        return {
            access_token: this.jwtService.sign(user),
        };
    }

    async recovery() {

                
    }

}