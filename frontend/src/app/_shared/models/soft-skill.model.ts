import {GenericModel} from "./generic.model";

export interface SoftSkillModel extends GenericModel {
  _id: string,
  title: string,
  description?: string,
}
