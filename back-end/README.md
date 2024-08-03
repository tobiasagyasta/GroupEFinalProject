## Dependencies

- This Python project uses [Flask](https://flask.palletsprojects.com/en/3.0.x/) as the web framework.

- This project uses [python-dotenv](https://pypi.org/project/python-dotenv/) to load in environmental variables for the sql database setup.
- This project uses [Flask-login](https://flask-login.readthedocs.io/en/latest/) for user sessions management.
- This project uses [mysql-connector-python](https://pypi.org/project/mysql-connector-python/) for connecting to the database
- This project uses [SQLAlchemy](https://www.sqlalchemy.org/) for its Object-Relational Mapping purposes.
- This project uses [bcrypt](https://pypi.org/project/bcrypt/) to securely hash passwords and checking hashed passwords.

## How To Start

To start, move to the back end folder :

```
cd back-end
```


#### Local Deployment through Flask

In order to view the API using flask, you can clone the repository and enter these following commands in the root location:

```powershell
python -m venv .venv #create virtual environment named ".venv"

.venv\Scripts\activate # activate virtual environment

pip install -r requirements.txt #install dependencies
```

Then, you can conveniently run the API locally by running :

```powershell
python app.py
```

Once Flask is running, you can use Postman to check the API output and for other implementations as you wish.

You can deactivate the virtual environment by using:

```powershell
deactivate
```
