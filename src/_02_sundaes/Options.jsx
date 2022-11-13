import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "./AlertBanner";
import { pricePerItem } from "./constants/index";
import { formatCurrency } from "./utils/index";
import { useOrderDetails } from "./context/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType is scoops or toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return (
    <>
      <h2>{title}</h2>
      <p>${formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
