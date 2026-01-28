import { setupWorker } from "msw/browser";
import { handlers } from "@/mocks/handlers";
import { db } from "@/mocks/db";
export const worker = setupWorker(...handlers);
console.log("[msw] db snapshot:", {
  users: db.user.getAll(),
  agreements: db.agreement.getAll(),
  banners: db.banner.getAll(),
  taskItems: db.taskItem.getAll(),
});
