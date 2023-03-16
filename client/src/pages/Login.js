import React from 'react'
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, setToken } from '../utils/tokenHelper';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(5, '* username not valid')
    .required('* username is required'),
  password: yup
    .string()
    .min(5, '* Password not valid')
    .required('* Password is required')
});
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (event) => {
    try {

      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password
      })
        .then((res) => {
          console.log(res.data.token);
          setToken(res.data.token);
          const token = getToken();
          console.log("token stored is ", token);
          toast.success('login success', {
            position: toast.POSITION.TOP_CENTER
          });
          if (token) {
            navigate('/');
          }
        })
    } catch (error) {
      console.log('Login Failed!')
      toast.error('login failed', {
        position: toast.POSITION.TOP_CENTER
      });
      console.log(error);
    }
  };
  return (
    <section class="vh-100" style={{ backgroundcolor: '#9A616D' }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style={{ borderradius: '1rem' }}>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                    alt="login form" class="img-fluid" style={{ borderradius: '1rem 0 0 1rem' }} />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h4 class="fw-normal mb-3 pb-3" style={{ letterspacing: '2px' }}>Sign into your account</h4>
                      <div class="form-outline mb-4">
                        <TextField id="outlined-basic-user" label="User Name" variant="outlined" fullWidth="10vw" {...register("username", { required: true, maxLength: 50 })} onChange={(event) => setUsername(event.target.value)} />
                        <div id='username' className='form-text text-danger'>{errors.username?.message}</div>
                      </div>
                      <div class="form-outline mb-4">
                        <TextField type="password" id="outlined-basic-pssd" label="password " variant="outlined" fullWidth="10vw" {...register("password", { required: true, maxLength: 50 })} onChange={(event) => setPassword(event.target.value)} />
                        <div id='emailHelp' className='form-text text-danger'>{errors.password?.message}</div>
                      </div>
                      <div class="pt-1 mb-4">
                        <Button type='submit' variant="contained" >Login</Button>
                      </div><ToastContainer />
                      <a href="#!" class="small text-muted">Terms of use.</a>
                      <a href="#!" class="small text-muted">Privacy policy</a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login




