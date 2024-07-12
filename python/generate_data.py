import csv
import random
from datetime import datetime, timedelta
import json

# Generate data for 50 characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "shoe_sales.csv"

# Load shoe data from JSON file
with open("shoe_models.json") as json_file:
    shoe_models = json.load(json_file)

# Generate data rows
data_rows = []
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    timestamp = datetime.now() - timedelta(seconds=i)
    shoe_id = i
    brand = random.choice(["Nike", "Adidas", "Puma", "Reebok", "Steve Madden", "Crocs", "Converse", "Toms"])  # Example shoe brands
    shoe_type = random.choice(["athletic", "casual", "formal", "sandals", "boots"])  # Types of shoes
    color = random.choice(["red", "blue", "pink", "purple", "green", "black", "white", "gray"])  # Example colors
    size = random.randint(5, 13)  # Shoe size
    price = round(random.uniform(50, 300), 2)  # Example price range

    # Select a random home world from the available options
    #home_world = random.choice(home_worlds)
   # home_world_name = home_world["name"]

    # Create the data row
    data_row = [
        timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        shoe_id,
        brand,
        shoe_type,
        color,
        size,
        price
    ]
    # Add the data row to the list
    data_rows.append(data_row)

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["timestamp", "shoe_id", "brand", "shoe_type", "color", "size", "price"]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
