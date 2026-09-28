import type {Credentials} from '@/features/credentials/model/types';
import {CredentialsForm} from '@/features/credentials/ui/CredentialsForm';
import styles from './LoginPage.module.scss';

interface LoginPageProps {
    onConnect: (credentials: Credentials) => void;
}

export const LoginPage = ({onConnect}: LoginPageProps) => {
    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <h1>GREEN-API Chat</h1>
                <p>Connect your GREEN-API instance to start messaging</p>

                <CredentialsForm onSubmit={onConnect}/>
            </section>
        </main>
    );
};
