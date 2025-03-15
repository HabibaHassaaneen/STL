import React from "react";
import { RadioGroup, Radio, Chip } from "@heroui/react";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A React component that renders a status selection input using radio buttons.
 * This component allows users to select a status from predefined options: "Accepted", 
 * "Missing Info", and "Rejected". The selected status is visually represented using 
 * colored chips.
 *
 * Props:

/******  8aaf1925-a908-444c-80cf-61e5f01271c6  *******/
export default function StatusInput({name,defaultValue}) {

  const [selected, setSelected] = React.useState("Accepted");

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        label="select status "
        value={selected}
        defaultValue
        onValueChange={setSelected}
        orientation="horizontal"
        name={name}
      >
        <Radio color="success" value="Accepted">
          {" "}
          <Chip color="success" variant="flat">
            Accepted
          </Chip>
        </Radio>
        <Radio color="warning" value="Missing Info">

          <Chip color="warning" variant="flat">
            Missing Info
          </Chip>
        </Radio>
        <Radio color="danger" value="Rejected">
          <Chip color="danger"  variant="flat" >
            Regected
          </Chip>
        </Radio>
      </RadioGroup>
      <p className="text-default-500 text-small">Selected: {selected}</p>
    </div>
  );
}
