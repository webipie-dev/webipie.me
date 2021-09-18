import {GenericModel} from "./generic.model";

export interface ProjectModel extends GenericModel {
  name: string,
  description: string,
  imgs?: [string],
  skills?: string[],
  link?: string,
  github?: string,
  portfolio: string
}
