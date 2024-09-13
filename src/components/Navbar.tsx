import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className={
        "h-[50px] fixed top-0 w-full bg-slate-800 flex flex-row justify-center "
      }
    >
      <div className={" flex justify-between items-center container"}>
        <Image
          src={
            "https://sinkalogistica.com.br/src/wp-content/uploads/2024/08/logo.svg"
          }
          alt={"logo"}
          height={100}
          width={100}
        />
        <div className={"flex justify-center items-center gap-x-3"}>
          <Link href="/" className={"hover:text-primary"}>
            Operadores
          </Link>
          <Link href="/clientes" className={"hover:text-primary"}>
            Clientes
          </Link>
        </div>
      </div>
    </nav>
  );
}
