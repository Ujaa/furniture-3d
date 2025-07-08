import { v4 as uuidv4 } from "uuid";

export const getUserId = (): string => {
  let userId = localStorage.getItem("planner_userid");

  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("planner_userid", userId);
  }

  return userId;
};
