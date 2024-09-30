import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FindtalentComponent } from './findtalent/findtalent.component';
import { GetintouchComponent } from './getintouch/getintouch.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OffreComponent } from './offre/offre.component';
import { ListeoffreComponent } from './listeoffre/listeoffre.component';
import { ListeprojetComponent } from './listeprojet/listeprojet.component';
import { ListecondidatureComponent } from './listecondidature/listecondidature.component';
import { ProfilComponent } from './profil/profil.component';
import { ContactComponent } from './contact/contact.component';
import { PortfeuilleComponent } from './portfeuille/portfeuille.component';

import { GestionoffreComponent } from './gestionoffre/gestionoffre.component';
import { RechercheworkComponent } from './recherchework/recherchework.component';
import { WorkComponent } from './work/work.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ManagetasksComponent } from './dashboard/tasks/managetasks/managetasks.component';
import { ManagebiddersComponent } from './dashboard/tasks/managebidders/managebidders.component';
import { ActivebiddsComponent } from './dashboard/tasks/activebidds/activebidds.component';
import { PosttaskComponent } from './dashboard/tasks/posttask/posttask.component';
import { ManagejobsComponent } from './dashboard/userjob/managejobs/managejobs.component';
import { ManagecondidatesComponent } from './dashboard/userjob/managecondidates/managecondidates.component';
import { PostjobComponent } from './dashboard/userjob/postjob/postjob.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WorkDetailComponent } from './work/work-detail/work-detail.component';
import { TalentDetailComponent } from './findtalent/talent-detail/talent-detail.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { PostworkComponent } from './postwork/postwork.component';
import { environment } from '../environments/environment';

import{AngularFireDatabaseModule} from '@angular/fire/database';
import{AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import{AngularFireModule}from '@angular/fire';
import{AngularFireAuth} from '@angular/fire/auth';
import { MessageComponent } from './dashboard/message/message.component';
import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SearchComponent } from './search/search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UpdatetaskComponent } from './dashboard/tasks/updatetask/updatetask.component';
import { UpdatetjobComponent } from './dashboard/userjob/updatetjob/updatetjob.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PostEventComponent } from './dashboard/event/postevent/postevent.component';
import { UpdateEventComponent } from './dashboard/event/updateevent/updateevent.component';
import { UpdateStageComponent } from './dashboard/stage/updatestage/updatestage.component';
import { PostStageComponent } from './dashboard/stage/poststage/poststage.component';
import { StageComponent } from './stage/stage.component';
import { EventComponent } from './event/event.component';
import { StageDetailComponent } from './stage/stage-details/stage-details.component';
import { EventDetailComponent } from './event/event-details/event-details.component';
import { CommonModule } from '@angular/common';
import { ManageEventsComponent } from './dashboard/event/manageevents/manageevents.component';
import { ManageStageComponent } from './dashboard/stage/managestages/managestages.component';
    
      // Initialize Firebase
      export const config = {
        apiKey: "AIzaSyBif6NBoBC2ySLZgt1HhVxEQ5Wb1GoegH8",
        authDomain: "edemti-f1cb4.firebaseapp.com",
        projectId: "edemti-f1cb4",
        storageBucket: "edemti-f1cb4.appspot.com",
        messagingSenderId: "629004329701",
        appId: "1:629004329701:web:1e70966abfa4a9c2992a0c",
        measurementId: "G-KK2TTXHM7L"
      };
      AngularFireModule.initializeApp(config);


@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    FindtalentComponent,
    GetintouchComponent,
    AboutusComponent,
    GetstartedComponent,
    LoginComponent,
    SignupComponent,
    OffreComponent,
    ListeoffreComponent,
    ListeprojetComponent,
    ListecondidatureComponent,
    ProfilComponent,
    ContactComponent,
    ContactsComponent,
    PortfeuilleComponent,
    MessageComponent,
    GestionoffreComponent,
    RechercheworkComponent,
    WorkComponent,
    UserComponent,
    DashboardComponent,
    ManagejobsComponent,
    ManagecondidatesComponent,
    PostjobComponent,
    ManagetasksComponent,
    ManagebiddersComponent,
    ActivebiddsComponent,
    PosttaskComponent,
    WorkDetailComponent,
    TalentDetailComponent,
    DashboardLayoutComponent,
    PostworkComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    SearchComponent,
    UpdatetaskComponent,
    UpdatetjobComponent,
    CheckoutComponent,
    InvoiceComponent,
    PostEventComponent,
    UpdateEventComponent,
    UpdateStageComponent,
    PostStageComponent,
    StageComponent,
    StageDetailComponent,
    EventComponent,
    EventDetailComponent,
    ManageEventsComponent,
    ManageStageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule  
  ],
  providers: [AngularFireAuth,
    { provide: AngularFirestore },],
  bootstrap: [AppComponent]
})
export class AppModule { }
