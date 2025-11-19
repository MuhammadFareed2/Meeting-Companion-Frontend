import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full min-w-0">
        <Navbar />
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
