import type {Credentials, CredentialsErrors} from '@/features/credentials/model/types';

export const validateCredentials = ({
    idInstance,
    apiTokenInstance,
}: Credentials): CredentialsErrors => {
    const errors: CredentialsErrors = {};

    if (!idInstance.trim()) {
        errors.idInstance = 'Введите ID Instance';
    } else if (!/^\d+$/.test(idInstance.trim())) {
        errors.idInstance = 'ID Instance должен содержать только цифры';
    }

    if (!apiTokenInstance.trim()) {
        errors.apiTokenInstance = 'Введите API Token Instance';
    }

    return errors;
};
