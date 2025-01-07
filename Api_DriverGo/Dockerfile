FROM php:8.2-apache

# Instalar extensiones necesarias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

# Copiar los archivos del proyecto
COPY . /var/www/html

# Exponer el puerto 80 para acceso externo
EXPOSE 80
