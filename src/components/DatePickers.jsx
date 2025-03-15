



import  { useState, useEffect, } from 'react';
import { DatePicker } from '@heroui/react';
import { now,  getLocalTimeZone } from '@internationalized/date';

export default function DatePickers({ref,isInert}) {

  const [entryDate, setEntryDate] = useState(now(getLocalTimeZone()));
  const [dueDate, setDueDate] = useState(now(getLocalTimeZone()).add({days: 2}));




// useEffect(() => {
//   if (reff.current){
//     if(isInert){reff.current.setAttribute("inert",0)}else{
//       reff.current.removeAttribute("inert")
//     }
//   }
//   }, [isInert]);
  useEffect(() => {
    // Update dueDate when entryDate changes
    setDueDate((p)=>p=entryDate.add({ days: 2 }));
  }, [entryDate]);

  const handleEntryDateChange = (newDate) => {
    setEntryDate(newDate);
  };

  return (
    <div inert={0} className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
      {/* Entry Date Picker */}
      <DatePicker 
   
      
       hideTimeZone={true}
      
       
        value={entryDate}
       
        onChange={handleEntryDateChange}
        label="Entry Date"
        variant="bordered"
      />

      {/* Due Date Picker */}
      <DatePicker
    

        hideTimeZone={true}

           value={dueDate}
        
        label="Due Date"
        variant="bordered"
         // Optional: Disable due date picker if it should be readonly
      />
    <div ref={ref}>
      <input type="hidden" name="entryDate"  value={entryDate.toLocaleString().slice(0,19)} />
      <input type="hidden" name="dueDate" value={ dueDate.toLocaleString().slice(0,19) }/></div>
    </div>
  )
}
