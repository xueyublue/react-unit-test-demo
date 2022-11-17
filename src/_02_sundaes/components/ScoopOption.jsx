import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../context/OrderDetails";

export default function ScoopOption({ name, imagePath }) {
  const [value, setValue] = useState(0);
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    let newValue = parseInt(e.target.value ? e.target.value : 0);
    if (newValue <= 0) newValue = 0;
    setValue(newValue);
    updateItemCount(name, newValue, "scoops");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: "10px" }}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control type="number" value={value} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
}
