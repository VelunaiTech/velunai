"use client";

function TruckSVG({ developer, isHovering, phase, shutterOpen, showScreen, onScreenClick }) {
  const accent = developer?.rocketColor || "#00e5ff";

  return (
    <svg
      viewBox="0 0 520 260"
      width="520"
      height="260"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible", position: "relative", zIndex: 2, width: "clamp(320px, 92vw, 520px)", height: "auto" }}
    >
      <defs>
        <linearGradient id="cabHull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b96a3" />
          <stop offset="40%" stopColor="#454f5c" />
          <stop offset="100%" stopColor="#14181e" />
        </linearGradient>
        <linearGradient id="containerHull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#66707c" />
          <stop offset="38%" stopColor="#313841" />
          <stop offset="100%" stopColor="#0d1013" />
        </linearGradient>
        <linearGradient id="cockpitGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8f6ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#082230" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="thrusterCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3feff" stopOpacity="1" />
          <stop offset="35%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hoverGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.65" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dishFace" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e4e9ee" />
          <stop offset="55%" stopColor="#aab4bf" />
          <stop offset="100%" stopColor="#5d6771" />
        </radialGradient>
        <linearGradient id="dishRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c7cfd6" />
          <stop offset="100%" stopColor="#454f58" />
        </linearGradient>
        <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hullSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shutterMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9aa4b0" />
          <stop offset="45%" stopColor="#4b5561" />
          <stop offset="100%" stopColor="#171b21" />
        </linearGradient>
        <pattern id="shutterHazard" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#0a0e13" />
          <rect width="5" height="10" fill={accent} opacity="0.75" />
        </pattern>
        <filter id="truckShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.55" />
        </filter>
      </defs>

      <g filter="url(#truckShadow)">
      <ellipse cx="270" cy="236" rx="235" ry="15" fill={accent} opacity="0.1" />
      <ellipse cx="270" cy="236" rx="235" ry="15" fill="url(#hoverGlow)" opacity="0.35" />

      <path d="M150,30 L462,30 Q472,30 472,40 L472,178 Q472,188 462,188 L150,188 Z" fill="url(#containerHull)" stroke="#04060a" strokeWidth="1.5" />
      <path d="M150,30 L462,30 Q472,30 472,40 L472,58 L150,58 Z" fill="url(#hullSheen)" />
      <path d="M150,30 L172,30 L162,188 L150,188 Z" fill="#04060a" opacity="0.35" />
      <rect x="150" y="70" width="322" height="2.5" fill="url(#edgeGlow)" />
      <rect x="150" y="146" width="322" height="2.5" fill="url(#edgeGlow)" />
      <path d="M330,40 L455,40 L448,178 L323,178 Z" fill="rgba(255,255,255,0.03)" />
      {[195, 235, 275, 315, 355, 395, 435].map((x, i) => (
        <line key={i} x1={x} y1="34" x2={x - 8} y2="184" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}

      {/* Panel seams + rivets for surface depth */}
      {[52, 112].map((y, i) => (
        <line key={`seam-${i}`} x1="150" y1={y} x2="472" y2={y} stroke="#04060a" strokeWidth="1" opacity="0.5" />
      ))}
      {[170, 220, 270].map((x, i) => (
        <g key={`rivrow-${i}`}>
          <circle cx={x} cy="40" r="1.4" fill="#0a0e13" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <circle cx={x} cy="178" r="1.4" fill="#0a0e13" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </g>
      ))}

      <rect x="150" y="30" width="322" height="158" rx="10" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.25" />

      <text x="310" y="112" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" fontSize="19" fill={accent} opacity="0.9" letterSpacing="3">AGENCY</text>
      <line x1="270" y1="120" x2="350" y2="120" stroke={accent} strokeWidth="0.8" opacity="0.4" />

      {[180, 240, 300, 360, 420].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy="37"
          r="2"
          fill={accent}
          style={{ animation: "ledPulse 1.6s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}
        />
      ))}

      <rect x="452" y="150" width="16" height="26" rx="3" fill="#171b21" stroke="#454f5c" strokeWidth="1" />
      <circle
        cx="460"
        cy="163"
        r="4"
        fill="url(#thrusterCore)"
        style={{ animation: "enginePulse 1.1s ease-in-out infinite alternate", transformOrigin: "460px 163px" }}
      />
      <path
        d="M471,159 Q484,163 471,167 Q476,163 471,159 Z"
        fill={accent}
        opacity="0.75"
        style={{ animation: "flameFlicker 0.35s ease-in-out infinite alternate", transformOrigin: "471px 163px" }}
      />
      <line x1="474" y1="163" x2="486" y2="163" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      {[0, 1, 2].map((i) => (
        <circle
          key={`smoke-${i}`}
          cx="474"
          cy="163"
          r="2"
          fill={accent}
          opacity="0.35"
          style={{
            animation: "smokeRise 1.6s ease-out infinite",
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <path d="M42,186 L42,110 Q42,96 55,92 L92,92 Q104,92 111,80 L124,54 Q129,44 141,44 L150,44 L150,186 Z" fill="url(#cabHull)" stroke="#04060a" strokeWidth="1.5" />
      <path d="M42,110 L92,92 Q98,98 96,108 L48,124 Z" fill="url(#hullSheen)" opacity="0.5" />
      <path d="M96,84 Q108,84 115,72 L126,50 Q130,46 137,46 L145,46 L145,84 Z" fill="url(#cockpitGlass)" stroke="#454f5c" strokeWidth="1" />
      <path d="M100,82 L118,54 L127,54 L110,82 Z" fill="rgba(220,250,255,0.45)" />
      <path d="M97,68 L104,68 L101,80 L96,80 Z" fill={accent} opacity="0.3" />
      <line x1="92" y1="92" x2="92" y2="186" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />

      {/* Roof antenna */}
      <line x1="118" y1="44" x2="118" y2="24" stroke="#454f5c" strokeWidth="1.5" />
      <circle
        cx="118"
        cy="22"
        r="2.4"
        fill={accent}
        style={{ animation: "ledPulse 1.2s ease-in-out infinite" }}
      />

      {/* Cab surface rivets */}
      {[100, 130].map((y, i) => (
        <circle key={`cabriv-${i}`} cx="47" cy={y} r="1.3" fill="#0a0e13" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      ))}

      <line x1="52" y1="98" x2="80" y2="98" stroke={accent} strokeWidth="0.8" opacity="0.45" />
      <rect x="46" y="136" width="10" height="26" rx="2" fill="#0d1013" stroke="#3a424c" strokeWidth="1" />
      <circle cx="51" cy="149" r="2.5" fill={accent} />
      <rect x="70" y="132" width="8" height="3" rx="1.5" fill="#b3bcc6" />

      <rect x="38" y="172" width="106" height="12" rx="3" fill="#0d1013" stroke="#3a424c" strokeWidth="1" />
      <rect x="42" y="175" width="18" height="6" rx="1" fill={accent} opacity="0.65" />
      <circle cx="132" cy="178" r="2" fill={accent} opacity="0.8" />

      <circle cx="46" cy="120" r="9" fill="url(#thrusterCore)" />
      <circle cx="46" cy="120" r="4" fill="#f3feff" />

      {[83, 192, 300, 408].map((cx, i) => (
        <g key={i}>
          <ellipse cx={cx} cy="218" rx="28" ry="8" fill="url(#hoverGlow)" />
          <ellipse cx={cx} cy="200" rx="25" ry="9" fill="#20262e" stroke={accent} strokeWidth="1.2" opacity="0.9" />
          <ellipse cx={cx} cy="200" rx="16" ry="6" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.6" />
          <ellipse cx={cx} cy="200" rx="8" ry="3.5" fill="#171b21" />
        </g>
      ))}

      <line x1="60" y1="188" x2="460" y2="188" stroke={accent} strokeWidth="1" opacity="0.45" />
      </g>

      {
    /* Cargo-door screen bay — the developer info screen and the
       shutter that covers it both live inside this one clipped
       region, so the screen is truly *inside* the shutter opening,
       not just visually overlapping it. */
  }
      <clipPath id="shutterClip">
        <rect x="153" y="40" width="314" height="144" rx="4" />
      </clipPath>
      <g clipPath="url(#shutterClip)">
        {
    /* Screen — sits at the bottom of the stack, revealed once the
       shutter leaves above it retract */
  }
        {showScreen && (
          <foreignObject x="153" y="40" width="314" height="144">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              onClick={() => shutterOpen && onScreenClick && onScreenClick()}
              style={{
                width: "314px",
                height: "144px",
                display: "flex",
                padding: "8px 10px",
                gap: "8px",
                textAlign: "left",
                boxSizing: "border-box",
                cursor: shutterOpen ? "pointer" : "default",
                background: "radial-gradient(circle at 50% 0%, #0a1a2a 0%, #050d16 100%)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {
    /* scanline texture + sweep for a real screen feel */
  }
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "repeating-linear-gradient(0deg, rgba(0,212,255,0.06) 0px, rgba(0,212,255,0.06) 1px, transparent 1px, transparent 3px)",
                  pointerEvents: "none"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "18px",
                  background: "linear-gradient(180deg, rgba(0,212,255,0.4), transparent)",
                  animation: "scanLine 3s linear infinite",
                  pointerEvents: "none"
                }}
              />

              {
    /* Left: tiny portrait chip */
  }
              <div
                style={{
                  position: "relative",
                  flexShrink: 0,
                  width: "54px",
                  height: "100%",
                  borderRadius: "3px",
                  overflow: "hidden",
                  border: "1px solid rgba(0,212,255,0.35)",
                  background: "#050d16"
                }}
              >
                <img
                  src={developer.photo}
                  alt={developer.photoAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                />
              </div>

              {
    /* Right: full details */
  }
              <div style={{ position: "relative", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ color: "#00D4FF", fontSize: "13px", fontWeight: 700, letterSpacing: "0.3px", lineHeight: 1.1, textShadow: "0 0 4px rgba(0,212,255,0.8)" }}>{developer.name}</span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "8px", lineHeight: 1.1 }}>{developer.role}</span>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "3px" }}>
                  <span style={{ fontSize: "6.5px", color: "#8B9BB4", fontFamily: "monospace" }}>EXP <span style={{ color: "#fff" }}>{developer.experience}</span></span>
                  <span style={{ fontSize: "6.5px", color: "#8B9BB4", fontFamily: "monospace" }}>PROJECTS <span style={{ color: "#fff" }}>{developer.projects}</span></span>
                </div>
                <p style={{ fontSize: "6.5px", color: "#a3b1c5", lineHeight: 1.35, margin: "4px 0 0", fontFamily: "monospace", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {developer.bio}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "4px" }}>
                  {developer.technologies.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "5.5px",
                        color: "#00D4FF",
                        border: "1px solid rgba(0,212,255,0.35)",
                        borderRadius: "2px",
                        padding: "1px 3px",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: "auto", fontSize: "5.5px", color: "#8B9BB4", fontFamily: "monospace", paddingTop: "3px" }}>
                  {developer.contact.email} &nbsp;|&nbsp; {developer.contact.github}
                </div>
              </div>
            </div>
          </foreignObject>
        )}

        {
    /* Shutter leaves — sit above the screen, slide apart to open,
       slide together to close */
  }
        <g
          style={{
            transform: shutterOpen ? "translateY(-76px)" : "translateY(0)",
            transition: "transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)"
          }}
        >
          <rect x="153" y="40" width="314" height="72" fill="url(#shutterMetal)" />
          {[52, 64].map((y, i) => (
            <line key={`sh-top-${i}`} x1="153" y1={y} x2="467" y2={y} stroke="#04060a" strokeWidth="1" opacity="0.5" />
          ))}
          <rect x="153" y="108" width="314" height="4" fill="url(#shutterHazard)" />
        </g>
        <g
          style={{
            transform: shutterOpen ? "translateY(76px)" : "translateY(0)",
            transition: "transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)"
          }}
        >
          <rect x="153" y="112" width="314" height="72" fill="url(#shutterMetal)" />
          {[124, 148, 160, 172].map((y, i) => (
            <line key={`sh-bot-${i}`} x1="153" y1={y} x2="467" y2={y} stroke="#04060a" strokeWidth="1" opacity="0.5" />
          ))}
          <rect x="153" y="112" width="314" height="4" fill="url(#shutterHazard)" />
        </g>
      </g>
      <circle
        cx="310"
        cy="112"
        r="3"
        fill={shutterOpen ? "#00ff9c" : "#ff3b3b"}
        opacity={shutterOpen ? 0 : 1}
        style={{ transition: "fill 0.3s ease, opacity 0.3s ease 0.15s" }}
      />

      <rect x="469" y="150" width="0" height="0" fill="none" style={{ animation: phase === "departing" ? "ledPulse 0.4s ease-in-out infinite" : "none" }} />
    </svg>
  );
}

export { TruckSVG as default };