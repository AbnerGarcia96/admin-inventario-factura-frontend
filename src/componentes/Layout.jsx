import SideMenu from "./SideMenu";

export default function Layout({ children }) {
  // console.log("LAYOUT");
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideMenu />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
