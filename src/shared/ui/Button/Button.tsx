import type {ComponentProps} from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ComponentProps<'button'> {
    isLoading?: boolean;
    loadingText?: string;
}

export const Button = ({
        children,
        isLoading = false,
        loadingText = 'Загрузка...',
        disabled,
        ...props
    }: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={disabled || isLoading}
            className={styles.button}
        >
            {isLoading ? loadingText : children}
        </button>
    );
};
