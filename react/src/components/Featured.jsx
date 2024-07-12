import Promotion from "./Promotion";

const Featured = (props) => {
  return (
    <>
      <div>
        <br />
        <b>Step Up Shoes: Where Style Meets Durability</b>
        <br />
        Explore our curated selection of stylish, durable footwear for every
        occasion. From casual comfort to chic elegance and sporty durability,
        find your perfect pair today and step into timeless style and unmatched
        quality.
      </div>

      <h5 style={{ color: "#006400", align: "center" }}>
        <br />
         FEATURED ITEMS 
      </h5>
      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {props.data.map((promo) => (
          <Promotion key={promo.id} data={promo} />
        ))}
      </div>
    </>
  );
};

export default Featured;
