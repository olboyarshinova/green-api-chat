import {useState, type ComponentProps} from 'react';
import {isValidPhone, normalizePhone} from '@/features/create-chat/lib/phone';
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
            setError('Enter a valid phone number');
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
                <span>Phone number</span>

                <input
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="+7 999 123 45 67"
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

            <button
                type="submit"
                disabled={!isFormValid}
            >
                Create chat
            </button>
        </form>
    );
};
