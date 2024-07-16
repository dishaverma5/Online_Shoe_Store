from flask import Flask, request, jsonify
import pickle
import pandas as pd

# load the trained model and dataset
with open('KNNmodel.pkl', 'rb') as f:
    model = pickle.load(f)

df = pd.read_json("C:\\Capstone_OnlineStore\\python\\shoes.json")

app = Flask(__name__)

# build routes
@app.route('/')
def home():
    return "<h1>KNN model</h1>"

@app.route('/recommend/<int:shoe_id>', methods=['GET'])
def recommend(shoe_id):
    selected_product_features = df[df['shoe_id'] == shoe_id]
    distances, indices = model.kneighbors(selected_product_features)
    recommended_product_indices = indices.flatten()
    recommended_products = df.iloc[recommended_product_indices]
    output = recommended_products.to_dict('records')
    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)