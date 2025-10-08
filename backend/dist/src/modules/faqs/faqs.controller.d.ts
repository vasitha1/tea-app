import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqsController {
    private readonly faqsService;
    constructor(faqsService: FaqsService);
    create(createFaqDto: CreateFaqDto): Promise<import("./faq.entity").Faq>;
    findAll(): Promise<import("./faq.entity").Faq[]>;
    findOne(id: string): Promise<import("./faq.entity").Faq>;
    update(id: string, updateFaqDto: UpdateFaqDto): Promise<import("./faq.entity").Faq>;
    remove(id: string): Promise<void>;
}
