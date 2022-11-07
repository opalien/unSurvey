

ROOT_PRIV = 0
USR_PRIV = 1

class User: 
    def __init__(self, name, password, privilege):
        self.id = -1
        self.name = name
        self.password = password
        self.privilege = privilege

        self.folders = []



    def add_folder(self, folder):
        self.folders.append(folder)
        
    def del_folder(self, id_folder):
        for i in range(len(self.folders)):
            if self.folders[i].id == id_folder:
                self.folders.pop(i)
                return 0
        return -1
        
    def add_survey(self, id_folder, survey):
        for folder in self.folders:
            if folder.id == id_folder:
                folder.add_survey(survey)
                return 0
        
        return -1
    
    def del_survey(self, id_survey):
        for folder in self.folders:
            if folder.del_survey(id_survey) == 0:
                return 0
        return -1


    def to_json(self):
        return {
            "name" : self.name,
            "privilege" : self.privilege,
            "id" : self.id
        }

    async def start(self):
        for folder in self.folders:
            await folder.start(self.name)


    def get_json_tree(self):
        to_send = self.to_json()

        fols = []
        for folder in self.folders:
            fols.append(folder.get_json_tree())

        to_send["folders"] = fols

        return to_send
        
        