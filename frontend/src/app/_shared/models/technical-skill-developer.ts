import {GenericModel} from "./generic.model";

export interface TechnicalSkillDeveloperModel extends GenericModel {
  _id: string,
  skill: {
    name: string,
    id: string
  },
  level: number
}
