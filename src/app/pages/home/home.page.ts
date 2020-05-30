import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavParams, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [NavParams]
})
export class HomePage implements OnInit {

  title = "Projects"
  user_id: number;
  prj_id: number;
  projects: Project[];
  data: any;

  constructor(public loadingCntrl: LoadingController,
    private alertService: AlertService,
    private projectService: ProjectService,
    private menuCtrl: MenuController,
    private router: Router,
    private navCtrl: NavController) {

    this.user_id = Number(localStorage.getItem("user_id"));
  }
  
  ngOnInit() {

    this.menuCtrl.enable(false);
    this.getProjects();
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }

  getProjects() {
    this.projectService.getProject(this.user_id).subscribe((data) => {
      this.projects = data;
    })
  }

  createProject() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user_id: JSON.stringify(this.user_id)
      }
    };
    this.router.navigate(['/newproject'], navigationExtras);
  }

  goProject(prj_id) {
    localStorage.setItem("project_id", String(prj_id))
    this.navCtrl.navigateRoot('/projectdetail');
  }

}




