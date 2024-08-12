from flask import Flask, jsonify
from sqlalchemy import text
from connectors.sql_connector import get_connection
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') 

@app.route("/")
def welcome():
    return jsonify({"message": "Welcome to our API!"})

if __name__ == "__main__":
    app.run(debug=True)