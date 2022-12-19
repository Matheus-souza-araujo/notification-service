import { BadRequestException } from '@nestjs/common';

export class NotificationNotFound extends BadRequestException {
  constructor() {
    super('Notification not found.');
  }
}
