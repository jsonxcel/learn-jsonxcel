# JsonXcel Learn

**[JsonXcel](https://www.jsonxcel.com/)** 실습 튜토리얼입니다. JSON과 Excel 템플릿으로 `POST /api/convert`를 통해 Excel/PDF를 생성합니다.

이 저장소는 다음을 모두 포함합니다.

- **다국어 학습 경로**(9개 모듈 · 30+ 레슨)
- 로컬 실행·배포 가능한 **Hugo 사이트**(예: GitHub Pages)

**언어:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

---

## 링크

| | |
|---|---|
| Learn 사이트 | [learn.jsonxcel.com](https://learn.jsonxcel.com/) |
| 제품 / 문서 | [www.jsonxcel.com](https://www.jsonxcel.com/) |
| 이 저장소 | [github.com/jsonxcel/learn-jsonxcel](https://github.com/jsonxcel/learn-jsonxcel) |
| 서버 다운로드 | [Releases](https://github.com/jsonxcel/learn-jsonxcel/releases) |

---

## JsonXcel 서버 다운로드

레슨 데모에는 로컬 또는 호스팅된 **JsonXcel.WebServer**가 필요합니다. 미리 빌드된 패키지는 GitHub Releases에 게시합니다(플랫폼은 추후 추가).

| 플랫폼 | 패키지 | 다운로드 |
|--------|--------|----------|
| Windows x64 | `JsonXcel-win-x64.zip` | [최신](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [최신](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

모든 버전: <https://github.com/jsonxcel/learn-jsonxcel/releases>

압축 해제 후 서버를 실행하고(기본 `http://127.0.0.1:5000`), 레슨 템플릿을 `Templates/{language}/`에 둔 뒤 레슨 페이지에서 **Generate Excel**을 사용하세요.

> 위 파일명이 “최신” 직접 링크 계약입니다. Release 첨부 시 **동일한 이름**을 쓰거나 README·`hugo.toml` 링크를 함께 수정하세요.

---

## 튜토리얼 보기

사이트 실행 후 또는 온라인에서:

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

기술 본문의 정본은 당분간 **영어**와 **간체 중국어**입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.

---

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

---

## 저장소 구조

```text
content/{lang}/learn/       # 레슨 Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # 데모 JSON
assets/previews/{BCP-47}/   # template.png + result.png
hugo.toml                   # 사이트 설정
```

---

## 관련

- 제품 사이트 / API: [www.jsonxcel.com](https://www.jsonxcel.com/)
- 유지보수자 노트: [DEVELOPING.md](DEVELOPING.md)

---

## 라이선스

게시된 `LICENSE`를 참고하세요. 튜토리얼과 샘플은 JsonXcel 학습용입니다.
