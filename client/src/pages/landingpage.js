import React from "react";
import "../pages/landingpage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import  Button  from '@mui/material/Button';
import { Rating } from "@mui/material";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Landing() {
  const [products, setProducts] = useState(null);
  // const navigate = useNavigate();

  // const navigates = () =>{
  //     navigate('/viewinfo');
  // }

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("product fetching failed");
        console.log(err);
      });
  }, []);
  return (
    <>
      <div class="dashboard-topnav">
        <h1>PRODUCTS</h1>
        <a class="active" href="#login">
          Login
        </a>
      </div>
      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <div class="row">
            {products &&
              products.map((product, index) => {
                return (
                  <div class="col-md-6 col-lg-4 mb-4 mb-lg-0" key={product.id}>
                    <div class="card">
                      <div class="d-flex justify-content-between p-3">
                        <p class="lead mb-0">Today's Offer</p>
                      </div>
                      <div className="ratio ratio-4x3">
                      <img
                        src={product.image}
                        class="img-fluid"
                        alt="Laptop"
                      />
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between">
                          <p class="small">
                            <a href="#!" class="text-muted">
                              {product.category}
                            </a>
                          </p>
                        </div>

                        <div class="d-flex justify-content-between mb-3">
                          <h5 class="mb-0">{product.title}</h5>
                        </div>
                        <Rating name="size-medium" defaultValue={product.rating.rate} />
                      </div>
                      {/* <Button variant="contained" color="secondary" onClick={`/viewinfo/${product.id}`}>View Info</Button> */}
                      {/* <Link href="/viewinfo">viewinfo</Link> */}
                      <Link to={`/viewinfo/${product.id}`}>viewinfo</Link>
                      {/* <a href="/viewinfoo">viewinfo</a> */}
                      <br></br>
                      <Button variant="contained" color="primary">Add to Cart</Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
