import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent }      from './registration-form/registration-form.component';
import { AuthorizationFormComponent }      from './authorization-form/authorization-form.component';
import { UserListComponent }      from './user-list/user-list.component';
import { MainComponent }      from './main/main.component';
import { PostListComponent }      from './post-list/post-list.component';
import { UserComponent }  from './user/user.component';
import { PostComponent }  from './post/post.component';
import { ConstructorComponent }  from './constructor/constructor.component';

const routes: Routes = [
  { path: 'signup', component: RegistrationFormComponent },
  { path: 'signin', component: AuthorizationFormComponent },
  { path: 'users', component: UserListComponent },
  { path: 'main', component: MainComponent },
  { path: 'instructions', component: PostListComponent },
  { path: 'user/:login', component: UserComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'post/:id', component: PostComponent },
  { path: 'constructor', component: ConstructorComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
