import React from "react";
import {useState,useEffect} from "react"
import {Autocomplete, AutocompleteItem} from "@heroui/react";
import axios from "axios";
import mongoose from 'mongoose';



export default function List({ref,name,endpoint,label}) {
   
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
    useEffect(() => {
        const url =`/api/${endpoint}`;
      // Fetch doctors and designers when component mounts
          axios.get(url).then(response => setData(response.data[endpoint]));
         
    }, []);

    const onInputChange = (value) => {
      setValue(value);
    };
  const onSelectionChange = (id) => {
    setSelectedKey(  id);
  
  };

 

  return (
    <div className="flex w-full flex-col">
      <Autocomplete
    
        allowsCustomValue={true}
        className="max-w-xs"
        label={`Search a ${label}`}
        variant="bordered"
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        isRequired
        type="text"

       

   
      >
        {data.map((item) => <AutocompleteItem   color="primary"
       variant={"flat"} key={item._id}>{item.name}</AutocompleteItem>)}
      </Autocomplete>
      <input type="hidden"     name={name} ref={ref}  value={ selectedKey?selectedKey:""}  />
    
    </div>
  );
}




