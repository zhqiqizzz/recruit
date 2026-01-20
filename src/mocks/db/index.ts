import { factory } from "@mswjs/data";
import { userModel, agreementModel, seedDB } from "./user";
export const db = factory({
  user: userModel,
  agreement: agreementModel,
});

seedDB(db);
