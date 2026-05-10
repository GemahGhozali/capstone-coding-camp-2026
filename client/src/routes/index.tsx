import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/features/landing-page";
import { AuthLayout, LoginPage, RegisterPage } from "@/features/auth";
import { CorrectionDetailsPage, CorrectionPage } from "@/features/correction";
import { authUserLoader } from "./loaders/auth.loader";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: authUserLoader,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "auth/login",
            element: <LoginPage />,
          },
          {
            path: "auth/register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "correction",
        children: [
          {
            index: true,
            element: <CorrectionPage />,
          },
          {
            path: ":correctionId",
            element: <CorrectionDetailsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
