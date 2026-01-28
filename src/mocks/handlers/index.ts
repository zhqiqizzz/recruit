import { userHandlers } from "@/mocks/handlers/user";
import { taskHandlers } from "@/mocks/handlers/task";
import { cityHandlers } from "@/mocks/handlers/city";
import { positionHandlers } from "@/mocks/handlers/position";
export const handlers = [
  ...userHandlers,
  ...taskHandlers,
  ...cityHandlers,
  ...positionHandlers,
];
