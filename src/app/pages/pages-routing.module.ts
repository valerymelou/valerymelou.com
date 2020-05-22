import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      animation: 'HomePage'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      animation: 'AboutPage'
    }
  },
  // {
  //   path: 'portfolio',
  //   component: PortfolioComponent
  // },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      animation: 'ContactPage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
