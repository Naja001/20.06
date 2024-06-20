import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Root";
import AddProductForm from "./components/AddProduct";
import ProductDetailPage from "./pages/ProductDetailPage";
import EditProduct from "./components/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/add", element: <AddProductForm /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/edit/:id", element:<EditProduct/>}
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
