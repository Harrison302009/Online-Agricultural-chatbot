import { atom } from 'jotai';
import { data } from '../dashboard/components/countries/countries';
import { getServerSession } from '@/modules/auth/lib/get-server-session/get-server-session';

type Price = {
    name: string;
    price: number[]
}
export const pricer = atom<Price[]>([]);
export const currencySymbol = atom<string>("$")