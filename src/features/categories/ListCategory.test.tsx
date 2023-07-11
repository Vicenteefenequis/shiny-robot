import { renderWithProviders, screen } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CategoryList } from "./ListCategory";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { categoryResponse } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
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
});
