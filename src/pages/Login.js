import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./login.css";
import {Form, Button, Row, Col} from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  //   console.log("one")
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  //   console.log("two")
  // };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  //   if (!values.email) {
  //     errors.email = "Email is required!";
  //   } else if (!regex.test(values.email)) {
  //     errors.email = "This is not a valid email format!";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 4) {
  //     errors.password = "Password must be more than 4 characters";
  //   } else if (values.password.length > 10) {
  //     errors.password = "Password cannot exceed more than 10 characters";
  //   }
  //   return errors;
  // };


  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(email, password);

    try {
        // To make api requests, we need to provide json data
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }

        setLoading(true)

        // make request

        const {data} = await axios.post('http://localhost:5000/users/login', {
            email, password,
        }, 
        config)

        // store data in local storage
        console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/carlist')

        setLoading(false)

    } catch (error) {
      alert("Invalid Email or Password")
        setError(error.response.data.message)
    }
}

  return (
    <div>
      <body className="zt">
        <br />
        <div className="loginContainer" style={{  alignItems:'center'}}>
                {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
                <Form onSubmit={submitHandler} style={{ width: "420px"}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} /> 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label><br></br>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: "420px"}} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New User? <Link to="/signup">Register Here</Link>
                    </Col>
                </Row>
            </div>
      </body>
    </div>
  );
}

export default Login;
