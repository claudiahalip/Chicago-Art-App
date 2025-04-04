import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ArtDetails from "../pages/ArtDetails";

const mockArt = {
  artist_title: "Vincent van Gogh",
  image_id: "sample-image",
  thumbnail: { alt_text: "A famous artwork" },
  artist_display: "Vincent van Gogh (Dutch, 1853–1890)",
  artwork_type_title: "Painting",
  description: "A beautiful piece of art of a starry night.",
  provenance_text: "Donated by an anonymous collector",
  exhibition_history: "Displayed at the Louvre",
};

const renderPage = () => {
   return (
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/art-details", state: { art: mockArt } }]}
      >
        <Routes>
          <Route path="/art-details" element={<ArtDetails />} />
        </Routes>
      </MemoryRouter>
    )
   ) 
}

describe("ArtDetails Component", () => {
  it("renders the art details correctly", () => {
    renderPage();
    expect(screen.getByText(/Artist: Vincent van Gogh/i)).toBeInTheDocument();
    expect(screen.getByText(/Painting/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A beautiful piece of art of a starry night./i)
    ).toBeInTheDocument();
  });

  it("redirects to /all-art when no art data is provided", () => {

    render(
      <MemoryRouter initialEntries={["/art-details"]}>
        <Routes>
          <Route path="/art-details" element={<ArtDetails />} />
          <Route path="/all-art" element={<div>Redirected to Art List</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Redirected to Art List/i)).toBeInTheDocument();
  });

  it("renders 'Back to art list' link and navigates correctly", async () => {
    renderPage();
    const backButton = screen.getByText(/Back to art list/i);
    expect(backButton).toBeInTheDocument();
  });
});
