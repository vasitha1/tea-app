"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
    }
    async sendReviewNotification(adminEmail, productName, reviewComment, rating) {
        const senderEmail = this.configService.get('EMAIL_SENDER');
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
    }
    async sendContactFormSubmission(formData) {
        const adminEmail = this.configService.get('ADMIN_EMAIL') || 'contact@earthlixir.net';
        const senderEmail = this.configService.get('EMAIL_SENDER') || formData.email;
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
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map