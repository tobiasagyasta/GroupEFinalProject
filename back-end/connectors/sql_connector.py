import mysql.connector
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

# Retrieve environment variables
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
database = os.getenv("DB_DATABASE")
port = os.getenv("DB_PORT", "3307")  # Default port 3307 if DB_PORT is not specified in .env

# Create MySQL Connector connection
connection = mysql.connector.connect(
    host=host,
    user=username,
    password=password,
    database=database,
    port=port
)
# Create SQLAlchemy engine
engine = create_engine(f'mysql+mysqlconnector://{username}:{password}@{host}:{port}/{database}')
def get_connection():
    return engine.connect()
