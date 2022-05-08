import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const UserBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handover_date, setHandover_date] = useState();
  const [contact_no, setContact_no] = useState();
  const [return_date, setReturn_date] = useState();
  const [RowData, SetRowData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (booking) => {
    setShow(true);
    console.log(RowData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:5000/newbooking/");
    console.log("one");
    console.log(data);
    console.log("two");

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

  const editHandler = async (booking)  => {
    console.log("abc");
    console.log(booking)
    console.log("def");

    try {
      const config = {
        headers:{
            "Content-type":"application/json"
        }
    }

      const res = await axios.put(`http://localhost:5000/newbooking/update-booking/${booking._id}`, {
        name: booking.name, contact_no: booking.contact_no, handover_date: booking.handover_date, return_date: booking.return_date 
      }, config);
      console.log("Item successfully edited");
      alert("Booking edited");
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

      <h1 style={{ textAlign: "center", alignSelf: "center" }}>My Bookings</h1>

   

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
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                handleShow(SetRowData(booking));
              }}
            >
              Edit
            </Button>
            &nbsp; &nbsp;
            <Button variant="danger" onClick={() => deleteHandler(booking._id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}

      {/* Edit Booking Modal  */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={RowData.name}
                onChange={(e) =>
                  SetRowData({ ...RowData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                value={RowData.contact_no}
                onChange={(e) =>
                  SetRowData({ ...RowData, contact_no: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Handover Date</Form.Label>
              <Form.Control
                value={RowData.handover_date}
                onChange={(e) =>
                  SetRowData({ ...RowData, handover_date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                value={RowData.return_date}
                onChange={(e) =>
                  SetRowData({ ...RowData, return_date: e.target.value })
                }
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control 
                        value={return_date}
                        required
                        onChange={(e) => setReturn_date(e.target.value)} 
                        />  */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editHandler(RowData);
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserBooking;
