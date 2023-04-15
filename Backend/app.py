from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

global_temp = pd.read_csv("./GlobalTemperatures.csv")
global_temp = global_temp[['dt', 'LandAndOceanAverageTemperature']]
global_temp.dropna(inplace=True)
global_temp['dt'] = pd.to_datetime(global_temp.dt).dt.strftime('%d/%m/%Y')
global_temp['dt'] = global_temp['dt'].apply(lambda x: x[6:])
global_temp = global_temp.groupby(
    ['dt'])['LandAndOceanAverageTemperature'].mean().reset_index()

X = global_temp.iloc[:, global_temp.columns !=
                     'LandAndOceanAverageTemperature'].values
y = global_temp.iloc[:, global_temp.columns ==
                     'LandAndOceanAverageTemperature'].values

regressor = LinearRegression()
regressor.fit(X, y)


@app.route('/predict_temperature', methods=['POST'])
def predict_temperature():
    year = request.json['year']
    X_predict = np.array([year]).reshape(1, -1)
    y_predict = regressor.predict(X_predict)
    return jsonify({'predicted_temperature': float(y_predict[0])})


if __name__ == '__main__':
    app.run()
