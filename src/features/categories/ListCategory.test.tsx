import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CategoryList } from "./ListCategory";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { categoryResponse, categoryResponsePage2 } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(categoryResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe("ListCategory", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render list category correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render list category correctly with loading", () => {
    renderWithProviders(<CategoryList />);

    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render list category correctly with data", async () => {
    renderWithProviders(<CategoryList />);
    await waitFor(() => {
      const name = screen.getByText("Plum");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render list category correctly with error", async () => {
    server.use(
      rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProviders(<CategoryList />);
    await waitFor(() => {
      const error = screen.getByText("Error fetching categories");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle on page change", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Plum");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("SeaGreen");
      expect(name).toBeInTheDocument();
    });
  });
});
