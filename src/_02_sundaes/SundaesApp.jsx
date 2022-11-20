import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./context/OrderDetails";
import OrderEntry from "./pages/OrderEntry";
import OrderSummary from "./pages/OrderSummary";
import OrderConfirmation from "./pages/OrderConfirmation";

export default function SundaesApp() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  let Component = OrderEntry;

  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <div>
      <OrderDetailsProvider>
        <Container>
          <Component setOrderPhase={setOrderPhase} />
        </Container>
      </OrderDetailsProvider>
    </div>
  );
}
