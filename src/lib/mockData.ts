import type { Sector, Task } from "@/types";

export const sectors: Sector[] = [
  {
    id: "coordination",
    name: "Coordenação",
    color: "hsl(var(--primary))",
  },
  {
    id: "hr",
    name: "RH",
    color: "hsl(var(--chart-2))",
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Relatório de Performance Mensal",
    description: "Compilar e enviar relatório de performance da equipe do mês anterior",
    sectorId: "coordination",
    type: "monthly",
    urgency: "moderate",
    status: "pending",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "task-2",
    title: "Verificação de Ponto Diária",
    description: "Verificar registros de ponto e identificar inconsistências",
    sectorId: "hr",
    type: "daily",
    urgency: "low",
    status: "completed",
    deliveryStatus: "delivered",
    dueDate: new Date(), // Today
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
    updatedAt: new Date(),
  },
  {
    id: "task-3",
    title: "Análise de Satisfação do Cliente",
    description: "Realizar análise dos dados de satisfação coletados no último trimestre",
    sectorId: "coordination",
    type: "temporary",
    urgency: "urgent",
    status: "overdue",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "task-4",
    title: "Atualização de Políticas de RH",
    description: "Revisar e atualizar políticas internas de recursos humanos",
    sectorId: "hr",
    type: "temporary",
    urgency: "moderate",
    status: "in_progress",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "task-5",
    title: "Backup de Dados",
    description: "Realizar backup completo dos dados do sistema",
    sectorId: "coordination",
    type: "daily",
    urgency: "urgent",
    status: "pending",
    dueDate: new Date(), // Today
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];