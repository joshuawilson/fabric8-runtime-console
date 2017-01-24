import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {ConfigMapService} from "../../../service/configmap.service";
import {YamlEditor} from "../../../view/yaml.editor";
import {ConfigMap} from "../../../model/configmap.model";

@Component({
  selector: 'ipaas-configmap-edit-toolbar',
  templateUrl: './edit-toolbar.configmap.html',
  styleUrls: ['./edit-toolbar.configmap.scss'],
})
export class ConfigMapEditToolbarComponent {

  @Input() configmap: ConfigMap;

  @Input() yamlEditor: YamlEditor;

  constructor(private configmapService: ConfigMapService, private router: Router) {
  }

  save() {
    let resource = this.yamlEditor.parseYaml();
    this.configmapService.updateResource(this.configmap, resource).subscribe(
      () => this.router.navigate(['configmaps']),
    );
  }
}
