# AGENTS.md —— 给 Codex / 其他编码 Agent

这是 **TIGA（冼正）个人作品集**：纯静态站，零构建、零框架、零接口请求，`file://` 也能打开。

- 线上：<https://qingtianyouling-ai.github.io/tiga/>
- 仓库：<https://github.com/qingtianyouling-ai/tiga>（main 分支，Pages 从根目录发布）

## 先读这两份

1. `START-HERE.md` —— 30 秒上手、命令、包里缺什么
2. `HANDOFF-AI.md` —— 规则、代码结构、数据模型、素材管线、部署、踩过的坑

改之前先用自己的话复述硬规则，再动手。

## 常用命令

```bash
node scripts/serve.mjs                 # 本地预览 http://127.0.0.1:5188/
npm install --prefix .tmp jsdom        # 只装一次
node scripts/audit.mjs                 # 引用完整性 + 体积预算
node scripts/audit.mjs --no-media      # 若拿到的包不含详情视频，用这个
node scripts/dom-test.mjs              # jsdom 真跑页面，25 条断言
```

两条自检都必须 **0 错**。报错要修，但**不许靠删 `content.js` 里的作品数据来让检查通过**。

## 硬性规则（违反会被打回）

1. 不要个人照片；**不要 About 区、不要平台运营区**（已按要求删除，别恢复）。
2. 站点只有三块：`01 Selected Work`（视频）/ `02 Graphic`（风光照片）/ `03 Contact`。
3. 作品顺序**人工定**，别按分类自动排：
   小米 SU7 → 雷鸟眼镜 iO → 保时捷 → iPhone 18 Pro → iPhone Duo → 舍得酒 → 扫地机器人 → HPC → 创意短片（5 条）→ 纪实活动（12 条）
4. 作品 / 平面两个板块，首屏露 **10 个** + 「展开更多」；卡片文案固定三行（名称·片种 / 品类·规格 / 职责）。
5. 首屏三条各 **7 秒**，靠视频 `ended` 一条接一条，`<video>` 上**不能加 `loop`**；首屏视频 1280×720 约 770KB，下一镜**默认不预加载**。
6. 平面只有 8 张风光（极氪等商业平面已删），只剩一个分类时筛选条会自动隐藏。
7. 中文回复，直接给结论，不要长篇解释。

## 部署

```bash
git add -A && git commit -m "说明" && git push origin main
```

Pages 1–2 分钟自动构建；验证要加 `?v=时间戳`，CDN 还会缓存约 10 分钟。
推送方式见 `HANDOFF-AI.md` §8（这台 Mac 用仓库部署密钥）。
