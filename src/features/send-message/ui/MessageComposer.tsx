import {useState, type ComponentProps, type KeyboardEvent} from 'react';
import {Button} from '@/shared/ui/Button/Button';
import styles from './MessageComposer.module.scss';

interface MessageComposerProps {
    onSend: (message: string) => void | Promise<void>;
}

type FormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

export const MessageComposer = ({onSend}: MessageComposerProps) => {
    const [message, setMessage] = useState('');

    const isFormValid = Boolean(message.trim());

    const sendCurrentMessage = () => {
        const normalizedMessage = message.trim();

        if (!normalizedMessage) {
            return;
        }

        setMessage('');
        void onSend(normalizedMessage);
    };

    const handleSubmit: FormSubmitHandler = (event) => {
        event.preventDefault();
        sendCurrentMessage();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendCurrentMessage();
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <textarea
                name="message"
                value={message}
                placeholder="Сообщение"
                rows={1}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
            />

            <Button
                type="submit"
                disabled={!isFormValid}
            >
                Отправить
            </Button>
        </form>
    );
};
