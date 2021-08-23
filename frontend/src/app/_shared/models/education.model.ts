import {GenericModel} from "./generic.model";

export interface EducationModel extends GenericModel {
  title: string,
  level: string,
  beginDate: Date,
  endDate?: Date,
  city?: string,
  portfolio: string,
}
