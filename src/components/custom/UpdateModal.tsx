import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUpdate } from "@/service/users.service";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  itemId?: string | number | null;
  itemName?: string;
}

interface FormData {
  name: string;
  job: string;
}

export default function UpdateModal({
  open,
  onClose,
  itemName,
  itemId,
}: UpdateModalProps) {
  const schema = yup.object({
    name: yup.string().required("نام الزامی است"),
    job: yup.string().required("شغل الزامی است"),
  });

  const defaultValues = useMemo(() => {
    return {
      name: itemName || "",
      job: "",
    };
  }, [itemName]);

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: userUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    const formData = { id: itemId as string, ...data };
    mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit {itemName || "Edit"}</DialogTitle>
        </DialogHeader>

        <div className="w-full py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job</FormLabel>
                    <FormControl>
                      <Input placeholder="Job" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  cancel
                </Button>
                <Button
                  variant="destructive"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Loading ..." : "Edit"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
