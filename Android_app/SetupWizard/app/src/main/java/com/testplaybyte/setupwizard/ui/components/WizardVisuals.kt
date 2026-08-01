package com.testplaybyte.setupwizard.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.geometry.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp
import com.testplaybyte.setupwizard.ui.theme.WizardPalette
import kotlin.math.*

// ============================================================================
// SHARED HELPERS
// ============================================================================

private fun DrawScope.radialGlow(cx: Float, cy: Float, radius: Float, color: Color, alpha: Float = 0.25f) {
    drawCircle(
        brush = Brush.radialGradient(
            colors = listOf(color.copy(alpha = alpha), color.copy(alpha = 0f)),
            center = Offset(cx, cy),
            radius = radius,
        ),
        center = Offset(cx, cy),
        radius = radius,
    )
}

private fun DrawScope.rr(color: Color, x: Float, y: Float, w: Float, h: Float, cr: Float, stroke: Float = 0f) {
    val path = Path().apply {
        addRoundRect(RoundRect(Rect(x, y, x + w, y + h), CornerRadius(cr, cr)))
    }
    if (stroke > 0f) drawPath(path, color, style = Stroke(stroke))
    else drawPath(path, color)
}

private fun DrawScope.rrGradient(brush: Brush, x: Float, y: Float, w: Float, h: Float, cr: Float) {
    val path = Path().apply {
        addRoundRect(RoundRect(Rect(x, y, x + w, y + h), CornerRadius(cr, cr)))
    }
    drawPath(path, brush)
}

// ============================================================================
// WELCOME — kept for future use (currently removed from welcome screen)
// Glowing app logo with orbiting accent dots + gentle pulse
// ============================================================================

@Composable
fun WelcomeVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val pulse = rememberInfiniteTransition(label = "wv-pulse")
    val scale by pulse.animateFloat(0.96f, 1.04f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "wv-s")
    val orbit = rememberInfiniteTransition(label = "wv-orbit")
    val angle by orbit.animateFloat(0f, 360f, infiniteRepeatable(tween(8000, easing = LinearEasing)), "wv-a")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f

        // Outer glow — breathes
        radialGlow(cx, cy, 70f * u, palette.primary, 0.18f + 0.10f * (scale - 0.96f) / 0.08f)

        // 3 orbiting accent dots
        for (i in 0 until 3) {
            val a = (angle + i * 120f) * PI.toFloat() / 180f
            val orbR = 80f * u
            val dx = cx + orbR * cos(a)
            val dy = cy + orbR * sin(a)
            drawCircle(palette.primary.copy(alpha = 0.7f), 3.5f * u, Offset(dx, dy))
        }

        // Main rounded-square logo
        val sz = 84f * u * scale
        rrGradient(
            Brush.linearGradient(listOf(palette.primary, palette.primary.copy(alpha = 0.85f)), start = Offset(cx - sz/2, cy - sz/2), end = Offset(cx + sz/2, cy + sz/2)),
            cx - sz/2, cy - sz/2, sz, sz, 22f * u,
        )

        // Play triangle
        val p = Path().apply {
            moveTo(cx - 10f*u*scale, cy - 20f*u*scale)
            lineTo(cx - 10f*u*scale, cy + 20f*u*scale)
            lineTo(cx + 22f*u*scale, cy)
            close()
        }
        drawPath(p, palette.onPrimary)
    }
}

// ============================================================================
// FOLDER — highly detailed open folder with floating file cards
// ============================================================================

@Composable
fun FolderVisual(palette: WizardPalette, selected: Boolean = false, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "fv")
    val bob by t.animateFloat(-3f, 3f, infiniteRepeatable(tween(4000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fvb")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f

        // Soft glow
        radialGlow(cx, 120f * u, 70f * u, palette.primary, 0.16f)

        // --- 3 floating file cards (staggered) ---
        for (i in 0 until 3) {
            val fx = (54f + i * 38f) * u
            val fy = (48f + bob * (0.5f + i * 0.2f) + i * 3f) * u
            val fw = 30f * u
            val fh = 38f * u
            // Card body with gradient
            rrGradient(
                Brush.verticalGradient(listOf(palette.surface5, palette.surface4), start = Offset(fx, fy), end = Offset(fx, fy + fh)),
                fx, fy, fw, fh, 4f * u,
            )
            // Colored top strip
            rr(palette.primary.copy(alpha = 0.55f - i * 0.08f), fx, fy, fw, 9f * u, 4f * u)
            // Content lines
            for (j in 0 until 2) {
                drawRect(palette.primary.copy(alpha = 0.25f), Offset(fx + 5f * u, fy + 14f * u + j * 7f * u), Size(fw - 10f * u, 2f * u))
            }
        }

        // --- Folder back panel (tab) ---
        val backPath = Path().apply {
            moveTo(36f * u, 88f * u + bob * u)
            lineTo(80f * u, 88f * u + bob * u)
            lineTo(88f * u, 80f * u + bob * u)
            lineTo(164f * u, 80f * u + bob * u)
            lineTo(164f * u, 116f * u + bob * u)
            lineTo(36f * u, 116f * u + bob * u)
            close()
        }
        drawPath(backPath, palette.surface4)

        // --- Folder front pocket (gradient body) ---
        rrGradient(
            Brush.verticalGradient(listOf(palette.surface3, palette.surface5), start = Offset(32f * u, 110f * u), end = Offset(32f * u, 174f * u)),
            32f * u, 110f * u + bob * u, 136f * u, 64f * u, 10f * u,
        )
        // Primary border
        rr(palette.primary.copy(alpha = 0.25f), 32f * u, 110f * u + bob * u, 136f * u, 64f * u, 10f * u, 1.5f * u)

        // Inner content lines
        for (i in 0 until 3) {
            rr(palette.primary.copy(alpha = 0.30f - i * 0.06f), 50f * u, (124f + i * 12f + bob) * u, 100f * u, 4f * u, 2f * u)
        }

        // --- Selected check badge ---
        if (selected) {
            val bx = 156f * u
            val by = 100f * u + bob * u
            // Glow
            radialGlow(bx, by, 28f * u, palette.primary, 0.3f)
            // Badge circle
            drawCircle(palette.primary, 20f * u, Offset(bx, by))
            // Check mark
            val cp = Path().apply {
                moveTo(bx - 8f * u, by)
                lineTo(bx - 2f * u, by + 6f * u)
                lineTo(bx + 8f * u, by - 6f * u)
            }
            drawPath(cp, palette.background, style = Stroke(3.5f * u, cap = StrokeCap.Round, join = StrokeJoin.Round))
        }
    }
}

// ============================================================================
// SHIELD — premium shield with drawing checkmark + ripple
// ============================================================================

@Composable
fun ShieldVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val rippleT = rememberInfiniteTransition(label = "sv-ripple")
    val ripple by rippleT.animateFloat(0f, 1f, infiniteRepeatable(tween(2800, easing = LinearEasing)), "sv-r")
    val drawT = rememberInfiniteTransition(label = "sv-draw")
    val draw by drawT.animateFloat(0f, 1f, infiniteRepeatable(tween(1400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "sv-d")
    val floatT = rememberInfiniteTransition(label = "sv-float")
    val float by floatT.animateFloat(0f, -4f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "sv-f")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = (100f + float) * u

        // Expanding ripple rings
        for (i in 0 until 2) {
            val phase = (ripple + i * 0.5f) % 1f
            val r = (40f + 30f * phase) * u
            drawCircle(palette.primary.copy(alpha = (1f - phase) * 0.20f), r, Offset(cx, cy), style = Stroke(2f * u))
        }

        // Glow
        radialGlow(cx, cy, 60f * u, palette.primary, 0.15f)

        // Shield body with gradient
        val w = 76f * u
        val h = 92f * u
        val shieldPath = Path().apply {
            moveTo(cx, cy - h / 2)
            lineTo(cx + w / 2, cy - h / 2 + w * 0.35f)
            lineTo(cx + w / 2, cy + h * 0.10f)
            quadraticTo(cx + w / 2, cy + h * 0.42f, cx, cy + h / 2)
            quadraticTo(cx - w / 2, cy + h * 0.42f, cx - w / 2, cy + h * 0.10f)
            lineTo(cx - w / 2, cy - h / 2 + w * 0.35f)
            close()
        }
        drawPath(shieldPath, Brush.verticalGradient(listOf(palette.primary, palette.primary.copy(alpha = 0.8f)), start = Offset(cx, cy - h/2), end = Offset(cx, cy + h/2)))

        // Drawing check mark (animated)
        val p1 = Offset(cx - w * 0.14f, cy)
        val p2 = Offset(cx - w * 0.02f, cy + h * 0.12f)
        val p3 = Offset(cx + w * 0.20f, cy - h * 0.12f)
        val checkPaint = Stroke(width = 5f * u, cap = StrokeCap.Round, join = StrokeJoin.Round)
        if (draw <= 0.5f) {
            val k = draw * 2f
            val end = Offset(p1.x + (p2.x - p1.x) * k, p1.y + (p2.y - p1.y) * k)
            drawLine(palette.onPrimary, p1, end, checkPaint.width, checkPaint.cap)
        } else {
            drawLine(palette.onPrimary, p1, p2, checkPaint.width, checkPaint.cap)
            val k = (draw - 0.5f) * 2f
            val end = Offset(p2.x + (p3.x - p2.x) * k, p2.y + (p3.y - p2.y) * k)
            drawLine(palette.onPrimary, p2, end, checkPaint.width, checkPaint.cap)
        }
    }
}

// ============================================================================
// RESTORE — sleek file card with circular restore arrow + float
// ============================================================================

@Composable
fun RestoreVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val spinT = rememberInfiniteTransition(label = "rv-spin")
    val spin by spinT.animateFloat(0f, 360f, infiniteRepeatable(tween(3000, easing = LinearEasing)), "rv-s")
    val floatT = rememberInfiniteTransition(label = "rv-float")
    val float by floatT.animateFloat(0f, -4f, infiniteRepeatable(tween(3500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "rv-f")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = (100f + float) * u

        // Glow
        radialGlow(cx, cy, 70f * u, palette.primary, 0.16f)

        // File card with gradient
        val fw = 76f * u
        val fh = 96f * u
        rrGradient(
            Brush.verticalGradient(listOf(palette.surface2, palette.surface4), start = Offset(cx - fw/2, cy - fh/2), end = Offset(cx - fw/2, cy + fh/2)),
            cx - fw/2, cy - fh/2, fw, fh, fw * 0.14f,
        )
        // File fold corner
        val fold = Path().apply {
            moveTo(cx + fw/2 - fw * 0.24f, cy - fh/2)
            lineTo(cx + fw/2, cy - fh/2 + fw * 0.24f)
            lineTo(cx + fw/2 - fw * 0.24f, cy - fh/2 + fw * 0.24f)
            close()
        }
        drawPath(fold, palette.primary.copy(alpha = 0.45f))

        // Content lines on card
        for (i in 0 until 3) {
            rr(palette.primary.copy(alpha = 0.3f + i * 0.05f), cx - fw * 0.30f, cy - fh * 0.08f + i * fh * 0.16f, fw * 0.60f, fh * 0.035f, 2f * u)
        }

        // Rotating circular arrow around the file
        val ringR = 72f * u
        val startAngle = -90f + spin
        val sweep = 85f
        drawArc(
            color = palette.primary,
            startAngle = startAngle,
            sweepAngle = sweep,
            useCenter = false,
            topLeft = Offset(cx - ringR, cy - ringR),
            size = Size(ringR * 2, ringR * 2),
            style = Stroke(4f * u, cap = StrokeCap.Round),
        )
        // Arrowhead at end of arc
        val endAngle = (startAngle + sweep) * PI.toFloat() / 180f
        val tipX = cx + ringR * cos(endAngle)
        val tipY = cy + ringR * sin(endAngle)
        drawCircle(palette.primary, 5f * u, Offset(tipX, tipY))
    }
}

// ============================================================================
// WARNING — file with pulsing warning triangle + sparkles
// ============================================================================

@Composable
fun WarningVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val bobT = rememberInfiniteTransition(label = "wv-bob")
    val bob by bobT.animateFloat(-4f, 4f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "wv-b")
    val pulseT = rememberInfiniteTransition(label = "wv-pulse")
    val pulse by pulseT.animateFloat(0.9f, 1.1f, infiniteRepeatable(tween(1600, easing = FastOutSlowInEasing), RepeatMode.Reverse), "wv-p")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = (100f + bob) * u
        val warn = Color(0xFFFFCC80)

        // Glow
        radialGlow(cx, cy, 70f * u, warn, 0.18f + 0.08f * (pulse - 0.9f) / 0.2f)

        // File body
        val fw = 68f * u
        val fh = 86f * u
        rr(palette.surface3, cx - fw/2, cy - fh/2, fw, fh, fw * 0.14f)
        rr(warn, cx - fw/2, cy - fh/2, fw, fh, fw * 0.14f, 2f * u)
        // File fold corner
        val fold = Path().apply {
            moveTo(cx + fw/2 - fw * 0.24f, cy - fh/2)
            lineTo(cx + fw/2, cy - fh/2 + fw * 0.24f)
            lineTo(cx + fw/2 - fw * 0.24f, cy - fh/2 + fw * 0.24f)
            close()
        }
        drawPath(fold, warn.copy(alpha = 0.5f))
        // Content lines
        for (i in 0 until 4) {
            rr(warn.copy(alpha = 0.35f - i * 0.04f), cx - fw * 0.28f, cy - fh * 0.18f + i * fh * 0.12f, fw * (0.50f - i * 0.06f), fh * 0.035f, 2f * u)
        }

        // Warning triangle (pulsing)
        val triCx = cx + fw * 0.42f
        val triCy = cy + fh * 0.32f
        val triSize = 20f * u * pulse
        val triPath = Path().apply {
            moveTo(triCx, triCy - triSize * 0.5f)
            lineTo(triCx + triSize * 0.46f, triCy + triSize * 0.35f)
            lineTo(triCx - triSize * 0.46f, triCy + triSize * 0.35f)
            close()
        }
        drawPath(triPath, warn)
        // Exclamation mark
        drawRoundRect(palette.background, Offset(triCx - triSize * 0.06f, triCy - triSize * 0.10f), Size(triSize * 0.12f, triSize * 0.20f), CornerRadius(triSize * 0.06f, triSize * 0.06f))
        drawCircle(palette.background, triSize * 0.07f, Offset(triCx, triCy + triSize * 0.16f))

        // Sparkles
        val sparkA = 0.3f + 0.6f * (pulse - 0.9f) / 0.2f
        drawCircle(warn.copy(alpha = sparkA), 2.5f * u, Offset(cx - 55f * u, cy - 40f * u))
        drawCircle(warn.copy(alpha = sparkA * 0.8f), 2f * u, Offset(cx + 58f * u, cy - 20f * u))
        drawCircle(warn.copy(alpha = sparkA * 0.6f), 2.2f * u, Offset(cx - 48f * u, cy + 42f * u))
    }
}

// ============================================================================
// PROCESSING — rotating rings + file with parsed rows + flowing particle
// ============================================================================

@Composable
fun ProcessingVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val spinT = rememberInfiniteTransition(label = "pv-spin")
    val spin by spinT.animateFloat(0f, 360f, infiniteRepeatable(tween(4000, easing = LinearEasing)), "pv-s")
    val rowsT = rememberInfiniteTransition(label = "pv-rows")
    val rows by rowsT.animateFloat(0f, 1f, infiniteRepeatable(tween(2400, easing = LinearEasing)), "pv-r")
    val glowT = rememberInfiniteTransition(label = "pv-glow")
    val glowA by glowT.animateFloat(0.16f, 0.28f, infiniteRepeatable(tween(2000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "pv-g")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f

        // Glow
        radialGlow(cx, cy, 70f * u, palette.primary, glowA)

        // Rotating dashed rings (outer + inner, opposite directions)
        drawArc(palette.primary.copy(alpha = 0.5f), spin, 120f, false, Offset(cx - 76f * u, cy - 76f * u), Size(152f * u, 152f * u), Stroke(2f * u, cap = StrokeCap.Round))
        drawArc(palette.primary.copy(alpha = 0.35f), -spin, 90f, false, Offset(cx - 62f * u, cy - 62f * u), Size(124f * u, 124f * u), Stroke(1.5f * u, cap = StrokeCap.Round))

        // Central file card
        val fw = 56f * u
        val fh = 48f * u
        rr(palette.surface3, cx - fw/2, cy - fh/2, fw, fh, fw * 0.16f)
        rr(palette.primary, cx - fw/2, cy - fh/2, fw, fh, fw * 0.16f, 1.5f * u)

        // 4 rows being parsed (staggered reveal)
        val rowCount = 4
        for (i in 0 until rowCount) {
            val phase = (rows * rowCount - i) % rowCount
            val reveal = phase.coerceIn(0f, 1f)
            if (reveal <= 0f) continue
            val y = cy - fh * 0.30f + i * fh * 0.20f
            val fullW = fw * (0.72f - i * 0.08f)
            val filledW = fullW * reveal
            rr(palette.primary.copy(alpha = 0.15f), cx - fw * 0.36f, y, fullW, fh * 0.06f, 2f * u)
            if (filledW > 0f) {
                rr(palette.primary.copy(alpha = 0.85f), cx - fw * 0.36f, y, filledW, fh * 0.06f, 2f * u)
            }
        }

        // Parsing particle flowing through
        val particleT = (spin / 360f * 2f) % 1f
        val px = cx - fw * 0.40f + fw * 0.80f * particleT
        drawCircle(palette.primary, 3f * u, Offset(px, cy))
    }
}

// ============================================================================
// CLIPBOARD — manifest that fills in with check marks
// ============================================================================

@Composable
fun ClipboardVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "cv")
    val float by t.animateFloat(0f, -4f, infiniteRepeatable(tween(3600, easing = FastOutSlowInEasing), RepeatMode.Reverse), "cv-f")
    val fill by t.animateFloat(0f, 1f, infiniteRepeatable(tween(3000, easing = LinearEasing)), "cv-fill")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = (100f + float) * u

        // Glow
        radialGlow(cx, cy, 60f * u, palette.primary, 0.16f)

        // Clipboard body with gradient
        val cw = 80f * u
        val ch = 100f * u
        rrGradient(
            Brush.verticalGradient(listOf(palette.surface3, palette.surface5), start = Offset(cx - cw/2, cy - ch/2), end = Offset(cx, cy + ch/2)),
            cx - cw/2, cy - ch/2, cw, ch, 10f * u,
        )
        rr(palette.primary.copy(alpha = 0.4f), cx - cw/2, cy - ch/2, cw, ch, 10f * u, 1.5f * u)

        // Clipboard clip (top)
        rr(palette.primary, cx - 16f * u, cy - ch/2 - 6f * u, 32f * u, 12f * u, 4f * u)

        // 4 manifest lines with check marks appearing in sequence
        for (i in 0 until 4) {
            val lineY = cy - ch * 0.22f + i * ch * 0.16f
            val linePhase = (fill * 4f - i * 0.8f).coerceIn(0f, 1f)
            // Line bar (background)
            rr(palette.primary.copy(alpha = 0.2f), cx - cw * 0.28f, lineY, cw * 0.40f, ch * 0.04f, 2f * u)
            // Filled portion
            if (linePhase > 0f) {
                rr(palette.primary.copy(alpha = 0.6f), cx - cw * 0.28f, lineY, cw * 0.40f * linePhase, ch * 0.04f, 2f * u)
            }
            // Check mark appearing after line fills
            if (linePhase >= 1f) {
                val checkCx = cx + cw * 0.24f
                val checkCy = lineY + ch * 0.02f
                drawCircle(palette.primary, 5f * u, Offset(checkCx, checkCy))
                val cp = Path().apply {
                    moveTo(checkCx - 2f * u, checkCy)
                    lineTo(checkCx - 0.5f * u, checkCy + 1.5f * u)
                    lineTo(checkCx + 2.5f * u, checkCy - 1.5f * u)
                }
                drawPath(cp, palette.surface3, style = Stroke(1.5f * u, cap = StrokeCap.Round, join = StrokeJoin.Round))
            }
        }
    }
}

// ============================================================================
// RESTORE PROCESSING — circular progress ring with flowing particles
// ============================================================================

@Composable
fun RestoreProcessingVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val progT = rememberInfiniteTransition(label = "rpv-prog")
    val progress by progT.animateFloat(0f, 1f, infiniteRepeatable(tween(2000, easing = LinearEasing)), "rpv-p")
    val partT = rememberInfiniteTransition(label = "rpv-part")
    val particles by partT.animateFloat(0f, 1f, infiniteRepeatable(tween(1600, easing = LinearEasing)), "rpv-pt")
    val glowT = rememberInfiniteTransition(label = "rpv-glow")
    val glowA by glowT.animateFloat(0.18f, 0.30f, infiniteRepeatable(tween(2000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "rpv-g")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f
        val r = 68f * u

        // Glow
        radialGlow(cx, cy, r * 1.3f, palette.primary, glowA)

        // Track
        drawCircle(palette.surface3, r, Offset(cx, cy), style = Stroke(10f * u))
        // Progress arc
        drawArc(
            palette.primary, -90f, progress * 360f, false,
            Offset(cx - r, cy - r), Size(r * 2, r * 2),
            Stroke(10f * u, cap = StrokeCap.Round),
        )

        // 6 flowing particles orbiting just inside the ring
        for (i in 0 until 6) {
            val angle = (particles + i / 6f) * 360f * PI.toFloat() / 180f
            val pr = r * 0.78f
            val px = cx + pr * cos(angle)
            val py = cy + pr * sin(angle)
            val alpha = 0.3f + 0.5f * ((cos(angle - PI.toFloat()) + 1f) / 2f)
            drawCircle(palette.primary.copy(alpha = alpha), 3f * u, Offset(px, py))
        }
    }
}

// ============================================================================
// DATABASE / RESTORE SUCCESS — library cylinder with data flowing in + big check
// ============================================================================

@Composable
fun DatabaseVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val floatT = rememberInfiniteTransition(label = "dbv-float")
    val float by floatT.animateFloat(0f, -5f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "dbv-f")
    val checkT = rememberInfiniteTransition(label = "dbv-check")
    val checkA by checkT.animateFloat(0f, 1f, infiniteRepeatable(tween(2000, delayMillis = 1400, easing = FastOutSlowInEasing), RepeatMode.Restart), "dbv-c")
    val glowT = rememberInfiniteTransition(label = "dbv-glow")
    val glowA by glowT.animateFloat(0.20f, 0.32f, infiniteRepeatable(tween(2800, easing = FastOutSlowInEasing), RepeatMode.Reverse), "dbv-g")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val fy = (100f + float) * u

        // Glow
        radialGlow(cx, fy, 72f * u, palette.primary, glowA)

        // Database cylinder top (ellipse)
        val ew = 88f * u
        val eh = 24f * u
        drawOval(Brush.verticalGradient(listOf(palette.primaryContainer, palette.primary.copy(alpha = 0.3f))), Offset(cx - ew/2, (44f + float) * u), Size(ew, eh))
        drawOval(palette.primary, Offset(cx - ew/2, (44f + float) * u), Size(ew, eh), style = Stroke(2.5f * u))

        // Body
        drawRect(palette.primaryContainer, Offset(cx - ew/2, (56f + float) * u), Size(ew, 76f * u))
        drawLine(palette.primary, Offset(cx - ew/2, (56f + float) * u), Offset(cx - ew/2, (132f + float) * u), 2.5f * u)
        drawLine(palette.primary, Offset(cx + ew/2, (56f + float) * u), Offset(cx + ew/2, (132f + float) * u), 2.5f * u)
        // Bottom curve
        drawArc(palette.primary, 0f, 180f, false, Offset(cx - ew/2, (108f + float) * u), Size(ew, 48f * u), Stroke(2.5f * u))

        // Rings (database layers)
        drawOval(palette.primary.copy(alpha = 0.5f), Offset(cx - ew/2, (66f + float) * u), Size(ew, eh), style = Stroke(1.5f * u))
        drawOval(palette.primary.copy(alpha = 0.4f), Offset(cx - ew/2, (88f + float) * u), Size(ew, eh), style = Stroke(1.5f * u))

        // Flowing particles
        for (i in 0 until 5) {
            val px = (cx - 40f * u + i * 20f * u)
            val alpha = if (i % 2 == 0) 1f else 0.5f
            drawCircle(palette.primary.copy(alpha = alpha), 3f * u, Offset(px, 100f * u))
        }

        // Big success check badge (animated draw)
        val bx = cx + 42f * u
        val by = (58f + float) * u
        radialGlow(bx, by, 30f * u, palette.primary, 0.3f)
        drawCircle(palette.primary, 22f * u, Offset(bx, by))
        if (checkA > 0f) {
            val cp = Path().apply {
                moveTo(bx - 10f * u, by)
                lineTo(bx - 3f * u, by + 7f * u)
                lineTo(bx + 11f * u, by - 7f * u)
            }
            drawPath(cp, palette.onPrimary, style = Stroke(4f * u, cap = StrokeCap.Round, join = StrokeJoin.Round))
        }
    }
}

// ============================================================================
// POISON BOTTLE — proper bottle shape: thin neck, rounded body, liquid, skull
// ============================================================================

@Composable
fun PoisonBottleVisual(palette: WizardPalette, idx: Int = 0, modifier: Modifier = Modifier) {
    val floatT = rememberInfiniteTransition(label = "pbv-float-$idx")
    val float by floatT.animateFloat(-3f, 3f, infiniteRepeatable(tween(3000 + idx * 500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "pbv-f-$idx")
    val spinT = rememberInfiniteTransition(label = "pbv-spin-$idx")
    val spin by spinT.animateFloat(-4f, 4f, infiniteRepeatable(tween(4000 + idx * 500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "pbv-s-$idx")
    val bubbleT = rememberInfiniteTransition(label = "pbv-bubble-$idx")
    val bubbles = listOf(
        bubbleT.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 0), RepeatMode.Restart), "pb-b1-$idx"),
        bubbleT.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 800), RepeatMode.Restart), "pb-b2-$idx"),
        bubbleT.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 1600), RepeatMode.Restart), "pb-b3-$idx"),
    )

    Canvas(modifier.fillMaxSize().graphicsLayer { rotationZ = spin }) {
        val u = minOf(size.width, size.height) / 140f
        val cx = size.width / 2f
        val fy = float * u

        // Glow
        radialGlow(cx, 70f * u + fy, 50f * u, palette.primary, 0.20f)

        // --- Bottle neck (thin) ---
        val neckW = 20f * u
        val neckH = 20f * u
        rr(palette.surface4, cx - neckW/2, 16f * u + fy, neckW, neckH, 2f * u)
        rr(palette.primary, cx - neckW/2, 16f * u + fy, neckW, neckH, 2f * u, 1.5f * u)

        // --- Cap ---
        val capW = 26f * u
        rr(palette.primary, cx - capW/2, 8f * u + fy, capW, 10f * u, 2f * u)

        // --- Bottle shoulders + body (rounded) ---
        val bodyW = 52f * u
        val bodyH = 80f * u
        val bodyTop = 36f * u + fy
        val bodyPath = Path().apply {
            // Start at left shoulder
            moveTo(cx - bodyW/2, bodyTop + 12f * u)
            // Left shoulder curve up to neck
            quadraticTo(cx - bodyW/2, bodyTop, cx - neckW/2 - 2f * u, bodyTop)
            lineTo(cx - neckW/2, 36f * u + fy)
            // Top (neck base)
            lineTo(cx + neckW/2, 36f * u + fy)
            lineTo(cx + neckW/2 + 2f * u, bodyTop)
            // Right shoulder curve down
            quadraticTo(cx + bodyW/2, bodyTop, cx + bodyW/2, bodyTop + 12f * u)
            // Right side down
            lineTo(cx + bodyW/2, bodyTop + bodyH - 14f * u)
            // Bottom right curve
            quadraticTo(cx + bodyW/2, bodyTop + bodyH, cx + bodyW/2 - 14f * u, bodyTop + bodyH)
            // Bottom
            lineTo(cx - bodyW/2 + 14f * u, bodyTop + bodyH)
            // Bottom left curve
            quadraticTo(cx - bodyW/2, bodyTop + bodyH, cx - bodyW/2, bodyTop + bodyH - 14f * u)
            // Left side up
            close()
        }
        // Body fill with gradient
        drawPath(bodyPath, Brush.verticalGradient(listOf(palette.primaryContainer, palette.surface5), start = Offset(cx, bodyTop), end = Offset(cx, bodyTop + bodyH)))
        // Body outline
        drawPath(bodyPath, palette.primary, style = Stroke(2.5f * u))

        // --- Liquid (inside body, bottom half) ---
        val liquidTop = bodyTop + bodyH * 0.35f
        val liquidPath = Path().apply {
            moveTo(cx - bodyW/2 + 4f * u, liquidTop)
            // Wavy top
            quadraticTo(cx - bodyW/4, liquidTop - 3f * u, cx, liquidTop)
            quadraticTo(cx + bodyW/4, liquidTop + 3f * u, cx + bodyW/2 - 4f * u, liquidTop)
            // Right side down
            lineTo(cx + bodyW/2 - 4f * u, bodyTop + bodyH - 14f * u)
            quadraticTo(cx + bodyW/2 - 4f * u, bodyTop + bodyH - 4f * u, cx + bodyW/2 - 14f * u, bodyTop + bodyH - 4f * u)
            lineTo(cx - bodyW/2 + 14f * u, bodyTop + bodyH - 4f * u)
            quadraticTo(cx - bodyW/2 + 4f * u, bodyTop + bodyH - 4f * u, cx - bodyW/2 + 4f * u, bodyTop + bodyH - 14f * u)
            close()
        }
        drawPath(liquidPath, palette.primary.copy(alpha = 0.55f))

        // --- Bubbles in liquid ---
        bubbles.forEachIndexed { i, b ->
            val p = b.value
            if (p < 0.88f) {
                val y = (bodyTop + bodyH - 8f * u - p * (bodyH * 0.5f))
                val bs = 3f * u
                val alpha = if (p < 0.1f) p * 9f else if (p < 0.72f) 0.9f else maxOf(0f, 0.9f - (p - 0.72f) * 8f)
                val x = cx + when (i) { 0 -> -8f * u; 1 -> 6f * u; 2 -> -2f * u; else -> 0f }
                drawCircle(Color.White.copy(alpha = alpha), bs, Offset(x, y))
            }
        }

        // --- Label (white background on body) ---
        val labelW = 36f * u
        val labelH = 34f * u
        val labelY = bodyTop + bodyH * 0.30f
        rr(palette.background.copy(alpha = 0.94f), cx - labelW/2, labelY, labelW, labelH, 3f * u)

        // --- Skull and crossbones on label ---
        // Crossed bones
        val bonePaint = Stroke(2.5f * u, cap = StrokeCap.Round)
        drawLine(palette.primary, Offset(cx - 10f * u, labelY + labelH - 4f * u), Offset(cx + 10f * u, labelY + 4f * u), bonePaint.width, bonePaint.cap)
        drawLine(palette.primary, Offset(cx + 10f * u, labelY + labelH - 4f * u), Offset(cx - 10f * u, labelY + 4f * u), bonePaint.width, bonePaint.cap)
        // Bone ends (small circles)
        drawCircle(palette.primary, 2.5f * u, Offset(cx - 10f * u, labelY + labelH - 4f * u))
        drawCircle(palette.primary, 2.5f * u, Offset(cx + 10f * u, labelY + 4f * u))
        drawCircle(palette.primary, 2.5f * u, Offset(cx + 10f * u, labelY + labelH - 4f * u))
        drawCircle(palette.primary, 2.5f * u, Offset(cx - 10f * u, labelY + 4f * u))
        // Skull
        val skullCx = cx
        val skullCy = labelY + labelH * 0.45f
        drawCircle(palette.primary, 8f * u, Offset(skullCx, skullCy))
        rr(palette.primary, skullCx - 6f * u, skullCy + 4f * u, 12f * u, 6f * u, 2f * u)
        drawCircle(palette.background, 2f * u, Offset(skullCx - 3f * u, skullCy - 1f * u))
        drawCircle(palette.background, 2f * u, Offset(skullCx + 3f * u, skullCy - 1f * u))
    }
}

// ============================================================================
// POISON PILL — animated capsule with customizable colors
// ============================================================================

@Composable
fun PoisonPillVisual(palette: WizardPalette, idx: Int = 0, pillColor: Color = Color(0xFFE85D5D), pillColor2: Color = Color.White, modifier: Modifier = Modifier) {
    val rotT = rememberInfiniteTransition(label = "ppv-rot-$idx")
    val rot by rotT.animateFloat(-8f, 8f, infiniteRepeatable(tween(4000 + idx * 500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "ppv-r-$idx")
    val floatT = rememberInfiniteTransition(label = "ppv-float-$idx")
    val float by floatT.animateFloat(-3f, 3f, infiniteRepeatable(tween(3000 + idx * 500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "ppv-f-$idx")

    Canvas(modifier.fillMaxSize().graphicsLayer { rotationZ = rot }) {
        val u = minOf(size.width, size.height) / 140f
        val cx = size.width / 2f
        val cy = size.height / 2f + float * u
        val pillW = 80f * u
        val pillH = 34f * u
        val r = pillH / 2f

        // Glow
        radialGlow(cx, cy, 50f * u, pillColor, 0.20f)

        // Left half (colored) — rounded left + rect to center
        drawCircle(pillColor, r, Offset(cx - pillW/2 + r, cy))
        drawRect(pillColor, Offset(cx - pillW/2 + r, cy - r), Size(pillW/2 - r, pillH))
        // Right half (white/dark) — rect from center + rounded right
        drawRect(pillColor2, Offset(cx, cy - r), Size(pillW/2 - r, pillH))
        drawCircle(pillColor2, r, Offset(cx + pillW/2 - r, cy))
        // Divider line
        drawLine(pillColor.copy(alpha = 0.3f), Offset(cx, cy - r), Offset(cx, cy + r), 1f * u)

        // Highlight (glossy reflection on top)
        rr(pillColor.copy(alpha = 0.25f), cx - pillW/2 + r * 0.5f, cy - r + r * 0.15f, pillW - r, r * 0.3f, r * 0.15f)

        // Plus sign on colored half
        val plusCx = cx - pillW / 4f
        drawLine(palette.onPrimary, Offset(plusCx, cy - 7f * u), Offset(plusCx, cy + 7f * u), 3f * u, StrokeCap.Round)
        drawLine(palette.onPrimary, Offset(plusCx - 7f * u, cy), Offset(plusCx + 7f * u, cy), 3f * u, StrokeCap.Round)
    }
}

// ============================================================================
// FINISH — bold check-in-circle with confetti + breathing glow
// ============================================================================

@Composable
fun FinishVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val drawT = rememberInfiniteTransition(label = "fv-draw")
    val draw by drawT.animateFloat(0f, 1f, infiniteRepeatable(tween(1200, easing = FastOutSlowInEasing), RepeatMode.Restart), "fv-d")
    val glowT = rememberInfiniteTransition(label = "fv-glow")
    val glow by glowT.animateFloat(0.20f, 0.35f, infiniteRepeatable(tween(2800, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fv-g")
    val confettiT = rememberInfiniteTransition(label = "fv-conf")
    val confetti by confettiT.animateFloat(0f, 1f, infiniteRepeatable(tween(2000, delayMillis = 1200, easing = LinearEasing), RepeatMode.Restart), "fv-c")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f
        val r = 44f * u

        // Glow (breathing)
        radialGlow(cx, cy, r * (1.4f + 0.1f * glow / 0.35f), palette.primary, glow)

        // Circle (draws in)
        val circleSweep = (draw * 1.3f).coerceIn(0f, 1f)
        drawArc(palette.primary, -90f, circleSweep * 360f, false, Offset(cx - r, cy - r), Size(r * 2, r * 2), Stroke(6f * u, cap = StrokeCap.Round))
        // Fill once drawn
        if (circleSweep >= 1f) {
            drawCircle(palette.primary, r, Offset(cx, cy))
        }

        // Check mark (draws after circle)
        val checkP = (draw * 1.6f - 0.6f).coerceIn(0f, 1f)
        if (checkP > 0f) {
            val p1 = Offset(cx - r * 0.32f, cy)
            val p2 = Offset(cx - r * 0.05f, cy + r * 0.30f)
            val p3 = Offset(cx + r * 0.36f, cy - r * 0.28f)
            val checkPaint = Stroke(width = 7f * u, cap = StrokeCap.Round, join = StrokeJoin.Round)
            if (checkP <= 0.5f) {
                val k = checkP * 2f
                drawLine(palette.onPrimary, p1, Offset(p1.x + (p2.x - p1.x) * k, p1.y + (p2.y - p1.y) * k), checkPaint.width, checkPaint.cap)
            } else {
                drawLine(palette.onPrimary, p1, p2, checkPaint.width, checkPaint.cap)
                val k = (checkP - 0.5f) * 2f
                drawLine(palette.onPrimary, p2, Offset(p2.x + (p3.x - p2.x) * k, p2.y + (p3.y - p2.y) * k), checkPaint.width, checkPaint.cap)
            }
        }

        // Confetti
        if (confetti > 0f && circleSweep >= 1f) {
            val rng = java.util.Random(42)
            for (i in 0 until 22) {
                val a = rng.nextFloat() * 2f * PI.toFloat()
                val dist = r * (1.2f + 0.6f * rng.nextFloat()) * confetti
                val dx = cx + dist * cos(a)
                val dy = cy + dist * sin(a)
                val sz = (1.5f + 1.5f * rng.nextFloat()) * u
                drawCircle(palette.primary.copy(alpha = 0.7f * (1f - confetti * 0.5f)), sz, Offset(dx, dy))
            }
        }
    }
}

// ============================================================================
// SEARCH — magnifying glass with pulse ripple (for manual linking screen)
// ============================================================================

@Composable
fun SearchVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "sv2")
    val ripple by t.animateFloat(0f, 1f, infiniteRepeatable(tween(2400, easing = LinearEasing)), "sv2-r")
    val float by t.animateFloat(0f, -4f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "sv2-f")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width * 0.42f
        val cy = (size.height * 0.42f) + float * u
        val r = size.width * 0.22f

        // Expanding ripple
        val rippleR = r + size.width * 0.10f * ripple
        drawCircle(palette.primary.copy(alpha = (1f - ripple) * 0.3f), rippleR, Offset(cx, cy), style = Stroke(2f * u))

        // Glow
        radialGlow(cx, cy, r * 1.4f, palette.primary, 0.18f)

        // Magnifying glass circle (ring)
        drawCircle(palette.primary, r, Offset(cx, cy), style = Stroke(5f * u))
        // Inner glass tint
        drawCircle(palette.primary.copy(alpha = 0.08f), r - 3f * u, Offset(cx, cy))

        // Handle
        val handleStart = Offset(cx + r * 0.70f, cy + r * 0.70f)
        val handleEnd = Offset(cx + r * 1.30f, cy + r * 1.30f)
        drawLine(palette.primary, handleStart, handleEnd, 7f * u, StrokeCap.Round)
    }
}
