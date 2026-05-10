import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import queryClient from "./libs/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          success: {
            iconTheme: {
              primary: "#00C950",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
