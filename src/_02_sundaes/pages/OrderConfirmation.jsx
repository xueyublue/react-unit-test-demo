import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "./../context/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  if (orderNumber) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ color: "lightgray" }}>
          <small>as per our terms and conditions, nothing will happen now</small>
        </p>
        <Button size="lg" onClick={handleClick}>
          Create new order
        </Button>
      </div>
    );
  }

  return <div>Loading</div>;
}
