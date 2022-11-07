import json
import sqlite3


class Item:
    def __init__(self, user, id_survey, title, description, link, date, img, ID = -1):
        self.id = ID
        self.user = user
        self.id_survey = id_survey
        self.title = title
        self.description = description
        self.link = link
        self.date = date
        self.img = img

    def to_json(self):
        return {
            "ID" : self.id,
            "user" : self.user,
            "id_survey" : self.id_survey,
            "title" : self.title,
            "description" : self.description,
            "link" : self.link,
            "date" : self.date,
            "img" : self.img
        }

    def __str__(self):
        return json.dumps(self.to_json())
    
    def save(self):
        connection = sqlite3.connect("items.db")
        cursor = connection.cursor()

        to_send = "INSERT INTO Items (user, id_survey, title, description, link, date, img) VALUES ('" + str(self.user).replace("'", "''") + "', '" + str(self.id_survey).replace("'", "''") + "', '" + str(self.title).replace("'", "''") + "', '" + str(self.description).replace("'", "''") + "', '" + str(self.link).replace("'", "''") + "', '" + str(self.date).replace("'", "''") + "', '" + str(self.img).replace("'", "''") + "')"

        cursor.execute(to_send)
        connection.commit()
        connection.close()