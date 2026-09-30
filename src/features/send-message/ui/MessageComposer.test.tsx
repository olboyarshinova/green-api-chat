import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {MessageComposer} from '@/features/send-message/ui/MessageComposer';

describe('MessageComposer', () => {
    it('sends message', async () => {
        const user = userEvent.setup();
        const onSend = vi.fn();

        render(<MessageComposer onSend={onSend} />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', {name: 'Отправить'});

        await user.type(input, 'Привет!');
        await user.click(button);

        expect(onSend).toHaveBeenCalledOnce();
        expect(onSend).toHaveBeenCalledWith('Привет!');
    });

    it('clears input after sending message', async () => {
        const user = userEvent.setup();
        const onSend = vi.fn();

        render(<MessageComposer onSend={onSend} />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', {name: 'Отправить'});

        await user.type(input, 'Привет!');
        await user.click(button);

        expect(input).toHaveValue('');
    });

    it('disables send button when message is empty', () => {
        const onSend = vi.fn();

        render(<MessageComposer onSend={onSend} />);

        const button = screen.getByRole('button', {name: 'Отправить'});

        expect(button).toBeDisabled();
    });

    it('sends message on Enter', async () => {
        const user = userEvent.setup();
        const onSend = vi.fn();

        render(<MessageComposer onSend={onSend} />);

        const input = screen.getByRole('textbox');

        await user.type(input, 'Привет!{Enter}');

        expect(onSend).toHaveBeenCalledOnce();
        expect(onSend).toHaveBeenCalledWith('Привет!');
    });

    it('sends message on Enter', async () => {
        const user = userEvent.setup();
        const onSend = vi.fn();

        render(<MessageComposer onSend={onSend} />);

        const input = screen.getByRole('textbox');

        await user.type(input, 'Привет!{Enter}');

        expect(onSend).toHaveBeenCalledOnce();
        expect(onSend).toHaveBeenCalledWith('Привет!');
    });

    it('adds a new line on Shift+Enter', async () => {
        const user = userEvent.setup();
        const onSend = vi.fn();

        render(<MessageComposer onSend={onSend} />);

        const input = screen.getByRole('textbox');

        await user.type(input, 'Первая строка{Shift>}{Enter}{/Shift}Вторая строка');

        expect(onSend).not.toHaveBeenCalled();
        expect(input).toHaveValue('Первая строка\nВторая строка');
    });
});
