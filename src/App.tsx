import { AppLogo, KanbanBoard } from "./components";

export default function App() {
  return (
    <main>
      <header className="flex items-center justify-center py-6 select-none z-0">
        <AppLogo />
      </header>
      <div className="m-auto flex min-h-[86vh] w-full items-center overflow-x-auto overflow-y-hidden px-10 z-30">
        <KanbanBoard />
      </div>
    </main>
  );
}
