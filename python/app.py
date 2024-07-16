from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

df = pd.read_json("shoes.json")

# pick relevant columns of choice
df_selected = df[['shoe_id', 'shoeDetails', 'additionalFeatures']].copy()

# Extract specific values from nested dictionaries
df_selected['brand'] = df_selected['shoeDetails'].apply(lambda x: x['brand'])
df_selected['shoe_type'] = df_selected['shoeDetails'].apply(lambda x: x['shoe_type'])
df_selected['color'] = df_selected['shoeDetails'].apply(lambda x: x['color'])
df_selected['size'] = df_selected['shoeDetails'].apply(lambda x: x['size'])
df_selected['price'] = df_selected['shoeDetails'].apply(lambda x: x['price'])
df_selected['isPopular'] = df_selected['additionalFeatures'].apply(lambda x: x['isPopular'])

# dropping redundant columns
df_selected.drop(['shoeDetails', 'additionalFeatures'], axis=1, inplace=True)

df_encoded = pd.get_dummies(df_selected, columns=['brand', 'shoe_type', 'color', 'isPopular'])

with open('KNNmodel.pkl', 'rb') as file:
    knn = pickle.load(file)

@app.route('/recommendations', methods = ['POST'])
def get_recommentdations():
    request_data = request.json
    shoe_id = request_data.get( "shoe_id")

    selected_product_features = df_encoded.iloc[[int(shoe_id)]]
    
    distances, indices = knn.kneighbors(selected_product_features)
    recommended_product_indices = indices.flatten()
    recommended_products = df_selected.iloc[recommended_product_indices].to_dict(orient = 'records')
    return jsonify(recommended_products)

if __name__ == '__main__':
    app.run(port = 5000, debug=True)