"""Generate the static social sharing image (requires Pillow)."""

from pathlib import Path
import json
from html import escape
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PROFILE = json.loads((ROOT / "src" / "profile.json").read_text(encoding="utf-8"))
OUT = ROOT / "public" / "og-image.png"
W, H = 1200, 630
im = Image.new("RGB", (W, H), "#08111d")
d = ImageDraw.Draw(im)

for x in range(0, W, 80):
    d.line((x, 0, x, H), fill="#102335", width=1)
for y in range(0, H, 80):
    d.line((0, y, W, y), fill="#102335", width=1)

for radius in range(300, 20, -8):
    level = int((300 - radius) / 280 * 38)
    d.ellipse((850 - radius, 300 - radius, 850 + radius, 300 + radius), outline=(14 + level, 48 + level, 65 + level), width=2)

bold = r"C:\Windows\Fonts\segoeuib.ttf"
regular = r"C:\Windows\Fonts\segoeui.ttf"
name_font = ImageFont.truetype(bold, 80)
label_font = ImageFont.truetype(bold, 23)
sub_font = ImageFont.truetype(regular, 31)
mark_font = ImageFont.truetype(bold, 50)

d.rounded_rectangle((80, 65, 170, 155), radius=18, fill="#122d3c", outline="#4bb7c9", width=2)
d.text((92, 79), PROFILE["initials"], font=mark_font, fill="#7fe4ed")
d.text((82, 250), PROFILE["name"].upper(), font=name_font, fill="#eff8fa")
d.rectangle((84, 355, 420, 360), fill="#75dce9")
role_lines = PROFILE["role"].split(" & ", maxsplit=1)
role_lines = [role_lines[0] + " &", role_lines[1]] if len(role_lines) == 2 else role_lines
for index, line in enumerate(role_lines):
    d.text((84, 399 + index * 45), line, font=sub_font, fill="#b9d2df")
d.text((85, 555), f"PORTFOLIO  /  {PROFILE['location'].split(',')[-1].strip().upper()}", font=label_font, fill="#7ad9e5")

OUT.parent.mkdir(parents=True, exist_ok=True)
im.save(OUT, optimize=True)
favicon = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="13" fill="#08111d"/>
  <path d="M8 45h48" stroke="#27516a" stroke-width="1"/>
  <text x="10" y="43" fill="#78e2ed" font-family="Arial,sans-serif" font-weight="800" font-size="31" letter-spacing="-3">{escape(PROFILE['initials'])}</text>
</svg>
'''
(OUT.parent / "favicon.svg").write_text(favicon, encoding="utf-8")
print(OUT)
