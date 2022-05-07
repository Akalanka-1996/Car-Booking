import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
    return (
        <h1 style={{ textAlign: "center", alignSelf: "center", marginTop: "10px" }}>
        About Us
        <div>
            <p style={{ fontSize: 25 }}>
            Rent4U is one of the leading telematics providers in Scandinavia, the Baltic countries and Eastern Europe with presence in over 20 countries and 70.000+ vehicles.

Our expertise is in sales, service and R&D. We offer a wide range of standard solutions, but also provide scalable solutions for individual needs. We excel in being a professional and service minded business partner and supplier.

The solutions offered by Rent4U ensure that all daily routines regarding your fleet are automated and provide an easy and clear access to important data and statistics. We provide quality, safety and efficiency in everyday life, and we have lots of experience we would like to share.
            </p>
        </div>
      </h1>
    )
}






export default AboutUs;