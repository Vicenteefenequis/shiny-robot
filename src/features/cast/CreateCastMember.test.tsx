import { CastMemberCreate } from "./CreateCastMember";
import { renderWithProviders } from "../../utils/test-utils";

describe("CreateCastMember", () => {
  it("should render create cast member correctly", () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />);

    expect(asFragment()).toMatchSnapshot();
  });
});
