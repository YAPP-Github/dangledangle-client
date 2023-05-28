# 22nd-Web-Team-2-Web

![GitHub package.json version](https://img.shields.io/github/package-json/v/YAPP-Github/22nd-Web-Team-2-Web?style=flat-square)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/packageManager/YAPP-Github/22nd-Web-Team-2-Web?color=2783B3&logo=yarn&logoColor=2783B3&style=flat-square)
![npm](https://img.shields.io/npm/v/typescript?color=%231976D2&label=Typescript&logo=Typescript&logoColor=%231976D2&style=flat-square)
![npm](https://img.shields.io/npm/v/react?color=%2300D3FF&label=React&logo=React&logoColor=%2300D3FF&style=flat-square)
![npm](https://img.shields.io/npm/v/next?color=lightgrey&label=Next.js&logo=Next.js&logoColor=white&style=flat-square)
![npm](https://img.shields.io/npm/v/@tanstack/react-query?color=FF394A&label=react-query%20&logo=react-query&logoColor=FF394A&style=flat-square)
![npm](https://img.shields.io/npm/v/recoil?color=2F6CE2&label=recoil&logo=recoil&logoColor=2F6CE2&style=flat-square)

> 유기견 봉사 스케줄링 & 커뮤니티 플랫폼

### ✨ Features

- 사용자(보호소)는 유기견 보호소 운영에 필요한 봉사를 요청하고, 필요한 정보를 사전 안내할 수 있습니다.
- 사용자(보호소)는 요청한 봉사를 운영/관리할 수 있습니다.
- 사용자(봉사자)는 유기견 보호소에 도움을 제공할 수 있습니다.
- 사용자(보호소&봉사자)는 보호소 단위로 결성된 봉사자 커뮤니티 안에서 서로 도움을 주고 받거나 친목을 도모할 수 있습니다.

## 🪄 Getting Start

```shell
# 개발 환경
yarn dev

# 프로덕션 환경
yarn build
yarn start
```

## 🗂️ Structure

```
public
src
├─ app
│  └─ xpage
├─ components
│  ├─ xpage
│  │  ├─ components // UI 컴포넌트
│  │  └─ services // Hook - 로직 분리
│  ├─ zpage
│  │  ├─ components
│  │  └─ services
│  └─ common  // 두 페이지 이상 공유되는 컴포넌트와 로직
├─ apis  // 서버 도메인으로 분리된 서버 통신 코드(ky), useQuery Hook
├─ store
├─ styles
├─ utils
└─ types
```

## 👩🏻‍💻 Contributors

<table>
  <tr align="center">
    <td><a href="https://github.com/Sangjun-man">이상준</a></td>
    <td><a href="https://github.com/hayoiii">정하영</a></td>
    <td><a href="https://github.com/Paperkeem">김종이</a></td>
  </tr>
  <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/66112027?v=4" width="150px;" alt="이상준"/>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/66769242?v=4" width="150px;" alt="정하영"/>
      </td>
      <td align="center" display="block">
        <img src="https://avatars.githubusercontent.com/u/107424974?v=4" width="150px;" alt="김종이"/>
      </td>
  </tr>
</table>
