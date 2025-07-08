import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import Room from "@/pages/Room";
import ErrorFallback from "@/components/common/ErrorFallback";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Room />,
      errorElement: <ErrorFallback />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        containerClassName="text-sm tracking-tight"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
