import { Sidebar, Header } from "../ui";

function dashboardLayout({ children }) {
  return (
    <main className="p-2 overflow-hidden h-screen min-h-screen">
      <div className="grid grid-cols-[250px_1fr] gap-2 h-full">
        <Sidebar />
        <div className="flex flex-col gap-2 w-full h-full overflow-hidden">
          <Header />
          <div className="flex-1 overflow-hidden rounded-[8px]">
            <div className="hidden-scrollbar h-full overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default dashboardLayout;
