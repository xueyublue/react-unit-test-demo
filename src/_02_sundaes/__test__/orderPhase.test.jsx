import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("order phases test", () => {
  test("happy flow", () => {
    render(<App />);

    // add ice cream scoops and toppings

    // find and click order button

    // check summary information based on order

    // accept terms and conditions and click button to confirm order

    // confirm order number and confirmation page

    // click new order button on confirmation page

    // check that scoops and toppings subtotals have been reset

    // to we need to await anything to aviod test errors
  });
});
