import React from "react";
import { COLORS, shadow } from "../../constants/theme";

export const FrameTop: React.FC<{ eyebrow: string; num: string }> = ({ eyebrow, num }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderBottom: `1px solid ${COLORS.line}`,
      paddingBottom: 12,
      flexShrink: 0,
    }}
  >
    <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.inkSoft, fontWeight: 600 }}>
      {eyebrow}
    </span>
    <span style={{ fontSize: 11, letterSpacing: "0.1em", color: COLORS.inkSoft, fontWeight: 600 }}>{num}</span>
  </div>
);

export const SecHead: React.FC<{ roman: string; title: string }> = ({ roman, title }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 6, flexShrink: 0 }}>
    <span className="font-serif" style={{ fontStyle: "italic", fontWeight: 600, fontSize: "clamp(36px,4.4vw,58px)", color: COLORS.red, lineHeight: 0.8, opacity: 0.9 }}>
      {roman}
    </span>
    <span className="font-serif" style={{ fontSize: "clamp(19px,2.2vw,28px)", fontWeight: 600, lineHeight: 1.15, maxWidth: "30ch" }}>
      {title}
    </span>
  </div>
);

export const SecDesc: React.FC<{ children: React.ReactNode; bare?: boolean }> = ({ children, bare }) => (
  <p
    style={{
      marginTop: bare ? 4 : 12,
      fontSize: 14,
      color: COLORS.inkSoft,
      maxWidth: "80ch",
      lineHeight: 1.55,
      borderBottom: bare ? "none" : `1px solid ${COLORS.line}`,
      paddingBottom: bare ? 0 : 14,
      flexShrink: 0,
    }}
  >
    {children}
  </p>
);

export const Card: React.FC<{ k?: string; title?: string; children: React.ReactNode }> = ({ k, title, children }) => (
  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 2, padding: "16px 18px", boxShadow: shadow, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: COLORS.red }} />
    {k && (
      <span className="font-serif" style={{ fontStyle: "italic", fontSize: 12, color: COLORS.redDeep, fontWeight: 600, marginBottom: 6, display: "block" }}>
        {k}
      </span>
    )}
    {title && (
      <h4 className="font-serif" style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 }}>
        {title}
      </h4>
    )}
    <p style={{ fontSize: 12.6, lineHeight: 1.5, color: COLORS.inkSoft, margin: 0 }}>{children}</p>
  </div>
);

export const QuoteBlock: React.FC<{ quote: string; cite: string }> = ({ quote, cite }) => (
  <div style={{ background: COLORS.redDeep, color: COLORS.paper, padding: "20px 22px", borderRadius: 2, boxShadow: shadow, position: "relative" }}>
    <span className="font-serif" style={{ position: "absolute", top: -8, left: 14, fontSize: 50, color: "rgba(242,240,231,0.35)", lineHeight: 1 }}>
      &ldquo;
    </span>
    <p className="font-serif" style={{ fontStyle: "italic", fontSize: 14.5, lineHeight: 1.5, margin: "12px 0 0", position: "relative", zIndex: 1 }}>
      {quote}
    </p>
    <div style={{ marginTop: 12, fontSize: 10.5, opacity: 0.7, letterSpacing: "0.04em" }}>{cite}</div>
  </div>
);

export const DuoCard: React.FC<{ tag: string; variant?: "a" | "b" | string; children: React.ReactNode }> = ({ tag, variant, children }) => (
  <div
    style={{
      padding: 18,
      borderRadius: 2,
      boxShadow: shadow,
      border: `1px solid ${variant === "b" ? "rgba(169,130,44,0.35)" : COLORS.line}`,
      background: variant === "b" ? COLORS.goldCard : COLORS.card,
    }}
  >
    <span className="font-serif" style={{ fontStyle: "italic", fontWeight: 700, fontSize: 16, marginBottom: 8, display: "block", color: variant === "b" ? COLORS.gold : COLORS.redDeep }}>
      {tag}
    </span>
    <p style={{ fontSize: 12.6, color: COLORS.inkSoft, lineHeight: 1.55, margin: 0 }}>{children}</p>
  </div>
);

export const BulletItem: React.FC<{ n: number | string; children: React.ReactNode }> = ({ n, children }) => (
  <li style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.8, lineHeight: 1.5, color: COLORS.ink }}>
    <span
      className="font-serif"
      style={{
        flexShrink: 0,
        width: 21,
        height: 21,
        borderRadius: "50%",
        border: `1.4px solid ${COLORS.red}`,
        color: COLORS.redDeep,
        fontWeight: 600,
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1,
      }}
    >
      {n}
    </span>
    <span>{children}</span>
  </li>
);

export const Slide: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "4.5vh 6vw 4vh", gap: 12, overflow: "hidden" }}>
    {children}
  </div>
);

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0, overflow: "hidden" }}>{children}</div>
);
