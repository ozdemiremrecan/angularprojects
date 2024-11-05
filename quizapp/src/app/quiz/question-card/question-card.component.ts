import { ChangeDetectorRef, Component, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { Question } from '../question.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { scienceQuestions } from '../../science';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent implements OnInit{
  private route=inject(ActivatedRoute);
  private router=inject(Router);
  score=signal(0);
  disable=signal(false)
  title=input.required<string>();
  questionId:string=""
  question:any=null
  finish=signal(false)
  selectedAnswerIndex: number | null = null;
  isCorrect: boolean | null = null;
  ngOnInit(): void {
    this.questionId=this.route.snapshot.params['questionId']
    this.question=scienceQuestions.find((q)=>q.id === this.questionId)
  }
 nextQuestion(){
  if(scienceQuestions.find((q)=>q.id == String(parseInt(this.questionId)+1))){
    this.questionId=String(parseInt(this.questionId)+1)
    this.router.navigate(["quiz","science",this.questionId]);
    this.question=scienceQuestions.find((q)=>q.id === this.questionId)
    this.isCorrect=null,this.selectedAnswerIndex=null,this.disable.set(false)
  }else{
    this.finish.set(true)
  }
 }
 correctAnswer(selectedAnswer: string, index: number) {
    this.selectedAnswerIndex = index;
    this.isCorrect = selectedAnswer[0] == this.question.correctAnswer;
    this.disable.set(true)
    this.setScore()
  }
  private setScore(){
    if(this.isCorrect){
      this.score.update((val)=>val+=10)
    }
    else{
      this.score.update((val)=>val-=10)
    }
  }
  get getScore(){
    return this.score();
  }
}
