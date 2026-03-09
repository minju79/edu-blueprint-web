import { useClientBrief } from "@/hooks/use-client-brief";
import { inferSiteType, getPageSet, buildBlueprintBlocks } from "@/lib/brief-engine";
import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteBlueprint = () => {
  const { brief, score } = useClientBrief();
  const siteType = inferSiteType(brief);
  const pageSet = getPageSet(siteType);
  const blocks = buildBlueprintBlocks(brief);

  if (score.percent < 50) {
    return (
      <div className="space-y-6">
        <PageHeader title="사이트 청사진" description="Client Brief 기반으로 공개용 사이트 구조를 자동 생성합니다." summaryCards={[]} quickApply={[]} />
        <Card><CardContent className="p-6 text-center"><p className="text-muted-foreground">브리프 완성도가 50% 미만입니다. 먼저 브리프를 작성해 주세요.</p><Button asChild className="mt-4"><Link to="/client-brief">브리프 작성하기</Link></Button></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="사이트 청사진"
        description={`${brief.academyName || "고객사"} 브리프 기반으로 생성된 공개용 교육 사이트 구조입니다.`}
        summaryCards={[
          { title: "추천 사이트 유형", body: siteType },
          { title: "브리프 완성도", body: `${score.percent}%` },
          { title: "필수 페이지", body: `${pageSet.required.length}개` },
        ]}
        quickApply={["각 블록 복사 후 Lovable 프롬프트에 활용", "SEO 포인트 및 CTA 확인", "자산 부족 시 대체안 참고"]}
      />

      <section>
        <h2 className="text-2xl font-bold">페이지 구성</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card><CardHeader><CardTitle className="text-base text-success">필수 페이지</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.required.map(p => <span key={p} className="rounded-md bg-success/10 px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base text-info">선택 페이지</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.optional.map(p => <span key={p} className="rounded-md bg-info/10 px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base text-muted-foreground">제거 가능</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.removable.map(p => <span key={p} className="rounded-md bg-muted px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base text-destructive">금지</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.forbidden.map(p => <span key={p} className="rounded-md bg-destructive/10 px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
        </div>
      </section>

      {blocks.map((block) => (
        <section key={block.section}>
          <h2 className="text-xl font-bold">{block.section}</h2>
          <Card className="mt-4">
            <CardContent className="p-4 space-y-4 text-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <div><h3 className="font-semibold mb-1">필수 블록</h3><div className="flex flex-wrap gap-1">{block.required.map(b => <span key={b} className="rounded bg-primary/10 px-2 py-0.5 text-xs">{b}</span>)}</div></div>
                <div><h3 className="font-semibold mb-1">선택 블록</h3><div className="flex flex-wrap gap-1">{block.optional.map(b => <span key={b} className="rounded bg-muted px-2 py-0.5 text-xs">{b}</span>)}</div></div>
                <div><h3 className="font-semibold mb-1">조건부 블록</h3><div className="flex flex-wrap gap-1">{block.conditional.map(b => <span key={b} className="rounded bg-warning/10 px-2 py-0.5 text-xs">{b}</span>)}</div></div>
                <div><h3 className="font-semibold mb-1">금지 블록</h3><div className="flex flex-wrap gap-1">{block.forbidden.map(b => <span key={b} className="rounded bg-destructive/10 px-2 py-0.5 text-xs">{b}</span>)}</div></div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div><h3 className="font-semibold mb-1">핵심 CTA</h3><p className="text-muted-foreground">{block.coreCta}</p></div>
                <div><h3 className="font-semibold mb-1">보조 CTA</h3><p className="text-muted-foreground">{block.subCta}</p></div>
                <div><h3 className="font-semibold mb-1">Proof 요소</h3><p className="text-muted-foreground">{block.proof.join(", ")}</p></div>
              </div>
              <div><h3 className="font-semibold mb-1">모바일 축약</h3><p className="text-muted-foreground">{block.mobileRule}</p></div>
              <div><h3 className="font-semibold mb-1">SEO 포인트</h3><p className="text-muted-foreground">{block.seoPoint}</p></div>
              <div><h3 className="font-semibold mb-1">자산 부족 시</h3><p className="text-muted-foreground">{block.fallback}</p></div>
            </CardContent>
          </Card>
        </section>
      ))}
    </div>
  );
};

export default SiteBlueprint;
