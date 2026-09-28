import type {Credentials} from '@/features/credentials/model/types';

const API_URL = 'https://api.green-api.com';

export const createGreenApiUrl = (
    credentials: Credentials,
    method: string,
): string => {
    const {idInstance, apiTokenInstance} = credentials;

    return `${API_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
};
