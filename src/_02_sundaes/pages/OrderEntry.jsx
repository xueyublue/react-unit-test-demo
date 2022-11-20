import React from "react";
import Options from "../components/Options";
import { formatCurrency } from "../utils/index";
import { useOrderDetails } from "../context/OrderDetails";
import { Button } from "react-bootstrap";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
}
