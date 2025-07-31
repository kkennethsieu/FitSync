"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signOutAction } from "@/lib/actions";

export default function LogoutConfirmationModal({ isOpen, onOpenChange }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form action={signOutAction} onClick={() => onOpenChange(false)}>
            <Button variant="destructive">Log Out</Button>
          </form>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
