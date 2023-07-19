import { NgModule } from '@angular/core';
import { RoundPipe } from './round.pipe';
import { CustomTimeAgoPipe } from './time-ago.pipe';
import { FtInchPipe } from './ft-inch.pipe';
import { FtInchPipe2 } from './ft-inch2.pipe';

import { CoilAgePipe } from './coil-age.pipe';
import { DeliverTimePipe } from './deliver-time.pipe';

const Pipes = [
    RoundPipe,
    CustomTimeAgoPipe,
    FtInchPipe,
    FtInchPipe2,
    CoilAgePipe,
    DeliverTimePipe
];


@NgModule({
    declarations: [
        ...Pipes
    ],
    imports: [

    ],
    exports: [
        ...Pipes
    ]
})
export class PipesModule {}
