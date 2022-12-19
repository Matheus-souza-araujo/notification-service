import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { GettRecipientNotifications } from '@app/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotifiaction: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GettRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotifiaction.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    return await this.countRecipientNotifications.execute({ recipientId });
  }

  @Get('from/:recipientId')
  async getFromRencipient(@Param('recipientId') recipientId: string) {
    const notifications = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(
    @Body() { recipientId, content, category }: CreateNotificationBody,
  ) {
    const notification = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return NotificationViewModel.toHTTP(notification);
  }
}
