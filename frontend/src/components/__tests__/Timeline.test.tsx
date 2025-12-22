import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Timeline from "../Timeline";

const sampleItems = [
  { id: 1, title: "Kickoff", content: "Initial screen", date: "Jan 1" },
  { id: 2, title: "Interview", content: "Stage two", date: "Jan 5" },
  { id: 3, title: "Offer", content: "Final stage", date: "Jan 10" },
];

describe("Timeline", () => {
  it("renders non-interactive timeline content", () => {
    render(<Timeline items={sampleItems} activeIndex={1} />);

    expect(screen.getAllByText("Initial screen")).not.toHaveLength(0);
    expect(screen.getAllByText("Stage two")).not.toHaveLength(0);
    expect(screen.getAllByText("Final stage")).not.toHaveLength(0);
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
  });
});

