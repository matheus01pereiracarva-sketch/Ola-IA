"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, CheckCircle, Circle } from "lucide-react";

interface Tarefa {
  id: number;
  titulo: string;
  data_criacao: string;
  status: string;
  data_conclusao?: string;
}

const Tarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [titulo, setTitulo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTarefas = async () => {
    try {
      const { data, error } = await supabase
        .from("tarefas")
        .select("*")
        .order("data_criacao", { ascending: false });
      
      if (error) throw error;
      setTarefas(data || []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo.trim()) return;

    try {
      if (editingId !== null) {
        // Atualizar tarefa existente
        const { error } = await supabase
          .from("tarefas")
          .update({ 
            titulo,
            status: "pendente"
          })
          .eq("id", editingId);
        
        if (error) throw error;
      } else {
        // Criar nova tarefa
        const { error } = await supabase
          .from("tarefas")
          .insert([{ titulo }]);
        
        if (error) throw error;
      }
      
      setTitulo("");
      setEditingId(null);
      fetchTarefas();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };

  const handleEdit = (tarefa: Tarefa) => {
    setTitulo(tarefa.titulo);
    setEditingId(tarefa.id);
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("tarefas")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      fetchTarefas();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const toggleStatus = async (id: number, status: string) => {
    try {
      const newStatus = status === "pendente" ? "concluída" : "pendente";
      const data_conclusao = newStatus === "concluída" ? new Date().toISOString() : null;
      
      const { error } = await supabase
        .from("tarefas")
        .update({ 
          status: newStatus,
          data_conclusao
        })
        .eq("id", id);
      
      if (error) throw error;
      fetchTarefas();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando tarefas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gerenciador de Tarefas</h1>
          <p className="text-gray-600">Organize suas tarefas diárias de forma simples</p>
        </div>

        {/* Formulário de criação/edição */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? "Editar Tarefa" : "Nova Tarefa"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Digite o título da tarefa..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                {editingId ? "Atualizar" : <Plus className="w-4 h-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de tarefas */}
        <div className="space-y-4">
          {tarefas.map((tarefa) => (
            <Card key={tarefa.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleStatus(tarefa.id, tarefa.status)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {tarefa.status === "concluída" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <h3 className={`font-medium ${tarefa.status === "concluída" ? "line-through text-gray-500" : "text-gray-800"}`}>
                        {tarefa.titulo}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={tarefa.status === "concluída" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {tarefa.status === "concluída" ? "Concluída" : "Pendente"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Criada: {new Date(tarefa.data_criacao).toLocaleDateString()}
                        </span>
                        {tarefa.data_conclusao && (
                          <span className="text-xs text-gray-500">
                            Concluída: {new Date(tarefa.data_conclusao).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(tarefa)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(tarefa.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tarefas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhuma tarefa encontrada</p>
            <p className="text-sm text-gray-400">Crie sua primeira tarefa acima!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tarefas;