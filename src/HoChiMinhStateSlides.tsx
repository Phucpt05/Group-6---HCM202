import React, { useState, useEffect, useCallback } from "react";

// ---------- Design tokens ----------
const COLORS = {
  paper: "#F2F0E7",
  ink: "#20241F",
  inkSoft: "#54584E",
  red: "#9E2A2B",
  redDeep: "#7A1F20",
  gold: "#A9822C",
  line: "rgba(32,36,31,0.14)",
  card: "#FBFAF6",
  goldCard: "#EFE3D1",
};

// ---------- Small building blocks ----------

const FrameTop: React.FC<{ eyebrow: string; num: string }> = ({ eyebrow, num }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderBottom: `1px solid ${COLORS.line}`,
      paddingBottom: 14,
      marginBottom: "auto",
    }}
  >
    <span
      style={{
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: COLORS.inkSoft,
        fontWeight: 600,
      }}
    >
      {eyebrow}
    </span>
    <span style={{ fontSize: 11, letterSpacing: "0.1em", color: COLORS.inkSoft, fontWeight: 600 }}>
      {num}
    </span>
  </div>
);

const SecHead: React.FC<{ roman: string; title: string }> = ({ roman, title }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginBottom: 8 }}>
    <span
      className="font-serif"
      style={{
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: "clamp(48px,6vw,78px)",
        color: COLORS.red,
        lineHeight: 0.8,
        opacity: 0.9,
      }}
    >
      {roman}
    </span>
    <span
      className="font-serif"
      style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 600, lineHeight: 1.15, maxWidth: "22ch" }}
    >
      {title}
    </span>
  </div>
);

const SecDesc: React.FC<{ children: React.ReactNode; bare?: boolean }> = ({ children, bare }) => (
  <p
    style={{
      marginTop: bare ? 6 : 16,
      fontSize: 15.5,
      color: COLORS.inkSoft,
      maxWidth: "64ch",
      lineHeight: 1.6,
      border: bare ? "none" : `0 0 1px ${COLORS.line}`,
      borderBottom: bare ? "none" : `1px solid ${COLORS.line}`,
      paddingBottom: bare ? 0 : 22,
    }}
  >
    {children}
  </p>
);

const Card: React.FC<{ k?: string; title: string; children: React.ReactNode }> = ({ k, title, children }) => (
  <div
    style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.line}`,
      borderRadius: 2,
      padding: "22px 22px 20px",
      boxShadow: "0 10px 30px rgba(32,36,31,0.08)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: COLORS.red }} />
    {k && (
      <span
        className="font-serif"
        style={{ fontStyle: "italic", fontSize: 13, color: COLORS.redDeep, fontWeight: 600, marginBottom: 8, display: "block" }}
      >
        {k}
      </span>
    )}
    <h4 className="font-serif" style={{ fontSize: 16.5, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.3 }}>
      {title}
    </h4>
    <p style={{ fontSize: 13.6, lineHeight: 1.55, color: COLORS.inkSoft, margin: 0 }}>{children}</p>
  </div>
);

const QuoteBlock: React.FC<{ quote: string; cite: string }> = ({ quote, cite }) => (
  <div
    style={{
      background: COLORS.redDeep,
      color: COLORS.paper,
      padding: "26px 26px 24px",
      borderRadius: 2,
      boxShadow: "0 10px 30px rgba(32,36,31,0.08)",
      position: "relative",
    }}
  >
    <span
      className="font-serif"
      style={{
        position: "absolute",
        top: -6,
        left: 16,
        fontSize: 60,
        color: "rgba(242,240,231,0.35)",
        lineHeight: 1,
      }}
    >
      &ldquo;
    </span>
    <p className="font-serif" style={{ fontStyle: "italic", fontSize: 16, lineHeight: 1.55, margin: "14px 0 0", position: "relative", zIndex: 1 }}>
      {quote}
    </p>
    <div style={{ marginTop: 14, fontSize: 11.5, opacity: 0.7, letterSpacing: "0.04em" }}>{cite}</div>
  </div>
);

const DuoCard: React.FC<{ tag: string; variant: "a" | "b"; children: React.ReactNode }> = ({ tag, variant, children }) => (
  <div
    style={{
      padding: 26,
      borderRadius: 2,
      boxShadow: "0 10px 30px rgba(32,36,31,0.08)",
      border: `1px solid ${variant === "b" ? "rgba(169,130,44,0.35)" : COLORS.line}`,
      background: variant === "b" ? COLORS.goldCard : COLORS.card,
    }}
  >
    <span
      className="font-serif"
      style={{ fontStyle: "italic", fontWeight: 700, fontSize: 19, marginBottom: 10, display: "block", color: variant === "b" ? COLORS.gold : COLORS.redDeep }}
    >
      {tag}
    </span>
    <p style={{ fontSize: 14, color: COLORS.inkSoft, lineHeight: 1.6, margin: 0 }}>{children}</p>
  </div>
);

const BulletItem: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14.5, lineHeight: 1.55, color: COLORS.ink }}>
    <span
      className="font-serif"
      style={{
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: `1.4px solid ${COLORS.red}`,
        color: COLORS.redDeep,
        fontWeight: 600,
        fontSize: 12,
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

// ---------- Slide wrapper ----------
const Slide: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      padding: "6vh 8vw 5vh",
    }}
  >
    {children}
  </div>
);

// ---------- Main component ----------
export default function HoChiMinhStateSlides() {
  const [idx, setIdx] = useState(0);
  const total = 10;

  const go = useCallback(
    (n: number) => {
      if (n < 0 || n >= total) return;
      setIdx(n);
    },
    [total]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(idx + 1);
      if (e.key === "ArrowLeft") go(idx - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, go]);

  let touchStartX: number | null = null;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) go(idx - 1);
    if (dx < -50) go(idx + 1);
    touchStartX = null;
  };

  const slides = [
    // 0 — Title
    <Slide key="0">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: COLORS.red, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 12.5, marginBottom: 22 }}>
          <span style={{ width: 34, height: 1.5, background: COLORS.red }} />
          Tư tưởng Hồ Chí Minh · Chương 3
        </div>
        <h1 className="font-serif" style={{ fontSize: "clamp(34px,4.6vw,58px)", lineHeight: 1.1, fontWeight: 600, maxWidth: "16ch", margin: 0 }}>
          Nhà nước <em style={{ color: COLORS.redDeep }}>của nhân dân, do nhân dân, vì nhân dân</em>
        </h1>
        <p style={{ marginTop: 22, fontSize: 17, color: COLORS.inkSoft, maxWidth: "52ch", lineHeight: 1.55 }}>
          Độc lập dân tộc và chủ nghĩa xã hội — hệ thống lý luận về bản chất, cấu trúc quyền lực và đạo đức công vụ trong tư tưởng Hồ Chí Minh.
        </p>
        <div
          style={{
            marginTop: 40,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 18px",
            background: COLORS.card,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 2,
            fontSize: 13,
            boxShadow: "0 10px 30px rgba(32,36,31,0.08)",
          }}
        >
          Phần II ·{" "}
          <b className="font-serif" style={{ color: COLORS.redDeep, fontStyle: "italic", fontWeight: 600 }}>
            Tư tưởng Hồ Chí Minh về Nhà nước của Nhân dân, Do nhân dân, Vì nhân dân
          </b>
        </div>
      </div>
    </Slide>,

    // 1 — I: 3 phương diện
    <Slide key="1">
      <FrameTop eyebrow="Bản chất Nhà nước" num="01 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="I" title="Bản chất giai cấp công nhân của Nhà nước" />
        <SecDesc>
          Nhà nước Việt Nam Dân chủ Cộng hòa mang bản chất dân chủ sâu sắc, nhưng không phải là "nhà nước toàn dân" phi giai cấp — mà mang bản chất giai cấp công nhân, thể hiện qua ba phương diện:
        </SecDesc>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 26 }} className="grid-resp-3">
          <Card k="01" title="Đảng cầm quyền">
            Đảng Cộng sản lãnh đạo tuyệt đối — bằng đường lối thể chế hóa thành luật, bằng sự gương mẫu và công tác kiểm tra.
          </Card>
          <Card k="02" title="Định hướng XHCN">
            Mục tiêu nhất quán: đưa đất nước đi lên chủ nghĩa xã hội, làm công cụ cho công nhân và nhân dân lao động.
          </Card>
          <Card k="03" title="Tập trung dân chủ">
            Vừa phát huy quyền làm chủ của dân, vừa thống nhất quyền lực tối cao — đảm bảo hiệu lực hành chính.
          </Card>
        </div>
      </div>
    </Slide>,

    // 2 — I: thống nhất
    <Slide key="2">
      <FrameTop eyebrow="Bản chất Nhà nước" num="02 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="I" title="Thống nhất giữa giai cấp, nhân dân và dân tộc" />
        <SecDesc>Bản chất giai cấp công nhân không đối lập mà thống nhất hữu cơ với tính nhân dân, tính dân tộc — thể hiện ở ba điểm:</SecDesc>
        <ul style={{ listStyle: "none", margin: "22px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 14, maxWidth: "78ch" }}>
          <BulletItem n={1}>
            <b>Nguồn gốc ra đời</b> — thành quả đấu tranh, hy sinh của toàn dân tộc dưới sự lãnh đạo của Đảng, không thuộc riêng giai cấp nào.
          </BulletItem>
          <BulletItem n={2}>
            <b>Mục tiêu, lợi ích nhất quán</b> — lợi ích của giai cấp công nhân thống nhất hoàn toàn với lợi ích của nhân dân lao động và toàn dân tộc.
          </BulletItem>
          <BulletItem n={3}>
            <b>Sứ mệnh lịch sử được ủy thác</b> — tổ chức kháng chiến, xây dựng độc lập, tự do, hòa bình và tiến bộ xã hội.
          </BulletItem>
        </ul>
      </div>
    </Slide>,

    // 3 — II: Của dân
    <Slide key="3">
      <FrameTop eyebrow="Nhà nước của dân" num="03 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="II" title="Quyền lực tối cao thuộc về nhân dân" />
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 44, marginTop: 24, alignItems: "start" }} className="split-resp">
          <div>
            <SecDesc bare>
              "Nhà nước của dân" tức là <b style={{ color: COLORS.redDeep }}>dân là chủ</b> — nhân dân thực thi quyền lực qua hai hình thức dân chủ:
            </SecDesc>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 18 }} className="duo-resp">
              <DuoCard tag="Trực tiếp" variant="a">
                Dân trực tiếp thảo luận, quyết định các vấn đề hệ trọng của quốc gia — hình thức dân chủ hoàn bị nhất.
              </DuoCard>
              <DuoCard tag="Gián tiếp" variant="b">
                Dân ủy thác quyền lực cho cơ quan đại diện do mình bầu ra: Quốc hội, Hội đồng nhân dân.
              </DuoCard>
            </div>
          </div>
          <QuoteBlock quote="Tất cả mọi quyền lực trong nhà nước và trong xã hội đều thuộc về nhân dân." cite="Hồ Chí Minh · Toàn tập, t.8, tr.262" />
        </div>
      </div>
    </Slide>,

    // 4 — II: nguyên tắc
    <Slide key="4">
      <FrameTop eyebrow="Nhà nước của dân" num="04 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="II" title="Nguyên tắc của dân chủ đại diện" />
        <SecDesc>Cán bộ và bộ máy nhà nước chỉ được "thừa ủy quyền" từ dân — ràng buộc bởi những nguyên tắc nghiêm ngặt:</SecDesc>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 22 }} className="grid-resp-2">
          <Card k="Thừa ủy quyền" title="">
            Nhà nước tự thân không có quyền lực. Cán bộ là "công bộc của dân", gánh vác việc chung chứ không đè đầu cưỡi cổ dân.
          </Card>
          <Card k="Đầy tớ của dân" title="">
            Từ Chủ tịch nước đến người quét rác đều là phân công lao động xã hội — đều làm đầy tớ cho nhân dân.
          </Card>
          <Card k="Quyền kiểm soát, bãi miễn" title="">
            Dân có quyền bãi miễn đại biểu không xứng đáng; "nếu Chính phủ làm hại dân thì dân có quyền đuổi Chính phủ".
          </Card>
          <Card k="Luật pháp là công cụ của dân" title="">
            Khác luật thực dân, phong kiến — luật pháp mới phản ánh ý nguyện và là công cụ để dân kiểm soát quyền lực.
          </Card>
        </div>
      </div>
    </Slide>,

    // 5 — III: Do dân
    <Slide key="5">
      <FrameTop eyebrow="Nhà nước do dân" num="05 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="III" title="Chủ động làm chủ và bổn phận công dân" />
        <SecDesc>Hồ Chí Minh đặt yêu cầu song hành biện chứng — dân chủ không chỉ là quyền, mà còn là năng lực và nghĩa vụ:</SecDesc>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 22 }} className="duo-resp">
          <DuoCard tag="Dân là chủ" variant="a">
            Xác định vị thế khách quan và quyền lợi tối cao của nhân dân đối với quyền lực nhà nước.
          </DuoCard>
          <DuoCard tag="Dân làm chủ" variant="b">
            Nhấn mạnh hành động, nghĩa vụ và năng lực chủ động — tuân pháp luật, đóng thuế, bảo vệ tài sản công, và cần được bồi dưỡng "năng lực làm chủ".
          </DuoCard>
        </div>
      </div>
    </Slide>,

    // 6 — IV: Vì dân, phụng sự
    <Slide key="6">
      <FrameTop eyebrow="Nhà nước vì dân" num="06 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="IV" title="Phụng sự vô điều kiện lợi ích của dân" />
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 44, marginTop: 24, alignItems: "start" }} className="split-resp">
          <div style={{ order: 1 }}>
            <SecDesc bare>
              Nhà nước lấy lợi ích và hạnh phúc của dân làm thước đo duy nhất cho mọi hoạt động — tuyệt đối không đặc quyền, đặc lợi. Muốn dân tin, dân phục, cán bộ trước hết phải yêu dân, tôn trọng dân, chí công vô tư.
            </SecDesc>
          </div>
          <div style={{ order: 2 }}>
            <QuoteBlock quote="Việc gì có lợi cho dân thì phải hết sức làm. Việc gì có hại cho dân thì phải hết sức tránh." cite="Hồ Chí Minh · Toàn tập, t.4, tr.21, 52" />
          </div>
        </div>
      </div>
    </Slide>,

    // 7 — IV: mâu thuẫn biện chứng
    <Slide key="7">
      <FrameTop eyebrow="Nhà nước vì dân" num="07 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="IV" title="Mâu thuẫn biện chứng: vừa đầy tớ, vừa lãnh đạo" />
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 30 }} className="dialectic-resp">
          <div style={{ flex: 1 }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 2, padding: 22, boxShadow: "0 10px 30px rgba(32,36,31,0.08)", height: "100%" }}>
              <h4 className="font-serif" style={{ fontSize: 18, margin: "0 0 10px", color: COLORS.redDeep }}>
                Đầy tớ
              </h4>
              <p style={{ fontSize: 13.8, color: COLORS.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Trung thành, tận tụy, cần kiệm liêm chính, chí công vô tư — "lo trước thiên hạ, vui sau thiên hạ".
              </p>
            </div>
          </div>
          <div
            className="font-serif"
            style={{
              width: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: COLORS.redDeep,
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 13,
              gap: 6,
            }}
          >
            <div style={{ width: 1, height: 64, background: COLORS.line }} />
            <span>THỐNG NHẤT</span>
            <div style={{ width: 1, height: 64, background: COLORS.line }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 2, padding: 22, boxShadow: "0 10px 30px rgba(32,36,31,0.08)", height: "100%" }}>
              <h4 className="font-serif" style={{ fontSize: 18, margin: "0 0 10px", color: COLORS.redDeep }}>
                Lãnh đạo
              </h4>
              <p style={{ fontSize: 13.8, color: COLORS.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Trí tuệ, minh mẫn, tầm nhìn xa — định hướng quần chúng, phát hiện và trọng dụng hiền tài.
              </p>
            </div>
          </div>
        </div>
        <p style={{ marginTop: 22, fontSize: 13.6, color: COLORS.inkSoft, maxWidth: "70ch" }}>
          Cán bộ phải "vừa hiền lại vừa minh" — đủ đức và tài để thực hiện cả những việc tưởng chừng hại dân trước mắt nhưng vì lợi ích lâu dài của nhân dân.
        </p>
      </div>
    </Slide>,

    // 8 — V: bảng tổng hợp
    <Slide key="8">
      <FrameTop eyebrow="Tổng hợp" num="08 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SecHead roman="V" title="Ba trụ cột: Của dân · Do dân · Vì dân" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 22 }} className="grid-resp-3">
          {[
            {
              pillar: "Của dân",
              core: "Mọi quyền lực tối cao thuộc về nhân dân; nhà nước chỉ là bên thừa ủy quyền.",
              duty: "Là \"công bộc\", \"đầy tớ\" trung thành; chịu giám sát và có thể bị bãi miễn.",
            },
            {
              pillar: "Do dân",
              core: "Nhà nước do dân lập nên qua tuyển cử dân chủ; dân làm chủ qua quyền và nghĩa vụ.",
              duty: "Tạo điều kiện pháp lý để dân làm chủ; bồi dưỡng \"năng lực làm chủ\" cho dân.",
            },
            {
              pillar: "Vì dân",
              core: "Mục tiêu duy nhất là hạnh phúc, tự do của dân; không đặc quyền, đặc lợi bè phái.",
              duty: "\"Có lợi cho dân hết sức làm, có hại cho dân hết sức tránh\"; vừa đầy tớ vừa lãnh đạo.",
            },
          ].map((p) => (
            <div
              key={p.pillar}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 2,
                padding: "22px 20px",
                boxShadow: "0 10px 30px rgba(32,36,31,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div className="font-serif" style={{ fontWeight: 700, fontStyle: "italic", fontSize: 19, color: COLORS.redDeep, paddingBottom: 10, borderBottom: `2px solid ${COLORS.red}` }}>
                {p.pillar}
              </div>
              <div>
                <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.gold, fontWeight: 700, marginBottom: 4 }}>Cốt lõi</div>
                <p style={{ fontSize: 12.8, lineHeight: 1.5, color: COLORS.inkSoft, margin: 0 }}>{p.core}</p>
              </div>
              <div>
                <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.gold, fontWeight: 700, marginBottom: 4 }}>Trách nhiệm</div>
                <p style={{ fontSize: 12.8, lineHeight: 1.5, color: COLORS.inkSoft, margin: 0 }}>{p.duty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    // 9 — Kết luận
    <Slide key="9">
      <FrameTop eyebrow="Kết luận" num="09 / 10" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
        <h2 className="font-serif" style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 600, maxWidth: "18ch", lineHeight: 1.2, margin: 0 }}>
          Một nhà nước lấy dân làm gốc, lấy phụng sự làm lẽ sống
        </h2>
        <p style={{ marginTop: 18, fontSize: 16, color: COLORS.inkSoft, maxWidth: "54ch", lineHeight: 1.6 }}>
          Tư tưởng Hồ Chí Minh về nhà nước thống nhất bản chất giai cấp công nhân với tính nhân dân, tính dân tộc — dựng nên một mô hình quyền lực mà mọi cán bộ đều là đầy tớ trung thành, đồng thời là người dẫn đường có đức, có tài.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
          {["Của dân", "Do dân", "Vì dân"].map((t) => (
            <span
              key={t}
              className="font-serif"
              style={{
                padding: "12px 20px",
                border: `1px solid ${COLORS.red}`,
                borderRadius: 999,
                fontStyle: "italic",
                fontWeight: 600,
                color: COLORS.redDeep,
                fontSize: 14.5,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Slide>,
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: COLORS.paper,
        color: COLORS.ink,
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Literata', serif; }
        @media (max-width: 820px) {
          .grid-resp-3, .grid-resp-2, .split-resp, .duo-resp { grid-template-columns: 1fr !important; }
          .dialectic-resp { flex-direction: column !important; }
        }
      `}</style>

      {/* progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 2.5,
          background: COLORS.red,
          zIndex: 6,
          transition: "width .4s ease",
          width: `${((idx + 1) / total) * 100}%`,
        }}
      />

      {/* slide viewport */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === idx ? 1 : 0,
              visibility: i === idx ? "visible" : "hidden",
              transform: i === idx ? "translateY(0)" : "translateY(18px)",
              transition: "opacity .5s ease, transform .5s ease, visibility .5s",
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* nav bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8vw 3.2vh",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Đi tới slide ${i + 1}`}
              style={{
                width: i === idx ? 22 : 7,
                height: 7,
                borderRadius: i === idx ? 4 : "50%",
                background: i === idx ? COLORS.red : "rgba(32,36,31,0.22)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all .25s ease",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: COLORS.inkSoft, letterSpacing: "0.05em", minWidth: 44 }}>
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={() => go(idx - 1)}
            aria-label="Trước"
            style={navBtnStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = COLORS.red;
              (e.currentTarget as HTMLButtonElement).style.color = COLORS.paper;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = COLORS.card;
              (e.currentTarget as HTMLButtonElement).style.color = COLORS.ink;
            }}
          >
            ‹
          </button>
          <button
            onClick={() => go(idx + 1)}
            aria-label="Sau"
            style={navBtnStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = COLORS.red;
              (e.currentTarget as HTMLButtonElement).style.color = COLORS.paper;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = COLORS.card;
              (e.currentTarget as HTMLButtonElement).style.color = COLORS.ink;
            }}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  border: `1px solid ${COLORS.line}`,
  background: COLORS.card,
  color: COLORS.ink,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(32,36,31,0.08)",
  fontSize: 20,
  lineHeight: 1,
};
