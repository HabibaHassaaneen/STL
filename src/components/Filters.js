import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { CasesContext } from "./../store/cases-context.jsx";

// Predefined status options
const statusOptions = [
  { name: "Accepted", _id: "Accepted" },
  { name: "Rejected", _id: "Rejected" },
  { name: "Missing Info", _id: "Missing Info" },
];

// ChevronDownIcon Component
const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Utility function to capitalize strings
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "");

// Filters Component
export default function Filters({ name }) {
  const { filters, setFilters } = useContext(CasesContext);
  const [data, setData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(filters[name] || []));

  // Fetch data on mount or when `name` changes
  useEffect(() => {
    if (name === "status") {
      setData(statusOptions);
      setSelectedKeys(new Set(filters[name] || [])); // ✅ Ensure selectedKeys updates
    } else {
      axios
      .get(`/api/${name}`, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }) // ✅ Removed misplaced parenthesis
      .then((response) => {
        console.log(response.data[name]);
    
        setData(response.data[name]);
        setSelectedKeys(new Set(filters[name] ?? [])); // ✅ Ensure selectedKeys updates after fetch
      })
      .catch((error) => console.error(`Error fetching ${name}:`, error));
    
    }
  }, [name, filters]); // ✅ Re-run when filters change

  // Update filters when selection changes
  const handleSelectionChange = (keys) => {
    const newSelection= new Set(keys)//coplete
    console.log(newSelection);
    setSelectedKeys(new Set(newSelection));

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (newSelection.length === 0) {
        delete updatedFilters[name]; // ✅ Remove key if empty
      } else {
        updatedFilters[name] = Array.from(newSelection);//convertfrom set to array 
      }
console.log(updatedFilters)
      return updatedFilters;
    });
  };

  return (
    <Dropdown className="w-full">
      <DropdownTrigger className="hidden sm:flex">
        <Button className="text-start" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
          {capitalize(name)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={`${name} Filters`}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange} // ✅ Corrected event handler
        variant="flat"
        closeOnSelect={false}
      >
        {data.map((option) => (
          <DropdownItem key={option._id} className="capitalize">
            {capitalize(option.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
