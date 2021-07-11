import {GenericModel} from "./generic.model";

export interface WorkExperienceModel extends GenericModel {
  title: string,
  description?: string,
  position?: string,
  company?: string,
  imgs?: [string],
  tags?: [string],
  skills?: [string],
  beginDate?: string,
  endDate?: string,
  city?: string,
  portfolio: string
}
