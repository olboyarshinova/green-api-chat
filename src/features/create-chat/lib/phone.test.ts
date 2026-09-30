import {describe, expect, it} from 'vitest';
import {isValidPhone, normalizePhone} from '@/features/create-chat/lib/phone';

describe('normalizePhone', () => {
    it('removes non-digit characters from phone number', () => {
        expect(normalizePhone('+7 (952) 234-05-47')).toBe('79522340547');
    });
});

describe('isValidPhone', () => {
    it('returns true for a valid phone number', () => {
        expect(isValidPhone('79522340547')).toBe(true);
    });

    it('returns true for a formatted valid phone number', () => {
        expect(isValidPhone('+7 (952) 234-05-47')).toBe(true);
    });

    it('returns false when phone number is too short', () => {
        expect(isValidPhone('123456789')).toBe(false);
    });

    it('returns false when phone number is too long', () => {
        expect(isValidPhone('1234567890123456')).toBe(false);
    });
});
