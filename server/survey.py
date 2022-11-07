from multiprocessing import Value
import sqlite3
import time
from item import Item


class Survey:
    def __init__(self, ID, time_loop, name):
        self.id = ID
        self.time_loop = time_loop
        self.name = name
        
        self.last_time = time.time()-time_loop
        self.in_process = Value('b', False)
        self.type = "none"
    
    def is_time(self, now):
        return ((now-self.last_time) >= self.time_loop)

    def reset_timer(self):
        self.last_time = time.time()-self.time_loop

    async def start(self, username):
        if not self.is_time(time.time()):
            return
        
        if self.in_process.value == True:
            return
        
        self.in_process.value = True
        self.last_time += self.time_loop

        items = await self.process(username)
        for item in items:
            item.save()
        
        self.in_process.value = False
        return
    
    async def process(self, username):
        return []

    
    def to_json(self):

        return {
            "id" : self.id,
            "type" : self.type,
            "time_loop" : self.time_loop,
            "name" : self.name,
            "in_process" : self.in_process.value,            
        }

    def get_items(self):
        connection = sqlite3.connect("items.db")
        cursor = connection.cursor()

        to_send = "SELECT * FROM Items WHERE id_survey = " + str(self.id)
        result = connection.execute(to_send)

        items = []

        for line in result.fetchall():
            item = Item(line[1], line[2], line[3], line[4], line[5], line[6], line[7], line[0])
            items.append(item)

        return items

    
    def get_json_tree(self):
        to_send = self.to_json()

        items = []
        for item in self.get_items():
            items.append(item.to_json())

        to_send["items"] = items
        
        return to_send
        