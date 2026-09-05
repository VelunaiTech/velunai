"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import TruckSVG from "./TruckSVG";

// Data imported from centralized file
import { DEVELOPERS } from "../../data/teamData";

function RocketShowcase() {
  const developers = DEVELOPERS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("waiting");
  const [posX, setPosX] = useState(130);
  const [transitionStyle, setTransitionStyle] = useState("none");
  const [showModule, setShowModule] = useState(false);
  const [moduleReveal, setModuleReveal] = useState(false);
  const [moduleClose, setModuleClose] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const timers = useRef([]);
  const rafRef = useRef(null);
  const clearAll = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
  const after = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };
  const developer = developers[currentIndex] || developers[0];
  const runSequence = useCallback((index) => {
    clearAll();
    // Ensure index is within bounds of developers array
    const safeIndex = index % developers.length;
    setCurrentIndex(safeIndex);
    setPhase("waiting");
    setTransitionStyle("none");
    setPosX(130);
    setShowModule(false);
    setModuleReveal(false);
    setModuleClose(false);
    setIsHovering(false);
    setIsExpanded(false);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setPhase("entering");
        setTransitionStyle("left 2s cubic-bezier(0.22, 1, 0.36, 1)");
        setPosX(50);
        after(() => {
          setPhase("hovering");
          setTransitionStyle("none");
          setIsHovering(true);
          setShowModule(true);
        }, 2050);
        after(() => {
          setPhase("revealing");
          setModuleReveal(true);
        }, 2600);
        after(() => {
          setPhase("displaying");
        }, 3800);
        after(() => {
          setPhase("closing");
          setModuleReveal(false);
          setModuleClose(true);
          setIsExpanded(false);
        }, 7050);
        after(() => {
          setPhase("departing");
          setIsHovering(false);
          setShowModule(false);
          setModuleClose(false);
          setTransitionStyle("left 1.8s cubic-bezier(0.55, 0, 1, 0.45)");
          setPosX(-35);
        }, 8400);
        after(() => {
          const next = (safeIndex + 1) % developers.length;
          runSequence(next);
        }, 10600);
      });
    });
  }, [developers.length]);
  useEffect(() => {
    const t = setTimeout(() => runSequence(0), 400);
    return () => {
      clearTimeout(t);
      clearAll();
    };
  }, []);
  return <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 68vw, 420px)" }}>

      {
    /* ── Rocket + Ropes + Card ── all move together as one unit */
  }
      <div
    style={{
      position: "absolute",
      // Vertically: rocket center sits at ~38% from top so card hangs in lower half
      top: "32%",
      left: `${posX}%`,
      transform: "translateX(-50%)",
      transition: transitionStyle,
      willChange: "left",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
        {
    /* Rocket with hover float. The screen and its shutter both live
       inside TruckSVG now, clipped together as one unit. */
  }
        <div
    className={isHovering ? "rocket-hover" : ""}
    style={{ willChange: "transform", position: "relative" }}
  >
          <TruckSVG
    developer={developer}
    isHovering={isHovering}
    phase={phase}
    shutterOpen={moduleReveal}
    showScreen={showModule}
    onScreenClick={() => setIsExpanded(true)}
  />
        </div>
      </div>

      {
    /* Expanded modal — click screen to open, click backdrop or X to close */
  }
      {isExpanded && <div
    onClick={() => setIsExpanded(false)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,4,10,0.75)",
      backdropFilter: "blur(4px)",
      animation: "screenFadeIn 0.25s ease forwards"
    }}
  >
        <div
    className="ts-expand-card"
    onClick={(e) => e.stopPropagation()}
    style={{
      position: "relative",
      width: "min(640px, 92vw)",
      maxHeight: "85vh",
      overflowY: "auto",
      display: "flex",
      gap: "20px",
      padding: "24px",
      borderRadius: "10px",
      background: "radial-gradient(circle at 50% 0%, #0a1a2a 0%, #050d16 100%)",
      border: "1px solid rgba(0,212,255,0.6)",
      boxShadow: "0 0 40px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.1)"
    }}
  >
          <button
    onClick={() => setIsExpanded(false)}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      border: "1px solid rgba(0,212,255,0.5)",
      background: "rgba(0,20,32,0.8)",
      color: "#00D4FF",
      fontSize: "14px",
      lineHeight: 1,
      cursor: "pointer",
      zIndex: 1
    }}
  >
            ✕
          </button>

          <img
    className="ts-expand-photo"
    src={developer.photo}
    alt={developer.photoAlt}
    style={{
      width: "180px",
      height: "220px",
      objectFit: "cover",
      borderRadius: "6px",
      border: "1px solid rgba(0,212,255,0.35)",
      flexShrink: 0
    }}
  />

          <div style={{ flex: 1, minWidth: 0, color: "#fff" }}>
            <h3 style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: "#00D4FF", textShadow: "0 0 10px rgba(0,212,255,0.6)" }}>
              {developer.name}
            </h3>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {developer.role}
            </div>

            <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
              <div>
                <div style={{ fontSize: "9px", color: "#8B9BB4", fontFamily: "monospace" }}>EXPERIENCE</div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{developer.experience}</div>
              </div>
              <div>
                <div style={{ fontSize: "9px", color: "#8B9BB4", fontFamily: "monospace" }}>PROJECTS</div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{developer.projects}</div>
              </div>
            </div>

            <div style={{ marginTop: "14px" }}>
              <div style={{ fontSize: "9px", color: "#00D4FF", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "4px" }}>ABOUT ME</div>
              <p style={{ margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "#a3b1c5" }}>{developer.bio}</p>
            </div>

            <div style={{ marginTop: "14px" }}>
              <div style={{ fontSize: "9px", color: "#00D4FF", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "6px" }}>TECHNOLOGIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {developer.technologies.map((tech) => <span
    key={tech}
    style={{
      fontSize: "11px",
      color: "#00D4FF",
      border: "1px solid rgba(0,212,255,0.35)",
      borderRadius: "4px",
      padding: "3px 8px"
    }}
  >
                    {tech}
                  </span>)}
              </div>
            </div>

            <div style={{ marginTop: "16px", fontSize: "11.5px", color: "#8B9BB4", lineHeight: 1.9 }}>
              <div>{developer.contact.email}</div>
              <div>{developer.contact.linkedin}</div>
              <div>{developer.contact.github}</div>
              {developer.contact.portfolio && <div>{developer.contact.portfolio}</div>}
              {(developer.contact.instagram || developer.contact.phone) && (
                <div>{developer.contact.instagram}{developer.contact.instagram && developer.contact.phone ? ' \u00b7 ' : ''}{developer.contact.phone}</div>
              )}
            </div>
          </div>
        </div>
      </div>}

      {
    /* Developer dots indicator */
  }
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5" style={{ zIndex: 20 }}>
        {developers.map((_, i) => <div
    key={i}
    className="rounded-full transition-all duration-500"
    style={{
      width: i === currentIndex ? "20px" : "8px",
      height: "8px",
      backgroundColor: i === currentIndex ? "var(--primary)" : "rgba(255,255,255,0.2)",
      boxShadow: i === currentIndex ? "0 0 10px var(--primary)" : "none"
    }}
  />)}
      </div>
    </div>;
}
export {
  RocketShowcase as default
};
