import type {Message} from '@/entities/message/model/types';
import type {IncomingTextMessageBody} from '@/shared/api/green-api/types';

export const mapIncomingMessage = (
    body: IncomingTextMessageBody,
): Message => {
    return {
        id: body.idMessage,
        chatId: body.senderData.chatId,
        text: body.messageData.textMessageData.textMessage,
        direction: 'incoming',
        timestamp: body.timestamp * 1000,
    };
};
