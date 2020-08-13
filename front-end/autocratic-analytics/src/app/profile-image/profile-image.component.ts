import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  @Input() width = '';
  @Input() height = '';
  @Input() borderRadius = '';

  constructor() { }

  ngOnInit(): void {
  }

}
