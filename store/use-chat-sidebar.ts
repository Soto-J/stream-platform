import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

type ChatSidebarState = {
  isCollapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
};

export const useChatSidebar = create<ChatSidebarState>((set) => ({
  isCollapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set((state) => ({ isCollapsed: false })),
  onCollapse: () => set((state) => ({ isCollapsed: true })),
  onChangeVariant: (variant) => set((state) => ({ variant })),
}));
