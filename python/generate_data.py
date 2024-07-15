
import json
import random

# Generate 1,000 JSON documents for shoes
documents = []
for i in range(1000):
    shoe_id = i
    brand = random.choice(["Nike", "Adidas", "Puma", "Reebok", "Steve Madden", "Crocs", "Converse", "Toms", "Vans", "Birkenstock", "UGG"])
    shoe_type = random.choice(["athletic", "casual", "formal", "sandals", "boots"])
    color = random.choice(["red", "blue", "pink", "beige", "purple", "green", "black", "white", "gray"])
    size = random.randint(5, 13)
    price = round(random.uniform(30, 300), 2)

    document = {
        "shoe_id": shoe_id,
        "shoeDetails": {
            "brand": brand,
            "shoe_type": shoe_type,
            "color": color,
            "size": size,
            "price": price
        },
        "additionalFeatures": {
            "isPopular": bool(random.getrandbits(1)),
            "inStock": bool(random.getrandbits(1)),
            "onSale": bool(random.getrandbits(1))
        }
    }

   
    documents.append(document)

json_data = json.dumps(documents, indent=4)

# save to shoes.json
with open('shoes.json', 'w') as f:
    f.write(json_data)

print("1,000 JSON documents saved to shoes.json")


