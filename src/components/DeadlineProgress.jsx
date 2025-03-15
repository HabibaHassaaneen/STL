import { useEffect, useState } from "react";
import { Alert } from "@heroui/react";

const DeadlineProgress = ({ stop ,dedline,hours }) => {
  const [progress, setProgress] = useState(100);
  const [remainingTime, setRemainingTime] = useState(hours * 60 * 60 * 1000); // 36 hours in ms
   // Default priority
  useEffect(() => {
    if (!dedline) return; // Avoid running if there's no confirmed date

    const interval = setInterval(() => {
      const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
      const confirmedTime = new Date(dedline).getTime();
      const deadline = confirmedTime + hours * 60 * 60 * 1000; // 36 hours later
      const timeLeft = deadline - now;

      setRemainingTime(timeLeft);
      setProgress((timeLeft / (hours * 60 * 60 * 1000)) * 100); // Calculate progress

      // Determine priority
      const remainingHours = timeLeft / (60 * 60 * 1000);
    
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount or dedline change
  }, [dedline, hours]);

  const getColor = () => {
    if (progress > 66) return "success"; // Green for >66%
    if (progress > 33) return "warning"; // Yellow for 33-66%
    return "danger"; // Red for <33%
  };

  const remainingHours = Math.ceil(remainingTime / (60 * 60 * 1000));

  return stop? <Alert color={"success"} title={`Done`} />:(dedline ? (
    progress > 0 ? (
      <div className="flex flex-col items-center">
       <Alert color={getColor()} title={`${remainingHours}h left - `} />
      </div>
    ) : (
      <div className="flex flex-col items-center">
            <Alert color="danger" title={`Late by ${Math.abs(remainingHours)}h ago  `} />
         
        {/* <Progress value={progress} color={getColor()} /> */}
      </div>
    )
  ) : (
    <Alert color="primary" title="Not confirmed" />
  ));
};

export default DeadlineProgress;
