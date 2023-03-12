import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../pages/viewinfo.css";
import { Rating } from "@mui/material";

function ViewInfo() {
  const { id } = useParams();
  const [products, setProducts] = useState("");

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("product fetching failed");
        console.log(err);
      });
  }, [id]);
  return (
    <>
     <div class="dashboard-topnav">
        <h1>VIEW DETAILS</h1>
      </div>
      <div class="container d-flex justify-content-center mt-50 mb-50">
        <div class="row">
          <div class="col-md-4 mt-2">
            <div class="view-card">
              <div class="view-card-body">
                <div class="card-img-actions">
                  <img
                    src={products.image}
                    class="card-img img-fluid"
                    width="96"
                    height="350"
                    alt=""
                  />
                </div>
              </div>

              <div class="card-body bg-light text-center">
                <div class="mb-2">
                  <h6 class="font-weight-semibold mb-2">
                    <p>{products.title}</p>
                  </h6>

                  <p>{products.category}</p>
                </div>

                <h3 class="mb-0 font-weight-semibold">{products.price}</h3>

                <div>
                  <Rating name="size-medium" defaultValue={products.rating} />
                </div>

                <div class="text-muted mb-3">{products.description}</div>

                <button type="button" class="btn bg-cart">
                  <i class="fa fa-cart-plus mr-2"></i> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewInfo;
