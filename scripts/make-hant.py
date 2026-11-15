"""Generate src/i18n/zh-hant.ts from zh-hans.ts (OpenCC s2tw: Traditional characters, Taiwan standard).
Usage: python3 scripts/make-hant.py   (requires: pip install opencc-python-reimplemented)
Manual fixes after conversion are applied from FIXES below."""
import pathlib, re
from opencc import OpenCC
src = pathlib.Path("src/i18n/zh-hans.ts").read_text(encoding="utf-8")
out = OpenCC("s2tw").convert(src)
out = out.replace("export const zhHans", "export const zhHant")
out = re.sub(r"/\*\*.*?\*/\n", "/** 繁體中文 – generated from zh-hans.ts by scripts/make-hant.py (OpenCC s2tw + fixes). Do not edit by hand. */\n", out, count=1, flags=re.S)
FIXES = {
    # characters OpenCC leaves in mainland form / more natural HK-TW usage
    "臺": "台",
    "制熱": "製熱",
    "賬": "帳",
    "視頻": "影片",
    "菜單": "選單",
    "信息": "資訊",
    "在線": "線上",
    "鏈接": "連結",
    "打開": "開啟",
    "郵箱": "電郵",
    "獲取": "索取",
    "聯繫": "聯絡",
    "默認": "預設",
    "存儲": "儲存",
    "運營": "經營",
    "“": "「",
    "”": "」",
}
for a, b in FIXES.items():
    out = out.replace(a, b)
pathlib.Path("src/i18n/zh-hant.ts").write_text(out, encoding="utf-8")
print("ok")
