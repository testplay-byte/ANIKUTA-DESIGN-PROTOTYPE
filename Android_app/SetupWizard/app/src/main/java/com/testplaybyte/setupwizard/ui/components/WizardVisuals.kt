package com.testplaybyte.setupwizard.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
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
    drawRoundRect(brush, topLeft = Offset(x, y), size = Size(w, h), cornerRadius = CornerRadius(cr, cr))
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

// ============================================================================
// FOLDER — completely new design: 3D-perspective folder with anime cards
// floating above and descending into it. Lid opens slightly, cards drift
// in with staggered timing. Scanning beam passes over. Check badge on select.
// ============================================================================

@Composable
fun FolderVisual(palette: WizardPalette, selected: Boolean = false, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "fv2")
    val float by t.animateFloat(-4f, 4f, infiniteRepeatable(tween(4000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fv2-float")
    val cardDrop by t.animateFloat(0f, 1f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Restart), "fv2-drop")
    val scanLine by t.animateFloat(0f, 1f, infiniteRepeatable(tween(2500, easing = LinearEasing), RepeatMode.Restart), "fv2-scan")
    val lidOpen by t.animateFloat(0f, 1f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fv2-lid")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f
        val fy = float * u

        // Soft glow behind folder
        radialGlow(cx, cy + 20f * u + fy, 80f * u, palette.primary, 0.14f)

        // --- 3 anime cards descending into the folder (staggered) ---
        for (i in 0 until 3) {
            val cardPhase = (cardDrop + i * 0.33f) % 1f
            // Cards start above the folder and descend
            val startX = cx + (i - 1) * 28f * u
            val startY = cy - 70f * u + fy
            val endY = cy - 10f * u + fy
            val cardY = startY + (endY - startY) * cardPhase
            val cardAlpha = if (cardPhase < 0.1f) cardPhase * 10f else if (cardPhase > 0.85f) maxOf(0f, 1f - (cardPhase - 0.85f) * 6.7f) else 1f
            val cardW = 32f * u
            val cardH = 44f * u
            val cardRot = (i - 1) * 8f * (1f - cardPhase) // straighten as they descend

            // Card body
            rr(palette.surface5.copy(alpha = cardAlpha), startX - cardW / 2, cardY, cardW, cardH, 4f * u)
            // Card top accent (poster-like)
            rr(palette.primary.copy(alpha = 0.5f * cardAlpha), startX - cardW / 2, cardY, cardW, cardH * 0.4f, 4f * u)
            // Card content lines
            for (j in 0 until 2) {
                drawRect(palette.primary.copy(alpha = 0.2f * cardAlpha), Offset(startX - cardW / 2 + 4f * u, cardY + cardH * 0.5f + j * 6f * u), Size(cardW - 8f * u, 2f * u))
            }
        }

        // --- Folder back (lid) — opens slightly ---
        val lidLift = lidOpen * 8f * u
        val backPath = Path().apply {
            moveTo(cx - 50f * u, cy - 10f * u + fy - lidLift)
            lineTo(cx - 20f * u, cy - 10f * u + fy - lidLift)
            lineTo(cx - 14f * u, cy - 18f * u + fy - lidLift)
            lineTo(cx + 14f * u, cy - 18f * u + fy - lidLift)
            lineTo(cx + 20f * u, cy - 10f * u + fy - lidLift)
            lineTo(cx + 50f * u, cy - 10f * u + fy - lidLift)
            lineTo(cx + 50f * u, cy + 2f * u + fy)
            lineTo(cx - 50f * u, cy + 2f * u + fy)
            close()
        }
        drawPath(backPath, palette.surface4)

        // --- Folder front pocket ---
        val frontTop = cy + 2f * u + fy
        val frontH = 56f * u
        rr(palette.surface3, cx - 52f * u, frontTop, 104f * u, frontH, 12f * u)
        // Border
        rr(palette.primary.copy(alpha = 0.3f), cx - 52f * u, frontTop, 104f * u, frontH, 12f * u, 2f * u)

        // Inner content lines on folder
        for (i in 0 until 3) {
            val lineY = frontTop + 14f * u + i * 10f * u
            rr(palette.primary.copy(alpha = 0.25f - i * 0.05f), cx - 36f * u, lineY, 72f * u, 3f * u, 2f * u)
        }

        // --- Scanning beam (horizontal line that sweeps down) ---
        val scanY = frontTop + scanLine * frontH
        drawLine(palette.primary.copy(alpha = 0.4f), Offset(cx - 50f * u, scanY), Offset(cx + 50f * u, scanY), 2f * u, StrokeCap.Round)
        // Scan glow
        radialGlow(cx, scanY, 20f * u, palette.primary, 0.15f)

        // --- Selected check badge ---
        if (selected) {
            val bx = cx + 42f * u
            val by = frontTop - 8f * u
            radialGlow(bx, by, 30f * u, palette.primary, 0.3f)
            drawCircle(palette.primary, 22f * u, Offset(bx, by))
            val cp = Path().apply {
                moveTo(bx - 9f * u, by)
                lineTo(bx - 3f * u, by + 6f * u)
                lineTo(bx + 9f * u, by - 6f * u)
            }
            drawPath(cp, palette.background, style = Stroke(3.5f * u, cap = StrokeCap.Round, join = StrokeJoin.Round))
        }
    }
}

// ============================================================================
// SHIELD — completely new design: biometric-style scanning badge
// A circular badge with a scanning line that sweeps top to bottom, grid
// lines that appear as the scan passes, and a checkmark that draws in
// after each scan cycle. Concentric rings pulse outward.
// ============================================================================

@Composable
fun ShieldVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val scanT = rememberInfiniteTransition(label = "sv3-scan")
    val scan by scanT.animateFloat(0f, 1f, infiniteRepeatable(tween(2500, easing = LinearEasing), RepeatMode.Restart), "sv3-s")
    val pulseT = rememberInfiniteTransition(label = "sv3-pulse")
    val pulse by pulseT.animateFloat(0f, 1f, infiniteRepeatable(tween(2000, easing = LinearEasing), RepeatMode.Restart), "sv3-p")
    val floatT = rememberInfiniteTransition(label = "sv3-float")
    val float by floatT.animateFloat(0f, -4f, infiniteRepeatable(tween(3500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "sv3-f")
    val checkT = rememberInfiniteTransition(label = "sv3-check")
    val check by checkT.animateFloat(0f, 1f, infiniteRepeatable(tween(1500, delayMillis = 1000, easing = FastOutSlowInEasing), RepeatMode.Restart), "sv3-c")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = (100f + float) * u
        val r = 56f * u

        // Concentric pulse rings
        for (i in 0 until 3) {
            val phase = (pulse + i * 0.33f) % 1f
            val pr = r + 30f * u * phase
            drawCircle(palette.primary.copy(alpha = (1f - phase) * 0.15f), pr, Offset(cx, cy), style = Stroke(2f * u))
        }

        // Glow
        radialGlow(cx, cy, r * 1.3f, palette.primary, 0.16f)

        // Outer circle (badge ring)
        drawCircle(palette.surface3, r, Offset(cx, cy))
        drawCircle(palette.primary, r, Offset(cx, cy), style = Stroke(3f * u))

        // Inner circle (darker)
        drawCircle(palette.surface2, r - 6f * u, Offset(cx, cy))

        // Grid lines that appear as scan passes
        val gridCount = 8
        for (i in 0..gridCount) {
            val gridY = cy - r + 6f * u + i * (r * 2 - 12f * u) / gridCount
            val gridProgress = (scan * (r * 2) - (gridY - cy + r)) / 20f
            if (gridProgress > 0f && gridProgress < 1f) {
                drawLine(palette.primary.copy(alpha = 0.15f * gridProgress), Offset(cx - r + 12f * u, gridY), Offset(cx + r - 12f * u, gridY), 1f * u)
            }
        }

        // Scanning line (sweeps top to bottom)
        val scanY = cy - r + 6f * u + scan * (r * 2 - 12f * u)
        drawLine(palette.primary, Offset(cx - r + 10f * u, scanY), Offset(cx + r - 10f * u, scanY), 2.5f * u, StrokeCap.Round)
        // Scan glow
        radialGlow(cx, scanY, 16f * u, palette.primary, 0.2f)

        // Checkmark that draws in after scan completes
        if (check > 0f) {
            val p1 = Offset(cx - r * 0.2f, cy)
            val p2 = Offset(cx - r * 0.05f, cy + r * 0.2f)
            val p3 = Offset(cx + r * 0.25f, cy - r * 0.2f)
            if (check <= 0.5f) {
                val k = check * 2f
                drawLine(palette.primary, p1, Offset(p1.x + (p2.x - p1.x) * k, p1.y + (p2.y - p1.y) * k), 5f * u, StrokeCap.Round)
            } else {
                drawLine(palette.primary, p1, p2, 5f * u, StrokeCap.Round)
                val k = (check - 0.5f) * 2f
                drawLine(palette.primary, p2, Offset(p2.x + (p3.x - p2.x) * k, p2.y + (p3.y - p2.y) * k), 5f * u, StrokeCap.Round)
            }
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
            Brush.verticalGradient(listOf(palette.surface2, palette.surface4)),
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
        drawArc(palette.primary.copy(alpha = 0.5f), spin, 120f, false, Offset(cx - 76f * u, cy - 76f * u), Size(152f * u, 152f * u), style = Stroke(2f * u, cap = StrokeCap.Round))
        drawArc(palette.primary.copy(alpha = 0.35f), -spin, 90f, false, Offset(cx - 62f * u, cy - 62f * u), Size(124f * u, 124f * u), style = Stroke(1.5f * u, cap = StrokeCap.Round))

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
            Brush.verticalGradient(listOf(palette.surface3, palette.surface5)),
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
            style = Stroke(10f * u, cap = StrokeCap.Round),
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
        drawOval(palette.primaryContainer, Offset(cx - ew/2, (44f + float) * u), Size(ew, eh))
        drawOval(palette.primary, Offset(cx - ew/2, (44f + float) * u), Size(ew, eh), style = Stroke(2.5f * u))

        // Body
        drawRect(palette.primaryContainer, Offset(cx - ew/2, (56f + float) * u), Size(ew, 76f * u))
        drawLine(palette.primary, Offset(cx - ew/2, (56f + float) * u), Offset(cx - ew/2, (132f + float) * u), 2.5f * u)
        drawLine(palette.primary, Offset(cx + ew/2, (56f + float) * u), Offset(cx + ew/2, (132f + float) * u), 2.5f * u)
        // Bottom curve
        drawArc(palette.primary, 0f, 180f, false, Offset(cx - ew/2, (108f + float) * u), Size(ew, 48f * u), style = Stroke(2.5f * u))

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
        // Use height-based scaling so the bottle is TALL and fills the container
        val u = size.height / 160f
        val cx = size.width / 2f
        val fy = float * u

        // Glow
        radialGlow(cx, 80f * u + fy, 55f * u, palette.primary, 0.20f)

        // --- Cap (rounded top, longer) ---
        val capW = 30f * u
        val capH = 14f * u
        // Rounded cap using a path with rounded top corners
        val capPath = Path().apply {
            addRoundRect(RoundRect(
                Rect(cx - capW/2, 4f * u + fy, cx + capW/2, 4f * u + fy + capH),
                CornerRadius(capH * 0.4f, capH * 0.4f),
            ))
        }
        drawPath(capPath, palette.primary)

        // --- Bottle neck (thin, LONGER) ---
        val neckW = 18f * u
        val neckH = 30f * u  // was 22f, now longer
        rr(palette.surface4, cx - neckW/2, 18f * u + fy, neckW, neckH, 3f * u)  // more rounded (was 2f)
        rr(palette.primary, cx - neckW/2, 18f * u + fy, neckW, neckH, 3f * u, 1.5f * u)

        // --- Bottle shoulders + body (tall, rounded) ---
        val bodyW = 50f * u
        val bodyH = 95f * u
        val bodyTop = 48f * u + fy  // was 38f, now lower to accommodate longer neck
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
        drawPath(bodyPath, palette.primaryContainer)
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
        // Use height-based scaling for consistent pill sizing
        val u = size.height / 160f
        val cx = size.width / 2f
        val cy = size.height / 2f + float * u
        val pillW = 90f * u
        val pillH = 38f * u
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

// ============================================================================
// FINISH — completely new: premium celebration with star burst + orbiting
// sparkles + a bold check that draws in slowly. Breathing glow. Confetti
// that falls gently. Much slower and more elegant than the old version.
// ============================================================================

@Composable
fun FinishVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "fv3")
    val draw by t.animateFloat(0f, 1f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Restart), "fv3-d")
    val glow by t.animateFloat(0.15f, 0.30f, infiniteRepeatable(tween(3500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fv3-g")
    val orbit by t.animateFloat(0f, 360f, infiniteRepeatable(tween(10000, easing = LinearEasing)), "fv3-o")
    val confetti by t.animateFloat(0f, 1f, infiniteRepeatable(tween(4000, delayMillis = 2000, easing = LinearEasing), RepeatMode.Restart), "fv3-c")
    val scale by t.animateFloat(0.95f, 1.05f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fv3-s")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f
        val r = 48f * u * scale

        // Outer breathing glow
        radialGlow(cx, cy, r * 1.6f, palette.primary, glow)

        // Star burst rays (8 rays radiating outward, subtle)
        for (i in 0 until 8) {
            val angle = (orbit + i * 45f) * PI.toFloat() / 180f
            val rayLen = r * (1.3f + 0.15f * sin(orbit * PI.toFloat() / 180f + i))
            val innerR = r * 1.1f
            val outerR = innerR + rayLen * 0.3f
            val x1 = cx + innerR * cos(angle)
            val y1 = cy + innerR * sin(angle)
            val x2 = cx + outerR * cos(angle)
            val y2 = cy + outerR * sin(angle)
            drawLine(palette.primary.copy(alpha = 0.15f), Offset(x1, y1), Offset(x2, y2), 2f * u, StrokeCap.Round)
        }

        // 6 orbiting sparkles
        for (i in 0 until 6) {
            val angle = (orbit + i * 60f) * PI.toFloat() / 180f
            val orbR = r * 1.35f
            val sx = cx + orbR * cos(angle)
            val sy = cy + orbR * sin(angle)
            val sparkleSize = (3f + 2f * sin(orbit * PI.toFloat() / 180f + i)) * u
            drawCircle(palette.primary.copy(alpha = 0.5f), sparkleSize, Offset(sx, sy))
        }

        // Circle ring (draws in slowly)
        val circleSweep = (draw * 1.2f).coerceIn(0f, 1f)
        drawArc(palette.primary, -90f, circleSweep * 360f, false, Offset(cx - r, cy - r), Size(r * 2, r * 2), style = Stroke(7f * u, cap = StrokeCap.Round))

        // Fill once drawn
        if (circleSweep >= 1f) {
            drawCircle(palette.primary, r, Offset(cx, cy))
        }

        // Check mark (draws slowly after circle completes)
        val checkP = (draw * 1.5f - 0.5f).coerceIn(0f, 1f)
        if (checkP > 0f) {
            val p1 = Offset(cx - r * 0.30f, cy)
            val p2 = Offset(cx - r * 0.05f, cy + r * 0.28f)
            val p3 = Offset(cx + r * 0.34f, cy - r * 0.26f)
            if (checkP <= 0.5f) {
                val k = checkP * 2f
                drawLine(palette.onPrimary, p1, Offset(p1.x + (p2.x - p1.x) * k, p1.y + (p2.y - p1.y) * k), 6f * u, StrokeCap.Round)
            } else {
                drawLine(palette.onPrimary, p1, p2, 6f * u, StrokeCap.Round)
                val k = (checkP - 0.5f) * 2f
                drawLine(palette.onPrimary, p2, Offset(p2.x + (p3.x - p2.x) * k, p2.y + (p3.y - p2.y) * k), 6f * u, StrokeCap.Round)
            }
        }

        // Gentle confetti (falls slowly from top)
        if (confetti > 0f && circleSweep >= 1f) {
            val rng = java.util.Random(42)
            for (i in 0 until 16) {
                val startX = rng.nextFloat() * size.width
                val fallY = confetti * size.height * (0.3f + 0.5f * rng.nextFloat())
                val sz = (2f + 2f * rng.nextFloat()) * u
                val alpha = 0.6f * (1f - confetti * 0.7f)
                drawCircle(palette.primary.copy(alpha = alpha), sz, Offset(startX, fallY))
            }
        }
    }
}

// ============================================================================
// RESTORE SUCCESS — new, slower, more elegant animation
// A large success circle with a checkmark, surrounded by rising sparkles
// and a gentle pulse. Much slower than the old FinishVisual reuse.
// ============================================================================

@Composable
fun RestoreSuccessVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "rsv")
    val draw by t.animateFloat(0f, 1f, infiniteRepeatable(tween(2500, easing = FastOutSlowInEasing), RepeatMode.Restart), "rsv-d")
    val pulse by t.animateFloat(0f, 1f, infiniteRepeatable(tween(3000, easing = LinearEasing), RepeatMode.Restart), "rsv-p")
    val glow by t.animateFloat(0.18f, 0.30f, infiniteRepeatable(tween(3500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "rsv-g")
    val sparkles by t.animateFloat(0f, 1f, infiniteRepeatable(tween(3500, easing = LinearEasing), RepeatMode.Restart), "rsv-s")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f
        val r = 50f * u

        // Pulse rings (slow, expanding)
        for (i in 0 until 2) {
            val phase = (pulse + i * 0.5f) % 1f
            val pr = r + 40f * u * phase
            drawCircle(palette.primary.copy(alpha = (1f - phase) * 0.12f), pr, Offset(cx, cy), style = Stroke(2f * u))
        }

        // Breathing glow
        radialGlow(cx, cy, r * 1.5f, palette.primary, glow)

        // Circle (draws in slowly — 2.5s cycle)
        val circleSweep = (draw * 1.2f).coerceIn(0f, 1f)
        drawArc(palette.primary, -90f, circleSweep * 360f, false, Offset(cx - r, cy - r), Size(r * 2, r * 2), style = Stroke(7f * u, cap = StrokeCap.Round))

        // Fill once drawn
        if (circleSweep >= 1f) {
            drawCircle(palette.primary, r, Offset(cx, cy))
        }

        // Check mark (draws after circle)
        val checkP = (draw * 1.4f - 0.4f).coerceIn(0f, 1f)
        if (checkP > 0f) {
            val p1 = Offset(cx - r * 0.28f, cy)
            val p2 = Offset(cx - r * 0.05f, cy + r * 0.26f)
            val p3 = Offset(cx + r * 0.32f, cy - r * 0.24f)
            if (checkP <= 0.5f) {
                val k = checkP * 2f
                drawLine(palette.onPrimary, p1, Offset(p1.x + (p2.x - p1.x) * k, p1.y + (p2.y - p1.y) * k), 6f * u, StrokeCap.Round)
            } else {
                drawLine(palette.onPrimary, p1, p2, 6f * u, StrokeCap.Round)
                val k = (checkP - 0.5f) * 2f
                drawLine(palette.onPrimary, p2, Offset(p2.x + (p3.x - p2.x) * k, p2.y + (p3.y - p2.y) * k), 6f * u, StrokeCap.Round)
            }
        }

        // Rising sparkles (float upward from bottom)
        if (sparkles > 0f) {
            val rng = java.util.Random(42)
            for (i in 0 until 12) {
                val sx = cx + (rng.nextFloat() - 0.5f) * r * 2.5f
                val startY = cy + r * 0.8f
                val endY = cy - r * 1.5f
                val sy = startY + (endY - startY) * ((sparkles + rng.nextFloat() * 0.3f) % 1f)
                val sz = (2f + 1.5f * rng.nextFloat()) * u
                val alpha = 0.5f * (1f - ((sparkles + rng.nextFloat() * 0.3f) % 1f))
                drawCircle(palette.primary.copy(alpha = alpha), sz, Offset(sx, sy))
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

// ============================================================================
// FLOATING SHAPES — animated background of floating geometric shapes
// for the welcome screen. Gives subtle motion without being distracting.
// ============================================================================

@Composable
fun FloatingShapes(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "fs")
    // 6 shapes with independent float animations
    val data = listOf(
        Triple(0.15f, 0.20f, 40f),   // x%, y%, size
        Triple(0.80f, 0.15f, 30f),
        Triple(0.85f, 0.70f, 35f),
        Triple(0.10f, 0.75f, 28f),
        Triple(0.50f, 0.10f, 22f),
        Triple(0.45f, 0.85f, 25f),
    )
    val floats = data.mapIndexed { i, _ ->
        t.animateFloat(
            initialValue = -8f,
            targetValue = 8f,
            animationSpec = infiniteRepeatable(
                tween(3000 + i * 500, easing = FastOutSlowInEasing),
                RepeatMode.Reverse
            ),
            label = "fs-f-$i"
        )
    }
    val alphas = data.mapIndexed { i, _ ->
        t.animateFloat(
            initialValue = 0.06f,
            targetValue = 0.14f,
            animationSpec = infiniteRepeatable(
                tween(2500 + i * 400, easing = FastOutSlowInEasing),
                RepeatMode.Reverse
            ),
            label = "fs-a-$i"
        )
    }

    Canvas(modifier.fillMaxSize()) {
        data.forEachIndexed { i, (xPct, yPct, baseSize) ->
            val cx = size.width * xPct
            val cy = size.height * yPct + floats[i].value * (size.height / 200f)
            val sz = baseSize * (size.width / 400f)
            val alpha = alphas[i].value
            // Alternate between circles and rounded squares
            if (i % 2 == 0) {
                drawCircle(palette.primary.copy(alpha = alpha), sz, Offset(cx, cy))
            } else {
                val cr = sz * 0.3f
                val path = Path().apply {
                    addRoundRect(RoundRect(Rect(cx - sz, cy - sz, cx + sz, cy + sz), CornerRadius(cr, cr)))
                }
                drawPath(path, palette.primary.copy(alpha = alpha))
            }
        }
    }
}

// ============================================================================
// MINI ANIME PREVIEW — animated phone frame that cycles through screen states
// Shows: Home (trending row) → Library (grid) → Search (results) → Settings (toggles)
// ============================================================================

@Composable
fun MiniAnimePreview(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "map")
    val cycle by t.animateFloat(0f, 4f, infiniteRepeatable(tween(10000, easing = LinearEasing)), "map-c")
    val fade by t.animateFloat(0f, 1f, infiniteRepeatable(tween(2500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "map-f")

    // Current screen index (0-3) based on cycle
    val screenIndex = (cycle.toInt()) % 4
    // Fade transition between screens
    val screenProgress = cycle - cycle.toInt()

    Box(modifier = modifier) {
        // Phone frame
        Box(
            modifier = Modifier
                .fillMaxSize()
                .clip(RoundedCornerShape(20.dp))
                .background(Color.Black)
                .padding(4.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(palette.background)
        ) {
            // Notch
            Box(
                modifier = Modifier
                    .align(Alignment.TopCenter)
                    .padding(top = 4.dp)
                    .width(40.dp)
                    .height(6.dp)
                    .clip(RoundedCornerShape(999.dp))
                    .background(palette.surface4)
            )
            // Screen content — cycles through 4 mini screens
            Column(
                modifier = Modifier.fillMaxSize().padding(top = 16.dp, start = 8.dp, end = 8.dp, bottom = 8.dp),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                when (screenIndex) {
                    0 -> { // Home — trending row + text lines
                        Box(Modifier.fillMaxWidth().height(36.dp).clip(RoundedCornerShape(8.dp)).background(palette.primary.copy(alpha = 0.5f + fade * 0.2f)))
                        repeat(2) { Box(Modifier.fillMaxWidth(0.7f).height(6.dp).clip(RoundedCornerShape(999.dp)).background(palette.surface3)) }
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                            repeat(3) { Box(Modifier.weight(1f).height(50.dp).clip(RoundedCornerShape(6.dp)).background(palette.surface4)) }
                        }
                    }
                    1 -> { // Library — grid
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                            repeat(3) { Box(Modifier.weight(1f).height(60.dp).clip(RoundedCornerShape(6.dp)).background(palette.primary.copy(alpha = 0.3f + fade * 0.2f))) }
                        }
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                            repeat(3) { Box(Modifier.weight(1f).height(60.dp).clip(RoundedCornerShape(6.dp)).background(palette.surface4)) }
                        }
                    }
                    2 -> { // Search — search bar + result rows
                        Box(Modifier.fillMaxWidth().height(22.dp).clip(RoundedCornerShape(999.dp)).background(palette.primary.copy(alpha = 0.2f)))
                        repeat(3) {
                            Row(Modifier.fillMaxWidth().padding(vertical = 2.dp), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                                Box(Modifier.size(20.dp).clip(RoundedCornerShape(4.dp)).background(palette.primary.copy(alpha = 0.4f + fade * 0.2f)))
                                Box(Modifier.weight(1f).height(20.dp).clip(RoundedCornerShape(4.dp)).background(palette.surface3))
                            }
                        }
                    }
                    3 -> { // Settings — toggle rows
                        repeat(4) { i ->
                            Row(Modifier.fillMaxWidth().padding(vertical = 2.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(Modifier.size(10.dp).clip(CircleShape).background(palette.primary.copy(alpha = 0.6f)))
                                    Spacer(Modifier.width(4.dp))
                                    Box(Modifier.width(50.dp).height(5.dp).clip(RoundedCornerShape(999.dp)).background(palette.surface3))
                                }
                                Box(Modifier.width(18.dp).height(10.dp).clip(RoundedCornerShape(999.dp)).background(if (i < 2) palette.primary.copy(alpha = 0.8f + fade * 0.2f) else palette.surface4))
                            }
                        }
                    }
                }
            }
            // No screen label — the preview shows the screens visually
        }
    }
}

// ============================================================================
// ALL LINKED — success animation for when all anime are linked (manual screen)
// A circle of linked items with a big checkmark in the center
// ============================================================================

@Composable
fun AllLinkedVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "alv")
    val pulse by t.animateFloat(0f, 1f, infiniteRepeatable(tween(2500, easing = LinearEasing), RepeatMode.Restart), "alv-p")
    val draw by t.animateFloat(0f, 1f, infiniteRepeatable(tween(2000, easing = FastOutSlowInEasing), RepeatMode.Restart), "alv-d")
    val glow by t.animateFloat(0.18f, 0.30f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "alv-g")
    val orbit by t.animateFloat(0f, 360f, infiniteRepeatable(tween(8000, easing = LinearEasing)), "alv-o")

    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f
        val cy = size.height / 2f
        val r = 40f * u

        // Pulse rings
        for (i in 0 until 2) {
            val phase = (pulse + i * 0.5f) % 1f
            val pr = r + 35f * u * phase
            drawCircle(palette.primary.copy(alpha = (1f - phase) * 0.12f), pr, Offset(cx, cy), style = Stroke(2f * u))
        }

        // Glow
        radialGlow(cx, cy, r * 1.5f, palette.primary, glow)

        // 6 orbiting check marks (representing linked anime)
        for (i in 0 until 6) {
            val angle = (orbit + i * 60f) * PI.toFloat() / 180f
            val orbR = r * 1.2f
            val sx = cx + orbR * cos(angle)
            val sy = cy + orbR * sin(angle)
            // Small circle for each linked item
            drawCircle(palette.primary.copy(alpha = 0.6f), 6f * u, Offset(sx, sy))
            // Mini check inside
            val cp = Path().apply {
                moveTo(sx - 2.5f * u, sy)
                lineTo(sx - 0.5f * u, sy + 2f * u)
                lineTo(sx + 3f * u, sy - 2f * u)
            }
            drawPath(cp, palette.onPrimary, style = Stroke(1.5f * u, cap = StrokeCap.Round, join = StrokeJoin.Round))
        }

        // Center circle (draws in)
        val circleSweep = (draw * 1.2f).coerceIn(0f, 1f)
        drawArc(palette.primary, -90f, circleSweep * 360f, false, Offset(cx - r, cy - r), Size(r * 2, r * 2), style = Stroke(5f * u, cap = StrokeCap.Round))
        if (circleSweep >= 1f) {
            drawCircle(palette.primary, r, Offset(cx, cy))
        }

        // Center checkmark
        val checkP = (draw * 1.4f - 0.4f).coerceIn(0f, 1f)
        if (checkP > 0f) {
            val p1 = Offset(cx - r * 0.28f, cy)
            val p2 = Offset(cx - r * 0.05f, cy + r * 0.25f)
            val p3 = Offset(cx + r * 0.32f, cy - r * 0.22f)
            if (checkP <= 0.5f) {
                val k = checkP * 2f
                drawLine(palette.onPrimary, p1, Offset(p1.x + (p2.x - p1.x) * k, p1.y + (p2.y - p1.y) * k), 5f * u, StrokeCap.Round)
            } else {
                drawLine(palette.onPrimary, p1, p2, 5f * u, StrokeCap.Round)
                val k = (checkP - 0.5f) * 2f
                drawLine(palette.onPrimary, p2, Offset(p2.x + (p3.x - p2.x) * k, p2.y + (p3.y - p2.y) * k), 5f * u, StrokeCap.Round)
            }
        }
    }
}
