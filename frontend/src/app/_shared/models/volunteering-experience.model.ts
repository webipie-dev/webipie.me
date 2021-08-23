import {GenericModel} from "./generic.model";

export interface VolunteeringExperienceModel extends GenericModel {
  title: string,
  description: string,
  position?: string,
  organisation: string,
  imgs?: [string],
  skills?: [string],
  beginDate: string,
  endDate: string,
  city?: string,
  portfolio: string
}
