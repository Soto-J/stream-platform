import { create } from "zustand";

type SidebarState = {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  collapsed: false,
  onExpand: () => set((state) => ({ collapsed: false })),
  onCollapse: () => set((state) => ({ collapsed: true })),
}));
