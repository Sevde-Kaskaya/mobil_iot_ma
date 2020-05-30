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
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
  providers: [NavParams]
})
export class ProjectdetailPage implements OnInit {

  user_id: number;
  detail: Detail;
  i: number =0;

  prj_id: number;
  current_project: any;

  current_device: any;
  devices: Device[];
  device_list: Device[];
  datas: Data[];
  device_name: string;
  device_id: any;

  public sensor: boolean;
  public controller: boolean;
  arrayOfValues: Array<string>;

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private detailService: DetailService,
    private transferService: TransferService) {

    this.detail = new Detail();
    this.user_id = Number(localStorage.getItem("user_id"));
    this.prj_id = Number(localStorage.getItem("project_id"))
    console.log("detail page - project id:" + this.prj_id)

    const myArray = this.route.snapshot.queryParamMap.get('device');
    if (myArray === null) {
      this.arrayOfValues = new Array<string>();
    } else {
      this.arrayOfValues = JSON.parse(myArray);
    }
    console.log("detail page array: " + this.arrayOfValues)
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    //this.getDevices();
    this.getDevices2();
  }
  
  
  getDevices2() {
    console.log("params: " +    this.arrayOfValues[this.i])
    this.current_device = this.arrayOfValues[this.i]
    this.createDetail(this.prj_id, this.current_device)
    this.deviceService.getDevice(Number(this.current_device)).subscribe(data => {
      this.devices = data;
      if (this.devices.length == 0) {
        this.alertService.presentToast("device not selected!");
      } else {
        this.device_name = this.devices[0].name;
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
    this.i++;
  }


/*
  getDevices() {
    this.i = 0
    this.device_id = this.route.snapshot.data['device'];
    console.log("detail page - device id:" + this.device_id)
    this.current_device = this.device_id
    this.createDetail(this.prj_id, this.current_device)
    this.deviceService.getDevice(this.current_device).subscribe(data => {
      this.devices = data;
      if (this.devices.length == 0) {
        this.alertService.presentToast("device not selected!");
      } else {
        this.device_name = this.devices[0].name;
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
*/
  createDetail(prj_id, device_id) {
    this.detail.prj_id = this.prj_id
    this.detail.devices = this.device_id
    this.detailService.createDetail(this.detail).subscribe((response) => {
      this.alertService.presentToast("detail created..");
    })
  }

  addList(device_id) {
    this.device_list[this.i].id = device_id
    this.i++;
  }
  logOut() {
    this.alertService.showLogOutAlert();
  }

  cancel() {
    this.navCtrl.navigateForward('/home');
  }


}
