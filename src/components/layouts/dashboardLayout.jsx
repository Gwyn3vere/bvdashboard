import { Sidebar, Header } from "../ui";

function dashboardLayout({ children }) {
  return (
    <main>
      <div className="flex gap-2">
        <Sidebar />
        <div className="flex flex-col h-screen gap-2 w-full">
          <Header />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default dashboardLayout;
