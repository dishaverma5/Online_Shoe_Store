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

app = Flask(__name__)

# Load the KNN model
with open('KNNmodel.pkl', 'rb') as file:
    knn_model = pickle.load(file)

# shoe data from JSON file
data = pd.read_json('shoes.json')

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    request_data = request.json
    shoe_id = request_data.get('shoe_id')

    if shoe_id is None:
        return jsonify({"error": "shoe_id is required"}), 400
    shoe_id = int(shoe_id)
    # Ensure shoe_id is within the range of data
    if shoe_id < 0 or shoe_id >= len(data):
        return jsonify({"error": "Invalid shoe_id"}), 400

    # Extract the feature vector of the given shoe_id
    shoe_features = data.iloc[shoe_id].drop('shoe_id').values.reshape(1, -1)
    print(shoe_features)
    # # Find the nearest neighbors (recommendations)
    # distances, indices = knn_model.kneighbors(shoe_features)

    # # Fetch the recommended shoes
    # recommendations = data.iloc[indices[0]].to_dict(orient='records')
    
    # return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5000, debug=True)

