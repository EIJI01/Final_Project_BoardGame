import { useEffect, useState } from "react";
import SkeletonDefalse from "../components/skeleton/Skeleton";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   const setIsLoading = () => {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 5000);
  //   };
  //   setIsLoading();
  // }, []);
  useEffect(() => {
    window.location.replace("/branch-manage");
  }, []);

  if (loading) {
    return <SkeletonDefalse />;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
