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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_service_1 = require("./contact.service");
const create_contact_submission_dto_1 = require("./dto/create-contact-submission.dto");
const swagger_1 = require("@nestjs/swagger");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async submitContactForm(createContactSubmissionDto) {
        await this.contactService.handleContactSubmission(createContactSubmissionDto);
        return { message: 'Contact form submitted successfully.' };
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)('submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a contact form', description: 'Sends an email with the contact form details to the administrators.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Contact form submitted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_submission_dto_1.CreateContactSubmissionDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "submitContactForm", null);
exports.ContactController = ContactController = __decorate([
    (0, swagger_1.ApiTags)('Contact'),
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map