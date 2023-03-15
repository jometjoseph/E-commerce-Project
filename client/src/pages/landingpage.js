import React from "react";
import "../pages/landingpage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ButtonGroup, FormControl, InputLabel, MenuItem, Rating, Select } from "@mui/material";
//import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import DrawerAppBar from "../components/NavBar";
import { getToken } from "../utils/tokenHelper";
import SearchBox from "../components/SearchBox";
import { Container } from "@mui/system";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt, faFemale, faLaptop, faGem, faMagnifyingGlass, faStore } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { updateCart,cartProduct } from "../components/Redux/cartslice";
import  Button  from '@mui/material/Button';
// import { Rating } from "@mui/material";
// import { useNavigate } from "react-router-dom";

function Landing() {
  const [products, setProducts] = useState([]);
  const token = getToken();
  const [category, setCategory] = React.useState(["electronics", "jewelery", "men's clothing", "women's clothing"]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const state = useSelector(state => state.carts);

  // const handleChange = (event) => {
  //   // setCategory(event.target.value);
  // };
  // const navigate = useNavigate();

  // const navigates = () =>{
  //     navigate('/viewinfo');
  // }

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("product fetching failed");
        console.log(err);
      });
    // axios.get("https://fakestoreapi.com/products/categories")
    // .then((res) => {
    //   console.log(res.data);
    //   setCategory(res.data);
    // })
    // .catch((err) => {
    //   console.log("category fetching failed");
    //   console.log(err);
    // });
  }, []);

  async function categorySelector(item) {
    try {
      await axios.get(`https://fakestoreapi.com/products/category/${item}`)
        .then((res) => {
          console.log("result of category", res.data);
          setProducts(res.data);
        })

    }
    catch (err) {
      console.log("error is ", err);
    }

  }
  async function AllProductsSelector() {
    try {
      await axios.get(`https://fakestoreapi.com/products`)
        .then((res) => {
          console.log("result of category", res.data);
          setProducts(res.data);
        })

    }
    catch (err) {
      console.log("error is ", err);
    }

  }
  const searchOutput = (searchKey) => {
    console.log("searchkey is ", searchKey)
    setSearchInput(searchKey);
    // setOriginalData(products);
    if (searchInput !== '') {
      const filteredData = products.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData);
      console.log("filtered items are ",filteredData);
      // setProducts(filteredData);
    }
    else {
      console.log("in else case ")
      setFilteredResults(products);
      // setProducts(originalData);
    }
  }

  const incrementCount = (item) =>{
    setCount(count + 1);
    dispatch(updateCart(count));
    dispatch(cartProduct(item))
  };

  return (
    <>
      {/* <div class="dashboard-topnav"> */}
      <div class="active bg-light" href="#login">
        <DrawerAppBar />
        {token && <>


          <Container fluid className="mt-5 pt-4 pb-2 bg-light text-center">


            <div class="input-group">
              <div class="form-outline">
                <input type="search" id="form1" class="form-control" placeholder="Search" onChange={(e) => { searchOutput(e.target.value) }} />
                <label class="form-label" for="form1"></label>
              </div>
              {/* <button type="button" class="btn btn-primary">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button> */}
            </div>


            <div className="row justify-content-center">
              <div className="col-sm-2">
                <div className="card">
                  <button className="btn btn-outline-success category-button" onClick={() => { AllProductsSelector() }}>
                    <div className="card-body">
                      <h5 className="card-title text-dark"><FontAwesomeIcon icon={faStore} /><br></br> All</h5>
                    </div>
                  </button>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="card">
                  <button className="btn btn-outline-warning category-button" onClick={() => { categorySelector(category[0]) }}>
                    <div className="card-body">
                      <h5 className="card-title text-dark"><FontAwesomeIcon icon={faLaptop} />Electronics</h5>
                    </div>
                  </button>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="card">
                  <button className="btn btn-outline-warning category-button" onClick={() => { categorySelector(category[1]) }}>
                    <div className="card-body">
                      <h5 className="card-title text-dark"><FontAwesomeIcon icon={faGem} /> <br></br>Jewelery</h5>
                    </div>
                  </button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <button className="btn btn-outline-warning category-button" onClick={() => { categorySelector(category[2]) }}>
                    <div className="card-body">
                      <h5 className="card-title text-dark"><FontAwesomeIcon icon={faTshirt} /><br /> Men's Clothing</h5>
                    </div>
                  </button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <button className="btn btn-outline-warning category-button" onClick={() => { categorySelector(category[3]) }}>
                    <div className="card-body">
                      <h5 className="card-title text-dark"><FontAwesomeIcon icon={faFemale} /><br /> Women's Clothing</h5>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Container>
          {/* <nav class="navbar navbar-expand-md navbar-dark bg-secondary fixed-top" style={{ 'margin-top': '60px' }}>
  <div class="container-fluid">
    
  



    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto"> 
        <li class="nav-item">
          {/* <a class="nav-link active" aria-current="page" href={'/'}>Home</a> */}
          {/* <SearchBox/>
        </li>
      </ul>
    </div>
  </div>
</nav> */}



        </>}


      </div>
      {/* </div> */}
      <div>
        <ToastContainer />

        <section className="" style={{ backgroundColor: "#eee", }}>    {/*  'margin-top': '85px'  */}
          <div class="container py-5">
            <div class="row">


            {searchInput.length > 1 ? (
                filteredResults.map((product, index) => {
                  return (
                    <div class="col-md-6 col-lg-4 mb-4" key={product.id}>
                      <div class="card">
                        <div class="d-flex justify-content-between p-3">
                          <p class="lead mb-0">Today's Offer</p>
                        </div>
                        <div className="ratio ratio-4x3">
                          <img
                            src={product.image}
                            class="card-img-top"
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
                          <div class="d-flex justify-content-between mb-2">
                            <p class="text-muted mb-0">Available: <span class="fw-bold">{product.rating.count}</span></p>
                            <div class="ms-auto text-warning">
                              <Rating name="read-only" defaultValue={product.rating.rate} />
                            </div>
                          </div>
                          {/* </div> */}
                          {/* <Button variant="contained" color="secondary" onClick={`/viewinfo/${product.id}`}>View Info</Button> */}
                          {/* <Link href="/viewinfo">viewinfo</Link> */}
                          <div className="text-center">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                              <Button variant="outlined" color="primary"><Link to={`/viewinfo/${product.id}`}>View Info</Link></Button>

                              {/* <a href="/viewinfoo">viewinfo</a> */}
                              {/* <br></br> */}
                              {token && <>
                                <Button variant="contained" color="primary" onClick={() => { incrementCount(product) }}>Add to Cart</Button>
                              </>}
                            </ButtonGroup>
                          </div>
                        </div>

     {/* <section style={{ backgroundColor: "#eee" }}>
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
                      /> */}
                      
                      
                      </div>
                    </div>
                  );
                })) : ( products.map((product, index) => {
                  return (
                    <div class="col-md-6 col-lg-4 mb-4" key={product.id}>
                      <div class="card">
                        <div class="d-flex justify-content-between p-3">
                          <p class="lead mb-0">Today's Offer</p>
                        </div>
                        <div className="ratio ratio-4x3">
                          <img
                            src={product.image}
                            class="card-img-top"
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
                          <div class="d-flex justify-content-between mb-2">
                            <p class="text-muted mb-0">Available: <span class="fw-bold">{product.rating.count}</span></p>
                            <div class="ms-auto text-warning">
                              <Rating name="read-only" defaultValue={product.rating.rate} />
                            </div>
                          </div>
                          {/* </div> */}
                          {/* <Button variant="contained" color="secondary" onClick={`/viewinfo/${product.id}`}>View Info</Button> */}
                          {/* <Link href="/viewinfo">viewinfo</Link> */}
                          <div className="text-center">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                              <Button variant="outlined" color="primary"><Link to={`/viewinfo/${product.id}`}>View Info</Link></Button>

                              {/* <a href="/viewinfoo">viewinfo</a> */}
                              {/* <br></br> */}
                              {token && <>
                                <Button variant="contained" color="primary" onClick={() => { incrementCount(product) }}>Add to Cart</Button>
                              </>}
                            </ButtonGroup>
                          </div>
                          
                        {/* <div class="d-flex justify-content-between mb-3">
                          <h5 class="text-truncate mb-4 mb-md-0">{product.title}</h5> */}
                        </div>
                      </div>

                      {/*     <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button variant="outlined" color="secondary"><Link href={`/viewinfo/${product.id}`}>viewdetails</Link></Button>
                      <Button variant="contained" color="primary">Add to Cart</Button>
                      </ButtonGroup>   */}

                    </div>
                  );
                }) )}

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Landing;
