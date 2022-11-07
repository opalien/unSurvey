import time

class Handle:
    def __init__(self, websocket):
        self.user = None
        self.websocket = websocket
        self.time_comme = time.time()

    def set_user(self, user):
        self.user = user

    def del_user(self):
        self.user = None
        