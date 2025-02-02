import { createBrowserRouter, RouterProvider } from "react-router";
import Room from "@/pages/room/Room";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Room />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
