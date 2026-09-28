import {useState, type ComponentProps} from 'react';
import styles from './MessageComposer.module.scss';

interface MessageComposerProps {
    onSend: (message: string) => void | Promise<void>;
}

type FormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

export const MessageComposer = ({onSend}: MessageComposerProps) => {
    const [message, setMessage] = useState('');
    const isFormValid = Boolean(message.trim());

    const handleSubmit: FormSubmitHandler = async (event) => {
        event.preventDefault();

        const normalizedMessage = message.trim();

        if (!normalizedMessage) {
            return;
        }

        await onSend(normalizedMessage);
        setMessage('');
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="message"
                value={message}
                placeholder="Сообщение"
                autoComplete="off"
                onChange={(event) => setMessage(event.target.value)}
            />

            <button
                type="submit"
                disabled={!isFormValid}
            >
                Отправить
            </button>
        </form>
    );
};
