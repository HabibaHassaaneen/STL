import {Accordion, AccordionItem} from "@heroui/react";

import Filters from './Filters';
import FilterChickBoxGroup from './FilterChickBoxGroup';


const AnchorIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"
        fill="currentColor"
      />
      <path
        d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"
        fill="currentColor"
      />
    </svg>
  );
};



export default function FilterAccordion({name,setStatusFilterf}) {

  return (
    // <Accordion  
    // hideScrollBar={true}
    // motionProps={{
    //   variants: {
    //     enter: {
    //       y: 0,
    //       opacity: 1,
    //       height: "auto",
    //       overflowY: "unset",
    //       transition: {
    //         height: {
    //           type: "spring",
    //           stiffness: 500,
    //           damping: 30,
    //           duration: 1,
    //         },
    //         opacity: {
    //           easings: "ease",
    //           duration: 1,
    //         },
    //       },
    //     },
    //     exit: {
    //       y: -10,
    //       opacity: 0,
    //       height: 0,
    //       overflowY: "hidden",
    //       transition: {
    //         height: {
    //           easings: "ease",
    //           duration: 0.25,
    //         },
    //         opacity: {
    //           easings: "ease",
    //           duration: 0.3,
    //         },
    //       },
    //     },
    //   },
    // }}
    // >
    //   <AccordionItem hideScrollBar={true} key="Fitlers" aria-label="Filters" startContent={<AnchorIcon />} title="Filters">
  
  <div  className="flex  gap-1 ">
  <Filters  name="doctors"/>
        <Filters name="case-definition"/>
        <Filters name="designers"/>
        <Filters name="status"/>
        {/* <FilterChickBoxGroup name={"designed"} options={['designed','not designed']}/> */}
  
   <FilterChickBoxGroup name={"designed"} options={[
      {name:"all",value:"all",color:"success"},
          {name:"designed",value:"true",color:"success"},
          {name:'not designed',value:"false",color:"danger"},
          ]}
 />
    <FilterChickBoxGroup name={"Confirmed"}  options={[
      {name:"all",value:"all",color:"success"},
          {name:"confirmed",value:"true",color:"success"},
          {name:'not confirmed',value:"false",color:"danger"},
          ]}
 />
  <FilterChickBoxGroup name={"production"}  options={[
      {name:"all",value:"all",color:"success"},
          {name:"produced",value:"true",color:"success"},
          {name:'not produced',value:"false",color:"danger"},
          ]}
 />

    <FilterChickBoxGroup name={"Delivered"} options={[
      {name:"all",value:"all",color:"success"},
          {name:"delivered",value:"true",color:"success"},
          {name:'not delivered',value:"false",color:"danger"},
          ]}
 />

          

  </div>
 
    

    //   </AccordionItem>
     
    // </Accordion>
  );
}
