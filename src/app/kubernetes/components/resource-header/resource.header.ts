import {Component, OnInit} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import {MenuItem} from "../../../models/menu-item";

var resourceKindIndex = 4;


@Component({
  selector: 'kube-resource-header',
  templateUrl: './resource.header.html',
  styleUrls: ['./resource.header.scss'],
})
export class ResourceHeaderComponent implements OnInit {
  menus: MenuItem[];
  current: MenuItem;


  constructor(public router: Router) {
    this.menus = [
      {
        name: "ConfigMap",
        path: "configmaps",
      },
      {
        name: "Deployments",
        path: "deployments",
      },
      {
        name: "Events",
        path: "events",
      },
      {
        name: "Pods",
        path: "pods",
      },
      {
        name: "ReplicaSets",
        path: "replicasets",
      },
      {
        name: "Services",
        path: "services",
      },
    ];
    this.current = this.menus[0];

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onNavigate(event)
      }
    });
  }

  ngOnInit(): void {
    /*
     this.listenToEvents();
     this.onNavigate();
     this.dummy.ngOnInit();
     */
  }

  onNavigate(event: NavigationEnd): void {
    var url = event.url;
    var menus = this.menus;
    if (url && menus) {
      var paths = url.split("/");
      if (paths && paths.length > resourceKindIndex) {
        var path = paths[resourceKindIndex];
        this.current = null;
        menus.forEach(menu => {
          if (path === menu.path) {
            this.current = menu;
          }
        });
        if (!this.current) {
          console.log("Could not find menu for resource kind: " + path);
        } else {
          console.log("current context is now " + this.current.name);
        }
      }
    }
  }

}