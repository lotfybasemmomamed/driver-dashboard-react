import { useState } from "react";
import { fackData } from "../../../fackData/fackData";
import { faPerson, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DriverCard from "./DriverCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import AddDriverDialog from "./AddDriverDialog";

export default function Drivers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [drivers, setDrivers] = useState(fackData.drivers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.phone.includes(search);

    const matchesStatus =
      statusFilter === "all" ? true : driver.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  //handle delete
  const handleDelete = (id) => {
    setDrivers((prev) => prev.filter((driver) => driver.id !== id));
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 mt-25 border-4 border-gray-100 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          <FontAwesomeIcon icon={faPerson} /> Drivers Management
        </h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-col justify-evenly items-center md:flex-row md:items-center gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="on_break">On Break</SelectItem>
              </SelectContent>
            </Select>

            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} /> <span>Add Driver</span>
            </button>
          </div>
        </div>

        {/* driver card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDrivers.length > 0 ? (
            filteredDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-gray-500">No drivers found.</p>
          )}
        </div>
      </div>
      <AddDriverDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={(newDriver) => setDrivers((prev) => [...prev, newDriver])}
      />
    </>
  );
}
