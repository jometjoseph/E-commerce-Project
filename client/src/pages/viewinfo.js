import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../pages/viewinfo.css";
import { Rating } from "@mui/material";
import { getToken } from "../utils/tokenHelper";
import DrawerAppBar from "../components/NavBar";

function ViewInfo() {
  const { id } = useParams();
  const [products, setProducts] = useState("");
  const token = getToken();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.rating.rate)
        setProducts(res.data);
        setRating(res.data.rating.rate);
      })
      .catch((err) => {
        console.log("product fetching failed");
        console.log(err);
      });
  }, [id]);

  function backToHome(){
    navigate('/');
  }


  return (
    <>
    <div class="dashboard-topnav">
     <div class="active bg-light" href="#login">
          <DrawerAppBar />
       </div>
      </div>

      <div class="container mt-5 pt-4 bg-light">
    <div class="row d-flex justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="row">
                    <div class="col-md-6">
                        <div class="images p-3">
                            <div class="text-center p-4"> <img id="main-image" src={products.image} width="270" height="400" alt=''/> </div>
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="product p-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center"> <i class="fa fa-long-arrow-left"></i> <span class="ml-1">Back</span> </div> <i class="fa fa-shopping-cart text-muted"></i>
                            </div>
                            <div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">{products.category}</span>
                                <h5 class="text-uppercase">{products.title}</h5>
                                <div class="price d-flex flex-row align-items-center"> 
                                <h5 className="mb-1 me-1">
                                  $
                                  {token && <>
                                  {products.price}
                                  </>}
                                  {!token && <>
                                    XXXX.XX
                                  </>}
                                  </h5>
                                {/* </span> */}
                                    
                                </div>
                            </div>
                            <p class="about">{products.description}</p>
                            <div class="sizes mt-5">
                            <Rating name="read-only" value={rating} readOnly />
                            </div>
                            <div class="cart mt-4 align-items-center">
                              {token && <>
                                <button class="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button> <i class="fa fa-heart text-muted"></i> <i class="fa fa-share-alt text-muted"></i> 
                              </>}
                              <button class="btn btn-secondary text-uppercase mr-2 px-4" onClick={backToHome}>Back to home</button>

                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

















      {/* <div class="container d-flex justify-content-center mt-5 pt-4 bg-light">
        <div class="row">
          <div class="col-md-4 mt-4">
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

                <h3 class="mb-0 font-weight-semibold">{token && <>
                  {products.price}
                </>}
                {!token && <>
                XXXX.XX
                </>}
                </h3>

                <div>
                  <Rating name="size-medium" defaultValue={products.rating} />
                </div>

                <div class="text-muted mb-3">{products.description}</div>
                {token && <>
                  <button type="button" class="btn bg-cart">
                  <i class="fa fa-cart-plus mr-2"></i> Add to cart
                </button>
                </>}
                
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ViewInfo;
