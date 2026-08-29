# JsonXcel

**셀프호스팅 Excel 템플릿 엔진. JSON in, Excel/PDF out.**

JsonXcel은 다국어 Excel 템플릿과 JSON을 `POST /api/convert` 한 번으로 결합합니다. 레이아웃은 Excel에, 데이터는 당신 네트워크에 남습니다.

**언어:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

![30초 데모: 판매 주문 Excel 템플릿 + JSON → 완성 통합 문서](docs/media/json-in-excel-out.gif)

## 여기서 시작

| | |
|---|---|
| 제품 사이트 | [jsonxcel.com/ko/](https://www.jsonxcel.com/ko/) |
| Learn | [jsonxcel.com/ko/learn/](https://www.jsonxcel.com/ko/learn/) |
| 다운로드 | [jsonxcel.com/ko/download/](https://www.jsonxcel.com/ko/download/) |

이 저장소는 **Learn** 사이트입니다(9개 모듈 · 30+ 레슨). GitHub Pages: [jsonxcel.github.io/learn-jsonxcel/ko/](https://jsonxcel.github.io/learn-jsonxcel/ko/). 영어 입구: [jsonxcel.com/en/](https://www.jsonxcel.com/en/), [/en/learn/](https://www.jsonxcel.com/en/learn/), [/en/download/](https://www.jsonxcel.com/en/download/).

## 빠른 시작

**JsonXcel.WebServer**를 로컬에서 실행하고(기본 `http://127.0.0.1:5000`), 통합 문서를 `Templates/{language}/`에 둔 뒤 변환합니다.

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
const blob = await res.blob(); // .xlsx로 저장
```

같은 호출을 curl로:

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"ko-KR\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\",\\\"age\\\":36}\"}"
```

`ds`는 **JSON 문자열**이어야 합니다(객체를 `stringify`). 요청 본문에 중첩 객체로 넣지 마세요. 인쇄용은 `output_format: "pdf"`. 위 GIF는 [판매 주문 레슨](https://jsonxcel.github.io/learn-jsonxcel/ko/learn/m09-practical/m09-l01-sales-order/)입니다. 계약은 같고 템플릿이 더 실무적입니다.

## 라이선스

모든 에디션이 **전체 기능**입니다. 라이선스가 바꾸는 것은 미인가 표시 여부와 키 유효 기간뿐입니다.

| 에디션 | 가격 | 내보내기 |
|---|---|---|
| **Unlicensed** | 무료 다운로드 | 기능 제한 없음. Excel에 미인가 sheet, PDF 머리글에 표시 |
| **1-month licensed** | 무료 평가 키 | 미인가 표시 없음. 기기 코드 1대에 바인딩, 한 달 후 만료 |
| **Lifetime licensed** | **$900** 일시불 | 미인가 표시 없음. 기기 코드 1대. 서버 변경 시 새 키 |

키는 [가격](https://www.jsonxcel.com/ko/pricing/)에서. 디지털 상품: 평생 키 발급 후 환불하지 않습니다.

## JsonXcel.WebServer 다운로드

자체 포함 패키지(.NET SDK 불필요):

| 플랫폼 | 패키지 | 다운로드 |
|--------|--------|----------|
| Windows x64 | `JsonXcel-win-x64.zip` | [최신](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [최신](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

모든 버전: <https://github.com/jsonxcel/learn-jsonxcel/releases>

압축 해제 후 서버를 실행하고, 레슨 템플릿을 `Templates/{language}/`에 둔 뒤 레슨 페이지에서 **Generate Excel**을 사용하세요.

> 위 파일명이 “최신” 직접 링크 계약입니다. Release 첨부 시 **동일한 이름**을 쓰거나 README·`hugo.toml` 링크를 함께 수정하세요.

## 튜토리얼 보기

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

기술 본문의 정본은 당분간 **영어**와 **간체 중국어**입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.

## 이 Hugo 사이트 로컬 실행

필요: [Hugo Extended](https://gohugo.io/installation/)(0.120+ 권장), Node.js 20+(테마 CSS).

```bash
# 테마 CSS(최초 / 스타일 변경 시)
cd hugo-theme-ete   # 모노레포에서는 ../hugo_template/hugo-theme-ete 등
npm install
npm run build:css

# 튜토리얼 사이트 루트(이 디렉터리)
hugo server -D --port 1313
# 예: http://localhost:1313/ko/learn/
```

`public/index.html`을 `file://`로 열지 마세요. HTTP 서버가 필요하며 루트는 언어 하위 경로로 리다이렉트됩니다.

배포 빌드:

```bash
hugo --minify -b https://learn.jsonxcel.com/
# 또는 GitHub Pages 예: https://jsonxcel.github.io/learn-jsonxcel/
```

## 저장소 구조

```text
content/{lang}/learn/       # 레슨 Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # 데모 JSON
assets/previews/{BCP-47}/   # template.png + result.png
docs/media/                 # README 데모 GIF
hugo.toml                   # 사이트 설정
```

## 관련

- 제품 사이트 / API: [www.jsonxcel.com](https://www.jsonxcel.com/)
- 유지보수자 노트: [DEVELOPING.md](DEVELOPING.md)

튜토리얼과 샘플은 JsonXcel 학습용입니다. 엔진 자체는 상용 소프트웨어입니다(위 [라이선스](#라이선스)).
