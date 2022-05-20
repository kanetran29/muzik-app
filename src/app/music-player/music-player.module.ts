import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './components/master/master.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import { SharedModule } from '../shared/shared.module';
import { MusicPlayerRoutingModule } from './sub-modules/music-player.routing';
import { MusicPlayerSharedMaterialModule } from './sub-modules/music-player-material.module';
import { ManagerComponent } from './components/manager/manager.component';
import { LayoutControllerComponent } from './components/layout-controller/layout-controller.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { songReducer } from './store/reducers/songs.reducer';
import { SongEffects } from './store/effects/songs.effects';
import { SongService } from './services/songs.service';
import { ResultComponent } from './components/result/result.component';
import { SongDetailComponent } from './components/manager/song-detail/song-detail.component';
import { ConfirmDeleteComponent } from './components/manager/confirm-delete/confirm-delete.component';
import { UpdateSongComponent } from './components/manager/update-song/update-song.component';
import { FormsModule } from '@angular/forms';
import { AddSongComponent } from './components/manager/add-song/add-song.component';
import { PlayerComponent } from './components/result/player/player.component';
import { VisualizationComponent } from './components/recorder/visualization/visualization.component';
import { SongItemComponent } from './components/result/song-item/song-item.component';
import { PlayingBarComponent } from './components/result/playing-bar/playing-bar.component';
import { LoginComponent } from './components/login/login.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TracksControlComponent } from './components/tracks-control/tracks-control.component';
import { QueueComponent } from './components/queue/queue.component';
import { MiniSongComponent } from './components/mini-song/mini-song.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomeComponent } from './components/home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NewsComponent } from './components/news/news.component';
import { MediSongComponent } from './components/medi-song/medi-song.component';
import { ForYouComponent } from './components/for-you/for-you.component';
import { RecommendGenresComponent } from './components/recommend-genres/recommend-genres.component';
import { RoundedSongComponent } from './components/rounded-song/rounded-song.component';
import { TrendingComponent } from './components/trending/trending.component';
import { TopSongComponent } from './components/trending/top-song/top-song.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { SearchComponent } from './components/search/search.component';
import { SearchChipComponent } from './components/search/search-chip/search-chip.component';
import { CarouselComponent } from './components/news/carousel/carousel.component';
import { CarouselSlideComponent } from './components/news/carousel/carousel-slide/carousel-slide.component';
import { TopArtistComponent } from './components/trending/top-artist/top-artist/top-artist.component';
import { MusicPlayerSongService } from './services/music-player.song.service';
@NgModule({
  declarations: [
    MasterComponent,
    RecorderComponent,
    ManagerComponent,
    LayoutControllerComponent,
    ResultComponent,
    SongDetailComponent,
    ConfirmDeleteComponent,
    UpdateSongComponent,
    AddSongComponent,
    PlayerComponent,
    VisualizationComponent,
    SongItemComponent,
    PlayingBarComponent,
    LoginComponent,
    SideNavComponent,
    TracksControlComponent,
    QueueComponent,
    MiniSongComponent,
    HomeComponent,
    NewsComponent,
    MediSongComponent,
    ForYouComponent,
    RecommendGenresComponent,
    RoundedSongComponent,
    TrendingComponent,
    TopSongComponent,
    MusicPlayerComponent,
    SearchComponent,
    SearchChipComponent,
    CarouselComponent,
    CarouselSlideComponent,
    TopArtistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ScrollingModule,
    DragDropModule,
    MusicPlayerRoutingModule,
    MusicPlayerSharedMaterialModule,
    StoreModule.forFeature('songs', songReducer),
    EffectsModule.forFeature([SongEffects])
  ]
})
export class MusicPlayerModule { }
