FROM php:8.1-fpm

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y nginx

# Copiar archivos al contenedor
WORKDIR /var/www/html
COPY . .

# Configurar NGINX
RUN echo "server {
    listen 80;
    root /var/www/html/public;
    index index.php;
    server_name _;

    location / {
        try_files \$uri /index.php?\$query_string;
    }

    location ~ \.php\$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
    }
}" > /etc/nginx/sites-available/default

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar el servidor
CMD service nginx start && php-fpm