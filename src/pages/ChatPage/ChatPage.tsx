import {useState} from 'react';
import type {Chat} from '@/entities/chat/model/types';
import {CreateChatForm} from '@/features/create-chat/ui/CreateChatForm';
import {MessageComposer} from '@/features/send-message/ui/MessageComposer';
import type {Credentials} from '@/features/credentials/model/types';
import {sendMessage} from '@/shared/api/green-api/sendMessage';
import styles from './ChatPage.module.scss';

interface ChatPageProps {
    credentials: Credentials;
}

export const ChatPage = ({credentials}: ChatPageProps) => {
    const [chat, setChat] = useState<Chat | null>(null);

    const handleCreateChat = (phoneNumber: string) => {
        setChat({
            chatId: phoneNumber,
            phoneNumber,
        });
    };

    const handleSendMessage = async (message: string) => {
        if (!chat) {
            return;
        }

        try {
            const response = await sendMessage(credentials, {
                chatId: chat.chatId,
                message,
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className={styles.page}>
            <aside className={styles.sidebar}>
                <h1>Chats</h1>

                <CreateChatForm onSubmit={handleCreateChat}/>
            </aside>

            <section className={styles.chat}>
                {chat ? (
                    <>
                        <header>
                            <strong>+{chat.phoneNumber}</strong>
                        </header>

                        <div className={styles.messages}>
                            <p>No messages yet</p>
                        </div>

                        <MessageComposer onSend={handleSendMessage}/>
                    </>
                ) : (
                    <p>Select or create a chat</p>
                )}
            </section>
        </main>
    );
};
