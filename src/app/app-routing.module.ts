
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivebiddsComponent } from './dashboard/tasks/activebidds/activebidds.component';
import { PosttaskComponent } from './dashboard/tasks/posttask/posttask.component';
import { FindtalentComponent } from './findtalent/findtalent.component';
import { HomeComponent } from './home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WorkComponent } from './work/work.component';
import { ManagetasksComponent } from './dashboard/tasks/managetasks/managetasks.component';
import { ManagebiddersComponent } from './dashboard/tasks/managebidders/managebidders.component';
import { ManagejobsComponent } from './dashboard/userjob/managejobs/managejobs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { WorkDetailComponent } from './work/work-detail/work-detail.component';
import { TalentDetailComponent } from './findtalent/talent-detail/talent-detail.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { ProfilComponent } from './profil/profil.component';
import { PostjobComponent } from './dashboard/userjob/postjob/postjob.component';
import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SearchComponent } from './search/search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { UpdatetaskComponent } from './dashboard/tasks/updatetask/updatetask.component';
import { UpdatetjobComponent } from './dashboard/userjob/updatetjob/updatetjob.component';
import { ManageEventsComponent } from './dashboard/event/manageevents/manageevents.component';
import { PostEventComponent } from './dashboard/event/postevent/postevent.component';
import { ManageStageComponent } from './dashboard/stage/managestages/managestages.component';
import { PostStageComponent } from './dashboard/stage/poststage/poststage.component';
import { UpdateEventComponent } from './dashboard/event/updateevent/updateevent.component';
import { UpdateStageComponent } from './dashboard/stage/updatestage/updatestage.component';
import { EventComponent } from './event/event.component';
import { StageComponent } from './stage/stage.component';
import { EventDetailComponent } from './event/event-details/event-details.component';
import { StageDetailComponent } from './stage/stage-details/stage-details.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path:'', component:LayoutsComponent,
  children: [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: SignupComponent},
    {path: 'work', component: WorkComponent},
    {path: 'search', component: SearchComponent},
    {path: 'findtalent', component: FindtalentComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'aboutus', component: AboutusComponent},
    {path: 'work-detail', component: WorkDetailComponent},
    {path: 'talent-detail', component: TalentDetailComponent},
    {path: 'checkout', component: CheckoutComponent},
    { path: 'stage', component: StageComponent },
    { path: 'stage-details', component: StageDetailComponent },
    { path: 'event', component: EventComponent },
    { path: 'event-details', component: EventDetailComponent }
  ]},
  {path:'dashboard', component:DashboardLayoutComponent,
  children: [
    {path: '', component: DashboardComponent},
    {path: 'profile', component: ProfilComponent},
    {path: 'messages', component: ContactsComponent},        
    {path: 'task/managetasks', component:ManagejobsComponent },
    {path: 'task/posttask', component: PostjobComponent},
    {path: 'job/postjob', component: PosttaskComponent},
    {path: 'task/updatetask', component: UpdatetjobComponent },
    {path: 'job/updatejob', component: UpdatetaskComponent},
    {path: 'job/managejobs', component: ManagetasksComponent},
    
    {path: 'event/manageevents', component: ManageEventsComponent},
    {path: 'event/postevent', component: PostEventComponent},
    {path: 'event/updateevents', component: UpdateEventComponent},

    {path: 'stage/managestage', component: ManageStageComponent},
    {path: 'stage/poststage', component: PostStageComponent},
    {path: 'stage/updatestage', component: UpdateStageComponent},


    
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'invoice', component: InvoiceComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
