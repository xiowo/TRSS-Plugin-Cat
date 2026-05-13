# TRSS Yunzai Plugin Cat

基于原插件精简，移除了一些不需要的功能，同时优化了一些体验。

## 安装方式

```bash
git clone --depth 1 https://github.com/xiowo/TRSS-Plugin-Cat ./plugins/TRSS-Plugin-Cat
```

```bash
pnpm i
```

## 可用命令

<details><summary>更新插件</summary>

- #核心调试更新

</details>

<details><summary>系统信息</summary>

- #系统信息 / #系统信息图片

需安装 `fastfetch` 才能使用
</details>

<details><summary>二维码生成</summary>

- #二维码/qr + `文字`

</details>

<details><summary>二维码扫描（权限：主人）</summary>

- #识别二维码/qr + `二维码`

</details>

<details><summary>Markdown渲染展示（权限：主人）</summary>

- #md + `文件` / `URL`

</details>

<details><summary>源码渲染展示（权限：主人）</summary>

- #sc + `文件` / `URL`

</details>

<details><summary>远程命令（权限：主人）</summary>

- #rc + `Shell 命令`
- #rj + `JavaScript 命令`
- #dm(单条消息) / #mm(多条消息) / #fm(转发消息) + `JavaScript 表达式`
- #rcp / #rjp / #dmp / #mmp / #fmp 以图片显示输出

</details>
