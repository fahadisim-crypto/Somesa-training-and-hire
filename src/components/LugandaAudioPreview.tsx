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
  ArrowRight,
  Radio,
  Zap,
  Globe
} from 'lucide-react';

export interface AudioSample {
  id: string;
  topic: string;
  category: string;
  speaker: string;
  speakerRole: string;
  durationSec: number;
  lugandaText: string;
  englishText: string;
  keywords: { luganda: string; english: string }[];
  tag: string;
}

export const LUGANDA_SAMPLES: AudioSample[] = [
  {
    id: 'sample-capcut',
    topic: 'CapCut Video & Product Reels',
    category: 'CapCut Video',
    speaker: 'Aisha Namukasa',
    speakerRole: 'Certified Video Specialist · Kyotera',
    durationSec: 15,
    tag: '⚡ Most Popular Lesson',
    lugandaText: 'Oli otya mukwano! Mu ssomo lino tugenda kulaba engeri y’okutondawo vidiyo z’ebyamaguzi ku CapCut mu ddakiika ttaano zokka nga tukozesa essimu yo, ate nga tulaga emiwendo n’ebifanyi ebyaka.',
    englishText: 'Hello friend! In this lesson we will see how to create product showcase videos on CapCut in just 5 minutes using your smartphone, showing clear prices and vibrant visuals.',
    keywords: [
      { luganda: 'vidiyo z’ebyamaguzi', english: 'product videos' },
      { luganda: 'ddakiika ttaano', english: 'five minutes' },
      { luganda: 'essimu yo', english: 'your phone' }
    ]
  },
  {
    id: 'sample-canva',
    topic: 'Canva Shop Flyers & Price Lists',
    category: 'Canva Design',
    speaker: 'Mariam Nakanwagi',
    speakerRole: 'Graphic Designer · Masaka',
    durationSec: 14,
    tag: '🎨 Retail Essential',
    lugandaText: 'Kano ke kaseera okulekawo ebiwandiiko eby’emikono. Tugenda kukozesa Canva okutegeka flyers ez’omulembe ezireeta abaguzi abapya ku dduuka lyo oba salon.',
    englishText: 'It’s time to stop handwritten notes. We will use Canva to design modern price posters and promotional flyers that bring new customers to your shop or salon.',
    keywords: [
      { luganda: 'flyers ez’omulembe', english: 'modern flyers' },
      { luganda: 'abaguzi abapya', english: 'new customers' },
      { luganda: 'edduuka lyo', english: 'your shop' }
    ]
  },
  {
    id: 'sample-whatsapp',
    topic: 'WhatsApp Business Catalogue Setup',
    category: 'WhatsApp Business',
    speaker: 'Grace Nakimbugwe',
    speakerRole: 'E-commerce Tutor · Kalisizo',
    durationSec: 15,
    tag: '🛍️ Instant Orders',
    lugandaText: 'Tutegeka dduuka lyo ku WhatsApp Business abaguzi basobole okulaba ebifanyi, amannya n’emiwendo gy’ebintu byo mu budde bwonna nga tonnaba na kuddamu ssimu.',
    englishText: 'We configure your shop on WhatsApp Business so clients can browse products, photos, and prices 24/7 even before you answer the phone.',
    keywords: [
      { luganda: 'dduuka lyo ku WhatsApp', english: 'your WhatsApp shop' },
      { luganda: 'emiwendo gy’ebintu', english: 'item prices' },
      { luganda: 'budde bwonna', english: 'all the time / 24/7' }
    ]
  }
];

interface LugandaAudioPreviewProps {
  onSelectSampleCourse?: (category: string) => void;
  onRequestTutor?: () => void;
}

export const LugandaAudioPreview: React.FC<LugandaAudioPreviewProps> = ({
  onSelectSampleCourse,
  onRequestTutor
}) => {
  const [activeSampleId, setActiveSampleId] = useState<string>(LUGANDA_SAMPLES[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0); // 0 to 1
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const activeSample = LUGANDA_SAMPLES.find((s) => s.id === activeSampleId) || LUGANDA_SAMPLES[0];

  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  // Clean up audio & timers on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

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

      // Create warm ambient melodic harmonic chord to represent natural African acoustic vibe
      const now = ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C major pentatonic
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.08, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + 2.0 + idx * 0.2);
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handlePlaySample = (sample: AudioSample) => {
    if (activeSampleId !== sample.id) {
      setActiveSampleId(sample.id);
      setPlaybackProgress(0);
      pausedAtRef.current = 0;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsPlaying(true);
    playSynthesizedMelody();

    // Use Web Speech Synthesis if available with adjusted pitch and rate for natural voice preview
    if ('speechSynthesis' in window && !isMuted) {
      try {
        const utterance = new SpeechSynthesisUtterance(sample.lugandaText);
        utterance.rate = 0.92 * playbackSpeed;
        utterance.pitch = 1.05;
        utterance.lang = 'lg-UG'; // Luganda if supported, falls back naturally
        
        // Find best local or fallback voice
        const voices = window.speechSynthesis.getVoices();
        const matchedVoice = voices.find(v => v.lang.includes('lg') || v.lang.includes('sw') || v.lang.includes('en-GB') || v.lang.includes('en-ZA'));
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onend = () => {
          setIsPlaying(false);
          setPlaybackProgress(1);
          pausedAtRef.current = 0;
        };

        utterance.onerror = () => {
          // fallback gracefully to timeline animation
        };

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // fallback
      }
    }

    // Run animation timeline
    const totalDurationMs = (sample.durationSec / playbackSpeed) * 1000;
    const startTimestamp = performance.now() - (pausedAtRef.current * totalDurationMs);
    startTimeRef.current = startTimestamp;

    const animateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / totalDurationMs, 1);
      setPlaybackProgress(progress);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        setIsPlaying(false);
        pausedAtRef.current = 0;
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animateProgress);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    pausedAtRef.current = playbackProgress;
  };

  const handleRestart = () => {
    setPlaybackProgress(0);
    pausedAtRef.current = 0;
    handlePlaySample(activeSample);
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlaySample(activeSample);
    }
  };

  const currentSec = Math.floor(playbackProgress * activeSample.durationSec);
  const formattedCurrentTime = `0:${currentSec < 10 ? '0' : ''}${currentSec}`;
  const formattedTotalTime = `0:${activeSample.durationSec < 10 ? '0' : ''}${activeSample.durationSec}`;

  return (
    <div 
      id="luganda-audio-preview-section"
      className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xl space-y-6 relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#0A2E24]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E3DA] pb-6 relative">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2E24]/10 text-[#0A2E24] text-xs font-semibold">
            <Volume2 className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Luganda Audio Previews · Wuliriza Essomo</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121715] tracking-tight">
            Listen to 15-second Luganda lesson previews.
          </h3>
          <p className="text-xs sm:text-sm text-[#121715]/70 max-w-xl">
            Experience how our instructors break down complex tools into natural, relatable Luganda with step-by-step guidance.
          </p>
        </div>

        {/* Audio Quality Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[#F5F2ED] px-3.5 py-2 rounded-2xl border border-[#E8E3DA]">
          <Headphones className="w-4 h-4 text-[#0A2E24]" />
          <div className="text-[11px]">
            <p className="font-bold text-[#0A2E24]">Studio-Clear Voiceovers</p>
            <p className="text-[#121715]/60">Recorded by local female creators</p>
          </div>
        </div>
      </div>

      {/* Sample Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
        {LUGANDA_SAMPLES.map((sample) => {
          const isSelected = sample.id === activeSampleId;
          const isThisPlaying = isSelected && isPlaying;

          return (
            <button
              key={sample.id}
              onClick={() => {
                if (activeSampleId === sample.id) {
                  handleTogglePlayPause();
                } else {
                  handlePlaySample(sample);
                }
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0A2E24] text-white border-[#0A2E24] shadow-md scale-101'
                  : 'bg-[#F5F2ED]/60 text-[#121715] border-[#E8E3DA] hover:bg-[#F5F2ED] hover:border-[#0A2E24]/30'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#FF6321] text-white' : 'bg-white text-[#0A2E24] border border-[#E8E3DA]'
                  }`}>
                    {sample.category}
                  </span>
                  <span className={`text-[11px] font-mono font-semibold ${isSelected ? 'text-emerald-300' : 'text-[#121715]/60'}`}>
                    0:{sample.durationSec}s
                  </span>
                </div>
                
                <h4 className={`font-display font-bold text-sm line-clamp-1 ${isSelected ? 'text-white' : 'text-[#121715]'}`}>
                  {sample.topic}
                </h4>
                <p className={`text-[11px] ${isSelected ? 'text-white/70' : 'text-[#121715]/60'}`}>
                  Speaker: {sample.speaker}
                </p>
              </div>

              {/* Mini Audio Equalizer Bar indicator */}
              <div className="pt-3 mt-2 flex items-center justify-between border-t border-white/15">
                <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${isSelected ? 'text-emerald-300' : 'text-[#0A2E24]'}`}>
                  {isThisPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Playing sample...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play 15s Sample</span>
                    </>
                  )}
                </span>

                {/* Animated sound equalizer bars */}
                <div className="flex items-center gap-0.5 h-4">
                  {[40, 90, 60, 100, 45].map((heightPct, idx) => (
                    <span
                      key={idx}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-emerald-400' : 'bg-[#0A2E24]/30'
                      }`}
                      style={{
                        height: isThisPlaying ? `${Math.max(20, (heightPct * (0.4 + Math.random() * 0.6)))}%` : '25%'
                      }}
                    />
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Audio Player Showcase Bar */}
      <div className="bg-[#0A2E24] text-white rounded-3xl p-5 sm:p-7 shadow-lg space-y-6 relative overflow-hidden">
        
        {/* Top Active Track Metadata & Soundwave Equalizer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <Radio className={`w-6 h-6 text-[#FF6321] ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded">
                  Now Previewing
                </span>
                <span className="text-xs text-white/60">• {activeSample.speakerRole}</span>
              </div>
              <h4 className="font-display font-black text-lg sm:text-xl text-white">
                {activeSample.topic}
              </h4>
            </div>
          </div>

          {/* Controls: Play/Pause, Restart, Speed, Mute */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Speed Multiplier */}
            <button
              onClick={() => {
                const nextSpeed = playbackSpeed === 1.0 ? 1.25 : playbackSpeed === 1.25 ? 0.9 : 1.0;
                setPlaybackSpeed(nextSpeed);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors cursor-pointer text-white/90"
              title="Toggle playback speed"
            >
              {playbackSpeed}x
            </button>

            {/* Restart */}
            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Replay from start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Main Big Play/Pause Button */}
            <button
              onClick={handleTogglePlayPause}
              className="px-5 py-2.5 rounded-full bg-[#FF6321] hover:bg-[#E5571B] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Sample</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Sound Wave & Progress Scrubber */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-white/70">
            <span>{formattedCurrentTime}</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] text-emerald-300 font-sans font-bold">Luganda Audio Wave</span>
            </div>
            <span>{formattedTotalTime}</span>
          </div>

          {/* Interactive Timeline Bar */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProgress = Math.max(0, Math.min(clickX / rect.width, 1));
              setPlaybackProgress(newProgress);
              pausedAtRef.current = newProgress;
              if (isPlaying) {
                handlePlaySample(activeSample);
              }
            }}
            className="w-full h-3 bg-white/15 rounded-full overflow-hidden cursor-pointer relative group"
          >
            <div 
              className="h-full bg-gradient-to-r from-[#FF6321] to-emerald-400 rounded-full transition-all relative"
              style={{ width: `${playbackProgress * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md" />
            </div>
          </div>

          {/* 36 Multi-Frequency Bouncing Waveform Bars */}
          <div className="flex items-center justify-between gap-1 pt-1 h-8">
            {[
              20, 35, 60, 80, 45, 90, 100, 70, 40, 85, 95, 60,
              75, 90, 100, 80, 50, 65, 85, 95, 70, 40, 60, 90,
              100, 85, 60, 75, 90, 65, 45, 80, 70, 50, 30, 20
            ].map((barHeight, i) => {
              const barProgressThreshold = i / 36;
              const hasPassed = playbackProgress >= barProgressThreshold;
              return (
                <div
                  key={i}
                  className={`w-full rounded-full transition-all duration-150 ${
                    hasPassed ? 'bg-emerald-400' : 'bg-white/20'
                  }`}
                  style={{
                    height: isPlaying 
                      ? `${Math.max(15, (barHeight * (0.3 + Math.random() * 0.7)))}%` 
                      : `${barHeight * 0.4}%`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Live Bilingual Transcript & Highlight Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Luganda Spoken Script */}
          <div className="bg-black/25 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Luganda Original (Spoken)
              </span>
              <span className="text-[10px] text-white/50">Instructor Transcript</span>
            </div>
            <p className="text-sm font-medium text-white/95 leading-relaxed italic">
              «{activeSample.lugandaText}»
            </p>
          </div>

          {/* English Translation */}
          <div className="bg-black/25 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6321] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> English Translation
              </span>
              <span className="text-[10px] text-white/50">Full Meaning</span>
            </div>
            <p className="text-xs font-normal text-white/80 leading-relaxed">
              "{activeSample.englishText}"
            </p>
          </div>
        </div>

        {/* Key Vocabulary Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10 text-xs">
          <span className="text-white/60 text-[11px] font-bold">Key Terms in Lesson:</span>
          {activeSample.keywords.map((kw, idx) => (
            <span key={idx} className="bg-white/10 text-white px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/15">
              <strong className="text-emerald-300">{kw.luganda}</strong> = {kw.english}
            </span>
          ))}
        </div>

      </div>

      {/* Action Footer Callouts */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-[#121715]/75">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>All 30+ lessons include full Luganda audio with English subtitle toggles.</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onSelectSampleCourse && onSelectSampleCourse(activeSample.category)}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0A2E24] hover:bg-[#0F3D30] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>View {activeSample.category} Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
