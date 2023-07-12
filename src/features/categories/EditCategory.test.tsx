import { rest } from "msw";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CategoryEdit } from "./EditCategory";
import { baseUrl } from "../api/apiSlice";
import { setupServer } from "msw/node";

const data = {
  id: "1",
  name: "Category 1",
  description: "Description 1",
  is_active: true,
  created_at: "2023-09-15T00:00:00+07:00",
  updated_at: "2023-09-15T00:00:00+07:00",
  deleted_at: null,
};

const handlers = [
  rest.get(`${baseUrl}/categories/`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json({ data }));
  }),
  rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("EditCategory", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render edit category correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const is_active = screen.getByTestId("is_active");

    await waitFor(() => {
      expect(name).toHaveValue("Category 1");
    });

    const submitButton = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(is_active);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Success updated category!")).toBeInTheDocument();
    });
  });

  it("should handle error", async () => {
    server.use(
      rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      })
    );

    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const is_active = screen.getByTestId("is_active");

    await waitFor(() => {
      expect(name).toHaveValue("Category 1");
    });

    const submitButton = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Category 2" } });
    fireEvent.change(description, { target: { value: "Description 2" } });
    fireEvent.click(is_active);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error updating category!")).toBeInTheDocument();
    });
  });
});
