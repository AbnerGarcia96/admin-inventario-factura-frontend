import SideMenu from "./SideMenu";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideMenu />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
