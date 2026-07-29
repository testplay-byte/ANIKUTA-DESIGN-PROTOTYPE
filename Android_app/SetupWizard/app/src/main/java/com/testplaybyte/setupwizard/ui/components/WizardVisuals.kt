package com.testplaybyte.setupwizard.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.geometry.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.*
import androidx.compose.ui.unit.dp
import com.testplaybyte.setupwizard.ui.theme.WizardPalette

// ============================================================================
// SHARED HELPERS
// ============================================================================

private fun DrawScope.glow(center: Offset, radius: Float, color: Color, alpha: Float = 0.25f) {
    drawCircle(color = color.copy(alpha = alpha), radius = radius, center = center)
}

// ============================================================================
// WELCOME — play mark
// ============================================================================

@Composable
fun WelcomeVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "welcome")
    val scale by transition.animateFloat(0.96f, 1.04f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "scale")
    Canvas(modifier.fillMaxSize()) {
        val c = center
        glow(c, 62f, palette.primary, 0.3f)
        scale(scale) {
            // rounded square badge
            drawRoundRect(color = palette.primary, size = Size(84.dp.toPx(), 84.dp.toPx()), cornerRadius = CornerRadius(22.dp.toPx()), topLeft = Offset(c.x - 42.dp.toPx(), c.y - 42.dp.toPx()))
            // play triangle
            val path = Path().apply {
                moveTo(c.x - 8.dp.toPx(), c.y - 16.dp.toPx())
                lineTo(c.x - 8.dp.toPx(), c.y + 16.dp.toPx())
                lineTo(c.x + 18.dp.toPx(), c.y)
                close()
            }
            drawPath(path, color = palette.onPrimary)
        }
    }
}

// ============================================================================
// FOLDER — open folder with floating files
// ============================================================================

@Composable
fun FolderVisual(palette: WizardPalette, selected: Boolean = false, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "folder")
    val bob by transition.animateFloat(-4f, 0f, infiniteRepeatable(tween(3600, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "bob")
    Canvas(modifier.fillMaxSize()) {
        val w = size.width
        val h = size.height
        val s = minOf(w, h) / 200f
        scale(s, pivot = center) {
            val cx = 100f
            // glow
            glow(Offset(cx, 140f), 60f, palette.primary, 0.2f)
            // folder + files
            translate(top = bob) {
                // Back lid
                drawRoundRect(color = palette.surface4, size = Size(118f, 28f), cornerRadius = CornerRadius(8f), topLeft = Offset(40f, 88f))
                drawLine(palette.primary, Offset(40f, 88f), Offset(40f, 116f), 2f)
                drawLine(palette.primary, Offset(158f, 88f), Offset(158f, 116f), 2f)
                // Files (short, floating)
                val file1Y = 56f + bob * 0.5f
                drawRoundRect(color = palette.surface5, size = Size(28f, 34f), cornerRadius = CornerRadius(3f), topLeft = Offset(56f, file1Y), style = Stroke(1.3f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.55f), size = Size(28f, 10f), cornerRadius = CornerRadius(3f), topLeft = Offset(56f, file1Y))
                val file2Y = 50f + bob * 0.6f
                drawRoundRect(color = palette.surface4, size = Size(28f, 40f), cornerRadius = CornerRadius(3f), topLeft = Offset(86f, file2Y), style = Stroke(1.3f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.5f), size = Size(28f, 10f), cornerRadius = CornerRadius(3f), topLeft = Offset(86f, file2Y))
                val file3Y = 56f + bob * 0.4f
                drawRoundRect(color = palette.surface3, size = Size(28f, 34f), cornerRadius = CornerRadius(3f), topLeft = Offset(116f, file3Y), style = Stroke(1.3f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.45f), size = Size(28f, 10f), cornerRadius = CornerRadius(3f), topLeft = Offset(116f, file3Y))
                // Front pocket (gradient via layered rects)
                drawRoundRect(color = palette.surface3, size = Size(124f, 58f), cornerRadius = CornerRadius(8f), topLeft = Offset(38f, 116f))
                drawRoundRect(color = palette.surface5, size = Size(124f, 58f), cornerRadius = CornerRadius(8f), topLeft = Offset(38f, 116f), style = Stroke(2.2f))
                // content lines
                drawRoundRect(color = palette.primary.copy(alpha = 0.35f), size = Size(92f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(54f, 134f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.25f), size = Size(72f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(54f, 148f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.25f), size = Size(82f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(54f, 162f))
                // selected badge
                if (selected) {
                    drawCircle(palette.primary, 20f, Offset(150f, 92f))
                    drawLine(palette.background, Offset(141f, 92f), Offset(148f, 99f), 3.5f)
                    drawLine(palette.background, Offset(148f, 99f), Offset(160f, 85f), 3.5f)
                }
            }
        }
    }
}

// ============================================================================
// SHIELD — permissions
// ============================================================================

@Composable
fun ShieldVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "shield")
    val float by transition.animateFloat(0f, -4f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "float")
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            glow(Offset(100f, 100f + float), 52f, palette.primary, 0.22f)
            translate(top = float) {
                // Shield
                val path = Path().apply {
                    moveTo(100f, 56f); lineTo(138f, 70f); lineTo(138f, 104f)
                    quadraticTo(138f, 134f, 100f, 150f)
                    quadraticTo(62f, 134f, 62f, 104f)
                    lineTo(62f, 70f); close()
                }
                drawPath(path, color = palette.primaryContainer)
                drawPath(path, color = palette.primary, style = Stroke(2.5f))
                // Check
                drawLine(palette.primary, Offset(84f, 100f), Offset(95f, 112f), 5f)
                drawLine(palette.primary, Offset(95f, 112f), Offset(118f, 88f), 5f)
            }
        }
    }
}

// ============================================================================
// RESTORE — file + circular arrows
// ============================================================================

@Composable
fun RestoreVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "restore")
    val spin by transition.animateFloat(0f, 360f, infiniteRepeatable(tween(6000, easing = LinearEasing)), label = "spin")
    val bob by transition.animateFloat(0f, -4f, infiniteRepeatable(tween(3600, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "bob")
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            glow(Offset(100f, 100f), 62f, palette.primary, 0.3f)
            // Dashed ring
            rotate(spin, Offset(100f, 100f)) {
                drawArc(color = palette.primary.copy(alpha = 0.4f), startAngle = 0f, sweepAngle = 300f, useCenter = false, style = Stroke(1.5f), topLeft = Offset(26f, 26f), size = Size(148f, 148f))
            }
            // File
            translate(top = bob) {
                drawRoundRect(color = palette.surface3, size = Size(60f, 80f), cornerRadius = CornerRadius(6f), topLeft = Offset(70f, 60f), style = Stroke(2f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.6f), size = Size(40f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(80f, 88f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.4f), size = Size(32f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(80f, 98f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.4f), size = Size(36f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(80f, 108f))
            }
            // Circular arrows
            rotate(spin, Offset(100f, 100f)) {
                drawArc(color = palette.primary, startAngle = 270f, sweepAngle = 60f, useCenter = false, style = Stroke(3f), topLeft = Offset(30f, 30f), size = Size(140f, 140f))
            }
        }
    }
}

// ============================================================================
// WARNING — format not supported
// ============================================================================

@Composable
fun WarningVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "warn")
    val pulse by transition.animateFloat(0.9f, 1.1f, infiniteRepeatable(tween(1500, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "pulse")
    val warn = Color(0xFFFFCC80)
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            glow(Offset(100f, 100f), 64f, warn, 0.18f)
            // File
            drawRoundRect(color = palette.surface3, size = Size(80f, 104f), cornerRadius = CornerRadius(6f), topLeft = Offset(60f, 52f), style = Stroke(2f, color = warn))
            drawRoundRect(color = warn.copy(alpha = 0.5f), size = Size(52f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(74f, 88f))
            drawRoundRect(color = warn.copy(alpha = 0.4f), size = Size(40f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(74f, 100f))
            // Warning badge
            scale(pulse, Offset(140f, 140f)) {
                val path = Path().apply { moveTo(140f, 118f); lineTo(162f, 158f); lineTo(118f, 158f); close() }
                drawPath(path, color = warn)
                drawLine(palette.background, Offset(140f, 132f), Offset(140f, 146f), 3f)
                drawCircle(palette.background, 2f, Offset(140f, 153f))
            }
        }
    }
}

// ============================================================================
// PROCESSING — file parsing
// ============================================================================

@Composable
fun ProcessingVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "proc")
    val spin by transition.animateFloat(0f, 360f, infiniteRepeatable(tween(4000, easing = LinearEasing)), label = "spin")
    val glowA by transition.animateFloat(0.25f, 0.45f, infiniteRepeatable(tween(2000, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "glow")
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            drawCircle(color = palette.primary.copy(alpha = glowA), radius = 60f, center = Offset(100f, 100f))
            rotate(spin, Offset(100f, 100f)) { drawArc(color = palette.primary.copy(alpha = 0.5f), 0f, 300f, false, Stroke(2f), Offset(24f, 24f), Size(152f, 152f)) }
            // File + rows
            drawRoundRect(color = palette.surface3, size = Size(64f, 56f), cornerRadius = CornerRadius(6f), topLeft = Offset(68f, 76f), style = Stroke(1.5f))
            drawRoundRect(color = palette.primary.copy(alpha = 0.8f), size = Size(48f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(76f, 90f))
            drawRoundRect(color = palette.primary.copy(alpha = 0.6f), size = Size(40f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(76f, 102f))
            drawRoundRect(color = palette.primary.copy(alpha = 0.6f), size = Size(44f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(76f, 114f))
            drawRoundRect(color = palette.primary.copy(alpha = 0.5f), size = Size(36f, 4f), cornerRadius = CornerRadius(2f), topLeft = Offset(76f, 126f))
        }
    }
}

// ============================================================================
// CLIPBOARD — backup summary
// ============================================================================

@Composable
fun ClipboardVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "clip")
    val float by transition.animateFloat(0f, -4f, infiniteRepeatable(tween(3600, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "float")
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            glow(Offset(100f, 100f + float), 54f, palette.primary, 0.22f)
            translate(top = float) {
                drawRoundRect(color = palette.surface3, size = Size(76f, 96f), cornerRadius = CornerRadius(10f), topLeft = Offset(62f, 58f), style = Stroke(2f))
                drawRoundRect(color = palette.primary, size = Size(32f, 12f), cornerRadius = CornerRadius(4f), topLeft = Offset(84f, 52f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.55f), size = Size(24f, 6f), cornerRadius = CornerRadius(3f), topLeft = Offset(74f, 84f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.35f), size = Size(40f, 6f), cornerRadius = CornerRadius(3f), topLeft = Offset(74f, 98f))
                drawRoundRect(color = palette.primary.copy(alpha = 0.35f), size = Size(40f, 6f), cornerRadius = CornerRadius(3f), topLeft = Offset(74f, 112f))
                drawCircle(palette.primary, 14f, Offset(134f, 138f))
                drawLine(palette.background, Offset(127f, 138f), Offset(132f, 143f), 3f)
                drawLine(palette.background, Offset(132f, 143f), Offset(142f, 132f), 3f)
            }
        }
    }
}

// ============================================================================
// RESTORE PROCESSING — card → library
// ============================================================================

@Composable
fun RestoreProcessingVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "rproc")
    val spin by transition.animateFloat(0f, 360f, infiniteRepeatable(tween(4000, easing = LinearEasing)), label = "spin")
    val glowA by transition.animateFloat(0.25f, 0.45f, infiniteRepeatable(tween(2400, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "glow")
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            drawCircle(color = palette.primary.copy(alpha = glowA), radius = 60f, center = Offset(100f, 100f))
            rotate(spin, Offset(100f, 100f)) { drawArc(color = palette.primary.copy(alpha = 0.5f), 0f, 300f, false, Stroke(2f), Offset(24f, 24f), Size(152f, 152f)) }
            // Source card
            drawRoundRect(color = palette.surface3, size = Size(44f, 60f), cornerRadius = CornerRadius(6f), topLeft = Offset(40f, 50f), style = Stroke(1.5f))
            drawRoundRect(color = palette.primary.copy(alpha = 0.5f), size = Size(32f, 22f), cornerRadius = CornerRadius(3f), topLeft = Offset(46f, 56f))
            // Flowing particles
            repeat(4) { i -> drawCircle(palette.primary, 3f, Offset(60f + i * 12f, 80f)) }
            // Library folder
            drawRoundRect(color = palette.primaryContainer, size = Size(56f, 44f), cornerRadius = CornerRadius(4f), topLeft = Offset(112f, 100f), style = Stroke(1.5f))
            drawLine(palette.primary, Offset(120f, 132f), Offset(160f, 132f), 3f)
            // Check
            drawCircle(palette.primary, 9f, Offset(158f, 118f))
            drawLine(palette.background, Offset(153f, 118f), Offset(156.5f, 121.5f), 2.2f)
            drawLine(palette.background, Offset(156.5f, 121.5f), Offset(162f, 116f), 2.2f)
        }
    }
}

// ============================================================================
// DATABASE — restore success
// ============================================================================

@Composable
fun DatabaseVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "db")
    val float by transition.animateFloat(0f, -5f, infiniteRepeatable(tween(3400, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "float")
    val checkA by transition.animateFloat(0f, 1f, tween(1200, delayMillis = 1400), label = "check")
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            glow(Offset(100f, 100f + float), 62f, palette.primary, 0.25f)
            translate(top = float) {
                // Database cylinder top
                drawOval(color = palette.primaryContainer, size = Size(88f, 24f), topLeft = Offset(56f, 44f))
                drawOval(color = palette.primary, size = Size(88f, 24f), topLeft = Offset(56f, 44f), style = Stroke(2.5f))
                // Body
                drawRect(color = palette.primaryContainer, topLeft = Offset(56f, 56f), size = Size(88f, 76f))
                drawLine(palette.primary, Offset(56f, 56f), Offset(56f, 132f), 2.5f)
                drawLine(palette.primary, Offset(144f, 56f), Offset(144f, 132f), 2.5f)
                drawArc(color = palette.primary, 0f, 180f, false, Stroke(2.5f), Offset(56f, 108f), Size(88f, 48f))
                // Rings
                drawOval(color = palette.primary.copy(alpha = 0.5f), size = Size(88f, 24f), topLeft = Offset(56f, 66f), style = Stroke(1.5f))
                drawOval(color = palette.primary.copy(alpha = 0.4f), size = Size(88f, 24f), topLeft = Offset(56f, 88f), style = Stroke(1.5f))
                // Flowing particles
                repeat(5) { i -> drawCircle(if (i % 2 == 0) palette.primary else palette.primary.copy(alpha = 0.5f), 3f, Offset(80f + i * 10f, 100f)) }
                // Check badge
                drawCircle(palette.primary, 22f, Offset(142f, 58f))
                if (checkA > 0) {
                    drawLine(palette.onPrimary, Offset(132f, 58f), Offset(139f, 65f), 4f)
                    drawLine(palette.onPrimary, Offset(139f, 65f), Offset(153f, 51f), 4f)
                }
            }
        }
    }
}

// ============================================================================
// POISON BOTTLE — with bubbles + skull
// ============================================================================

@Composable
fun PoisonBottleVisual(palette: WizardPalette, idx: Int = 0, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "bottle-$idx")
    val bubbles = listOf(
        transition.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 0), RepeatMode.Restart), "b1-$idx"),
        transition.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 800), RepeatMode.Restart), "b2-$idx"),
        transition.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 1600), RepeatMode.Restart), "b3-$idx"),
        transition.animateFloat(0f, 1f, infiniteRepeatable(tween(3200, delayMillis = 2400), RepeatMode.Restart), "b4-$idx"),
    )
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 140f
        scale(s, pivot = center) {
            val cx = 50f
            // Bottle body
            drawRoundRect(color = palette.primaryContainer, size = Size(40f, 90f), cornerRadius = CornerRadius(12f), topLeft = Offset(cx - 20f, 30f))
            drawRoundRect(color = palette.primary, size = Size(40f, 90f), cornerRadius = CornerRadius(12f), topLeft = Offset(cx - 20f, 30f), style = Stroke(2.5f))
            // Neck + cap
            drawRoundRect(color = palette.surface4, size = Size(24f, 18f), cornerRadius = CornerRadius(2f), topLeft = Offset(cx - 12f, 14f))
            drawRoundRect(color = palette.primary, size = Size(28f, 8f), cornerRadius = CornerRadius(2f), topLeft = Offset(cx - 14f, 8f))
            // Liquid
            drawRect(color = palette.primary.copy(alpha = 0.55f), topLeft = Offset(cx - 20f, 72f), size = Size(40f, 48f))
            // Liquid wave
            val wavePath = Path().apply {
                moveTo(cx - 20f, 72f)
                quadraticTo(cx - 10f, 68f, cx, 72f)
                quadraticTo(cx + 10f, 76f, cx + 20f, 72f)
                lineTo(cx + 20f, 78f); lineTo(cx - 20f, 78f); close()
            }
            drawPath(wavePath, color = palette.primary.copy(alpha = 0.75f))
            // Bubbles (rise from liquid to cap, then pop)
            bubbles.forEachIndexed { i, b ->
                val p = b.value
                if (p < 0.88f) {
                    val y = 118f - p * 100f
                    val bubbleSize = if (p < 0.72f) 3f else 3f + (p - 0.72f) * 25f
                    val alpha = if (p < 0.1f) p * 9f else if (p < 0.72f) 0.9f else 0.9f - (p - 0.72f) * 8f
                    val x = when (i) { 0 -> cx - 8f; 1 -> cx + 6f; 2 -> cx - 2f; 3 -> cx + 8f }
                    drawCircle(color = Color.White.copy(alpha = maxOf(0f, alpha)), radius = bubbleSize, center = Offset(x, y))
                }
            }
            // Label
            drawRoundRect(color = palette.background.copy(alpha = 0.94f), size = Size(32f, 38f), cornerRadius = CornerRadius(3f), topLeft = Offset(cx - 16f, 74f))
            // Crossed bones
            drawLine(palette.primary, Offset(cx - 10f, 106f), Offset(cx + 10f, 82f), 2.5f)
            drawLine(palette.primary, Offset(cx + 10f, 106f), Offset(cx - 10f, 82f), 2.5f)
            drawCircle(palette.primary, 2.5f, Offset(cx - 10f, 106f))
            drawCircle(palette.primary, 2.5f, Offset(cx + 10f, 82f))
            drawCircle(palette.primary, 2.5f, Offset(cx + 10f, 106f))
            drawCircle(palette.primary, 2.5f, Offset(cx - 10f, 82f))
            // Skull
            drawCircle(palette.primary, 8f, Offset(cx, 92f))
            drawRoundRect(color = palette.primary, size = Size(12f, 6f), cornerRadius = CornerRadius(2f), topLeft = Offset(cx - 6f, 99f))
            drawCircle(color = palette.background, radius = 2f, center = Offset(cx - 3f, 91f))
            drawCircle(color = palette.background, radius = 2f, center = Offset(cx + 3f, 91f))
        }
    }
}

// ============================================================================
// POISON PILL — capsule with plus
// ============================================================================

@Composable
fun PoisonPillVisual(palette: WizardPalette, idx: Int = 0, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "pill-$idx")
    val rotate by transition.animateFloat(-8f, 8f, infiniteRepeatable(tween(4000 + idx * 500, easing = FastOutSlowInEasing), RepeatMode.Reverse), "prot-$idx")
    Canvas(modifier.fillMaxSize()) {
        val w = size.width
        val h = size.height
        val pillW = 100.dp.toPx().coerceAtMost(w * 0.7f)
        val pillH = 42.dp.toPx().coerceAtMost(h * 0.3f)
        val cx = w / 2f
        val cy = h / 2f
        rotate(rotate, Offset(cx, cy)) {
            // Left half (red)
            drawRoundRect(color = palette.primary, size = Size(pillW / 2f, pillH), cornerRadius = CornerRadius(pillH / 2f, pillH / 2f), topLeft = Offset(cx - pillW / 2f, cy - pillH / 2f))
            // Right half (dark)
            drawRoundRect(color = palette.surface5, size = Size(pillW / 2f, pillH), cornerRadius = CornerRadius(pillH / 2f, pillH / 2f), topLeft = Offset(cx, cy - pillH / 2f))
            // Plus on red half
            val plusCx = cx - pillW / 4f
            drawLine(palette.onPrimary, Offset(plusCx, cy - 8.dp.toPx()), Offset(plusCx, cy + 8.dp.toPx()), 3.dp.toPx())
            drawLine(palette.onPrimary, Offset(plusCx - 8.dp.toPx(), cy), Offset(plusCx + 8.dp.toPx(), cy), 3.dp.toPx())
        }
    }
}

// ============================================================================
// FINISH — check badge + sparkles
// ============================================================================

@Composable
fun FinishVisual(palette: WizardPalette, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "finish")
    val pulse by transition.animateFloat(1f, 1.05f, infiniteRepeatable(tween(2600, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "pulse")
    val glowA by transition.animateFloat(0.3f, 0.5f, infiniteRepeatable(tween(3000, easing = FastOutSlowInEasing), RepeatMode.Reverse), label = "glow")
    val ringA by transition.animateFloat(0.6f, 0f, infiniteRepeatable(tween(2800, easing = FastOutSlowInEasing), RepeatMode.Restart), label = "ring")
    Canvas(modifier.fillMaxSize()) {
        val s = minOf(size.width, size.height) / 200f
        scale(s, pivot = center) {
            drawCircle(color = palette.primary.copy(alpha = glowA), radius = 60f, center = Offset(100f, 100f))
            // Expanding ring
            if (ringA > 0.1f) drawCircle(color = palette.primary.copy(alpha = ringA * 0.5f), radius = 42f + (1f - ringA) * 30f, center = Offset(100f, 100f), style = Stroke(2.5f))
            scale(pulse, Offset(100f, 100f)) {
                drawCircle(palette.primary, 40f, Offset(100f, 100f))
                drawLine(palette.onPrimary, Offset(82f, 100f), Offset(94f, 113f), 6f)
                drawLine(palette.onPrimary, Offset(94f, 113f), Offset(120f, 87f), 6f)
            }
            // Sparkles
            listOf(Offset(50f, 60f) to 2.5f, Offset(152f, 58f) to 2f, Offset(156f, 140f) to 2.2f, Offset(46f, 142f) to 1.8f).forEachIndexed { i, (pos, r) ->
                drawCircle(palette.primary, r, pos)
            }
        }
    }
}
