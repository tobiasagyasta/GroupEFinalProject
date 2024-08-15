# drop_tables.py
import sys
import os

# Get the parent directory of the current script
current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.dirname(current_dir)

# Add the parent directory to PYTHONPATH
sys.path.append(parent_dir)  

from sqlalchemy import MetaData
from connectors.sql_connector import engine  # Adjust import as per your setup


# Reflect and drop existing tables
metadata = MetaData()
metadata.reflect(bind=engine)
metadata.drop_all(bind=engine)
print("All tables dropped successfully.")