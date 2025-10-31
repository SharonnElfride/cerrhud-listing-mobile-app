import { STORAGE_MAX_FILE_SIZE } from "@/shared/constants";
import { z } from "zod";

export const zodImageChecker = z
  .custom<FileList>()
  .refine((files) => files && files.length > 0, "Please select a file.")
  .refine(
    (files) => files?.[0]?.size <= STORAGE_MAX_FILE_SIZE,
    "⚠️ The file must be smaller than 1MB."
  )
  .refine(
    (files) =>
      ["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(
        files?.[0]?.type
      ),
    "⚠️ Invalid file type. Only .jpg, .jpeg, .png, .webp, .svg allowed."
  );
