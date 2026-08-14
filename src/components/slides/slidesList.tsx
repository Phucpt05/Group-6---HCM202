import React from "react";
import { COLORS, shadow } from "../../constants/theme";
import { FrameTop, SecHead, SecDesc, Card, QuoteBlock, DuoCard, BulletItem, Slide, Body } from "../common/UIComponents";
import { DialecticBox } from "./DialecticBox";

export const DIALECTIC_SLIDE_INDICES = [3, 6, 8, 11];

export const createSlides = (
  revealedAnswers: Record<number, boolean>,
  revealCurrentAnswer: (slideIdx: number) => void
): React.ReactNode[] => [
  // 0 — Title (Slide 01) với Ảnh lịch sử Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập
  <Slide key="0">
    <FrameTop eyebrow="Tư tưởng Hồ Chí Minh · Chương 3" num="01 / 14" />
    <Body>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 36, alignItems: "center" }} className="split-resp">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingRight: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: COLORS.red, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 12, marginBottom: 16 }}>
            <span style={{ width: 30, height: 1.5, background: COLORS.red }} />
            Báo cáo chuyên đề HCM202 · Nhóm 6
          </div>
          <h1 className="font-serif" style={{ fontSize: "clamp(28px,3.8vw,48px)", lineHeight: 1.15, fontWeight: 600, maxWidth: "18ch", margin: 0 }}>
            Nhà nước <em style={{ color: COLORS.redDeep }}>của nhân dân, do nhân dân, vì nhân dân</em>
          </h1>
          <p style={{ marginTop: 16, fontSize: 15, color: COLORS.inkSoft, maxWidth: "56ch", lineHeight: 1.55 }}>
            Phân tích lý luận hệ thống và các câu hỏi biện chứng về thực tiễn quản trị hiện đại — độc lập dân tộc và chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh.
          </p>
          <div
            style={{
              marginTop: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              background: COLORS.card,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 2,
              fontSize: 13,
              boxShadow: shadow,
            }}
          >
            Phần II ·{" "}
            <b className="font-serif" style={{ color: COLORS.redDeep, fontStyle: "italic", fontWeight: 600 }}>
              Tư tưởng Hồ Chí Minh về Nhà nước kiểu mới
            </b>
          </div>
        </div>

        {/* Khung ảnh tư liệu lịch sử to, cân đối và nổi bật */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div
            style={{
              position: "relative",
              padding: "10px 10px 8px",
              background: COLORS.card,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 4,
              boxShadow: "0 18px 45px rgba(32,36,31,0.14)",
              width: "100%",
              maxWidth: 620,
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "clamp(260px, 44vh, 420px)", overflow: "hidden", borderRadius: 2 }}>
              <img
                src="/119322_chu_tich_ho_chi_minh_doc_tuyen_ngon_doc_lap_anh_t_l_05340013.jpg"
                alt="Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 25%",
                  display: "block",
                }}
              />
            </div>
            <div style={{ padding: "8px 4px 4px", textAlign: "center" }}>
              <p
                className="font-serif"
                style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.45,
                  color: COLORS.ink,
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình (2/9/1945)
              </p>
              <span style={{ fontSize: 10.5, color: COLORS.redDeep, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginTop: 2 }}>
                Khai sinh nước Việt Nam Dân chủ Cộng hòa
              </span>
            </div>
          </div>
        </div>
      </div>
    </Body>
  </Slide>,

  // 1 — I: 3 phương diện (02 / 14)
  <Slide key="1">
    <FrameTop eyebrow="I. Bản chất Nhà nước" num="02 / 14" />
    <Body>
      <SecHead roman="I" title="Bản chất giai cấp công nhân của Nhà nước" />
      <SecDesc>
        Nhà nước Việt Nam Dân chủ Cộng hòa mang bản chất dân chủ sâu sắc, nhưng Hồ Chí Minh tuyệt đối phủ nhận quan điểm cho rằng đây là một "nhà nước toàn dân" theo nghĩa phi giai cấp. Nhà nước ở đâu và bao giờ cũng mang bản chất của một giai cấp nhất định — Nhà nước mới của ta mang bản chất giai cấp công nhân, thể hiện trên ba phương diện:
      </SecDesc>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 14 }} className="grid-resp-3">
        <Card k="01 — Đảng cầm quyền" title="Vai trò lãnh đạo tuyệt đối của Đảng">
          Đảng Cộng sản Việt Nam giữ vị trí cầm quyền. Đảng cầm quyền bằng đường lối, chủ trương, chính sách để thể chế hóa thành luật pháp; bằng sự gương mẫu của tổ chức Đảng và đảng viên trong bộ máy; và thông qua công tác kiểm tra chặt chẽ.
        </Card>
        <Card k="02 — Tính định hướng XHCN" title="Mục tiêu nhất quán">
          Mục tiêu nhất quán của Nhà nước mới là đưa đất nước đi lên chủ nghĩa xã hội và chủ nghĩa cộng sản. Giành chính quyền, lập ra Nhà nước mới là nhằm tạo dựng công cụ mạnh mẽ để giai cấp công nhân và nhân dân lao động thực hiện mục tiêu vĩ đại này.
        </Card>
        <Card k="03 — Tập trung dân chủ" title="Nguyên tắc tổ chức cốt lõi">
          Nguyên tắc cốt lõi trong tổ chức và hoạt động của bộ máy nhà nước. Hồ Chí Minh chú trọng cả hai mặt: dân chủ (phát huy quyền làm chủ của nhân dân) và tập trung (thống nhất quyền lực tối cao về tay nhân dân) để đảm bảo hiệu lực hành chính tối đa.
        </Card>
      </div>
    </Body>
  </Slide>,

  // 2 — I: thống nhất giai cấp - dân tộc (03 / 14)
  <Slide key="2">
    <FrameTop eyebrow="I. Bản chất Nhà nước" num="03 / 14" />
    <Body>
      <SecHead roman="I" title="Thống nhất giữa giai cấp, nhân dân và dân tộc" />
      <SecDesc>
        Hồ Chí Minh đã giải quyết xuất sắc và sáng tạo mối quan hệ giữa giai cấp và dân tộc. Trong Nhà nước mới, bản chất giai cấp công nhân không hề đối lập mà thống nhất hữu cơ với tính nhân dân và tính dân tộc — chứng minh cụ thể ở ba điểm:
      </SecDesc>
      <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12, maxWidth: "82ch" }}>
        <BulletItem n={1}>
          <b>Nguồn gốc ra đời của Nhà nước</b> — Nhà nước mới ra đời là thành quả của cuộc đấu tranh lâu dài, gian khổ và hy sinh xương máu của nhiều thế hệ, của toàn thể nhân dân và khối đại đoàn kết dân tộc dưới sự lãnh đạo của Đảng. Nhà nước này không thuộc về riêng một giai cấp hay tầng lớp nào mà thuộc về toàn thể nhân dân Việt Nam.
        </BulletItem>
        <BulletItem n={2}>
          <b>Mục tiêu và lợi ích nhất quán</b> — Ngay từ khi ra đời, Nhà nước luôn kiên trì mục tiêu vì lợi ích tối cao của quốc gia - dân tộc, lấy lợi ích của nhân dân làm nền tảng. Lợi ích cơ bản của giai cấp công nhân thống nhất hoàn toàn với lợi ích của nhân dân lao động và của toàn dân tộc.
        </BulletItem>
        <BulletItem n={3}>
          <b>Sứ mệnh lịch sử được ủy thác</b> — Nhà nước đảm đương trọng trách nặng nề do toàn thể dân tộc giao phó: tổ chức nhân dân tiến hành cuộc kháng chiến cứu nước, xây dựng cuộc sống độc lập, tự do, hòa bình, thống nhất và phát triển tiến bộ xã hội.
        </BulletItem>
      </ul>
    </Body>
  </Slide>,

  // 3 — Q&A 1 (04 / 14)
  <Slide key="3">
    <FrameTop eyebrow="Câu hỏi biện chứng · 01" num="04 / 14" />
    <Body>
      <SecHead roman="?" title="Giai cấp cụ thể vs. đại diện toàn dân" />
      <DialecticBox
        question={`Nếu Nhà nước mang bản chất giai cấp công nhân (một giai cấp cụ thể), làm thế nào nó có thể đồng thời đại diện rộng rãi và thuộc về toàn thể nhân dân ("của nhân dân") mà không rơi vào mâu thuẫn bè phái?`}
        answer={`Trong tư tưởng Hồ Chí Minh, mâu thuẫn này được giải quyết một cách biện chứng. Giai cấp công nhân Việt Nam không có lợi ích riêng biệt nào đối lập với lợi ích của nhân dân lao động và dân tộc Việt Nam. Sứ mệnh lịch sử của giai cấp công nhân là giải phóng dân tộc và giải phóng toàn xã hội.

Do đó, bản chất giai cấp công nhân của Nhà nước chính là nhân tố bảo đảm chắc chắn nhất để Nhà nước đi đúng định hướng xã hội chủ nghĩa, kiên quyết đấu tranh chống lại các đặc quyền đặc lợi bè phái, bảo vệ lợi ích hợp pháp của toàn thể cộng đồng nhân dân.`}
        isRevealed={!!revealedAnswers[3]}
        onReveal={() => revealCurrentAnswer(3)}
      />
    </Body>
  </Slide>,

  // 4 — II: Của dân (05 / 14)
  <Slide key="4">
    <FrameTop eyebrow="II. Nhà nước của dân" num="05 / 14" />
    <Body>
      <SecHead roman="II" title="Quyền lực tối cao thuộc về nhân dân" />
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 28, marginTop: 14, alignItems: "start" }} className="split-resp">
        <div>
          <SecDesc bare>
            Cốt lõi của một nhà nước của nhân dân là "tất cả mọi quyền lực trong nhà nước và trong xã hội đều thuộc về nhân dân". Nhà nước của dân tức là <b style={{ color: COLORS.redDeep }}>"dân là chủ"</b> — khẳng định địa vị chủ thể tối cao của mọi quyền lực chính trị là nhân dân lao động. Nhân dân thực thi quyền lực tối cao qua hai hình thức dân chủ cơ bản:
          </SecDesc>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }} className="duo-resp">
            <DuoCard tag="Dân chủ trực tiếp" variant="a">
              Nhân dân trực tiếp tham gia thảo luận và quyết định các vấn đề hệ trọng liên quan đến vận mệnh quốc gia, dân tộc và quyền lợi trực tiếp của cộng đồng. Hồ Chí Minh coi đây là hình thức dân chủ hoàn bị nhất.
            </DuoCard>
            <DuoCard tag="Dân chủ gián tiếp" variant="b">
              Nhân dân ủy thác quyền lực cho các cơ quan đại diện do mình bầu ra (Quốc hội, Hội đồng nhân dân), gắn với những nguyên tắc pháp lý và đạo đức nghiêm ngặt.
            </DuoCard>
          </div>
        </div>
        <QuoteBlock quote="Trong nước Việt Nam Dân chủ Cộng hòa của chúng ta, tất cả mọi quyền lực đều là của nhân dân." cite="Hồ Chí Minh · Toàn tập, t.8, tr.262" />
      </div>
    </Body>
  </Slide>,

  // 5 — II: nguyên tắc gián tiếp (06 / 14)
  <Slide key="5">
    <FrameTop eyebrow="II. Nhà nước của dân" num="06 / 14" />
    <Body>
      <SecHead roman="II" title="Nguyên tắc của dân chủ gián tiếp (đại diện)" />
      <SecDesc>Trong hình thức dân chủ gián tiếp, Hồ Chí Minh chỉ rõ những nguyên tắc pháp lý và đạo đức nghiêm ngặt ràng buộc cán bộ, cơ quan nhà nước:</SecDesc>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }} className="grid-resp-2">
        <Card k="Tính chất “thừa ủy quyền”" title="">
          Bản thân nhà nước hay bộ máy cán bộ tự thân không có quyền lực. Toàn bộ quyền lực hành chính là do nhân dân ủy thác, thừa ủy quyền. Các cơ quan và cán bộ chỉ là "công bộc của dân", gánh vác việc chung chứ không phải để đè đầu cưỡi cổ nhân dân.
        </Card>
        <Card k="Vị thế cán bộ là “đầy tớ”" title="">
          Chủ tịch nước, bộ trưởng, thứ trưởng hay người quét rác đều là phân công lao động xã hội, đều là làm đầy tớ cho nhân dân. Hồ Chí Minh phê phán gay gắt những cán bộ thoái hóa biến chất tự coi mình là "quan cách mạng", cậy thế, hách dịch, xem thường dân.
        </Card>
        <Card k="Quyền kiểm soát và bãi miễn" title="">
          Để quyền lực không bị tha hóa, nhân dân có toàn quyền kiểm soát, phê bình hoạt động của Nhà nước. Dân có quyền bãi miễn đại biểu Quốc hội, Hội đồng nhân dân nếu họ không còn xứng đáng với sự tín nhiệm, thậm chí "nếu Chính phủ làm hại dân thì dân có quyền đuổi Chính phủ".
        </Card>
        <Card k="Luật pháp dân chủ là công cụ của dân" title="">
          Khác biệt căn bản với luật pháp thực dân, phong kiến hay tư sản vốn là công cụ áp bức, luật pháp trong Nhà nước mới của Việt Nam phản ánh ý nguyện, lợi ích và là công cụ để nhân dân kiểm soát quyền lực nhà nước.
        </Card>
      </div>
    </Body>
  </Slide>,

  // 6 — Q&A 2 (07 / 14)
  <Slide key="6">
    <FrameTop eyebrow="Câu hỏi biện chứng · 02" num="07 / 14" />
    <Body>
      <SecHead roman="?" title="“Đầy tớ” nhưng lại ban hành mệnh lệnh?" />
      <DialecticBox
        question={`Nếu cán bộ là "đầy tớ" và nhân dân là "chủ", tại sao trên thực tế hành chính, cán bộ là người ban hành các mệnh lệnh hành chính, thực thi cưỡng chế, xử phạt và yêu cầu người dân tuân thủ? Liệu đây có phải sự đảo lộn vai trò thực tế so với khẩu hiệu lý thuyết?`}
        answer={`Đây là điểm dễ gây hiểu lầm sâu sắc nhất nếu nhìn nhận quyền lực một cách cơ học. Biện chứng nằm ở chỗ: quyền hành chính của người cán bộ không phải là quyền lực tự thân, cá nhân của họ, mà là quyền lực công cộng được nhân dân "thừa ủy quyền" để duy trì trật tự xã hội vì lợi ích chung.

Khi người dân tuân thủ mệnh lệnh pháp luật do cán bộ thực thi, họ đang tuân thủ chính ý chí tập thể của mình đã được thể chế hóa, chứ không phải phục tùng cá nhân người cán bộ. Khái niệm "đầy tớ" nhấn mạnh đạo đức công vụ, trách nhiệm tận tụy và sự chịu trách nhiệm giải trình tối cao trước nhân dân — chứ không có nghĩa là cán bộ phải tuân theo ý chí tùy tiện của từng cá nhân đơn lẻ bất chấp pháp luật.`}
        isRevealed={!!revealedAnswers[6]}
        onReveal={() => revealCurrentAnswer(6)}
      />
    </Body>
  </Slide>,

  // 7 — III: Do dân (08 / 14)
  <Slide key="7">
    <FrameTop eyebrow="III. Nhà nước do dân" num="08 / 14" />
    <Body>
      <SecHead roman="III" title="Sự chủ động làm chủ và bổn phận công dân" />
      <SecDesc>
        Nhà nước do nhân dân trước hết là nhà nước do chính nhân dân tự tay xây dựng, lựa chọn và bầu ra thông qua các tiến trình dân chủ hợp hiến, hợp pháp (bầu cử, ứng cử, phúc quyết). Hồ Chí Minh đặt ra yêu cầu song hành biện chứng giữa hai khái niệm:
      </SecDesc>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 12 }} className="duo-resp">
        <DuoCard tag="“Dân là chủ”" variant="a">
          Xác định vị thế khách quan và quyền lợi tối cao của nhân dân đối với quyền lực nhà nước.
        </DuoCard>
        <DuoCard tag="“Dân làm chủ”" variant="b">
          Nhấn mạnh khía cạnh hành động, nghĩa vụ và năng lực chủ động của nhân dân với tư cách là người chủ nước nhà: tuân thủ hiến pháp và pháp luật, giữ gìn kỷ luật lao động, bảo vệ trật tự an ninh xã hội, đóng góp thuế đầy đủ đúng hạn, hăng hái tham gia công việc chung và bảo vệ tài sản công cộng.
        </DuoCard>
      </div>
      <div style={{ marginTop: 14 }}>
        <QuoteBlock quote="Nhân dân có quyền lợi làm chủ, thì phải có nghĩa vụ làm tròn bổn phận công dân, giữ đúng đạo đức công dân. Muốn làm chủ được tốt, phải có năng lực làm chủ." cite="Hồ Chí Minh · Toàn tập, t.9, tr.258 & t.12, tr.527" />
      </div>
    </Body>
  </Slide>,

  // 8 — Q&A 3 (09 / 14)
  <Slide key="8">
    <FrameTop eyebrow="Câu hỏi biện chứng · 03" num="09 / 14" />
    <Body>
      <SecHead roman="?" title="Chính sách chuyên môn hóa có tước quyền dân?" />
      <DialecticBox
        question={`Nếu Nhà nước "do nhân dân" xây dựng và vận hành, tại sao thực tiễn quản trị hiện nay đòi hỏi các quy trình hoạch định chính sách vĩ mô vô cùng phức tạp, thường chỉ do các chuyên gia, học giả và công chức chuyên sâu thực hiện? Điều này có tước đi vai trò thực tế của người dân bình thường và biến dân chủ thành hình thức?`}
        answer={`Đây là sự hiểu nhầm giữa "phân công lao động chuyên môn" và "quyền quyết định bản chất". Thiết kế chính sách tinh vi là nhiệm vụ kỹ thuật của các nhà chuyên môn, nhưng mục tiêu của chính sách phải xuất phát từ nguyện vọng của dân và hiệu quả phải được đo lường bằng sự thụ hưởng của dân.

Hồ Chí Minh đòi hỏi Nhà nước phải bồi dưỡng "năng lực làm chủ" cho người dân để họ không bị đứng ngoài lề. Đồng thời, cơ chế dân chủ đại diện và việc lấy ý kiến nhân dân rộng rãi chính là cách thức để kết hợp trí tuệ chuyên sâu của chuyên gia với ý nguyện thực tế của quần chúng, ngăn chặn nguy cơ chính sách bị thao túng bởi các nhóm lợi ích tinh hoa.`}
        isRevealed={!!revealedAnswers[8]}
        onReveal={() => revealCurrentAnswer(8)}
      />
    </Body>
  </Slide>,

  // 9 — IV: Vì dân, phụng sự (10 / 14)
  <Slide key="9">
    <FrameTop eyebrow="IV. Nhà nước vì dân" num="10 / 14" />
    <Body>
      <SecHead roman="IV" title="Phụng sự vô điều kiện lợi ích của dân" />
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 28, marginTop: 14, alignItems: "start" }} className="split-resp">
        <div>
          <SecDesc bare>
            Nhà nước vì nhân dân là nhà nước lấy lợi ích hợp pháp và mưu cầu hạnh phúc, tự do của nhân dân làm thước đo cao nhất và duy nhất cho mọi hoạt động hành chính. Nhà nước tuyệt đối không có đặc quyền đặc lợi tự thân, mà phải luôn giữ vững sự trong sạch, liêm khiết. Thước đo chất lượng hoạt động của một Nhà nước vì dân chính là sự đồng thuận, tin yêu và lòng tin của người dân. Muốn được dân tin, dân phục, dân yêu thì cán bộ nhà nước trước hết phải yêu dân, tôn trọng dân và thực sự chí công vô tư.
          </SecDesc>
        </div>
        <QuoteBlock quote="Các công việc của Chính phủ làm phải nhằm vào một mục đích duy nhất là mưu tự do hạnh phúc cho mọi người. Việc gì có lợi cho dân thì phải hết sức làm. Việc gì có hại cho dân thì phải hết sức tránh." cite="Hồ Chí Minh · Toàn tập, t.4, tr.21, 52" />
      </div>
    </Body>
  </Slide>,

  // 10 — IV: mâu thuẫn biện chứng đầy tớ - lãnh đạo (11 / 14)
  <Slide key="10">
    <FrameTop eyebrow="IV. Nhà nước vì dân" num="11 / 14" />
    <Body>
      <SecHead roman="IV" title="Mâu thuẫn biện chứng: vừa đầy tớ, vừa lãnh đạo" />
      <p style={{ fontSize: 12.6, color: COLORS.inkSoft, margin: "6px 0 0", maxWidth: "82ch", lineHeight: 1.5 }}>
        Có một đòi hỏi kép rất đặc biệt đối với đội ngũ cán bộ nhà nước — hai vai trò tưởng chừng mâu thuẫn gay gắt nhưng thực chất thống nhất trong một nhân cách người cán bộ cách mạng:
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "stretch", marginTop: 14 }} className="dialectic-resp">
        {/* Card Vai trò Đầy tớ */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 2, padding: "18px 20px", boxShadow: shadow, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.red, flexShrink: 0 }} />
            <h4 className="font-serif" style={{ fontSize: 16, margin: 0, color: COLORS.redDeep, fontWeight: 700 }}>Vai trò Đầy tớ</h4>
          </div>
          <p style={{ fontSize: 12.6, color: COLORS.inkSoft, lineHeight: 1.55, margin: 0 }}>
            Đòi hỏi phẩm chất trung thành tuyệt đối, tận tụy, cần, kiệm, liêm, chính, chí công vô tư, biết "lo trước thiên hạ, vui sau thiên hạ", sẵn sàng gánh vác mọi khó khăn nhọc nhằn thay cho dân.
          </p>
        </div>

        {/* Nút nối Thống nhất */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 6px" }}>
          <div style={{ width: 1, height: 24, background: `linear-gradient(to bottom, transparent, ${COLORS.red})` }} />
          <div
            className="font-serif"
            style={{
              background: COLORS.goldCard,
              border: `1px solid ${COLORS.gold}`,
              color: COLORS.redDeep,
              padding: "6px 12px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              boxShadow: shadow,
            }}
          >
            ✦ THỐNG NHẤT ✦
          </div>
          <div style={{ width: 1, height: 24, background: `linear-gradient(to top, transparent, ${COLORS.red})` }} />
        </div>

        {/* Card Vai trò Lãnh đạo */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 2, padding: "18px 20px", boxShadow: shadow, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.gold, flexShrink: 0 }} />
            <h4 className="font-serif" style={{ fontSize: 16, margin: 0, color: COLORS.redDeep, fontWeight: 700 }}>Vai trò Lãnh đạo</h4>
          </div>
          <p style={{ fontSize: 12.6, color: COLORS.inkSoft, lineHeight: 1.55, margin: 0 }}>
            Đòi hỏi tầm vóc trí tuệ hơn người, tư duy minh mẫn, sáng suốt, nhìn xa trông rộng để định hướng cho quần chúng, biết gần gũi thấu hiểu tâm tư quần chúng và biết cách phát hiện, trọng dụng hiền tài cho đất nước.
          </p>
        </div>
      </div>
      <p style={{ marginTop: 14, fontSize: 12.6, color: COLORS.inkSoft, maxWidth: "82ch", lineHeight: 1.5 }}>
        Để gánh vác trách nhiệm đại diện cho nhân dân, cán bộ phải hội tụ đầy đủ cả đức và tài, "vừa hiền lại vừa minh" — chỉ khi có đủ đức độ và trí tuệ, cán bộ mới có đủ dũng khí và tầm nhìn để thực hiện cả những việc "mới xem qua như là hại đến dân, nhưng thực chất là vì lợi ích toàn cục, vì lợi ích lâu dài của nhân dân".
      </p>
    </Body>
  </Slide>,

  // 11 — Q&A 4 (12 / 14)
  <Slide key="11">
    <FrameTop eyebrow="Câu hỏi biện chứng · 04" num="12 / 14" />
    <Body>
      <SecHead roman="?" title="Dung hòa “đầy tớ” và “lãnh đạo”" />
      <DialecticBox
        question={`Làm thế nào để một người có thể dung hòa đồng thời tư thế của một "đầy tớ" (vốn mang tính phục tùng, lắng nghe) với tư thế của một "người lãnh đạo" (vốn mang tính dẫn đường, quyết đoán)? Hơn nữa, việc cho phép cán bộ thực hiện các quyết định "mới xem qua như là hại đến dân nhưng vì lợi ích lâu dài" liệu có tạo ra kẽ hở lớn cho các chính sách chủ quan duy ý chí, gây tổn hại thực tế cho người dân dưới chiêu bài "tầm nhìn lâu dài"?`}
        answer={`Đây chính là nút thắt biện chứng then chốt. Hai vai trò này không triệt tiêu nhau mà bổ sung cho nhau: nếu chỉ làm "đầy tớ" mà thiếu năng lực "lãnh đạo", cán bộ sẽ rơi vào chủ nghĩa đuôi bám quần chúng, mị dân. Ngược lại, nếu chỉ làm "lãnh đạo" mà quên bổn phận "đầy tớ", cán bộ sẽ nhanh chóng trở thành kẻ độc đoán, quan liêu, xa rời thực tế.

Để ngăn chặn kẽ hở lạm dụng, tư tưởng Hồ Chí Minh đặt ra hai cơ chế kiểm soát bắt buộc:
1. Phẩm chất "chí công vô tư" của cán bộ — mọi hành động ảnh hưởng đến quyền lợi ngắn hạn của dân đều phải minh bạch, hoàn toàn không vụ lợi cá nhân.
2. Quyền giám sát, kiểm soát và phê bình tối cao của nhân dân — dân phải được tham gia thảo luận, hiểu rõ lý do và có quyền bãi miễn cán bộ nếu phát hiện biểu hiện tư lợi, độc đoán dưới danh nghĩa "lợi ích toàn cục".`}
        isRevealed={!!revealedAnswers[11]}
        onReveal={() => revealCurrentAnswer(11)}
      />
    </Body>
  </Slide>,

  // 12 — V: bảng tổng hợp (13 / 14)
  <Slide key="12">
    <FrameTop eyebrow="V. Tổng hợp hệ thống lý luận" num="13 / 14" />
    <Body>
      <SecHead roman="V" title="Ba trụ cột: Của dân · Do dân · Vì dân" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 12 }} className="grid-resp-3">
        {[
          {
            pillar: "Của dân",
            core: "Mọi quyền lực tối cao trong xã hội đều thuộc về nhân dân. Nhà nước chỉ là bên \"thừa ủy quyền\" quản lý xã hội.",
            duty: "Là \"công bộc\", \"đầy tớ\" trung thành để gánh vác việc chung. Chịu sự giám sát, kiểm soát và sẵn sàng bị bãi miễn bởi dân.",
            quote: "\"Trong nước Việt Nam Dân chủ Cộng hòa của chúng ta, tất cả mọi quyền lực đều là của nhân dân.\"",
          },
          {
            pillar: "Do dân",
            core: "Nhà nước do nhân dân lập nên thông qua tuyển cử dân chủ. Người dân làm chủ thông qua quyền lợi và nghĩa vụ.",
            duty: "Tạo mọi điều kiện pháp lý để dân thực thi quyền làm chủ. Chủ động giáo dục, nâng cao \"năng lực làm chủ\" cho nhân dân.",
            quote: "\"Nước ta là nước dân chủ, nghĩa là nước nhà do nhân dân làm chủ... Muốn làm chủ được tốt, phải có năng lực làm chủ.\"",
          },
          {
            pillar: "Vì dân",
            core: "Mục tiêu duy nhất của Nhà nước là mưu cầu hạnh phúc, tự do cho dân. Không có đặc quyền đặc lợi bè phái.",
            duty: "\"Việc gì có lợi cho dân thì hết sức làm, việc gì có hại cho dân thì hết sức tránh\". Cán bộ phải \"vừa là đầy tớ, vừa là lãnh đạo\".",
            quote: "\"Các công việc của Chính phủ làm phải nhằm vào một mục đích duy nhất là mưu tự do hạnh phúc cho mọi người...\"",
          },
        ].map((p) => (
          <div key={p.pillar} style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 2, padding: "16px 16px", boxShadow: shadow, display: "flex", flexDirection: "column", gap: 9 }}>
            <div className="font-serif" style={{ fontWeight: 700, fontStyle: "italic", fontSize: 17, color: COLORS.redDeep, paddingBottom: 8, borderBottom: `2px solid ${COLORS.red}` }}>
              {p.pillar}
            </div>
            <div>
              <div style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.gold, fontWeight: 700, marginBottom: 3 }}>Cốt lõi</div>
              <p style={{ fontSize: 11.6, lineHeight: 1.45, color: COLORS.inkSoft, margin: 0 }}>{p.core}</p>
            </div>
            <div>
              <div style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.gold, fontWeight: 700, marginBottom: 3 }}>Trách nhiệm</div>
              <p style={{ fontSize: 11.6, lineHeight: 1.45, color: COLORS.inkSoft, margin: 0 }}>{p.duty}</p>
            </div>
            <div style={{ marginTop: 2, paddingTop: 8, borderTop: `1px dashed ${COLORS.line}` }}>
              <p className="font-serif" style={{ fontSize: 11, lineHeight: 1.4, color: COLORS.ink, fontStyle: "italic", margin: 0 }}>{p.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </Body>
  </Slide>,

  // 13 — Tài liệu tham khảo + Kết luận (14 / 14)
  <Slide key="13">
    <FrameTop eyebrow="Kết luận & Tài liệu tham khảo" num="14 / 14" />
    <Body>
      <h2 className="font-serif" style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 600, maxWidth: "20ch", lineHeight: 1.2, margin: 0 }}>
        Một nhà nước lấy dân làm gốc, lấy phụng sự làm lẽ sống
      </h2>
      <p style={{ marginTop: 12, fontSize: 13.5, color: COLORS.inkSoft, maxWidth: "76ch", lineHeight: 1.55 }}>
        Tư tưởng Hồ Chí Minh về nhà nước thống nhất bản chất giai cấp công nhân với tính nhân dân, tính dân tộc — dựng nên một mô hình quyền lực mà mọi cán bộ đều là đầy tớ trung thành, đồng thời là người dẫn đường có đức, có tài.
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 16, marginBottom: 16 }}>
        {["Của dân", "Do dân", "Vì dân"].map((t) => (
          <span key={t} className="font-serif" style={{ padding: "9px 16px", border: `1px solid ${COLORS.red}`, borderRadius: 999, fontStyle: "italic", fontWeight: 600, color: COLORS.redDeep, fontSize: 13 }}>
            {t}
          </span>
        ))}
      </div>
      <div style={{ overflowY: "auto", paddingTop: 10, borderTop: `1px solid ${COLORS.line}` }}>
        <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>
          Tài liệu tham khảo chính gốc (Hồ Chí Minh: Toàn tập)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", fontSize: 11.4, color: COLORS.inkSoft, lineHeight: 1.55 }} className="grid-resp-2">
          <span>t.8, tr.262 — Quyền lực thuộc về nhân dân</span>
          <span>t.4, tr.64-65 — Thừa ủy quyền và công bộc</span>
          <span>t.10, tr.572 — Đầy tớ cho nhân dân</span>
          <span>t.7, tr.434 — Sự phân công làm đầy tớ</span>
          <span>t.9, tr.81 — Kiểm soát và phê bình nhà nước</span>
          <span>t.12, tr.375 — Bãi miễn đại biểu</span>
          <span>t.5, tr.75 — Quyền đuổi Chính phủ</span>
          <span>t.9, tr.258 — Nghĩa vụ và đạo đức công dân</span>
          <span>t.12, tr.527 — Năng lực làm chủ nước nhà</span>
          <span>t.4, tr.21, 52 — Phục vụ tự do hạnh phúc của dân</span>
          <span>t.5, tr.285 — Việc hại đến dân nhưng vì lợi ích lâu dài</span>
        </div>
      </div>
    </Body>
  </Slide>,
];
