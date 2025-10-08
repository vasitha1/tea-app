import { EmailService } from '../email/email.service';
interface ContactFormSubmission {
    reason: string;
    phoneNumber?: string;
    email: string;
    message: string;
}
export declare class ContactService {
    private emailService;
    constructor(emailService: EmailService);
    handleContactSubmission(formData: ContactFormSubmission): Promise<void>;
}
export {};
