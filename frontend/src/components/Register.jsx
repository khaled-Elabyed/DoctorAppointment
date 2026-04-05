import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("❌ Name is required"),
    email: Yup.string()
      .email("❌ Invalid email format")
      .required("❌ Email is required"),
    password: Yup.string()
      .min(6, "❌ Password must be at least 6 characters")
      .required("❌ Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3500'}`}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      }

      if (data.token) {
        login(data.token);
        navigate("/");
      }
    } catch (err) {
      setError("Server error, please try again later");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white w-96 shadow-md rounded p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

            {error && <p className="text-red-500">{error}</p>}

            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="w-full mb-3 p-2 rounded border"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm"
            />

            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full mb-3 p-2 rounded border"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-3 p-2 rounded border"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded bg-blue-500 text-white"
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
