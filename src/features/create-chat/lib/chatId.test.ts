import {describe, expect, it} from 'vitest';
import {createChatId} from '@/features/create-chat/lib/chatId';

describe('createChatId', () => {
    it('creates WhatsApp chat id from phone number', () => {
        expect(createChatId('79522340547')).toBe('79522340547@c.us');
    });

    it('normalizes phone number before creating chat id', () => {
        expect(createChatId('+7 (952) 234-05-47')).toBe('79522340547@c.us');
    });
});
