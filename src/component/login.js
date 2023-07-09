import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as yup from 'yup'
import { AppState } from '../provider/provider';


const userSchemaValidation = yup.object({
  email: yup.string().required("Please fill in your Email"),
  password: yup.string().required("please write proper password"),
 
})


export function Login() {
  const history =useHistory()
  const{setRefresh}=AppState();
  const log = async ({ loginuser }) => {
    try {
      const response = await fetch("https://task-day-44-url-backend.onrender.com/login", {
        method: "POST",
        body: JSON.stringify(loginuser),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();
      if(data.token){
      console.log(data);
      sessionStorage.setItem('token',data.token)
        history.push("/url/short")
        toast.success("User login successful")
        setRefresh("hi");
      }else{
        toast.error("invalide userId, password")
      }
    } catch (error) {
      console.log(error)
      toast("error")
    }
  }
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchemaValidation,
    onSubmit: (loginuser) => {
      log({ loginuser });
    }

  })


  return (
    <div className="bg-cl back">

    <h1>Login</h1>
    <MDBContainer fluid style={{height:"100vh"}} className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit} className="text-areas">
        <MDBInput wrapperClass='mb-4'
          label='Email address'
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          id='form1' type='email' name='email' />
        {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}



        <MDBInput wrapperClass='mb-4'
          label='Password'
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          id='form2' type='password' name='password' />
        {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}


        <div className="d-flex justify-content-between mx-3 mb-4">
        
          <p className="mb-0"><a style={{ color: 'white' }} href="/forgotpassword">Forgot password?</a></p>
        </div>

        <MDBBtn className="mb-4" type="submit">Login</MDBBtn>

      </form>

      <div className="text-center">
        <p className="mb-0">Don't have an account? <a href="/signup" class="text-black-50 fw-bold">Sign Up</a></p>

      </div>

    </MDBContainer>

  </div>



  );
}



