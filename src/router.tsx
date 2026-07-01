import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import DashboardLayout from "@/layouts/DashboardLayout";
import BooksPage from "@/pages/BooksPage";
import AuthLayout from "@/layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "books",
        element: <BooksPage />
      }
    ]
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);

export default router;