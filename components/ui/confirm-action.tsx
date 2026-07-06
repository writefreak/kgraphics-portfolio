// components/admin/ConfirmActionButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmActionButtonProps {
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  icon: React.ReactNode;
  className?: string;
  ariaLabel: string;
}

export function ConfirmActionButton({
  onConfirm,
  title,
  description,
  confirmLabel,
  destructive = false,
  icon,
  className,
  ariaLabel,
}: ConfirmActionButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={className}
          aria-label={ariaLabel}
          onClick={(e) => e.stopPropagation()}
        >
          {icon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-sm md:text-xs">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex w-full items-center gap-2">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className={
                destructive
                  ? "bg-red-600 hover:bg-red-700 flex-1"
                  : "bg-ink flex-1"
              }
            >
              {confirmLabel}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
