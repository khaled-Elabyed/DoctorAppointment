import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3500/api/department";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({ name: "", description: "", image: null });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_URL}/Alldepartments`);
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      setError("Failed to fetch departments");
    }
  };

  const fetchCount = async () => {
    try {
      const res = await fetch(`${API_URL}/count`);
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      setError("Failed to fetch count");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      const token = localStorage.getItem("token"); 

      const res = await fetch(`${API_URL}/addDepartment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess("Department added successfully!");
      setForm({ name: "", description: "", image: null });
      fetchDepartments();
      fetchCount();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchCount();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Departments</h1>

      <p className="mb-4">Total Departments: <span className="font-semibold">{count}</span></p>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-4 rounded mb-6"
      >
        <h2 className="text-xl font-semibold mb-3">Add Department (Admin Only)</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 mb-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Department
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <div key={dept._id} className="border rounded p-4 shadow-sm bg-gray-50">
            {dept.image && (
              <img
                src={`http://localhost:3500/uploads/${dept.image}`}
                alt={dept.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-lg font-bold">{dept.name}</h3>
            <p className="text-gray-600">{dept.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
