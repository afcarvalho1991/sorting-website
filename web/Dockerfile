###########
# To test #
###########
# docker build -t website_sagres -f Dockerfile.website .
# docker run -it --rm -p 9000:80 website_sagres

#################
# angular build #
#################

FROM node:16.10 AS builder

WORKDIR /usr/src/app

COPY package.json ./
#COPY website/node_modules ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

# build
RUN ng build --configuration production --base-href /
# still needs to solve redirect deployment angular and nginx
# still needs to solve redirect deployment angular and nginx
# still needs to solve redirect deployment angular and nginx

####################
# webserver deploy #
####################

FROM httpd:2-alpine

COPY --from=builder /usr/src/app/dist/website /usr/local/apache2/htdocs/

# Enable HEADERS module in apache2 (CORS)
RUN sed -i \
  's/#LoadModule rewrite_module modules\/mod_headers.so/LoadModule rewrite_module modules\/mod_headers.so/g' \
  /usr/local/apache2/conf/httpd.conf


# Enable the rewrite module in apache2.
RUN sed -i \
  's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
  /usr/local/apache2/conf/httpd.conf

# Append to the published directory, that we want to rewrite any request that is not an actual file
# to the index.html page.
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/a### Rewrite rule was written from the Dockerfile when building the image ###\n\
    DirectoryIndex index.html\n\
    RewriteEngine on\n\
    RewriteCond %{REQUEST_FILENAME} -s [OR]\n\
    RewriteCond %{REQUEST_FILENAME} -d\n\
    RewriteRule ^.*$ - [NC,L]\n\
    RewriteRule ^(.*) index.html [NC,L]\n' \
  /usr/local/apache2/conf/httpd.conf

# Comment out the default config that handles requests to /.htaccess and /.ht* with a special error message,
# Angular will handle all routing
RUN sed -i '/<Files "\.ht\*">/,/<\/Files>/c# This was commented out from the Dockerfile\n# <Files ".ht*">\n#     Require all denied\n# <\/Files>' \
  /usr/local/apache2/conf/httpd.conf


# # Change owner of the publicly available files to root user and daemon group. Httpd threads run as daemon.
# RUN chown -R root:daemon \
#   /usr/local/apache2/htdocs/*

# # Ensure that the files can only be read, even by the httpd server.
# RUN chmod -R 440 \
#   /usr/local/apache2/htdocs/*

# # Ensure for all the directories created, that the files within them can be read. We need the
# # execution access privilege on the directory for this. Dynamically apply this to all directories
# # at least one level into the served root. (-mindepth 1, otherwise the served directory itself
# # would be included - no need for that.
# RUN find /usr/local/apache2/htdocs/ -mindepth 1 -type d -exec chmod +x {} \;

## Configure SSL and enforce HTTPS
# ENV SERVER_NAME=sagres-smart.com

# COPY certificates/star_isq_pt.crt /usr/local/apache2/conf/server.crt
# COPY certificates/star_isq_pt.key /usr/local/apache2/conf/server.key

# RUN  sed -i 's%#\(Include conf/extra/httpd-ssl.conf\)%\1%' conf/httpd.conf \
#   && sed -i 's%#\(LoadModule ssl_module modules/mod_ssl.so\)%\1%' conf/httpd.conf \
#   && sed -i 's%#\(LoadModule socache_shmcb_module modules/mod_socache_shmcb.so\)%\1%' conf/httpd.conf \
#   && sed -i 's%ServerName www.example.com:443%ServerName ${SERVER_NAME}:443%' conf/extra/httpd-ssl.conf


# ## Setup proxy/dns route
# RUN echo '' >> conf/httpd.conf
# RUN echo '<VirtualHost *:443>' >> conf/httpd.conf
# RUN echo '    DocumentRoot /usr/local/apache2/htdocs/' >> conf/httpd.conf
# RUN echo '    Servername sagres-smart.com' >> conf/httpd.conf
# RUN echo '    ServerAlias www.sagres-smart.com' >> conf/httpd.conf
# RUN echo '    Protocols h2 http/1.1' >> conf/httpd.conf
# RUN echo '    SSLEngine on' >> conf/httpd.conf
# RUN echo '    SSLCertificateFile /usr/local/apache2/conf/server.crt' >> conf/httpd.conf
# RUN echo '    SSLCertificateKeyFile /usr/local/apache2/conf/server.key' >> conf/httpd.conf
# RUN echo '</VirtualHost>' >> conf/httpd.conf

# RUN echo '' >> conf/httpd.conf
# RUN echo '' >> conf/httpd.conf
# RUN echo '<VirtualHost *:80>' >> conf/httpd.conf
# RUN echo '    ServerName sagres-smart.com' >> conf/httpd.conf
# RUN echo '    ServerAlias www.sagres-smart.com' >> conf/httpd.conf
# RUN echo '    Redirect permanent / https://sagres-smart.com' >> conf/httpd.conf
# RUN echo '</VirtualHost>' >> conf/httpd.conf
# RUN echo '' >> conf/httpd.conf

# Exposable ports
EXPOSE 80
EXPOSE 443