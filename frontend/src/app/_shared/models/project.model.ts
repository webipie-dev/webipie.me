import {GenericModel} from "./generic.model";

export interface ProjectModel extends GenericModel {
  name: string,
  description: string,
  imgs?: [string],
  tags?: [string],
  skills?: [string],
  date?: Date,
  link?: string,
  github?: string,
  portfolio: string
}
