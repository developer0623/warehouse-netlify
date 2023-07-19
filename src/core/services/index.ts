
import { TaskService } from './task.service';
import { CoilService } from './coil.service';
import { DataService } from './data.service';
import { NavService } from './navigation.service';
import { LoadingService } from './loading.service';
import { WarehouseHubService } from './warehousehub.service';
// import { AuthGuard } from './auth.guard';

export const APP_SERVICES = [
  TaskService,
  CoilService,
  DataService,
  WarehouseHubService,
  NavService,
  LoadingService,
  // AuthGuard
];
