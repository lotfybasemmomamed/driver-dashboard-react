import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faIdCard,
  faCar,
  faClock,
  faUsers,
  faPen,
  faList,faBoxes,faLocationDot,faFlag
} from "@fortawesome/free-solid-svg-icons";

export default function DialogData({ open, onClose, data,type }) {
    console.log(data)
    const setDate =(date)=>{
        const newDate =new Date(date).toLocaleString()
        return newDate
    }


   

  const info = type==="driver"?[
    { icon: faPhone, color: "bg-green-100 text-green-600", label: "Phone", value: data.phone },
    { icon: faIdCard, color: "bg-gray-100 text-gray-600", label: "License", value: data.license },
    { icon: faCar, color: "bg-blue-100 text-blue-600", label: "Vehicle", value: data.vehicle },
    { icon: faClock, color: "bg-orange-100 text-orange-600", label: "Shift", value: data.shift },
    { icon: faList, color: "bg-purple-100 text-purple-600", label: "Status", value: data.status },
    { icon: faPen, color: "bg-pink-100 text-pink-600", label: "Notes", value: data.notes || "No notes" },
  ]:
    [
      { icon: faBoxes, color: "bg-blue-100 text-blue-600", label: "Origin", value: data.origin },
      { icon: faLocationDot, color: "bg-green-100 text-green-600", label: "Destination", value: data.destination },
      { icon: faFlag, color: "bg-red-100 text-red-600", label: "Priority", value: data.priority },
      { 
        icon: faClock, 
        color: "bg-orange-100 text-orange-600", 
        label: "Time", 
        value: `${setDate(data.startTime)} : ${ setDate(data.endTime)}`
      },
      { icon: faList, color: "bg-purple-100 text-purple-600", label: "Status", value: data.status },
      { icon: faPen, color: "bg-pink-100 text-pink-600", label: "Notes", value: data.notes || "No notes" },
    ];



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] w-[90%] rounded-2xl shadow-lg p-6">
        <DialogHeader className="border-b pb-3 mb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            {data.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {info.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className={`${item.color} p-2 rounded-full`}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-medium text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
