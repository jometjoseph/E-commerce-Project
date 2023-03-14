import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, FormControl } from '@mui/material';
import axios from 'axios';

export default function SearchBox() {
  const [product,setProducts] = React.useState([]);
  React.useEffect( () => {
       axios.get("https://fakestoreapi.com/products")
       .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("product fetching failed");
        console.log(err);
      });
  },[]);
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        color='primary'
        freeSolo
        options={product.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} placeholder={'search here'} 
        // InputProps={{
        //     startAdornment: (
        //       <InputAdornment position="end">
        //         <Button size='small' variant='text'>
        //         <SearchIcon />
        //         </Button>
        //       </InputAdornment>
        //     ),
        //   }} 
        />
    }
      ></Autocomplete>
    </Stack>
  );
}
