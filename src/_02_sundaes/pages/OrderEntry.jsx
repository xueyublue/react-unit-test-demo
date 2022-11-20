import React from "react";
import Options from "../components/Options";
import { formatCurrency } from "../utils/index";
import { useOrderDetails } from "../context/OrderDetails";
import { Button } from "react-bootstrap";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  const handleClick = () => {
    console.log(totals);
    if (totals.scoops === 0) {
      alert("Please select at least one Scoops!");
      return;
    }
    setOrderPhase("review");
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button size="lg" onClick={handleClick}>
        Order Sundae!
      </Button>
    </div>
  );
}
