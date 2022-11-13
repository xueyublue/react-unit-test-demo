import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../context/OrderDetails";
import Options from "../Options";

describe("test", () => {
  test("update scoop ssubtotal when scoops change", async () => {
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
});
