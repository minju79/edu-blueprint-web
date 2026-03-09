

# 학원/교육 웹 제작 시스템 — 최종 마감 계획

## 현재 상태 요약

시스템은 이미 높은 완성도를 갖추고 있습니다. 핵심 기능(Brief/Blueprint/Rules/Proof), SEO 엔진(JSON-LD 동적 주입, FAQPage, BreadcrumbList), autosave+retry, 38개 테스트가 모두 동작합니다.

**남은 실제 문제 3가지:**

1. **`core.test.ts` 구문 오류**: line 240에서 `describe("navigation & seo")` 블록의 닫는 `});`가 line 240에 있고, 이후 line 242-255의 `it()` 블록 2개가 `describe` 바깥에 놓여 있어 테스트가 실패합니다.

2. **noindex canonical 정책 문제**: `use-seo.ts` line 85에서 `noindex`인 모든 페이지의 canonical을 홈(`/`)으로 보냅니다. 이는 내부 도구 페이지(/client-brief 등)에 부자연스러운 정책입니다. noindex 페이지는 self-referencing canonical 또는 canonical 생략이 표준입니다.

3. **Index.tsx Badge ref 경고**: console에 "Function components cannot be given refs" 경고가 발생합니다. `Badge`가 `Link > Card > Badge` 구조에서 ref를 받으려 하는 문제입니다.

그 외 요청 사항(문서 포맷 통일, in-page TOC, Command Search 개선 등)은 이미 구현된 기능의 미세 조정이며, 현재 시스템의 핵심 가치를 크게 변경하지 않습니다.

---

## 작업 계획 (3개 배치)

### Batch 1: 테스트 구문 오류 수정

**파일**: `src/test/core.test.ts`

- line 240의 `});`가 `describe("navigation & seo")` 블록을 닫고 있어, line 242-255의 2개 테스트(`"all seoConfig entries have jsonLdType array"`, `"noindex routes have follow policy"`)가 `describe` 바깥에 위치
- 이 2개 테스트를 `describe` 블록 안으로 이동 (line 239 `});` 뒤, line 240 `});` 앞)

### Batch 2: canonical 정책 수정

**파일**: `src/hooks/use-seo.ts`

- line 85: `noindex ? SITE_URL + "/" : ogUrl` → 404 경로만 홈으로 보내고, noindex 내부 도구 페이지는 self-referencing canonical 유지
- 변경: `const isNotFound = !seoConfig[path]; canonical.href = isNotFound ? SITE_URL + "/" : ogUrl;`

### Batch 3: Index.tsx Badge ref 경고 수정

**파일**: `src/pages/Index.tsx`

- line 92: `<Badge>` 컴포넌트가 `<Link>` 안에서 사용될 때 ref 전달 문제 발생
- `Badge`를 `<span>` + className으로 교체하거나, Badge를 Link의 직접 자식이 아닌 CardHeader 내부로 이동

---

## 작업 순서

Batch 1 (테스트 수정) → Batch 2 (canonical) → Batch 3 (Badge 경고)

총 수정: 3개 파일

