import React from "react";
import { COLORS, shadow } from "../../constants/theme";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e?: React.FormEvent) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  passwordError: string;
  setPasswordError: (val: string) => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  passwordInput,
  setPasswordInput,
  passwordError,
  setPasswordError,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(32,36,31,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.paper,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 4,
          padding: "32px 36px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          maxWidth: 420,
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
        <h3 className="font-serif" style={{ fontSize: 20, margin: "0 0 8px", color: COLORS.redDeep, fontWeight: 700 }}>
          Mật mã truy cập Ôn tập
        </h3>
        <p style={{ fontSize: 13, color: COLORS.inkSoft, margin: "0 0 20px", lineHeight: 1.5 }}>
          Vui lòng nhập mật khẩu để mở khóa hệ thống câu hỏi củng cố và ôn tập kiến thức.
        </p>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="password"
            maxLength={10}
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              setPasswordError("");
            }}
            placeholder="Nhập mật khẩu ......"
            autoFocus
            style={{
              padding: "12px 16px",
              fontSize: 16,
              textAlign: "center",
              letterSpacing: "0.2em",
              border: `1.5px solid ${passwordError ? COLORS.red : COLORS.line}`,
              borderRadius: 3,
              outline: "none",
              background: COLORS.card,
              color: COLORS.ink,
              boxSizing: "border-box",
              width: "100%",
            }}
          />

          {passwordError && (
            <div style={{ fontSize: 12, color: COLORS.red, fontWeight: 500 }} className="shake-anim">
              {passwordError}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                background: COLORS.card,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 3,
                color: COLORS.inkSoft,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                background: COLORS.red,
                border: "none",
                borderRadius: 3,
                color: COLORS.paper,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: shadow,
              }}
            >
              Mở khóa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
