import { LessonsService } from '../services/lessons.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  lessons: any[];

  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessonsService.getLessons()
      .subscribe(lessons => this.lessons = lessons);
  }
}
