import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) {

  }

  ngOnInit() {
  }

  register() {
    this.navCtrl.navigateForward('/register');
  }

  login() {
    this.navCtrl.navigateForward('/login');
  }
}
