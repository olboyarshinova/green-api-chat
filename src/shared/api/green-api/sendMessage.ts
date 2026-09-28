import type {Credentials} from '@/features/credentials/model/types';
import {createGreenApiUrl} from '@/shared/api/green-api/client';
import type {SendMessageRequest, SendMessageResponse} from '@/shared/api/green-api/types';

export const sendMessage = async (
    credentials: Credentials,
    data: SendMessageRequest,
): Promise<SendMessageResponse> => {
    const response = await fetch(createGreenApiUrl(credentials, 'sendMessage'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return await response.json() as Promise<SendMessageResponse>;
};
