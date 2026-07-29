package com.testplaybyte.setupwizard.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.geometry.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp
import com.testplaybyte.setupwizard.ui.theme.WizardPalette
import kotlin.math.sin

// ============================================================================
// SHARED HELPERS — manual transform helpers (avoid DrawScope.scale/translate API issues)
// ============================================================================

private fun DrawScope.glow(cx: Float, cy: Float, radius: Float, color: Color, alpha: Float = 0.25f) {
    drawCircle(color = color.copy(alpha = alpha), radius = radius, center = Offset(cx, cy))
}

private fun DrawScope.rr(color: Color, x: Float, y: Float, w: Float, h: Float, cr: Float, stroke: Float = 0f) {
    val path = Path().apply {
        addRoundRect(RoundRect(Rect(x, y, x + w, y + h), CornerRadius(cr, cr)))
    }
    if (stroke > 0f) drawPath(path, color, style = Stroke(stroke))
    else drawPath(path, color)
}

// ============================================================================
// WELCOME — play mark
// ============================================================================

@Composable
fun WelcomeVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "wv")
    val s by t.animateFloat(0.96f, 1.04f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "wvs")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = size.width / 2f; val cy = size.height / 2f
        glow(cx, cy, 62f * u, palette.primary, 0.3f)
        val sz = 84.dp.toPx() * u * s
        rr(palette.primary, cx - sz/2, cy - sz/2, sz, sz, 22.dp.toPx() * u)
        // play triangle
        val p = Path().apply {
            moveTo(cx - 8.dp.toPx()*u*s, cy - 16.dp.toPx()*u*s)
            lineTo(cx - 8.dp.toPx()*u*s, cy + 16.dp.toPx()*u*s)
            lineTo(cx + 18.dp.toPx()*u*s, cy)
            close()
        }
        drawPath(p, palette.onPrimary)
    }
}

// ============================================================================
// FOLDER — open folder with floating files
// ============================================================================

@Composable
fun FolderVisual(palette: WizardPalette, selected: Boolean = false, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "fv")
    val bob by t.animateFloat(-4f, 0f, infiniteRepeatable(tween(3600, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fvb")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        glow(100f*u, 140f*u, 60f*u, palette.primary, 0.2f)
        // Back lid
        rr(palette.surface4, 40f*u, (88+bob)*u, 118f*u, 28f*u, 8f*u)
        drawLine(palette.primary, Offset(40f*u, 88f*u), Offset(40f*u, 116f*u), 2f*u)
        drawLine(palette.primary, Offset(158f*u, 88f*u), Offset(158f*u, 116f*u), 2f*u)
        // Files (short, floating)
        val f1y = (56f + bob*0.5f) * u
        rr(palette.surface5, 56f*u, f1y, 28f*u, 34f*u, 3f*u, 1.3f*u)
        rr(palette.primary.copy(alpha = 0.55f), 56f*u, f1y, 28f*u, 10f*u, 3f*u)
        val f2y = (50f + bob*0.6f) * u
        rr(palette.surface4, 86f*u, f2y, 28f*u, 40f*u, 3f*u, 1.3f*u)
        rr(palette.primary.copy(alpha = 0.5f), 86f*u, f2y, 28f*u, 10f*u, 3f*u)
        val f3y = (56f + bob*0.4f) * u
        rr(palette.surface3, 116f*u, f3y, 28f*u, 34f*u, 3f*u, 1.3f*u)
        rr(palette.primary.copy(alpha = 0.45f), 116f*u, f3y, 28f*u, 10f*u, 3f*u)
        // Front pocket
        rr(palette.surface3, 38f*u, 116f*u, 124f*u, 58f*u, 8f*u)
        rr(palette.surface5, 38f*u, 116f*u, 124f*u, 58f*u, 8f*u, 2.2f*u)
        drawLine(palette.primary.copy(alpha = 0.4f), Offset(40f*u, 116f*u), Offset(160f*u, 116f*u), 2f*u)
        rr(palette.primary.copy(alpha = 0.35f), 54f*u, 134f*u, 92f*u, 4f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.25f), 54f*u, 148f*u, 72f*u, 4f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.25f), 54f*u, 162f*u, 82f*u, 4f*u, 2f*u)
        // selected badge
        if (selected) {
            drawCircle(palette.primary, 20f*u, Offset(150f*u, 92f*u))
            drawLine(palette.background, Offset(141f*u, 92f*u), Offset(148f*u, 99f*u), 3.5f*u)
            drawLine(palette.background, Offset(148f*u, 99f*u), Offset(160f*u, 85f*u), 3.5f*u)
        }
    }
}

// ============================================================================
// SHIELD — permissions
// ============================================================================

@Composable
fun ShieldVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "sv")
    val float by t.animateFloat(0f, -4f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "svf")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val fy = (100f + float) * u
        glow(100f*u, fy, 52f*u, palette.primary, 0.22f)
        val path = Path().apply {
            moveTo(100f*u, (56f+float)*u); lineTo(138f*u, (70f+float)*u); lineTo(138f*u, (104f+float)*u)
            quadraticTo(138f*u, (134f+float)*u, 100f*u, (150f+float)*u)
            quadraticTo(62f*u, (134f+float)*u, 62f*u, (104f+float)*u)
            lineTo(62f*u, (70f+float)*u); close()
        }
        drawPath(path, palette.primaryContainer)
        drawPath(path, palette.primary, style = Stroke(2.5f*u))
        drawLine(palette.primary, Offset(84f*u, (100f+float)*u), Offset(95f*u, (112f+float)*u), 5f*u)
        drawLine(palette.primary, Offset(95f*u, (112f+float)*u), Offset(118f*u, (88f+float)*u), 5f*u)
    }
}

// ============================================================================
// RESTORE — file + circular arrows
// ============================================================================

@Composable
fun RestoreVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "rv")
    val spin by t.animateFloat(0f, 360f, infiniteRepeatable(tween(6000, easing = LinearEasing)), "rvs")
    val bob by t.animateFloat(0f, -4f, infiniteRepeatable(tween(3600, easing = FastOutSlowInEasing), RepeatMode.Reverse), "rvb")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val cx = 100f*u; val cy = 100f*u
        glow(cx, cy, 62f*u, palette.primary, 0.3f)
        // Dashed ring (approximate with arc)
        val sweep = 300f
        drawArc(color = palette.primary.copy(alpha = 0.4f), startAngle = spin, sweepAngle = sweep, useCenter = false, topLeft = Offset(26f*u, 26f*u), size = Size(148f*u, 148f*u), style = Stroke(1.5f*u))
        // File
        rr(palette.surface3, 70f*u, (60f+bob)*u, 60f*u, 80f*u, 6f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.6f), 80f*u, (88f+bob)*u, 40f*u, 4f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.4f), 80f*u, (98f+bob)*u, 32f*u, 4f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.4f), 80f*u, (108f+bob)*u, 36f*u, 4f*u, 2f*u)
        // Circular arrows (arc)
        drawArc(color = palette.primary, startAngle = spin + 270f, sweepAngle = 60f, useCenter = false, topLeft = Offset(30f*u, 30f*u), size = Size(140f*u, 140f*u), style = Stroke(3f*u))
    }
}

// ============================================================================
// WARNING — format not supported
// ============================================================================

@Composable
fun WarningVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "wv2")
    val pulse by t.animateFloat(0.9f, 1.1f, infiniteRepeatable(tween(1500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "wv2p")
    val warn = Color(0xFFFFCC80)
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        glow(100f*u, 100f*u, 64f*u, warn, 0.18f)
        rr(warn, 60f*u, 52f*u, 80f*u, 104f*u, 6f*u, 2f*u)
        rr(warn.copy(alpha = 0.5f), 74f*u, 88f*u, 52f*u, 4f*u, 2f*u)
        rr(warn.copy(alpha = 0.4f), 74f*u, 100f*u, 40f*u, 4f*u, 2f*u)
        // Warning badge (triangle)
        val bx = 140f*u; val by = 140f*u; val bs = 20f*u * pulse
        val tp = Path().apply { moveTo(bx, by - bs); lineTo(bx + bs*1.5f, by + bs); lineTo(bx - bs*1.5f, by + bs); close() }
        drawPath(tp, warn)
        drawLine(palette.background, Offset(bx, by - bs*0.3f), Offset(bx, by + bs*0.3f), 3f*u)
        drawCircle(palette.background, 2f*u, Offset(bx, by + bs*0.55f))
    }
}

// ============================================================================
// PROCESSING — file parsing
// ============================================================================

@Composable
fun ProcessingVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "pv")
    val spin by t.animateFloat(0f, 360f, infiniteRepeatable(tween(4000, easing = LinearEasing)), "pvs")
    val glowA by t.animateFloat(0.25f, 0.45f, infiniteRepeatable(tween(2000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "pvg")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        drawCircle(palette.primary.copy(alpha = glowA), 60f*u, Offset(100f*u, 100f*u))
        drawArc(color = palette.primary.copy(alpha = 0.5f), startAngle = spin, sweepAngle = 300f, useCenter = false, topLeft = Offset(24f*u, 24f*u), size = Size(152f*u, 152f*u), style = Stroke(2f*u))
        rr(palette.surface3, 68f*u, 76f*u, 64f*u, 56f*u, 6f*u, 1.5f*u)
        rr(palette.primary.copy(alpha = 0.8f), 76f*u, 90f*u, 48f*u, 4f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.6f), 76f*u, 102f*u, 40f*u, 4f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.6f), 76f*u, 114f*u, 44f*u, 4f*u, 2f*u)
        rr(palette.primary.copy(alpha = 0.5f), 76f*u, 126f*u, 36f*u, 4f*u, 2f*u)
    }
}

// ============================================================================
// CLIPBOARD — backup summary
// ============================================================================

@Composable
fun ClipboardVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "cv")
    val float by t.animateFloat(0f, -4f, infiniteRepeatable(tween(3600, easing = FastOutSlowInEasing), RepeatMode.Reverse), "cvf")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        glow(100f*u, (100f+float)*u, 54f*u, palette.primary, 0.22f)
        rr(palette.surface3, 62f*u, (58f+float)*u, 76f*u, 96f*u, 10f*u, 2f*u)
        rr(palette.primary, 84f*u, (52f+float)*u, 32f*u, 12f*u, 4f*u)
        rr(palette.primary.copy(alpha = 0.55f), 74f*u, (84f+float)*u, 24f*u, 6f*u, 3f*u)
        rr(palette.primary.copy(alpha = 0.35f), 74f*u, (98f+float)*u, 40f*u, 6f*u, 3f*u)
        rr(palette.primary.copy(alpha = 0.35f), 74f*u, (112f+float)*u, 40f*u, 6f*u, 3f*u)
        drawCircle(palette.primary, 14f*u, Offset(134f*u, (138f+float)*u))
        drawLine(palette.background, Offset(127f*u, (138f+float)*u), Offset(132f*u, (143f+float)*u), 3f*u)
        drawLine(palette.background, Offset(132f*u, (143f+float)*u), Offset(142f*u, (132f+float)*u), 3f*u)
    }
}

// ============================================================================
// RESTORE PROCESSING — card → library
// ============================================================================

@Composable
fun RestoreProcessingVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "rpv")
    val spin by t.animateFloat(0f, 360f, infiniteRepeatable(tween(4000, easing = LinearEasing)), "rpvs")
    val glowA by t.animateFloat(0.25f, 0.45f, infiniteRepeatable(tween(2400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "rpvg")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        drawCircle(palette.primary.copy(alpha = glowA), 60f*u, Offset(100f*u, 100f*u))
        drawArc(color = palette.primary.copy(alpha = 0.5f), startAngle = spin, sweepAngle = 300f, useCenter = false, topLeft = Offset(24f*u, 24f*u), size = Size(152f*u, 152f*u), style = Stroke(2f*u))
        // Source card
        rr(palette.surface3, 40f*u, 50f*u, 44f*u, 60f*u, 6f*u, 1.5f*u)
        rr(palette.primary.copy(alpha = 0.5f), 46f*u, 56f*u, 32f*u, 22f*u, 3f*u)
        // Flowing particles
        repeat(4) { i -> drawCircle(palette.primary, 3f*u, Offset((60f + i * 12f)*u, 80f*u)) }
        // Library folder
        rr(palette.primaryContainer, 112f*u, 100f*u, 56f*u, 44f*u, 4f*u, 1.5f*u)
        drawLine(palette.primary, Offset(120f*u, 132f*u), Offset(160f*u, 132f*u), 3f*u)
        // Check
        drawCircle(palette.primary, 9f*u, Offset(158f*u, 118f*u))
        drawLine(palette.background, Offset(153f*u, 118f*u), Offset(156.5f*u, 121.5f*u), 2.2f*u)
        drawLine(palette.background, Offset(156.5f*u, 121.5f*u), Offset(162f*u, 116f*u), 2.2f*u)
    }
}

// ============================================================================
// DATABASE — restore success
// ============================================================================

@Composable
fun DatabaseVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "dbv")
    val float by t.animateFloat(0f, -5f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), "dbvf")
    val checkA by t.animateFloat(0f, 1f, infiniteRepeatable(tween(2000, delayMillis = 1400), RepeatMode.Restart), "dbvc")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        val fy = (100f + float) * u
        glow(100f*u, fy, 62f*u, palette.primary, 0.25f)
        // Database cylinder top
        drawOval(palette.primaryContainer, Offset(56f*u, (44f+float)*u), Size(88f*u, 24f*u))
        drawOval(palette.primary, Offset(56f*u, (44f+float)*u), Size(88f*u, 24f*u), style = Stroke(2.5f*u))
        // Body
        drawRect(palette.primaryContainer, Offset(56f*u, (56f+float)*u), Size(88f*u, 76f*u))
        drawLine(palette.primary, Offset(56f*u, (56f+float)*u), Offset(56f*u, (132f+float)*u), 2.5f*u)
        drawLine(palette.primary, Offset(144f*u, (56f+float)*u), Offset(144f*u, (132f+float)*u), 2.5f*u)
        drawArc(color = palette.primary, startAngle = 0f, sweepAngle = 180f, useCenter = false, topLeft = Offset(56f*u, (108f+float)*u), size = Size(88f*u, 48f*u), style = Stroke(2.5f*u))
        // Rings
        drawOval(palette.primary.copy(alpha = 0.5f), Offset(56f*u, (66f+float)*u), Size(88f*u, 24f*u), style = Stroke(1.5f*u))
        drawOval(palette.primary.copy(alpha = 0.4f), Offset(56f*u, (88f+float)*u), Size(88f*u, 24f*u), style = Stroke(1.5f*u))
        // Flowing particles
        repeat(5) { i -> drawCircle(if (i % 2 == 0) palette.primary else palette.primary.copy(alpha = 0.5f), 3f*u, Offset((80f + i * 10f)*u, 100f*u)) }
        // Check badge
        drawCircle(palette.primary, 22f*u, Offset(142f*u, (58f+float)*u))
        if (checkA > 0f) {
            drawLine(palette.onPrimary, Offset(132f*u, (58f+float)*u), Offset(139f*u, (65f+float)*u), 4f*u)
            drawLine(palette.onPrimary, Offset(139f*u, (65f+float)*u), Offset(153f*u, (51f+float)*u), 4f*u)
        }
    }
}

// ============================================================================
// POISON BOTTLE — with bubbles + skull
// ============================================================================

@Composable
fun PoisonBottleVisual(palette: WizardPalette, idx: Int = 0, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "pbv-$idx")
    val bubbles = listOf(
        t.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 0), RepeatMode.Restart), "pb1-$idx"),
        t.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 800), RepeatMode.Restart), "pb2-$idx"),
        t.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 1600), RepeatMode.Restart), "pb3-$idx"),
        t.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 2400), RepeatMode.Restart), "pb4-$idx"),
    )
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 140f
        val cx = 50f * u
        // Bottle body
        rr(palette.primaryContainer, cx - 20f*u, 30f*u, 40f*u, 90f*u, 12f*u)
        rr(palette.primary, cx - 20f*u, 30f*u, 40f*u, 90f*u, 12f*u, 2.5f*u)
        // Neck + cap
        rr(palette.surface4, cx - 12f*u, 14f*u, 24f*u, 18f*u, 2f*u)
        rr(palette.primary, cx - 14f*u, 8f*u, 28f*u, 8f*u, 2f*u)
        // Liquid
        drawRect(palette.primary.copy(alpha = 0.55f), Offset(cx - 20f*u, 72f*u), Size(40f*u, 48f*u))
        // Liquid wave
        val wp = Path().apply {
            moveTo(cx - 20f*u, 72f*u)
            quadraticTo(cx - 10f*u, 68f*u, cx, 72f*u)
            quadraticTo(cx + 10f*u, 76f*u, cx + 20f*u, 72f*u)
            lineTo(cx + 20f*u, 78f*u); lineTo(cx - 20f*u, 78f*u); close()
        }
        drawPath(wp, palette.primary.copy(alpha = 0.75f))
        // Bubbles
        bubbles.forEachIndexed { i, b ->
            val p = b.value
            if (p < 0.88f) {
                val y = (118f - p * 100f) * u
                val bs = if (p < 0.72f) 3f*u else (3f + (p - 0.72f) * 25f) * u
                val alpha = if (p < 0.1f) p * 9f else if (p < 0.72f) 0.9f else maxOf(0f, 0.9f - (p - 0.72f) * 8f)
                val x = when (i) { 0 -> cx - 8f*u; 1 -> cx + 6f*u; 2 -> cx - 2f*u; 3 -> cx + 8f*u; else -> cx }
                drawCircle(Color.White.copy(alpha = alpha), bs, Offset(x, y))
            }
        }
        // Label
        rr(palette.background.copy(alpha = 0.94f), cx - 16f*u, 74f*u, 32f*u, 38f*u, 3f*u)
        // Crossed bones
        drawLine(palette.primary, Offset(cx - 10f*u, 106f*u), Offset(cx + 10f*u, 82f*u), 2.5f*u)
        drawLine(palette.primary, Offset(cx + 10f*u, 106f*u), Offset(cx - 10f*u, 82f*u), 2.5f*u)
        drawCircle(palette.primary, 2.5f*u, Offset(cx - 10f*u, 106f*u))
        drawCircle(palette.primary, 2.5f*u, Offset(cx + 10f*u, 82f*u))
        drawCircle(palette.primary, 2.5f*u, Offset(cx + 10f*u, 106f*u))
        drawCircle(palette.primary, 2.5f*u, Offset(cx - 10f*u, 82f*u))
        // Skull
        drawCircle(palette.primary, 8f*u, Offset(cx, 92f*u))
        rr(palette.primary, cx - 6f*u, 99f*u, 12f*u, 6f*u, 2f*u)
        drawCircle(palette.background, 2f*u, Offset(cx - 3f*u, 91f*u))
        drawCircle(palette.background, 2f*u, Offset(cx + 3f*u, 91f*u))
    }
}

// ============================================================================
// POISON PILL — capsule with plus
// ============================================================================

@Composable
fun PoisonPillVisual(palette: WizardPalette, idx: Int = 0, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "ppv-$idx")
    val rot by t.animateFloat(-8f, 8f, infiniteRepeatable(tween(4000 + idx * 500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "ppr-$idx")
    Canvas(modifier.fillMaxSize()) {
        val w = size.width; val h = size.height
        val pillW = minOf(100.dp.toPx(), w * 0.7f)
        val pillH = minOf(42.dp.toPx(), h * 0.3f)
        val cx = w / 2f; val cy = h / 2f
        val r = pillH / 2f
        // Left half (red) — rounded left + rect to center
        drawCircle(palette.primary, r, Offset(cx - pillW/2 + r, cy))
        drawRect(palette.primary, Offset(cx - pillW/2 + r, cy - r), Size(pillW/2 - r, pillH))
        // Right half (dark) — rounded right + rect from center
        drawRect(palette.surface5, Offset(cx, cy - r), Size(pillW/2 - r, pillH))
        drawCircle(palette.surface5, r, Offset(cx + pillW/2 - r, cy))
        // Plus on red half
        val plusCx = cx - pillW / 4f
        drawLine(palette.onPrimary, Offset(plusCx, cy - 8.dp.toPx()), Offset(plusCx, cy + 8.dp.toPx()), 3.dp.toPx())
        drawLine(palette.onPrimary, Offset(plusCx - 8.dp.toPx(), cy), Offset(plusCx + 8.dp.toPx(), cy), 3.dp.toPx())
    }
}

// ============================================================================
// FINISH — check badge + sparkles
// ============================================================================

@Composable
fun FinishVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val t = rememberInfiniteTransition(label = "fv2")
    val pulse by t.animateFloat(1f, 1.05f, infiniteRepeatable(tween(2600, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fv2p")
    val glowA by t.animateFloat(0.3f, 0.5f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Reverse), "fv2g")
    Canvas(modifier.fillMaxSize()) {
        val u = minOf(size.width, size.height) / 200f
        drawCircle(palette.primary.copy(alpha = glowA), 60f*u, Offset(100f*u, 100f*u))
        drawCircle(palette.primary, (40f * pulse)*u, Offset(100f*u, 100f*u))
        drawLine(palette.onPrimary, Offset(82f*u, 100f*u), Offset(94f*u, 113f*u), 6f*u)
        drawLine(palette.onPrimary, Offset(94f*u, 113f*u), Offset(120f*u, 87f*u), 6f*u)
        // Sparkles
        drawCircle(palette.primary, 2.5f*u, Offset(50f*u, 60f*u))
        drawCircle(palette.primary, 2f*u, Offset(152f*u, 58f*u))
        drawCircle(palette.primary, 2.2f*u, Offset(156f*u, 140f*u))
        drawCircle(palette.primary, 1.8f*u, Offset(46f*u, 142f*u))
    }
}
