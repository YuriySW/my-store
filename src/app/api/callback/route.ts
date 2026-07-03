import {NextResponse} from 'next/server';
import {
  isValidCallbackName,
  isValidRuPhoneDigits,
  parseRuPhoneDigits,
  toRuPhoneE164,
} from '@/lib/callbackForm';
import {isCallbackEmailConfigured, sendCallbackEmail} from '@/lib/sendCallbackEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {name: rawName, phone: rawPhone, productName} = body as {
      name?: string;
      phone?: string;
      productName?: string;
    };

    const name = rawName?.trim() ?? '';
    const phoneDigits = parseRuPhoneDigits(rawPhone ?? '');

    if (!isValidCallbackName(name)) {
      return NextResponse.json(
        {error: 'Имя: только буквы, от 1 до 15 символов'},
        {status: 400},
      );
    }

    if (!isValidRuPhoneDigits(phoneDigits)) {
      return NextResponse.json(
        {error: 'Укажите телефон: 10 цифр после +7'},
        {status: 400},
      );
    }

    if (!isCallbackEmailConfigured()) {
      console.error('Callback form: SMTP env vars are not configured');
      return NextResponse.json(
        {error: 'Отправка временно недоступна'},
        {status: 503},
      );
    }

    const phone = toRuPhoneE164(phoneDigits);

    await sendCallbackEmail({
      name,
      phone,
      productName: productName?.trim() || undefined,
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error('Callback form error:', error);
    return NextResponse.json({error: 'Ошибка отправки'}, {status: 500});
  }
}
