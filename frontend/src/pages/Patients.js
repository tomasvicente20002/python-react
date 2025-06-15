import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/patients", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setPatients(response.data)
      } catch (error) {
        toast.error("Erro ao carregar pacientes.")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Pacientes</h1>

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
            <Card key={patient.id} className="shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-sm text-gray-500">{patient.email}</p>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Ver mais</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  )
}