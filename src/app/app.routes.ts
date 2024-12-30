import { Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesAddComponent } from './components/categories/categories-add/categories-add.component';
import { CategoriesRemoveComponent } from './components/categories/categories-remove/categories-remove.component';
import { InstitutionsAddComponent } from './components/institutions/institutions-add/institutions-add.component';
import { InstitutionsListComponent } from './components/institutions/institutions-list/institutions-list.component';
import { InstitutionsRemoveComponent } from './components/institutions/institutions-remove/institutions-remove.component';
import { PeriodsListComponent } from './components/periods/periods-list/periods-list.component';
import { PeriodsAddComponent } from './components/periods/periods-add/periods-add.component';
import { PeriodsRemoveComponent } from './components/periods/periods-remove/periods-remove.component';
import { MovimentationsAddComponent } from './components/movimentations/movimentations-add/movimentations-add.component';
import { MovimentationsListComponent } from './components/movimentations/movimentations-list/movimentations-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'categories/list', component: CategoriesListComponent },
    { path: 'categories/add', component: CategoriesAddComponent },
    { path: 'categories/remove', component: CategoriesRemoveComponent },
    { path: 'institutions/add', component: InstitutionsAddComponent },
    { path: 'institutions/list', component: InstitutionsListComponent },
    { path: 'institutions/remove', component: InstitutionsRemoveComponent },
    { path: 'periods/list', component: PeriodsListComponent },
    { path: 'periods/add', component: PeriodsAddComponent },
    { path: 'periods/remove', component: PeriodsRemoveComponent },
    { path: 'movimentations/add', component: MovimentationsAddComponent },
    { path: 'movimentations/list', component: MovimentationsListComponent},
    { path: 'dashboard', component: DashboardComponent }
    // {path: 'movimentations/remove', component: MovimentationsRemoveComponent}

];
