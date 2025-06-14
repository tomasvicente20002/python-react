import React, { useEffect, useState } from "react";
import axios from "axios";

function Patients({ token, onLogout }) {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const getPatients = async () => {
    const res = await axios.get("http://localhost:5000/patients", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPatients(res.data);
  };

  const addPatient = async () => {
    await axios.post("http://localhost:5000/patients", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ name: "", email: "" });
    getPatients();
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Patients</h1>
        <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>

      <div className="mb-4 flex gap-2">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button className="bg-green-500 text-white px-3 py-2 rounded" onClick={addPatient}>Add</button>
      </div>

      <ul className="space-y-2">
        {patients.map(p => (
          <li key={p.id} className="border p-2 rounded">{p.name} - {p.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
