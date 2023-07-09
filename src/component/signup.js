import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBInput
} from 'mdb-react-ui-kit';

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as yup from 'yup'



const userSchemaValidation = yup.object({
  first_name: yup.string().required("Please fill in your first name"),
  last_name: yup.string().required("Please fill in your last name"),
  email: yup.string().required("Please fill in your Email"),
  password: yup.string().required("please write proper password"),
 
})

export function Signup() {
  const history =useHistory()
  const sign = async ({ newuser }) => {
    console.log(newuser);
    try {
      const response = await fetch("https://task-day-44-url-backend.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();
        history.push("/login")
        toast("Email verfication link send to your email");
      
    } catch (error) {
      console.log(error)
      toast("error")
    }
  }
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      first_name:'',
      last_name:'',
      email: '',
      password: '',
    },
    validationSchema: userSchemaValidation,
    onSubmit: (newuser) => {
      sign({ newuser });
      console.log(newuser)
    }

  })

  return (
    <div className="bg-cl back">
   

    <h1>Signup</h1>

<MDBContainer fluid style={{height:"100vh" }} className="p-3 my-5 d-flex flex-column w-50">
<form onSubmit={handleSubmit} className="text-areas">
  <MDBInput wrapperClass='mb-4'
    label='First Name'
    onChange={handleChange}
    onBlur={handleBlur}
    value={values.first_name}
    id='form1' type='first_name'  name='first_name'/>
   {touched.first_name && errors.first_name ? <p style={{ color: "crimson" }}>{errors.first_name}</p> : ""}
   <MDBInput wrapperClass='mb-4'
    label='Last Name'
    onChange={handleChange}
    onBlur={handleBlur}
    value={values.last_name}
    id='form1' type='last_name'  name='last_name'/>
   {touched.last_name && errors.last_name ? <p style={{ color: "crimson" }}>{errors.last_name}</p> : ""}

  <MDBInput wrapperClass='mb-4'
    label='Email address'
    onBlur={handleBlur}
    value={values.email}
    onChange={handleChange}
    id='form1' type='email'  name="email"/>
  {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}



  <MDBInput wrapperClass='mb-4'
    label='Password'
    onBlur={handleBlur}
    onChange={handleChange}
    value={values.password}
    id='form2' type='password'   name='password' />
  {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
<p>* Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character </p>



  <MDBBtn className="mb-4" style={{ color: '#fff' }} type="submit">Signup</MDBBtn>
  </form>

  <div className="text-center">
    <p className="mb-0">Already have an account? <a href="/login" class="text-black-50 fw-bold">Login</a></p>

  </div>

</MDBContainer>

    </div>
  );
}
