import React from "react";
import {RadioGroup,Tooltip,Chip, Radio} from "@heroui/react";

export default function ConfirmationRadio() {
  const [selected, setSelected] = React.useState();

  const validOptions = ["Confirmed", "Redesign"];
;

  return (
    <div className="flex  gap-3">
      <RadioGroup
          orientation="horizontal"
        value={selected}
        onValueChange={setSelected}
      >
        <Radio value="confirmed" color="success" variant="faded"><Chip color="success" variant="flat">
        Confirmed
                  </Chip></Radio>
                  
                  <Radio value="redesign" color="danger" variant="flat">   <Chip color="danger" variant="flat">
                    Redesign
                  </Chip></Radio>
   
        
       
      </RadioGroup>

    </div>
  );
}

