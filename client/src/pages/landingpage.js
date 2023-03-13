import React from "react";
import "../pages/landingpage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import  Button  from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import { Rating } from "@mui/material";
import Link from "@mui/material/Link";
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
                  <div class="col-md-6 col-lg-3 mb-4 mb-lg-0" key={product.id}>
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
                          <h5 class="text-truncate mb-4 mb-md-0">{product.title}</h5>
                        </div>
                        <Rating name="size-medium" defaultValue={product.rating.rate} />
                      </div>
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button variant="outlined" color="secondary"><Link href={`/viewinfo/${product.id}`}>viewdetails</Link></Button>
                      <Button variant="contained" color="primary">Add to Cart</Button>
                      </ButtonGroup>
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
