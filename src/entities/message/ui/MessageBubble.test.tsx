import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import type {Message} from '@/entities/message/model/types';
import {MessageBubble} from '@/entities/message/ui/MessageBubble';

describe('MessageBubble', () => {
    it('renders incoming message text', () => {
        const message: Message = {
            id: 'message-id',
            chatId: '79991234567@c.us',
            text: 'Привет!',
            direction: 'incoming',
            timestamp: 1790603320000,
        };

        render(<MessageBubble message={message} />);

        expect(screen.getByText('Привет!')).toBeInTheDocument();
    });

    it('shows sending status for outgoing message', () => {
        const message: Message = {
            id: 'message-id',
            chatId: '79991234567@c.us',
            text: 'Привет!',
            direction: 'outgoing',
            timestamp: 1790603320000,
            status: 'sending',
        };

        render(<MessageBubble message={message} />);

        expect(screen.getByText('◷')).toBeInTheDocument();
    });

    it('shows error for failed outgoing message', () => {
        const message: Message = {
            id: 'message-id',
            chatId: '79991234567@c.us',
            text: 'Привет!',
            direction: 'outgoing',
            timestamp: 1790603320000,
            status: 'failed',
        };

        render(<MessageBubble message={message} />);

        expect(screen.getByText('Ошибка')).toBeInTheDocument();
    });
});
