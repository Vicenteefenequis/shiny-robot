import { render } from "@testing-library/react";
import { CategoriesTable } from "./CategoryTable";
import { BrowserRouter } from "react-router-dom";

// data?: Results;
//   perPage: number;
//   isFetching: boolean;
//   rowsPerPage?: number[];

//   handleOnPageChange: (page: number) => void;
//   handleFilterChange: (filterModel: GridFilterModel) => void;
//   handleOnPageSizeChange: (pageSize: number) => void;
//   handleDelete: (id: string) => void;

const Props = {
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 20, 30],
  handleOnPageChange: jest.fn(),
  handleFilterChange: jest.fn(),
  handleOnPageSizeChange: jest.fn(),
  handleDelete: jest.fn(),
};

const mockData = {
  data: [
    {
      id: "1",
      name: "Category 1",
      description: "Category 1 description",
      is_active: true,
      created_at: "2021-07-10T23:49:43+0000",
      updated_at: "2021-07-10T23:49:43+0000",
      deleted_at: "",
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
};

describe("CategoryTable", () => {
  it("should render category table correctly", () => {
    const { asFragment } = render(<CategoriesTable {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render category table with loading state", () => {
    const { asFragment } = render(<CategoriesTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with data", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} data={mockData} />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with incativate value", () => {
    const { asFragment } = render(
      <CategoriesTable
        {...Props}
        data={{
          ...mockData,
          data: [
            {
              ...mockData.data[0],
              is_active: false,
            },
          ],
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
