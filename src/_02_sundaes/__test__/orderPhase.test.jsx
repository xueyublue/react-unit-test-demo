import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("order phases test", () => {
  test("Order phases for happy flow", async () => {
    const user = userEvent.setup();
    // render app
    // No need to wrap in provide, alreadyw wrapped
    render(<App />);

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const chocolateInput = screen.getByRole("spinbutton", { name: /chocolate/i });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    const cherriesCheckbox = await screen.findByRole("checkbox", { name: /cherries/i });
    await user.click(cherriesCheckbox);

    // find and click order summary button
    const orderSummaryButton = screen.getByRole("button", { name: /order sundae/i });
    await user.click(orderSummaryButton);

    // check summary information based on order
    const summaryHeading = screen.getByRole("heading", { name: /order summary/i });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", { name: /scoops: $6.00/i });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole("heading", { name: /toppings: $1.50/i });
    expect(toppingsHeading).toBeInTheDocument();

    expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Cherries")).toBeInTheDocument();

    // accept terms and conditions and click button to confirm order
    const tcCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    await user.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole("button", { name: /confirm oder/i });
    await user.click(confirmOrderButton);

    // confirm order number and confirmation page
    const thankYouHeader = await screen.findByRole("heading", { name: /thank you/i });
    expect(thankYouHeader).toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // click new order button on confirmation page
    const newOrderButton = screen.getByRole("button", { name: /new order/i });
    await user.click(newOrderButton);

    // check that scoops and toppings subtotals have been reset
    const scoopsTotal = await screen.findByText(/scoops total: $0.00/i);
    expect(scoopsTotal).toBeInTheDocument();

    const toppingsTotal = screen.getByText(/toppings total: $0.00/i);
    expect(toppingsTotal).toBeInTheDocument();

    // to we need to await anything to aviod test errors
    await screen.findByRole("spinbutton", { name: /vanilla/i });
    await screen.findByRole("checkbox", { name: /cherries/i });
  });
});
