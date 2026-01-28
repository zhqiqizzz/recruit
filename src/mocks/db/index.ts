import { factory } from "@mswjs/data";
import { userModel, agreementModel, userDB } from "@/mocks/db/user";
import { bannerModel, bannerDB, taskItemModel } from "@/mocks/db/task";
import { taskListDB } from "@/mocks/db/task";
export const db = factory({
  user: userModel,
  agreement: agreementModel,
  banner: bannerModel,
  taskItem: taskItemModel,
});

userDB(db);
bannerDB(db);
taskListDB(db);
