from web.backend.Server import Server
from web.backend.ServerSettings import ServerSettings
import DataBase.DataBaseSettings

server = Server(hostVal = ServerSettings.host, portVal = ServerSettings.port)
server.run()
