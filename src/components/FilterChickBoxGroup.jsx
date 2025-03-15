import { RadioGroup, Radio, CheckboxGroup, Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { CasesContext } from "./../store/cases-context.jsx";

export default function FilterCheckboxGroup({ name, options, type = "radio" }) {
  const { filters, setFilters } = useContext(CasesContext);
  const [selected, setSelected] = useState(type === "radio" ? "" : []);

  const handleFilterChange = (newSelection) => {
    setSelected(newSelection);
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (newSelection === "all" || newSelection.length === 0) {
        delete updatedFilters[name];
      } else {
        updatedFilters[name] = newSelection;
      }

      return updatedFilters;
    });
  };

  return (
    <div className="flex flex-col">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="w-full text-left">
            {name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={name}
          selectionMode={type === "radio" ? "single" : "multiple"}
          selectedKeys={selected}
          onSelectionChange={(keys) => handleFilterChange(Array.from(keys))}
        >
          {options.map((option, index) => (
            <DropdownItem key={option.value} color={option.color}>
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
