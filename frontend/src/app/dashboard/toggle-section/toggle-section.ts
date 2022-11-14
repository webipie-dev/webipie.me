import { PortfolioModel } from "src/app/_shared/models/portfolio.model";
import { PortfolioService } from "src/app/_shared/services/portfolio.service";
import Swal from "sweetalert2";

export class ToggleSection {
    toggleOff: boolean = true;
    section: string = '';
    sectionAttribute: string;
    portfolio: any;
    constructor(protected portfolioService: PortfolioService, section: string){
        this.section = section

        window.addEventListener('storage', () => {
          this.toggleOff = this.portfolio[this.sectionAttribute];
        });
        this.sectionAttribute = `${this.section}Disabled`
        this.portfolio = JSON.parse(localStorage.getItem('portfolio')!)
        this.toggleOff = this.portfolio[this.sectionAttribute];
    }
    async onToggleChange(event: any): Promise<void>{
        try{
            this.toggleOff = !this.toggleOff;
            let portfolio = await this.portfolioService.toggleSection(this.portfolio.id, this.section, this.toggleOff).toPromise()
            localStorage.setItem("portfolio", JSON.stringify(portfolio));
            let message = `Section ${this.section} disabled successfully`
            if(!this.toggleOff){
                message = `Section ${this.section} activated successfully`
            }
            Swal.fire({
              title: 'Operation successfully completed',
              text: message,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            
          }
          catch(err){
            Swal.fire({
              title: 'Error!',
              text: `something went wrong when toggling section ${this.section}, please refresh and try again`,
              icon: 'error',
              confirmButtonText: 'Ok',
              footer: '<a href="/dashboard/support-request">Contact Support</a>'
            });
          }
    }

}
