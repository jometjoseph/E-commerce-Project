import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { removeItem } from "../components/Redux/cartslice";
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import DrawerAppBar from "../components/NavBar";


function Addtocart(){

    const dispatch = useDispatch();
    const result = useSelector(state => state.carts.products); 
    console.log("the result from cart is ",result);
      if(result === []){
        console.log("it's working ")
        
    }
    
    const remove = (index) => {
        dispatch(removeItem(index));
    };
    return(
        <>
        <div class="dashboard-topnav">
           <DrawerAppBar/>
         </div>
         <div class="container d-flex justify-content-center mt-50 mb-50">
           <div class="row">
           {result && result.map((products, index) =>
             <div class="col-md-4 mt-2"key={index}>
               <div class="view-card">
                 <div class="view-card-body">
                   <div class="ratio ratio-4x3">
                   <img
                        src={products.image}
                        class="img-fluid"
                        alt="Laptop"
                      />
                   </div>
                 </div>
   
                 <div class="card-body bg-light text-center">
                   <div class="mb-3">
                     <h6 class="font-weight-semibold mb-2">
                       <p>{products.title}</p>
                     </h6>
   
                     <p>{products.category}</p>
                   </div>
   
                   <h3 class="mb-0 font-weight-semibold">{products.price}</h3>
   
                   <div>
                    {/* {setRating(products.rating.rate)} */}
                     <Rating name="read-only" defaultValue={products.rating[1]} />
                   </div>
   
                   <div class="text-muted mb-4 ">{products.description}</div>
                   <Button  variant="contained" sx={{ bgcolor: 'red' }} onClick={() => { remove(index) }} > DELETE </Button>
                   <br></br><br></br>
                 </div>
               </div>
             </div>
              )}
           </div>
         </div>
        
     
    </>
  


    
    
  )
}
export default Addtocart;