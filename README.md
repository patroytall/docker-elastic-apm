Documentation and files to set up a trial of the Docker Elastic Application Performance Monitoring (APM) for Python Django.

Docker set up is incomplete. Elasticn cloud APM set up documentation has been added.

# Docker

Elasticsearch Docker documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

Simplified Docker Elasticsearch and Kibana documentation: https://www.elastic.co/guide/en/kibana/current/docker.html

APM on Docker documentation: https://www.elastic.co/guide/en/apm/guide/current/apm-components.html

Fleet Elastic agent: https://www.elastic.co/guide/en/fleet/8.3/install-fleet-managed-elastic-agent.html
https://www.elastic.co/guide/en/fleet/master/elastic-agent-container.html

Deprecated APM documentation: https://www.elastic.co/guide/en/apm/guide/master/running-on-docker.html and https://www.elastic.co/guide/en/apm/guide/current/overview.html

## Elasticsearch

### Setup

    docker pull docker.elastic.co/elasticsearch/elasticsearch:8.3.2
    docker network create elastic

    docker run --name es01 --net elastic -p 9200:9200 -p 9300:9300 -it docker.elastic.co/elasticsearch/elasticsearch:8.3.2

Copy security features from the standard output to a secure location.

### Bootstrap errors

Bootstrap will check perforamnce settings. Reference https://stackoverflow.com/questions/42300463/elasticsearch-bootstrap-checks-failing 

#### Error example

To fix error: `bootstrap check failure [1] of [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]`

    sudo vi /etc/sysctl.conf

set `vm.max_map_count=262144`

    sudo sysctl -p

WSL2 bug with `sysctl`: https://github.com/microsoft/WSL/issues/4232

### Get certificate

    docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .

### Test

Open a new terminal and verify that you can connect to your Elasticsearch cluster by making an authenticated call, using the `http_ca.crt` file that you copied from your Docker container. Enter the password for the elastic user when prompted.

    curl --cacert http_ca.crt -u elastic https://localhost:9200


docker pull docker.elastic.co/kibana/kibana:8.3.2

## Kibana

    docker pull docker.elastic.co/kibana/kibana:8.3.2
    docker run --name kib-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.3.2

To access Kibana, click the generated link in your terminal.

In your browser, paste the enrollment token that you copied when starting Elasticsearch and click the button to connect your Kibana instance with Elasticsearch.

Log in to Kibana as the `elastic` user with the password that was generated when you started Elasticsearch.

To access Kibana after initial configuration: http://localhost:5601

## APM

Determine the latest version of Elastic Agent using https://hub.docker.com/r/elastic/elastic-agent/tags .

    docker pull docker.elastic.co/beats/elastic-agent:8.3.2

I was not able to get the Docker Elastic Agent configured properly. The agent would not connect to Elastic Search. Fleet setup is complex.

The configuration changes from version to version. This article has a lot of good information: https://www.gooksu.com/2021/09/fleet-server-with-elasticsearch-in-docker-container/


# Cloud

Cloud setup documentation: https://www.elastic.co/guide/en/apm/guide/current/apm-quick-start.html

Deployment name: My deployment
Cloud provider: Google
Region: Montreal (northamerica-northeast1)
Hardware profile: Storage optimized
Version: latest (8.3.2)

Agent URL: https://b2e40b20221847a38de33b8ceb7fa89c.apm.northamerica-northeast1.gcp.elastic-cloud.com:443

## WSL2

    sudo apt install python-is-python3
    sudo apt install python3-pip

## iOS and Android

There is currently no support for iOS and Android for Elastic APM.

This project has been started for iOS but is not very active: https://github.com/elastic/apm-agent-ios/commits/main

For Android, Open Telemetry is an option with this Java solution:

- https://www.elastic.co/guide/en/apm/guide/current/open-telemetry.html
- https://github.com/open-telemetry/opentelemetry-java
