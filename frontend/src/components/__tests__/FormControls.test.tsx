import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../Input";
import Datepicker from "../Datepicker";
import Select from "../Select";
import RadioGroup from "../RadioGroup";
import Textarea from "../Textarea";

describe("Form controls", () => {
  it("renders Input with label, forwards props, and shows errors", async () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Company"
        error="Required"
        placeholder="Company name"
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText("Company name");
    await userEvent.type(input, "ACME");

    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders Datepicker with datetime-local type", () => {
    render(
      <Datepicker
        label="Date"
        value="2025-11-20T10:30"
        onChange={() => {}}
      />
    );
    const input = screen.getByDisplayValue("2025-11-20T10:30");

    expect(input).toHaveAttribute("type", "datetime-local");
    expect(input).toHaveValue("2025-11-20T10:30");
  });

  it("renders Select options from primitive and object values", () => {
    render(
      <Select
        label="Status"
        options={[
          "scheduled",
          { value: "completed", text: "Completed" },
        ]}
        value="scheduled"
        onChange={() => {}}
      />
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue("scheduled");
    expect(options[1]).toHaveValue("completed");
  });

  it("renders RadioGroup with controlled selection and propagates change", async () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup
        label="Rating"
        selectedValue={2}
        options={[1, 2, 3]}
        onChange={handleChange}
        name="rating"
      />
    );

    const radios = screen.getAllByRole("radio");
    expect(radios[1]).toBeChecked();

    await userEvent.click(radios[2]);
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders Textarea with custom rows and error message", () => {
    render(
      <Textarea
        label="Feedback"
        rows={5}
        error="Too short"
        defaultValue="Initial text"
      />
    );

    const textarea = screen.getByDisplayValue("Initial text");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });
});

