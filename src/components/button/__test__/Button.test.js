import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Button from "../Button";
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
