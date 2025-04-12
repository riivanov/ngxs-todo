import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { OPTIONS_CONFIG, STATES_MODULES } from './store.config';

@NgModule({
  imports: [CommonModule, NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG)],
  exports: [NgxsModule],
})
export class NgxsStoreModule {}
