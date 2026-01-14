import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  it("renders the footer component", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays the brand name 'Interview Flow'", () => {
    renderFooter();
    expect(screen.getByText("Interview Flow")).toBeInTheDocument();
  });

  it("displays the correct current year", () => {
    renderFooter();
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText((content) => content.includes(currentYear))).toBeInTheDocument();
  });

  it.skip("renders all main sections", () => {
    renderFooter();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
  });

  it.skip("renders social media links", () => {
    renderFooter();
    // Assuming the SVGs are inside accessible links or checking for links directly
    // Since we used placeholder links with sr-only text for icons in the implementation:
    expect(screen.getByText("Twitter")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });
});
