import React from "react";

export const COLORS = {
  paper: "#F2F0E7",
  ink: "#20241F",
  inkSoft: "#54584E",
  red: "#9E2A2B",
  redDeep: "#7A1F20",
  gold: "#A9822C",
  goldLight: "#D4AF37",
  line: "rgba(32,36,31,0.14)",
  card: "#FBFAF6",
  goldCard: "#EFE3D1",
  green: "#2E7D32",
  greenCard: "#E8F5E9",
  redLightCard: "#FFEBEE",
};

export const shadow = "0 10px 30px rgba(32,36,31,0.08)";

export const navBtnStyle: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  border: `1px solid ${COLORS.line}`,
  background: COLORS.card,
  color: COLORS.ink,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: shadow,
  fontSize: 18,
  lineHeight: 1,
  transition: "all .2s ease",
};
