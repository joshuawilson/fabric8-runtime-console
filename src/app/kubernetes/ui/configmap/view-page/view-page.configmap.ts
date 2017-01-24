import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ConfigMapStore} from "../../../store/configmap.store";

@Component({
  selector: 'ipaas-configmap-view-page',
  templateUrl: './view-page.configmap.html',
  styleUrls: ['./view-page.configmap.scss'],
})
export class ConfigMapViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: ConfigMapStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
