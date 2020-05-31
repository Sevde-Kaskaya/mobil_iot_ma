import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/models/device';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/models/data';
import { DetailService } from 'src/app/services/detail.service';
import { Detail } from 'src/app/models/detail';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
  providers: [NavParams]
})
export class ProjectdetailPage implements OnInit {

  user_id: number;
  detail: Detail;
  i: number = 0;

  prj_id: number;
  current_project: any;

  current_device: any;
  devices: Device[];
  datas: Data[];
  device_name: string;
  device_id: any;
  device: Device;
  project: Project;

  public sensor: boolean;
  public controller: boolean;
  device_array: Array<string>;

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private detailService: DetailService) {

    this.detail = new Detail();
    this.project = new Project();
    this.device = new Device();
    this.user_id = Number(localStorage.getItem("user_id"));
    this.prj_id = Number(localStorage.getItem("project_id"))
    console.log("detail page - project id:" + this.prj_id)

    const list = this.route.snapshot.queryParamMap.get('device');
    if (list === null) {
      this.device_array = new Array<string>();
    } else {
      this.device_array = JSON.parse(list);
    }
  }

  ngOnInit() {
    this.menuCtrl.enable(true)
    this.getDevices();
  }

  getDevices() {
    for (let i = 0; i < this.device_array.length; i++) {
      console.log("params:" + this.device_array)
      //this.createDetail(this.device_array)
      this.device_id = this.device_array[i]
      this.deviceService.getDevice(Number(this.device_array[i])).subscribe(data => {
        this.devices = data;
        console.log("data: " + this.devices)
        if (this.devices.length == 0) {
          this.alertService.presentToast("device not selected!");
        } else {
          this.device = this.devices[i];
          this.dataService.getDeviceData(this.devices[0].id).subscribe((data) => {
            if (this.devices[0].type_id == String(1)) {
              this.datas = data;
              this.sensor = true
              this.controller = false
              console.log("this is sensor")
            } else {
              this.sensor = false
              this.controller = true
              console.log("this is controller")
            }
          })
        }
      })
    }
  }

  createDetail(device_array) {
    this.detail.prj_id = this.prj_id
    this.detail.devices = device_array
    this.detailService.createDetail(this.detail).subscribe((response) => {
      this.alertService.presentToast("detail created..");
    })
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }

  cancel() {
    this.navCtrl.navigateForward('/home');
  }


}
