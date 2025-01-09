import { Component, OnInit } from '@angular/core';
import { SquadsService } from '../../services/squads.service';

@Component({
  selector: 'app-squads',
  imports: [],
  templateUrl: './squads.component.html',
  styleUrl: './squads.component.scss'
})
export class SquadsComponent implements OnInit {

  constructor(private service: SquadsService) { }

  ngOnInit(): void {
    this.service.getSquads()
      .subscribe((data) => {console.log(data)});
  }

  addNewSquad() {
    throw new Error('Method not implemented.');
  }

}
