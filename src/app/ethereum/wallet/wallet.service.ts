import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Summary } from '../contractProxyClasses/Summary';
import { Result } from '../contractProxyClasses/Result';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { nonOwnerConnected, ownerConnected } from '../../state/account/account.actions';
import { Option } from '../contractProxyClasses/Option';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  /*
    TODO:
      Connect to wallet
      Fetch wallet account's data
        amount
        account address
        ...etc.,
  */

  public ethereum;
   accounts:any;
   provider:any;
   signer: any;
   signerAddress: any;
   contract:any;
   currentNonce: any;
   pendingNonce: any;
   ownerAddress: any;

  constructor(private store: Store<AppState>) {
    const {ethereum} = <any>window;
    this.ethereum = ethereum;



    this.getContract();
    // this.op_endVoting();
  }


  // async op_(){
  //   await this.getCurrNonce();

  //   //execute all owner only ops and see
  //   try{
  //     const tx = await this.contract['startVotingEvent']("Topic A",["Option I", "Option II"], { nonce: this.currentNonce });
  //     const receipt = await tx.wait();
  //     console.log("Successfully called startVotingEvent", receipt);
  //   }
  //   catch(error){
  //     console.error("Error during write op", error);
  //   }
  // }

  async op_startVotingEvent(){
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const tx = await this.contract['startVotingEvent']("Topic A",["Option I", "Option II"], { nonce: this.currentNonce });
      const receipt = await tx.wait();
      console.log("Successfully called startVotingEvent", receipt);
    }
    catch(error){
      console.error("Error during write op", error);
    }
  }

  async op_endVoting(){
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const tx = await this.contract['endVoting'](0, { nonce: this.currentNonce });
      const receipt = await tx.wait();
      console.log("Successfully called endVoting", receipt);
    }
    catch(error){
      console.error("Error during write op", error);
    }
  }



  
  async connectToWalletReadOnly() {
    this.accounts = await this.ethereum.request({method: 'eth_requestAccounts'})
    console.log("Connected Account:", this.accounts[0])
  }

  async connectToWalletAll(){
    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = this.provider.getSigner();
    console.log("Signer:", this.signer);

    
  }

  async startVotingEvent(topic:string, options:string[]){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops
    this.currentNonce = await this.provider.getTransactionCount(await this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(await this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const tx = await this.contract['startVotingEvent']("Topic A",["Option I", "Option II"], { nonce: this.currentNonce });
      const receipt = await tx.wait();
      console.log("Successfully called startVotingEvent", receipt);
      return receipt;
    }
    catch(error){
      console.error("Error during write op", error);
    }
    return false;
  }

  async endVoting(eventId: number){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const tx = await this.contract['endVoting'](eventId, { nonce: this.currentNonce });
      const receipt = await tx.wait();
      console.log("Successfully called endVoting", receipt);
      return receipt;
    }
    catch(error){
      console.error("Error during write op", error);
    }
    return false;
  }

  async vote(eventId: number, optionId: number){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const tx = await this.contract['vote'](eventId,optionId, { nonce: this.currentNonce });
      // const receipt = await tx.wait();
      console.log("Successfully called vote", tx);
      return tx;
    }
    catch(error){
      console.error("Error during write op", error);
    }
    return false;
  }

  async getResults(eventId: number){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const result:Result = await this.contract['getResults'](1, { nonce: this.currentNonce });
      // const receipt = await tx.wait();
      console.log(`Successfully called getResults: {winnerName: ${result.winnerName}, winnerVoteCount: ${result.winnerVoteCount} } = `);
      return result;
    }
    catch(error){
      console.error("Error during write op", error);
    }
    return null;
  }

  async isOwner(){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops

    /**isOwner */
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{ 
      const ownerConnected: boolean = await this.contract['isOwner']();
      // const receipt = await tx.wait();
      console.log("Successfully called isOwner", ownerConnected);
      return ownerConnected;
    }
    catch(error){
      console.error("Error during write op", error);
    }
    return false;
  }

  async getOptions(eventId: number){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{ 
      const tx:Option[] = await this.contract['getOptions'](eventId, { nonce: this.currentNonce });
      // const receipt = await tx.wait();
      console.log("Successfully called getOptions", tx[0], tx[1]);
      return tx;
    }
    catch(error){
      console.error("Error during write op", error);
    }
    return [];
  }

  async getSummary(){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{ 

      const summaries: Summary[] = await this.contract['votingEventsSummary']({ nonce: this.currentNonce });
      // const receipt = await tx.wait();
      console.log("Successfully called votingEventsSummary", summaries);
      for(let summary of summaries){
        console.log(summary);
      }
      // console.log("Successfully called summary[0].topic: ", summary[0].topic);
      // console.log("Successfully called summary[0].options[1]", summary[0].options[1]);
      // console.log("Successfully called summary[0].options.length", summary[0].options.length);

      return summaries;
    }
    catch(error){
      console.error("Error during write op", error);
    }
    return [];
  }

  async getContract(){
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = require('./abi.json');

    this.provider = new ethers.BrowserProvider(this.ethereum);
    await this.provider.send("eth_requestAccounts",[]);
    this.signer = await this.provider.getSigner();
    console.log("Signer:", this.signer);
    this.signerAddress = await this.signer.getAddress();

    this.contract = new ethers.Contract(address, abi, this.signer);

    this.ownerAddress = await this.contract.owner();
    console.log("owner", this.ownerAddress);

    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    //ops

    /**isOwner */
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    // //execute all owner only ops and see
    // try{ 
    //   const ownerConnected: boolean = await this.contract['isOwner']();
    //   // const receipt = await tx.wait();
    //   console.log("Successfully called isOwner", ownerConnected);
    // }
    // catch(error){
    //   console.error("Error during write op", error);
    // }

    /**startVotingEvent */
    // this.currentNonce = await this.provider.getTransactionCount(await this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(await this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    // //execute all owner only ops and see
    // try{
    //   const tx = await this.contract['startVotingEvent']("Topic A",["Option I", "Option II"], { nonce: this.currentNonce });
    //   const receipt = await tx.wait();
    //   console.log("Successfully called startVotingEvent", receipt);
    // }
    // catch(error){
    //   console.error("Error during write op", error);
    // }

    /**endVoting */
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    // //execute all owner only ops and see
    // try{
    //   const tx = await this.contract['endVoting'](1, { nonce: this.currentNonce });
    //   const receipt = await tx.wait();
    //   console.log("Successfully called endVoting", receipt);
    // }
    // catch(error){
    //   console.error("Error during write op", error);
    // }

    /**** getResults */
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    // //execute all owner only ops and see
    // try{
    //   const result:Result = await this.contract['getResults'](1, { nonce: this.currentNonce });
    //   // const receipt = await tx.wait();
    //   console.log(`Successfully called getResults: {winnerName: ${result.winnerName}, winnerVoteCount: ${result.winnerVoteCount} } = `);
    // }
    // catch(error){
    //   console.error("Error during write op", error);
    // }

    /**vote */
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    // //execute all owner only ops and see
    // try{
    //   const tx = await this.contract['vote'](1,1, { nonce: this.currentNonce });
    //   // const receipt = await tx.wait();
    //   console.log("Successfully called vote", tx);
    // }
    // catch(error){
    //   console.error("Error during write op", error);
    // }

    /**getOptions */
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    // //execute all owner only ops and see
    // try{ 
    //   const tx:any[] = await this.contract['getOptions'](1, { nonce: this.currentNonce });
    //   // const receipt = await tx.wait();
    //   console.log("Successfully called getOptions", tx[0], tx[1]);
    // }
    // catch(error){
    //   console.error("Error during write op", error);
    // }

    /**votingEventsSummary */
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    // //execute all owner only ops and see
    // try{ 

    //   const summary: Summary[] = await this.contract['votingEventsSummary']({ nonce: this.currentNonce });
    //   // const receipt = await tx.wait();
    //   console.log("Successfully called votingEventsSummary", summary);
    //   for(let sum of summary){
    //     console.log(sum);
    //   }
    //   // console.log("Successfully called summary[0].topic: ", summary[0].topic);
    //   // console.log("Successfully called summary[0].options[1]", summary[0].options[1]);
    //   // console.log("Successfully called summary[0].options.length", summary[0].options.length);

      
    // }
    // catch(error){
    //   console.error("Error during write op", error);
    // }
  }
  

  // async getCurrNonce(){
  //   this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
  //   this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
  //   console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);
  // }
}

//TODO: Create Proxy classes like this for all data we get from contract
// export class Summary {

//   topic: string;
//   options: any[];
//   votingActive: boolean;
//   exists: boolean;

//   constructor(topic: string, options: any[], votingActive: boolean, exists: boolean){
//     this.topic = topic;
//     this.options = options;
//     this.votingActive = votingActive;
//     this.exists = exists;
//   }
// }
