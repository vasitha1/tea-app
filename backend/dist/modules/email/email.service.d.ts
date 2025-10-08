import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    constructor(configService: ConfigService);
    sendReviewNotification(adminEmail: string, productName: string, reviewComment: string, rating: number): Promise<void>;
    sendContactFormSubmission(formData: {
        reason: string;
        phoneNumber?: string;
        email: string;
        message: string;
    }): Promise<void>;
}
