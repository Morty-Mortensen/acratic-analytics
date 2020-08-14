import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navbarLinks = [];
  backLink = '';
  allRoutes = [];
  currentComponentUrl = '';
  isMobile = false;
  currWindowWidth = 500;

  constructor(private route: Router)
  {
    this.route.events.subscribe(event => {

      // -------------Calculate current page parent/child routes. (1)
      if ( event instanceof RoutesRecognized)
      {
        this.navbarLinks = [];

        this.getParentLink(event);
        this.currentComponentUrl = event.url;

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
        }

        // -------------Grab all routes (for website-wide search). (2)
        if ( !this.allRoutes.length )
        {
          this.getAllRoutes('/', event.state.root.children[0].routeConfig.children);
        }

        // -------------Keep it mobil friendly. (3)
        this.isMobile = this.isMobileWidth(window.innerWidth);
      }
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event)
  {
    this.isMobile = this.isMobileWidth(event.target.innerWidth);
  }

  public isMobileWidth(width: number): boolean
  {
    this.currWindowWidth = width;

    if ( width <= 500 )
    {
      return true;
    }
    else if ( width <= 560 && this.navbarLinks.length === 1 )
    {
      return true;
    }
    else if ( width <= 660 && this.navbarLinks.length === 2 )
    {
      return true;
    }
    else if ( width <= 760 && this.navbarLinks.length === 3 )
    {
      return true;
    }
    else if ( width <= 860 && this.navbarLinks.length === 4 )
    {
      return true;
    }
    else if ( width <= 960 && this.navbarLinks.length === 5 )
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  ngOnInit(): void
  {
    window.onresize = () => this.isMobile = window.innerWidth <= 699;
  }

  private findChildren(children): any[]
  {
    const links = [];
    // Create deep copy so that temporarily added children are not stored.
    const childrenToAdd = this.createDeepChildrenCopy(children);

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
      return links;
    }
  }

  private addPropertiesToChildLink(child)
  {
    return {display: child.path, path: this.currentComponentUrl + '/' + child.path};
  }

  private getParentLink(event)
  {

    // Check if coming out of tree.
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

  private getAllRoutes(currUrl: string, children)
  {
      for ( let i = 0; i < children.length; i++ )
      {
        if ( children[i].children !== undefined )
        {
          this.getAllRoutes(currUrl + children[i].path + '/', children[i].children);
        }
        this.allRoutes.push({display: children[i].path, path: currUrl + children[i].path});
      }

      return;
  }

  private createDeepChildrenCopy(children)
  {
    const childrenToAdd = [];
    children.forEach( child => {
      childrenToAdd.push(child);
    });

    return childrenToAdd;
  }
}
