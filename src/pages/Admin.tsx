
import Header from "@/components/Header";
import AdminDashboard from "@/components/AdminDashboard";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdmin={true} />
      <AdminDashboard />
    </div>
  );
};

export default Admin;
