import {useEffect} from 'react';
import {mapIncomingMessage} from '@/entities/message/lib/mapIncomingMessage';
import type {Message} from '@/entities/message/model/types';
import type {Credentials} from '@/features/credentials/model/types';
import {deleteNotification} from '@/shared/api/green-api/deleteNotification';
import {isIncomingTextMessage} from '@/shared/api/green-api/isIncomingTextMessage';
import {receiveNotification} from '@/shared/api/green-api/receiveNotification';

interface UseMessagePollingParams {
    credentials: Credentials;
    chatId: string | null;
    onMessage: (message: Message) => void;
}

export const useMessagePolling = ({credentials, chatId, onMessage}: UseMessagePollingParams) => {
    useEffect(() => {
        if (!chatId) {
            return;
        }

        let isActive = true;

        const poll = async () => {
            while (isActive) {
                try {
                    const notification = await receiveNotification(credentials);

                    if (!isActive) {
                        return;
                    }

                    if (!notification) {
                        continue;
                    }

                    if (isIncomingTextMessage(notification.body)) {
                        const message = mapIncomingMessage(notification.body);

                        if (message.chatId === chatId) {
                            onMessage(message);
                        }
                    }

                    await deleteNotification(credentials, notification.receiptId);
                } catch (error) {
                    console.error('Failed to receive message', error);

                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            }
        };

        void poll();

        return () => {
            isActive = false;
        };
    }, [credentials, chatId, onMessage]);
};
