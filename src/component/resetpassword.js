import React from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBInput,
}
    from 'mdb-react-ui-kit';
    import { useFormik } from "formik";
    import { toast } from "react-toastify";
    import { useHistory, useParams } from "react-router-dom";
    import * as yup from 'yup'
    
    
    const userSchemaValidation = yup.object({
        password: yup.string().required("Please fill in your password"),
    })

export function Reset() {
    const history = useHistory();
    let {id,token}=useParams();
    const restdata = async ({ newpassword }) => {
        try {
            const response = await fetch(`https://task-day-44-url-backend.onrender.com/resetpassword/${id}/${token}`, {
                method: "POST",
                body: JSON.stringify(newpassword),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        
            const data = await response.json();
            sessionStorage.setItem('token',token)
            history.push("/login")
            toast("password changed")

        } catch (error) {
            console.log(error)
            toast("error")
        }
    }
    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: userSchemaValidation,
        onSubmit: (newpassword) => {
            restdata({ newpassword });
        }

    })
    return (
        <div className="bg-cl back">
            <h1>Reset Passwors</h1>
            <p>enter your new password</p>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <form onSubmit={handleSubmit} className="text-areas">
                    <MDBInput wrapperClass='mb-4'
                       label='New Password'
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        id='form1' type='password' name='password' />
                   {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
                   <p>* Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character </p>



                    <MDBBtn className="mb-4" type='submit'> Reset Password </MDBBtn>
                  

                </form>

            
            </MDBContainer>
        </div>
    );
}
