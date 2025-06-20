import DashboardHome from "../Pages/Dashboard/DashboardHome";
import NavBar from "../Pages/Shared/NavBar";

const Dashboard = () => {
  return (
    <div>
      <div>
        <NavBar></NavBar>
        <DashboardHome />
      </div>
    </div>
  );
};

export default Dashboard;
