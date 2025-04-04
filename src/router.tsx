import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AllArt from "./pages/AllArt";
import ArtDetails from "./pages/ArtDetails";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter([
    {
    element: <RootLayout />,
    children: [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/all-art",
    element: <AllArt />,
  },
  {
    path: "/all-art/:artistId",
    element: <ArtDetails />,
  },
  ]
}]);

export default router;
