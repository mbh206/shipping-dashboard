# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

```
shipping-dashboard
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 08
│  │  │  └─ 7e7c201dd61fe336bddd7e7e53bc4d4a16b019
│  │  ├─ 09
│  │  │  └─ 2408a9f09eae19150818b4f0db5d1b70744828
│  │  ├─ 11
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 1b
│  │  │  └─ bf9cef09985282f88a2427134cdd706de0ba0d
│  │  ├─ 1f
│  │  │  └─ fef600d959ec9e396d5a260bd3f5b927b2cef8
│  │  ├─ 25
│  │  │  └─ cc94ae9119a564bbc4b495c4414bee7cacebf2
│  │  ├─ 32
│  │  │  └─ 784c8cce945012cddfbdddebdeef77ba51f37f
│  │  ├─ 35
│  │  │  └─ 8ca9ba93f089b0133f05933f133a446402eb17
│  │  ├─ 3d
│  │  │  ├─ 7ded3ff62424046af18e2b5b8b8324c7e0001d
│  │  │  └─ 8e97117e6854bb1d9d1c5d8009c44f6e01a6b4
│  │  ├─ 49
│  │  │  └─ 879179eab6ec87085911f29b7f59354d0b499c
│  │  ├─ 4a
│  │  │  └─ 67611dbb19a3bc9ef066b705df810a63aa8599
│  │  ├─ 55
│  │  │  └─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  ├─ 61
│  │  │  └─ 19ad9a8faaa5073a454f67b50fb98a25972fd2
│  │  ├─ 6c
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 74
│  │  │  └─ 872fd4af60fb8d6cdb7d27e6c587ee0b6e1df7
│  │  ├─ 7e
│  │  │  └─ 993e33f732227edc9ef782f42e572b66a3527f
│  │  ├─ 8b
│  │  │  └─ 0f57b91aeb45c54467e29f983a0893dc83c4d9
│  │  ├─ 94
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 9d
│  │  │  └─ aecd241448b7e0dd1c43bda82cfd33c5763bbb
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ ad
│  │  │  └─ 481b8f2f9968c095506e6888703761b76d9a40
│  │  ├─ b9
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ be
│  │  │  └─ f5202a32cbd0632c43de40f6e908532903fd42
│  │  ├─ c4
│  │  │  └─ 8de4a76f1f90550da9ac2bafd19382001d98b2
│  │  ├─ db
│  │  │  └─ 0becc8b033a4a78144f4a3bb852082fe91cd62
│  │  ├─ e4
│  │  │  └─ b78eae12304a075fa19675c4047061d6ab920d
│  │  ├─ e7
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ LeftnavMenu.tsx
│  │  ├─ ShipmentsList.tsx
│  │  └─ TopNavBar.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ output.css
│  ├─ pages
│  │  ├─ BillList.tsx
│  │  ├─ BusinessPartnerMgmt.tsx
│  │  ├─ DashboardHome.tsx
│  │  ├─ DashboardLayout.tsx
│  │  ├─ LocationMgmt.tsx
│  │  ├─ Login.tsx
│  │  ├─ ProductMgmt.tsx
│  │  ├─ Profile.tsx
│  │  ├─ QuotationOrdering.tsx
│  │  ├─ Setting.tsx
│  │  ├─ Shipments.tsx
│  │  └─ Support.tsx
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```