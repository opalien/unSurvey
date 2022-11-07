from survey import Survey
import feedparser
from item import Item


class RssSurvey(Survey):
    def __init__(self, ID, time_loop, name, uri):
        Survey.__init__(self, ID, time_loop, name)
        self.uri = uri
        self.list_views = []
        self.type = "rss"

    async def process(self, username):
        feed = feedparser.parse(self.uri)
        items = []
        for entry in feed.entries:
            if entry.title not in self.list_views:
                items.append(Item(username, self.id, entry.title, entry.description, entry.link, entry.published, ""))
                self.list_views.append(entry.title)
        
        return items

    
    def to_json(self):
        to_send = Survey.to_json(self)
        to_send["uri"] = self.uri

        return to_send