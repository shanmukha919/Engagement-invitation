import math
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def create_luxury_valance():
    # Supersampling 2x for ultra smooth anti-aliased edges
    scale = 2
    W, H = 1000 * scale, 340 * scale
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Palette
    CREAM_LIGHT = (255, 252, 245, 255)
    CREAM_BASE = (248, 241, 229, 255)
    CREAM_SHADOW = (226, 215, 196, 255)
    CREAM_DEEP = (205, 192, 170, 255)
    
    GOLD_LIGHT = (255, 243, 204, 255)
    GOLD_BASE = (212, 175, 106, 255)
    GOLD_DARK = (158, 122, 60, 255)
    GOLD_DEEP = (112, 84, 38, 255)

    PEARL = (255, 255, 250, 255)
    PEARL_SHADOW = (220, 215, 205, 255)

    # 1. Top Architectural Gold Header Bar / Cornice
    rod_h = int(24 * scale)
    # Rod base with metallic gradient
    for y in range(rod_h):
        ratio = y / rod_h
        if ratio < 0.25:
            r = int(GOLD_LIGHT[0] * (1 - ratio*2) + GOLD_BASE[0] * (ratio*2))
            g = int(GOLD_LIGHT[1] * (1 - ratio*2) + GOLD_BASE[1] * (ratio*2))
            b = int(GOLD_LIGHT[2] * (1 - ratio*2) + GOLD_BASE[2] * (ratio*2))
        elif ratio < 0.65:
            r = int(GOLD_BASE[0] * (1 - ratio) + GOLD_DARK[0] * ratio)
            g = int(GOLD_BASE[1] * (1 - ratio) + GOLD_DARK[1] * ratio)
            b = int(GOLD_BASE[2] * (1 - ratio) + GOLD_DARK[2] * ratio)
        else:
            r = int(GOLD_DARK[0] * (1 - ratio) + GOLD_DEEP[0] * ratio)
            g = int(GOLD_DARK[1] * (1 - ratio) + GOLD_DEEP[1] * ratio)
            b = int(GOLD_DARK[2] * (1 - ratio) + GOLD_DEEP[2] * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255), width=1)

    # Gold filigree embossed beading along bottom of the rod
    bead_r = int(3.5 * scale)
    num_beads = int(W / (bead_r * 2.2))
    for i in range(num_beads):
        bx = int((i + 0.5) * (bead_r * 2.2))
        by = rod_h - bead_r
        draw.ellipse([bx - bead_r, by - bead_r, bx + bead_r, by + bead_r], fill=GOLD_BASE, outline=GOLD_LIGHT)

    # 2. Layered Scalloped Swags (5 graceful curved swags across width)
    num_swags = 4
    swag_w = W / num_swags
    max_drop = int(145 * scale)

    # Draw each swag with multi-layer concentric silk folds
    for s in range(num_swags):
        x_left = s * swag_w
        x_right = x_left + swag_w
        xc = (x_left + x_right) / 2

        num_folds = 7
        for f in range(num_folds, 0, -1):
            fold_frac = f / num_folds
            curr_drop = int(max_drop * (0.35 + 0.65 * fold_frac))

            # Sample smooth catenary/parabolic curve
            steps = 60
            pts = []
            for st in range(steps + 1):
                t = st / steps
                x = x_left + t * swag_w
                # Parabolic smooth hanging curve with slight catenary flatness
                dx = (x - xc) / (swag_w / 2)
                curve_factor = (1 - dx * dx)
                y = rod_h + curr_drop * curve_factor
                pts.append((x, y))

            # Connect back to rod
            polygon_pts = pts + [(x_right, rod_h), (x_left, rod_h)]

            # Silk fold color: highlights on crest, shadows near folds
            shade_factor = 0.85 + 0.25 * (f / num_folds)
            r = int(min(255, CREAM_BASE[0] * shade_factor - (num_folds - f) * 5))
            g = int(min(255, CREAM_BASE[1] * shade_factor - (num_folds - f) * 6))
            b = int(min(255, CREAM_BASE[2] * shade_factor - (num_folds - f) * 8))

            fold_outline = (
                int(CREAM_DEEP[0] * 0.9),
                int(CREAM_DEEP[1] * 0.9),
                int(CREAM_DEEP[2] * 0.9),
                220
            )

            draw.polygon(polygon_pts, fill=(r, g, b, 255), outline=fold_outline)

            # Delicate gold stitch line along the lowest fold
            if f == num_folds:
                for k in range(len(pts) - 1):
                    draw.line([pts[k], pts[k + 1]], fill=GOLD_BASE, width=int(3 * scale))
                    draw.line([(pts[k][0], pts[k][1] - 2 * scale), (pts[k+1][0], pts[k+1][1] - 2 * scale)], fill=GOLD_LIGHT, width=int(1.2 * scale))

    # 3. Side Cascade Drapes (Jabots) on left and right borders
    jabot_w = int(swag_w * 0.65)
    jabot_h = int(220 * scale)
    
    # Left Jabot
    left_jabot_pts = [
        (0, rod_h),
        (jabot_w, rod_h),
        (jabot_w * 0.25, jabot_h),
        (0, jabot_h * 0.85)
    ]
    draw.polygon(left_jabot_pts, fill=CREAM_BASE, outline=CREAM_DEEP)
    # Left jabot pleat lines
    for p in range(1, 5):
        px = jabot_w * (1 - p / 5)
        draw.line([(px, rod_h), (px * 0.3, jabot_h * (0.85 + 0.15 * (1 - p/5)))], fill=CREAM_SHADOW, width=int(2 * scale))
        draw.line([(0, rod_h), (px, rod_h)], fill=GOLD_DARK, width=1)
    # Gold trim on left jabot diagonal edge
    draw.line([(jabot_w, rod_h), (jabot_w * 0.25, jabot_h)], fill=GOLD_BASE, width=int(3 * scale))
    draw.line([(jabot_w * 0.25, jabot_h), (0, jabot_h * 0.85)], fill=GOLD_BASE, width=int(3 * scale))

    # Right Jabot (mirror)
    right_jabot_pts = [
        (W, rod_h),
        (W - jabot_w, rod_h),
        (W - jabot_w * 0.25, jabot_h),
        (W, jabot_h * 0.85)
    ]
    draw.polygon(right_jabot_pts, fill=CREAM_BASE, outline=CREAM_DEEP)
    # Right jabot pleats
    for p in range(1, 5):
        px = W - jabot_w * (1 - p / 5)
        draw.line([(px, rod_h), (W - (W - px) * 0.3, jabot_h * (0.85 + 0.15 * (1 - p/5)))], fill=CREAM_SHADOW, width=int(2 * scale))
    draw.line([(W - jabot_w, rod_h), (W - jabot_w * 0.25, jabot_h)], fill=GOLD_BASE, width=int(3 * scale))
    draw.line([(W - jabot_w * 0.25, jabot_h), (W, jabot_h * 0.85)], fill=GOLD_BASE, width=int(3 * scale))

    # 4. Royal Hanging Jhumka / Tassels & Pearl Droplets
    def draw_jhumka_tassel(cx, cy, length_scale=1.0):
        # 1. Suspended Gold Chain with Tiny Pearl Beads
        chain_len = int(28 * scale * length_scale)
        num_links = 5
        for l in range(num_links):
            py = cy + int(l * (chain_len / num_links))
            draw.ellipse([cx - 2*scale, py - 2*scale, cx + 2*scale, py + 2*scale], fill=PEARL, outline=GOLD_BASE)

        j_top_y = cy + chain_len

        # 2. Ornate Golden Cap / Dome (Jhumka Bell)
        dome_w = int(11 * scale)
        dome_h = int(9 * scale)
        # Bell dome
        draw.chord([cx - dome_w, j_top_y, cx + dome_w, j_top_y + dome_h * 2], 180, 360, fill=GOLD_BASE, outline=GOLD_DARK)
        # Highlight on dome
        draw.arc([cx - dome_w + 2*scale, j_top_y + 2*scale, cx + dome_w - 2*scale, j_top_y + dome_h * 2 - 2*scale], 190, 350, fill=GOLD_LIGHT, width=int(1.5*scale))
        # Beaded rim along bottom of bell
        rim_y = j_top_y + dome_h
        draw.line([(cx - dome_w, rim_y), (cx + dome_w, rim_y)], fill=GOLD_DEEP, width=int(2 * scale))
        for rx in range(int(cx - dome_w), int(cx + dome_w) + 1, int(3.5 * scale)):
            draw.ellipse([rx - 1.5*scale, rim_y - 1.5*scale, rx + 1.5*scale, rim_y + 1.5*scale], fill=PEARL)

        # 3. Hanging Silk Fringe / Gold Threads below Bell
        fringe_len = int(26 * scale * length_scale)
        num_threads = 7
        for t in range(num_threads):
            tx = cx + (t - num_threads // 2) * (dome_w / (num_threads // 2 + 1)) * 0.75
            col = GOLD_LIGHT if t % 2 == 0 else GOLD_BASE
            draw.line([(tx, rim_y + 1), (tx, rim_y + fringe_len)], fill=col, width=int(1.8 * scale))
        
        # 4. Central Teardrop Pearl / Gold Bead at bottom
        drop_y = rim_y + fringe_len + int(6 * scale)
        draw.ellipse([cx - 3.5*scale, drop_y - 5*scale, cx + 3.5*scale, drop_y + 5*scale], fill=PEARL, outline=GOLD_BASE)
        draw.ellipse([cx - 1.5*scale, drop_y - 3*scale, cx + 0.5*scale, drop_y - scale], fill=(255, 255, 255, 255))

    # Place major tassels at swag intersection joints (peaks)
    for s in range(num_swags + 1):
        jx = s * swag_w
        if s == 0:
            jx = jabot_w * 0.95
        elif s == num_swags:
            jx = W - jabot_w * 0.95
        draw_jhumka_tassel(jx, rod_h, length_scale=1.2)

    # Place delicate hanging pearls along the bottom curve of each swag
    for s in range(num_swags):
        x_left = s * swag_w
        x_right = x_left + swag_w
        xc = (x_left + x_right) / 2

        # 3 smaller droplets along each swag
        for frac in [0.25, 0.5, 0.75]:
            tx = x_left + frac * swag_w
            dx = (tx - xc) / (swag_w / 2)
            curve_factor = (1 - dx * dx)
            ty = rod_h + max_drop * curve_factor
            draw_jhumka_tassel(tx, ty - 2 * scale, length_scale=0.75 if frac != 0.5 else 0.9)

    # 5. Auspicious Floral Toran Garland across the Top Bar
    # Beautiful blush peony roses, white jasmine buds & sage leaves
    def draw_jasmine_bud(bx, by):
        draw.ellipse([bx - 3*scale, by - 5*scale, bx + 3*scale, by + 5*scale], fill=(255, 255, 245, 255), outline=(210, 205, 185, 200))
        draw.line([(bx, by + 4*scale), (bx, by + 8*scale)], fill=(120, 140, 95, 255), width=int(1.5 * scale))

    def draw_rose(rx, ry, radius=12):
        r_px = int(radius * scale)
        # Petal layers
        for p_idx in range(5, 0, -1):
            cur_r = int(r_px * (p_idx / 5))
            col = (
                238 - (5 - p_idx) * 8,
                201 - (5 - p_idx) * 12,
                192 - (5 - p_idx) * 12,
                255
            )
            draw.ellipse([rx - cur_r, ry - cur_r, rx + cur_r, ry + cur_r], fill=col, outline=(210, 170, 160, 180))
        # Center golden pistil
        draw.ellipse([rx - 2*scale, ry - 2*scale, rx + 2*scale, ry + 2*scale], fill=GOLD_BASE)

    def draw_leaf(lx, ly, angle_deg, length=18, is_gold=False):
        l_px = int(length * scale)
        rad = math.radians(angle_deg)
        cos_a = math.cos(rad)
        sin_a = math.sin(rad)
        
        col = (138, 154, 123, 240) if not is_gold else GOLD_BASE
        outline_col = (100, 120, 85, 240) if not is_gold else GOLD_DARK

        tip_x = lx + l_px * cos_a
        tip_y = ly + l_px * sin_a

        side1_x = lx + (l_px * 0.5) * cos_a - (l_px * 0.3) * sin_a
        side1_y = ly + (l_px * 0.5) * sin_a + (l_px * 0.3) * cos_a

        side2_x = lx + (l_px * 0.5) * cos_a + (l_px * 0.3) * sin_a
        side2_y = ly + (l_px * 0.5) * sin_a - (l_px * 0.3) * cos_a

        draw.polygon([(lx, ly), (side1_x, side1_y), (tip_x, tip_y), (side2_x, side2_y)], fill=col, outline=outline_col)

    # Entwine floral garland along the rod
    num_clusters = 11
    cluster_spacing = W / (num_clusters - 1)
    for c in range(num_clusters):
        cx = int(c * cluster_spacing)
        cy = rod_h - int(2 * scale)

        # Leaves spreading out
        draw_leaf(cx - 8*scale, cy, -45, length=16, is_gold=False)
        draw_leaf(cx + 8*scale, cy, -135, length=16, is_gold=False)
        draw_leaf(cx, cy - 2*scale, -90, length=14, is_gold=True)

        # Jasmine buds around
        draw_jasmine_bud(cx - 14*scale, cy + 3*scale)
        draw_jasmine_bud(cx + 14*scale, cy + 3*scale)

        # Rose in cluster
        r_size = 14 if c % 2 == 0 else 10
        draw_rose(cx, cy, radius=r_size)

    # Downscale smoothly to 1000 x 340 with LANCZOS for silky anti-aliasing
    final_img = img.resize((1000, 340), Image.Resampling.LANCZOS)

    # Add very subtle luxury soft drop shadow underneath
    # Create shadow canvas
    shadow = Image.new("RGBA", (1000, 340), (0, 0, 0, 0))
    # Extract alpha mask
    alpha = final_img.split()[3]
    shadow_mask = alpha.filter(ImageFilter.GaussianBlur(radius=6))
    # Paste black with shadow_mask
    shadow.paste((30, 25, 15, 80), (0, 4), shadow_mask)

    # Composite shadow under valance
    result = Image.alpha_composite(shadow, final_img)

    # Save to src/assets/valance.png and public/valance.png
    assets_path = os.path.join("src", "assets", "valance.png")
    public_path = os.path.join("public", "valance.png")
    
    result.save(assets_path, "PNG")
    result.save(public_path, "PNG")
    print(f"Luxury valance created successfully at {assets_path} and {public_path}!")

if __name__ == "__main__":
    create_luxury_valance()
