import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge-enhanced";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import type { Task, Sector } from "@/types";

interface TaskCardProps {
  task: Task;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  sectors: Sector[];
}

export function TaskCard({ task, onTaskUpdate, sectors = [] }: TaskCardProps) {
  const sector = sectors?.find(s => s.id === task.sectorId);
  
  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "completed":
        return <Badge variant="success">Concluída</Badge>;
      case "overdue":
        return <Badge variant="destructive">Atrasada</Badge>;
      case "in_progress":
        return <Badge variant="warning">Em andamento</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>;
      default:
        return <Badge variant="outline">{task.status}</Badge>;
    }
  };

  const getUrgencyBadge = () => {
    switch (task.urgency) {
      case "urgent":
        return <Badge variant="urgent">Urgente</Badge>;
      case "moderate":
        return <Badge variant="moderate">Relativamente urgente</Badge>;
      case "low":
        return <Badge variant="low">Não urgente</Badge>;
      default:
        return <Badge variant="outline">{task.urgency}</Badge>;
    }
  };

  const getTypeBadge = () => {
    switch (task.type) {
      case "daily":
        return <Badge variant="outline">Diária</Badge>;
      case "monthly":
        return <Badge variant="outline">Mensal</Badge>;
      case "temporary":
        return <Badge variant="outline">Temporária</Badge>;
      default:
        return <Badge variant="outline">{task.type}</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isOverdue = task.status !== "completed" && new Date() > task.dueDate;

  const handleDeliveryStatus = (status: "delivered" | "not_delivered") => {
    onTaskUpdate(task.id, {
      deliveryStatus: status,
      status: "completed",
    });
  };

  return (
    <Card className={`transition-all hover:shadow-lg ${isOverdue ? 'border-destructive/50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {task.title}
          </CardTitle>
          {getStatusIcon()}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {getStatusBadge()}
          {getUrgencyBadge()}
          {getTypeBadge()}
          {sector && (
            <Badge variant="sector">
              {sector.name}
            </Badge>
          )}
        </div>

        <Separator />

        {/* Due Date */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className={isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}>
            Prazo: {formatDate(task.dueDate)}
          </span>
        </div>

        {/* Delivery Status */}
        {task.deliveryStatus && (
          <div className="flex items-center gap-2">
            {task.deliveryStatus === "delivered" ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
            <span className="text-sm">
              {task.deliveryStatus === "delivered" ? "Entregue" : "Não entregue"}
            </span>
          </div>
        )}

        {/* CEO Actions */}
        {task.status === "completed" && !task.deliveryStatus && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Ações do CEO:
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeliveryStatus("delivered")}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Entregue
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeliveryStatus("not_delivered")}
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Não entregue
              </Button>
            </div>
          </div>
        )}

        {/* Mark as Complete for pending/in_progress tasks */}
        {(task.status === "pending" || task.status === "in_progress") && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onTaskUpdate(task.id, { status: "completed" })}
            className="w-full"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar como concluída
          </Button>
        )}
      </CardContent>
    </Card>
  );
}