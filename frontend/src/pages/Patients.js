import React, { useEffect, useState } from "react";
import API from "@/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInsert, setShowInsert] = useState(false);
  const [showDetails, setShowDetails] = useState(null); // null ou paciente
  const [newPatient, setNewPatient] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await API.get("/patients");
      setPatients(response.data);
    } catch (error) {
      toast.error("Erro ao carregar pacientes.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInsert = async () => {
    try {
      await API.post("/patients", newPatient);
      toast.success("Paciente criado com sucesso.");
      setShowInsert(false);
      setNewPatient({ name: "", email: "" });
      fetchPatients();
    } catch (err) {
      toast.error("Erro ao criar paciente.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Pacientes</h1>
        <DialogTrigger onClick={() => setShowInsert(true)}>Inserir Paciente</DialogTrigger>
      </div>

      {loading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum paciente encontrado.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {patients.map((patient) => (
            <Card
              key={patient.id}
              className="shadow-md hover:shadow-lg transition-all"
            >
              <CardHeader>
                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-sm text-gray-500">{patient.email}</p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={() => setShowDetails(patient)}>
                  Ver mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Inserir paciente */}
      <Dialog open={showInsert}>
        <DialogContent onClose={() => setShowInsert(false)}>
          <DialogHeader>
            <DialogTitle>Inserir Novo Paciente</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleInsert();
            }}
          >
            <Input
              placeholder="Nome"
              value={newPatient.name}
              onChange={(e) =>
                setNewPatient({ ...newPatient, name: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={newPatient.email}
              onChange={(e) =>
                setNewPatient({ ...newPatient, email: e.target.value })
              }
            />
            <Button type="submit">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Ver mais */}
      <Dialog open={!!showDetails}>
        <DialogContent onClose={() => setShowDetails(null)}>
          <DialogHeader>
            <DialogTitle>Detalhes do Paciente</DialogTitle>
          </DialogHeader>
          {showDetails && (
            <div className="mt-4 space-y-2">
              <p><strong>Nome:</strong> {showDetails.name}</p>
              <p><strong>Email:</strong> {showDetails.email}</p>
              <p><strong>ID:</strong> {showDetails.id}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
}
