import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './components/master/master.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import { SharedModule } from '../shared/shared.module';
import { AudioRecognizerRoutingModule } from './sub-modules/audio-recognizer.routing';
import { AudioRecognizerSharedMaterialModule } from './sub-modules/audio-recognizer-material.module';
import { ManagerComponent } from './components/manager/manager.component';
import { LayoutControllerComponent } from './components/layout-controller/layout-controller.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { songReducer } from './store/reducers/songs.reducer';
import { SongEffects } from './store/effects/songs.effects';
import { SongService } from './services/songs.service';
import { ResultComponent } from './components/result/result.component';
import { SongDetailComponent } from './components/manager/song-detail/song-detail.component';


@NgModule({
  declarations: [
    MasterComponent,
    RecorderComponent,
    ManagerComponent,
    LayoutControllerComponent,
    ResultComponent,
    SongDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AudioRecognizerRoutingModule,
    AudioRecognizerSharedMaterialModule,
    StoreModule.forFeature('songs', songReducer),
    EffectsModule.forFeature([SongEffects])
  ],
  providers: [SongService],
})
export class AudioRecognizerModule { }
