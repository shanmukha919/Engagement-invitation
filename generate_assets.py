import os, math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

random.seed(42)
np.random.seed(42)

ASSETS_DIR = "src/assets"
PUBLIC_DIR = "public"
os.makedirs(ASSETS_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

def create_doors():
    W, H = 540, 1200
    # Left door
    img = Image.new("RGBA", (W, H), (138, 154, 123, 255)) # Sage base #8A9A7B
    draw = ImageDraw.Draw(img)

    # Shading gradient: slightly darker at outer hinge edge (x=0) and brighter towards center meeting edge (x=W)
    for x in range(W):
        ratio = x / W
        v = int(12 + 15 * ratio)
        draw.line([(x, 0), (x, H)], fill=(138 + v - 10, 154 + v - 10, 123 + v - 10, 255))

    # Outer panel molding
    outer_margin_x = 24
    outer_margin_y = 36
    draw.rectangle([outer_margin_x, outer_margin_y, W - 6, H - outer_margin_y], outline=(94, 109, 82, 220), width=3)
    draw.rectangle([outer_margin_x + 3, outer_margin_y + 3, W - 9, H - outer_margin_y - 3], outline=(175, 191, 160, 220), width=2)

    # Gold accent inner rim
    draw.rectangle([outer_margin_x + 12, outer_margin_y + 12, W - 18, H - outer_margin_y - 12], outline=(201, 166, 107, 240), width=2)

    # Upper panel and lower panel
    panel_gap = 40
    mid_y = H // 2
    panels = [
        (outer_margin_x + 28, outer_margin_y + 28, W - 32, mid_y - panel_gap // 2),
        (outer_margin_x + 28, mid_y + panel_gap // 2, W - 32, H - outer_margin_y - 28)
    ]

    for p in panels:
        # Sunken panel effect
        draw.rectangle(p, fill=(125, 140, 110, 255))
        # Bevel highlight & shadow
        draw.line([(p[0], p[1]), (p[2], p[1])], fill=(185, 200, 170, 240), width=3)
        draw.line([(p[0], p[1]), (p[0], p[3])], fill=(185, 200, 170, 240), width=3)
        draw.line([(p[2], p[1]), (p[2], p[3])], fill=(80, 92, 70, 240), width=3)
        draw.line([(p[0], p[3]), (p[2], p[3])], fill=(80, 92, 70, 240), width=3)

        # Thin gold fillet
        draw.rectangle([p[0] + 8, p[1] + 8, p[2] - 8, p[3] - 8], outline=(201, 166, 107, 180), width=1)

    # Botanical relief leaves along panels
    leaf_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    leaf_draw = ImageDraw.Draw(leaf_layer)

    for p in panels:
        cx = (p[0] + p[2]) // 2
        cy = (p[1] + p[3]) // 2
        # Draw elegant botanical leaves stem
        y_start = p[1] + 40
        y_end = p[3] - 40
        for y in range(y_start, y_end, 36):
            rel_y = (y - y_start) / (y_end - y_start)
            # central branch node
            leaf_len = int(22 + 14 * math.sin(rel_y * math.pi))
            angle = 0.35 + 0.15 * math.sin(rel_y * 4)
            # left leaf
            lx = cx - int(leaf_len * math.cos(angle))
            ly = y - int(leaf_len * math.sin(angle))
            leaf_draw.ellipse([cx - 4, y - 4, cx + 4, y + 4], fill=(180, 195, 165, 180))
            leaf_draw.polygon([(cx, y), (lx, ly), (cx - 10, y + 8)], fill=(195, 210, 180, 190))
            leaf_draw.polygon([(cx, y), (lx + 2, ly + 2), (cx - 10, y + 10)], fill=(90, 105, 80, 160))
            # right leaf
            rx = cx + int(leaf_len * math.cos(angle))
            ry = y - int(leaf_len * math.sin(angle))
            leaf_draw.polygon([(cx, y), (rx, ry), (cx + 10, y + 8)], fill=(195, 210, 180, 190))
            leaf_draw.polygon([(cx, y), (rx - 2, ry + 2), (cx + 10, y + 10)], fill=(90, 105, 80, 160))

    img = Image.alpha_composite(img, leaf_layer)

    # Center meeting edge gold bevel
    draw = ImageDraw.Draw(img)
    draw.line([(W - 1, 0), (W - 1, H)], fill=(218, 185, 128, 255), width=2)
    draw.line([(W - 3, 0), (W - 3, H)], fill=(160, 130, 80, 220), width=1)

    # Save Left Door
    left_path = os.path.join(ASSETS_DIR, "door-left.png")
    img.save(left_path, "PNG")
    img.save(os.path.join(PUBLIC_DIR, "door-left.png"), "PNG")

    # Right door is mirror
    right_img = img.transpose(Image.FLIP_LEFT_RIGHT)
    right_path = os.path.join(ASSETS_DIR, "door-right.png")
    right_img.save(right_path, "PNG")
    right_img.save(os.path.join(PUBLIC_DIR, "door-right.png"), "PNG")
    print("Doors created:", left_path, right_path)

def create_crest():
    # 420 x 420 ornate gold medallion
    S = 420
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = S // 2, S // 2

    # Scalloped cartouche background
    # Multi-lobed baroque outline
    num_petals = 16
    outer_r = 175
    inner_r = 155
    points = []
    for i in range(num_petals * 20):
        theta = i * 2 * math.pi / (num_petals * 20)
        # modulation for scalloped edge
        r = outer_r - 12 * (math.cos(num_petals * theta) ** 2)
        # vertical oval stretch
        x = cx + r * math.cos(theta) * 0.92
        y = cy + r * math.sin(theta) * 1.08
        points.append((x, y))

    # Base cream fill with soft paper tone
    draw.polygon(points, fill=(246, 238, 223, 255)) # Cream #F6EEDF

    # Gold foil embossed outer rim
    for w in range(5):
        scaled_pts = []
        scale = 1.0 - w * 0.012
        for x, y in points:
            sx = cx + (x - cx) * scale
            sy = cy + (y - cy) * scale
            scaled_pts.append((sx, sy))
        alpha = 255 - w * 30
        draw.polygon(scaled_pts, outline=(201, 166, 107, alpha))

    # Beaded dot circle
    dot_r = 135
    for i in range(32):
        th = i * 2 * math.pi / 32
        dx = cx + dot_r * math.cos(th) * 0.88
        dy = cy + dot_r * math.sin(th) * 1.04
        draw.ellipse([dx - 2.5, dy - 2.5, dx + 2.5, dy + 2.5], fill=(201, 166, 107, 240))

    # Inner filigree frame
    inner_pts = []
    for i in range(120):
        th = i * 2 * math.pi / 120
        r = 115
        x = cx + r * math.cos(th) * 0.86
        y = cy + r * math.sin(th) * 1.02
        inner_pts.append((x, y))
    draw.polygon(inner_pts, outline=(201, 166, 107, 200), width=2)

    # Crown / ring ornament at top
    # Gold leaf flourish
    draw.arc([cx - 30, cy - 85, cx + 30, cy - 45], 0, 180, fill=(201, 166, 107, 255), width=2)
    draw.ellipse([cx - 5, cy - 78, cx + 5, cy - 68], fill=(218, 185, 128, 255), outline=(160, 130, 80, 255))
    draw.polygon([(cx, cy - 86), (cx - 7, cy - 73), (cx + 7, cy - 73)], fill=(201, 166, 107, 255))

    # Try to load a nice font or draw elegant calligraphy
    try:
        font_large = ImageFont.truetype(r"C:\Windows\Fonts\georgia.ttf", 42)
        font_small = ImageFont.truetype(r"C:\Windows\Fonts\georgia.ttf", 13)
    except:
        font_large = ImageFont.truetype("arial.ttf", 38)
        font_small = ImageFont.truetype("arial.ttf", 13)

    # Monogram "Y & S" (Yamini & Srikar)
    draw.text((cx, cy - 15), "Y  &  S", fill=(45, 55, 35, 255), anchor="mm", font=font_large)

    # Flourish divider
    draw.line([(cx - 45, cy + 18), (cx + 45, cy + 18)], fill=(201, 166, 107, 220), width=1)
    draw.ellipse([cx - 3, cy + 16, cx + 3, cy + 20], fill=(201, 166, 107, 255))

    # "TAP TO OPEN"
    draw.text((cx, cy + 40), "TAP TO OPEN", fill=(138, 154, 123, 255), anchor="mm", font=font_small)

    crest_path = os.path.join(ASSETS_DIR, "crest.png")
    img.save(crest_path, "PNG")
    img.save(os.path.join(PUBLIC_DIR, "crest.png"), "PNG")
    print("Crest created:", crest_path)

def create_curtains_and_valance():
    # Valance (top drapery) - 640 x 260
    VW, VH = 640, 260
    valance = Image.new("RGBA", (VW, VH), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(valance)

    # 3 scalloped swag drapes across top
    num_swags = 3
    swag_w = VW / num_swags
    for s in range(num_swags):
        x0 = s * swag_w
        x1 = x0 + swag_w
        mx = (x0 + x1) / 2
        # Swag curved folds
        for fold in range(8):
            fold_y = 50 + fold * 18
            curve_pts = []
            for step in range(30):
                t = step / 29
                x = x0 + t * swag_w
                # parabolic curve for swag
                y = 15 + fold_y * 4 * t * (1 - t)
                curve_pts.append((x, y))
            # fill swag loop
            curve_pts.append((x1, 0))
            curve_pts.append((x0, 0))
            v_color = (246 - fold * 3, 238 - fold * 3, 223 - fold * 3, 255)
            vdraw.polygon(curve_pts, fill=v_color, outline=(220 - fold * 5, 210 - fold * 5, 195 - fold * 5, 180))

    # Scalloped bottom edge with gold tassels
    for s in range(num_swags):
        x0 = s * swag_w
        x1 = x0 + swag_w
        for t_idx in range(9):
            tx = x0 + (t_idx + 0.5) * (swag_w / 9)
            norm_x = (tx - x0) / swag_w
            ty = 15 + 175 * 4 * norm_x * (1 - norm_x)
            # Tassel head
            vdraw.ellipse([tx - 4, ty - 4, tx + 4, ty + 4], fill=(201, 166, 107, 255))
            # Tassel fringe
            vdraw.line([(tx, ty), (tx, ty + 18)], fill=(218, 185, 128, 255), width=2)
            vdraw.line([(tx - 2, ty + 4), (tx - 1, ty + 16)], fill=(180, 150, 95, 220), width=1)
            vdraw.line([(tx + 2, ty + 4), (tx + 1, ty + 16)], fill=(180, 150, 95, 220), width=1)

    # Top border header
    vdraw.rectangle([0, 0, VW, 20], fill=(235, 225, 210, 255), outline=(201, 166, 107, 255), width=2)

    valance_path = os.path.join(ASSETS_DIR, "valance.png")
    valance.save(valance_path, "PNG")
    valance.save(os.path.join(PUBLIC_DIR, "valance.png"), "PNG")
    print("Valance created:", valance_path)

    # Curtains: Left curtain and Right curtain
    CW, CH = 340, 1100
    curtain = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(curtain)

    # Fabric folds using sine wave brightness
    for x in range(CW):
        # bunching closer to left edge
        t = x / CW
        wave = math.sin(t * 14 * math.pi)
        shade = int(246 + wave * 18)
        shade = max(205, min(255, shade))
        # subtle warm tone
        r = shade
        g = int(shade * 0.96)
        b = int(shade * 0.90)
        # curtain shape tapers near tie-back (y ~ 580)
        cdraw.line([(x, 0), (x, CH)], fill=(r, g, b, 245))

    # Gold tie-back rope with knot and tassel at y=600, x=180
    cdraw.arc([60, 560, 260, 640], 0, 180, fill=(201, 166, 107, 255), width=6)
    cdraw.ellipse([215, 615, 235, 635], fill=(218, 185, 128, 255), outline=(160, 130, 80, 255), width=2)
    # Tassel hanging down
    cdraw.line([(225, 635), (225, 710)], fill=(201, 166, 107, 255), width=6)
    cdraw.line([(220, 640), (218, 705)], fill=(225, 195, 135, 240), width=2)
    cdraw.line([(230, 640), (232, 705)], fill=(160, 130, 80, 240), width=2)

    left_curtain_path = os.path.join(ASSETS_DIR, "curtain-left.png")
    curtain.save(left_curtain_path, "PNG")
    curtain.save(os.path.join(PUBLIC_DIR, "curtain-left.png"), "PNG")

    right_curtain = curtain.transpose(Image.FLIP_LEFT_RIGHT)
    right_curtain_path = os.path.join(ASSETS_DIR, "curtain-right.png")
    right_curtain.save(right_curtain_path, "PNG")
    right_curtain.save(os.path.join(PUBLIC_DIR, "curtain-right.png"), "PNG")
    print("Curtains created:", left_curtain_path, right_curtain_path)

def create_scene_bg():
    # 720 x 1400 picturesque courtyard garden scene
    W, H = 720, 1400
    img = Image.new("RGBA", (W, H), (248, 243, 233, 255)) # Warm cream base
    draw = ImageDraw.Draw(img)

    # Soft ambient sky gradient behind arch
    for y in range(H // 2):
        t = y / (H // 2)
        sky_r = int(238 + t * 10)
        sky_g = int(242 + t * 4)
        sky_b = int(248 - t * 15)
        draw.line([(0, y), (W, y)], fill=(sky_r, sky_g, sky_b, 255))

    # Classical stone archway
    arch_cx = W // 2
    arch_top = 220
    arch_r = 240
    pillar_w = 65

    # Left & right pillars
    draw.rectangle([arch_cx - arch_r - pillar_w, arch_top, arch_cx - arch_r, H - 200], fill=(235, 226, 212, 255), outline=(215, 205, 190, 255), width=2)
    draw.rectangle([arch_cx + arch_r, arch_top, arch_cx + arch_r + pillar_w, H - 200], fill=(235, 226, 212, 255), outline=(215, 205, 190, 255), width=2)

    # Arch curve
    draw.arc([arch_cx - arch_r, arch_top - arch_r, arch_cx + arch_r, arch_top + arch_r], 180, 360, fill=(215, 205, 190, 255), width=pillar_w)

    # Courtyard stone floor tiles in perspective
    horizon_y = H - 460
    for y in range(horizon_y, H):
        t = (y - horizon_y) / (H - horizon_y)
        stone_c = int(230 - t * 15)
        draw.line([(0, y), (W, y)], fill=(stone_c, stone_c - 6, stone_c - 14, 255))

    # Center fountain
    f_cx = W // 2
    f_cy = H - 280
    # Outer basin ellipse
    draw.ellipse([f_cx - 190, f_cy - 45, f_cx + 190, f_cy + 45], fill=(210, 200, 185, 255), outline=(180, 170, 155, 255), width=4)
    # Basin water
    draw.ellipse([f_cx - 175, f_cy - 35, f_cx + 175, f_cy + 35], fill=(168, 198, 202, 230), outline=(138, 175, 180, 255), width=2)
    # Fountain pedestal
    draw.rectangle([f_cx - 24, f_cy - 75, f_cx + 24, f_cy], fill=(225, 218, 205, 255), outline=(190, 180, 168, 255), width=2)
    # Upper fountain tier
    draw.ellipse([f_cx - 70, f_cy - 85, f_cx + 70, f_cy - 65], fill=(215, 206, 192, 255), outline=(185, 175, 162, 255), width=2)
    draw.ellipse([f_cx - 62, f_cy - 82, f_cx + 62, f_cy - 68], fill=(160, 195, 200, 220))

    # Floral bushes and rose urns flanking the fountain
    bush_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(bush_layer)

    # Left & right garden urns
    for urn_x in [f_cx - 210, f_cx + 210]:
        bdraw.rectangle([urn_x - 22, f_cy - 50, urn_x + 22, f_cy - 10], fill=(220, 210, 195, 255), outline=(180, 170, 155, 255), width=2)
        # Urn flowers (blush roses, eucalyptus sage)
        for i in range(25):
            ox = random.randint(-40, 40)
            oy = random.randint(-85, -45)
            # sage green leaves
            bdraw.ellipse([urn_x + ox - 8, f_cy + oy - 8, urn_x + ox + 8, f_cy + oy + 8], fill=(138, 154, 123, 200))
            # blush flowers
            if i % 3 == 0:
                bdraw.ellipse([urn_x + ox - 6, f_cy + oy - 6, urn_x + ox + 6, f_cy + oy + 6], fill=(232, 201, 192, 240))

    img = Image.alpha_composite(img, bush_layer)

    # Soft vignette and blur
    img = img.filter(ImageFilter.GaussianBlur(radius=0.8))

    scene_path = os.path.join(ASSETS_DIR, "scene-bg.jpg")
    img.convert("RGB").save(scene_path, "JPEG", quality=92)
    img.convert("RGB").save(os.path.join(PUBLIC_DIR, "scene-bg.jpg"), "JPEG", quality=92)
    print("Scene BG created:", scene_path)

def create_florals():
    # Floral corners: floral-tl.png, floral-br.png
    W, H = 340, 340
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Corner eucalyptus branches and blush peonies/roses
    for i in range(35):
        # distribute from top-left (0,0) outward
        dist = random.uniform(20, 260)
        angle = random.uniform(0.05, math.pi / 2 - 0.05)
        x = dist * math.cos(angle)
        y = dist * math.sin(angle)
        size = random.uniform(14, 28)

        # Leaf or flower
        if i % 4 == 0:
            # Blush rose / peony
            draw.ellipse([x - size, y - size, x + size, y + size], fill=(232, 201, 192, 230), outline=(218, 175, 168, 200), width=1)
            draw.ellipse([x - size * 0.5, y - size * 0.5, x + size * 0.5, y + size * 0.5], fill=(245, 220, 215, 255))
        elif i % 5 == 0:
            # Gold sprig
            draw.line([(0, 0), (x, y)], fill=(201, 166, 107, 180), width=2)
            draw.ellipse([x - 4, y - 4, x + 4, y + 4], fill=(218, 185, 128, 255))
        else:
            # Eucalyptus sage green leaf
            draw.ellipse([x - size * 0.8, y - size * 0.5, x + size * 0.8, y + size * 0.5], fill=(138, 154, 123, 210), outline=(105, 120, 92, 160), width=1)

    tl_path = os.path.join(ASSETS_DIR, "floral-tl.png")
    img.save(tl_path, "PNG")
    img.save(os.path.join(PUBLIC_DIR, "floral-tl.png"), "PNG")

    # Bottom right is rotated 180
    br_img = img.rotate(180)
    br_path = os.path.join(ASSETS_DIR, "floral-br.png")
    br_img.save(br_path, "PNG")
    br_img.save(os.path.join(PUBLIC_DIR, "floral-br.png"), "PNG")
    print("Florals created:", tl_path, br_path)

def create_glitter():
    # 400 x 400 sparkling gold & sage glitter pattern
    S = 400
    arr = np.zeros((S, S, 4), dtype=np.uint8)
    # Background metallic sage/gold
    base_r, base_g, base_b = 148, 158, 130
    arr[:, :, 0] = base_r
    arr[:, :, 1] = base_g
    arr[:, :, 2] = base_b
    arr[:, :, 3] = 255

    # Random noise flecks of gold, silver, bronze, sage
    for _ in range(35000):
        x = np.random.randint(0, S)
        y = np.random.randint(0, S)
        tone = np.random.choice(["gold", "bright_gold", "sage", "sparkle"])
        if tone == "gold":
            c = (201 + np.random.randint(-15, 20), 166 + np.random.randint(-15, 20), 107 + np.random.randint(-10, 15), 255)
        elif tone == "bright_gold":
            c = (245, 225, 160, 255)
        elif tone == "sparkle":
            c = (255, 255, 240, 255)
        else:
            c = (130 + np.random.randint(-10, 15), 148 + np.random.randint(-10, 15), 115 + np.random.randint(-10, 15), 255)
        arr[y, x] = c

    glitter_img = Image.fromarray(arr, "RGBA")
    # Soft blur to blend particles naturally
    glitter_img = glitter_img.filter(ImageFilter.GaussianBlur(radius=0.4))

    glitter_path = os.path.join(ASSETS_DIR, "glitter.png")
    glitter_img.save(glitter_path, "PNG")
    glitter_img.save(os.path.join(PUBLIC_DIR, "glitter.png"), "PNG")
    print("Glitter created:", glitter_path)

def create_gallery_photos():
    # 6 romantic aesthetic couple photos
    # Rich warm pastel palettes with couple silhouettes and engagement scenes
    palettes = [
        ("Sunset Promise", (245, 220, 200), (200, 140, 120), (63, 74, 53)),
        ("Rose Garden", (246, 238, 223), (138, 154, 123), (180, 120, 110)),
        ("Golden Hour", (255, 240, 210), (220, 175, 110), (100, 80, 50)),
        ("Royal Palace", (240, 235, 225), (120, 135, 110), (70, 75, 65)),
        ("Emerald Lawn", (230, 240, 225), (105, 135, 95), (55, 65, 45)),
        ("Evening Lights", (235, 225, 235), (160, 140, 170), (50, 45, 60))
    ]

    for idx, (title, c_light, c_mid, c_dark) in enumerate(palettes, start=1):
        W, H = 600, 800
        img = Image.new("RGB", (W, H), c_light)
        draw = ImageDraw.Draw(img)

        # Gradient background
        for y in range(H):
            t = y / H
            r = int(c_light[0] * (1 - t) + c_mid[0] * t)
            g = int(c_light[1] * (1 - t) + c_mid[1] * t)
            b = int(c_light[2] * (1 - t) + c_mid[2] * t)
            draw.line([(0, y), (W, y)], fill=(r, g, b))

        # Couple silhouette and engagement ring motif
        cx, cy = W // 2, H // 2
        # Sun / ambient aura
        for rad in range(160, 0, -10):
            alpha = int(30 * (1 - rad / 160))
            draw.ellipse([cx - rad, cy - 80 - rad, cx + rad, cy - 80 + rad], outline=(255, 255, 255), width=3)

        # Romantic silhouettes
        # Groom
        draw.ellipse([cx - 45, cy - 130, cx - 15, cy - 90], fill=c_dark) # head
        draw.polygon([(cx - 60, cy - 85), (cx - 5, cy - 85), (cx - 10, cy + 120), (cx - 70, cy + 120)], fill=c_dark) # torso
        # Bride
        draw.ellipse([cx + 10, cy - 135, cx + 38, cy - 97], fill=c_dark) # head
        draw.polygon([(cx - 2, cy - 90), (cx + 50, cy - 90), (cx + 85, cy + 140), (cx - 15, cy + 140)], fill=c_dark) # gown

        # Delicate gold border around image
        draw.rectangle([16, 16, W - 16, H - 16], outline=(201, 166, 107), width=2)
        draw.rectangle([22, 22, W - 22, H - 22], outline=(246, 238, 223), width=1)

        # Title caption at bottom
        try:
            f = ImageFont.truetype("arial.ttf", 22)
        except:
            f = ImageFont.load_default()
        draw.text((cx, H - 50), f"♥  {title}  ♥", fill=(246, 238, 223), anchor="mm", font=f)

        g_path = os.path.join(ASSETS_DIR, f"gallery-{idx}.jpg")
        img.save(g_path, "JPEG", quality=90)
        img.save(os.path.join(PUBLIC_DIR, f"gallery-{idx}.jpg"), "JPEG", quality=90)

    print("6 Gallery photos created")

def create_og_image():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (246, 238, 223)) # Cream
    draw = ImageDraw.Draw(img)

    # Sage border & gold frame
    draw.rectangle([20, 20, W - 20, H - 20], fill=(246, 238, 223), outline=(138, 154, 123), width=12)
    draw.rectangle([38, 38, W - 38, H - 38], outline=(201, 166, 107), width=3)

    try:
        f_sub = ImageFont.truetype("arial.ttf", 24)
        f_names = ImageFont.truetype("arial.ttf", 64)
        f_date = ImageFont.truetype("arial.ttf", 28)
    except:
        f_sub = ImageFont.load_default()
        f_names = ImageFont.load_default()
        f_date = ImageFont.load_default()

    draw.text((W // 2, 130), "YOU ARE CORDIALLY INVITED TO THE ENGAGEMENT CEREMONY OF", fill=(138, 154, 123), anchor="mm", font=f_sub)
    draw.text((W // 2, 260), "Yamini  &  Srikar", fill=(63, 74, 53), anchor="mm", font=f_names)
    draw.line([(W // 2 - 120, 340), (W // 2 + 120, 340)], fill=(201, 166, 107), width=2)
    draw.text((W // 2, 400), "SAVE THE DATE  •  DECEMBER 03, 2026", fill=(201, 166, 107), anchor="mm", font=f_date)
    draw.text((W // 2, 499), "SSR Convention, Payakapuram, Vijayawada", fill=(63, 74, 53), anchor="mm", font=f_sub)

    og_path = os.path.join(PUBLIC_DIR, "og-image.jpg")
    img.save(og_path, "JPEG", quality=90)
    print("OG image created:", og_path)

if __name__ == "__main__":
    create_doors()
    create_crest()
    create_curtains_and_valance()
    create_scene_bg()
    create_florals()
    create_glitter()
    create_gallery_photos()
    create_og_image()
    print("All assets generated successfully!")
