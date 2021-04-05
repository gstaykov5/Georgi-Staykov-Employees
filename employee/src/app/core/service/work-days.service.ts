import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkDaysService {
  days: any;
  projectDays: any = {};
  employee: any = [];
  date = new Date().toISOString().slice(0, 10);

  constructor() { }

  workDays(dateFrom: string, dateTo: string): Observable<any> {
    let dayOne = new Date(dateFrom).toISOString().slice(0, 10);
    let dayTwo = new Date(dateTo).toISOString().slice(0, 10);
    let resultDayOne = Date.parse(dayOne);
    let resultDayTwo = Date.parse(dayTwo);
    this.days = Math.abs(((resultDayOne - resultDayTwo) / 1000) / 60 / 60 / 24);
    return this.days;
  }

  getFile(days: any) {
    days.split('\n').forEach(element => {
      let [empID, projectID, dateFrom, dateTo] = element.split(', ');
      !this.projectDays[projectID] ? this.projectDays[projectID] = 0 : null;

      if (dateTo.includes('NULL')) {
        dateTo = this.date;
        let workingDays = this.workDays(dateFrom, dateTo);
        this.projectDays[projectID] += workingDays;
        this.employee.push({ empID, projectID, dateFrom, dateTo, workingDays });
      } else {
        let workingDays = this.workDays(dateFrom, dateTo);
        this.projectDays[projectID] += workingDays;
        this.employee.push({ empID, projectID, dateFrom, dateTo, workingDays });
      }
    });
    return this.employee;
  }

  getBestEmpl(employee: any) {
    let daysToguether = {
      daysWorked: null,
      empl1: null,
      empl2: null,
      proj: null
    };

    for (let i = 0; i < employee.length; i++) {
      const empl = employee[i];

      for (let j = i; j < employee.length; j++) {
        if (empl.empID !== employee[j].empID && empl.projectID === employee[j].projectID) {
          if (new Date(empl.dateTo) > new Date(employee[j].dateFrom)) {
            const dateFrom = new Date(empl.dateFrom) > new Date(employee[j].dateFrom)
              ? empl.dateFrom
              : employee[j].dateFrom;
            const dateTo = new Date(empl.dateTo) < new Date(employee[j].dateTo)
              ? empl.dateTo
              : employee[j].dateTo;

            let workingDays = this.workDays(dateFrom, dateTo);

            daysToguether = daysToguether.daysWorked < workingDays ?
              {
                daysWorked: workingDays,
                empl1: empl,
                empl2: employee[j],
                proj: empl.projectID
              }
              : daysToguether
          }
        }
      }
    }
    return [daysToguether];
  }
  
}
