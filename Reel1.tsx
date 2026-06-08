import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

const GREEN = "#10B981";
const BLUE = "#2563EB";
const DARK = "#060B18";
const DARK2 = "#0A1628";
const WHITE = "#FFFFFF";
const YELLOW = "#F59E0B";
const SANS = "'Plus Jakarta Sans', sans-serif";
const SERIF = "'Fraunces', serif";

function fadeIn(frame: number, start: number, duration = 15) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
}

function slideUp(frame: number, start: number, duration = 15, px = 40) {
  return interpolate(frame, [start, start + duration], [px, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });
}

function scaleIn(frame: number, start: number, duration = 15) {
  return interpolate(frame, [start, start + duration], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
}

// Screen 1 — POV hook
function Screen1({ frame }: { frame: number }) {
  const op = fadeIn(frame, 0, 20);
  const y1 = slideUp(frame, 5, 20);
  const op2 = fadeIn(frame, 25, 15);
  const y2 = slideUp(frame, 25, 15);
  const op3 = fadeIn(frame, 45, 15);
  const y3 = slideUp(frame, 45, 15);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #1a0a2e, #0d1b3e)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 60, opacity: op
    }}>
      <div style={{
        fontFamily: SANS, fontSize: 22, fontWeight: 700,
        color: "rgba(255,255,255,0.5)", letterSpacing: 3,
        textTransform: "uppercase", marginBottom: 24,
        transform: `translateY(${y1}px)`, opacity: op
      }}>
        POV 👀
      </div>
      <div style={{
        fontFamily: SANS, fontSize: 38, fontWeight: 800,
        color: WHITE, textAlign: "center", lineHeight: 1.3,
        transform: `translateY(${y2}px)`, opacity: op2,
        marginBottom: 20
      }}>
        Your dental clinic still takes bookings via
      </div>
      <div style={{
        fontFamily: SERIF, fontSize: 56, fontWeight: 900,
        color: YELLOW, textAlign: "center",
        transform: `translateY(${y3}px)`, opacity: op3,
        textShadow: `0 0 40px ${YELLOW}66`
      }}>
        text message 📱
      </div>
    </AbsoluteFill>
  );
}

// Screen 2 — While other clinics
function Screen2({ frame, startFrame }: { frame: number; startFrame: number }) {
  const op = fadeIn(frame, startFrame, 20);
  const y1 = slideUp(frame, startFrame + 5, 20);
  const op2 = fadeIn(frame, startFrame + 25, 15);
  const y2 = slideUp(frame, startFrame + 25, 15);
  const op3 = fadeIn(frame, startFrame + 45, 15);
  const y3 = slideUp(frame, startFrame + 45, 15);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #062012, #0A1628)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 60, opacity: op
    }}>
      <div style={{
        fontFamily: SANS, fontSize: 26, fontWeight: 700,
        color: "rgba(255,255,255,0.5)",
        transform: `translateY(${y1}px)`,
        marginBottom: 20, textAlign: "center"
      }}>
        Meanwhile...
      </div>
      <div style={{
        fontFamily: SANS, fontSize: 34, fontWeight: 800,
        color: WHITE, textAlign: "center", lineHeight: 1.3,
        transform: `translateY(${y2}px)`, opacity: op2,
        marginBottom: 20
      }}>
        Other clinics are getting
      </div>
      <div style={{
        fontFamily: SERIF, fontSize: 50, fontWeight: 900,
        color: GREEN, textAlign: "center", lineHeight: 1.2,
        transform: `translateY(${y3}px)`, opacity: op3,
        textShadow: `0 0 40px ${GREEN}66`
      }}>
        GCash bookings 💳{"\n"}at midnight 🌙
      </div>
    </AbsoluteFill>
  );
}

// Screen 3 — While you sleep
function Screen3({ frame, startFrame }: { frame: number; startFrame: number }) {
  const op = fadeIn(frame, startFrame, 20);
  const s = scaleIn(frame, startFrame + 10, 20);
  const op2 = fadeIn(frame, startFrame + 30, 20);
  const y2 = slideUp(frame, startFrame + 30, 20);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #0d0d2e, #1a1a3e)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 60, opacity: op
    }}>
      <div style={{
        fontSize: 120, transform: `scale(${s})`,
        marginBottom: 32, display: "block", textAlign: "center"
      }}>
        😴
      </div>
      <div style={{
        fontFamily: SANS, fontSize: 36, fontWeight: 800,
        color: WHITE, textAlign: "center", lineHeight: 1.3,
        transform: `translateY(${y2}px)`, opacity: op2
      }}>
        While you sleep...{"\n"}they're already{"\n"}fully booked!
      </div>
    </AbsoluteFill>
  );
}

// Screen 4 — Dentoq reveal
function Screen4({ frame, startFrame }: { frame: number; startFrame: number }) {
  const op = fadeIn(frame, startFrame, 25);
  const logoS = scaleIn(frame, startFrame + 10, 25);
  const op2 = fadeIn(frame, startFrame + 30, 20);
  const y2 = slideUp(frame, startFrame + 30, 20);
  const op3 = fadeIn(frame, startFrame + 50, 20);
  const y3 = slideUp(frame, startFrame + 50, 20);

  const features = ["💬 Messenger & Viber", "💳 GCash & Maya", "📲 SMS Reminders", "🔍 Google Reserve"];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${DARK}, ${DARK2})`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 50, opacity: op
    }}>
      {/* Logo */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        marginBottom: 32, transform: `scale(${logoS})`
      }}>
        <div style={{
          width: 64, height: 64,
          background: `linear-gradient(135deg, ${GREEN}, #06B6D4)`,
          borderRadius: 18, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 32, boxShadow: `0 8px 32px ${GREEN}44`
        }}>🦷</div>
        <div style={{
          fontFamily: SERIF, fontSize: 48,
          fontWeight: 900, color: WHITE
        }}>Dentoq</div>
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: SANS, fontSize: 22, fontWeight: 700,
        color: "rgba(255,255,255,0.7)", textAlign: "center",
        transform: `translateY(${y2}px)`, opacity: op2,
        marginBottom: 32, lineHeight: 1.4
      }}>
        The dental booking app{"\n"}built for the Philippines 🇵🇭
      </div>

      {/* Features */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 10,
        width: "100%", transform: `translateY(${y3}px)`, opacity: op3
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${GREEN}33`,
            borderRadius: 12, padding: "12px 20px",
            fontFamily: SANS, fontSize: 18, fontWeight: 600,
            color: WHITE, textAlign: "center"
          }}>
            {f}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

// Screen 5 — CTA
function Screen5({ frame, startFrame }: { frame: number; startFrame: number }) {
  const op = fadeIn(frame, startFrame, 25);
  const y1 = slideUp(frame, startFrame + 10, 20);
  const op2 = fadeIn(frame, startFrame + 30, 20);
  const y2 = slideUp(frame, startFrame + 30, 20);
  const op3 = fadeIn(frame, startFrame + 50, 20);
  const pulseScale = interpolate(
    frame % 60, [0, 30, 60], [1, 1.03, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, #062012, #0A1628)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 50, opacity: op
    }}>
      <div style={{
        fontFamily: SANS, fontSize: 28, fontWeight: 700,
        color: "rgba(255,255,255,0.7)", textAlign: "center",
        transform: `translateY(${y1}px)`,
        marginBottom: 24, lineHeight: 1.4
      }}>
        Don't let your clinic{"\n"}get left behind!
      </div>

      {/* CTA Button */}
      <div style={{
        background: `linear-gradient(135deg, ${GREEN}, #06B6D4)`,
        borderRadius: 20, padding: "20px 48px",
        marginBottom: 20,
        boxShadow: `0 8px 40px ${GREEN}55`,
        transform: `translateY(${y2}px) scale(${pulseScale})`,
        opacity: op2, textAlign: "center"
      }}>
        <div style={{
          fontFamily: SANS, fontSize: 14, fontWeight: 700,
          color: "rgba(255,255,255,0.8)", marginBottom: 4,
          letterSpacing: 1, textTransform: "uppercase"
        }}>
          👑 Start FREE
        </div>
        <div style={{
          fontFamily: SERIF, fontSize: 32, fontWeight: 900,
          color: WHITE
        }}>
          14-Day Trial
        </div>
      </div>

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 24, color: GREEN, fontWeight: 600,
        letterSpacing: 1, transform: `translateY(${y2}px)`,
        opacity: op2, marginBottom: 12
      }}>
        dentoq.io
      </div>

      <div style={{
        fontFamily: SANS, fontSize: 14,
        color: "rgba(255,255,255,0.4)",
        transform: `translateY(${y3}px)`, opacity: op3,
        textAlign: "center"
      }}>
        No credit card · Setup in 10 minutes
      </div>
    </AbsoluteFill>
  );
}

// ── MAIN ─────────────────────────────────────────────────────
export const Reel1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each screen: ~4 seconds = 120 frames
  // Total: 5 screens × ~4s = ~20 seconds
  const S1_END = 4 * fps;       // 0-4s
  const S2_END = 8 * fps;       // 4-8s
  const S3_END = 12 * fps;      // 8-12s
  const S4_END = 17 * fps;      // 12-17s
  // S5: 17-22s

  return (
    <AbsoluteFill style={{ background: DARK }}>
      {frame < S1_END && <Screen1 frame={frame} />}
      {frame >= S1_END && frame < S2_END && <Screen2 frame={frame} startFrame={S1_END} />}
      {frame >= S2_END && frame < S3_END && <Screen3 frame={frame} startFrame={S2_END} />}
      {frame >= S3_END && frame < S4_END && <Screen4 frame={frame} startFrame={S3_END} />}
      {frame >= S4_END && <Screen5 frame={frame} startFrame={S4_END} />}
    </AbsoluteFill>
  );
};
