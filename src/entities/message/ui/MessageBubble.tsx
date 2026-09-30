import type {Message} from '@/entities/message/model/types';
import styles from './MessageBubble.module.scss';

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble = ({message}: MessageBubbleProps) => {
    const time = new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(message.timestamp);

    return (
        <div
            className={`${styles.message} ${
                message.direction === 'outgoing' ? styles.outgoing : styles.incoming
            }`}
        >
            <span className={styles.text}>{message.text}</span>

            <div className={styles.meta}>
                <span>{time}</span>

                {message.direction === 'outgoing' && (
                    <span className={styles.status}>
                        {message.status === 'sending' && '◷'}
                        {message.status === 'failed' && 'Ошибка'}
                    </span>
                )}
            </div>
        </div>
    );
};
