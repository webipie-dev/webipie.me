import {GenericModel} from "./generic.model";
import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface SoftSkillModel extends GenericModel {
  _id: string,
  title: string,
  description?: string,
  icon: IconName
}
