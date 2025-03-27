# Этап установки зависимостей
FROM node:20-alpine AS deps

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем установленные зависимости из предыдущего этапа
COPY --from=deps /app /app

COPY ./public ./public
COPY ./src ./src

RUN npm run build

# Экспонируем порт для запуска приложения
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
