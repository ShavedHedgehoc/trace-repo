import MainLayout from "@/app/main-layout";
import { Trademarks } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <></>
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Trademarks />
            },
            { path: "./lll", element: <></> }
        ]
    }
])

export const AppRouter = () => <RouterProvider router={router} />