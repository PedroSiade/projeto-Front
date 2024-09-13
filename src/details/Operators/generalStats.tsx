import { cn } from "@/lib/utils";
import { Operator } from "./index";

interface SquareStatsType {
  id: string;
  label: string;
  quantity: number;
}

interface GeneralStatsProps {
  operatorList: Operator[];
}

export default function GeneralStats({ operatorList }: GeneralStatsProps) {
  const squares: SquareStatsType[] = [
    {
      id: "operators-lenght",
      label: "Quantidade de operadores",
      quantity: operatorList.length,
    },
    {
      id: "online-operators",
      label: "Operadores online",
      quantity: 1,
    },
  ];
  return (
    <div
      className={
        "grid h-fit grid-cols-3 gap-5 max-[450px]:grid-cols-2 md:w-[280px] md:grid-cols-1 md:grid-rows-3"
      }
    >
      {squares.map((s) => (
        <div
          key={s.id}
          className={cn(
            "flex flex-shrink-0 flex-grow-0 flex-col justify-between gap-y-2 rounded-xl bg-secondary px-4 py-6 md:gap-y-6",
            s.label === "Chats em atendimento" && "max-[450px]:col-span-2",
          )}
        >
          <span className={"text-sm text-muted-foreground md:text-sm "}>
            {s.label}
          </span>
          <span className={"text-2xl md:text-5xl"}>{s.quantity}</span>
        </div>
      ))}
    </div>
  );
}
