import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Submit a contact form', description: 'Sends an email with the contact form details to the administrators.' })
  @ApiResponse({ status: 201, description: 'Contact form submitted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async submitContactForm(@Body() createContactSubmissionDto: CreateContactSubmissionDto) {
    await this.contactService.handleContactSubmission(createContactSubmissionDto);
    return { message: 'Contact form submitted successfully.' };
  }
}


