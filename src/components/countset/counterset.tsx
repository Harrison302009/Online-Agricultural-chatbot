import { userCount } from "@/app/prices/prices";
import { useAtom } from "jotai";

export default async function CountSetter() {
    const [count, setCount] = useAtom(userCount);
    const countValue = await usercounter()
}