import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatToggle = () => {
  const { isCollapsed, onExpand, onCollapse } = useChatSidebar(
    (state) => state,
  );

  const Icon = isCollapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const hintLabel = isCollapsed ? "Expand Chat" : "Collapse Chat";
  const onClick = isCollapsed ? onExpand : onCollapse;

  return (
    <Hint asChild label={hintLabel} side="left">
      <Button
        onClick={onClick}
        size="sm"
        variant="ghost"
        className="h-auto bg-transparent p-2 hover:bg-white/10 hover:text-primary"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
