import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResignationForm from "./pages/ResignationForm";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute allowedRoles={["employee", "hr"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["employee"]} />}>
        <Route path="/resignation" element={<ResignationForm />} />
      </Route>
    </Routes>
  );
};

export default App;
