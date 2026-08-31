import { BrowserRouter } from "react-router-dom";

import AdminRoute from "./routers";
function App() {

  return (
    <BrowserRouter>
      <AdminRoute />
    </BrowserRouter>
  )
}

export default App
