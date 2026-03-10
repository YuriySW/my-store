import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, productName } = body as {
      name?: string;
      phone?: string;
      productName?: string;
    };
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }
    // TODO: отправить в CRM, почту, телеграм и т.д.
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Ошибка отправки' },
      { status: 500 }
    );
  }
}
