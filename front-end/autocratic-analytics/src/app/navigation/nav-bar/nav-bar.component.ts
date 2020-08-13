import { Component, OnInit } from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navbarLinks = [];
  backLink = '';
  currentComponentUrl = '';

  constructor(private route: Router)
  {
    this.route.events.subscribe(event => {

      if ( event instanceof RoutesRecognized)
      {
        this.navbarLinks = [];
        this.getParentLink(event);
        this.currentComponentUrl = event.url;
        // If root, push all direct children on. Else, look
        if ( event.url === '/' )
        {

          event.state.root.children[0].routeConfig.children.forEach( child => {
            this.navbarLinks.push(this.addPropertiesToChildLink(child));
          });
          this.backLink = '';
        }
        else
        {
          this.navbarLinks = this.findChildren(event.state.root.children[0].routeConfig.children);
        }}
    });


  }

  ngOnInit(): void {
  }

  private findChildren(children): any[]
  {
    const links = [];
    const childrenToAdd = [];
    // Create deep copy so that temporarily added children are not stored.
    children.forEach( child => {
      childrenToAdd.push(child);
    });
    if ( childrenToAdd )
    {
      for ( let i = 0; i < childrenToAdd.length; i++ )
      {
        const relativeLinkBeginIndex = this.currentComponentUrl.lastIndexOf('/');
        const relativeLink = this.currentComponentUrl.substr(relativeLinkBeginIndex, this.currentComponentUrl.length);
        if ( ('/' + childrenToAdd[i].path) === relativeLink )
        {
          // Check if component needs to display any children.
          if ( childrenToAdd[i].children !== undefined )
          {
            childrenToAdd[i].children.forEach( child => {
              // Add full path (not just relative url).
              links.push(this.addPropertiesToChildLink(child));
            });
          }
          break;
        }
        else
        {
          if ( childrenToAdd[i].children !== undefined )
          {
            childrenToAdd[i].children.forEach( child => {
              childrenToAdd.push(child);
            });
          }
        }


      }
      const yep = 0;
      return links;
    }
  }

  private addPropertiesToChildLink(child)
  {
    return {display: child.path, path: this.currentComponentUrl + '/' + child.path};
  }

  private getParentLink(event)
  {

    //Check if coming out of tree.
    if ( this.isExitingTree(event) )
    {
      // Coming out of the tree.
      const endIndex = event.url.lastIndexOf('/');
      // If 0 returned, include the home slash (substr is exclusive on the end)
      this.backLink = event.url.substr(0, (endIndex === 0) ? 1 : endIndex);
    }
    else
    {
      // Coming down the tree.
      const endIndex = this.currentComponentUrl.indexOf('/');
      this.backLink = this.currentComponentUrl.substr(endIndex, this.currentComponentUrl.length);
    }

  }

  private isExitingTree(event): boolean
  {
    // The length === 0 is to account for if the page is refreshed and the this.currentComponentUrl is reset.
    return ( event.url.length < this.currentComponentUrl.length ||  this.currentComponentUrl.length === 0 );
  }

}
