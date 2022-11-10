import { render, screen, cleanup } from "@testing-library/react";
import Button from "../Button";
import renderer from "react-test-renderer";

beforeEach(cleanup);

test("render component", () => {
  render(<Button label="SAVE"></Button>);
  const button = screen.getByTestId("button");
  expect(button).toHaveTextContent("SAVE");
});

test("matches snapshot", () => {
  const tree = renderer.create(<Button label="SAVE" />).toJSON();
  expect(tree).toMatchSnapshot();
});
