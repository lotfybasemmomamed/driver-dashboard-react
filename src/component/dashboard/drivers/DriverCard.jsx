import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faIdCard,
  faClock,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import DialogData from "../DialogData";

export default function DriverCard({ driver,onDelete }) {
  const [isDialogShow, setIsDialogShow] = useState(false);
  return (
    <>
      <Card key={driver.id} className="shadow hover:shadow-lg transition ">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold">
            {driver.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold  truncate">{driver.name}</h2>
            <p className="text-sm text-gray-500">{driver.phone}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <FontAwesomeIcon icon={faCar} className="mr-2 text-blue-600" />
            Vehicle: {driver.vehicle}
          </p>

          <p className="text-sm">
            <FontAwesomeIcon icon={faIdCard} className="mr-2 text-green-600" />
            License: {driver.license}
          </p>

          <p className="text-sm">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-600" />
            Shift: {driver.shift}
          </p>
          <Badge
            className={`${
              driver.status === "available"
                ? "bg-green-500"
                : driver.status === "busy"
                ? "bg-red-500"
                : "bg-orange-500"
            }`}
          >
            {driver.status}
          </Badge>
          {driver.notes && (
            <p className="text-xs text-gray-400 mt-1">📝 {driver.notes}</p>
          )}
          {/* btn */}
          <div className="flex flex-col gap-2 mt-2 ">
            <div className="flex gap-2">
              <button
                onClick={() => setIsDialogShow((prev) => !prev)}
                className=" w-full text-black px-4 py-2 rounded"
              >
                      <FontAwesomeIcon icon={faEye} className="mr-2" />

                
              </button>
              <button onClick={()=>onDelete(driver.id)} className="w-full text-red-600 px-4 py-2 rounded">
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      {isDialogShow && (
        <DialogData
          open={isDialogShow}
          data={driver}
          onClose={setIsDialogShow}
          type="driver"
        />
      )}
    </>
  );
}
