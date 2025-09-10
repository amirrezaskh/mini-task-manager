import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import DashboardPage from "../../features/dashboard/DashboardPage";
import SignInPage from "../../features/auth/signin/SignInPage";
import SignUpPage from "../../features/auth/signup/SignUpPage";
import HomePage from "../../features/home/HomePage";
import TaskForm from "../../features/tasks/CreateTaskPage";
import AboutPage from "../../features/about/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "create", element: <TaskForm /> },
      { path: "about", element: <AboutPage /> }
    ],
  },
]);
