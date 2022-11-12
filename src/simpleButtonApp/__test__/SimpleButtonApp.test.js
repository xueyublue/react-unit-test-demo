import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Button from "../SimpleButtonApp";
import renderer from "react-test-renderer";
import { logRoles } from "@testing-library/dom";

beforeEach(cleanup);

test("button has correct initial color", () => {
  const { container } = render(<Button />);

  // print out roles to console
  logRoles(container);

  const colorButton = screen.getByRole("button", { name: /Change to blue/i });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<Button />);
  const colorButton = screen.getByRole("button", { name: /Change to blue/i });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  // expect the text to be "Change to red"
  expect(colorButton).toHaveTextContent(/Change to red/i);
});

test("matches snapshot", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("initial conditions", () => {
  render(<Button />);
  const colorButton = screen.getByRole("button", /Change to blue/i);
  // check that the button starts out enabled
  expect(colorButton).toBeEnabled(colorButton);
  // check taht the checkbox started out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked(checkbox);
});

test("checkbox disables button on first click and enabls on second click", () => {
  render(<Button />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});
