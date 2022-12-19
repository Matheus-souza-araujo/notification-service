import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notification-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: CountRecipientNotificationsRequest): Promise<number> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return count;
  }
}
