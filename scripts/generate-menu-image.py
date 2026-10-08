import re,json,base64,io,sys,urllib.request
from PIL import Image, ImageDraw
mem=open('/Users/a/.claude/projects/-Users-a-Downloads-Claudecode/memory/reference_falai_api_key.md').read()
KEY=re.search(r'`([^`]+)`',mem).group(1)

# 1) logo as an opaque white sticker
L=Image.open('/Users/a/Downloads/Claudecode/the-brew/public/images/logo.png').convert('RGBA')
c=L.crop(L.getchannel('A').getbbox())
s=Image.new('RGBA',c.size,(0,0,0,0)); d=ImageDraw.Draw(s); d.ellipse([0,0,c.width-1,c.height-1],fill=(255,255,255,255)); s.alpha_composite(c)
s=s.resize((600,600)); s.save('logo-sticker.png')

def uri(im,fmt='PNG',maxside=1024):
    im=im.copy(); im.thumbnail((maxside,maxside))
    b=io.BytesIO(); im.save(b,fmt); return f"data:image/{fmt.lower()};base64,"+base64.b64encode(b.getvalue()).decode()
ref=Image.open('/Users/a/Downloads/media_19852ab883b14db53f86a2654357f0330ec10f16a.webp').convert('RGBA')
bg=Image.new('RGBA',ref.size,(255,255,255,255)); bg.alpha_composite(ref)

def post(url,payload):
    r=urllib.request.Request(url,data=json.dumps(payload).encode(),headers={'Authorization':'Key '+KEY,'Content-Type':'application/json'})
    with urllib.request.urlopen(r,timeout=180) as f: return json.load(f)
def fetch(u): 
    with urllib.request.urlopen(u,timeout=120) as f: return f.read()

item=sys.argv[1]; desc=sys.argv[2]; out=sys.argv[3]
prompt=(f"Studio product photograph of a single {item}: {desc}. "
 "Served in a tall clear plastic cup with a domed or open top as shown in the second reference image, with condensation droplets on the cup. "
 "Place the circular black-and-white logo sticker from the FIRST image on the front of the cup, centered, exactly as it appears, unchanged and fully legible, like a printed label on the cup. "
 "Match the second reference image's style: bright, clean, glossy commercial photography, soft studio lighting, sharp focus, front-facing view, slight shadow. "
 "Isolated on a plain pure white background. No other text, no extra logos, no straws unless natural.")
res=post('https://fal.run/fal-ai/nano-banana/edit',{'prompt':prompt,'image_urls':[uri(s),uri(bg.convert('RGB'),'JPEG')],'num_images':1,'output_format':'png'})
url=res['images'][0]['url']; open(out+'-raw.png','wb').write(fetch(url)); print('generated',url[:60])
cut=post('https://fal.run/fal-ai/birefnet/v2',{'image_url':url,'output_format':'png','refine_foreground':True})
curl_=cut['image']['url'] if 'image' in cut else cut['images'][0]['url']
open(out+'.png','wb').write(fetch(curl_)); print('cutout saved',out+'.png')
