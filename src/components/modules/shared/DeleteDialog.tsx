"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
}

export default function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteDialogProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-clash font-black uppercase tracking-tight text-xl text-black dark:text-white border-b-2 border-black pb-2">
            ⚠️ {title}
          </AlertDialogTitle>
          <AlertDialogDescription asChild className="text-sm font-bold text-zinc-800 dark:text-zinc-200 pt-2">
            <div>{description}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-4 border-t-2 border-black/10">
          <AlertDialogCancel
            className="bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs tracking-wider shadow-[2px_2px_0px_0px_#000] hover:bg-zinc-100 cursor-pointer"
            onClick={onClose}
          >
            CANCEL
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#ff597b] text-black hover:bg-[#e04565] border-2 border-black font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer"
            onClick={onConfirm}
          >
            CONFIRM DELETE ★
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
