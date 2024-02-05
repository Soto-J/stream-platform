"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatHeader = () => {
  const { isCollapsed } = useChatSidebar();
  
  return (
    <div className="relative border-b p-3">
      {/* toggle chat sidebar */}
      <p className="text-center font-semibold text-primary">ChatHeader</p>
    </div>
  );
};
