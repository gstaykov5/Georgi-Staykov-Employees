import { Component } from '@angular/core';
import { WorkDaysService } from './core/service/work-days.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee';
  fileText: any;
  employee: any = [];
  bestTwoEmp: any = [];

  constructor(private workDaysService: WorkDaysService) { }

  readFile(ev: any): void {
    this.loadFile(ev.target);
  }

  loadFile(input: any) {
    const file: File = input.files[0];
    const fileReader: FileReader = new FileReader();
    // const fileReader: XMLDocument = new XMLDocument();

    fileReader.onloadend = () => {
      this.fileText = fileReader.result;
      this.employee = this.workDaysService.getFile(this.fileText);
    }

    fileReader.readAsText(file);
  }

  findBestTwoEmpl() {
    this.bestTwoEmp = this.workDaysService.getBestEmpl(this.employee);
  }
}
