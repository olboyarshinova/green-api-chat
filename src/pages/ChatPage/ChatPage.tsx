import {useState} from 'react';
import type {Chat} from '@/entities/chat/model/types';
import type {Message} from '@/entities/message/model/types';
import {MessageBubble} from '@/entities/message/ui/MessageBubble';
import {mapIncomingMessage} from '@/entities/message/lib/mapIncomingMessage';
import {createChatId} from '@/features/create-chat/lib/chatId';
import {CreateChatForm} from '@/features/create-chat/ui/CreateChatForm';
import type {Credentials} from '@/features/credentials/model/types';
import {MessageComposer} from '@/features/send-message/ui/MessageComposer';
import {deleteNotification} from '@/shared/api/green-api/deleteNotification';
import {receiveNotification} from '@/shared/api/green-api/receiveNotification';
import {sendMessage} from '@/shared/api/green-api/sendMessage';
import {isIncomingTextMessage} from '@/shared/api/green-api/isIncomingTextMessage';
import styles from './ChatPage.module.scss';

interface ChatPageProps {
    credentials: Credentials;
}

export const ChatPage = ({credentials}: ChatPageProps) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleCreateChat = (phoneNumber: string) => {
        setChat({
            chatId: createChatId(phoneNumber),
            phoneNumber,
        });

        setMessages([]);
    };

    const updateMessage = (id: string, updates: Partial<Message>) => {
        setMessages((currentMessages) =>
            currentMessages.map((message) =>
                message.id === id ? {...message, ...updates} : message,
            ),
        );
    };

    const sendOutgoingMessage = async (message: Message) => {
        try {
            const {idMessage} = await sendMessage(credentials, {
                chatId: message.chatId,
                message: message.text,
            });

            updateMessage(message.id, {
                id: idMessage,
                status: 'sent',
            });
        } catch {
            updateMessage(message.id, {
                status: 'failed',
            });
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!chat) {
            return;
        }

        const newMessage: Message = {
            id: crypto.randomUUID(),
            chatId: chat.chatId,
            text,
            direction: 'outgoing',
            timestamp: Date.now(),
            status: 'sending',
        };

        setMessages((currentMessages) => [...currentMessages, newMessage]);

        await sendOutgoingMessage(newMessage);
    };

    const handleReceiveMessage = async () => {
        try {
            const notification = await receiveNotification(credentials);

            if (!notification) {
                console.log('Нет новых уведомлений');
                return;
            }

            if (isIncomingTextMessage(notification.body)) {
                const incomingMessage = mapIncomingMessage(notification.body);

                if (incomingMessage.chatId === chat?.chatId) {
                    setMessages((currentMessages) => [
                        ...currentMessages,
                        incomingMessage,
                    ]);
                }
            }

            await deleteNotification(credentials, notification.receiptId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className={styles.page}>
            <aside className={styles.sidebar}>
                <h1>Чаты</h1>

                <CreateChatForm onSubmit={handleCreateChat} />
            </aside>

            <div className={styles.chat}>
                {chat ? (
                    <>
                        <div className={styles.header}>+{chat.phoneNumber}</div>

                        <div className={styles.messages}>
                            {messages.length === 0 ? (
                                <p>Сообщений пока нет.</p>
                            ) : (
                                messages.map((message) => (
                                    <MessageBubble
                                        key={message.id}
                                        message={message}
                                    />
                                ))
                            )}
                        </div>

                        <MessageComposer onSend={handleSendMessage} />
                    </>
                ) : (
                    <div className={styles.emptyChat}>
                        <p>Создайте чат, чтобы начать переписку</p>
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={handleReceiveMessage}
            >
                Получить сообщение
            </button>
        </main>
    );
};
