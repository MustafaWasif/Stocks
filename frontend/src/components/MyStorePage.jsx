import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Stocks from "../services/routing";

function MyStorePage() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await Stocks.getAllProducts();
        // console.log(res.data);
        // Compare the current value of patientsList with the new data returned from the API call
        if (JSON.stringify(res.data) !== JSON.stringify(productList)) {
            setProductList(res.data.data);
        }
        // console.log(productList);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <>
      <NavBar />

      <div className="card" style={{ backgroundColor: "#9cbfdd" }}>
        <div className="card-body" style={{ margin: "2rem" }}>
          <div
            className="row text-center justify-content-between"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <div className="col">ID</div>
            <div className="col">Name</div>
            <div className="col">Description</div>
            <div className="col">Colour</div>
            <div className="col">Size</div>
          </div>
          {productList && productList.map((product) => {
            return(
            <div
              key={product.id}
              className="row text-center shadow py-3 mb-4 bg-white rounded"
            >
              <div className="col">{product.id}</div>
              <div className="col">{product.name}</div>
              <div className="col">{product.description}</div>
              <div className="col">{product.colour}</div>
              <div className="col">{product.size}</div>
            </div>
            )
            })}
        </div>
      </div>
    </>
  );
}

export default MyStorePage;