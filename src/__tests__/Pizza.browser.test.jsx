import { expect, test } from "vitest";
import Pizza from "../Pizza";
import { render } from "@testing-library/react";

test("alt text renders on image", () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />,
  );

  const img = screen.getByRole("img");

  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});
