import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  it("should render layout correctly", () => {
    const { asFragment } = render(<Layout>children</Layout>, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
