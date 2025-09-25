import { useState } from "react";
import { fackData } from "../../../fackData/fackData";
import RouteCard from "./RouteCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar,faPlus } from "@fortawesome/free-solid-svg-icons";
import AddRouteDialog from "./AddRouteDialog";

export default function RoutesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [routes, setRoutes] = useState(fackData.routes);



  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(search.toLowerCase()) ||
      route.destination.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : route.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" ? true : route.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 mt-25 border-4 border-gray-100 rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        <FontAwesomeIcon icon={faCar} /> Routes Management
      </h1>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
        <div className="flex flex-col justify-evenly items-center md:flex-row md:items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by route name or destination..."
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={setPriorityFilter}
            defaultValue={priorityFilter || "all"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
              <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faPlus} /> <span>Add Route</span>
                      </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              drivers={fackData.drivers}
            />
          ))
        ) : (
          <p className="text-gray-500">No routes found.</p>
        )}
      </div>
    </div>
        <AddRouteDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
  onAdd={(newRoute) => setRoutes((prev) => [...prev, newRoute])}
          />
        </>
    
  );
}
