from flask import Flask, request, jsonify
import util
from flask_cors import CORS


# ... your routes remain the same ...

app = Flask(__name__)

CORS(app)  # <-- this allows all cross-origin requests


@app.route('/')
def home():
    return "Life Expectancy Prediction API is running!"


@app.route("/hello")
def hello():
    return "Hi, Life Expectancy API is running"

@app.route("/api/get_countries")
def get_countries():
    response = jsonify({
        'countries': util.get_countries()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route("/api/get_status")
def get_status():
    response = jsonify({
        'status': util.get_status()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route("/api/predict_life_expectancy", methods=['POST'])
def predict_life_expectancy():
    data = request.get_json()
    
    prediction = util.predict_life_expectancy(
        year=int(data['year']),
        adult_mortality=float(data['adult_mortality']),
        infant_deaths=float(data['infant_deaths']),
        alcohol=float(data['alcohol']),
        percentage_expenditure=float(data['percentage_expenditure']),
        measles=float(data['measles']),
        bmi=float(data['bmi']),
        under_five_deaths=float(data['under_five_deaths']),
        polio=float(data['polio']),
        country=data['country'],
        status=data['status']
    )
    
    response = jsonify({
        'predicted_life_expectancy': prediction
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

if __name__ == "__main__":
    print("Starting Python flask server for Life Expectancy Prediction....")
    util.load_saved_artifacts()
    app.run(debug=True)
