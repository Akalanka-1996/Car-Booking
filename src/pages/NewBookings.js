import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const NewBookings = () => {
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
    
      const cancelHandler = async (id) => {
        try {


          const res = await axios.put(`http://localhost:5000/newbooking/${id}`);
          console.log("Item successfully deleted.");
          alert("Booking Cancelled");
          window.location.reload();
        } catch (error) {
          alert(error);
        }
      }

      const confirmHandler = async (id) => {
        try {

          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          const res = await axios.put(`http://localhost:5000/newbooking/update-confirmed-booking/${id}`);
          console.log("Item successfully updated.");
          alert("Booking Confirmed");
          window.location.reload();
        } catch (error) {
          alert(error);
        }

      }
    
  return (
    <div className="title">
      <style type="text/css">{`.navlink {display:none}`}</style>
      <style type="text/css">{`.navbar {display:none}`}</style>
      <style type="text/css">{`.navbar1 {display:none}`}</style>

      <h1 style={{ textAlign: "center", alignSelf: "center" }}>
        New Bookings
      </h1>

      <Table striped bordered hover id="table-to-xls">
        <thead>
          <tr>
            <th style={{ fontSize: 25 }}>Name</th>
            <th style={{ fontSize: 25 }}>Contact No.</th>
            <th style={{ fontSize: 25 }}>Handover Date</th>
            <th style={{ fontSize: 25 }}>Return Date</th>
            <th style={{ fontSize: 25 }}>Action</th>


          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
              <tr key={booking._id} style={{ fontSize: 15}}>
                  <td>{booking.name}</td>
                  <td>{booking.contact_no}</td>
              
                 
                  <td>{booking.handover_date}</td>
                  
                  <td>{booking.return_date}</td>
                  <td>
                {/* <Button
                  size="sm"
                  variant="primary"
                  //   onClick={() => {
                  //     handleViewShow(SetRowData(item));
                  //   }}
                >
                  View
                </Button> */}
                <Button size="sm" variant="success" onClick={() => confirmHandler(booking._id)}>
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => cancelHandler(booking._id)}
                >
                  Cancel
                </Button>
              </td>

              </tr>

          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NewBookings;