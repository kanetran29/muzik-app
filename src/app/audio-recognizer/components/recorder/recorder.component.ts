import { Component,ChangeDetectorRef, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { StereoAudioRecorder } from "recordrtc";
import { DomSanitizer } from '@angular/platform-browser';
import { SongService } from '../../services/songs.service';
import { fingerPrinting } from '../../store/actions/songs.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import WaveSurfer from 'wavesurfer.js';
@Component({
    selector: 'app-recorder',
    templateUrl: './recorder.component.html',
    styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit, AfterViewInit {

    @ViewChild("ngVisualizationContainer") ngVisualizationContainer: ElementRef;

    containerWidth: number;
    containerHeight: number;

    loadVisualization: boolean;

    selectedVisualization: number = 1;

    showControls: boolean = false;
    timeout: any;
    wavesurfer : WaveSurfer = null;



    record: StereoAudioRecorder;
    recording = false;
    url: string;
    options = {
        mimeType: "audio/wav",
        numberOfAudioChannels: 1,
        sampleRate: 48000,
        blockAlign: 4,
        bitsPerSample: 16
    };

    constructor(
        private domSanitizer: DomSanitizer,
        private songsService: SongService,
        private store: Store<AppState>,
        private cdr: ChangeDetectorRef
        ) { }

    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }

    ngOnInit(): void {
        this.loadVisualization = false;
       
    }

    
    generateWaveForm() : void{
        Promise.resolve(null).then(()=>{
             this.wavesurfer = WaveSurfer.create({
                container: "#waveform",
                height:300,
                waveColor:"violet"
        });
        });
    }


    importData(event:any): void{

        if (event.target.files && event.target.files[0]) {
           
            this.url = URL.createObjectURL(event.target.files[0]);
            this.onPressReview();
        }

    }

    onPressReview() : void{
        if (!this.wavesurfer) {
            this.generateWaveForm();
        }

        this.cdr.detectChanges();

        Promise.resolve().then(() => this.wavesurfer.load(this.url));
    }

    ngAfterViewInit(): void {
        this.getContainerDimensions();
        setTimeout(() => {
            this.initVisualization();
         }, 100);
        // this.initVisualization();
    }

    getContainerDimensions() {
        this.containerWidth = this.ngVisualizationContainer.nativeElement.clientWidth;
        this.containerHeight = this.ngVisualizationContainer.nativeElement.clientHeight;
    }


    initVisualization() {
        this.loadVisualization = true;
    }

    Record() : void{
        if(!this.recording){
            this.initiateRecording();
        }
        else{
            this.stopRecording();
        }
    }


    initiateRecording() {
        this.recording = true;

        let mediaConstraints = {
            video: false,
            audio: true
        };

        navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    successCallback(stream) {
        this.record = new StereoAudioRecorder(stream, this.options);
        this.record.record();
        setTimeout(() => this.stopRecording(),10000)
    }

    stopRecording(): void {
        this.recording = false;
        this.record.stop(this.processRecording.bind(this));
    }

    async processRecording(blob) {
        this.url = URL.createObjectURL(blob);
        this.onPressReview();
        const formData = new FormData();
        formData.append("audio", blob);      
        this.store.dispatch(fingerPrinting({ formData }));    }

    errorCallback(error) {
        throw error('Can not play audio in your browser');
    }

}
