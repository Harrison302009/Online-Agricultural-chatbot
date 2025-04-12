import { atom } from "jotai";

type Price = {
  name: string;
  price: number[];
};
export const pricer = atom<Price[]>([]);
export const currencySymbol = atom<string>("$");
