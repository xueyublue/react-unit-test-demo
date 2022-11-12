import { render, screen, cleanup, fireEvent, logRoles } from "@testing-library/react";
import Button from "../SimpleButtonApp";
import renderer from "react-test-renderer";
import SimpleButtonApp from "../SimpleButtonApp";
import { replaceCamelWithSpaces } from "..//SimpleButtonApp";

describe("test frontend behaviors", () => {
  beforeEach(cleanup);

  test("button has correct initial color", () => {
    const { container } = render(<Button />);
    logRoles(container);

    const colorButton = screen.getByRole("button", { name: /Change to midnight blue/i });
    expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  });

  test("button turns blue when clicked", () => {
    render(<Button />);
    const colorButton = screen.getByRole("button", { name: /Change to midnight blue/i });

    fireEvent.click(colorButton);

    expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
    expect(colorButton).toHaveTextContent(/Change to medium violet red/i);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("initial conditions", () => {
    render(<Button />);

    const colorButton = screen.getByRole("button", /Change to midnight blue/i);
    expect(colorButton).toBeEnabled(colorButton);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked(checkbox);
  });

  test("checkbox disables button on first click and enabls on second click", () => {
    render(<Button />);
    const checkbox = screen.getByRole("checkbox", { name: /disable button/i });
    const button = screen.getByRole("button", { name: /change to midnight blue/i });

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
  });

  test("Disable button has gray background and reverts to red", () => {
    render(<SimpleButtonApp />);
    const checkbox = screen.getByRole("checkbox", { name: /disable button/i });
    const button = screen.getByRole("button", { name: /change to midnight blue/i });

    fireEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: "gray" });

    fireEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  });

  test("Disable button has gray background and reverts to blue", () => {
    render(<SimpleButtonApp />);
    const checkbox = screen.getByRole("checkbox", { name: /disable button/i });
    const button = screen.getByRole("button", { name: /change to midnight blue/i });

    // change to blue
    fireEvent.click(button);

    fireEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: "gray" });

    fireEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
  });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
