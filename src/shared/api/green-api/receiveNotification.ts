import type {Credentials} from '@/features/credentials/model/types';
import {createGreenApiUrl} from '@/shared/api/green-api/client';

export interface Notification {
    receiptId: number;
    body: unknown;
}

export const receiveNotification = async (
    credentials: Credentials,
): Promise<Notification | null> => {
    const response = await fetch(createGreenApiUrl(credentials, 'receiveNotification'));

    if (!response.ok) {
        throw new Error('Failed to receive notification');
    }

    const text = await response.text();

    if (!text) {
        return null;
    }

    return JSON.parse(text) as Notification;
};
