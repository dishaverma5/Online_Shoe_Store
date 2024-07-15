
from flask import Flask, request, jsonify
import pickle
import numpy as np

# load the trained model
with open('KNNmodel.pkl', 'rb') as f:
    model = pickle.load(f)

# create a web app
app = Flask(__name__)

# build routes

@app.route('/')
def home():
    return "<h1>KNN model</h1>"

@app.route('/predict/<int:shoe_id>', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = model.predict([np.array(data['features'])])
    output = {'prediction': int(prediction[0])}
    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)