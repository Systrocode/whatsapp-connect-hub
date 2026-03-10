from PIL import Image
import sys

def check(path):
    try:
        img = Image.open(path)
        img = img.convert("RGBA")
        # check top-left pixel
        data = img.getpixel((0,0))
        print(f"{path}: top-left pixel is {data}")
    except Exception as e:
        print(f"{path}: error {e}")

check("public/logos/avelo-logo-transparent.png")
check("public/logos/avelo-logo-v3.png")
check("public/logos/avelo-logo-v4.png")
check("public/logos/logomark-transparent.png")
check("public/logos/avelo-logo.png")
