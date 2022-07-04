import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Song } from 'src/app/interfaces/song.interface';
import { ApiRequestStatus } from 'src/app/utils/api-request-status.enum';
import { MusicPlayerSongService } from '../../services/music-player.song.service';

export interface SongState {
  songs: Song[];
  getRecommendedSongsStatus: ApiRequestStatus;
}
export const initialState: SongState = {
  songs: [],
  getRecommendedSongsStatus: undefined,
};
@Injectable()
export class ForYouStore extends ComponentStore<SongState> {
  //#region ***Selectors***
  readonly songs$: Observable<Song[]> = this.select((state) => state.songs);
  readonly getTrendingSongsStatus$: Observable<ApiRequestStatus> = this.select(
    (state) => state.getRecommendedSongsStatus
  );

  //#endregion

  //#region ***Updaters (Reducers in @ngrx/store term)***
  readonly updateSongs = this.updater((state, songs: Song[]) => ({
    ...state,
    songs,
  }));

  readonly updateGetRecommendedSongsStatus = this.updater(
    (state, getRecommendedSongsStatus: ApiRequestStatus) => ({
      ...state,
      getRecommendedSongsStatus,
    })
  );

  //#endregion

  //#region ***Effects***
  readonly getSongsEffect = this.effect((userID$: Observable<string>) =>
    userID$.pipe(
      tap(() =>
        this.updateGetRecommendedSongsStatus(ApiRequestStatus.Requesting)
      ),
      switchMap((userID) =>
        this.songService.getRecommendedSongs(userID).pipe(
          tapResponse(
            (songs) => {
              this.updateSongs(songs);
              this.updateGetRecommendedSongsStatus(ApiRequestStatus.Success);
            },
            (err) => {
              this.updateGetRecommendedSongsStatus(ApiRequestStatus.Fail);
            }
          )
        )
      )
    )
  );
  //#endregion

  constructor(private songService: MusicPlayerSongService) {
    super(initialState);
  }
}
