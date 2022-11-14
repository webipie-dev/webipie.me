import { PortfolioModel } from "src/app/_shared/models/portfolio.model";
import { PortfolioService } from "src/app/_shared/services/portfolio.service";
import Swal from "sweetalert2";

export class DoubleToggleSection {
    firstToggleOff: boolean = true;
    firstSection: string = '';
    firstSectionAttribute: string;

    secondToggleOff: boolean = true;
    secondSection: string = '';
    secondSectionAttribute: string;
    portfolio: any;
    constructor(protected portfolioService: PortfolioService, firstSection: string, secondSection: string){
        this.firstSection = firstSection
        this.secondSection = secondSection

        window.addEventListener('storage', () => {
          this.firstToggleOff = this.portfolio[this.firstSectionAttribute];
          this.secondToggleOff = this.portfolio[this.secondSectionAttribute];
        });
        this.firstSectionAttribute = `${this.firstSection}Disabled`
        this.secondSectionAttribute = `${this.secondSection}Disabled`

        this.portfolio = JSON.parse(localStorage.getItem('portfolio')!)
        this.firstToggleOff = this.portfolio[this.firstSectionAttribute];
        this.secondToggleOff = this.portfolio[this.secondSectionAttribute];
    }
    async onToggleChange(event: any, nToggle: number): Promise<void>{
        let section;
        let toggleOff;
        if(nToggle === 1){
            this.firstToggleOff = !this.firstToggleOff;
            toggleOff = this.firstToggleOff;
            section = this.firstSection;
        }
        else if (nToggle === 2){
            this.secondToggleOff = !this.secondToggleOff;
            toggleOff = this.secondToggleOff;
            section = this.secondSection;
        }
        else return;
        try{
            let portfolio = await this.portfolioService.toggleSection(this.portfolio.id, section, toggleOff).toPromise()
            localStorage.setItem("portfolio", JSON.stringify(portfolio));
            let message = `Section ${section} disabled successfully`
            if(!toggleOff){
                message = `Section ${section} activated successfully`
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
              text: `something went wrong when toggling section ${section}, please refresh and try again`,
              icon: 'error',
              confirmButtonText: 'Ok',
              footer: '<a href="/dashboard/support-request">Contact Support</a>'
            });
          }
    }

}
