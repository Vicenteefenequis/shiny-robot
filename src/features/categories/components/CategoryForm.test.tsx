import { render } from "@testing-library/react";
import { CategoryForm } from "./CategoryForm";
import { BrowserRouter } from "react-router-dom";

const Props = {
  category: {
    id: "4450f3bd-77fd-4552-ba02-00a70f57154c",
    name: "Douglas",
    description: "Douglas",
    is_active: true,
    created_at: "2023-07-10T23:49:43+0000",
    updated_at: "2023-07-10T23:49:43+0000",
    deleted_at: "2023-07-11T02:43:47+0000",
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleToggle: jest.fn(),
};

describe("CategoryForm", () => {
  it("should render category form correctly", () => {
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render category form with loading state", () => {
    const { asFragment } = render(<CategoryForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
