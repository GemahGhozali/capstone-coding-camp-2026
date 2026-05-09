import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/features/landing-page";
import { LoginPage, RegisterPage } from "@/features/auth";
import { CorrectionDetailsPage, CorrectionPage } from "@/features/correction";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        children: [
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
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
