import falcon
import json
import mysql.connector
from mysql.connector import Error

class ItemsResource:
    def on_get(self, req, resp):
        try:
            connection = self.get_connection()
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM mytable")
            result = cursor.fetchall()
            resp.text = json.dumps(result)
            resp.status = falcon.HTTP_200
        except Error as e:
            self.handle_error(resp, str(e))
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def on_post(self, req, resp):
        try:
            data = json.load(req.bounded_stream)
            connection = self.get_connection()
            cursor = connection.cursor()
            cursor.execute(
                "INSERT INTO mytable (name) VALUES (%s)",
                (data['name'],)
            )
            connection.commit()
            resp.text = json.dumps({"id": cursor.lastrowid, "name": data['name']})
            resp.status = falcon.HTTP_201
        except Error as e:
            self.handle_error(resp, str(e))
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def on_put(self, req, resp, item_id):
        try:
            data = json.load(req.bounded_stream)
            connection = self.get_connection()
            cursor = connection.cursor()
            cursor.execute(
                "UPDATE mytable SET name = %s WHERE id = %s",
                (data['name'], item_id)
            )
            connection.commit()
            resp.text = json.dumps({"id": item_id, "name": data['name']})
            resp.status = falcon.HTTP_200
        except Error as e:
            self.handle_error(resp, str(e))
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def on_delete(self, req, resp, item_id):
        try:
            connection = self.get_connection()
            cursor = connection.cursor()
            cursor.execute("DELETE FROM mytable WHERE id = %s", (item_id,))
            connection.commit()
            resp.text = json.dumps({"message": "Item deleted"})
            resp.status = falcon.HTTP_200
        except Error as e:
            self.handle_error(resp, str(e))
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def get_connection(self):
        return mysql.connector.connect(
            host='db',
            database='mydb',
            user='root',
            password='password'
        )

    def handle_error(self, resp, message):
        resp.text = json.dumps({"error": message})
        resp.status = falcon.HTTP_500

app = falcon.App(middleware=falcon.CORSMiddleware(
    allow_origins='*',
    allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
    allow_headers=['Content-Type']
))

app.add_route('/api/items', ItemsResource())
app.add_route('/api/items/{item_id:int}', ItemsResource())