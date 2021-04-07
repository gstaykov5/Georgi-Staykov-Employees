import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { WorkDaysService } from './core/service/work-days.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee';
  @ViewChild('empl') asd: any;
  fileText: any;
  employee: any = [];
  bestTwoEmpl: any = [];
  getAllEmpl: any = [];

  constructor(private workDaysService: WorkDaysService) { }

  readFile(ev: any): void {
    this.loadFile(ev.target);
  }
  
  loadFile(input: any) {
    this.bestTwoEmpl = [];
    const file: File = input.files[0];
    const fileReader: FileReader = new FileReader();
    
    fileReader.onloadend = () => {
      this.fileText = fileReader.result.toString().trim();
      this.employee = this.workDaysService.getFile(this.fileText);
    }

    fileReader.readAsText(file);
  }

  findBestTwoEmpl() {
    this.getAllEmpl = this.workDaysService.sortByProject(this.employee);
    this.bestTwoEmpl = this.workDaysService.getBestTwoEmpl(this.getAllEmpl);
    console.log(this.bestTwoEmpl)
  }
}
