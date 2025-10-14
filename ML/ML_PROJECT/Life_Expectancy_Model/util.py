import numpy as np
import json
import pickle

__data_columns = None
__countries = None
__status = None
__model = None


def predict_life_expectancy(year, adult_mortality, infant_deaths, alcohol,
                            percentage_expenditure, measles, bmi, under_five_deaths,
                            polio, country, status):
    """Predict life expectancy given numeric + categorical inputs."""
    x = np.zeros(len(__data_columns))

    # Assign numeric features
    feature_map = {
        'Year': year,
        'Adult Mortality': adult_mortality,
        'infant deaths': infant_deaths,
        'Alcohol': alcohol,
        'percentage expenditure': percentage_expenditure,
        'Measles': measles,
        'BMI': bmi,
        'under-five deaths': under_five_deaths,
        'Polio': polio
    }

    for key, value in feature_map.items():
        if key in __data_columns:
            x[__data_columns.index(key)] = value

    # One-hot encode country and status
    country_col = f"Country_{country}"
    status_col = f"Status_{status}"

    if country_col in __data_columns:
        x[__data_columns.index(country_col)] = 1
    if status_col in __data_columns:
        x[__data_columns.index(status_col)] = 1

    #  Predict using the trained model
    return float(__model.predict([x])[0])


def get_countries():
    return __countries


def get_status():
    return __status


def load_saved_artifacts():
    """Load model, columns, and categorical lists."""
    global __data_columns
    global __countries
    global __status
    global __model

    print("🔹 Loading artifacts...")

    #  Load exact data columns, countries, and status from training JSON
    with open("country_status.json", "r") as f:
        data = json.load(f)
        __data_columns = data["data_columns"]
        __countries = data.get("countries", [])
        __status = data.get("status", [])

    #  Load the trained model
    with open("life_expectancy_model.pickle", "rb") as f:
        __model = pickle.load(f)

    #  Debug info
    print(f" Artifacts loaded successfully!")
    print(f"Expected features: {len(__data_columns)}")
    print(f"Countries: {len(__countries)} | Status: {len(__status)}")


if __name__ == "__main__":
    load_saved_artifacts()
    print("Countries:", get_countries()[:5])
    print("Status:", get_status())
