import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
export declare class ShippingController {
    private readonly shippingService;
    constructor(shippingService: ShippingService);
    create(createShippingDto: CreateShippingDto): Promise<{
        name: string;
        description: string;
        cost: number;
        id: string;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateShippingDto: UpdateShippingDto): Promise<any>;
    remove(id: string): Promise<void>;
}
