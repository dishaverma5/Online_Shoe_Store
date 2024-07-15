#has flask backend----did pip install Flask Flask-CORS first

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your trained KNN model
model = joblib.load('C:\Capstone_OnlineStore\python\model.ipynb')  #path to trained model file

# Load data from shoes.json
with open('C:\Capstone_OnlineStore\python\shoes.json', 'r') as f:
    shoes_data = json.load(f)

# Example endpoint to test Flask setup
#@app.route('/')
#def hello():
    #return 'Hello! This is your Flask backend.'

# Endpoint to recommend products
@app.route('/recommend', methods=['POST'])
def recommend_products():
    # Receive data from POST request
    data = request.json
    
    # Assuming data contains product attributes (e.g., shoe_id)
    shoe_id = data['shoe_id']
    
    # Find product details from shoes_data based on shoe_id
    product_attributes = {}
    for shoe in shoes_data:
        if shoe['shoe_id'] == shoe_id:
            product_attributes = {
                'brand': shoe['shoeDetails']['brand'],
                'shoe_type': shoe['shoeDetails']['shoe_type'],
                'color': shoe['shoeDetails']['color'],
                'size': shoe['shoeDetails']['size'],
                'price': shoe['shoeDetails']['price'],
                'isPopular': shoe['additionalFeatures']['isPopular'],
                'inStock': shoe['additionalFeatures']['inStock'],
                'onSale': shoe['additionalFeatures']['onSale']
            }
            break
    
    # Process through the model to get recommendations
    recommended_products = model.kneighbors([list(product_attributes.values())])[1][0]  
    
    # Return recommended products as JSON
    return jsonify({'recommended_products': recommended_products}), 200

if __name__ == '__main__':
    app.run(debug=True)