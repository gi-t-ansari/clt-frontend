import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import resignationApi from "../api/resignationApi";
import Button from "../components/Button";

const exitInterviewSchema = yup.object().shape({
  feedback: yup.string().required("Feedback is required"),
  improvementSuggestions: yup
    .string()
    .required("Improvement suggestions are required"),
});

const ExitInterview = () => {
  const { resignationId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(exitInterviewSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await resignationApi.submitExitInterview(resignationId, data, token);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit exit interview"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Exit Interview</h1>

      {success ? (
        <p className="text-green-500">
          Exit interview submitted successfully! Redirecting...
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md p-4 rounded-lg"
        >
          <div className="mb-4">
            <label className="block font-semibold">Feedback</label>
            <textarea
              {...register("feedback")}
              className="w-full p-2 border rounded"
              placeholder="Share your feedback"
            />
            {errors.feedback && (
              <p className="text-red-500">{errors.feedback.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">
              Improvement Suggestions
            </label>
            <textarea
              {...register("improvementSuggestions")}
              className="w-full p-2 border rounded"
              placeholder="Suggest any improvements"
            />
            {errors.improvementSuggestions && (
              <p className="text-red-500">
                {errors.improvementSuggestions.message}
              </p>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button
            text={loading ? "Submitting..." : "Submit"}
            type="submit"
            disabled={loading}
          />
        </form>
      )}
    </div>
  );
};

export default ExitInterview;
