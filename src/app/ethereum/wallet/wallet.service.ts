import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Summary } from '../contractProxyClasses/Summary';
import { Result } from '../contractProxyClasses/Result';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { nonOwnerConnected, noOneConnected, ownerConnected } from '../../state/account/account.actions';
import { Option } from '../contractProxyClasses/Option';
import { saveSummariesList, selectLocalNetwork, updateSelectedEvent } from '../../state/contract/contract.actions';

import { WalletConfig } from '../../../../wallet.config'; 
import { selectNetwork } from '../../state/contract/contract.selector';

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

    this.store.select(selectNetwork).subscribe(
      (selectedNetwork)=>{
        this.getContract(selectedNetwork);
      }
    );
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
    //ops
    this.currentNonce = await this.provider.getTransactionCount(await this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(await this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const tx = await this.contract['startVotingEvent'](topic,options, { nonce: this.currentNonce });
      const receipt = await tx.wait();
      console.log("Successfully called startVotingEvent", receipt);

      //refresh summary data in ui
      let summaries = (await this.getSummaries());
      console.log("Summaries", summaries);
      this.store.dispatch(saveSummariesList({summaries}));

      return receipt;
    }
    catch(error){
      console.error("Error during write op", error);
      // alert(error);
      this.handleError(error);
    }
    return false;
  }

  async endVoting(eventId: number){
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
      // alert(error);
      this.handleError(error);
    }
    return false;
  }

  async vote(eventId: number, optionId: number){
    //ops
    this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      const tx = await this.contract['vote'](eventId,optionId, { nonce: this.currentNonce });
      // const receipt = await tx.wait();
      console.log("Successfully called vote", tx);

      //TODO: refresh event data and all summaries only to reflect in ui

      //update summary its option with vote update
      setTimeout(async()=>{
        console.log("Interval 5 sec .")
        let summary = (await this.getSummary(eventId));
        console.log("EventSummary", summary);
        this.store.dispatch(updateSelectedEvent({summary}))
        let summaries = (await this.getSummaries());
        console.log("Summaries", summaries);
        this.store.dispatch(saveSummariesList({summaries}));
      }, 5000);

      return tx;
    }
    catch(error){
      console.error("Error during write op", error);
      // alert(error);
      this.handleError(error);
    }
    return false;
  }

  async getResults(eventId: number){
    //ops
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{
      // , { nonce: this.currentNonce }
      const result:Result = await this.contract['getResults'](eventId);
      // const receipt = await tx.wait();
      console.log(`Successfully called getResults: {winnerName: ${result.winnerName}, winnerVoteCount: ${result.winnerVoteCount} } = `);
      return result;
    }
    catch(error){
      console.error("Error during write op", error);
      // alert(error);
      this.handleError(error);
    }
    return null;
  }

  async isOwner(){
    //ops

    /**isOwner */
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{ 
      const ownerConnected: boolean = await this.contract['isOwner']();
      // const receipt = await tx.wait();
      console.log("Successfully called isOwner", ownerConnected);
      return ownerConnected;
    }
    catch(error){
      console.error("Error during write op", error);
      // alert(error);
      this.handleError(error);
    }
    return false;
  }

  async getOptions(eventId: number){
    //ops
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{ 
      // , { nonce: this.currentNonce }
      const tx:Option[] = await this.contract['getOptions'](eventId);
      // const receipt = await tx.wait();
      console.log("Successfully called getOptions", tx[0], tx[1]);
      return tx;
    }
    catch(error){
      console.error("Error during write op", error);
      // alert(error);
      this.handleError(error);
    }
    return [];
  }

  async getSummaries(): Promise<Summary[]>{
    //ops
    if(this.signer!=null){
      this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
      this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
      console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);
    }


    //execute all owner only ops and see
    try{ 
      // { nonce: this.currentNonce }
      const summaries: Summary[] = await this.contract['votingEventsSummary']();
      // const receipt = await tx.wait();
      console.log("Successfully called votingEventsSummary", summaries);
      for(let summary of summaries){
        console.log(summary);
      }
      return summaries;
    }
    catch(error){
      console.error("Error during write op", error);
      // alert(error);
      this.handleError(error);
    }
    const summaries: Summary[] = [];
    return summaries;
  }


  async getSummary(eventId: number): Promise<Summary|null>{
    //ops
    // this.currentNonce = await this.provider.getTransactionCount(this.signer.getAddress());
    // this.pendingNonce = await this.provider.getTransactionCount(this.signer.getAddress(), 'pending');
    // console.log('Current nonce:', this.currentNonce, 'Pending: ', this.pendingNonce);

    //execute all owner only ops and see
    try{ 
      // , { nonce: this.currentNonce }
      const summary: Summary = await this.contract['getEventSummary'](eventId);
      // const receipt = await tx.wait();
      console.log("Successfully called getEventSummary", summary);

      return summary;
    }
    catch(error){
      console.error("Error during write op", error);
      // alert(error);
      this.handleError(error);
    }
    return null;
  }


  async getContract(network: string){

    const address = WalletConfig[network].contractAddress;
    const defaultProviderEndpoint = WalletConfig[network].providerEndpoint;
    const localAddress = WalletConfig["local"].contractAddress;
    // const defaultProviderEndpoint = "http://localhost:8545";

    // const address = process.env['CONTRACT_ADDRESS'];
    // const defaultProviderEndpoint = process.env['PROVIDER_ENDPOINT'];
    // const localAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    console.log(`fetched address (${address}) and endpoint (${defaultProviderEndpoint})`);

    const abi = require('./abi.json');

    if (!this.ethereum) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults")
      // this.provider = ethers.getDefaultProvider();
      this.provider = new ethers.JsonRpcProvider(defaultProviderEndpoint);
      console.log(this.provider);
      console.error('Ethereum provider not found');
      alert("Please install Metamask or use a Wallet enabled browser!");
      this.signer = null;
      this.signerAddress = null;
    }
    else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      this.provider = new ethers.BrowserProvider(this.ethereum);
      // await this.provider.send("eth_requestAccounts",[]);
      this.signer = await this.provider.getSigner();
      console.log("Signer:", this.signer);
      this.signerAddress = await this.signer.getAddress();
    }

    if(this.signer){
      this.contract = new ethers.Contract(address?address:localAddress, abi, this.signer);
      this.ownerAddress = await this.contract.owner();
      console.log("owner", this.ownerAddress);
    }
    else {
      this.contract = new ethers.Contract(address?address:localAddress, abi, this.provider);
      this.ownerAddress = "";
    }
    



    if(this.signerAddress===this.ownerAddress){
      console.log("Role: OWNER")
      this.store.dispatch(ownerConnected({address: this.signerAddress}));
    }
    else if(this.signerAddress==null){
      console.log("Role: GUEST");
      this.store.dispatch(noOneConnected());
    }
    else{
      console.log("Role: USER");
      this.store.dispatch(nonOwnerConnected({address: this.signerAddress}));
    }

    // await this.startVotingEvent("Topic A", ["Option I", "Option II"])

    let summaries = (await this.getSummaries());
    console.log("Summaries", summaries);
    this.store.dispatch(saveSummariesList({summaries}));

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
  
  handleError(error: any){
    console.log(JSON.stringify(error));
    alert(error.reason);
  }
}
