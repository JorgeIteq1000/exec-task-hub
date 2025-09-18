import { Badge } from "@/components/ui/badge-enhanced";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import type { TaskType, UrgencyLevel, TaskStatus, Sector } from "@/types";

interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSector: string;
  onSectorChange: (value: string) => void;
  selectedType: TaskType | "all";
  onTypeChange: (value: TaskType | "all") => void;
  selectedUrgency: UrgencyLevel | "all";
  onUrgencyChange: (value: UrgencyLevel | "all") => void;
  selectedStatus: TaskStatus | "all";
  onStatusChange: (value: TaskStatus | "all") => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  sectors: Sector[];
}

export function TaskFilters({
  searchTerm,
  onSearchChange,
  selectedSector,
  onSectorChange,
  selectedType,
  onTypeChange,
  selectedUrgency,
  onUrgencyChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
  activeFiltersCount,
  sectors,
}: TaskFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Filtros</h3>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFiltersCount}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sector Filter */}
        <Select value={selectedSector} onValueChange={onSectorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os setores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os setores</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector.id} value={sector.id}>
                {sector.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="daily">Diária</SelectItem>
            <SelectItem value="monthly">Mensal</SelectItem>
            <SelectItem value="temporary">Temporária</SelectItem>
          </SelectContent>
        </Select>

        {/* Urgency Filter */}
        <Select value={selectedUrgency} onValueChange={onUrgencyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todas urgências" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas urgências</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
            <SelectItem value="moderate">Relativamente urgente</SelectItem>
            <SelectItem value="low">Não urgente</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="in_progress">Em andamento</SelectItem>
            <SelectItem value="completed">Concluída</SelectItem>
            <SelectItem value="overdue">Atrasada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full md:w-auto"
        >
          <X className="h-4 w-4 mr-2" />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}