from Server import Server
from ServerSettings import ServerSettings
from neomodel import config

config.DATABASE_URL = 'neo4j://neo4j:@neo4j:7687'
server = Server(hostVal = ServerSettings.host, portVal = ServerSettings.port)
server.run()
