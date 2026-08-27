import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Headphones, 
  CheckCircle2, 
  Globe, 
  ChevronDown, 
  ChevronUp,
  Tv
} from 'lucide-react';
import { Course } from '../types';

interface CourseAudioSamplePlayerProps {
  course: Course;
  activePlayingCourseId: string | null;
  onSetActivePlayingCourseId: (courseId: string | null) => void;
}

export const CourseAudioSamplePlayer: React.FC<CourseAudioSamplePlayerProps> = ({
  course,
  activePlayingCourseId,
  onSetActivePlayingCourseId
}) => {
  const isPlaying = activePlayingCourseId === course.id;
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 1
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const durationSec = course.audio_sample_duration_seconds || 20;

  // Luganda spoken preview text tailored to course if not explicitly set
  const lugandaTranscript = course.audio_sample_transcript_luganda || (
    course.category === 'CapCut Video'
      ? `Oli otya mukwano! Mu ssomo lino erya ${course.title}, ngenda kukulaga engeri y’okukwata vidiyo z’ebyamaguzi ku ssimu yo ku CapCut mu ddakiika ttaano zokka nga tuteekako ebbeeyi mu Luganda.`
      : course.category === 'Canva Design'
      ? `Tugenda kukozesa Canva okutegeka flyers ez’omulembe n’ebipande ebyaka ebiraga emiwendo gy’ebintu byo ku dduuka oba salon mu Masaka ne Kampala.`
      : course.category === 'WhatsApp Business'
      ? `Mu ssomo lino, tutegeka dduuka lyo ku WhatsApp Business abaguzi basobole okulaba katalogi, ebifanyi n’emiwendo gy’ebintu byo mu budde bwonna nga tebannakukubira.`
      : course.category === 'Smartphone Photography'
      ? `Soma engeri y’okukozesa ettaala y’eddirisa n’amasannyalaze ku ssimu yo okukwata ebifanyi eby’amaanyi ebitunda mu bwangu.`
      : `Oli otya! Soma essomo lino erya ${course.title} mu Luganda olwangu olutegeerekeka obulungi wano ku SOMESA.`
  );

  const englishTranscript = course.audio_sample_transcript_english || (
    course.category === 'CapCut Video'
      ? `Hello friend! In this lesson on ${course.title}, I will show you how to film product videos on your phone using CapCut in just 5 minutes with clear Luganda pricing.`
      : course.category === 'Canva Design'
      ? `We will use Canva to design modern shop flyers and price posters that attract customers to your shop or salon in Masaka and Kampala.`
      : course.category === 'WhatsApp Business'
      ? `In this lesson, we set up your shop on WhatsApp Business so clients can browse products, photos, and prices 24/7 before calling.`
      : course.category === 'Smartphone Photography'
      ? `Learn how to use window daylight and phone camera angles to take vibrant product photos that sell immediately.`
      : `Hello! Learn this ${course.title} course in simple, clear Luganda right here on SOMESA.`
  );

  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (isPlaying && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);

  // Handle stop if another course begins playing
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [isPlaying]);

  const playSynthesizedMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      if (isMuted) return;

      const now = ctx.currentTime;
      // Warm pleasant acoustic pentatonic notes
      const notes = [329.63, 392.00, 440.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.04, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + 1.4 + idx * 0.15);
      });
    } catch {
      // safe fallback
    }
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      // Pause
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      pausedAtRef.current = playbackProgress;
      onSetActivePlayingCourseId(null);
      return;
    }

    // Start playing
    onSetActivePlayingCourseId(course.id);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    playSynthesizedMelody();

    // Spoken Luganda instruction
    if ('speechSynthesis' in window && !isMuted) {
      try {
        const utterance = new SpeechSynthesisUtterance(lugandaTranscript);
        utterance.rate = 0.94 * playbackSpeed;
        utterance.pitch = 1.05;
        utterance.lang = 'lg-UG';

        const voices = window.speechSynthesis.getVoices();
        const matchedVoice = voices.find(v => v.lang.includes('lg') || v.lang.includes('sw') || v.lang.includes('en-GB') || v.lang.includes('en-ZA'));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onend = () => {
          onSetActivePlayingCourseId(null);
          setPlaybackProgress(1);
          pausedAtRef.current = 0;
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        // graceful animation fallback
      }
    }

    // Timeline animation
    const totalDurationMs = (durationSec / playbackSpeed) * 1000;
    const startTimestamp = performance.now() - (pausedAtRef.current * totalDurationMs);
    startTimeRef.current = startTimestamp;

    const animateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / totalDurationMs, 1);
      setPlaybackProgress(progress);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        onSetActivePlayingCourseId(null);
        pausedAtRef.current = 0;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateProgress);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    pausedAtRef.current = 0;
    setPlaybackProgress(0);
    if (isPlaying) {
      handleTogglePlay(e);
      setTimeout(() => {
        handleTogglePlay(e);
      }, 50);
    }
  };

  const handleSpeedChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const currentSeconds = Math.floor(playbackProgress * durationSec);
  const formattedCurrent = `0:${currentSeconds.toString().padStart(2, '0')}`;
  const formattedTotal = `0:${durationSec.toString().padStart(2, '0')}`;

  // Fake equalizer wave heights
  const bars = [40, 75, 55, 90, 65, 80, 45, 100, 70, 85, 50, 95, 60, 40];

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      id={`audio-sample-player-${course.id}`}
      className={`rounded-2xl transition-all border ${
        isPlaying 
          ? 'bg-emerald-50/90 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs' 
          : 'bg-[#F5F2ED] border-[#E8E3DA] hover:border-[#0A2E24]/30'
      } p-3.5 space-y-2.5`}
    >
      {/* Top Header Row of Player */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
            isPlaying ? 'bg-emerald-600 text-white animate-pulse' : 'bg-[#0A2E24] text-[#FF6321]'
          }`}>
            {isPlaying ? <Headphones className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#0A2E24] block leading-tight">
              {isPlaying ? 'Playing Luganda Audio Sample' : 'Listen to Luganda Sample'}
            </span>
            <span className="text-[10px] text-[#121715]/60 block leading-tight">
              {course.instructor_name} ({durationSec}s Voice Preview)
            </span>
          </div>
        </div>

        {/* Speed button & Audio Indicator */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSpeedChange}
            className="px-2 py-0.5 rounded-md bg-white border border-[#E8E3DA] text-[10px] font-bold text-[#0A2E24] hover:bg-[#E8E3DA] transition-colors cursor-pointer"
            title="Adjust playback speed"
          >
            {playbackSpeed}x
          </button>
          
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 rounded-md text-[#121715]/50 hover:text-[#121715] hover:bg-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-rose-500" /> : <Volume2 className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Center Row: Play Button + Animated Waveform Equalizer + Time */}
      <div className="flex items-center gap-2.5">
        
        {/* Play/Pause Main Trigger Button */}
        <button
          type="button"
          id={`play-sample-btn-${course.id}`}
          onClick={handleTogglePlay}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs ${
            isPlaying
              ? 'bg-[#FF6321] text-white hover:bg-[#e05417]'
              : 'bg-[#0A2E24] text-white hover:bg-[#0F3D30]'
          }`}
          title={isPlaying ? 'Pause sample' : 'Play Luganda audio preview'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Dynamic Animated Waveform & Scrubber */}
        <div className="flex-1 space-y-1">
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
              setPlaybackProgress(newProgress);
              pausedAtRef.current = newProgress;
            }}
            className="h-6 flex items-center gap-1 cursor-pointer bg-white/70 px-2 rounded-lg border border-[#E8E3DA]/80 overflow-hidden relative group/wave"
          >
            {/* Progress Fill Background */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-emerald-200/40 pointer-events-none transition-all duration-100"
              style={{ width: `${playbackProgress * 100}%` }}
            />

            {/* Bouncing Equalizer Bars */}
            {bars.map((height, i) => {
              const barProgress = (i / bars.length);
              const isPast = playbackProgress >= barProgress;

              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-150 ${
                    isPast
                      ? 'bg-emerald-600'
                      : isPlaying
                      ? 'bg-[#0A2E24]/30'
                      : 'bg-[#121715]/20'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(25, (height * (0.4 + (Math.sin(Date.now() / 150 + i) * 0.4))))}%` : `${height * 0.45}%`
                  }}
                />
              );
            })}
          </div>

          {/* Time text indicator */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#121715]/60 px-0.5">
            <span>{formattedCurrent}</span>
            <span className="text-[9px] font-sans font-medium text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
              Luganda Audio
            </span>
            <span>{formattedTotal}</span>
          </div>
        </div>

        {/* Restart Button */}
        {playbackProgress > 0 && (
          <button
            type="button"
            onClick={handleRestart}
            className="w-7 h-7 rounded-lg bg-white hover:bg-[#E8E3DA] border border-[#E8E3DA] text-[#121715]/60 hover:text-[#121715] flex items-center justify-center cursor-pointer shrink-0 transition-colors"
            title="Replay from start"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}

      </div>

      {/* Spoken Transcript Preview Snippet Toggle */}
      <div className="pt-1 border-t border-[#E8E3DA]/80">
        <button
          type="button"
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full flex items-center justify-between text-[10px] font-semibold text-[#0A2E24] hover:text-[#FF6321] transition-colors cursor-pointer py-0.5"
        >
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#FF6321]" />
            <span>{showTranscript ? 'Hide Luganda & English Words' : 'Read Spoken Words (Luganda / English)'}</span>
          </span>
          {showTranscript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showTranscript && (
          <div className="mt-2 p-2.5 rounded-xl bg-white border border-[#E8E3DA] space-y-2 text-[11px] animate-in fade-in duration-200">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mb-1">
                Luganda Spoken Audio:
              </span>
              <p className="font-editorial italic text-[#0A2E24] leading-relaxed">
                «{lugandaTranscript}»
              </p>
            </div>

            <div className="pt-1.5 border-t border-[#F5F2ED]">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#121715]/50 inline-block mb-0.5">
                English Translation:
              </span>
              <p className="text-[#121715]/75 leading-relaxed">
                "{englishTranscript}"
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
