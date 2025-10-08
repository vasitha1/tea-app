import { Repository } from 'typeorm';
import { Faq } from './faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqsService {
    private readonly faqRepository;
    constructor(faqRepository: Repository<Faq>);
    create(createFaqDto: CreateFaqDto): Promise<Faq>;
    findAll(): Promise<Faq[]>;
    findOne(id: string): Promise<Faq>;
    update(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq>;
    remove(id: string): Promise<void>;
}
