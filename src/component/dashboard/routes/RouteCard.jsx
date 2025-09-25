import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import DialogData from "../DialogData";



export default function RouteCard({ route, drivers }) {
    const [isDialogShow, setIsDialogShow] = useState(false);


  const driver = drivers.find((d) => d.id === route.assignedDriverId);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <>
      <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{route.name}</span>
            <span className={`text-sm font-semibold ${getPriorityColor(route.priority)}`}>
              {route.priority.toUpperCase()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>From:</strong> {route.origin}
          </p>
          <p>
            <strong>To:</strong> {route.destination}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {new Date(route.startTime).toLocaleTimeString()} -{" "}
            {new Date(route.endTime).toLocaleTimeString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{route.status}</span>
          </p>
          <p>
            <strong>Driver:</strong>
            {driver ? driver.name : <span className="text-red-500">Unassigned</span>}
          </p>

          <div className="flex gap-2 pt-3">
            <button className="" onClick={() => setIsDialogShow(true)}>
              View Details
            </button>
           
          </div>
        </CardContent>
      </Card>

  {isDialogShow && (
        <DialogData
          open={isDialogShow}
          data={route}
          onClose={setIsDialogShow}
          type="route"
        />
      )}    </>
  );
}
