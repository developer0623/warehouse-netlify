import { EffectsModule } from '@ngrx/effects';
import { DataEffect } from './data.effect';
import { TaskEffect } from './task.effect';

export const AppEffectsModules = [
  EffectsModule.forRoot([DataEffect, TaskEffect])
];
