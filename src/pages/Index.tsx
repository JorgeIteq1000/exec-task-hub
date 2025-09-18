import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge-enhanced";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Building2, Users, Calendar, Settings } from "lucide-react";
import { Dashboard } from "@/components/Dashboard";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { SectorManagement } from "@/components/SectorManagement";
import { tasks as mockTasks, sectors as mockSectors } from "@/lib/mockData";
import type { Task, Sector, TaskType, UrgencyLevel, TaskStatus, TaskFormData } from "@/types";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [sectors, setSectors] = useState<Sector[]>(mockSectors);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedType, setSelectedType] = useState<TaskType | "all">("all");
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "all">("all");

  // Filter tasks based on current filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === "all" || task.sectorId === selectedSector;
      const matchesType = selectedType === "all" || task.type === selectedType;
      const matchesUrgency = selectedUrgency === "all" || task.urgency === selectedUrgency;
      const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;

      return matchesSearch && matchesSector && matchesType && matchesUrgency && matchesStatus;
    });
  }, [tasks, searchTerm, selectedSector, selectedType, selectedUrgency, selectedStatus]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedSector !== "all") count++;
    if (selectedType !== "all") count++;
    if (selectedUrgency !== "all") count++;
    if (selectedStatus !== "all") count++;
    return count;
  }, [searchTerm, selectedSector, selectedType, selectedUrgency, selectedStatus]);

  const handleCreateTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      sectorId: formData.sectorId,
      type: formData.type,
      urgency: formData.urgency,
      dueDate: formData.dueDate,
      status: "pending",
      deliveryStatus: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsTaskFormOpen(false);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const handleAddSector = (sectorData: Omit<Sector, "id">) => {
    const newSector: Sector = {
      ...sectorData,
      id: `sector-${Date.now()}`,
    };
    setSectors((prev) => [...prev, newSector]);
  };

  const handleRemoveSector = (sectorId: string) => {
    // Check if sector has tasks
    const hasActiveTasks = tasks.some(task => task.sectorId === sectorId);
    
    if (hasActiveTasks) {
      alert("Não é possível remover um setor que possui tarefas ativas. Remova ou transfira as tarefas primeiro.");
      return;
    }
    
    setSectors((prev) => prev.filter(sector => sector.id !== sectorId));
  };

  const handleUpdateSector = (sectorId: string, updates: Partial<Sector>) => {
    setSectors((prev) =>
      prev.map((sector) =>
        sector.id === sectorId ? { ...sector, ...updates } : sector
      )
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSector("all");
    setSelectedType("all");
    setSelectedUrgency("all");
    setSelectedStatus("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Gestão de Tarefas Executiva
            </h1>
            <p className="text-muted-foreground mt-1">
              Sistema de controle de tarefas corporativas
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{sectors.length} setores</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{tasks.length} tarefas</span>
            </div>
            
            <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Tarefa
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Nova Tarefa</DialogTitle>
                </DialogHeader>
                <TaskForm 
                  onSubmit={handleCreateTask}
                  sectors={sectors}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks" className="gap-2">
              <Calendar className="h-4 w-4" />
              Tarefas
            </TabsTrigger>
            <TabsTrigger value="sectors" className="gap-2">
              <Settings className="h-4 w-4" />
              Gerenciar Setores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {/* Dashboard */}
            <Dashboard tasks={tasks} sectors={sectors} />

            {/* Filters */}
            <div className="card-elevated">
              <TaskFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedSector={selectedSector}
                onSectorChange={setSelectedSector}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                selectedUrgency={selectedUrgency}
                onUrgencyChange={setSelectedUrgency}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
                sectors={sectors}
              />
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Tarefas {activeFiltersCount > 0 && "(Filtradas)"}
                </h2>
                <Badge variant="secondary">
                  {filteredTasks.length} de {tasks.length}
                </Badge>
              </div>
              
              <TaskList
                tasks={filteredTasks}
                onTaskUpdate={handleTaskUpdate}
                sectors={sectors}
              />
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <SectorManagement
              sectors={sectors}
              onAddSector={handleAddSector}
              onRemoveSector={handleRemoveSector}
              onUpdateSector={handleUpdateSector}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
