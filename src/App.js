import { Container } from "react-bootstrap";
import "./App.css";
import { OrderDetailsProvider } from "./_02_sundaes/context/OrderDetails";
import OrderEntry from "./_02_sundaes/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
