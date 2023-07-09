import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCardBody,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from 'yup'
import Sidebar from "../sidebar/sidebar";
import { AppState } from '../provider/provider';

const urlSchemaValidation = yup.object({
  url: yup.string().required("Enter Url"),
})


export function UrlShortener() {
  const { tabledata,setRefresh} = AppState();

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let daycount = 0;
  let monthcount = 0;
  tabledata.map((t, index) => {
    let createdate = t.createdAt;
    let sp = createdate.split('-');
    if (sp[1] == month) {
      monthcount++;
    }
    let day = sp[2].split('T');
    if (day[0] == date) {
      daycount++;
    }
  })

  console.log(daycount);
  console.log(monthcount);

  const [newdata, setNewdata] = useState();
  const shortLink = async ({ newurl }) => {
    console.log(newurl);
    try {
      const response = await fetch("https://task-day-44-url-backend.onrender.com/url", {
        method: "POST",
        body: JSON.stringify(newurl),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();
      console.log(data);
      setNewdata(data);
      setRefresh("1");
     toast("url short");

    } catch (error) {
      console.log(error)
      toast("error")
    }
  }
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      url: ''
    },
    validationSchema: urlSchemaValidation,
    onSubmit: (newurl) => {
      shortLink({ newurl });
      console.log(newurl)
    }

  })
  return (
    <Sidebar>
      <div className="bg-cl back">
        <MDBContainer fluid style={{ height: "100vh" }}>

          <MDBCardBody className='p-5 w-100 d-flex flex-column'>

            <h2 className="fw-bold  text-uppercase">WelCome To UrlShortener Page</h2>
            <p> Past your link</p>
            <div>
              <form onSubmit={handleSubmit} className="text-areas">
                <MDBInput onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.url}
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-black'
                  label='URL'
                  id="fullWidth"
                  type="url"
                  name='url'
                  size="lg" />
                {touched.url && errors.url ? <p style={{ color: "Chartreuse" }}>{errors.url}</p> : ""}
                <MDBBtn
                  outline
                  className='mx-2 px-5'
                  style={{ color: 'black' }}
                  size='lg'
                  type="submit"
                >
                  Create Short url
                </MDBBtn>
              </form>
            </div>
          </MDBCardBody>
          {newdata ? <p style={{ backgroundColor: "green", color: "white" }}>LINK: https://task-day-44-url-backend.onrender.com/url/{newdata.data.shortId}</p> : ""}
          <div className='date-month'>
            <p>Number of Link created a Day: <span>{daycount}</span></p>
            <p>Number of Link created a Month: <span>{monthcount}</span></p>
          </div>

        </MDBContainer>
      </div>

    </Sidebar>
  )
}
