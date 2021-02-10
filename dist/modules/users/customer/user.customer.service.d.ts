import { Model } from 'mongoose';
import { InstaService } from 'src/modules/insta/insta.service';
import { PuppeteerService } from 'src/modules/parse/parse.service';
import { BcryptService } from '../../auth/bcrypt.service';
import { CustomerSubscribeDto } from './dto/customer.subsctibe.dto';
import { CustomerDocument } from './user.customer.schema';
import { Purchase } from './interfaces/purchase_interface';
import { StatsService } from 'src/modules/statistic/stats.service';
import { UserService } from '../user.service';
export declare class CustomerService {
    private customerUserModel;
    private instaService;
    private bcryptModel;
    private parseService;
    private statsService;
    private userService;
    constructor(customerUserModel: Model<CustomerDocument>, instaService: InstaService, bcryptModel: BcryptService, parseService: PuppeteerService, statsService: StatsService, userService: UserService);
    existUser(name: string): Promise<any>;
    getCustomers(_id: object, page?: number): Promise<any>;
    removeSubscribe(account_id: object, customer_id: object): Promise<boolean>;
    addSubscribe(source: object, target: object, data: Purchase): Promise<any>;
    getAll(): Promise<any>;
    createCustomer(customerSubscribeDto: CustomerSubscribeDto): Promise<any>;
}
