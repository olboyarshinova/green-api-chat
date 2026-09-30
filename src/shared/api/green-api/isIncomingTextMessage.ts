import type {IncomingTextMessageBody} from '@/shared/api/green-api/types';

export const isIncomingTextMessage = (body: unknown): body is IncomingTextMessageBody => {
    if (!body || typeof body !== 'object') {
        return false;
    }

    const message = body as Partial<IncomingTextMessageBody>;

    return (
        message.typeWebhook === 'incomingMessageReceived' &&
        message.messageData?.typeMessage === 'textMessage' &&
        typeof message.idMessage === 'string' &&
        typeof message.timestamp === 'number' &&
        typeof message.senderData?.chatId === 'string' &&
        typeof message.messageData.textMessageData?.textMessage === 'string'
    );
};
