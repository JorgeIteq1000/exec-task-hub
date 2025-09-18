import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge-enhanced";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Building2, Trash2, Edit2 } from "lucide-react";
import type { Sector } from "@/types";

interface SectorManagementProps {
  sectors: Sector[];
  onAddSector: (sector: Omit<Sector, "id">) => void;
  onRemoveSector: (sectorId: string) => void;
  onUpdateSector: (sectorId: string, updates: Partial<Sector>) => void;
}

export function SectorManagement({ 
  sectors, 
  onAddSector, 
  onRemoveSector, 
  onUpdateSector 
}: SectorManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSectorName, setNewSectorName] = useState("");
  const [newSectorColor, setNewSectorColor] = useState("#3b82f6");
  const [error, setError] = useState("");

  // Predefined color options
  const colorOptions = [
    "#3b82f6", // Blue
    "#ef4444", // Red
    "#10b981", // Green
    "#f59e0b", // Yellow
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
    "#f97316", // Orange
    "#84cc16", // Lime
    "#ec4899", // Pink
    "#6b7280", // Gray
  ];

  const handleAddSector = () => {
    if (!newSectorName.trim()) {
      setError("Nome do setor é obrigatório");
      return;
    }

    // Check if sector name already exists
    if (sectors.some(sector => sector.name.toLowerCase() === newSectorName.trim().toLowerCase())) {
      setError("Já existe um setor com este nome");
      return;
    }

    onAddSector({
      name: newSectorName.trim(),
      color: newSectorColor,
    });

    // Reset form
    setNewSectorName("");
    setNewSectorColor("#3b82f6");
    setError("");
    setIsAddDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Gerenciar Setores
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Setor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Setor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sector-name">Nome do Setor*</Label>
                  <Input
                    id="sector-name"
                    value={newSectorName}
                    onChange={(e) => {
                      setNewSectorName(e.target.value);
                      setError("");
                    }}
                    placeholder="Ex: Financeiro, Marketing, TI..."
                    className={error ? "border-destructive" : ""}
                  />
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Cor do Setor</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewSectorColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          newSectorColor === color 
                            ? "border-ring scale-110" 
                            : "border-muted hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Cor ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Prévia</Label>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="sector" 
                      style={{ 
                        backgroundColor: newSectorColor + "20",
                        color: newSectorColor,
                        borderColor: newSectorColor + "40"
                      }}
                    >
                      {newSectorName || "Nome do Setor"}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddSector}>
                    Adicionar Setor
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {sectors.length} setor{sectors.length !== 1 ? "es" : ""} cadastrado{sectors.length !== 1 ? "s" : ""}
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sectors.map((sector) => (
              <div 
                key={sector.id} 
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/20"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="font-medium">{sector.name}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Edit button - for future implementation */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0"
                    title="Editar setor"
                    disabled
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  
                  {/* Remove button - only show if sector has no tasks */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => onRemoveSector(sector.id)}
                    title="Remover setor"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {sectors.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum setor cadastrado</p>
              <p className="text-sm">Adicione o primeiro setor para começar</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}