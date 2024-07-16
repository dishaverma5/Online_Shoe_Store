"""from flask import Flask, request, jsonify
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
    app.run(debug=True)"""
from flask import Flask, request, jsonify
import pickle
import pandas as pd
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)

# Load the model
with open('KNNmodel.pkl', 'rb') as f:
    knn_model = pickle.load(f)

# Load your data (ensure this matches your training data structure)
data = pd.read_csv('your_shoe_data.csv') # Update this with the actual path to your shoe data

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    content = request.json
    product_id = content['productId']

    # Find the product in your data
    product_index = data[data['shoe_id'] == product_id].index[0]
    product_features = data.iloc[product_index].values.reshape(1, -1)

    # Get recommendations
    distances, indices = knn_model.kneighbors(product_features, n_neighbors=4)
    recommended_indices = indices.flatten()[1:]  # Exclude the product itself

    recommended_products = data.iloc[recommended_indices].to_dict('records')
    return jsonify(recommended_products)

if __name__ == "__main__":
    app.run(port=5000, debug=True)

   