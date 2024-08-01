from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def welcome():
    return jsonify({"message": "Welcome to our API!"})

if __name__ == "__main__":
    app.run(debug=True)