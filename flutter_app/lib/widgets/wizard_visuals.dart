// wizard_visuals.dart — high-quality custom-painted animations (v2).
//
// Every visual is a self-contained StatefulWidget that takes the current
// palette colors so it adapts to the selected theme. All animations use
// built-in AnimationController + CustomPainter (zero extra dependencies).
// Each is wrapped in RepaintBoundary by the WizardScaffold for smoothness.

import 'dart:math' as math;
import 'package:flutter/material.dart';

// ============================================================================
// WELCOME — a glowing app logo with orbiting accent dots + gentle pulse
// Beautiful, calm, premium. A rounded-square "play" mark with a soft glow
// that breathes, and 3 small accent dots that slowly orbit around it.
// ============================================================================

class WelcomeVisual extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final Color surface;
  final double size;
  const WelcomeVisual({
    super.key,
    required this.primary,
    required this.onPrimary,
    this.surface = Colors.transparent,
    this.size = 170,
  });

  @override
  State<WelcomeVisual> createState() => _WelcomeVisualState();
}

class _WelcomeVisualState extends State<WelcomeVisual>
    with TickerProviderStateMixin {
  late final AnimationController _pulse;
  late final AnimationController _orbit;

  @override
  void initState() {
    super.initState();
    _pulse = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3200),
    )..repeat(reverse: true);
    _orbit = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 8000),
    )..repeat();
  }

  @override
  void dispose() {
    _pulse.dispose();
    _orbit.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: Listenable.merge([_pulse, _orbit]),
        builder: (context, _) {
          return CustomPaint(
            painter: _WelcomePainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              pulse: _pulse.value,
              orbit: _orbit.value,
            ),
          );
        },
      ),
    );
  }
}

class _WelcomePainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final double pulse; // 0..1 breathing
  final double orbit; // 0..1 rotating
  _WelcomePainter({
    required this.primary,
    required this.onPrimary,
    required this.pulse,
    required this.orbit,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;

    // Outer glow — breathes
    final glowR = s * (0.42 + 0.06 * pulse);
    final glowAlpha = 0.18 + 0.12 * pulse;
    final glowPaint = Paint()
      ..shader = RadialGradient(
        colors: [primary.withOpacity(glowAlpha), primary.withOpacity(0)],
      ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: glowR));
    canvas.drawCircle(Offset(cx, cy), glowR, glowPaint);

    // 3 orbiting accent dots
    for (int i = 0; i < 3; i++) {
      final angle = orbit * 2 * math.pi + (i * 2 * math.pi / 3);
      final orbR = s * 0.40;
      final dx = cx + orbR * math.cos(angle);
      final dy = cy + orbR * math.sin(angle);
      final dotR = s * 0.018;
      canvas.drawCircle(
          Offset(dx, dy), dotR, Paint()..color = primary.withOpacity(0.7));
    }

    // Main rounded-square logo — gentle scale pulse
    final logoScale = 0.94 + 0.06 * pulse;
    final logoSize = s * 0.40 * logoScale;
    final logoR = logoSize * 0.28;
    final logoPaint = Paint()..color = primary;
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
            center: Offset(cx, cy), width: logoSize, height: logoSize),
        Radius.circular(logoR),
      ),
      logoPaint,
    );

    // Play triangle inside
    final tri = Path()
      ..moveTo(cx - logoSize * 0.10, cy - logoSize * 0.20)
      ..lineTo(cx - logoSize * 0.10, cy + logoSize * 0.20)
      ..lineTo(cx + logoSize * 0.22, cy)
      ..close();
    canvas.drawPath(tri, Paint()..color = onPrimary);
  }

  @override
  bool shouldRepaint(covariant _WelcomePainter old) =>
      old.pulse != pulse || old.orbit != orbit || old.primary != primary;
}

// ============================================================================
// FOLDER — a highly detailed, beautiful open folder with floating file cards
// Minimalist yet detailed: gradient folder body, tab, inner content lines,
// 3 floating file cards above with subtle stagger, and a check badge on select.
// ============================================================================

class FolderVisual extends StatefulWidget {
  final Color primary;
  final Color surface3;
  final Color surface4;
  final Color surface5;
  final Color background;
  final bool selected;
  final double size;
  const FolderVisual({
    super.key,
    required this.primary,
    required this.surface3,
    required this.surface4,
    required this.surface5,
    required this.background,
    this.selected = false,
    this.size = 200,
  });

  @override
  State<FolderVisual> createState() => _FolderVisualState();
}

class _FolderVisualState extends State<FolderVisual>
    with TickerProviderStateMixin {
  late final AnimationController _float;

  @override
  void initState() {
    super.initState();
    _float = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _float.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _float,
        builder: (context, _) {
          return CustomPaint(
            painter: _FolderPainter(
              primary: widget.primary,
              surface3: widget.surface3,
              surface4: widget.surface4,
              surface5: widget.surface5,
              background: widget.background,
              selected: widget.selected,
              t: _float.value,
            ),
          );
        },
      ),
    );
  }
}

class _FolderPainter extends CustomPainter {
  final Color primary;
  final Color surface3;
  final Color surface4;
  final Color surface5;
  final Color background;
  final bool selected;
  final double t; // 0..1 float
  _FolderPainter({
    required this.primary,
    required this.surface3,
    required this.surface4,
    required this.surface5,
    required this.background,
    required this.selected,
    required this.t,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final u = size.width / 200;
    final cx = size.width / 2;
    final cy = size.height / 2;

    // Soft glow behind folder
    final glowPaint = Paint()
      ..shader = RadialGradient(
        colors: [primary.withOpacity(0.16), primary.withOpacity(0)],
      ).createShader(Rect.fromCircle(center: Offset(cx, cy + 20 * u), radius: 80 * u));
    canvas.drawCircle(Offset(cx, cy + 20 * u), 80 * u, glowPaint);

    // Floating offset (subtle up/down)
    final dy = (t - 0.5) * 6 * u;

    // --- 3 floating file cards above the folder (staggered) ---
    final fileW = 30 * u;
    final fileH = 38 * u;
    final fileR = 4 * u;
    for (int i = 0; i < 3; i++) {
      final fx = (62 + i * 38) * u;
      final fy = (52 + dy * (0.6 + i * 0.2) + i * 2) * u;
      // Card body with gradient
      final cardPaint = Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [surface5, surface4],
        ).createShader(Rect.fromLTWH(fx, fy, fileW, fileH));
      canvas.drawRRect(
        RRect.fromRectAndRadius(Rect.fromLTWH(fx, fy, fileW, fileH), Radius.circular(fileR)),
        cardPaint,
      );
      // Colored top strip
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(fx, fy, fileW, 9 * u),
          Radius.circular(fileR),
        ),
        Paint()..color = primary.withOpacity(0.55 - i * 0.08),
      );
      // Content lines on file
      for (int j = 0; j < 2; j++) {
        canvas.drawRect(
          Rect.fromLTWH(fx + 5 * u, fy + 14 * u + j * 7 * u, fileW - 10 * u, 2 * u),
          Paint()..color = primary.withOpacity(0.25),
        );
      }
    }

    // --- Folder back panel (the tab part) ---
    final backPath = Path()
      ..moveTo(36 * u, 88 * u + dy)
      ..lineTo(80 * u, 88 * u + dy)
      ..lineTo(88 * u, 80 * u + dy)
      ..lineTo(164 * u, 80 * u + dy)
      ..lineTo(164 * u, 116 * u + dy)
      ..lineTo(36 * u, 116 * u + dy)
      ..close();
    canvas.drawPath(backPath, Paint()..color = surface4);

    // --- Folder front pocket (gradient body) ---
    final frontPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [surface3, surface5],
      ).createShader(Rect.fromLTWH(32 * u, 110 * u + dy, 136 * u, 64 * u));
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(32 * u, 110 * u + dy, 136 * u, 64 * u),
        Radius.circular(10 * u),
      ),
      frontPaint,
    );

    // Subtle primary border on folder
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(32 * u, 110 * u + dy, 136 * u, 64 * u),
        Radius.circular(10 * u),
      ),
      Paint()
        ..color = primary.withOpacity(0.25)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.5 * u,
    );

    // Inner content lines on folder
    for (int i = 0; i < 3; i++) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(50 * u, (124 + i * 12) * u, 100 * u, 4 * u),
          Radius.circular(2 * u),
        ),
        Paint()..color = primary.withOpacity(0.30 - i * 0.06),
      );
    }

    // --- Selected check badge ---
    if (selected) {
      final badgeCx = 156 * u;
      final badgeCy = 102 * u + dy;
      final badgeR = 18 * u;
      // Badge glow
      canvas.drawCircle(
        Offset(badgeCx, badgeCy),
        badgeR + 4 * u,
        Paint()..color = primary.withOpacity(0.3),
      );
      // Badge circle
      canvas.drawCircle(
        Offset(badgeCx, badgeCy),
        badgeR,
        Paint()..color = primary,
      );
      // Check mark
      final checkPaint = Paint()
        ..color = background
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3 * u
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round;
      canvas.drawLine(
        Offset(badgeCx - 7 * u, badgeCy),
        Offset(badgeCx - 2 * u, badgeCy + 5 * u),
        checkPaint,
      );
      canvas.drawLine(
        Offset(badgeCx - 2 * u, badgeCy + 5 * u),
        Offset(badgeCx + 7 * u, badgeCy - 5 * u),
        checkPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _FolderPainter old) =>
      old.selected != selected || old.t != t || old.primary != primary;
}

// ============================================================================
// PERMISSIONS — a premium shield with a drawing check + gentle ripple
// ============================================================================

class PermissionsVisual extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final double size;
  const PermissionsVisual({
    super.key,
    required this.primary,
    required this.onPrimary,
    this.size = 150,
  });

  @override
  State<PermissionsVisual> createState() => _PermissionsVisualState();
}

class _PermissionsVisualState extends State<PermissionsVisual>
    with TickerProviderStateMixin {
  late final AnimationController _ripple;
  late final AnimationController _draw;

  @override
  void initState() {
    super.initState();
    _ripple = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2800),
    )..repeat();
    _draw = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _ripple.dispose();
    _draw.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: Listenable.merge([_ripple, _draw]),
        builder: (context, _) {
          return CustomPaint(
            painter: _ShieldPainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              ripple: _ripple.value,
              draw: _draw.value,
            ),
          );
        },
      ),
    );
  }
}

class _ShieldPainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final double ripple; // 0..1
  final double draw; // 0..1 check draw
  _ShieldPainter({
    required this.primary,
    required this.onPrimary,
    required this.ripple,
    required this.draw,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;

    // Expanding ripple rings
    for (int i = 0; i < 2; i++) {
      final phase = (ripple + i * 0.5) % 1.0;
      final r = s * (0.32 + 0.22 * phase);
      canvas.drawCircle(
        Offset(cx, cy),
        r,
        Paint()
          ..color = primary.withOpacity((1 - phase) * 0.20)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );
    }

    // Shield glow
    canvas.drawCircle(
      Offset(cx, cy),
      s * 0.38,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.15), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: s * 0.38)),
    );

    // Shield body
    final w = s * 0.40;
    final h = s * 0.48;
    final shieldPath = Path()
      ..moveTo(cx, cy - h / 2)
      ..lineTo(cx + w / 2, cy - h / 2 + w * 0.35)
      ..lineTo(cx + w / 2, cy + h * 0.10)
      ..quadraticBezierTo(cx + w / 2, cy + h * 0.42, cx, cy + h / 2)
      ..quadraticBezierTo(cx - w / 2, cy + h * 0.42, cx - w / 2, cy + h * 0.10)
      ..lineTo(cx - w / 2, cy - h / 2 + w * 0.35)
      ..close();

    // Shield fill with gradient
    final shieldPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [primary, primary.withOpacity(0.8)],
      ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: s * 0.3));
    canvas.drawPath(shieldPath, shieldPaint);

    // Drawing check mark (animated)
    final checkPaint = Paint()
      ..color = onPrimary
      ..style = PaintingStyle.stroke
      ..strokeWidth = s * 0.04
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    final p1 = Offset(cx - w * 0.14, cy);
    final p2 = Offset(cx - w * 0.02, cy + h * 0.12);
    final p3 = Offset(cx + w * 0.20, cy - h * 0.12);
    if (draw <= 0.5) {
      final k = draw * 2;
      canvas.drawLine(p1, Offset(p1.dx + (p2.dx - p1.dx) * k, p1.dy + (p2.dy - p1.dy) * k), checkPaint);
    } else {
      canvas.drawLine(p1, p2, checkPaint);
      final k = (draw - 0.5) * 2;
      canvas.drawLine(p2, Offset(p2.dx + (p3.dx - p2.dx) * k, p2.dy + (p3.dy - p2.dy) * k), checkPaint);
    }
  }

  @override
  bool shouldRepaint(covariant _ShieldPainter old) =>
      old.ripple != ripple || old.draw != draw || old.primary != primary;
}

// ============================================================================
// RESTORE — a backup file card with a circular restore arrow rotating around it
// Sleek, premium, anime-app appropriate.
// ============================================================================

class RestoreVisual extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final Color surface;
  final double size;
  const RestoreVisual({
    super.key,
    required this.primary,
    required this.onPrimary,
    required this.surface,
    this.size = 160,
  });

  @override
  State<RestoreVisual> createState() => _RestoreVisualState();
}

class _RestoreVisualState extends State<RestoreVisual>
    with TickerProviderStateMixin {
  late final AnimationController _spin;
  late final AnimationController _float;

  @override
  void initState() {
    super.initState();
    _spin = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat();
    _float = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _spin.dispose();
    _float.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: Listenable.merge([_spin, _float]),
        builder: (context, _) {
          return CustomPaint(
            painter: _RestorePainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              surface: widget.surface,
              spin: _spin.value,
              float: _float.value,
            ),
          );
        },
      ),
    );
  }
}

class _RestorePainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final Color surface;
  final double spin; // 0..1 rotating
  final double float; // 0..1 bobbing
  _RestorePainter({
    required this.primary,
    required this.onPrimary,
    required this.surface,
    required this.spin,
    required this.float,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;
    final dy = (float - 0.5) * 6;

    // Glow
    canvas.drawCircle(
      Offset(cx, cy),
      s * 0.42,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.16), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: s * 0.42)),
    );

    // File card
    final w = s * 0.42;
    final h = s * 0.52;
    final cardRect = Rect.fromCenter(center: Offset(cx, cy + dy), width: w, height: h);
    canvas.drawRRect(
      RRect.fromRectAndRadius(cardRect, Radius.circular(w * 0.14)),
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [surface, surface.withOpacity(0.8)],
        ).createShader(cardRect),
    );

    // File fold corner (top-right)
    final fold = Path()
      ..moveTo(cx + w / 2 - w * 0.24, cy - h / 2 + dy)
      ..lineTo(cx + w / 2, cy - h / 2 + w * 0.24 + dy)
      ..lineTo(cx + w / 2 - w * 0.24, cy - h / 2 + w * 0.24 + dy)
      ..close();
    canvas.drawPath(fold, Paint()..color = primary.withOpacity(0.45));

    // Content lines on card
    for (int i = 0; i < 3; i++) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(
            cx - w * 0.30,
            cy - h * 0.08 + i * h * 0.16 + dy,
            w * 0.60,
            h * 0.035,
          ),
          Radius.circular(2),
        ),
        Paint()..color = primary.withOpacity(0.3 + i * 0.05),
      );
    }

    // Rotating circular arrow around the file
    final ringR = s * 0.40;
    final startAngle = -math.pi / 2 + spin * 2 * math.pi;
    final sweep = 1.5; // ~85 degrees of arc
    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy + dy), radius: ringR),
      startAngle,
      sweep,
      false,
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = s * 0.035
        ..strokeCap = StrokeCap.round,
    );
    // Arrowhead at end of arc
    final endAngle = startAngle + sweep;
    final tipX = cx + ringR * math.cos(endAngle);
    final tipY = cy + ringR * math.sin(endAngle) + dy;
    canvas.drawCircle(Offset(tipX, tipY), s * 0.028, Paint()..color = primary);
  }

  @override
  bool shouldRepaint(covariant _RestorePainter old) =>
      old.spin != spin || old.float != float || old.primary != primary;
}

// ============================================================================
// FORMAT — a file with a pulsing warning triangle + sparkles (kept good, bigger)
// ============================================================================

class FormatVisual extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final double size;
  const FormatVisual({
    super.key,
    required this.primary,
    required this.onPrimary,
    this.size = 190,
  });

  @override
  State<FormatVisual> createState() => _FormatVisualState();
}

class _FormatVisualState extends State<FormatVisual>
    with TickerProviderStateMixin {
  late final AnimationController _bob;
  late final AnimationController _pulse;

  @override
  void initState() {
    super.initState();
    _bob = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: true);
    _pulse = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1600),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _bob.dispose();
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: Listenable.merge([_bob, _pulse]),
        builder: (context, _) {
          return CustomPaint(
            painter: _FormatPainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              bob: _bob.value,
              pulse: _pulse.value,
            ),
          );
        },
      ),
    );
  }
}

class _FormatPainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final double bob;
  final double pulse;
  _FormatPainter({
    required this.primary,
    required this.onPrimary,
    required this.bob,
    required this.pulse,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;
    final dy = (bob - 0.5) * 8;

    // Glow
    canvas.drawCircle(
      Offset(cx, cy + dy),
      s * 0.40,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.18 + 0.08 * pulse), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy + dy), radius: s * 0.40)),
    );

    // File body
    final fw = s * 0.38;
    final fh = s * 0.48;
    final fileRect = Rect.fromCenter(center: Offset(cx, cy + dy), width: fw, height: fh);
    canvas.drawRRect(
      RRect.fromRectAndRadius(fileRect, Radius.circular(fw * 0.14)),
      Paint()..color = const Color(0xFF1a2a1a),
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(fileRect, Radius.circular(fw * 0.14)),
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2,
    );
    // File fold corner
    final fold = Path()
      ..moveTo(cx + fw / 2 - fw * 0.24, cy - fh / 2 + dy)
      ..lineTo(cx + fw / 2, cy - fh / 2 + fw * 0.24 + dy)
      ..lineTo(cx + fw / 2 - fw * 0.24, cy - fh / 2 + fw * 0.24 + dy)
      ..close();
    canvas.drawPath(fold, Paint()..color = primary.withOpacity(0.5));
    // Content lines
    for (int i = 0; i < 4; i++) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(
            cx - fw * 0.28,
            cy - fh * 0.18 + i * fh * 0.12 + dy,
            fw * (0.50 - i * 0.06),
            fh * 0.035,
          ),
          Radius.circular(2),
        ),
        Paint()..color = primary.withOpacity(0.35 - i * 0.04),
      );
    }

    // Warning triangle (pulsing, bottom-right of file)
    final triCx = cx + fw * 0.42;
    final triCy = cy + fh * 0.32 + dy;
    final triScale = 1.0 + 0.12 * pulse;
    final triSize = s * 0.18 * triScale;
    final triPath = Path()
      ..moveTo(triCx, triCy - triSize * 0.5)
      ..lineTo(triCx + triSize * 0.46, triCy + triSize * 0.35)
      ..lineTo(triCx - triSize * 0.46, triCy + triSize * 0.35)
      ..close();
    canvas.drawPath(triPath, Paint()..color = primary);
    // Exclamation mark
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(center: Offset(triCx, triCy - triSize * 0.05), width: triSize * 0.12, height: triSize * 0.28),
        Radius.circular(triSize * 0.06),
      ),
      Paint()..color = onPrimary,
    );
    canvas.drawCircle(Offset(triCx, triCy + triSize * 0.20), triSize * 0.07, Paint()..color = onPrimary);

    // Sparkles
    final sparkleAlpha = 0.3 + 0.6 * pulse;
    canvas.drawCircle(Offset(cx - s * 0.30, cy - s * 0.22), s * 0.012, Paint()..color = primary.withOpacity(sparkleAlpha));
    canvas.drawCircle(Offset(cx + s * 0.32, cy - s * 0.12), s * 0.010, Paint()..color = primary.withOpacity(sparkleAlpha * 0.8));
    canvas.drawCircle(Offset(cx - s * 0.26, cy + s * 0.24), s * 0.011, Paint()..color = primary.withOpacity(sparkleAlpha * 0.6));
  }

  @override
  bool shouldRepaint(covariant _FormatPainter old) =>
      old.bob != bob || old.pulse != pulse || old.primary != primary;
}

// ============================================================================
// PROCESSING — a file unfolding into rows of data being parsed (better)
// ============================================================================

class ProcessingVisual extends StatefulWidget {
  final Color primary;
  final Color surface;
  final double size;
  const ProcessingVisual({
    super.key,
    required this.primary,
    required this.surface,
    this.size = 170,
  });

  @override
  State<ProcessingVisual> createState() => _ProcessingVisualState();
}

class _ProcessingVisualState extends State<ProcessingVisual>
    with TickerProviderStateMixin {
  late final AnimationController _spin;
  late final AnimationController _rows;

  @override
  void initState() {
    super.initState();
    _spin = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat();
    _rows = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
    )..repeat();
  }

  @override
  void dispose() {
    _spin.dispose();
    _rows.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: Listenable.merge([_spin, _rows]),
        builder: (context, _) {
          return CustomPaint(
            painter: _ProcessingPainter(
              primary: widget.primary,
              surface: widget.surface,
              spin: _spin.value,
              rows: _rows.value,
            ),
          );
        },
      ),
    );
  }
}

class _ProcessingPainter extends CustomPainter {
  final Color primary;
  final Color surface;
  final double spin;
  final double rows;
  _ProcessingPainter({
    required this.primary,
    required this.surface,
    required this.spin,
    required this.rows,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;

    // Glow
    canvas.drawCircle(
      Offset(cx, cy),
      s * 0.42,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.16 + 0.08 * (0.5 + 0.5 * math.sin(spin * 2 * math.pi))), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: s * 0.42)),
    );

    // Rotating dashed rings
    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: s * 0.38),
      spin * 2 * math.pi,
      1.2,
      false,
      Paint()
        ..color = primary.withOpacity(0.5)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..strokeCap = StrokeCap.round,
    );
    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: s * 0.31),
      -spin * 2 * math.pi,
      0.9,
      false,
      Paint()
        ..color = primary.withOpacity(0.35)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.5
        ..strokeCap = StrokeCap.round,
    );

    // Central file card
    final fw = s * 0.32;
    final fh = s * 0.28;
    final fileRect = Rect.fromCenter(center: Offset(cx, cy), width: fw, height: fh);
    canvas.drawRRect(
      RRect.fromRectAndRadius(fileRect, Radius.circular(fw * 0.16)),
      Paint()..color = surface,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(fileRect, Radius.circular(fw * 0.16)),
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.5,
    );

    // 4 rows being parsed (staggered reveal)
    const rowCount = 4;
    for (int i = 0; i < rowCount; i++) {
      final phase = (rows * rowCount - i) % rowCount;
      final reveal = phase.clamp(0.0, 1.0);
      if (reveal <= 0) continue;
      final y = cy - fh * 0.30 + i * fh * 0.20;
      final fullW = fw * (0.72 - i * 0.08);
      final filledW = fullW * reveal;
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(cx - fw * 0.36, y, fullW, fh * 0.06),
          Radius.circular(2),
        ),
        Paint()..color = primary.withOpacity(0.15),
      );
      if (filledW > 0) {
        canvas.drawRRect(
          RRect.fromRectAndRadius(
            Rect.fromLTWH(cx - fw * 0.36, y, filledW, fh * 0.06),
            Radius.circular(2),
          ),
          Paint()..color = primary.withOpacity(0.85),
        );
      }
    }

    // Parsing particle flowing through
    final particleT = (spin * 2) % 1.0;
    final px = cx - fw * 0.40 + fw * 0.80 * particleT;
    canvas.drawCircle(Offset(px, cy), s * 0.014, Paint()..color = primary);
  }

  @override
  bool shouldRepaint(covariant _ProcessingPainter old) =>
      old.spin != spin || old.rows != rows || old.primary != primary;
}

// ============================================================================
// SUMMARY — a clipboard/manifest that fills in with check marks
// ============================================================================

class SummaryVisual extends StatefulWidget {
  final Color primary;
  final Color surface;
  final double size;
  const SummaryVisual({
    super.key,
    required this.primary,
    required this.surface,
    this.size = 140,
  });

  @override
  State<SummaryVisual> createState() => _SummaryVisualState();
}

class _SummaryVisualState extends State<SummaryVisual>
    with TickerProviderStateMixin {
  late final AnimationController _anim;

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat();
  }

  @override
  void dispose() {
    _anim.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _anim,
        builder: (context, _) {
          return CustomPaint(
            painter: _SummaryPainter(
              primary: widget.primary,
              surface: widget.surface,
              t: _anim.value,
            ),
          );
        },
      ),
    );
  }
}

class _SummaryPainter extends CustomPainter {
  final Color primary;
  final Color surface;
  final double t;
  _SummaryPainter({
    required this.primary,
    required this.surface,
    required this.t,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;
    final float = (t - 0.5) * 4;

    // Clipboard body
    final cw = s * 0.46;
    final ch = s * 0.56;
    final clipRect = Rect.fromCenter(center: Offset(cx, cy + float), width: cw, height: ch);
    canvas.drawRRect(
      RRect.fromRectAndRadius(clipRect, Radius.circular(cw * 0.12)),
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [surface, surface.withOpacity(0.85)],
        ).createShader(clipRect),
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(clipRect, Radius.circular(cw * 0.12)),
      Paint()
        ..color = primary.withOpacity(0.4)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.5,
    );

    // Clipboard clip (top)
    final clipW = cw * 0.30;
    final clipH = ch * 0.08;
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(center: Offset(cx, cy - ch / 2 + clipH / 2 + float), width: clipW, height: clipH),
        Radius.circular(clipH / 2),
      ),
      Paint()..color = primary,
    );

    // 4 manifest lines with check marks appearing in sequence
    for (int i = 0; i < 4; i++) {
      final lineY = cy - ch * 0.22 + i * ch * 0.16 + float;
      final linePhase = (t * 4 - i * 0.8).clamp(0.0, 1.0);
      // Line bar
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(cx - cw * 0.28, lineY, cw * 0.40, ch * 0.04),
          Radius.circular(2),
        ),
        Paint()..color = primary.withOpacity(0.2),
      );
      if (linePhase > 0) {
        canvas.drawRRect(
          RRect.fromRectAndRadius(
            Rect.fromLTWH(cx - cw * 0.28, lineY, cw * 0.40 * linePhase, ch * 0.04),
            Radius.circular(2),
          ),
          Paint()..color = primary.withOpacity(0.6),
        );
      }
      // Check mark appearing after line fills
      if (linePhase >= 1.0) {
        final checkCx = cx + cw * 0.24;
        final checkCy = lineY + ch * 0.02;
        canvas.drawCircle(Offset(checkCx, checkCy), s * 0.020, Paint()..color = primary);
        final cp = Paint()
          ..color = surface
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.5
          ..strokeCap = StrokeCap.round;
        canvas.drawLine(Offset(checkCx - s * 0.008, checkCy), Offset(checkCx - s * 0.002, checkCy + s * 0.006), cp);
        canvas.drawLine(Offset(checkCx - s * 0.002, checkCy + s * 0.006), Offset(checkCx + s * 0.010, checkCy - s * 0.006), cp);
      }
    }
  }

  @override
  bool shouldRepaint(covariant _SummaryPainter old) =>
      old.t != t || old.primary != primary;
}

// ============================================================================
// RESTORE PROCESSING — circular progress ring with flowing data particles
// ============================================================================

class RestoreProcessingVisual extends StatefulWidget {
  final Color primary;
  final Color track;
  final IconData icon;
  final double size;
  const RestoreProcessingVisual({
    super.key,
    required this.primary,
    required this.track,
    required this.icon,
    this.size = 180,
  });

  @override
  State<RestoreProcessingVisual> createState() => _RestoreProcessingVisualState();
}

class _RestoreProcessingVisualState extends State<RestoreProcessingVisual>
    with TickerProviderStateMixin {
  late final AnimationController _progress;
  late final AnimationController _particles;

  @override
  void initState() {
    super.initState();
    _progress = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat();
    _particles = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1600),
    )..repeat();
  }

  @override
  void dispose() {
    _progress.dispose();
    _particles.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: Listenable.merge([_progress, _particles]),
        builder: (context, _) {
          return Stack(
            alignment: Alignment.center,
            children: [
              CustomPaint(
                size: Size(widget.size, widget.size),
                painter: _RestoreProcessingPainter(
                  primary: widget.primary,
                  track: widget.track,
                  progress: _progress.value,
                  particles: _particles.value,
                ),
              ),
              Icon(widget.icon, color: widget.primary, size: widget.size * 0.28),
            ],
          );
        },
      ),
    );
  }
}

class _RestoreProcessingPainter extends CustomPainter {
  final Color primary;
  final Color track;
  final double progress;
  final double particles;
  _RestoreProcessingPainter({
    required this.primary,
    required this.track,
    required this.progress,
    required this.particles,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final r = size.width * 0.36;

    // Glow
    canvas.drawCircle(
      Offset(cx, cy),
      r * 1.3,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.18 + 0.10 * progress), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: r * 1.3)),
    );

    // Track
    canvas.drawCircle(
      Offset(cx, cy),
      r,
      Paint()
        ..color = track
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.05,
    );
    // Progress arc
    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: r),
      -math.pi / 2,
      progress * 2 * math.pi,
      false,
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.05
        ..strokeCap = StrokeCap.round,
    );

    // 6 flowing particles orbiting just inside the ring
    for (int i = 0; i < 6; i++) {
      final angle = particles * 2 * math.pi + (i * 2 * math.pi / 6);
      final pr = r * 0.78;
      final px = cx + pr * math.cos(angle);
      final py = cy + pr * math.sin(angle);
      final alpha = 0.3 + 0.5 * ((math.cos(angle - math.pi) + 1) / 2);
      canvas.drawCircle(Offset(px, py), size.width * 0.014, Paint()..color = primary.withOpacity(alpha));
    }
  }

  @override
  bool shouldRepaint(covariant _RestoreProcessingPainter old) =>
      old.progress != progress || old.particles != particles || old.primary != primary;
}

// ============================================================================
// CHECK CIRCLE — bold check-in-circle that draws smoothly + calm glow + confetti
// Used by Restore Success (with confetti) and Finish (with confetti).
// ============================================================================

class CheckCircleVisual extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final double size;
  final bool withConfetti;
  const CheckCircleVisual({
    super.key,
    required this.primary,
    required this.onPrimary,
    this.size = 180,
    this.withConfetti = false,
  });

  @override
  State<CheckCircleVisual> createState() => _CheckCircleVisualState();
}

class _CheckCircleVisualState extends State<CheckCircleVisual>
    with TickerProviderStateMixin {
  late final AnimationController _draw;
  late final AnimationController _glow;

  @override
  void initState() {
    super.initState();
    _draw = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..forward();
    _glow = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2800),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _draw.dispose();
    _glow.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: Listenable.merge([_draw, _glow]),
        builder: (context, _) {
          return CustomPaint(
            painter: _CheckCirclePainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              progress: _draw.value,
              glow: _glow.value,
              confetti: widget.withConfetti,
            ),
          );
        },
      ),
    );
  }
}

class _CheckCirclePainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final double progress;
  final double glow;
  final bool confetti;
  _CheckCirclePainter({
    required this.primary,
    required this.onPrimary,
    required this.progress,
    required this.glow,
    required this.confetti,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final r = size.width * 0.34;

    // Glow (breathing)
    canvas.drawCircle(
      Offset(cx, cy),
      r * (1.3 + 0.08 * glow),
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.20 + 0.10 * glow), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: r * 1.4)),
    );

    // Circle (draws in)
    final circleSweep = (progress * 1.3).clamp(0.0, 1.0);
    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: r),
      -math.pi / 2,
      circleSweep * 2 * math.pi,
      false,
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.055
        ..strokeCap = StrokeCap.round,
    );
    // Fill once drawn
    if (circleSweep >= 1.0) {
      canvas.drawCircle(Offset(cx, cy), r, Paint()..color = primary);
    }

    // Check mark (draws after circle)
    final checkP = (progress * 1.6 - 0.6).clamp(0.0, 1.0);
    if (checkP > 0) {
      final p1 = Offset(cx - r * 0.32, cy);
      final p2 = Offset(cx - r * 0.05, cy + r * 0.30);
      final p3 = Offset(cx + r * 0.36, cy - r * 0.28);
      final paint = Paint()
        ..color = onPrimary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.065
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round;
      if (checkP <= 0.5) {
        final k = checkP * 2;
        canvas.drawLine(p1, Offset(p1.dx + (p2.dx - p1.dx) * k, p1.dy + (p2.dy - p1.dy) * k), paint);
      } else {
        canvas.drawLine(p1, p2, paint);
        final k = (checkP - 0.5) * 2;
        canvas.drawLine(p2, Offset(p2.dx + (p3.dx - p2.dx) * k, p2.dy + (p3.dy - p2.dy) * k), paint);
      }
    }

    // Confetti
    if (confetti && progress > 0.5) {
      final rng = math.Random(42);
      final confettiProgress = (progress - 0.5) * 2;
      for (int i = 0; i < 22; i++) {
        final a = rng.nextDouble() * 2 * math.pi;
        final dist = r * (1.2 + 0.6 * rng.nextDouble()) * confettiProgress;
        final dx = cx + dist * math.cos(a);
        final dy = cy + dist * math.sin(a);
        final sz = size.width * (0.008 + 0.008 * rng.nextDouble());
        canvas.drawCircle(
          Offset(dx, dy),
          sz,
          Paint()..color = primary.withOpacity(0.7 * (1 - confettiProgress * 0.5)),
        );
      }
    }
  }

  @override
  bool shouldRepaint(covariant _CheckCirclePainter old) =>
      old.progress != progress || old.glow != glow || old.primary != primary;
}

// ============================================================================
// LINK ANIMATION — small visual for the manual linking screen top
// A magnifying glass with a pulse, for "search" semantics.
// ============================================================================

class SearchVisual extends StatefulWidget {
  final Color primary;
  final double size;
  const SearchVisual({
    super.key,
    required this.primary,
    this.size = 130,
  });

  @override
  State<SearchVisual> createState() => _SearchVisualState();
}

class _SearchVisualState extends State<SearchVisual>
    with TickerProviderStateMixin {
  late final AnimationController _pulse;

  @override
  void initState() {
    super.initState();
    _pulse = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
    )..repeat();
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _pulse,
        builder: (context, _) {
          return CustomPaint(
            painter: _SearchPainter(
              primary: widget.primary,
              t: _pulse.value,
            ),
          );
        },
      ),
    );
  }
}

class _SearchPainter extends CustomPainter {
  final Color primary;
  final double t;
  _SearchPainter({required this.primary, required this.t});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width * 0.42;
    final cy = size.height * 0.42;
    final r = size.width * 0.22;

    // Ripple
    final rippleR = r + size.width * 0.10 * t;
    canvas.drawCircle(
      Offset(cx, cy),
      rippleR,
      Paint()
        ..color = primary.withOpacity((1 - t) * 0.3)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2,
    );

    // Glow
    canvas.drawCircle(
      Offset(cx, cy),
      r * 1.3,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.18), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy), radius: r * 1.3)),
    );

    // Magnifying glass circle
    canvas.drawCircle(
      Offset(cx, cy),
      r,
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.035,
    );
    // Handle
    final handleStart = Offset(cx + r * 0.70, cy + r * 0.70);
    final handleEnd = Offset(cx + r * 1.30, cy + r * 1.30);
    canvas.drawLine(
      handleStart,
      handleEnd,
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.045
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(covariant _SearchPainter old) =>
      old.t != t || old.primary != primary;
}

// ============================================================================
// POISON — a poison bottle + pill (for the Choose Your Poison screen)
// ============================================================================

class PoisonBottleVisual extends StatefulWidget {
  final Color primary;
  final double size;
  const PoisonBottleVisual({
    super.key,
    required this.primary,
    this.size = 120,
  });

  @override
  State<PoisonBottleVisual> createState() => _PoisonBottleVisualState();
}

class _PoisonBottleVisualState extends State<PoisonBottleVisual>
    with TickerProviderStateMixin {
  late final AnimationController _float;

  @override
  void initState() {
    super.initState();
    _float = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _float.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _float,
        builder: (context, _) {
          return CustomPaint(
            painter: _BottlePainter(
              primary: widget.primary,
              t: _float.value,
            ),
          );
        },
      ),
    );
  }
}

class _BottlePainter extends CustomPainter {
  final Color primary;
  final double t;
  _BottlePainter({required this.primary, required this.t});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;
    final dy = (t - 0.5) * 6;

    // Glow
    canvas.drawCircle(
      Offset(cx, cy + dy),
      s * 0.40,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.22), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy + dy), radius: s * 0.40)),
    );

    // Bottle body (rounded rectangle with shoulders)
    final bodyW = s * 0.36;
    final bodyH = s * 0.44;
    final bodyRect = Rect.fromCenter(center: Offset(cx, cy + s * 0.08 + dy), width: bodyW, height: bodyH);
    // Body with gradient
    final bodyPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [primary, primary.withOpacity(0.7)],
      ).createShader(bodyRect);
    // Bottle shape: rounded bottom, narrower neck top
    final bottlePath = Path()
      ..moveTo(cx - bodyW * 0.5, cy + s * 0.08 - bodyH * 0.5 + dy)
      ..lineTo(cx - bodyW * 0.5, cy + s * 0.08 + bodyH * 0.35 + dy)
      ..quadraticBezierTo(cx - bodyW * 0.5, cy + s * 0.08 + bodyH * 0.5 + dy, cx - bodyW * 0.42, cy + s * 0.08 + bodyH * 0.5 + dy)
      ..lineTo(cx + bodyW * 0.42, cy + s * 0.08 + bodyH * 0.5 + dy)
      ..quadraticBezierTo(cx + bodyW * 0.5, cy + s * 0.08 + bodyH * 0.5 + dy, cx + bodyW * 0.5, cy + s * 0.08 + bodyH * 0.35 + dy)
      ..lineTo(cx + bodyW * 0.5, cy + s * 0.08 - bodyH * 0.5 + dy)
      // Shoulders
      ..quadraticBezierTo(cx + bodyW * 0.5, cy + s * 0.08 - bodyH * 0.58 + dy, cx + bodyW * 0.32, cy + s * 0.08 - bodyH * 0.62 + dy)
      ..lineTo(cx + bodyW * 0.18, cy + s * 0.08 - bodyH * 0.72 + dy)
      ..lineTo(cx - bodyW * 0.18, cy + s * 0.08 - bodyH * 0.72 + dy)
      ..quadraticBezierTo(cx - bodyW * 0.32, cy + s * 0.08 - bodyH * 0.62 + dy, cx - bodyW * 0.5, cy + s * 0.08 - bodyH * 0.58 + dy)
      ..close();
    canvas.drawPath(bottlePath, bodyPaint);
    // Bottle outline
    canvas.drawPath(bottlePath, Paint()
      ..color = primary
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2);

    // Bottle cap (neck)
    final capW = bodyW * 0.36;
    final capH = bodyH * 0.16;
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(center: Offset(cx, cy + s * 0.08 - bodyH * 0.78 + dy), width: capW, height: capH),
        Radius.circular(capH * 0.2),
      ),
      Paint()..color = primary,
    );

    // Skull-and-crossbones symbol on bottle (simplified)
    final symCx = cx;
    final symCy = cy + s * 0.08 + dy;
    // Skull circle
    canvas.drawCircle(Offset(symCx, symCy - s * 0.02), s * 0.06, Paint()..color = Colors.white.withOpacity(0.9));
    // Eyes
    canvas.drawCircle(Offset(symCx - s * 0.025, symCy - s * 0.025), s * 0.015, Paint()..color = primary);
    canvas.drawCircle(Offset(symCx + s * 0.025, symCy - s * 0.025), s * 0.015, Paint()..color = primary);
    // Crossbones (two crossed lines)
    final bonePaint = Paint()
      ..color = Colors.white.withOpacity(0.9)
      ..style = PaintingStyle.stroke
      ..strokeWidth = s * 0.018
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(Offset(symCx - s * 0.06, symCy + s * 0.04), Offset(symCx + s * 0.06, symCy + s * 0.10), bonePaint);
    canvas.drawLine(Offset(symCx + s * 0.06, symCy + s * 0.04), Offset(symCx - s * 0.06, symCy + s * 0.10), bonePaint);
  }

  @override
  bool shouldRepaint(covariant _BottlePainter old) =>
      old.t != t || old.primary != primary;
}

class PoisonPillVisual extends StatefulWidget {
  final Color primary;
  final double size;
  const PoisonPillVisual({
    super.key,
    required this.primary,
    this.size = 120,
  });

  @override
  State<PoisonPillVisual> createState() => _PoisonPillVisualState();
}

class _PoisonPillVisualState extends State<PoisonPillVisual>
    with TickerProviderStateMixin {
  late final AnimationController _float;

  @override
  void initState() {
    super.initState();
    _float = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2800),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _float.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _float,
        builder: (context, _) {
          return Transform.rotate(
            angle: -0.4 + 0.05 * math.sin(_float.value * 2 * math.pi),
            child: CustomPaint(
              painter: _PillPainter(
                primary: widget.primary,
                t: _float.value,
              ),
            ),
          );
        },
      ),
    );
  }
}

class _PillPainter extends CustomPainter {
  final Color primary;
  final double t;
  _PillPainter({required this.primary, required this.t});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final s = size.width;
    final dy = (t - 0.5) * 6;

    // Glow
    canvas.drawCircle(
      Offset(cx, cy + dy),
      s * 0.38,
      Paint()
        ..shader = RadialGradient(
          colors: [primary.withOpacity(0.20), primary.withOpacity(0)],
        ).createShader(Rect.fromCircle(center: Offset(cx, cy + dy), radius: s * 0.38)),
    );

    // Capsule pill (two halves: primary + white)
    final pillW = s * 0.60;
    final pillH = s * 0.24;
    final pillRect = Rect.fromCenter(center: Offset(cx, cy + dy), width: pillW, height: pillH);
    // Left half (primary)
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(pillRect.left, pillRect.top, pillW / 2, pillH),
        Radius.circular(pillH / 2),
      ),
      Paint()..color = primary,
    );
    // Right half (white/light)
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(pillRect.left + pillW / 2, pillRect.top, pillW / 2, pillH),
        Radius.circular(pillH / 2),
      ),
      Paint()..color = Colors.white.withOpacity(0.92),
    );
    // Divider line
    canvas.drawLine(
      Offset(cx, pillRect.top),
      Offset(cx, pillRect.bottom),
      Paint()
        ..color = primary.withOpacity(0.3)
        ..strokeWidth = 1,
    );
    // Highlight on pill
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(pillRect.left + pillW * 0.08, pillRect.top + pillH * 0.15, pillW * 0.84, pillH * 0.25),
        Radius.circular(pillH * 0.12),
      ),
      Paint()..color = Colors.white.withOpacity(0.25),
    );
  }

  @override
  bool shouldRepaint(covariant _PillPainter old) =>
      old.t != t || old.primary != primary;
}
