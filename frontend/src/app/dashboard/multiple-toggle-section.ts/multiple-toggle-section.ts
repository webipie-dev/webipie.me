import { PortfolioModel } from "src/app/_shared/models/portfolio.model";
import { PortfolioService } from "src/app/_shared/services/portfolio.service";
import Swal from "sweetalert2";

export class MultipleToggleSection {
    togglesOff:boolean[]=[true,true,true,true,true,true,true];
    sections?:string[];
    sectionsAttribute:string[] = ["","","","","","","",""];
    portfolio: any;
    constructor(protected portfolioService: PortfolioService, sections: string[]){
        this.sections = sections;
        this.portfolio = JSON.parse(localStorage.getItem('portfolio')!)
        window.addEventListener('storage', () => {
            if(this.sectionsAttribute && this.togglesOff){
                for(let i = 0;i<sections.length;i++){
                    this.togglesOff[i] = this.portfolio[this.sectionsAttribute[i]];
                  }
            }
        });
            for(let i = 0;i<sections.length;i++){
                this.sectionsAttribute[i] = `${this.sections[i]}Disabled`;
              }
            for(let i = 0;i<sections.length;i++){
                
                this.togglesOff[i] = this.portfolio[this.sectionsAttribute[i]];
              }
        
        
    }
    async onToggleChange(event: any, nToggle: number): Promise<void>{
        let section;
        let toggleOff;
            
            this.togglesOff[nToggle-1] = !this.togglesOff[nToggle-1];
            toggleOff = this.togglesOff[nToggle-1];
            section = this.sections![nToggle-1];
            console.log(section + " " + toggleOff);
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
                confirmButtonText: 'Ok'
                });
            }
        
    }

}
