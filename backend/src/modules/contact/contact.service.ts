import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

interface ContactFormSubmission {
  reason: string;
  phoneNumber?: string;
  email: string;
  message: string;
}

@Injectable()
export class ContactService {
  constructor(private emailService: EmailService) {}

  async handleContactSubmission(formData: ContactFormSubmission): Promise<void> {
    await this.emailService.sendContactFormSubmission(formData);
  }
}


