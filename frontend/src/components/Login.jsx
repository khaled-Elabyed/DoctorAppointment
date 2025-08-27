import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError(null);
    try {
      const res = await fetch("http://localhost:3500/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Something went wrong");
      }

      if (data.token) {
        login(data.token);
        console.log(data.token);
        navigate("/");
      }
    } catch (err) {
      setServerError("Network error");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-96 shadow-md rounded p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {serverError && <p className="text-red-500">{serverError}</p>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full mb-3 p-2 rounded border"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mb-2"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-3 p-2 rounded border"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mb-2"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
