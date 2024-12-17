import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import KukuCube from "./pages/kukuCube";
import TicTacToe from "./pages/ticTacToe";

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
    },
    {
      path: "/tic-tac-toe",
      element: (
         <TicTacToe/>
      ),
    },
  ])
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}