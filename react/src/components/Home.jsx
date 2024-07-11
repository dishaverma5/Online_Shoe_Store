import Shoe from "./Shoe";

const Home = (props) => {
  return (
    <div
      className="card-container"
      style={{ display: "flex", flexWrap: "wrap", gap: "20px"  }
    
    }
    >
      {props.data.map((shoe) => (
        <Shoe key={shoe._id} data={shoe} handleDelete={props.handleDelete} />
      ))}
    </div>
  );
};



export default Home;
