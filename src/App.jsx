import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import KukuCube from "./pages/kukuCube";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <Home />
      ),
    },
    {
      path: "/kuku-cube",
      element: (
         <KukuCube/>
      ),
    }
  ])
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}