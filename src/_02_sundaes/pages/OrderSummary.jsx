import React from "react";
import { useOrderDetails } from "../context/OrderDetails";
import { formatCurrency } from "../utils/index";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();
  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));
  const toppingsArray = Object.entries(optionCounts.toppings);
  const toppingsList = toppingsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
