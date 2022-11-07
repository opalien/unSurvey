# pip install websockets
# pip install feedparser

import asyncio
import json
from multiprocessing import Value
import time
from types import NoneType

import websockets

from rss_survey import RssSurvey
from handle import Handle
from user import User
from folder import Folder



class Server:
    def __init__(self, host, port):
        self.host = host
        self.port = port

        self.users = []
        self.handles = []

        self.server_state = Value('b', False)

        self.loop_state = Value('i', -1)
        self.loop_time = 1.0

        self.user_ids = Value('i', 0)
        self.survey_ids = Value('i', 0)
        self.folder_ids = Value('i', 0)

        print("server created")


    async def wait_stop_server(self):
        while self.server_state.value == True:
            await asyncio.sleep(5)

    async def start(self):
        async with websockets.serve(self.handler, self.host, self.port):
            self.server_state.value = True
            print("server started")
            await self.wait_stop_server()
            print("server stopped")
        
    def stop(self):
        self.server_state.value = False

    def add_user(self, user):
        for u in self.users:
            if u.name == user.name:
                print("trying to add user but name already used")
                return -1
        
        user.id = self.get_next_user_id()
        self.users.append(user)
        print("user added")
        return 0

    def del_user(self, id_user):
        for i in range(len(self.users)):
            if self.users[i].id == id_user:
                self.users.pop(i)
                print("user deleted")
                return 0
        return -1
    
    async def loop(self):
        t = time.time()
        while self.loop_state.value == 0:
            for user in self.users:
                await user.start()
            
            time_sleeping = (self.loop_time-time.time() + t)
            await asyncio.sleep(time_sleeping)
        
        self.loop_state.value = -1

    
    def start_loop(self):
        if self.loop_state.value != -1:
            print("try to start loop, but already in process")
            return 1
        
        self.loop_state.value = 0
        task = asyncio.create_task(self.loop())
        print("loop started")
        return 0
    

    async def stop_loop(self):
        if self.loop_state.value == -1:
            print("try to stop loop, but not started")
            return 1
        
        if self.loop_state.value == 1:
            print("try to stop loop, but already in process")
            return 2

        self.loop_state.value = 1
        while self.loop_state.value != -1:
            await asyncio.sleep(0.5)
        
        print("loop_stopped")
        return 0

    def get_survey_from_json(self, parse):
        if is_in(parse, "time_loop", [float, int]):
            time_loop = parse["time_loop"]
        else:
            time_loop = 0.0
        
        if not is_in(parse, "name", str):
            return None
        
        name = parse["name"]

        if is_in(parse, "type", str):
            if parse["type"] == "rss":
                if is_in(parse, "uri", str):
                    return RssSurvey(self.get_next_survey_id(), time_loop, name, parse["uri"])

        return None

    




    def get_next_user_id(self):
        to_send = self.user_ids.value
        self.user_ids.value += 1
        return to_send


    def get_next_survey_id(self):
        to_send = self.survey_ids.value
        self.survey_ids.value += 1
        return to_send
    

    def get_next_folder_id(self):
        to_send = self.folder_ids.value
        self.folder_ids.value += 1
        return to_send



    async def send_response(self, to_send, parse, handle):
        if is_in(parse, "n", int):
            to_send["n"] = parse["n"]
        await handle.websocket.send(json.dumps(to_send))


    async def handler(self, websocket):
        handle = Handle(websocket)
        self.handles.append(handle)
        print("new client handled")

        async for message in websocket:
            await self.message_parser(message, handle)
        
        for i in range(len(self.handles)):
            if self.handles[i].websocket.id == websocket.id:
                self.handles.pop(i)
                break
        
        print("client quit")


    async def message_parser(self, message, handle):
        try:
            parse = json.loads(message)
        except:
            to_send = { "error" : "json incorrect" }          
            await handle.websocket.send(json.dumps(to_send))

            print("error parsing json message")
            return -1
        
        if is_in(parse, "command", str):

            if parse["command"] == "sign_in":
                if not (is_in(parse, "name", str) and is_in(parse, "password", str)):
                    to_send = { "error" : "name or password missing", "code" : 1001}

                    await self.send_response(to_send, parse, handle)
                    return
                
                for user in self.users:
                    if parse["name"] == user.name and parse["password"] == user.password:
                        handle.set_user(user)
                        print("client sign in")

                        to_send = { "status" : "sign in successfully", "code" : 2001 }
                        await self.send_response(to_send, parse, handle)
                        return
                
                to_send = { "error" : "name or password incorrect", "code" : 1004 }
                await self.send_response(to_send, parse, handle)
                return

            
            elif parse["command"] == "add_user":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if handle.user.privilege != 0:
                    to_send = { "error" : "command acces denied", "code" : 1003}
                    await self.send_response(to_send, parse, handle)
                    return
                
                if not (is_in(parse, "name", str) and is_in(parse, "password", str) and is_in(parse, "privilege", int)):
                    to_send = { "error" : "name or password or privilege missing", "code" : 1001}
                    await self.send_response(to_send, parse, handle)
                    return

                result = self.add_user(User(parse["name"], parse["password"], parse["privilege"]))
                    
                if result == 0:
                    to_send = { "status" : "new user added", "code" : 2002}
                    await self.send_response(to_send, parse, handle)
                    return
                
                if result == -1:
                    to_send = { "error" : "user aleady exist", "code" : 1005}
                    await self.send_response(to_send, parse, handle)
                    return

                print("add_user : end of function reached")

            
            elif parse["command"] == "del_user":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if handle.user.privilege != 0:
                    to_send = { "error" : "command acces denied", "code" : 1003}
                    await self.send_response(to_send, parse, handle)
                    return

                if not is_in(parse, "id", int):
                    to_send = { "error" : "user id missing", "code" : 1001 }
                    await self.send_response(to_send, parse, handle)
                    return

                result = self.del_user(parse["id"])

                if result == 0:
                    to_send = { "status" : "user deleted", "code" : 2003}
                    await self.send_response(to_send, parse, handle)
                    return
                
                if result == -1:
                    to_send = { "error" : "user id do not exist", "code" : 1006}
                    await self.send_response(to_send, parse, handle)
                    return

                print("del_user : end of function reached")


            elif parse["command"] == "get_users":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if handle.user.privilege != 0:
                    to_send = { "error" : "command acces denied", "code" : 1003}
                    await self.send_response(to_send, parse, handle)
                    return
                
                usrs = []
                for user in self.users:
                    usrs.append(user.to_json())


                to_send = { "list_user" : usrs }
                await self.send_response(to_send, parse, handle)
                return

            
            elif parse["command"] == "get_active_users":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if handle.user.privilege != 0:
                    to_send = { "error" : "command acces denied", "code" : 1003}
                    await self.send_response(to_send, parse, handle)
                    return

                usrs = []
                for h in self.handles:                    
                    if h.user == None:
                        continue

                    is_already = False
                    for u in usrs:
                        if u["id"] == h.user.id:
                            is_already = True
                            break
                    
                    if not is_already:
                        usr = h.user.to_json()
                        usr["up_time"] = time.time()-h.time_comme
                        usrs.append(usr)
                    
                to_send = { "list_user" : usrs }
                await self.send_response(to_send, parse, handle)
                return

            
            elif parse["command"] == "stop_server":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if handle.user.privilege != 0:
                    to_send = { "error" : "command acces denied", "code" : 1003}
                    await self.send_response(to_send, parse, handle)
                    return
                
                self.stop()
                print("order to stop launched")
                return 

            
            elif parse["command"] == "start_loop":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if handle.user.privilege != 0:
                    to_send = { "error" : "command acces denied", "code" : 1003}
                    await self.send_response(to_send, parse, handle)
                    return
                
                result = self.start_loop()

                if result == 1:
                    to_send = { "error" : "loop can't start", "code" : 1007}
                    await self.send_response(to_send, parse, handle)
                    return
                
                if result == 0:
                    to_send = { "status" : "loop started", "code" : 2006}
                    await self.send_response(to_send, parse, handle)
                    return


            elif parse["command"] == "stop_loop":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if handle.user.privilege != 0:
                    to_send = { "error" : "command acces denied", "code" : 1003 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                result = await self.stop_loop()

                if result == 1:
                    to_send = { "error" : "loop not started", "code" : 1008}
                    await self.send_response(to_send, parse, handle)
                    return

                if result == 2:
                    to_send = { "error" : "stop loop aleady in process", "code" : 1009 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if result == 0:
                    to_send = { "status" : "loop stopped", "code" : 2007}
                    await self.send_response(to_send, parse, handle)
                    return

                
            elif parse["command"] == "get_tree":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return

                usr = handle.user.get_json_tree()
                to_send = { "user" : usr }
                await self.send_response(to_send, parse, handle)
                return


            elif parse["command"] == "add_folder":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return

                if not is_in(parse, "folder", dict):
                    to_send = { "error" : "folder missing"}
                    await self.send_response(to_send, parse, handle)
                    return
                
                if not is_in(parse["folder"], "name", str):
                    to_send = { "error" : "folder name missing"}
                    await self.send_response(to_send, parse, handle)
                    return
                
                handle.user.add_folder(Folder(self.get_next_folder_id(), parse["folder"]["name"]))

                to_send = { "status" : "folder added", "code" : 2008}
                await self.send_response(to_send, parse, handle)
                return
            

            elif parse["command"] == "del_folder":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return

                if not is_in(parse, "folder", dict):
                    to_send = { "error" : "folder missing"}
                    await self.send_response(to_send, parse, handle)
                    return

                if not is_in(parse["folder"], "id", int):
                    to_send = { "error" : "folder id missing"}
                    await self.send_response(to_send, parse, handle)
                    return

                result = handle.user.del_folder(parse["folder"]["id"])

                if result == -1:
                    to_send = { "error" : "id not corresponding to folder"}
                    await self.send_response(to_send, parse, handle)
                    return

                to_send = { "status" : "folder deleted", "code" : 2009}
                await self.send_response(to_send, parse, handle)
                return

                
            elif parse["command"] == "add_survey":
                if handle.user == None:
                    to_send = { "error" : "user not connected to perform command", "code" : 1002 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                if not is_in(parse, "folder_id", int):
                    to_send = { "error" : "folder id missing" }
                    await self.send_response(to_send, parse, handle)
                    return

                if not is_in(parse, "survey", dict):
                    to_send = { "error" : "survey missing", "code" : 1001 }
                    await self.send_response(to_send, parse, handle)
                    return
                
                survey = self.get_survey_from_json(parse["survey"])

                if type(survey) == NoneType:
                    to_send = { "error" : "survey parameters falses"}
                    await self.send_response(to_send, parse, handle)
                    return

                result = handle.user.add_survey(parse["folder_id"], survey)

                if result == -1:
                    to_send = { "error" : "folder id is not correspond to folder"}
                    await self.send_response(to_send, parse, handle)
                    return
                
                to_send = { "status" : "survey added" }
                await self.send_response(to_send, parse, handle)
                return






    


def is_in(parse, string, types):
    if string not in parse.keys():
        return False
    
    if type(types) == list:
        for t in types:
            if type(parse[string]) == t:
                return True
    
    else :
        if type(parse[string]) == types:
            return True
    
    return False