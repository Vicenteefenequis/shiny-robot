import { render } from "@testing-library/react";
import { CastMembersTable } from "./CastMembersTable";
import { BrowserRouter } from "react-router-dom";
import { Result, Results } from "../../../types/CastMembers";

const Props = {
  data: {
    data: [
      {
        id: "4450f3bd-77fd-4552-ba02-00a70f57154c",
        name: "Douglas",
        type: 1,
        updated_at: "",
        created_at: "2023-07-10T23:49:43+0000",
        deleted_at: "2023-07-11T02:43:47+0000",
      },
    ],
    links: {
      first: "http://localhost:8000/api/cast_members?page=1",
      last: "http://localhost:8000/api/cast_members?page=7",
      prev: "",
      next: "http://localhost:8000/api/cast_members?page=2",
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 7,
      path: "http://localhost:8000/api/cast_members",
      per_page: 15,
      to: 15,
      total: 98,
    },
  },
  perPage: 0,
  isFetching: false,
  rowsPerPage: [10, 20, 30],
  handleOnPageChange: jest.fn(),
  handleFilterChange: jest.fn(),
  handleOnPageSizeChange: jest.fn(),
  handleDelete: jest.fn(),
};

describe("CastMembersTable", () => {
  it("should render castMembers table correctly", () => {
    const { asFragment } = render(<CastMembersTable {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMembers table with loading state", () => {
    const { asFragment } = render(<CastMembersTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMembers table with empty date", () => {
    const { asFragment } = render(
      <CastMembersTable
        {...Props}
        data={{ data: [], meta: {}, links: {} } as any}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correct type", () => {
    const { asFragment } = render(
      <CastMembersTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], type: 2 }],
          meta: { ...Props.data.meta, total: 0 },
          links: { ...Props.data.links },
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
