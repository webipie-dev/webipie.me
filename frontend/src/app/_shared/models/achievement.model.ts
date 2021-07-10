import {GenericModel} from "./generic.model";

export interface AchievementModel extends GenericModel {
  description?: string,
  title: string,
  portfolio: string,
}
