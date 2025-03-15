



'use client'; 

import { useEffect, useState, useCallback } from 'react';

import TableReuseable from "./../../../../components/TableReuseable";
import axios from 'axios';
const INITIAL_VISIBLE_COLUMNS = ["username", "role", "email", "actions"];
 const columns = 
[
  {name: "ID", uid: "_id", sortable: true},
  {name: "NAME", uid: "username", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
 
  {name: "EMAIL", uid: "email"},
  // {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];





const usersList=()=>{
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`/api/users`, {
          headers: {
            "Cache-Control": "no-store, no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        return response.data.users; // Assuming API returns { users: [...] }
      } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Return an empty array on error
      }
    };
    fetchUsersData().then((data) => setUsers(data));
  }
  ,[])

  return(
      <div className="">
          <TableReuseable columns={columns} users={users} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}  />
          </div>
  )

}
export default usersList