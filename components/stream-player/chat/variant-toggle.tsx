import { MessageSquare, Users } from "lucide-react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;
  const hintLabel = isChat ? "Community" : "Go back to chat";

  const onClick = () => {
    onChangeVariant(isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT);
  };

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
