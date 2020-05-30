import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.page.html',
  styleUrls: ['./newproject.page.scss'],
})
export class NewprojectPage implements OnInit {

  project: Project;
  user_id: number;

  constructor(
    private navCtrl: NavController,
    private projectService: ProjectService,
    private alertService: AlertService,
    private menuCtrl: MenuController
  ) {
    this.project = new Project();
    this.user_id = Number(localStorage.getItem("user_id"));
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }
  
  createProject() {
    this.project.user_id = this.user_id
    this.projectService.createProject(this.project).subscribe((response) => {
      this.alertService.presentToast("Project created..");
      this.projectService.created();
      this.navCtrl.navigateRoot('/home');
    })
  }

  cancel() {
    this.navCtrl.navigateRoot('/home');
  }



}



