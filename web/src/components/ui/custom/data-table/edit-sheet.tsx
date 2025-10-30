import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { ReactNode } from "react";

interface EditSheetProps {
  sheetTitle: string;
  sheetDescription: string;
  openSheet: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const EditSheet = ({
  children,
  sheetTitle,
  sheetDescription,
  openSheet,
  onOpenChange,
}: EditSheetProps) => {
  return (
    <Sheet open={openSheet} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;
