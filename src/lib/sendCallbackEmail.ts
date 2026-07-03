import nodemailer from 'nodemailer';

interface CallbackEmailPayload {
  name: string;
  phone: string;
  productName?: string;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CALLBACK_EMAIL_TO;
  const from = process.env.CALLBACK_EMAIL_FROM || user;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass || !to || !from) {
    return null;
  }

  return {host, user, pass, to, from, port};
}

export function isCallbackEmailConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export async function sendCallbackEmail({
  name,
  phone,
  productName,
}: CallbackEmailPayload): Promise<void> {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error('SMTP не настроен');
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const subject = productName
    ? `Заявка на звонок: ${productName}`
    : 'Заявка на звонок с сайта';

  const lines = [
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    productName ? `Товар: ${productName}` : null,
    `Время: ${new Date().toLocaleString('ru-RU', {timeZone: 'Asia/Yekaterinburg'})}`,
  ].filter(Boolean);

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject,
    text: lines.join('\n'),
    html: lines.map((line) => `<p>${line}</p>`).join(''),
  });
}
