import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {CredentialsForm} from '@/features/credentials/ui/CredentialsForm';

describe('CredentialsForm', () => {
    it('submits credentials', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(
            <CredentialsForm
                isLoading={false}
                onSubmit={onSubmit}
            />,
        );

        const idInstanceInput = screen.getByPlaceholderText('Введите ID Instance');
        const apiTokenInput = screen.getByPlaceholderText('Введите API Token Instance');
        const button = screen.getByRole('button', {name: 'Подключиться'});

        await user.type(idInstanceInput, '1234567890');
        await user.type(apiTokenInput, 'test-token');
        await user.click(button);

        expect(onSubmit).toHaveBeenCalledOnce();
        expect(onSubmit).toHaveBeenCalledWith({
            idInstance: '1234567890',
            apiTokenInstance: 'test-token',
        });
    });

    it('disables submit button when credentials are invalid', () => {
        const onSubmit = vi.fn();

        render(
            <CredentialsForm
                isLoading={false}
                onSubmit={onSubmit}
            />,
        );

        const button = screen.getByRole('button', {name: 'Подключиться'});

        expect(button).toBeDisabled();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('shows loading state', () => {
        const onSubmit = vi.fn();

        render(
            <CredentialsForm
                isLoading
                onSubmit={onSubmit}
            />,
        );

        const button = screen.getByRole('button', {name: 'Подключение...'});

        expect(button).toBeDisabled();
    });
});
