import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const UserBooking = () => {
  const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        const { data } = await axios.get("http://localhost:5000/newbooking/");
        console.log("one")
        console.log(data);
        console.log("two")

    
        setBookings(data);
      };
     

      const deleteHandler = async (id) => {
        try {
          const res = await axios.delete(`http://localhost:5000/newbooking/${id}`);
          console.log("Item successfully deleted.");
          alert("Booking deleted");
          window.location.reload();
        } catch (error) {
          alert(error);
        }
      };
    
  return (
    <div className="title">
      <style type="text/css">{`.navlink {display:none}`}</style>
      <style type="text/css">{`.navbar {display:none}`}</style>
      <style type="text/css">{`.navbar1 {display:none}`}</style>

      <h1 style={{ textAlign: "center", alignSelf: "center" }}>
        My Bookings
      </h1>

      

      {bookings.map((booking) => (
          <Card style={{ width: "18rem" }} key={booking._id}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>{booking.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {booking.contact_no}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {booking.handover_date}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {booking.return_date} LKR
              </Card.Subtitle>
              <Button variant="warning" 
              // onClick={handleShow}
              >
                
                Edit
              </Button>&nbsp; &nbsp;

              <Button variant="danger" 
              onClick={() => deleteHandler(booking._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default UserBooking;
