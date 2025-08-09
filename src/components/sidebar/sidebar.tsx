import { styles } from "@/app/atom-data/atom-data";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const router = useRouter();
  return (
    <aside
      style={{
        width: "16rem",
        backgroundColor: "#ffffff",
        color: "#1f2937",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "0 0.5rem 0.5rem 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={styles.sidebarHeader}>Admin Panel</div>
      <nav
        style={{
          flex: 1,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin");
          }}
          style={styles.navLink}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.navLinkHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.navLink.backgroundColor)
          }
        >
          Dashboard
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/users");
          }}
          style={styles.navLink}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.navLinkHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.navLink.backgroundColor)
          }
        >
          Users
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.push("/settings");
          }}
          style={styles.navLink}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.navLinkHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.navLink.backgroundColor)
          }
        >
          Settings
        </a>
      </nav>
      <div style={styles.footer}>
        <button
          style={styles.logoutButton}
          onClick={() => router.push("/auth/logout")}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.logoutButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.logoutButton.backgroundColor)
          }
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
