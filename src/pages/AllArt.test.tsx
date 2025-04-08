import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllArt from "../pages/AllArt";
import { MemoryRouter } from "react-router-dom";

jest.mock("../hooks/useGetArtCollection", () => ({
  useGetArtCollection: jest.fn(),
}));

const renderPage = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AllArt />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient();

const mockResponse = {
  data: [
    {
      artist_id: 1,
      artist_title: "Artist Name",
      artist_display: "Artist Display Name",
      artwork_type_title: "Artwork Type",
      thumbnail: { lqip: "test", alt_text: "Alt text" },
      image_id: "image123",
      description: "Some artwork description",
      exhibition_history: "Exhibition History",
      provenance_text: "Provenance",
    },
  ],
  pagination: {
    total: 1,
    limit: 20,
    offset: 0,
    total_pages: 1,
    current_page: 1,
  },
};

describe("AllArt Component", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("should display Loading if data is loading", async () => {
    const { useGetArtCollection } = require("../hooks/useGetArtCollection");
    useGetArtCollection.mockReturnValue({
      data: mockResponse,
      isLoading: true,
      error: null,
    });

    renderPage();

    const loadingText = await screen.findByText(/Loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("should fetch data and display the art collection photos", async () => {
    const { useGetArtCollection } = require("../hooks/useGetArtCollection");
    useGetArtCollection.mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    });

    renderPage();

   const thumbnailImage = await screen.findByAltText(/Alt text/i);
   expect(thumbnailImage).toBeInTheDocument();

    expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument();
  });

  it("should handle API error", async () => {
    const { useGetArtCollection } = require("../hooks/useGetArtCollection");
    useGetArtCollection.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("API error"),
    });

    renderPage();

    const errorMessage = await screen.findByText(/Error: API error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should handle pagination buttons", async () => {
    const { useGetArtCollection } = require("../hooks/useGetArtCollection");
    useGetArtCollection.mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    });

    renderPage();

    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("should retain card position and focus when navigating back from detail page", async () => {
    const { useGetArtCollection } = require("../hooks/useGetArtCollection");
    useGetArtCollection.mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    });

    const { unmount } = renderPage();

    const artCard = await screen.findByAltText(/Alt text/i);
    const cardLink = artCard.closest("a");
    expect(cardLink).toBeInTheDocument();

    fireEvent.click(cardLink!);
    expect(localStorage.getItem("clickedArtId")).toBe("0-1");
    unmount();
    renderPage();

    await waitFor(() => {
      const cardDiv = document.getElementById("0-1") 
      expect(cardDiv).toBeInTheDocument();
      expect(cardDiv).toHaveClass("ring-2", "ring-red-500", "text-red-500");
      expect(cardDiv?.scrollIntoView).toHaveBeenCalled();
    });
  });
});
