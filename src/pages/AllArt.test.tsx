import { render, screen } from "@testing-library/react";
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
});
