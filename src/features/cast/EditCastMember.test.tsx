import { rest } from "msw";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { EditCastMember } from "./EditCastMember";
import { baseUrl } from "../api/apiSlice";
import { setupServer } from "msw/node";

const data = {
  id: 1,
  name: "Test",
  type: 1,
};

const handlers = [
  rest.get(`${baseUrl}/cast_members/`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json({ data }));
  }),
  rest.put(`${baseUrl}/cast_members/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("EditCastMember", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render edit cast member correctly", () => {
    const { asFragment } = renderWithProviders(<EditCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle edit cast member success", async () => {
    renderWithProviders(<EditCastMember />);

    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("Test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test 2" } });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText("Success updated cast member!")
      ).toBeInTheDocument();
    });
  });

  it("should handle edit cast member error", async () => {
    server.use(
      rest.put(`${baseUrl}/cast_members/1`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      })
    );

    renderWithProviders(<EditCastMember />);

    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("Test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test 2" } });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText("Error updated cast member!")
      ).toBeInTheDocument();
    });
  });
});
