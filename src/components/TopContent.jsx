
'use client'
import { useMemo } from "react";
export const PlusIcon = ({size = 24, width, height, ...props}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M6 12h12" />
          <path d="M12 18V6" />
        </g>
      </svg>
    );
  };
  
import FilterAccordion from "@/components/FilterAccordion";
import ModalButton from "@/components/ModalButton";

import CaseForm from "@/components/CaseForm";
export default function TopConten({totalCases}){
    return (
      <div className="flex flex-col gap-4">
          <FilterAccordion  name={["doctors",
  "case-definition",
  "designers",
  "status"]}/>
        <div className="flex justify-between gap-3 items-end">
      
    
          <div className="flex gap-3">
  
            <ModalButton color="primary" endContent={<PlusIcon />}>
            <CaseForm/>
            </ModalButton>
          </div>
         
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {totalCases} cases</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
            
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    
    );
  }