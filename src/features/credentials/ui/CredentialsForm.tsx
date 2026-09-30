import {useState, type ComponentProps} from 'react';
import {validateCredentials} from '@/features/credentials/lib/validation';
import type {Credentials, CredentialsErrors} from '@/features/credentials/model/types';
import {Button} from '@/shared/ui/Button/Button';
import styles from './CredentialsForm.module.scss';

interface CredentialsFormProps {
    isLoading: boolean;
    onSubmit: (credentials: Credentials) => void | Promise<void>;
}

type FormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

export const CredentialsForm = ({isLoading, onSubmit}: CredentialsFormProps) => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [errors, setErrors] = useState<CredentialsErrors>({});

    const isFormValid = Boolean(idInstance.trim() && apiTokenInstance.trim());

    const handleIdInstanceChange = (value: string) => {
        setIdInstance(value);

        if (errors.idInstance && value.trim()) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                idInstance: undefined,
            }));
        }
    };

    const handleApiTokenInstanceChange = (value: string) => {
        setApiTokenInstance(value);

        if (errors.apiTokenInstance && value.trim()) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                apiTokenInstance: undefined,
            }));
        }
    };

    const handleSubmit: FormSubmitHandler = (event) => {
        event.preventDefault();

        const credentials: Credentials = {
            idInstance: idInstance.trim(),
            apiTokenInstance: apiTokenInstance.trim(),
        };

        const validationErrors = validateCredentials(credentials);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        onSubmit(credentials);
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <label className={styles.field}>
                <span>ID Instance</span>

                <input
                    type="text"
                    name="idInstance"
                    value={idInstance}
                    placeholder="Введите ID Instance"
                    autoComplete="off"
                    aria-invalid={Boolean(errors.idInstance)}
                    onChange={(event) => handleIdInstanceChange(event.target.value)}
                />

                {errors.idInstance && (
                    <span
                        className={styles.error}
                        role="alert"
                    >
                    {errors.idInstance}
                    </span>
                )}
            </label>

            <label className={styles.field}>
                <span>API Token Instance</span>

                <input
                    type="password"
                    name="apiTokenInstance"
                    value={apiTokenInstance}
                    placeholder="Введите API Token Instance"
                    autoComplete="off"
                    aria-invalid={Boolean(errors.apiTokenInstance)}
                    onChange={(event) => handleApiTokenInstanceChange(event.target.value)}
                />

                {errors.apiTokenInstance && (
                    <span
                        className={styles.error}
                        role="alert"
                    >
                        {errors.apiTokenInstance}
                    </span>
                )}
            </label>

            <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Подключение..."
                disabled={!isFormValid}
            >
                Подключиться
            </Button>
        </form>
    );
};
