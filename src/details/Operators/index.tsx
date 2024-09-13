"use client";

import React, { useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import GeneralStats from "@/details/Operators/generalStats";
import { Button } from "@/components/ui/button";
import Title from "@/components/Title";
import axios, { AxiosResponse } from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Operator {
  id: number;
  name: string;
}

const fetchData = async () => {
  try {
    const response: AxiosResponse<Operator[]> = await axios.get(
      "http://localhost:8080/operador/",
    );
    console.log("Dados recebidos:", response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default function Operators() {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<"create" | "update">();
  const { data: operatorList } = useQuery({
    queryKey: ["operators"],
    queryFn: () => {
      return fetchData();
    },
  });
  const queryClient = useQueryClient();

  const deleteOperator = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/operador/${id}`);
      await queryClient.invalidateQueries({
        queryKey: ["operators"],
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  if (!operatorList) return <></>;
  return (
    <div className="flex flex-col mt-10 text-gray-950 mx-5 sm:mx-10 overflow-hidden">
      <Title title="Operadores" />
      <div className="flex flex-col md:flex-row w-full gap-10 mt-10">
        <GeneralStats operatorList={operatorList} />
        <div className="flex flex-col w-full overflow-hidden">
          <ul className="flex flex-col gap-2 overflow-y-auto grow">
            {operatorList.map((operator) => (
              <li
                key={operator.id}
                className="flex justify-between items-center rounded-2xl hover:bg-slate-50/[80%] border py-5 px-5 max-w-[650px]"
              >
                <span>{operator.name}</span>
                <div className="flex gap-2 items-center">
                  <Button
                    size="icon"
                    variant={"ghost"}
                    className={"hover:bg-secondary"}
                    onClick={() => {
                      setOpen(true);
                      setDialogType("update");
                    }}
                  >
                    <Pencil size={20} className="text-black" />
                  </Button>
                  <Button
                    size="icon"
                    variant={"ghost"}
                    className={"hover:bg-secondary"}
                    onClick={() => deleteOperator(operator.id)}
                  >
                    <X size={20} className="text-black" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Button
          className="flex flex-shrink-0 cursor-pointer"
          onClick={() => {
            setOpen(true);
            setDialogType("create");
          }}
        >
          <p className="text-black sm:hidden">Adicionar Operadores</p>
          <Plus className="text-black hidden sm:block" />
        </Button>
        <Teste open={open} setOpen={setOpen} dialogType={dialogType} />
      </div>
    </div>
  );
}

interface TesteProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogType: "create" | "update" | undefined;
  open: boolean;
}

const Teste = ({ open, setOpen, dialogType }: TesteProps) => {
  const [operator, setOperator] = useState<string>("");
  const queryClient = useQueryClient();
  const createOperator = async (name: string) => {
    try {
      await axios.post("http://localhost:8080/operador/", { name });
      await queryClient.invalidateQueries({
        queryKey: ["operators"],
      });
      setOpen(false);
      setOperator("");
    } catch (error) {
      console.error("Erro ao criar operador:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {dialogType === "create" ? "Adicione um" : "Atualize o"} operador
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4 mt-2">
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input
            id="name"
            placeholder={
              dialogType === "create"
                ? "Digite o nome do operador"
                : "Corrija o nome do operador"
            }
            className="col-span-3"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={(event) => {
              event.preventDefault();
              createOperator(operator);
            }}
          >
            {dialogType === "create" ? "Criar" : "Atualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
