import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplicationProvider } from '../../providers/application/application';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})
export class AccountDetailsPage {
  no_blocks:any = 1000;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sApplication:ApplicationProvider,
    public viewCtrl: ViewController,   
    private clipboard: Clipboard,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  copyToClipboard(type){
    let infos:any="";
    switch(type){
      case 'address':
      infos = this.sApplication.openedWallet.address;
      break;
      case 'mnemonic':
      infos = this.sApplication.openedWallet.mnemonic;
      break;
      case 'viewKey':
      infos = this.sApplication.openedWallet.viewKey;
      break;
      case 'spendKey':
      infos = this.sApplication.openedWallet.spendKey;
      break;
    }
    this.clipboard.copy(infos);
    this.presentToast();
  }
  refreshWallet(){
    this.sApplication.events.publish('refresh:wallettrx', this.no_blocks);
  }
  share(type){
    let infos:any="";
    switch(type){
      case 'address':
      infos = this.sApplication.openedWallet.address;
      break;
      case 'mnemonic':
      infos = this.sApplication.openedWallet.mnemonic;
      break;
      case 'viewKey':
      infos = this.sApplication.openedWallet.viewKey;
      break;
      case 'spendKey':
      infos = this.sApplication.openedWallet.spendKey;
      break;
    }
    this.socialSharing.share(infos, "Receive from SuperioCoin Mobile Wallet").then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Address copied',
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {});
  
    toast.present();
  }
}
