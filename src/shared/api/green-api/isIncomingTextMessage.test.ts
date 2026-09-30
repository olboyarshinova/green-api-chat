import {describe, expect, it} from 'vitest';
import {isIncomingTextMessage} from '@/shared/api/green-api/isIncomingTextMessage';

describe('isIncomingTextMessage', () => {
    it('returns true for incoming text message', () => {
        const body = {
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

        expect(isIncomingTextMessage(body)).toBe(true);
    });

    it('returns false for non-text message', () => {
        const body = {
            typeWebhook: 'incomingMessageReceived',
            idMessage: 'message-id',
            timestamp: 1790603320,
            senderData: {
                chatId: '79991234567@c.us',
            },
            messageData: {
                typeMessage: 'reactionMessage',
            },
        };

        expect(isIncomingTextMessage(body)).toBe(false);
    });

    it('returns false for invalid data', () => {
        expect(isIncomingTextMessage(null)).toBe(false);
        expect(isIncomingTextMessage({})).toBe(false);
    });
});
