import { ContactService } from './contact.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    submitContactForm(createContactSubmissionDto: CreateContactSubmissionDto): Promise<{
        message: string;
    }>;
}
