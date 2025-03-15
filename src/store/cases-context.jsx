'use client'; 
import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import qs from "qs"; // Import qs for query string serialization

import { addToast } from "@heroui/react"; // ✅ Import addToast from Hero UI

export const CasesContext = createContext({
  cases: [],
  totalCases: 0,
  page: 1,
  allCases: [],
  filters: {},
  setFilters: () => {},
  setPage: () => {},
  addCase: () => {},
  updateCase: () => {},
  refreshCases: () => {},
  // currentUser:null
});
export function CasesContextProvider({ children }) {
  const [cases, setCases] = useState([]);
  // const [currentUser,setCurrentUser]= useState({});
  const [totalCases, setTotalCases] = useState(0);
  const [page, setPage] = useState(1);
  const [allCases, setAllCases] = useState([]);
  const [filters, setFilters] = useState({
  });
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch cases based on page

  const fetchCases = useCallback(async (currentPage = page, limit = 5) => {
    try {
      const response = await axios.get('/api/cases', {
        params: { page: currentPage, limit, ...filters },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
        headers: {
          "Cache-Control": "no-store, no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setCases(response.data.cases);
      setTotalCases(response.data.totalCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  }, [page, filters]);
  // const fetchCurrentUser = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     // Updated endpoint to match your API implementation
  //     const response = await axios.get('/api/auth/get-token', {
  //       headers: {
  //         "Cache-Control": "no-store, no-cache",
  //         Pragma: "no-cache",
  //         Expires: "0",
  //       },
  //     });
  //     // console.log(response.data['user'][0])


      
    
  //       // setCurrentUser(response.data['user']?[0]||null);
    
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //     addToast({ title: "plese sign in ", type: "error" }); // ✅ Hero UI toast
  //     setCurrentUser(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);
  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []); 
  useEffect(() => {
  
    fetchCases(page, 5);
  }, [page]); // ✅ Only depends on page
  
  useEffect(() => {
    if (page !== 1) {
      setPage(1); // ✅ Only reset if page is not 1 to avoid redundant fetch
    } else {
      fetchCases(1, 5); // ✅ Ensure paginated cases are updated too
   
    }
  }, [filters]); // ✅ Runs only when filters change
  

  // ✅ Refresh both lists
  const refreshCases = async () => {
    await Promise.all([fetchCases()]);
  };

  const updateCase = async (id, updatedCaseData) => {
    try {
      await axios.put(`/api/cases/${id}`, updatedCaseData);
      refreshCases();
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  const addCase = async (enteredCaseData) => {
    try {
      await axios.post('/api/cases', enteredCaseData);
      refreshCases();
    } catch (error) {
      console.error('Error adding case:', error);
    }
  };

  // const handleSetFilters = (newFilters) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     ...newFilters,
  //   }));
  //   setPage(1); // Reset pagination when filters change
  // };
  
  const contextValue = {
    cases,
    totalCases,
    allCases,
    page,
    filters,
    setFilters,
    setPage,
    addCase,
    updateCase,
    refreshCases,
    // currentUser
  };

  return <CasesContext.Provider value={contextValue}>{children}</CasesContext.Provider>;
}
