import { createBrowserRouter, RouterProvider } from "react-router";
import Room from "@/pages/room/Room";
import Test from "./pages/test/Test";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Room />,
    },
    {
      path: "/test",
      element: <Test />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
