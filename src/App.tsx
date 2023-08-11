import { AppIcon } from "./assets";
import { AppLogo, KanbanBoard } from "./components";

export default function App() {
  return (
    <main>
      <header className="flex items-center justify-center py-6 select-none text-teal-400">
        <AppLogo />
      </header>
      <div className="m-auto flex min-h-[80vh] w-full items-center overflow-x-auto overflow-y-hidden px-10">
        <KanbanBoard />
      </div>
    </main>
  );
}
