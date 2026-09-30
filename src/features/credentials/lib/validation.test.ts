import {describe, expect, it} from 'vitest';
import {validateCredentials} from '@/features/credentials/lib/validation';

describe('validateCredentials', () => {
    it('returns no errors for valid credentials', () => {
        const errors = validateCredentials({
            idInstance: '1234567890',
            apiTokenInstance: 'test-token',
        });

        expect(errors).toEqual({});
    });

    it('returns errors when credentials are empty', () => {
        const errors = validateCredentials({
            idInstance: '',
            apiTokenInstance: '',
        });

        expect(errors).toEqual({
            idInstance: 'Введите ID Instance',
            apiTokenInstance: 'Введите API Token Instance',
        });
    });

    it('returns an error when idInstance contains non-digit characters', () => {
        const errors = validateCredentials({
            idInstance: '123abc',
            apiTokenInstance: 'test-token',
        });

        expect(errors).toEqual({
            idInstance: 'ID Instance должен содержать только цифры',
        });
    });

    it('treats whitespace-only credentials as empty', () => {
        const errors = validateCredentials({
            idInstance: '   ',
            apiTokenInstance: '   ',
        });

        expect(errors).toEqual({
            idInstance: 'Введите ID Instance',
            apiTokenInstance: 'Введите API Token Instance',
        });
    });
});
