import { Component, OnInit } from '@angular/core';
import { Platform, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceService } from './services/device.service';
import { Device } from './models/device';
import { Router, NavigationExtras } from '@angular/router';
import { ProjectdetailPage } from './pages/projectdetail/projectdetail.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [DeviceService, ProjectdetailPage, NavParams]
})
export class AppComponent implements OnInit {

  devices: Device[];
  device_id: any[];
  deviceList: string[] = [];

  prj_id: any;
  i: number = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deviceService: DeviceService,
    private router: Router
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.getDevice();
  }

  getDevice() {
    this.deviceService.getDevices().subscribe(data => {
      this.devices = data
      console.log(this.devices)
    })
  }

  selectedDevice(device_id) {
    const queryParams: any = {};
    const device_array = this.deviceList
    this.addList(device_id)
    console.log("app  page - array: " + device_array)
    queryParams.device = JSON.stringify(device_array);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(['/projectdetail'], navigationExtras);
  }

  addList(device_id) {
    if (this.deviceList[this.i] === null) {
      this.deviceList[this.i] = "";
    } else {
      this.deviceList[this.i] = String(device_id)
      this.i++;
      return this.deviceList
    }
  }

}

