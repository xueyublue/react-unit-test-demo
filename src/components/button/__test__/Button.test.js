import { render, screen, cleanup } from "@testing-library/react";
import Button from "../Button";

beforeEach(cleanup);

test("renders", () => {
  render(<Button label="SAVE"></Button>);
  const button = screen.getByTestId("button");
  expect(button).toHaveTextContent("SAVE");
});
