import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController } from '@ionic/angular';
import { Myapp } from '../../models/myapp';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { MyappService } from 'src/app/services/myapp.service';
@Component({
  selector: 'app-createapp',
  templateUrl: './createapp.page.html',
  styleUrls: ['./createapp.page.scss'],
})
export class CreateappPage implements OnInit {

  app: Myapp;
  projects: Project[];
  user_id: number;
  app_id: number = 0;

  selected_projects: Array<Project> = new Array<Project>();

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private projectService: ProjectService,
    private myappService: MyappService) {

    this.app = new Myapp();
    this.user_id = Number(localStorage.getItem("user_id"));

  }

  ngOnInit() {
    this.getProjects();
  }

  select_eventOption(detail: boolean, index: number) {
    if (detail) {
      this.selected_projects.push(this.projects[index]);
    } else {
      const ind = this.selected_projects.findIndex((i: Project) => {
        return (i.id === this.projects[index].id);
      });
      if (-1 != ind) {
        this.selected_projects.splice(ind, 1);
      }
    }
  }

  getProjects() {
    this.projectService.getProject(this.user_id).subscribe((data) => {
      this.projects = data;
    })
  }

  createApp() {
    if(this.selected_projects.length ==0)
      return;
    if(this.app.name == undefined)
      return;
    
    this.app.user_id=this.user_id;

    this.myappService.createApp(this.app).subscribe((response) => {
      console.log(response);
     /* this.app_id = response.id;
      if(this.app_id!=0){
        console.log("appid"+this.app_id)
        for(let i=0;i<this.selected_projects.length;i++){
          this.appProject.app_id=this.app_id;
          this.appProject.project_id=this.selected_projects[i].id;
          this.myappService.createAppProjects(this.appProject);
        }
      }
      console.log("app olusturuldu")
      this.alertService.presentToast("App Olusturuldu..");*/
    })
      console.log(this.selected_projects);
  }


  cancel() {
    this.navCtrl.navigateForward('/myapp');
  }
}