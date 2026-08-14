import { generateRAGAnswer } from '../src/utils/ragEngine';

const testQueries = [
  "Bản chất giai cấp công nhân của Nhà nước",
  "Dân là chủ và dân làm chủ khác nhau thế nào?",
  "Bệnh quan liêu và tham ô lãng phí",
  "Pháp quyền nhân nghĩa theo tư tưởng Hồ Chí Minh",
  "Nghị viện nhân dân có quyền gì theo Hiến pháp 1946?",
  "Thời tiết Hà Nội hôm nay thế nào?" // Out of scope test
];

console.log("=== BẮT ĐẦU TEST RAG ENGINE HCM202 ===\n");

testQueries.forEach((q, idx) => {
  console.log(`--- Test ${idx + 1}: "${q}" ---`);
  const ans = generateRAGAnswer(q);
  console.log(`Is Grounded: ${ans.isGrounded}`);
  console.log(`Citations: ${ans.citations.map(c => `Trang ${c.page} (${c.title})`).join(', ')}`);
  console.log(`Answer excerpt:\n${ans.answerMarkdown.substring(0, 200)}...\n`);
});
