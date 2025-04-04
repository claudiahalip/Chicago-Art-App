import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; 
import Home from "./Home"; 
import AllArt from "./AllArt";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe('Home page', () => {
   it("renders the Home component with all elements", () => {
     render(
       <MemoryRouter>
         <Home />
       </MemoryRouter>
     );

     const images = screen.getAllByRole("img");
     expect(images).toHaveLength(6);
     expect(images[0]).toHaveAttribute("src", "/images/AIC2.jpeg");
     expect(images[1]).toHaveAttribute("alt", "Art Institute of Chicago 2");

     expect(
       screen.getByText(/The art of Art Institute of Chicago/i)
     ).toBeInTheDocument();

     expect(
       screen.getByText(
         /My mini app is designed to offer an interactive exploration/i
       )
     ).toBeInTheDocument();

     const link = screen.getByText(/See art list/i);
     expect(link).toBeInTheDocument();
     expect(link).toHaveAttribute("href", "/all-art");
   });

   it("navigates to the art list page when the link is clicked", async() => {
     render(
       <QueryClientProvider client={queryClient}>
         <MemoryRouter initialEntries={["/"]}>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/all-art" element={<AllArt />} />
           </Routes>
         </MemoryRouter>
       </QueryClientProvider>
     );

     const link = screen.getByText(/See art list/i);
     fireEvent.click(link);

     await waitFor(() => {
       expect(
         screen.getByText(/Guess who the artist is!/i)
       ).toBeInTheDocument();
     });

   });
})

