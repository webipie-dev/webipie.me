import {GenericModel} from "./generic.model";
import {TemplateModel} from "./template.model";
import {ProjectModel} from "./project.model";
import {AchievementModel} from "./achievement.model";
import {SoftSkillModel} from "./soft-skill.model";
import {VolunteeringExperienceModel} from "./volunteering-experience.model";
import {TestimonialModel} from "./testimonial.model";
import {WorkExperienceModel} from "./work-experience.model";
import {TechnicalSkillModel} from "./technical-skill.model";

export interface PortfolioModel extends GenericModel {
  url: string,
  description?: string,
  name: string,
  phoneNumber?: number,
  picture?: number,
  position?: number,
  email?: number,
  github?: string,
  linkedIn?: string,
  CV?: string,
  creationDate: Date,
  template: TemplateModel,
  projects?: [ProjectModel],
  achievements?: [AchievementModel],
  softSkills?: [SoftSkillModel],
  technicalSkills?: [{
    skill: TechnicalSkillModel,
    level: number
  }],
  workExperiences?: [WorkExperienceModel],
  volunteeringExperiences?: [VolunteeringExperienceModel],
  testimonials?: [TestimonialModel]
}
