import {
  AbsoluteFill,
  Video,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";

// ── BRAND ────────────────────────────────────────────────────
const GREEN = "#10B981";
const BLUE = "#2563EB";
const DARK = "#060B18";
const DARK2 = "#0A1628";
const WHITE = "#FFFFFF";
const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Plus Jakarta Sans', sans-serif";

// ── HELPERS ──────────────────────────────────────────────────
function fadeIn(frame: number, start: number, duration = 20) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
}

function slideUp(frame: number, start: number, duration = 20, px = 30) {
  return interpolate(frame, [start, start + duration], [px, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
}

// ── SCENE COMPONENTS ─────────────────────────────────────────

// Intro overlay shown on top of video
function SceneOverlay({
  frame,
  startFrame,
  endFrame,
  step,
  label,
  sub,
}: {
  frame: number;
  startFrame: number;
  endFrame: number;
  step: string;
  label: string;
  sub?: string;
}) {
  const localFrame = frame - startFrame;
  const duration = endFrame - startFrame;
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 15, endFrame - 15, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const y = slideUp(frame, startFrame, 20);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 40,
        right: 40,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* Step pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: `${GREEN}33`,
          border: `1.5px solid ${GREEN}66`,
          borderRadius: 20,
          padding: "5px 14px",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: GREEN,
            boxShadow: `0 0 8px ${GREEN}`,
          }}
        />
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: GREEN,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          {step}
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: SANS,
          fontSize: 32,
          fontWeight: 800,
          color: WHITE,
          lineHeight: 1.2,
          marginBottom: sub ? 8 : 0,
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
        }}
      >
        {label}
      </div>

      {/* Sub */}
      {sub && (
        <div
          style={{
            fontFamily: SANS,
            fontSize: 15,
            color: "rgba(255,255,255,0.7)",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// Intro scene (no video)
function IntroScene({ frame }: { frame: number }) {
  const opacity = fadeIn(frame, 0, 30);
  const logoY = slideUp(frame, 10, 25);
  const textY = slideUp(frame, 20, 25);
  const subY = slideUp(frame, 30, 25);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${DARK}, ${DARK2})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
          transform: `translateY(${logoY}px)`,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            background: `linear-gradient(135deg, ${GREEN}, #06B6D4)`,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            boxShadow: `0 8px 32px ${GREEN}44`,
          }}
        >
          🦷
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 48,
            fontWeight: 900,
            color: WHITE,
            letterSpacing: -1,
          }}
        >
          Dentoq
        </div>
      </div>

      {/* Main text */}
      <div
        style={{
          fontFamily: SANS,
          fontSize: 28,
          fontWeight: 800,
          color: WHITE,
          textAlign: "center",
          lineHeight: 1.3,
          transform: `translateY(${textY}px)`,
          maxWidth: 600,
          marginBottom: 16,
        }}
      >
        This is what your patients see
        <br />
        when they book at your clinic
      </div>

      {/* Sub */}
      <div
        style={{
          fontFamily: SANS,
          fontSize: 16,
          color: "rgba(255,255,255,0.6)",
          transform: `translateY(${subY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: GREEN,
            boxShadow: `0 0 8px ${GREEN}`,
          }}
        />
        Live demo · dentoq.io?clinic=demo
      </div>
    </AbsoluteFill>
  );
}

// Outro / CTA scene
function OutroScene({ frame, startFrame }: { frame: number; startFrame: number }) {
  const localFrame = frame - startFrame;
  const opacity = fadeIn(frame, startFrame, 30);
  const logoY = slideUp(frame, startFrame + 10, 25);
  const feat1O = fadeIn(frame, startFrame + 20, 20);
  const feat2O = fadeIn(frame, startFrame + 30, 20);
  const feat3O = fadeIn(frame, startFrame + 40, 20);
  const ctaO = fadeIn(frame, startFrame + 55, 25);
  const ctaY = slideUp(frame, startFrame + 55, 25);

  const features = [
    { icon: "💬", label: "Messenger & Viber" },
    { icon: "💳", label: "GCash & Maya" },
    { icon: "📲", label: "SMS Reminders" },
  ];
  const featureOpacities = [feat1O, feat2O, feat3O];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${DARK}, ${DARK2})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 40,
          transform: `translateY(${logoY}px)`,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            background: `linear-gradient(135deg, ${GREEN}, #06B6D4)`,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
          }}
        >
          🦷
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 40,
            fontWeight: 900,
            color: WHITE,
          }}
        >
          Dentoq
        </div>
      </div>

      {/* Features */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 48,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: "14px 20px",
              textAlign: "center",
              opacity: featureOpacities[i],
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {f.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaO,
          transform: `translateY(${ctaY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${GREEN}, #06B6D4)`,
            borderRadius: 16,
            padding: "18px 48px",
            marginBottom: 16,
            boxShadow: `0 8px 32px ${GREEN}44`,
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 22,
              fontWeight: 800,
              color: WHITE,
            }}
          >
            Start FREE 14-Day Trial
          </div>
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 20,
            color: GREEN,
            fontWeight: 600,
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          dentoq.io/signup
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          No credit card · Setup in 10 minutes · Built for the Philippines 🇵🇭
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── MAIN COMPOSITION ─────────────────────────────────────────
export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene timing (in frames at 30fps)
  const INTRO_END = 8 * fps;        // 0-8s   = intro
  const VIDEO_START = 8 * fps;      // 8s     = video starts
  const VIDEO_END = 78 * fps;       // 78s    = video ends
  const OUTRO_START = 78 * fps;     // 78-90s = outro CTA

  // Overlay scene timings (during video)
  const scenes = [
    { start: 8 * fps,  end: 20 * fps, step: "STEP 1 OF 5", label: "Select Your Service",    sub: "Tap to choose · Price shown clearly" },
    { start: 20 * fps, end: 28 * fps, step: "STEP 2 OF 5", label: "Choose Your Dentist",    sub: "All available dentists shown" },
    { start: 28 * fps, end: 42 * fps, step: "STEP 3 OF 5", label: "Pick Date & Time",       sub: "Only available slots shown — no double bookings" },
    { start: 42 * fps, end: 58 * fps, step: "STEP 4 OF 5", label: "Enter Your Details",     sub: "Name · Phone · Email" },
    { start: 58 * fps, end: 68 * fps, step: "STEP 5 OF 5", label: "Review & Confirm",       sub: "One tap — appointment confirmed!" },
    { start: 68 * fps, end: 78 * fps, step: "CONFIRMED ✓", label: "Instant Confirmation!",  sub: "SMS sent automatically to patient" },
  ];

  const isIntro = frame < INTRO_END;
  const isOutro = frame >= OUTRO_START;
  const isVideo = !isIntro && !isOutro;

  // Video fade in/out
  const videoOpacity = interpolate(
    frame,
    [VIDEO_START, VIDEO_START + 15, VIDEO_END - 15, VIDEO_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: DARK, fontFamily: SANS }}>

      {/* INTRO */}
      {isIntro && <IntroScene frame={frame} />}

      {/* VIDEO + OVERLAYS */}
      {isVideo && (
        <>
          {/* Actual screen recording */}
          <div style={{ opacity: videoOpacity, width: "100%", height: "100%" }}>
            <Video
              src="/demo.mov"
              startFrom={0}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Dark gradient at bottom for text readability */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 250,
              background: "linear-gradient(to top, rgba(6,11,24,0.95), transparent)",
            }}
          />

          {/* Step overlays */}
          {scenes.map((scene, i) =>
            frame >= scene.start && frame < scene.end ? (
              <SceneOverlay
                key={i}
                frame={frame}
                startFrame={scene.start}
                endFrame={scene.end}
                step={scene.step}
                label={scene.label}
                sub={scene.sub}
              />
            ) : null
          )}

          {/* Dentoq watermark */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(6,11,24,0.8)",
              border: `1px solid ${GREEN}44`,
              borderRadius: 10,
              padding: "6px 12px",
            }}
          >
            <span style={{ fontSize: 14 }}>🦷</span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 700,
                color: WHITE,
              }}
            >
              Dentoq
            </span>
          </div>
        </>
      )}

      {/* OUTRO */}
      {isOutro && <OutroScene frame={frame} startFrame={OUTRO_START} />}

    </AbsoluteFill>
  );
};
