import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/service/users.service";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  itemName?: string;
  itemId?: string | number | null;
}

export default function DeleteModal({
  open,
  onClose,
  itemName,
  itemId,
}: DeleteModalProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete {itemName || "item"}</DialogTitle>
        </DialogHeader>

        <p className="my-4 text-sm text-muted-foreground">
          Are you sure Delete this {itemName || "item"} ?
        </p>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              mutate(itemId as string);
              onClose();
            }}
          >
            {isPending ? "Loading ..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
