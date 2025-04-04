import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default RootLayout;
