import falcon
import json
import mysql.connector
from mysql.connector import Error

class DataResource:
    def on_get(self, req, resp):
        try:
            connection = mysql.connector.connect(
                host='db',
                database='mydb',
                user='root',
                password='password'
            )
            
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM mytable")
            result = cursor.fetchall()
            
            resp.text = json.dumps({
                "status": "success",
                "data": result
            })
            resp.status = falcon.HTTP_200
            
        except Error as e:
            resp.text = json.dumps({"status": "error", "message": str(e)})
            resp.status = falcon.HTTP_500
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

app = falcon.App()
app.add_route('/api/data', DataResource())