import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Defines the routes for the application.
 */
const routes: Routes = [];

/**
 * The routing module that defines and imports application routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
