import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const CarManagement = () => {
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleViewShow = () => {
    SetViewShow(true);
  };
  const handleViewClose = () => {
    SetViewShow(false);
  };
  const [Data, setData] = useState([]);
  const [title, setTitle] = useState();
  const [email, setEmail] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const [fuel, setFuel] = useState();
  const [model, setModel] = useState();
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const GetCarData = () => {
    //get car data
    const url = "http://localhost:5000/Carmanagement";
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setData(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //call this function use in uneffect

  useEffect(() => {
    GetCarData();
  }, []);

  const handleBooking = () => {
    navigate("/car-bookings");
  };

  const carHandler = async (e) => {
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

        const {data} = await axios.post('http://localhost:5000/CarManagement', {
            title, email, brand, price, fuel, model
        }, 
        config)

        window.location.reload()

        // store data in local storage
        console.log(data);
        // localStorage.setItem('userInfo', JSON.stringify(data))
        // navigate('/car-management')

        setLoading(false)

    } catch (error) {
        setError(error.response.data.message)
    }

  }

  const deleteHandler = async (id) => {
    // console.log("delete")
    // console.log(id)
    // const url = `http://localhost:5000/CarManagement/${car.id}`

    try {
      const res = await axios.delete(`http://localhost:5000/CarManagement/${id}`)
      console.log('Item successfully deleted.')
      alert("Car deleted")
      GetCarData()
    } catch (error) {
      alert(error)
    }

  }

  return (
    <div className="title">
      <style type="text/css">{`.navlink {display:none}`}</style>
      <style type="text/css">{`.navbar {display:none}`}</style>
      <style type="text/css">{`.navbar1 {display:none}`}</style>

      <div className="row">
        <div className="mt-5 mb-4">
          <Button variant="primary" onClick={handleShow}>
            <i className="fa fa-plu"></i>
            Add New Car
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="car_list"
                    sheet="tablexls"
                    buttonText="Export Data"/>
          <table className="table table-striped table-hover table-bordered" id="table-to-xls">
            <thead>
              <tr>
                <th style={{ fontSize: 20 }}>Vehicle Title</th>
                <th style={{ fontSize: 20 }}>Email</th>
                <th style={{ fontSize: 20 }}>Brand</th>
                <th style={{ fontSize: 20 }}>Price per Day</th>
                <th style={{ fontSize: 20 }}>Fuel Type</th>
                <th style={{ fontSize: 20 }}>Model Year</th>
                <th style={{ fontSize: 20 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item) => (
                <tr key={item._id}>
                  <td style={{ fontSize: 15 }}>{item.title}</td>
                  <td style={{ fontSize: 15 }}>{item.email}</td>
                  <td style={{ fontSize: 15 }}>{item.brand}</td>
                  <td style={{ fontSize: 15 }}>{item.price}</td>
                  <td style={{ fontSize: 15 }}>{item.fuel}</td>
                  <td style={{ fontSize: 15 }}>{item.model}</td>
                  <td style={{ minWidth: 150 }}>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        handleViewShow(SetRowData(item));
                      }}
                    >
                      View
                    </Button>
                    <Button size="sm" variant="warning">
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => deleteHandler(item._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="model-box-view">
        {/* Car View Modal */}
        <Modal
          show={ViewShow}
          onHide={handleViewClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View Car Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.title}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  value={RowData.email}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.brand}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.price}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.fuel}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.model}
                  readOnly
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleBooking}>
              Book Now
            </Button>
            <Button variant="secondary" onClick={handleViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End Car View Modal  */}

        {/* Car Add Modal  */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
             
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type="name" 
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
                
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Brand</Form.Label>
                <Form.Control 
                type="name" 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                />
               
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control 
                type="name"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
               
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label>Fuel</Form.Label>
                <Form.Control 
                type="name"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                />
                
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput6"
              >
                <Form.Label>Model</Form.Label>
                <Form.Control 
                type="name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                />
               
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={carHandler}  >
              Add Car
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CarManagement;
