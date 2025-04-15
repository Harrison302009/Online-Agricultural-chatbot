import { atom } from "jotai";
import { User } from "../admin/page";

type Price = {
  name: string;
  price: number[];
};
export type Specifics = {
  id: string;
  role: string;
  email: string | null;
  password: string | null;
  name: string | null;
  image: string | null;
  receivedMessage: boolean;
  ApplicationStatus: string | null;
  hasPendingApplications: boolean;
  isBanned: boolean;
  status: string;
  plan: string;
  lastLogin: Date;
  emailVerified: Date | null;
  phoneNumber: string | null;
  bio?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  education?: string;
  country: string;
  address: string;
};
export const pricer = atom<Price[]>([]);
export const currencySymbol = atom<string>("$");

export const userCount = atom<number>(0);

export const TotalUsersHandle = atom<Specifics[]>([]);
