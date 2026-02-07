import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Play, Pause, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  onRecordingComplete?: (audioBlob: Blob) => void;
}

const VoiceRecorder = ({ onTranscript, onRecordingComplete }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-IN";

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
        onTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [onTranscript]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete?.(audioBlob);
      };

      mediaRecorderRef.current.start();
      recognitionRef.current?.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please grant permission and try again.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      recognitionRef.current?.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl!);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setTranscript("");
    setRecordingTime(0);
    onTranscript("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Main Voice Button */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`btn-voice ${isRecording ? "recording bg-destructive" : ""}`}
          aria-label={isRecording ? "Stop recording" : "Start voice recording"}
          aria-pressed={isRecording}
        >
          {isRecording ? (
            <MicOff className="w-10 h-10" aria-hidden="true" />
          ) : (
            <Mic className="w-10 h-10" aria-hidden="true" />
          )}
        </button>
        
        <div className="text-center">
          <p className="text-xl font-semibold text-foreground">
            {isRecording ? "Recording... Tap to Stop" : "Tap to Speak"}
          </p>
          {isRecording && (
            <p className="text-lg text-destructive font-mono mt-1" aria-live="polite">
              {formatTime(recordingTime)}
            </p>
          )}
        </div>
      </div>

      {/* Waveform Animation */}
      {isRecording && (
        <div 
          className="flex items-center justify-center gap-1 h-16" 
          aria-hidden="true"
          role="img"
          aria-label="Audio waveform animation"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-destructive rounded-full animate-wave"
              style={{
                height: `${Math.random() * 40 + 20}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Playback Controls */}
      {audioUrl && !isRecording && (
        <div className="card-accessible space-y-4" role="region" aria-label="Recording playback">
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={togglePlayback}
              variant="outline"
              className="btn-accessible"
              aria-label={isPlaying ? "Pause playback" : "Play recording"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </Button>
            
            <Button
              onClick={resetRecording}
              variant="outline"
              className="btn-accessible"
              aria-label="Record again"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Record Again</span>
            </Button>
          </div>
        </div>
      )}

      {/* Live Transcript */}
      {transcript && (
        <div 
          className="card-highlight space-y-2" 
          role="region" 
          aria-label="Speech transcript"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 text-success">
            <Check className="w-5 h-5" />
            <span className="font-semibold">Your message:</span>
          </div>
          <p className="text-lg">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
