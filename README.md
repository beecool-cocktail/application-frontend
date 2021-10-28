# Application Frontend

## Tech Stack

1. `Next.js`：React 全端框架，支援 Server Side Rendering、Static Site Generator、Typescript、Incremental Static Regeneration、Image Optimization，並且在 Zero Config 的狀態下就能直接開始開發。
2. `Docker`：協助建置、測試並且打包成一個獨立網頁應用，只需建置一次 Docker image，即可在任意機器、平台、服務上執行，避免環境設定、套件安裝等繁雜工作。
3. `Google Cloud Platform`：協助我們整合 CI/CD 自動進行建置、測試、部署至雲端，讓我們有更多餘力專注在開發上。

## Development

### Yarn Scripts

前端人員開發使用，檾確保本機使用 Node.js 16 以上的版本，並且有安裝 yarn。

- `yarn`：安裝 npm dependencies packages。
- `yarn dev`：前端 Hot Reload 開發，至 [http://localhost:3000](http://localhost:3000) 查看結果。
- `yarn build`：進行 production build。
- `yarn start`：根據 production build 產生的檔案啟動 server，至 [http://localhost:3000](http://localhost:3000) 查看結果。

### Docker

主要提供給後端開發人員使用：

- `docker-compose build`：build docker image，名稱為 `application-frontend`
- `docker-compose up -d`：啟動 `application-frontend`，至 [http://localhost:8080](http://localhost:8080) 查看結果。
- `docker-compose down`：停止 `application-frontend`。

## GCP 部署

目前尚未完全整合 CI/CD，需要手動下 `./scripts/cloud-build.sh` 指令進行部署。

- docker image path: `asia-east1-docker.pkg.dev/nth-weft-328504/frontend-repo/application-frontend`
- cloud run service name: `application-frontend`
- cloud run service url: [https://application-frontend-mhkzpmkvca-de.a.run.app](https://application-frontend-mhkzpmkvca-de.a.run.app)
- cloud run url access permission: `allUsers`

## Reference

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [How to Deploy Static Site to GCP Cloud Run](https://galtz.netlify.app/gcp-static-site/)
- [How to deploy Next.js on Google Cloud Run](https://blog.logrocket.com/how-to-deploy-next-js-on-google-cloud-run/)
- [Next.js 入門：從 CRA 與 Prerender 進化至 Next.js 的歷程](https://simonallen.coderbridge.io/2021/07/13/why-nextjs/)