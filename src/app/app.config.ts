import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { connectedUserReducer } from './state/account/account.reducer';
import { connectedContractReducer } from './state/contract/contract.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore(),
    provideState({name: 'accountConnected', reducer: connectedUserReducer }),
    provideState({name: 'contractConnected', reducer: connectedContractReducer })]
};
