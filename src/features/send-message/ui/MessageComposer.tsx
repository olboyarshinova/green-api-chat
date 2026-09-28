import {useState, type ComponentProps} from 'react';
import {Button} from '@/shared/ui/Button/Button';
import styles from './MessageComposer.module.scss';

interface MessageComposerProps {
    onSend: (message: string) => void | Promise<void>;
}

type FormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

export const MessageComposer = ({onSend}: MessageComposerProps) => {
    const [message, setMessage] = useState('');

    const isFormValid = Boolean(message.trim());

    const handleSubmit: FormSubmitHandler = (event) => {
        event.preventDefault();

        const normalizedMessage = message.trim();

        if (!normalizedMessage) {
            return;
        }

        setMessage('');
        void onSend(normalizedMessage);
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
