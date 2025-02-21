// ...existing code...
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN } from "../../../constant";
import { useNavigate } from "react-router";
const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_superuser: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuperUser, setIsSuperUser] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    const newErrors = {};
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await api.post("api/user/register/", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
      setSuccessMessage("Registration successful!");
    },
    onError: (error) => {
      setSuccessMessage("");
        if (error?.response?.data.username[0]) {
          console.log(error.response.data.username[0]);
          setErrors({
            general: error.response.data.username[0],
          });
        }
        else{
          setErrors({
            general: error?.message || "Error occurred",
          });
        }
      // setErrors({
      //   general: error?.message || "Error occurred",
      // });
    },
    onLoading: () => {
      setErrors({});
      setSuccessMessage("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      const { username, email, password } = formData;
      //
      mutation.mutate({...formData});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && <p className="text-red-500">{errors.general}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              name="is_superuser"
              id="userType"
              value={formData.is_superuser}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-700 ms-2" htmlFor="userType">
              Super Admin
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {mutation.isPending ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
