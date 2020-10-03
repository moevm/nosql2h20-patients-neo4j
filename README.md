# nosql2h20-patients-neo4j

#### nosql2h20-patients-neo4j installation guide:
*1.* ```git clone https://github.com/moevm/nosql2h20-patients-neo4j.git <local-repo-name>```

*2.* ```cd <local-repo-name>```

*3.* ```docker-compose up -d``` (run ```docker stop <container-id>``` to stop )

*4.* Find via ```docker ps``` id of container from image ***nosql2h20-patients-neo4j_app***

*5.* ```docker exec -it <container-if from previous item> neomodel_install_labels --db bolt://neo4j:@neo4j:7687 DiseaseModel.py```

*6.* Application is available on port http://localhost:8080/
