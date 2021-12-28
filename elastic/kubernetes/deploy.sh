helm repo add elastic https://helm.elastic.com

helm uninstall elasticsearch-multi-master
helm uninstall elasticsearch-multi-data
helm uninstall elasticsearch-multi-client


helm install elasticsearch-multi-master elastic/elasticsearch -f ./elastic/master.yaml
# helm install elasticsearch-multi-data elastic/elasticsearch -f ./elastic/data.yaml
# helm install elasticsearch-multi-client elastic/elasticsearch -f ./elastic/client.yaml
