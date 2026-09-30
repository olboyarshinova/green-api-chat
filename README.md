# GREEN-API Chat

Веб-приложение для отправки и получения текстовых сообщений WhatsApp через GREEN-API.

## Функциональность

- подключение к GREEN-API по `idInstance` и `apiTokenInstance`;
- проверка авторизации инстанса;
- создание чата по номеру телефона;
- отправка текстовых сообщений;
- автоматическое получение входящих сообщений;
- отображение статуса отправки сообщения;
- валидация данных подключения и номера телефона.

## Стек

- React
- TypeScript
- Vite
- SCSS Modules
- GREEN-API
- Vitest
- React Testing Library

## Запуск проекта

### 1. Клонировать репозиторий

```bash
git clone <repository-url>
cd green-api-chat
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Запустить приложение

```bash
npm run dev
```

## Настройка GREEN-API

Для работы приложения необходим авторизованный WhatsApp-инстанс GREEN-API.

1. Создайте инстанс в [личном кабинете GREEN-API](https://console.green-api.com/instanceList).
2. Авторизуйте WhatsApp-аккаунт в созданном инстансе.
3. Получите `idInstance` и `apiTokenInstance`.
4. В настройках инстанса включите `Receive webhooks on incoming messages and files → Yes`.
5. Оставьте `Webhook URL` пустым.
6. Введите `idInstance` и `apiTokenInstance` на странице подключения приложения.

## Использование

1. Введите `idInstance` и `apiTokenInstance`.
2. Нажмите «Подключиться».
3. Введите номер получателя в международном формате.
4. Создайте чат.
5. Отправляйте и получайте текстовые сообщения.

## Архитектура

Проект организован с использованием упрощённого Feature-Sliced Design:

```text
src/
├── app/
├── pages/
├── features/
├── entities/
└── shared/
```

## Безопасность

`idInstance` и `apiTokenInstance` не сохраняются в `localStorage`, `sessionStorage` или URL и существуют только в
состоянии приложения во время текущей сессии.
