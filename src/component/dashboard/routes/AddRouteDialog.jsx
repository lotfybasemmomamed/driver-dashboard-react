import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {  routeFormSchema } from "../../../helpers/schema/routeFormSchema";

export default function AddRouteDialog({ open, onOpenChange, onAdd }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      name: "",
      origin: "",
      destination: "",
      priority: "",
      startTime: "",
      endTime: "",
      status: "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    const newRoute = { id: `r-${Date.now()}`, ...data };
    onAdd(newRoute);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className="max-w-lg w-[95%] max-h-[90vh] overflow-y-auto">
  <DialogHeader>
    <DialogTitle>Add New Route</DialogTitle>
  </DialogHeader>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-4 w-full"
  >
    <div>
      <Label className="my-2">Route Name</Label>
      <Input className="w-full" {...register("name")} />
      {errors.name && (
        <p className="text-red-500 text-sm my-2">{errors.name.message}</p>
      )}
    </div>

    <div>
      <Label className="my-2">Origin</Label>
      <Input className="w-full" {...register("origin")} />
      {errors.origin && (
        <p className="text-red-500 text-sm my-2">{errors.origin.message}</p>
      )}
    </div>

    <div>
      <Label className="my-2">Destination</Label>
      <Input className="w-full" {...register("destination")} />
      {errors.destination && (
        <p className="text-red-500 text-sm my-2">
          {errors.destination.message}
        </p>
      )}
    </div>

    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-1">
        <Label className="my-2">Start Time</Label>
        <Input type="datetime-local" className="w-full" {...register("startTime")} />
        {errors.startTime && (
          <p className="text-red-500 text-sm my-2">
            {errors.startTime.message}
          </p>
        )}
      </div>

      <div className="flex-1">
        <Label className="my-2">End Time</Label>
        <Input type="datetime-local" className="w-full" {...register("endTime")} />
        {errors.endTime && (
          <p className="text-red-500 text-sm my-2">
            {errors.endTime.message}
          </p>
        )}
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-1 my-2">
        <Label>Status</Label>
        <Select onValueChange={(val) => setValue("status", val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm my-2">{errors.status.message}</p>
        )}
      </div>

      <div className="flex-1 my-2">
        <Label>Priority</Label>
        <Select onValueChange={(val) => setValue("priority", val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        {errors.priority && (
          <p className="text-red-500 text-sm my-2">{errors.priority.message}</p>
        )}
      </div>
    </div>

    <div>
      <Label className="my-2">Notes</Label>
      <Textarea rows={3} className="w-full" {...register("notes")} />
      {errors.notes && (
        <p className="text-red-500 text-sm my-2">{errors.notes.message}</p>
      )}
    </div>

    <DialogFooter>
      <button
        className="px-4 py-2 rounded-lg hover:bg-blue-700 "
        type="submit"
      >
        Add Route
      </button>
    </DialogFooter>
  </form>
</DialogContent>

    </Dialog>
  );
}
