import Image from "next/image";
import styles from "./page.module.css";
import icon from "@/public/next.svg"
import OptionSelect from "@/components/OptionSelect";

export default function Home() {
  return (
    <div>
      <OptionSelect>
        hi
      </OptionSelect>
      <Image src={icon}></Image>
    </div>
  );
}
