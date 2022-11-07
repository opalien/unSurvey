class Folder:
    def __init__(self, ID, name):
        self.id = ID
        self.name = name

        self.surveys = []

    
    def add_survey(self, survey):
        self.surveys.append(survey)

    
    def del_survey(self, id_survey):
        for i in range(len(self.surveys)):
            if self.surveys[i].id == id_survey:
                self.surveys.pop(i)
                return 0
        return -1

    def get_surveys(self):
        to_send = []
        for survey in self.surveys:
            to_send.append(survey.to_json())
        return to_send
    
    def get_items(self):
        items = []
        for survey in self.surveys:
            items.append(survey.get_items())
        
        return items

    async def start(self, username):
        for survey in self.surveys:
            await survey.start(username)

    def to_json(self):
        return {
            "id" : self.id,
            "name" : self.name,
        }

    def get_json_tree(self):
        to_send = self.to_json()

        surs = []
        for survey in self.surveys:
            surs.append(survey.get_json_tree())

        to_send["surveys"] = surs

        return to_send
        