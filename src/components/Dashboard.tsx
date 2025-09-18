import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge-enhanced";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Target,
  TrendingUp,
  Building2,
  BarChart3
} from "lucide-react";
import type { Task, Sector } from "@/types";

interface DashboardProps {
  tasks: Task[];
  sectors: Sector[];
}

export function Dashboard({ tasks, sectors = [] }: DashboardProps) {
  // Calculate metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = tasks.filter(task => task.status === "pending" || task.status === "in_progress").length;
  const overdueTasks = tasks.filter(task => {
    const isOverdue = task.status !== "completed" && new Date() > task.dueDate;
    return isOverdue || task.status === "overdue";
  }).length;
  const urgentTasks = tasks.filter(task => task.urgency === "urgent" && task.status !== "completed").length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Tasks by sector
  const tasksBySector = sectors?.map(sector => {
    const sectorTasks = tasks.filter(task => task.sectorId === sector.id);
    const sectorCompleted = sectorTasks.filter(task => task.status === "completed").length;
    const sectorCompletionRate = sectorTasks.length > 0 ? Math.round((sectorCompleted / sectorTasks.length) * 100) : 0;
    
    return {
      ...sector,
      totalTasks: sectorTasks.length,
      completedTasks: sectorCompleted,
      completionRate: sectorCompletionRate,
    };
  }) || [];

  // Tasks by urgency
  const urgencyStats = [
    {
      level: "urgent",
      label: "Urgente",
      count: tasks.filter(task => task.urgency === "urgent").length,
      variant: "urgent" as const,
    },
    {
      level: "moderate",
      label: "Moderada",
      count: tasks.filter(task => task.urgency === "moderate").length,
      variant: "moderate" as const,
    },
    {
      level: "low",
      label: "Baixa",
      count: tasks.filter(task => task.urgency === "low").length,
      variant: "low" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              Todas as tarefas no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Taxa: {completionRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando execução
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Necessitam atenção
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Urgency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Taxa de Conclusão Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span className="font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <div className="text-sm text-muted-foreground">
              {completedTasks} de {totalTasks} tarefas concluídas
            </div>
            {urgentTasks > 0 && (
              <div className="flex items-center gap-2 p-2 bg-urgent/10 rounded-md">
                <AlertTriangle className="h-4 w-4 text-urgent" />
                <span className="text-sm text-urgent font-medium">
                  {urgentTasks} tarefa{urgentTasks > 1 ? 's' : ''} urgente{urgentTasks > 1 ? 's' : ''} pendente{urgentTasks > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Urgency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Distribuição por Urgência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgencyStats.map((stat) => (
              <div key={stat.level} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={stat.variant} className="w-16 justify-center">
                    {stat.count}
                  </Badge>
                  <span className="text-sm">{stat.label}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {totalTasks > 0 ? Math.round((stat.count / totalTasks) * 100) : 0}%
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tasks by Sector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Performance por Setor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasksBySector.map((sector) => (
              <div key={sector.id} className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{sector.name}</h4>
                  <Badge variant="sector">
                    {sector.totalTasks} tarefa{sector.totalTasks !== 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conclusão</span>
                    <span className="font-medium">{sector.completionRate}%</span>
                  </div>
                  <Progress value={sector.completionRate} className="h-2" />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {sector.completedTasks} de {sector.totalTasks} concluídas
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}