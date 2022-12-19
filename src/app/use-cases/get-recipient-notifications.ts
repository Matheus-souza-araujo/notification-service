import { Notification } from '@app/entities/notification';
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notification-repository';

interface GettRecipientNotificationsRequest {
  recipientId: string;
}

@Injectable()
export class GettRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GettRecipientNotificationsRequest,
  ): Promise<Notification[]> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return notifications;
  }
}
