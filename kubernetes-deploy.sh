export KUBECONFIG=kubeconfig.yaml && \

# # create nodebalancer
# helm repo add nginx-stable https://helm.nginx.com/stable && \
# helm repo update && \
# helm install ingress-nginx nginx-stable/nginx-ingress --set rbac.create=true && \

kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=/home/afcarvalho/.docker/config.json \
    --type=kubernetes.io/dockerconfigjson

kubectl apply -f backend/kubernetes/deployment.yaml && \
kubectl apply -f backend/kubernetes/service.yaml && \

kubectl apply -f web/kubernetes/deployment.yaml && \
kubectl apply -f web/kubernetes/service.yaml

# kubectl --namespace default get services -o wide -w ingress-nginx-controller

# create ingress
kubectl apply -f ingress-sorting.yaml && \


echo "Completed!"