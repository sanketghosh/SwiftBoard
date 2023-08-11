import { AppIcon } from "../assets";

export default function AppLogo() {
  return (
    <div className="flex items-center gap-1 text-3xl font-extrabold">
      <AppIcon />
      <h1>SwiftBoard</h1>
    </div>
  );
}
