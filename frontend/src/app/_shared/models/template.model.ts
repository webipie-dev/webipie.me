import {GenericModel} from "./generic.model";
import {ObjectShapeEnum} from "../enums/object-shape.enum";
import {ButtonStyleEnum} from "../enums/button-style.enum";
import {ButtonSizeEnum} from "../enums/button-size.enum";
import {TextAlignEnum} from "../enums/text-align.enum";

export interface TemplateModel extends GenericModel {
  name: string,
  colorChart: string[],
  colorChartOptions: [[string]],
  font: string,
  fontOptions: [string],
  general: {
    buttons: {
      shape: ObjectShapeEnum,
      style: ButtonStyleEnum,
      size: ButtonSizeEnum
    },
    picture: ObjectShapeEnum,
    // animation speed varies between 1 - 10
    animationSpeed: number,
  },
  // soft & hard skills equals 1 2 or 3
  softSkills: number,
  hardSkills: number,
  testimonials: {
    picture: ObjectShapeEnum,
    textAlign: TextAlignEnum,
    carouselSpeed: number // between 1 - 10
  },
  experience: {
    dateContainer: number,
    dividerIcon: number
  },
  education: {
    dateContainer: number,
    dividerIcon: number
  },
  achievement: {
    dateContainer: number,
    dividerIcon: number
  },
  project: {
    button: number,
    popupCard: number
  },
  contact: {
    socialMediaIcon: number,
    contactCard: number
  }
}
