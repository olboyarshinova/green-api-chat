import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {CreateChatForm} from '@/features/create-chat/ui/CreateChatForm';

describe('CreateChatForm', () => {
    it('submits normalized phone number', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(<CreateChatForm onSubmit={onSubmit} />);

        const input = screen.getByLabelText('Номер телефона');
        const button = screen.getByRole('button', {name: 'Создать чат'});

        await user.type(input, '+7 (952) 234-05-47');
        await user.click(button);

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit).toHaveBeenCalledWith('79522340547');
    });

    it('disables submit button for invalid phone number', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(<CreateChatForm onSubmit={onSubmit} />);

        const input = screen.getByLabelText('Номер телефона');
        const button = screen.getByRole('button', {name: 'Создать чат'});

        await user.type(input, '123');

        expect(button).toBeDisabled();
        expect(onSubmit).not.toHaveBeenCalled();
    });
});
