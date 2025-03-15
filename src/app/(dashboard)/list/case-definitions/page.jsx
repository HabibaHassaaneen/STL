



'use client'; 
import CaseDefinitionModal from "./../../../../components/CaseDefinitionModal";
import TableReuseable from "./../../../../components/TableReuseable";
import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
const INITIAL_VISIBLE_COLUMNS = ["name",'actions'];
 const columns = 
[
  {name: "ID", uid: "_id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "ACTIONS", uid: "actions"},

];



const definitionsList=()=>{
  const [users,setUsers]=useState([]);
  const [refresh,setRefresh]=useState(0);
  useEffect(()=>{
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`/api/case-definition`, {
          headers: {
            "Cache-Control": "no-store, no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        console.log(response.data["case-definition"])
        return response.data["case-definition"]; // Assuming API returns { users: [...] }
      } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Return an empty array on error
      }
    };
    fetchUsersData().then((data) => setUsers(data));
  }
  ,[refresh])
  const addCaseDefinition = async (enteredCaseData) => {
    try {
      await axios.post('/api/case-definition', enteredCaseData);
      setRefresh((prev)=>prev+1)
    } catch (error) {
      console.error('Error adding case:', error);
    }
  };
  
  
  return(
      <div className="">
          <TableReuseable newForm={ <CaseDefinitionModal endpoint={'Case Definition '} onCaseDefinitionAdded={addCaseDefinition}/>} columns={columns} users={users} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}  />
          </div>
  )

}

export default definitionsList
