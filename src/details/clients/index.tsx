"use client";

import ClientsTable from "@/details/clients/table";
import React, { useCallback, useState } from "react";
import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import { handleData } from "@/details/clients/server";
import { useQueryClient } from "@tanstack/react-query";

export default function Clients() {
  const [file, setFile] = useState<File>();
  const queryClient = useQueryClient();

  const onMediaChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        console.log("entrei");
        const innerFile = event.target.files[0];
        console.log("innerFile", innerFile);
        Papa.parse(innerFile, {
          /*step: (results) => {
            const result = rowSchema.safeParse(results.data);
            if(result.success)
          },
           */
          header: true,
          delimiter: ", ",
          complete: async (results) => {
            console.log("complete", results);
            await handleData(results.data as Record<string, unknown>[]);
            await queryClient.invalidateQueries({
              queryKey: ["clients"],
            });
          },
        });
        setFile(innerFile);
      } else {
        setFile(undefined);
      }
    },
    [],
  );
  return (
    <div className={"flex flex-col gap-10 pt-10 mx-10"}>
      <Title title={"Lista de Clientes"} />
      <ClientsTable />
      <div className={"flex flex-row justify-end w-full"}>
        <Input type={"file"} accept={".csv"} onChange={onMediaChange} />
      </div>
    </div>
  );
}
