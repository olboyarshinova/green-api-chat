import type {Credentials, CredentialsErrors} from '@/features/credentials/model/types';

export const validateCredentials = ({
        idInstance,
        apiTokenInstance,
    }: Credentials): CredentialsErrors => {
    const errors: CredentialsErrors = {};

    if (!idInstance.trim()) {
        errors.idInstance = 'ID Instance is required';
    }

    if (!apiTokenInstance.trim()) {
        errors.apiTokenInstance = 'API Token Instance is required';
    }

    return errors;
};
