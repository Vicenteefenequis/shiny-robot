import { rest } from "msw";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { ListCastMembers } from "./ListCastMembers";
import { baseUrl } from "../api/apiSlice";
import { castMemberResponse, castMemberResponsePage2 } from "./mocks";
import { setupServer } from "msw/node";

const handlers = [
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(
        ctx.delay(150),
        ctx.status(200),
        ctx.json(castMemberResponsePage2)
      );
    }

    return res(ctx.delay(150), ctx.status(200), ctx.json(castMemberResponse));
  }),
  rest.delete(
    `${baseUrl}/cast_members/f55fca48-d422-48bf-b212-956215eddcaf`,
    (req, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("ListCastMembers", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<ListCastMembers />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<ListCastMembers />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      })
    );

    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const error = screen.getByText("Error fetching categories");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle On PageChange", async () => {
    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const nextPageButton = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      const name = screen.getByText("Teste 2");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, { target: { value: "Teste" } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle delete cast member success", async () => {
    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });

    await waitFor(() => {
      const success = screen.getByText("Cast Member deleted successfully");
      expect(success).toBeInTheDocument();
    });
  });

  it("should handle Delete CastMember error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/cast_members/f55fca48-d422-48bf-b212-956215eddcaf`,
        (req, res, ctx) => {
          return res(ctx.delay(150), ctx.status(500));
        }
      )
    );

    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const name = screen.getByText("Teste");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Cast Member not deleted")).toBeInTheDocument();
    });
  });
});
