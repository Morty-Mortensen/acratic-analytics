import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() source = '';
  @Input() location = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  sanitizeYoutubeUrl()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.source);
  }


}
