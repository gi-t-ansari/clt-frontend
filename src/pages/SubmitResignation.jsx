import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import resignationApi from "../api/resignationApi";
import Button from "../components/Button";
import moment from "moment";

const resignationSchema = yup.object().shape({
  lastWorkingDay: yup
    .date()
    .required("Last working day is required")
    .test("valid-date", "You cannot select a weekend or holiday", (value) => {
      const dayOfWeek = moment(value).isoWeekday();
      return dayOfWeek !== 6 && dayOfWeek !== 7; // Ensure it's not Saturday or Sunday
    }),
  reason: yup.string().required("Reason for resignation is required"),
});

const SubmitResignation = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resignationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await resignationApi.submitResignation(data, token);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit resignation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Resignation</h1>

      {success ? (
        <p className="text-green-500">
          Resignation submitted successfully! Redirecting...
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md p-4 rounded-lg"
        >
          <div className="mb-4">
            <label className="block font-semibold">Last Working Day</label>
            <input
              type="date"
              {...register("lastWorkingDay")}
              className="w-full p-2 border rounded"
            />
            {errors.lastWorkingDay && (
              <p className="text-red-500">{errors.lastWorkingDay.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">
              Reason for Resignation
            </label>
            <textarea
              {...register("reason")}
              className="w-full p-2 border rounded"
              placeholder="Provide your reason for leaving"
            />
            {errors.reason && (
              <p className="text-red-500">{errors.reason.message}</p>
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

export default SubmitResignation;
