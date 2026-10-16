"""Subset the project owner's supplied 方正楷体简体.ttf for web delivery.
Usage: python3 scripts/subset-kaiti.py /path/to/方正楷体简体.ttf
Requires fonttools; WOFF compression uses built-in zlib.
Preserves original font naming and copyright metadata.
See licenses/Founder-font-NOTICE.txt for the source fingerprint.
"""
import sys
from pathlib import Path
from fontTools import subset
root=Path(__file__).resolve().parents[1]
paths=['index.html','app.js','word-bank.js','curriculum.js','recognition.js','licenses/ARPHICPL.TXT','licenses/Founder-font-NOTICE.txt']
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
output=root/'assets/game-fangzheng-kaiti.woff'
subset.save_font(font,str(output),options)
print(f'Kai web font generated: {output.stat().st_size:,} bytes; all curriculum/UI Chinese glyphs covered.')
