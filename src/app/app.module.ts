import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FeedComponent } from './feed/feed.component';
import { UserService } from './user.service';
import { FeedService } from './feed.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [UserService, FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
