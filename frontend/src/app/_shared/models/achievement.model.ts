import {GenericModel} from "./generic.model";

export interface AchievementModel extends GenericModel {
  title: string,
  description?: string,
  image?: string,
  date: Date,
  portfolio: string,
}
