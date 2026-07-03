/** 10 цифр после +7 (без кода страны) */
export function parseRuPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('7') || digits.startsWith('8')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function formatRuPhone(digits: string): string {
  const d = digits.slice(0, 10);
  if (!d) return '';

  let result = '+7';
  if (d.length > 0) {
    result += ` (${d.slice(0, 3)}`;
    if (d.length >= 3) result += ')';
    if (d.length > 3) result += ` ${d.slice(3, 6)}`;
    if (d.length > 6) result += `-${d.slice(6, 8)}`;
    if (d.length > 8) result += `-${d.slice(8, 10)}`;
  }
  return result;
}

export function toRuPhoneE164(digits: string): string {
  return `+7${digits}`;
}

export function filterName(value: string): string {
  return value.replace(/[^\p{L}]/gu, '').slice(0, 15);
}

export function isValidCallbackName(name: string): boolean {
  return name.length >= 1 && name.length <= 15 && /^\p{L}+$/u.test(name);
}

export function isValidRuPhoneDigits(digits: string): boolean {
  return digits.length === 10;
}
