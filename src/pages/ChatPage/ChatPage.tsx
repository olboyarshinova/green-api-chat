import {useCallback, useState} from 'react';
import type {Chat} from '@/entities/chat/model/types';
import type {Message} from '@/entities/message/model/types';
import {MessageBubble} from '@/entities/message/ui/MessageBubble';
import {createChatId} from '@/features/create-chat/lib/chatId';
import {CreateChatForm} from '@/features/create-chat/ui/CreateChatForm';
import type {Credentials} from '@/features/credentials/model/types';
import {MessageComposer} from '@/features/send-message/ui/MessageComposer';
import {useMessagePolling} from '@/features/receive-messages/model/useMessagePolling';
import {sendMessage} from '@/shared/api/green-api/sendMessage';
import styles from './ChatPage.module.scss';

interface ChatPageProps {
    credentials: Credentials;
}

export const ChatPage = ({credentials}: ChatPageProps) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleIncomingMessage = useCallback((message: Message) => {
        setMessages((currentMessages) => {
            const messageExists = currentMessages.some(
                (currentMessage) => currentMessage.id === message.id,
            );

            if (messageExists) {
                return currentMessages;
            }

            return [...currentMessages, message];
        });
    }, []);

    useMessagePolling({
        credentials,
        chatId: chat?.chatId ?? null,
        onMessage: handleIncomingMessage,
    });

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

    return (
        <main className={styles.page}>
            <aside className={styles.sidebar}>
                <CreateChatForm onSubmit={handleCreateChat}/>
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

                        <MessageComposer onSend={handleSendMessage}/>
                    </>
                ) : (
                    <div className={styles.emptyChat}>
                        <p>Создайте чат, чтобы начать переписку</p>
                    </div>
                )}
            </div>
        </main>
    );
};
