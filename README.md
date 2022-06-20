# kurakichi

[くらきち〜くらしのあんぜんきち〜](https://www.kurakichi.org)

このアプリケーションは、ProofOfConcept であり、PortFolio であり、名刺です。

## 使用技術

![kurakichi-technologies](https://github.com/Tak-Irie/kurakichi/blob/imagesForGithub/images/kurakichi-technologies.webp)

## 構成

```Text
├── apps
│   ├── server
│   └── web
├── packages
│   ├── config(jest/eslintのbase config)
│   ├── domain(ビジネスドメインのロジック)
│   ├── terraform
│   │   ├── common
│   │   ├── dev
│   │   ├── prod
│   │   ├── shared
│   │   └── stg
│   ├── third-api(3rdライブラリのラッパー)
│   └── tsconfig
```
