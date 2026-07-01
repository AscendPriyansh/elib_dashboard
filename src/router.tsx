import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/login",
    element: <Login/>
  }, 
  {
    path: "/register",
    element: <Register/>
  }
]);

export default router;