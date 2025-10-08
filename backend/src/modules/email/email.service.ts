import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendReviewNotification(adminEmail: string, productName: string, reviewComment: string, rating: number): Promise<void> {
    const senderEmail = this.configService.get<string>('EMAIL_SENDER');
    // In a real application, you would integrate with an email service like Mailgun or SendGrid here.
    // For now, we will just log the email content.
    console.log(`
      --- NEW REVIEW NOTIFICATION ---
      To: ${adminEmail}
      From: ${senderEmail}
      Subject: New Review for Product: ${productName}

      Product: ${productName}
      Rating: ${rating} stars
      Comment: ${reviewComment}
      -------------------------------
    `);
    // Example of how you might use an email service (pseudo-code):
    // await this.mailgunService.sendEmail({
    //   to: adminEmail,
    //   from: senderEmail,
    //   subject: `New Review for Product: ${productName}`,
    //   text: `Product: ${productName}\nRating: ${rating} stars\nComment: ${reviewComment}`,
    // });
  }

  async sendContactFormSubmission(formData: { reason: string; phoneNumber?: string; email: string; message: string }): Promise<void> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'contact@earthlixir.net'; // Fallback to a default if not set
    const senderEmail = this.configService.get<string>('EMAIL_SENDER') || formData.email; // Use form submitter's email as sender, or a default

    console.log(`
      --- NEW CONTACT FORM SUBMISSION ---
      To: ${adminEmail}
      From: ${senderEmail}
      Subject: New Contact Form Submission: ${formData.reason}

      Reason: ${formData.reason}
      Phone Number: ${formData.phoneNumber || 'N/A'}
      Sender Email: ${formData.email}
      Message:
      ${formData.message}
      -------------------------------------
    `);
    // In a real application, you would integrate with an email service here.
  }

  // You can add other email sending methods here (e.g., order confirmations, password resets)
}
