import { rest } from "msw";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CategoryCreate } from "./CreateCategory";
import { baseUrl } from "../api/apiSlice";
import { setupServer } from "msw/node";

export const handlers = [
  rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.status(201), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe("CreateCategory", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryCreate />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");

    const submitButton = screen.getByRole("button", { name: /save/i });

    fireEvent.change(name, { target: { value: "Category 1" } });
    fireEvent.change(description, { target: { value: "Description 1" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Success created category!")).toBeInTheDocument();
    });
  });
});
