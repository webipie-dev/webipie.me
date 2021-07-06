import {GenericModel} from "./generic.model";
import {TemplateModel} from "./template.model";
import {ProjectModel} from "./project.model";
import {AchievementModel} from "./AchievementModel";
import {SoftSkillModel} from "./soft-skill.model";
import {VolunteeringExperienceModel} from "./volunteering-experience.model";
import {TestimonialModel} from "./testimonial.model";

export interface PortfolioModel extends GenericModel {
  url: string,
  description?: string,
  name: string,
  phoneNumber?: number,
  github?: string,
  linkedIn?: string,
  CV?: string,
  creationDate: Date,
  template: TemplateModel,
  projects?: [ProjectModel],
  achievements?: [AchievementModel],
  softSkills?: [SoftSkillModel],
  workExperiences?: [SoftSkillModel],
  volunteeringExperiences?: [VolunteeringExperienceModel],
  testimonials?: [TestimonialModel]
}
