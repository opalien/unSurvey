# pip install websockets
# pip install feedparser

import asyncio

from server import Server
from user import User


if __name__ == '__main__':
    server = Server("", 8001)

    usr = User("opalien", "h7az2t83", 0)
    server.add_user(usr)

    asyncio.run(server.start())


