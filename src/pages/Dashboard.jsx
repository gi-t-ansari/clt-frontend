import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import resignationApi from "../api/resignationApi";
import Button from "../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === "hr") {
      fetchResignations();
    }
  }, [user]);

  const fetchResignations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await resignationApi.getAllResignations(token);
      setResignations(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch resignations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {user?.role === "employee" && (
        <div className="mb-4">
          <p>Welcome, {user.username}!</p>
          <Button
            onClick={() => navigate("/resign")}
            text="Submit Resignation"
          />
        </div>
      )}

      {user?.role === "hr" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Resignation Requests</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : resignations.length > 0 ? (
            <ul className="bg-white shadow-md rounded-lg p-4">
              {resignations.map((resignation) => (
                <li
                  key={resignation._id}
                  className="border-b p-2 flex justify-between"
                >
                  <span>
                    {resignation.employeeId} - {resignation.status}
                  </span>
                  <Button
                    text="Review"
                    onClick={() => navigate(`/resignations/${resignation._id}`)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No resignations found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
