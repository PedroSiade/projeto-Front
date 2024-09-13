"use server";

import { prisma } from "@/database";
import { z } from "zod";
const rowSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  valor: z.coerce.number(),
  nascimento: z.coerce.date(),
});

export async function handleData(results: Record<string, unknown>[]) {
  const operators = await prisma.operator.findMany();
  for (const result of results) {
    const index = results.findIndex(
      (res) => res.nome === result.nome && res.email === result.email,
    );
    try {
      const data = rowSchema.parse(result);
      const operator = operators.at(index % operators.length);
      await prisma.client.create({
        data: {
          name: data.nome,
          email: data.email,
          value: data.valor,
          birthDate: data.nascimento,
          operator: {
            connect: {
              id: operator?.id,
            },
          },
        },
      });
    } catch (err) {}
  }
  return;
}
