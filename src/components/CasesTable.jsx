'use client'
import { useState ,useMemo,useCallback } from "react";
import { useContext } from "react";
import { CasesContext } from "./../store/cases-context.jsx";
import {  Avatar,Tooltip, } from "@heroui/react";
import ActionChick from "./ActionChick"; // Assuming this is a custom component
import DeadlineProgress from "./DeadlineProgress"; // Assuming this is a custom component
import ModalButton from "./ModalButton";
import CaseForm from "./CaseForm";
import FilterAccordion from "./FilterAccordion";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  
} from "@heroui/react";
// import TableRowComponent from "./TableRowComponent"




export const columns = [
  { name: "No", uid: "no", sortable: true },
  { name: "Doctor Name", uid: "doctorName", sortable: true },
  { name: "Patient Name", uid: "patientName", sortable: true },
  { name: "Entry Date", uid: "entryDate", sortable: true },

  { name: "Designer", uid: "designer", sortable: true },
  { name: "Case Definition", uid: "caseDefinition", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Designed Deadline Date", uid: "designedDeadlineDate" },
  { name: "Designed", uid: "designed" },
  { name: "Try In", uid: "tryIn" },
  { name: "Confirmed", uid: "confirmed", sortable: true },
  { name: "Confirmed Date", uid: "confirmedDate" },
  { name: "Production Deadline Date", uid: "productionDeadlineDate" },
  { name: "Production", uid: "production" },
  { name: "Delivered", uid: "delivered" },
  { name: "ACTIONS", uid: "actions" },


];
export const EyeIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const   priorityOrder = {
  " high":1,
  " medium":2,
  " low":3,
  " No periority ":4
};

const statusColors = {
  Accepted: "success",
  Rejected: "danger",
  "Missing Info": "warning",
};

const caseDefinitionColors = {
  "Crown and Bridge": "primary",
  "Surgical Guide": "warning",
  "Full Arch": "success",
  Others: "secondary",
};
const confirmedColors = {
  "Try In": "warning",
  'YES': "success",
  'Redesign': "danger",
};
export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

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

export const VerticalDotsIcon = ({size = 24, width, height, ...props}) => {
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
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => {
  return (
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
};

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["doctorName", "patientName",   "designer", "caseDefinition", "status"];


const sortCasesByPriority = (cases) => {
  return cases.sort((a, b) => {
    const priorityA = getPriority(a.entryDate.slice(-1)[0], 24);
    const priorityB = getPriority(b.entryDate.slice(-1)[0],24);
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });
};

// Function to determine priority
const getPriority = ( dedline, hours) => {
  if (!dedline) return "No priority"; // ✅ Handles missing `dedline`

  const now = new Date();
  const deadlineTime = new Date(dedline).getTime(); // ✅ Safer date parsing
  
  if (isNaN(deadlineTime)) return "No priority"; // ✅ Handles invalid date formats

  const deadline = deadlineTime + hours * 60 * 60 * 1000;
  const timeLeft = deadline - now.getTime();
  const remainingHours = timeLeft / (60 * 60 * 1000);

   // ✅ Moved up for clarity
  if (remainingHours <= 12) return "high";
  if (remainingHours <= 24) return "medium";
  
  return "low";
};


export default function CasesTable({ role,cases, page, setPage, totalCases,allCases,priorityFilter }) {

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    // const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
      column: "age",
      direction: "ascending",
    });
    // const { cases, page, setPage, totalCases,allCases,priorityFilter } = useContext(CasesContext);
    // const [sortedCases, setSortedCases] = useState([]);

    // useEffect(() => {
    //   setSortedCases(sortCasesByPriority(cases));
    // }, [cases])
    // Fetch cases when the page changes

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);
    // const filteredItems = useMemo(() => {
    //   let filteredCases = [...allCases]; // Use all cases, not paginated cases
    
    //   if (hasSearchFilter ) {
    //     filteredCases = filteredCases.filter(
    //       (originalCase) =>
    //         originalCase.doctor_id?.name?.toLowerCase().includes(filterValue.toLowerCase())
    //     );
    //   }
    
    
    
    //   return filteredCases;
    // }, [allCases, filterValue]);
    
  
    // Set pages dynamically
    const pages = Math.ceil(totalCases / rowsPerPage);
    
    // Ensure current page is valid after filtering
    // useEffect(() => {
    //   setPage(1); // Reset page to 1 when filters change
    // }, [filterValue, priorityFilter]);
    
    // Paginate filtered results
    // const items = useMemo(() => {
    //   const start = (page - 1) * rowsPerPage;
    //   return filteredItems.slice(start, start + rowsPerPage);
    // }, [page, filteredItems, rowsPerPage]);
    
    // const sortedItems = useMemo(() => {
    //   return [...items].sort((a, b) => {
    //     const first = a[sortDescriptor.column];
    //     const second = b[sortDescriptor.column];
    //     const cmp = first < second ? -1 : first > second ? 1 : 0;
  
    //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
    //   });
    // }, [sortDescriptor, priorityFilter]);
  
    const handleDelete = async (caseId) => {
      // if (!isAdmin) {
      //   alert("Only administrators can delete cases");
      //   return;
      // }
  
      try {
        const response = await fetch(`/api/cases/${caseId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          // Handle successful deletion (e.g., refresh the page or update state)
          window.location.reload();
          // Or use state management: setCases(cases.filter(c => c.id !== caseId));
        } else {
          const error = await response.json();
          alert(`Failed to delete: ${error.message}`);
        }
      } catch (error) {
        console.error("Delete operation failed:", error);
        alert("An error occurred while attempting to delete");
      }
    };
    const renderCell = useCallback((user, columnKey) => {
      const cellValue = user[columnKey];
  
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{radius: "lg", src: user.avatar}}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
            </div>
          );
        case "status":
          return (
            <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="view">View</DropdownItem>
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem key="delete">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);
  
    const onNextPage = useCallback(() => {
      if (page < pages) {
        setPage(page + 1);
      }
    }, [page]);
  
    const onPreviousPage = useCallback(() => {
      if (page > 1) {
        setPage(page - 1);
      }
    }, [page]);
  
    const onRowsPerPageChange = useCallback((e) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    }, []);
  
    const onSearchChange = useCallback((value) => {
      if (value) {
        setFilterValue(value);
      
      } else {
        setFilterValue("");
      }
    }, []);
  
    const onClear = useCallback(() => {
      setFilterValue("");
      setPage(1);
    }, []);
  
    const topContent = useMemo(
      () => {
      return (
        <div className="flex flex-start gap-4">
          {/* {currentUser.name} */}
            <FilterAccordion  name={["doctors",
    "case-definition",
    "designers",
    "status"]}/>
         
      
        </div>
      
      );
    }, [
      filterValue,
      priorityFilter,
      visibleColumns,
      onRowsPerPageChange,
      totalCases
      ,
    
      onSearchChange,
      hasSearchFilter,
    ]);
    const topContentAdd = useMemo(
      () => {
      return (
        <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
    
    <ModalButton color="primary" endContent={<PlusIcon />}>
    <CaseForm/>
    </ModalButton>
  </div>
           {topContent}
           
            <span className="text-default-400 text-small">Total {totalCases} cases</span>
          </div>
      
      );
    }, [
      filterValue,
      priorityFilter,
      visibleColumns,
      onRowsPerPageChange,
      totalCases
      ,
    
      onSearchChange,
      hasSearchFilter,
    ]);
    const bottomContent = useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-default-400">
            {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${totalCases} selected`}
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
          <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
              Previous
            </Button>
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
              Next
            </Button>
             
          </div>
        </div>
      );
    }, [totalCases,page, pages]);
  
    return (
      <div className=" w-full bg-white p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      {/* <div className="w-1/5   md:w-1/6 flex flex-col gap-8">
    
        </div>
         */}
     
      {/* RIGHT */}
      <div className="      w-full flex flex-col gap-1">
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
      
    
        sortDescriptor={sortDescriptor}
        topContent={topContentAdd}
        topContentPlacement="inside"
      
        onSortChange={setSortDescriptor}
      >
         <TableHeader>
          <TableColumn>No</TableColumn>
          <TableColumn>Doctor Name</TableColumn>
          <TableColumn>Patient Name</TableColumn>
          <TableColumn>Entry Date</TableColumn>
    
          <TableColumn>Designer</TableColumn>
          <TableColumn>Case Definition</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Designed dedline date</TableColumn>
          <TableColumn>Designed</TableColumn>
          <TableColumn>Try In</TableColumn>
          <TableColumn>Confirmed</TableColumn>
          <TableColumn>redesign</TableColumn>
                    <TableColumn>Confirmed date</TableColumn>
          <TableColumn>Production dedline date</TableColumn>
          <TableColumn>Production</TableColumn>
         <TableColumn>Delivered</TableColumn>
          <TableColumn>Shade</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
 
        <TableBody>
        
          {cases.map((caseItem, index) => (
                        <TableRow key={caseItem._id} className="p-0 m-0">
              <TableCell  >{index + 1}</TableCell>
              <TableCell>
              <Chip 
        avatar={<Avatar getInitials={(name) => name.charAt(3)} name={caseItem.doctor_id?.name} size="sm" />}
        variant="flat"
      >
         {caseItem.doctor_id?.name}
      </Chip>
              
                
               </TableCell>
              <TableCell>{caseItem.patientName}</TableCell>
               <TableCell className="whitespace-nowrap" >
                {new Date(caseItem.entryDate.slice(-1)[0]).toLocaleString('en-us', { timeZone: 'UTC' })}
             
                </TableCell>
             
              <TableCell>
              <Chip
        avatar={<Avatar getInitials={(name) => name.charAt(0)} name={caseItem.designer_id?.name || "N/A"} size="lg" />}
        variant="flat"
      >
          {caseItem.designer_id?.name || "N/A"}
      </Chip>
                
              </TableCell>
              <TableCell  >
      
        
                <Chip  
                
      avatar={<Avatar  className="w-20 h-20 text-large" name={caseItem.case_definition_id?.name}
      src={`/${caseItem.case_definition_id?.name}.png`}
     
             
       
       />}
      variant="light" size="lg" color={caseDefinitionColors[caseItem.case_definition_id?.name] || "default"}>
                  {caseItem.case_definition_id?.name || "Others"}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip className="capitalize" size="lg"   variant="flat" color={statusColors[caseItem.status] || "default"}>
                  {caseItem.status}
                </Chip>
              </TableCell>
              <TableCell className="whitespace-nowrap"s>
              <DeadlineProgress stop={caseItem.designed} hours={24} dedline={caseItem.entryDate.slice(-1)[0]}/>
              </TableCell>
              <TableCell>
              <ActionChick role={role} visibleTo={['admin','designer']}  id={caseItem._id} act={"designed"} isSelect={caseItem.designed}/>
{/* <form>

                <Checkbox  isSelected={caseItem.designed} onValueChange={setIsSelected} isSelected={caseItem.designed}  />
             </form>  */}
             </TableCell>
              <TableCell  >

                
              <ActionChick role={role} visibleTo={['admin']} id={caseItem._id} act={"Try_in"} isSelect={caseItem.Try_in}/>
                
              </TableCell>
             
             
              <TableCell  > 
              {/* <ConfirmationRadio name="confirmed" /> */}
            
          <Tooltip  className="capitalize" color={"primery"} content={caseItem.confirmed_date?new Date(caseItem.confirmed_date).toLocaleString('en-us', { timeZone: 'UTC' }):"-"}>
          <ActionChick role={role} visibleTo={['admin','designer']} id={caseItem._id} act={"confirmed"} isSelect={caseItem.confirmed}/>
          </Tooltip>
              
        
                
              </TableCell>
              <TableCell   > 
              {/* <ConfirmationRadio name="confirmed" /> */}
              
              <ActionChick role={role} visibleTo={['admin','designer']} id={caseItem._id} act={"redesign"} entryDate={caseItem.entryDate}  isSelect={caseItem.redesign}/>
             
        
                
              </TableCell>
              <TableCell className="whitespace-nowrap">
              {caseItem.confirmed_date?new Date(caseItem.confirmed_date).toLocaleString('en-us', { timeZone: 'UTC' }):"-"}
              </TableCell>
              <TableCell>
              <div  className="whitespace-nowrap">
              <DeadlineProgress stop={caseItem.production} hours={36} dedline={caseItem.confirmed_date}/>
            {/* <Alert color={"danger"} title={` ${caseItem.Production_dedline_date?new Date(caseItem.confirmed_date).toLocaleString('en-us', { timeZone: 'UTC' }):"-"}`} /> */}
          </div>
              </TableCell>
              <TableCell>
              <ActionChick role={role} visibleTo={['technician','admin']} id={caseItem._id} act={"production"} isSelect={caseItem.production}/>

              </TableCell>
             
              <TableCell>
              <ActionChick role={role} visibleTo={['admin','technician']} id={caseItem._id} act={"delivered"} isSelect={caseItem.delivered}/>

              </TableCell>
              <TableCell>{caseItem.shade || "-"}</TableCell>
              <TableCell>
              <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit ">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
  <span 
    onClick={() => handleDelete(caseItem._id)} 
    className="text-lg text-danger cursor-pointer active:opacity-50"
  >
    <DeleteIcon />
  </span>
</Tooltip>
          </div>
          </TableCell>
            </TableRow>
                 
          ))}   
        
        </TableBody>
  </Table>
      </div>
    </div>
      
  

  );
};

