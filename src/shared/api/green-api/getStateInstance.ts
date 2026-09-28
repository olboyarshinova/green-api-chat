import type {Credentials} from '@/features/credentials/model/types';
import {createGreenApiUrl} from '@/shared/api/green-api/client';
import type {GetStateInstanceResponse} from '@/shared/api/green-api/types';

export const getStateInstance = async (
    credentials: Credentials,
): Promise<GetStateInstanceResponse> => {
    const response = await fetch(createGreenApiUrl(credentials, 'getStateInstance'));

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    return await response.json() as Promise<GetStateInstanceResponse>;
};
