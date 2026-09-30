import {describe, expect, it} from 'vitest';
import {mapIncomingMessage} from '@/entities/message/lib/mapIncomingMessage';
import type {IncomingTextMessageBody} from '@/shared/api/green-api/types';

describe('mapIncomingMessage', () => {
    it('maps incoming GREEN-API message to domain message', () => {
        const body: IncomingTextMessageBody = {
            typeWebhook: 'incomingMessageReceived',
            idMessage: 'message-id',
            timestamp: 1790603320,
            senderData: {
                chatId: '79991234567@c.us',
            },
            messageData: {
                typeMessage: 'textMessage',
                textMessageData: {
                    textMessage: 'Привет!',
                },
            },
        };

        expect(mapIncomingMessage(body)).toEqual({
            id: 'message-id',
            chatId: '79991234567@c.us',
            text: 'Привет!',
            direction: 'incoming',
            timestamp: 1790603320000,
        });
    });
});
