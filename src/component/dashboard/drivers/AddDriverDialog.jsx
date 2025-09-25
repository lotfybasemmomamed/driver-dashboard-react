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
import { adddriverFormSchema } from "../../../helpers/schema/driverFormSchema";


export default function AddDriverDialog({ open, onOpenChange, onAdd  }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(adddriverFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      vehicle: "",
      license: "",
      shift: "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    const newDriver = { id: Date.now(), status: "available", ...data };
    onAdd(newDriver);
    reset();
    onOpenChange(false);

  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
 
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="my-2">Name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm my-2">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label className="my-2">Phone</Label>
            <Input {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm my-2">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label className="my-2">Vehicle</Label>
            <Input {...register("vehicle")} />
            {errors.vehicle && (
              <p className="text-red-500 text-sm my-2">{errors.vehicle.message}</p>
            )}
          </div>

          <div>
            <Label className="my-2">License</Label>
            <Input {...register("license")} />
            {errors.license && (
              <p className="text-red-500 text-sm my-2">{errors.license.message}</p>
            )}
          </div>

          <div className="my-2">
            <Label>Shift</Label>
            <Select onValueChange={(val) => setValue("shift", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
                <SelectItem value="Night">Night</SelectItem>
              </SelectContent>
            </Select>
            {errors.shift && (
              <p className="text-red-500 text-sm my-2">{errors.shift.message}</p>
            )}
          </div>

          <div>
            <Label className="my-2">Notes</Label>
            <Textarea rows={3} {...register("notes")} />
            {errors.notes && (
              <p className="text-red-500 text-sm my-2">{errors.notes.message}</p>
            )}
          </div>

          <DialogFooter>
            <button className="" type="submit">Add</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

