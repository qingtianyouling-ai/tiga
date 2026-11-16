# ============================================================================
# build-resume.py — 一页 A4 深色简历（Pillow，无第三方依赖）
#   输出：documents/resume.pdf  +  .tmp/resume-preview.png（视觉校对用）
# 用法：<bundled-python> scripts/build-resume.py
# ============================================================================
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 站点现在使用 冼正 自己做的简历：documents/resume.pdf 已被替换成
#   D:\my rice bowl\冼正\冼正简历.pdf
# 直接运行本脚本只会输出到 _backup/resume-generated.pdf，不会覆盖你的简历；
# 真要覆盖站点文件时加 --overwrite-site。
OVERWRITE_SITE = "--overwrite-site" in sys.argv
if OVERWRITE_SITE:
    OUT_PDF = os.path.join(ROOT, "documents", "resume.pdf")
else:
    OUT_PDF = os.path.join(ROOT, "_backup", "resume-generated.pdf")
OUT_PNG = os.path.join(ROOT, ".tmp", "resume-preview.png")
os.makedirs(os.path.dirname(OUT_PDF), exist_ok=True)
os.makedirs(os.path.dirname(OUT_PNG), exist_ok=True)

DPI = 200
W, H = int(8.27 * DPI), int(11.69 * DPI)

BG = (16, 16, 16)
INK = (241, 240, 237)
MUTED = (168, 168, 165)
QUIET = (128, 128, 125)
LINE = (54, 54, 54)

FONTS = "C:/Windows/Fonts/"
CN, CNB = FONTS + "msyh.ttc", FONTS + "msyhbd.ttc"
LAT, LATB = FONTS + "arial.ttf", FONTS + "arialbd.ttf"
GEO = FONTS + "bahnschrift.ttf"
CJK = re.compile(r"[\u2e80-\u9fff\u3000-\u303f\uff00-\uffef]")


def load(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.truetype(LAT, size)


S = {
    "eyebrow": (load(LAT, 18), load(CN, 18)),
    "name_cn": (load(CNB, 128), load(CNB, 128)),
    "name_lat": (load(GEO, 50), load(GEO, 50)),
    "role": (load(CN, 30), load(CN, 30)),
    "contact": (load(LAT, 19), load(CN, 19)),
    "h_en": (load(LAT, 16), load(CN, 16)),
    "h_cn": (load(CN, 19), load(CN, 19)),
    "body": (load(LAT, 23), load(CN, 23)),
    "body_s": (load(LAT, 20), load(CN, 20)),
    "item": (load(LAT, 25), load(CN, 25)),
    "mini": (load(LAT, 16), load(CN, 16)),
    "num": (load(LATB, 42), load(CNB, 42)),
    "quote": (load(CN, 34), load(CN, 34)),
    "footer": (load(LAT, 14), load(CN, 14)),
    "tag": (load(CN, 18), load(CN, 18)),
}

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

M = 124
COL_L = 838
GAP = 72
XR = M + COL_L + GAP
COL_R = W - M - XR


def pick(t, k):
    return S[k][1] if CJK.search(t) else S[k][0]


def tw(t, f):
    return d.textlength(t, font=f)


def track(x, y, text, key, fill, tracking=0.0):
    cx = x
    for ch in text:
        f = pick(ch, key)
        d.text((cx, y), ch, font=f, fill=fill)
        cx += tw(ch, f) + tracking
    return cx


NO_LINE_START = "，。、；：？！）】》」』…·%,.;:?!)]}"


def wrap(text, key, max_w):
    f = pick(text, key)
    lines, cur = [], ""
    for ch in text:
        if ch == "\n":
            lines.append(cur)
            cur = ""
            continue
        if tw(cur + ch, f) > max_w and cur:
            # 避头尾：标点不另起一行，悬挂在上一行末
            if ch in NO_LINE_START:
                lines.append(cur + ch)
                cur = ""
                continue
            lines.append(cur)
            cur = ch
        else:
            cur += ch
    if cur:
        lines.append(cur)
    return lines


def para(x, y, text, key, fill, max_w, lh):
    f = pick(text, key)
    for line in wrap(text, key, max_w):
        d.text((x, y), line, font=f, fill=fill)
        y += lh
    return y


def rule(x1, y, x2=None, fill=LINE, w=2):
    d.line([(x1, y), (x2 if x2 is not None else W - M, y)], fill=fill, width=w)


def section(x, y, num, cn, en, width, pad=48):
    y += pad
    track(x, y + 3, f"{num:02d}", "h_en", QUIET, 1.5)
    d.text((x + 36, y - 2), cn, font=S["h_cn"][1], fill=INK)
    tx = x + 36 + tw(cn, S["h_cn"][1]) + 15
    track(tx, y + 6, en.upper(), "h_en", QUIET, 1.8)
    rule(x, y + 36, x + width)
    return y + 64


# ── 页头 ────────────────────────────────────────────────────────────────────
track(M, 116, "PHOTOGRAPHY / DESIGN / CONTENT", "eyebrow", MUTED, 2.8)
tag = "PORTFOLIO 2026"
track(W - M - tw(tag, S["eyebrow"][0]) - 2.8 * len(tag), 116, tag, "eyebrow", QUIET, 2.8)

d.text((M - 4, 176), "冼正", font=S["name_cn"][1], fill=INK)
name_w = tw("冼正", S["name_cn"][1])
track(M + name_w + 26, 176 + 70, "TIGA.", "name_lat", INK, 1.6)

d.text((M, 356), "视觉创作者 · 摄影师 · 内容运营者", font=S["role"][1], fill=MUTED)

contacts = ["qingtianyouling@qq.com", "132 6707 4941", "微信 Pareght", "抖音 @tiga_xian"]
cx = M
for i, t in enumerate(contacts):
    cx = track(cx, 412, t, "contact", QUIET, 1.0)
    cx += 26
    if i < len(contacts) - 1:
        d.text((cx - 17, 413), "·", font=S["contact"][0], fill=(70, 70, 70))
        cx += 16

rule(M, 474)

# ── 左栏 ────────────────────────────────────────────────────────────────────
ly = 474
ly = section(M, ly, 1, "个人简介", "Profile", COL_L, pad=0)
ly = para(
    M, ly,
    "从校园融媒体中心社长做起，拍纪实、拍商业，也剪竖屏短剧。这几年把摄影、平面设计与"
    "平台运营连成一条完整链路——从现场到成片，从视觉到传播。关注画面，也关注画面如何讲故事。",
    "body", MUTED, COL_L, 46,
)

ly = section(M, ly, 2, "项目经历", "Experience", COL_L)
for year, title, role, note in [
    ("2023", "《镜享时尚》", "DP", "广东省职业技术教研室「奋进新征程 共创强国业」视频组一等奖"),
    ("2024", "《青春的底色》", "摄影", "广东青年大学生「百千万工程」突击队行动纪实片"),
    ("红果短剧", "《我心昭昭》《重生九零之野性时代》", "剪辑", "竖屏短剧项目 · 后期成片"),
]:
    track(M, ly + 4, year, "mini", QUIET, 1.2)
    d.text((M + 96, ly - 5), title, font=pick(title, "item"), fill=INK)
    d.text((M + 96 + tw(title, pick(title, "item")) + 14, ly - 2), f"/ {role}", font=pick(role, "mini"), fill=QUIET)
    ly += 40
    ly = para(M + 96, ly, note, "body_s", QUIET, COL_L - 96, 34)
    ly += 22

ly = section(M, ly, 3, "获奖经历", "Awards", COL_L)
for rank, title, note in [
    ("一等奖", "短片《罪饿》", "大学生原创微电影大赛 · 剧情片"),
    ("一等奖", "《凡事过往 皆为序章》", "2024 年招生宣传创意作品征集 · 视频类"),
    ("最佳影片", "短片《重启今日》", "2025 创意文化商贸学院 · 2025 大学生短片电影节"),
]:
    rw = tw(rank, S["tag"][0]) + 20
    d.rectangle([M, ly, M + rw, ly + 34], fill=INK)
    d.text((M + 10, ly + 5), rank, font=S["tag"][0], fill=BG)
    d.text((M + rw + 18, ly - 3), title, font=pick(title, "item"), fill=INK)
    ly += 38
    d.text((M + rw + 18, ly - 4), note, font=pick(note, "body_s"), fill=QUIET)
    ly += 38

ly = section(M, ly, 4, "教育背景", "Education", COL_L)
for school, major in [
    ("深圳大学", "视觉传达设计（本科）"),
    ("国家开放大学", "商务英语应用（专科）"),
    ("深圳鹏城技师学院", "新媒体与互联网应用"),
]:
    d.text((M, ly), school, font=S["item"][1], fill=INK)
    d.text((M + tw(school, S["item"][1]) + 18, ly + 5), major, font=S["body_s"][1], fill=QUIET)
    ly += 46

left_end = ly

# ── 右栏 ────────────────────────────────────────────────────────────────────
ry = 474
ry = section(XR, ry, 5, "设备操作", "Gear", COL_R, pad=0)
for label, items in [
    ("摄影", "如影 4D + RS 稳定器\nDJI 御系列无人机\nCanon 系列 / Sony 系列"),
    ("灯光", "ARRI 系列 / 爱图仕系列\n神牛系列 / 南光系列"),
]:
    track(XR, ry, label, "mini", QUIET, 1.5)
    ry += 32
    ry = para(XR, ry, items, "body_s", MUTED, COL_R, 34)
    ry += 18

ry = section(XR, ry, 6, "合作品牌", "Clients", COL_R)
bx, by = XR, ry
for brand in ["极氪", "蒙牛", "米哈游", "肯德基", "恒丰银行"]:
    w = tw(brand, S["tag"][0]) + 24
    if bx + w > XR + COL_R:
        bx, by = XR, by + 46
    d.rectangle([bx, by, bx + w, by + 38], outline=LINE, width=1)
    d.text((bx + 12, by + 7), brand, font=S["tag"][0], fill=MUTED)
    bx += w + 10
ry = by + 72

ry = section(XR, ry, 7, "平台数据", "Reach", COL_R)
for value, label in [("2万+", "累计粉丝"), ("15万+", "获赞与收藏"), ("100万+", "总播放量"), ("200+", "发布作品数")]:
    d.text((XR, ry - 10), value, font=S["num"][1], fill=INK)
    d.text((XR + 196, ry + 4), label, font=S["body_s"][1], fill=QUIET)
    ry += 62
d.text((XR, ry - 2), "截至 2026 年 6 月", font=S["footer"][1], fill=QUIET)
ry += 26

ry = section(XR, ry, 8, "能力标签", "Skills", COL_R)
ry = para(XR, ry, "摄影 / 布光 / 运镜\n剪辑 / 调色 / 字幕\nVI 系统 / 版式 / 海报\n选题策划 / 内容运营", "body_s", MUTED, COL_R, 34)

# ── 结语带 ──────────────────────────────────────────────────────────────────
band_y = 1690
rule(M, band_y)
d.text((M, band_y + 30), "从现场到成片，", font=S["quote"][1], fill=INK)
d.text((M, band_y + 72), "从视觉到传播。", font=S["quote"][1], fill=(120, 120, 117))
sub = "全部 50 件作品见线上作品集"
track(W - M - tw(sub, S["body_s"][1]), band_y + 56, sub, "body_s", QUIET)

# ── 作品精选 ────────────────────────────────────────────────────────────────
strip_y = 1918
rule(M, strip_y - 66)
track(M, strip_y - 56, "09", "h_en", QUIET, 1.5)
d.text((M + 36, strip_y - 62), "作品精选", font=S["h_cn"][1], fill=INK)
track(M + 36 + tw("作品精选", S["h_cn"][1]) + 15, strip_y - 54, "SELECTED WORK", "h_en", QUIET, 1.8)
rtext = "50 WORKS · ONLINE"
track(W - M - tw(rtext, S["h_en"][0]) - 1.8 * len(rtext), strip_y - 54, rtext, "h_en", QUIET, 1.8)

picks = [
    ("images/web/800/hero-porsche.webp", "保时捷 Taycan", "商业"),
    ("images/web/800/event-poster-01.webp", "青春的底色", "纪实"),
    ("images/web/800/microfilm-poster-01.webp", "罪饿", "微电影"),
    ("images/web/800/creative-poster-01.webp", "时空", "创意"),
    ("images/web/800/photo-landscape-03.webp", "夜春笋", "风光"),
    ("images/web/800/design-brand-001.webp", "品牌 VI 手册", "设计"),
]
gap = 16
cw = (W - 2 * M - gap * (len(picks) - 1)) // len(picks)
ch = int(cw * 9 / 16)
cx0 = M
for rel, title, kind in picks:
    p = os.path.join(ROOT, rel)
    if os.path.exists(p):
        th = Image.open(p).convert("RGB")
        tw_, th_ = th.size
        target = cw / ch
        if tw_ / th_ > target:
            nw = int(th_ * target)
            th = th.crop(((tw_ - nw) // 2, 0, (tw_ - nw) // 2 + nw, th_))
        else:
            nh = int(tw_ / target)
            th = th.crop((0, (th_ - nh) // 2, tw_, (th_ - nh) // 2 + nh))
        img.paste(th.resize((cw, ch), Image.LANCZOS), (cx0, strip_y))
    else:
        d.rectangle([cx0, strip_y, cx0 + cw, strip_y + ch], fill=(26, 26, 26))
    d.text((cx0, strip_y + ch + 14), title, font=pick(title, "mini"), fill=MUTED)
    track(cx0, strip_y + ch + 40, kind.upper(), "footer", QUIET, 1.4)
    cx0 += cw + gap

# ── 页脚 ────────────────────────────────────────────────────────────────────
fy = H - 86
rule(M, fy)
track(M, fy + 20, "© 2026 TIGA · 冼正", "footer", QUIET, 1.7)
site = "qingtianyouling-ai.github.io/tiga"
track(W - M - tw(site, S["footer"][0]) - 1.7 * len(site), fy + 20, site, "footer", QUIET, 1.7)

img.save(OUT_PNG, "PNG")
img.save(OUT_PDF, "PDF", resolution=DPI)
print("left column ends at y =", left_end, "| strip ends at", strip_y + ch + 60, "| page", H)
print("pdf:", OUT_PDF, os.path.getsize(OUT_PDF), "bytes")
