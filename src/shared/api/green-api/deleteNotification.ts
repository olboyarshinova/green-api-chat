import type {Credentials} from '@/features/credentials/model/types';

const API_URL = 'https://api.green-api.com';

export const deleteNotification = async (
    credentials: Credentials,
    receiptId: number,
): Promise<void> => {
    const {idInstance, apiTokenInstance} = credentials;

    const response = await fetch(
        `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        {
            method: 'DELETE',
        },
    );

    if (!response.ok) {
        throw new Error('Failed to delete notification');
    }
};
