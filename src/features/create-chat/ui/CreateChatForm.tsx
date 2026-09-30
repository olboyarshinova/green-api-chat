import {useState, type ComponentProps} from 'react';
import {isValidPhone, normalizePhone} from '@/features/create-chat/lib/phone';
import {Button} from "@/shared/ui/Button/Button.tsx";
import styles from './CreateChatForm.module.scss';

interface CreateChatFormProps {
    onSubmit: (phoneNumber: string) => void;
}

type FormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;

export const CreateChatForm = ({onSubmit}: CreateChatFormProps) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const isFormValid = isValidPhone(phoneNumber);

    const handleSubmit: FormSubmitHandler = (event) => {
        event.preventDefault();

        if (!isValidPhone(phoneNumber)) {
            setError('Введите корректный номер телефона');
            return;
        }

        setError('');
        onSubmit(normalizePhone(phoneNumber));
    };

    const handleChange = (value: string) => {
        setPhoneNumber(value);

        if (error && isValidPhone(value)) {
            setError('');
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <label className={styles.field}>
                <span>Номер телефона</span>

                <input
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="79991234567"
                    autoComplete="tel"
                    aria-invalid={Boolean(error)}
                    onChange={(event) => handleChange(event.target.value)}
                />

                {error && (
                    <span
                        className={styles.error}
                        role="alert"
                    >
                        {error}
                    </span>
                )}
            </label>

            <Button
                type="submit"
                disabled={!isFormValid}
            >
                Создать чат
            </Button>
        </form>
    );
};
