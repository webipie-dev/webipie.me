import {GenericModel} from "./generic.model";

export interface TestimonialModel extends GenericModel {
  name: string,
  position?: string,
  photo?: string,
  description: string,
  portfolio: string
}
