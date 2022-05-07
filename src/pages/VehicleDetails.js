import React from "react";
import './AdminBooking.css';

function VehicleDetails({ formData, setFormData }) {
  return (
    <div className="vehicle-container">

<input
        type="text"
        placeholder="Vehicle Brand"
        value={formData.brand}
        onChange={(event) =>
          setFormData({ ...formData, brand: event.target.value })
        }
      />
    
      <input
        type="text"
        placeholder="Vehicle Name"
        value={formData.vehicle}
        onChange={(event) =>
          setFormData({ ...formData, vehicle: event.target.value })
        }
      />
    
    
    </div>
  );
}

export default VehicleDetails;
