import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist.interface';
import { FingerPrintingResult } from 'src/app/interfaces/fingerPrintingResult.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerArtistService {
  API_BASE_URL = environment.apiMusicUrl;

  constructor(private http: HttpClient) {}

  getAllArtists(): Observable<Artist[]> {
    const url = `${this.API_BASE_URL}/api/artist`;
    return this.http.get<Artist[]>(url);
  }

  getTrendingArtist():Observable<Artist[]> {
    const url = `${this.API_BASE_URL}/api/artists/trending`;
    return this.http.get<Artist[]>(url);
  }

  getArtist(artistId: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.API_BASE_URL}/api/artists/${artistId}`);
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${this.API_BASE_URL}/api/Artists`, artist);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(
      `${this.API_BASE_URL}/api/artists/${artist.artistId}`,
      artist
    );
  }

  deleteArtist(artistId: number): Observable<Artist> {
    return this.http.delete<Artist>(`${this.API_BASE_URL}/api/artists/${artistId}`);
  }

}