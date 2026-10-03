import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  name: "The calabrese pizza",
  category: "Supreme",
  description: "lol pizza from Calabria",
  image: "/public/pizzas/calabrese.webp",
  sizes: {
    S: 12.25,
    M: 16.25,
    L: 20.25,
  },
};

beforeEach(() => {
  fetchMocker.resetMocks();
});

test("returns null while the pizza of the day is loading", () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay());

  expect(result.current).toBeNull();
});

test("fetches and returns the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay());

  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });

  expect(fetchMocker).toHaveBeenCalledWith("/api/pizza-of-the-day");
});