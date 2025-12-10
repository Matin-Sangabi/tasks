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

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  itemId?: string | number | null;
  itemName?: string;
}

export default function UpdateModal({
  open,
  onClose,
  itemName,
  itemId,
}: UpdateModalProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: userUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit {itemName || "Edit"}</DialogTitle>
        </DialogHeader>

        <p className="my-4 text-sm text-muted-foreground">
          Are you sure to Edit {itemName || "item"} ?
        </p>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              mutate({ id: itemId as string });
              onClose();
            }}
          >
            {isPending ? "Loading ..." : "Edit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
