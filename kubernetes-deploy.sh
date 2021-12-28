export KUBECONFIG=kubeconfig.yaml && \

## 1st time only - create nodebalancer
# kubectl create secret tls ingress-ssl --key key.pem --cert cert.pem
# helm repo add nginx-stable https://helm.nginx.com/stable && \
# helm repo update && \
# helm install ingress-nginx nginx-stable/nginx-ingress --set rbac.create=true && \

kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=/home/afcarvalho/.docker/config.json \
    --type=kubernetes.io/dockerconfigjson

kubectl delete -f backend/kubernetes/deployment.yaml && \
kubectl delete -f backend/kubernetes/service.yaml && \
kubectl delete -f web/kubernetes/deployment.yaml && \
kubectl delete -f web/kubernetes/service.yaml

# Deploy elastic search pods
sh elastic/kubernetes/deploy.sh

kubectl apply -f backend/kubernetes/deployment.yaml && \
kubectl apply -f backend/kubernetes/service.yaml && \

kubectl apply -f web/kubernetes/deployment.yaml && \
kubectl apply -f web/kubernetes/service.yaml

# kubectl --namespace default get services -o wide -w ingress-nginx-controller

# create ingress
kubectl apply -f ingress-sorting.yaml && \


echo "Completed!"