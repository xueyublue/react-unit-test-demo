import { render, screen, cleanup } from "@testing-library/react";
import Options from "../Options";

describe("basic tests", () => {
  afterEach(cleanup);

  test("display image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("display image for each topping option from server", async () => {
    render(<Options optionType="toppings" />);

    const images = await screen.findAllByRole("img", { name: /topping$/i });
    expect(images).toHaveLength(3);

    const imageTitles = images.map((img) => img.alt);
    expect(imageTitles).toStrictEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
  });
});
