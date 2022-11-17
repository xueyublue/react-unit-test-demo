import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../context/OrderDetails";
import Options from "../Options";
import OrderEntry from "./../pages/OrderEntry";

describe("test", () => {
  test("update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // initial is 0
    const scoopsSubTotal = screen.getByText("scoops total: $", { exact: false });
    expect(scoopsSubTotal).toHaveTextContent("0.00");

    // 1 scoope of vanilla
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubTotal).toHaveTextContent("2.00");

    // add 2 scoops of chocolate
    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopsSubTotal).toHaveTextContent("6.00");
  });

  test("update toppings subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

    const toppingsTotal = screen.getByText("toppings total: $", { exact: false });
    expect(toppingsTotal).toHaveTextContent("0.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", { name: /cherries/i });
    await user.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.50");

    const hotFudgeCheckbox = screen.getByRole("checkbox", { name: /hot fudge/i });
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("3.00");

    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.50");
  });
});

describe("grant total tests", () => {
  test("grant total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanallaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
    await user.clear(vanallaInput);
    await user.type(vanallaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", { name: /cherries/i });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grant total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const cherriesCheckbox = await screen.findByRole("checkbox", { name: /cherries/i });
    await user.click(cherriesCheckbox);
    const grandTotal = await screen.findByRole("heading", { name: /grand total/i });
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grant total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const cherriesCheckbox = await screen.findByRole("checkbox", { name: /cherries/i });
    await user.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
