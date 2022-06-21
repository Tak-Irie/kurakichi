# kurakichi

[くらきち〜くらしのあんぜんきち〜](https://www.kurakichi.org)

このアプリケーションは、Proof Of Concept であり、Portfolio です。

## 使用技術

![kurakichi-technologies](https://github.com/Tak-Irie/kurakichi/blob/imagesForGithub/images/kurakichi-technologies.webp)

## 構成

```Text
├── apps
│   ├── server    (HTTPサーバー)
│   └── web       (Next.jsとReactアプリケーション)
├── packages
│   ├── config    (jest/eslintのbase config)
│   ├── domain    (ビジネスドメインのロジック)
│   ├── terraform
│   │   ├── dev   (現在のデプロイ環境)
│   │   ├── ...
│   ├── third-api (3rdライブラリのラッパー)
│   └── tsconfig
...
```
