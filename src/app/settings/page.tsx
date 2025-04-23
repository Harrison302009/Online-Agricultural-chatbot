import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import SettingsContainer from "./components/container/container";

export default async function Settings() {
  const session = await getServerSession();
  return (
    <SettingsContainer
      name={`${session.user.name}`}
      email={`${session.user.email}`}
      joined={`${session.user.emailVerified}`}
      lastSeen={`${session.user.lastLogin}`}
      country={`${session.user.country}`}
      phone={`${session.user.phoneNumber}`}
      image={`${session.user.image}`}
      role={`${session.user.role}`}
    />
  );
}
