import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { ActivatedRoute } from '@angular/router';
import { Myapp } from 'src/app/models/myapp';
import { MyappService } from 'src/app/services/myapp.service';

@Component({
  selector: 'app-myappdetails',
  templateUrl: './myappdetails.page.html',
  styleUrls: ['./myappdetails.page.scss'],
})
export class MyappdetailsPage implements OnInit {

  app: any[];
  my_app: Myapp;
  current_app: any;
  app_id: number;
  app_name: string;

  projects: Project[];
  user_id: Number;

  constructor(private navCtrl: NavController,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private myAppService: MyappService) {

    this.user_id = Number(localStorage.getItem("user_id"));
    this.my_app = new Myapp();
    this.getApp();
  }

  sliderConfig = {
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProject(this.user_id).subscribe((data) => {
      this.projects = data;
    })
  }

  getApp() {
    this.app_id = this.route.snapshot.data['app'];
    console.log("app_id:" + this.app_id)
    this.current_app = this.app_id
    this.myAppService.getApp(this.current_app).subscribe(data => {
      this.my_app = data;
      this.app_name = this.my_app.name
      console.log(data)
    })
  }

  cancel() {
    this.navCtrl.navigateForward('/myapp');
  }
}
