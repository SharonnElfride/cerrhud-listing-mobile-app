import type { CerrhudLink } from "@/shared/cerrhud_data";
import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";

const NavbarLink = ({ linkItem }: { linkItem: CerrhudLink }) => {
  async function copyUrl() {
    toast.promise(
      async () => {
        await navigator.clipboard.writeText(linkItem.url);
        return { name: linkItem.title };
      },
      {
        loading: "Copying link...",
        success: (data) => `${data.name}'s link copied to clipboard!`,
        error: "Failed to copy.",
      }
    );
  }

  return (
    <div>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle className="text-sm">{linkItem.title}</ItemTitle>
          <ItemDescription className="text-xs">
            {linkItem.description}
          </ItemDescription>
        </ItemContent>

        <ItemActions>
          {linkItem.canCopy && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-md hover:bg-accent/30 hover:text-black"
              onClick={copyUrl}
            >
              <CopyIcon />
            </Button>
          )}

          <a
            href={linkItem.url}
            target="_blank"
            className="hover:bg-accent/30 hover:text-black p-2 rounded-md"
          >
            <ExternalLinkIcon className="size-4" />
          </a>
        </ItemActions>
      </Item>
    </div>
  );
};

export default NavbarLink;
