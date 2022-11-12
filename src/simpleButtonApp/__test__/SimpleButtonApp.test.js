import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Button from "../SimpleButtonApp";
import renderer from "react-test-renderer";
import { logRoles } from "@testing-library/dom";
import SimpleButtonApp from "../SimpleButtonApp";

beforeEach(cleanup);

test("button has correct initial color", () => {
  const { container } = render(<Button />);
  logRoles(container);

  const colorButton = screen.getByRole("button", { name: /Change to blue/i });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<Button />);
  const colorButton = screen.getByRole("button", { name: /Change to blue/i });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton).toHaveTextContent(/Change to red/i);
});

test("matches snapshot", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("initial conditions", () => {
  render(<Button />);

  const colorButton = screen.getByRole("button", /Change to blue/i);
  expect(colorButton).toBeEnabled(colorButton);

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked(checkbox);
});

test("checkbox disables button on first click and enabls on second click", () => {
  render(<Button />);
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });
  const button = screen.getByRole("button", { name: /change to blue/i });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("Disable button has gray background and reverts to red", () => {
  render(<SimpleButtonApp />);
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });
  const button = screen.getByRole("button", { name: /change to blue/i });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "red" });
});

test("Disable button has gray background and reverts to blue", () => {
  render(<SimpleButtonApp />);
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });
  const button = screen.getByRole("button", { name: /change to blue/i });

  // change to blue
  fireEvent.click(button);

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "blue" });
});
