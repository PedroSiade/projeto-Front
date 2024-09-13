"use client";

import ClientsTable from "@/details/clients/table";
import React, { useCallback, useRef, useState } from "react";
import Title from "@/components/Title";
import Papa from "papaparse";
import { handleData } from "@/details/clients/server";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Clients() {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const onMediaChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const innerFile = event.target.files[0];
        Papa.parse(innerFile, {
          header: true,
          delimiter: ", ",
          complete: async (results) => {
            await handleData(results.data as Record<string, unknown>[]);
            await queryClient.invalidateQueries({
              queryKey: ["clients"],
            });
          },
        });
        console.log(innerFile);
        setFile(innerFile);
      } else {
        setFile(undefined);
      }
    },
    [queryClient],
  );
  return (
    <div className={"flex flex-col gap-10 pt-10 overflow-hidden"}>
      <Title title={"Lista de Clientes"} />
      <ClientsTable />
      <div className={"flex justify-end"}>
        <input
          ref={inputRef}
          onChange={onMediaChange}
          type="file"
          accept={".csv"}
          className={"hidden"}
        />
        <Button
          className={cn(
            "flex w-fit cursor-pointer justify-center gap-x-3 p-2 text-sm text-black",
          )}
          onClick={(event) => {
            event.preventDefault();
            if (inputRef.current) {
              inputRef.current.click();
            }
          }}
        >
          Adicionar clientes
        </Button>
      </div>
    </div>
  );
}
