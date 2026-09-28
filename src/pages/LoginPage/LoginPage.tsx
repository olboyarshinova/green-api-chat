import {useState} from 'react';
import type {Credentials} from '@/features/credentials/model/types';
import {CredentialsForm} from '@/features/credentials/ui/CredentialsForm';
import {getStateInstance} from '@/shared/api/green-api/getStateInstance';
import styles from './LoginPage.module.scss';

interface LoginPageProps {
    onConnect: (credentials: Credentials) => void;
}

export const LoginPage = ({onConnect}: LoginPageProps) => {
    const [error, setError] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async (credentials: Credentials) => {
        setError('');
        setIsConnecting(true);

        try {
            const {stateInstance} = await getStateInstance(credentials);

            console.log('stateInstance:', stateInstance);

            if (stateInstance !== 'authorized') {
                setError('Инстанс не авторизован в Telegram');
                return;
            }

            onConnect(credentials);
        } catch {
            setError('Не удалось подключиться. Проверьте данные и попробуйте снова.');
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <h1>Подключение к GREEN-API</h1>

                <p>Введите данные инстанса, чтобы начать работу.</p>

                <CredentialsForm
                    isLoading={isConnecting}
                    onSubmit={handleConnect}
                />

                {error && (
                    <p
                        className={styles.error}
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        </main>
    );
};
