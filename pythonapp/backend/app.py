import falcon
from db import get_db_connection

class HelloResource:
    def on_get(self, req, resp):
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT text FROM messages LIMIT 1;")
        message = cursor.fetchone()[0]
        db.close()

        resp.media = {"message": message}

app = falcon.App()
app.add_route('/api/hello', HelloResource())
