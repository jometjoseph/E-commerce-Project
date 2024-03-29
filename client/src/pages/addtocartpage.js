import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../components/Redux/cartslice";
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import DrawerAppBar from "../components/NavBar";
import "../pages/addtocartpage.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addtocart() {
  const dispatch = useDispatch();
  const result = useSelector(state => state.carts.products);
  console.log("the result from cart is ", result);
  if (result === []) {
    console.log("it's working ")
  }
  const totalAmount = result.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
  const shippingFee = Math.floor(totalAmount * 0.25);
  const totalPrice = totalAmount + shippingFee;
  const remove = (index) => {
    dispatch(removeItem(index));
  };
  const success = () => {
    toast('Order successfully submitted!',
      { position: toast.POSITION.TOP_CENTER });
  }
  return (
    <>
      <div class="dashboard-topnav">
        <DrawerAppBar />
      </div>
      <section class="h-100 h-custom" style={{ backgroundcolor: '#d2c9ff' }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
              <div class="card card-registration card-registration-2" style={{ borderradius: '15px' }}>
                <div class="card-body p-0">
                  <div class="row g-0">
                    <div class="col-lg-8">
                      <div class="p-5">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                          <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 class="mb-0 text-muted">Selected Items </h6>
                        </div>
                        <hr class="my-4" />
                        {result && result.map((products, index) =>
                          <div class="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                            <div class="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={products.image} class="img-fluid rounded-3" alt="Cotton T-shirt" />
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                              <h6 class="text-muted">{products.category}</h6>
                              <h5 class="text-black mb-0">{products.title}</h5>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button class="btn btn-link px-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                <i class="fas fa-minus"></i>
                              </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 class="mb-0">€ {products.price}</h6>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                              <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={() => { remove(index) }} > DELETE </Button>
                            </div>
                            <hr class="my-4" />
                          </div>
                        )}
                        <div class="pt-5">
                          <h6 class="mb-0"><Link to={'/'}>Back to shop</Link></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 bg-grey">
                      <div class="p-5">
                        <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr class="my-4" />
                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase">Total Amount :</h5>
                          <h5>€ {totalAmount}</h5>
                        </div>
                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase ">Shipping Fee :</h5>
                          <h5>€ {shippingFee}</h5>
                        </div>
                        <hr class="my-4" />
                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase">Total price :</h5>
                          <h5>€ {totalPrice}</h5>
                        </div>
                        <div class="d-flex justify-content-center mb-5" >
                          <Button variant="contained" sx={{ bgcolor: 'green' }} onClick={success}> BUY NOW </Button><ToastContainer />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Addtocart;