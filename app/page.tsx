import type { Metadata } from "next";
import ArchitectureExplorer from "./ArchitectureExplorer";

export const metadata: Metadata = {
  title: "Puntazo · Mapa de arquitectura",
  description: "Documentación C4 navegable del frontend, backend, flujos y modelo de datos de Puntazo.",
};

export default function Home() {
  return <ArchitectureExplorer />;
}
