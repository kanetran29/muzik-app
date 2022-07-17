import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, takeWhile } from 'rxjs';
import { Playlist, PlaylistSong } from 'src/app/interfaces/playlist.interface';
import { Song, StreamState } from 'src/app/interfaces/song.interface';
import { AudioPlayerService } from 'src/app/music-player/services/audio-player.service';
import { MusicPlayerPlaylistService } from 'src/app/music-player/services/music-player.playlist.service';
import { MusicPlayerSongService } from 'src/app/music-player/services/music-player.song.service';
import { UtilService } from 'src/app/music-player/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-song',
  templateUrl: './top-song.component.html',
  styleUrls: ['./top-song.component.scss'],
})
export class TopSongComponent implements OnInit, OnDestroy {
  @Input() index: number;
  @Input() song: Song;
  @Input() isSelected = false;
  @Input() playlists: Playlist[];
  duration: string;
  componentActive = true;
  state: StreamState;

  constructor(
    public audioService: AudioPlayerService,
    private downloadService: UtilService,
    private songService: MusicPlayerSongService,
    private playlistService: MusicPlayerPlaylistService
  ) {}

  ngOnInit(): void {
    const audioObj = new Audio();
    audioObj.src = this.song.link.toString();
    audioObj.addEventListener('loadedmetadata', () => {
      this.duration = moment.utc(audioObj.duration * 1000).format('mm:ss');
    });
    this.audioService
      .getState()
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((state) => (this.state = state));
  }
  ngOnDestroy(): void {
    this.componentActive = false;
  }
  play() {
    this.song.listens++;
    this.audioService.playStream(this.song);
    this.audioService.play();
    this.audioService.addToQueue(this.song);
  }
  addToQueue() {
    this.audioService.addToQueue(this.song);
  }
  togglePlay() {
    if (this.state.song?.songId !== this.song.songId) {
      this.song.listens++;
      this.audioService.playStream(this.song);
      this.audioService.play();
    } else {
      this.state.playing ? this.audioService.pause() : this.audioService.play();
    }
  }
  download() {
    this.downloadService
      .download(this.song.link.toString())
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = this.song.songName;
        a.click();
        URL.revokeObjectURL(objectUrl);
        a.remove();
      });
    this.songService
      .downloadedSong(this.song.songId)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe();
    this.song.downloads++;
  }

  addSongToPlaylist(playlistId) {
    const playlistSong: PlaylistSong = {
      playlistId: playlistId,
      songId: this.song.songId,
    };
    this.playlistService
      .addSongToPlaylist(playlistSong)
      .subscribe((res) => console.log(res));
  }
}
