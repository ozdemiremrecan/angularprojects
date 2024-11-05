import { Component } from '@angular/core';
import { QuestionCardComponent } from "../question-card/question-card.component";
import { scienceQuestions } from '../../science';

@Component({
  selector: 'app-science',
  standalone: true,
  imports: [QuestionCardComponent],
  templateUrl: './science.component.html',
  styleUrl: './science.component.css'
})
export class ScienceComponent {
  questions=scienceQuestions;
  title="Science Questions"
}
