import { Routes } from '@angular/router';
import { WebCheckinComponent } from './components/web-checkin/web-checkin.component';
import { CheckinStatusComponent } from './components/checkin-status/checkin-status.component';

export const routes: Routes = [{
    path:'',
    redirectTo:'web-checkin',
    pathMatch:'full'
},
{
    path:'web-checkin',
    component: WebCheckinComponent
},
{
    path:'checkin-status',
    component: CheckinStatusComponent
},
{ path: '**',  redirectTo:'web-checkin',
    pathMatch:'full'}];
