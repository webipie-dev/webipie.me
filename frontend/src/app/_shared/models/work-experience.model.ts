import {GenericModel} from "./generic.model";
import {TechnicalSkillModel} from "./technical-skill.model";

export interface WorkExperienceModel extends GenericModel {
  title: string,
  description: string,
  position?: string,
  company?: string,
  imgs?: [string],
  skills?: [TechnicalSkillModel],
  beginDate: string,
  endDate?: string,
  city?: string,
  portfolio: string
}
