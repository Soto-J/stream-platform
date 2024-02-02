import { create } from "zustand";

type CreatorSidebarState = {
  isCollapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export const useCreatorSidebar = create<CreatorSidebarState>((set) => ({
  isCollapsed: false,
  onExpand: () => set((state) => ({ isCollapsed: false })),
  onCollapse: () => set((state) => ({ isCollapsed: true })),
}));
