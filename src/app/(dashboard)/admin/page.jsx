"use client";

import { useContext, useEffect } from "react";
import { CasesContext } from "../../../store/cases-context";
import { AuthContext } from "../../../store/auth-context";
import CasesTable from "../../../components/CasesTable";
import { useRouter } from "next/navigation";

const AdminPage =  () => {
  const router = useRouter();
  const { cases, page, setPage, totalCases, allCases, priorityFilter } = useContext(CasesContext);
  const { isAuthenticated, isLoading, checkAuth, currentUser } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/signin");
    return null;
  }

  let role =  currentUser?.role;

  return (
    <div className="w-full bg-white p-4 flex gap-4 flex-col md:flex-row">
      <CasesTable
        cases={cases}
        role={role}
        page={page}
        setPage={setPage}
        totalCases={totalCases}
        allCases={allCases}
        priorityFilter={priorityFilter}
      />
    </div>
  );
};

export default AdminPage;
