import { atom } from "jotai";

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

export const plans = atom<Price[]>([
  {
    name: "Free",
    price: [0],
  },
  {
    name: "Basic",
    price: [12.99],
  },
  {
    name: "Premium",
    price: [49.99],
  },
]);
export const styles = {
  container: { display: "flex", height: "100vh", backgroundColor: "#f9fafb" },
  sidebar: {
    width: "16rem",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "0 0.5rem 0.5rem 0",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    padding: "1rem",
    fontSize: "1.125rem",
    fontWeight: "bold",
    borderBottom: "1px solid #e5e7eb",
  },
  nav: {
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  navLink: {
    display: "block",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#f3f4f6",
    textDecoration: "none",
    color: "#1f2937",
    transition: "background-color 0.2s",
  },
  navLinkHover: { backgroundColor: "#e5e7eb" },
  footer: { padding: "1rem", borderTop: "1px solid #e5e7eb" },
  logoutButton: {
    width: "100%",
    padding: "0.5rem 1rem",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  logoutButtonHover: { backgroundColor: "#dc2626" },
  main: { flex: 1 },
  header: {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    borderBottomLeftRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
  },
  headerTitle: { fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" },
  section: { padding: "1.5rem" },
  card: {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    padding: "1.5rem",
  },
  cardText: { color: "#6b7280" },
};
export const pricer = atom<Price[]>([]);
export const currencySymbol = atom<string>("$");

export const userCount = atom<number>(0);

export const TotalUsersHandle = atom<Specifics[]>([]);
export const AdminCapacity = atom<boolean>(false);
