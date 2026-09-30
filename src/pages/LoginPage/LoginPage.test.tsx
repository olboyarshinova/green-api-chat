import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {LoginPage} from '@/pages/LoginPage/LoginPage';
import {getStateInstance} from '@/shared/api/green-api/getStateInstance';

vi.mock('@/shared/api/green-api/getStateInstance', () => ({
    getStateInstance: vi.fn(),
}));

describe('LoginPage', () => {
    it('connects when instance is authorized', async () => {
        const user = userEvent.setup();
        const onConnect = vi.fn();

        vi.mocked(getStateInstance).mockResolvedValue({
            stateInstance: 'authorized',
        });

        render(<LoginPage onConnect={onConnect} />);

        await user.type(screen.getByPlaceholderText('Введите ID Instance'), '1234567890');
        await user.type(screen.getByPlaceholderText('Введите API Token Instance'), 'test-token');

        await user.click(screen.getByRole('button', {name: 'Подключиться'}));

        expect(getStateInstance).toHaveBeenCalledWith({
            idInstance: '1234567890',
            apiTokenInstance: 'test-token',
        });

        expect(onConnect).toHaveBeenCalledWith({
            idInstance: '1234567890',
            apiTokenInstance: 'test-token',
        });
    });
});
