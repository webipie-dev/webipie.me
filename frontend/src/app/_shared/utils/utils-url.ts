import { environment } from "src/environments/environment";

export class UtilsUrl {
  public static url =`${environment.backendProtocol}://${environment.backendDomainName}:${environment.backendPort}`;
}
