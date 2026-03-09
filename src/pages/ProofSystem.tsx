import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { CopyBlock } from "@/components/docs/CopyBlock";

type ProofElement = {
  name: string;
  strength: "강함" | "보조";
  pages: string;
  cta: string;
  fallback: string;
  forbidden: string;
  reviewExpressions: string[];
  description: string;
};

const proofElements: ProofElement[] = [
  {
    name: "강사진 경력",
    strength: "강함",
    pages: "강사진 페이지, 홈 요약, 과정 상세",
    cta: "상담 CTA · 체험수업 CTA",
    fallback: "교육 철학/수업 방식/학습 관리 프로세스로 대체",
    forbidden: "허위 경력(학위, 근무처, 수상 등)",
    reviewExpressions: ["○○대 출신", "○○년 경력", "○○ 수상"],
    description: "강사의 전문성을 보여주는 핵심 증빙. 경력이 부족하면 교육 철학 중심으로 서술.",
  },
  {
    name: "커리큘럼 구조",
    strength: "강함",
    pages: "과정 상세, 홈 요약",
    cta: "체험수업 CTA",
    fallback: "주차별 학습 목표 텍스트 제공",
    forbidden: "없음 (자유 서술)",
    reviewExpressions: [],
    description: "학습 과정의 체계성을 보여주는 핵심 증빙. 시각적 타임라인/아코디언 형태 권장.",
  },
  {
    name: "수강 대상 적합성",
    strength: "강함",
    pages: "홈 히어로, 과정 목록, 과정 상세",
    cta: "전체 CTA (모든 전환 경로)",
    fallback: "대체 불가 — 반드시 명시",
    forbidden: "모호한 대상 표현 ('모두 환영')",
    reviewExpressions: [],
    description: "방문자가 '나에게 맞는 곳인가'를 판단하는 가장 기본적인 증빙. 필수 요소.",
  },
  {
    name: "운영 방식/학습 프로세스",
    strength: "보조",
    pages: "과정 상세, 홈",
    cta: "상담 CTA",
    fallback: "강사진 철학으로 부분 대체",
    forbidden: "없음",
    reviewExpressions: [],
    description: "체계적 학습 관리가 이루어진다는 간접 증빙. 학습 사이클 도식화 권장.",
  },
  {
    name: "성과/합격 사례",
    strength: "강함",
    pages: "성과 페이지, 홈 요약",
    cta: "상담 CTA",
    fallback: "운영 프로세스 강조, 커리큘럼 구조 부각",
    forbidden: "허위 수치, 과장, 출처 없는 주장",
    reviewExpressions: ["합격률 ○○%", "○○명 합격", "평균 ○점 향상"],
    description: "가장 강력하지만 가장 주의가 필요한 증빙. 모든 수치에 출처/기간/예시 데이터 표기 필수.",
  },
  {
    name: "수강 후기",
    strength: "보조",
    pages: "후기 페이지, 홈 요약, 과정 상세",
    cta: "상담 CTA",
    fallback: "FAQ + 상담 프로세스 상세 안내",
    forbidden: "허위 후기, 대가성 후기 미표기",
    reviewExpressions: ["성적이 올랐어요", "합격했어요"],
    description: "사회적 증빙으로 전환을 보조. 실제 수강생 동의 필수, 수강 과정/기간 표기.",
  },
  {
    name: "지점/시설/학습환경",
    strength: "보조",
    pages: "지점 페이지, 홈",
    cta: "위치/길찾기 CTA",
    fallback: "운영 시간/접근성/교통편 안내로 대체",
    forbidden: "허위 시설 사진, 과도한 보정",
    reviewExpressions: [],
    description: "학습 환경 신뢰 형성. 실제 사진 사용 권장, 미보유 시 지도+교통편으로 대체.",
  },
  {
    name: "설명회/상담 프로세스",
    strength: "보조",
    pages: "상담 페이지, 설명회 페이지",
    cta: "상담 CTA · 설명회 CTA",
    fallback: "응답 시간 안내 + 문의 채널 제공",
    forbidden: "응답 시간 과장",
    reviewExpressions: [],
    description: "상담 과정의 투명성으로 전환 장벽 낮춤. 3단계 프로세스 도식 권장.",
  },
  {
    name: "교재/자료/학습 시스템",
    strength: "보조",
    pages: "과정 상세",
    cta: "체험수업 CTA",
    fallback: "커리큘럼 요약으로 대체",
    forbidden: "저작권 침해 자료, 타사 교재 무단 게시",
    reviewExpressions: [],
    description: "학습 자료의 체계성을 보여주는 보조 증빙. 교재 표지/목차 미리보기 권장.",
  },
  {
    name: "FAQ/정책 안내",
    strength: "보조",
    pages: "홈, 상담 페이지",
    cta: "상담 CTA",
    fallback: "상담 프로세스로 대체",
    forbidden: "광고성 FAQ 금지",
    reviewExpressions: [],
    description: "방문자 불안 해소 및 SEO FAQPage 스키마 활용. 실제 자주 묻는 질문 기반 작성.",
  },
];

const placementMatrix = `[CTA 근처 배치 규칙]
상담 CTA 직전 → 강사진 요약 또는 후기 요약
체험수업 CTA 직전 → 커리큘럼 구조 또는 수업 방식
설명회 CTA 직전 → 설명회 프로그램 요약
과정 상세 CTA 직전 → 수강 후기 또는 성과 요약

[페이지별 필수 증빙]
홈 히어로 직후 → 대상 적합성 + 과정 요약
과정 상세 → 커리큘럼 + 강사진 + (후기)
강사진 → 경력/철학 + (수업 방식)
성과 → 수치(예시 데이터) + 기간 + 주의 문구
상담 → 응답 시간 + 프로세스 + 채널`;

const ProofSystem = () => (
  <div className="space-y-10">
    <PageHeader
      title="신뢰/성과 증빙 시스템"
      description="학원/교육 사이트에서 신뢰를 형성하는 10가지 증빙 요소의 강도, 배치 페이지, CTA 연결, 대체 방안, 금지 사항, 검토 필요 표현을 체계화합니다."
      summaryCards={[
        { title: "강한 증빙 4가지", body: "강사진 경력, 커리큘럼 구조, 대상 적합성, 성과/합격 사례" },
        { title: "보조 증빙 6가지", body: "후기, 운영 방식, 시설, 상담 프로세스, 교재, FAQ" },
        { title: "상태 체계", body: "보유 / 부족 / 비공개 / 검토 필요" },
      ]}
      quickApply={[
        "강한 증빙 중 최소 2개 이상 CTA 근처에 배치",
        "허위 증빙 절대 금지: 경력, 성과, 후기, 시설 사진",
        "부족 시 반드시 대체 증빙 요소로 보완",
        "검토 필요 표현은 내부 검증 후 게시",
        "성과 수치는 항상 '예시 데이터' 또는 출처 표기",
      ]}
    />

    {/* 증빙 요소 상세 */}
    <section>
      <h2 className="text-2xl font-bold">증빙 요소 상세 체계</h2>
      <div className="mt-4 space-y-4">
        {proofElements.map((p) => (
          <Card key={p.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{p.name}</CardTitle>
                {p.strength === "강함" ? <BadgeTag type="proof 필요" /> : <BadgeTag type="권장" />}
              </div>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid gap-3 md:grid-cols-2">
                <div><span className="font-medium">배치 페이지:</span> <span className="text-muted-foreground">{p.pages}</span></div>
                <div><span className="font-medium">CTA 연결:</span> <span className="text-muted-foreground">{p.cta}</span></div>
                <div><span className="font-medium">대체 방안:</span> <span className="text-muted-foreground">{p.fallback}</span></div>
                <div><span className="font-medium text-destructive">금지:</span> <span className="text-destructive">{p.forbidden}</span></div>
              </div>
              {p.reviewExpressions.length > 0 && (
                <div className="rounded-md border border-warning bg-warning/5 p-2">
                  <span className="font-medium text-warning">검토 필요 표현:</span>
                  <span className="ml-2 text-muted-foreground">{p.reviewExpressions.join(" / ")}</span>
                  <span className="ml-1 text-xs text-muted-foreground">— 사용 시 출처/기간 반드시 동반</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* 증빙 강도 비교 */}
    <section>
      <h2 className="text-2xl font-bold">증빙 강도 비교표</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted">
            <tr>
              <th className="px-3 py-2 text-left font-medium">증빙 요소</th>
              <th className="px-3 py-2 text-left font-medium">강도</th>
              <th className="px-3 py-2 text-left font-medium">배치 페이지</th>
              <th className="px-3 py-2 text-left font-medium">CTA 연결</th>
              <th className="px-3 py-2 text-left font-medium">대체 방안</th>
              <th className="px-3 py-2 text-left font-medium">금지</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {proofElements.map((p) => (
              <tr key={p.name}>
                <td className="px-3 py-2 font-medium">{p.name}</td>
                <td className="px-3 py-2">{p.strength === "강함" ? <BadgeTag type="proof 필요" /> : <BadgeTag type="권장" />}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.pages}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.cta}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.fallback}</td>
                <td className="px-3 py-2 text-destructive">{p.forbidden}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* 증빙 상태 체계 */}
    <section>
      <h2 className="text-2xl font-bold">증빙 상태 체계</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        {[
          { status: "보유", desc: "자산 확보됨. 바로 적용 가능. 검증 완료 후 게시.", color: "bg-success text-success-foreground" },
          { status: "부족", desc: "자산 미확보. 대체 증빙 요소 적용 필요. 무리하게 생성 금지.", color: "bg-muted text-muted-foreground" },
          { status: "비공개", desc: "자산은 있으나 공개 불가(수강료 등). 대체 UX 제공.", color: "bg-secondary text-secondary-foreground" },
          { status: "검토 필요", desc: "내용 검증 필요. 수치/경력/성과 등 사실 확인 전 게시 금지.", color: "bg-review-required text-review-required-foreground" },
        ].map((s) => (
          <Card key={s.status}>
            <CardHeader><div className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${s.color}`}>{s.status}</div></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* 배치 원칙 */}
    <section>
      <h2 className="text-2xl font-bold">증빙 배치 원칙</h2>
      <CopyBlock title="CTA 근처 배치 규칙 + 페이지별 필수 증빙" content={placementMatrix} />
    </section>

    {/* 핵심 규칙 */}
    <section>
      <h2 className="text-2xl font-bold">핵심 규칙 요약</h2>
      <div className="mt-4 space-y-3">
        {[
          { rule: "CTA 바로 위 또는 직전 섹션에 강한 증빙 배치", type: "필수" as const },
          { rule: "홈페이지 히어로 직후에 대상 적합성 + 과정 요약", type: "필수" as const },
          { rule: "상담 CTA 근처에 강사진 요약 또는 후기 요약", type: "권장" as const },
          { rule: "성과 표현은 근거/기간/예시 데이터 동반 필수", type: "필수" as const },
          { rule: "증빙 부족 시 무리하게 생성하지 말고 대체 요소 사용", type: "필수" as const },
          { rule: "검토 필요 표현은 사실 확인 전 게시 금지", type: "필수" as const },
        ].map((r) => (
          <div key={r.rule} className="flex items-start gap-2 rounded-md border bg-card p-3 text-sm">
            <BadgeTag type={r.type} />
            <span>{r.rule}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ProofSystem;
