"""Rebuild the checked-in web-only Kai font from an official WenKai TTF.
Usage: python3 scripts/subset-kaiti.py /path/to/LXGWWenKai-Regular.ttf
Requires fonttools (WOFF uses built-in zlib). Original source:
https://github.com/lxgw/LxgwWenKai/tree/a06dd23142e82758f23f792f4060bbf1613286e8
The OFL and its web-subsetting permission are retained in licenses/WenKai-OFL.txt.
"""
import sys
from pathlib import Path
from fontTools import subset
root=Path(__file__).resolve().parents[1]
paths=['index.html','app.js','word-bank.js','curriculum.js','recognition.js','licenses/ARPHICPL.TXT','licenses/WenKai-OFL.txt']
chars=set(''.join((root/p).read_text() for p in paths))
unicodes={ord(c) for c in chars}|set(range(0x20,0x250))
options=subset.Options()
options.flavor='woff'
options.name_IDs=['*']
options.name_legacy=True
options.name_languages=['*']
font=subset.load_font(sys.argv[1],options)
missing=[chr(c) for c in unicodes if 0x3400<=c<=0x9fff and c not in font.getBestCmap()]
if missing:
 raise RuntimeError('Missing CJK glyphs: '+''.join(missing))
subsetter=subset.Subsetter(options=options)
subsetter.populate(unicodes=unicodes)
subsetter.subset(font)
output=root/'assets/game-kaiti.woff'
subset.save_font(font,str(output),options)
print(f'Kai web font generated: {output.stat().st_size:,} bytes; all curriculum/UI Chinese glyphs covered.')
