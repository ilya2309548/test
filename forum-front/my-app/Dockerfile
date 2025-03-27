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

# Устанавливаем переменную окружения для production сборки
ENV NODE_ENV=production
RUN npm run build

# Этап production
FROM nginx:alpine

# Копируем собранные файлы из этапа сборки
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
