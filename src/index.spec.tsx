/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import useMemoWithPrevious from ".";

function TestComponent({ value }: { value: string }) {
  const count: number = useMemoWithPrevious(
    (memo) => (memo.hasPrevious ? memo.value + 1 : 1),
    [value]
  );

  return <div>Prop changes: {count}</div>;
}

test("it is correct", () => {
  const { getByText, rerender } = render(<TestComponent value="x" />);
  expect(getByText("Prop changes: 1")).toBeVisible();

  rerender(<TestComponent value="x" />);
  expect(getByText("Prop changes: 1")).toBeVisible();

  rerender(<TestComponent value="y" />);
  expect(getByText("Prop changes: 2")).toBeVisible();

  rerender(<TestComponent value="x" />);
  expect(getByText("Prop changes: 3")).toBeVisible();
});
