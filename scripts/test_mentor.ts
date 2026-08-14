import { callGeminiMentor } from '../src/utils/geminiMentorService';

async function run() {
  console.log("=== TEST GEMINI MENTOR AI HCM202 ===\n");

  console.log("--- 1. TEST TỰ ĐỘNG THÍCH ỨNG: HỎI BÀI / GIẢNG GIẢI ---");
  const res1 = await callGeminiMentor("Thầy giải thích giúp em vì sao cán bộ vừa là người lãnh đạo vừa là đầy tớ?", []);
  console.log("Response text:\n", res1.text.substring(0, 300), "...\n");
  console.log("Citations:", res1.citations.map(c => `Trang ${c.page} (${c.title})`));

  console.log("\n--- 2. TEST TỰ ĐỘNG THÍCH ỨNG: NÊU QUAN ĐIỂM / PHẢN BIỆN ---");
  const res2 = await callGeminiMentor("Theo em trong xây dựng nhà nước pháp quyền chỉ cần xử phạt thật nặng là sẽ hết tham ô lãng phí", []);
  console.log("Response text:\n", res2.text.substring(0, 300), "...\n");
  console.log("Citations:", res2.citations.map(c => `Trang ${c.page} (${c.title})`));
}

run();
