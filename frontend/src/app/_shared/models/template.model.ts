import {GenericModel} from "./generic.model";

export interface TemplateModel extends GenericModel {
  name: string,
  header: {
    img: string,
    title: string,
    description: string,
    mainButton: string
  },
  colorChart: {[key: string]: string},
  colorChartOptions: [{[key: string]: string}],
  font: string,
  fontOptions: [string]
}
