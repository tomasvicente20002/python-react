// Importa os hooks do React
import React, { useEffect, useState } from "react";

// Importa a instância configurada do axios com autenticação
import API from "@/axios";

// Importa as ferramentas para mostrar notificações (toasts)
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importa componentes do sistema de diálogos (modal)
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

// Importa componentes visuais
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";

// Componente principal da página de pacientes
export default function Patients() {
  // Estado para guardar a lista de pacientes
  const [patients, setPatients] = useState([]);

  // Estado que controla o estado de carregamento (true/false)
  const [loading, setLoading] = useState(true);

  // Estado que controla se o popup de inserção está visível
  const [showInsert, setShowInsert] = useState(false);

  // Estado que guarda o paciente selecionado para o popup de detalhes
  const [showDetails, setShowDetails] = useState(null);

  // Estado que guarda os dados do novo paciente a inserir
  const [newPatient, setNewPatient] = useState({ name: "", email: "" });

  // Executa o fetch dos pacientes quando o componente monta (useEffect com array vazio)
  useEffect(() => {
    fetchPatients();
  }, []);

  // Função para buscar pacientes da API
  const fetchPatients = async () => {
    try {
      const response = await API.get("/patients");
      setPatients(response.data); // guarda pacientes no estado
    } catch (error) {
      toast.error("Erro ao carregar pacientes.");
      console.error(error);
    } finally {
      setLoading(false); // esconde os skeletons
    }
  };

  // Função para criar um novo paciente
  const handleInsert = async () => {
    try {
      await API.post("/patients", newPatient); // envia os dados do novo paciente
      toast.success("Paciente criado com sucesso.");
      setShowInsert(false); // fecha o modal
      setNewPatient({ name: "", email: "" }); // limpa os campos
      fetchPatients(); // atualiza a lista
    } catch (err) {
      toast.error("Erro ao criar paciente.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      {/* Cabeçalho da página */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Pacientes</h1>
        {/* Botão que abre o popup para inserir */}
        <DialogTrigger onClick={() => setShowInsert(true)}>
          Inserir Paciente
        </DialogTrigger>
      </div>

      {/* Se ainda estiver a carregar, mostra os Skeletons */}
      {loading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : patients.length === 0 ? (
        // Caso não haja pacientes
        <p className="text-center text-gray-500">Nenhum paciente encontrado.</p>
      ) : (
        // Lista de pacientes
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
                {/* Botão que abre o modal com detalhes */}
                <Button variant="outline" onClick={() => setShowDetails(patient)}>
                  Ver mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Inserção de Novo Paciente */}
      <Dialog open={showInsert}>
        <DialogContent onClose={() => setShowInsert(false)}>
          <DialogHeader>
            <DialogTitle>Inserir Novo Paciente</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={(e) => {
              e.preventDefault(); // impede reload da página
              handleInsert(); // chama a função de criar paciente
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

      {/* Modal de Detalhes do Paciente */}
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

      {/* Renderiza os toasts no final da página */}
      <ToastContainer />
    </div>
  );
}
