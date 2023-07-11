import { render } from "@testing-library/react";
import { CastMemberForm } from "./CastMemberForm";
import { BrowserRouter } from "react-router-dom";

const Props = {
  castMember: {
    id: "1",
    name: "test",
    type: 1,
    created_at: "2021-10-20T00:00:00.000000Z",
    updated_at: "2021-10-20T00:00:00.000000Z",
    deleted_at: "2021-10-20T00:00:00.000000Z",
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
};

describe("CastMemberForm", () => {
  it("should render castMember form correctly", () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember form with loading state", () => {
    const { asFragment } = render(<CastMemberForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember form with disabled state", () => {
    const { asFragment } = render(
      <CastMemberForm {...Props} isDisabled isLoading />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
