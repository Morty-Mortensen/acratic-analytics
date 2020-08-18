import { Component, OnInit } from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  testLinks = [];
  routerParentChildren = new Map();
  footerRoutes

  constructor(private route: Router)
  {
    this.route.events.subscribe(event => {

      // -------------Calculate current page parent/child routes. (1)
      if ( event instanceof RoutesRecognized)
      {
        this.testLinks = [];
        if ( this.routerParentChildren.size === 0 )
        {
          this.setAllChildrenOfMainRoutes('/', event.state.root.children[0].routeConfig.children);
          this.setFooterRoutes();
        }
        console.log(this.routerParentChildren);
      }
    });
  }

  ngOnInit(): void {
  }


  setAllChildrenOfMainRoutes(currUrl, children)
  {

    children.forEach( child => {

      if ( currUrl === '/' )
      {
        this.routerParentChildren.set(child.path, []);
      }

      if ( child.children !== undefined )
      {
        const mainLinks = [];
        this.setAllChildrenOfMainRoutes(currUrl + child.path + '/', child.children);
      }

      let index = currUrl.indexOf('/', 1);

      if ( index != -1 )
      {
        const childArray = this.routerParentChildren.get(currUrl.substr(1, currUrl.indexOf('/', 1) - 1));
        const childPath = currUrl + child.path;
        childArray.push({display: childPath.substr(childPath.lastIndexOf('/') + 1, childPath.length), path: childPath});
        this.routerParentChildren.set(currUrl.substr(1, currUrl.indexOf('/', 1) - 1), childArray);
      }
      // console.log('my index: ' + index);
      // console.log('Index of: ' + currUrl.substr(1, currUrl.indexOf('/', 1) - 1));

      this.testLinks.push(child);
    });
  }

  private setFooterRoutes()
  {

  }

}
