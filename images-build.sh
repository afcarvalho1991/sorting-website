docker build -t afcarvalho1991/sorter-backend -f ./backend/Dockerfile ./backend/ && \
docker push afcarvalho1991/sorter-backend && \

docker build -t afcarvalho1991/sorter-website -f ./web/Dockerfile ./web/ && \
docker push afcarvalho1991/sorter-website 
