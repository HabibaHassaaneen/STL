



'use client'; 

import { useEffect, useState, useCallback } from 'react';
import CaseDefinitionModal from "@/components/CaseDefinitionModal";
import TableReuseable  from '@/components/TableReuseable';
import axios from 'axios';
const INITIAL_VISIBLE_COLUMNS = ["name",'actions'];
 const columns = 
[
  {name: "ID", uid: "_id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "ACTIONS", uid: "actions"},

];





const designersList=()=>{
  const [users,setUsers]=useState([]);
  const [refresh,setRefresh]=useState(0);
  useEffect(()=>{
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`/api/designers`, {
          headers: {
            "Cache-Control": "no-store, no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        console.log(response.data.designers)
        return response.data.designers; // Assuming API returns { users: [...] }
      } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Return an empty array on error
      }
    };
    fetchUsersData().then((data) => setUsers(data));
  }
  ,[refresh])
  const add = async (enteredCaseData) => {
    try {
      await axios.post('/api/designers', enteredCaseData);
      setRefresh((prev)=>prev+1)
    } catch (error) {
      console.error('Error adding designer:', error);
    }
  };
  

  return(
      <div className="">
          <TableReuseable newForm={ <CaseDefinitionModal endpoint={'designer'} onCaseDefinitionAdded={add}/>} columns={columns} users={users} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}  />
          </div>
  )

}
export default designersList