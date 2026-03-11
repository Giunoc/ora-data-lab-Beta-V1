import { Link, Outlet } from "react-router";
import DataLabLogoIconOnly from "./assets/data-lab-logo-icon-only.svg";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-primary">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img
              src={DataLabLogoIconOnly}
              alt="ORA! Data Lab"
              className="w-16"
            />
            ORA! Data Lab
          </Link>
          <nav className="flex gap-6">
            <Link to="/pensioni" className="hover:underline">
              Pensioni
            </Link>
            <Link to="/energia" className="hover:underline">
              Energia
            </Link>
            <Link to="/istruzione" className="hover:underline">
              Istruzione
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-text-inverse">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm">
              © {new Date().getFullYear()} ORA! Data Lab. Tutti i diritti
              riservati.
            </p>
            <nav className="flex gap-4 text-sm">
              <Link to="/design-system" className="hover:underline">
                Design System
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
