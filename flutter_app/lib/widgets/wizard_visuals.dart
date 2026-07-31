// wizard_visuals.dart — custom-painted and composed animations for each screen.
//
// Each visual is a self-contained stateless widget that takes the current
// ColorScheme (or palette) so it adapts to the selected theme. Animations use
// built-in AnimationController + CustomPainter (zero extra dependencies).

import 'dart:math' as math;
import 'package:flutter/material.dart';

// ============================================================================
// WELCOME — play mark with soft glow + gentle scale pulse
// ============================================================================

class WelcomeVisual extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final double size;
  const WelcomeVisual({
    super.key,
    required this.primary,
    required this.onPrimary,
    this.size = 160,
  });

  @override
  State<WelcomeVisual> createState() => _WelcomeVisualState();
}

class _WelcomeVisualState extends State<WelcomeVisual>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3400),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        final s = 0.96 + 0.08 * _c.value;
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: CustomPaint(
            painter: _WelcomePainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              scale: s,
            ),
          ),
        );
      },
    );
  }
}

class _WelcomePainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final double scale;
  _WelcomePainter({
    required this.primary,
    required this.onPrimary,
    required this.scale,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    // Soft glow
    final glowPaint = Paint()..color = primary.withOpacity(0.28);
    canvas.drawCircle(Offset(cx, cy), size.width * 0.42, glowPaint);
    // Rounded square
    final sqSize = size.width * 0.42 * scale;
    final rrect = RRect.fromRectAndRadius(
      Rect.fromCenter(center: Offset(cx, cy), width: sqSize, height: sqSize),
      Radius.circular(sqSize * 0.26),
    );
    canvas.drawRRect(rrect, Paint()..color = primary);
    // Play triangle
    final tri = Path()
      ..moveTo(cx - sqSize * 0.10, cy - sqSize * 0.19)
      ..lineTo(cx - sqSize * 0.10, cy + sqSize * 0.19)
      ..lineTo(cx + sqSize * 0.21, cy)
      ..close();
    canvas.drawPath(tri, Paint()..color = onPrimary);
  }

  @override
  bool shouldRepaint(covariant _WelcomePainter old) =>
      old.scale != scale || old.primary != primary;
}

// ============================================================================
// FOLDER — open folder with floating files + selected check badge
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
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3600),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: CustomPaint(
            painter: _FolderPainter(
              primary: widget.primary,
              surface3: widget.surface3,
              surface4: widget.surface4,
              surface5: widget.surface5,
              background: widget.background,
              selected: widget.selected,
              bob: _c.value,
            ),
          ),
        );
      },
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
  final double bob; // 0..1
  _FolderPainter({
    required this.primary,
    required this.surface3,
    required this.surface4,
    required this.surface5,
    required this.background,
    required this.selected,
    required this.bob,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final u = size.width / 200;
    final cx = size.width / 2;
    // glow
    canvas.drawCircle(
        Offset(cx, 140 * u), 60 * u, Paint()..color = primary.withOpacity(0.18));
    final dy = (bob - 0.5) * 8 * u; // -4u..+4u
    // Back lid
    _rr(canvas, surface4, 40 * u, (88 + dy) * u, 118 * u, 28 * u, 8 * u);
    // Files (floating, staggered)
    _file(canvas, surface5, primary, 56 * u, (56 + dy * 0.5) * u, 28 * u, 34 * u, 3 * u);
    _file(canvas, surface4, primary, 86 * u, (50 + dy * 0.6) * u, 28 * u, 40 * u, 3 * u);
    _file(canvas, surface3, primary, 116 * u, (56 + dy * 0.4) * u, 28 * u, 34 * u, 3 * u);
    // Front pocket
    _rr(canvas, surface3, 38 * u, 116 * u, 124 * u, 58 * u, 8 * u);
    _rrStroke(canvas, surface5, 38 * u, 116 * u, 124 * u, 58 * u, 8 * u, 2.2 * u);
    // inner lines
    canvas.drawRect(
        Rect.fromLTWH(54 * u, 134 * u, 92 * u, 4 * u),
        Paint()..color = primary.withOpacity(0.35));
    canvas.drawRect(
        Rect.fromLTWH(54 * u, 148 * u, 72 * u, 4 * u),
        Paint()..color = primary.withOpacity(0.25));
    canvas.drawRect(
        Rect.fromLTWH(54 * u, 162 * u, 82 * u, 4 * u),
        Paint()..color = primary.withOpacity(0.25));
    // selected check badge
    if (selected) {
      canvas.drawCircle(Offset(150 * u, 92 * u), 20 * u, Paint()..color = primary);
      final p = Paint()
        ..color = background
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3.5 * u
        ..strokeCap = StrokeCap.round;
      canvas.drawLine(Offset(141 * u, 92 * u), Offset(148 * u, 99 * u), p);
      canvas.drawLine(Offset(148 * u, 99 * u), Offset(160 * u, 85 * u), p);
    }
  }

  void _rr(Canvas c, Color color, double x, double y, double w, double h, double r) {
    c.drawRRect(
      RRect.fromRectAndRadius(Rect.fromLTWH(x, y, w, h), Radius.circular(r)),
      Paint()..color = color,
    );
  }

  void _rrStroke(Canvas c, Color color, double x, double y, double w, double h,
      double r, double stroke) {
    c.drawRRect(
      RRect.fromRectAndRadius(Rect.fromLTWH(x, y, w, h), Radius.circular(r)),
      Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = stroke,
    );
  }

  void _file(Canvas c, Color body, Color accent, double x, double y, double w,
      double h, double r) {
    _rr(c, body, x, y, w, h, r);
    c.drawRRect(
      RRect.fromRectAndRadius(Rect.fromLTWH(x, y, w, h * 0.29), Radius.circular(r)),
      Paint()..color = accent.withOpacity(0.5),
    );
  }

  @override
  bool shouldRepaint(covariant _FolderPainter old) =>
      old.selected != selected || old.bob != bob || old.primary != primary;
}

// ============================================================================
// SHIELD — permissions (calm ripple)
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
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2600),
    )..repeat();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: CustomPaint(
            painter: _ShieldPainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              t: _c.value,
            ),
          ),
        );
      },
    );
  }
}

class _ShieldPainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final double t; // 0..1 looping
  _ShieldPainter({required this.primary, required this.onPrimary, required this.t});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    // ripple
    for (int i = 0; i < 2; i++) {
      final phase = (t + i * 0.5) % 1.0;
      final r = size.width * (0.30 + 0.22 * phase);
      canvas.drawCircle(
        Offset(cx, cy),
        r,
        Paint()
          ..color = primary.withOpacity((1 - phase) * 0.25)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );
    }
    // shield body
    final w = size.width * 0.42;
    final h = size.width * 0.50;
    final path = Path()
      ..moveTo(cx, cy - h / 2)
      ..lineTo(cx + w / 2, cy - h / 2 + w * 0.3)
      ..lineTo(cx + w / 2, cy + h * 0.1)
      ..quadraticBezierTo(cx + w / 2, cy + h * 0.45, cx, cy + h / 2)
      ..quadraticBezierTo(cx - w / 2, cy + h * 0.45, cx - w / 2, cy + h * 0.1)
      ..lineTo(cx - w / 2, cy - h / 2 + w * 0.3)
      ..close();
    canvas.drawPath(path, Paint()..color = primary);
    // check
    final p = Paint()
      ..color = onPrimary
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.045
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    canvas.drawLine(
        Offset(cx - w * 0.14, cy), Offset(cx - w * 0.02, cy + h * 0.12), p);
    canvas.drawLine(
        Offset(cx - w * 0.02, cy + h * 0.12), Offset(cx + w * 0.18, cy - h * 0.12), p);
  }

  @override
  bool shouldRepaint(covariant _ShieldPainter old) =>
      old.t != t || old.primary != primary;
}

// ============================================================================
// RESTORE — file card with circular restore arrow
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
    this.size = 150,
  });

  @override
  State<RestoreVisual> createState() => _RestoreVisualState();
}

class _RestoreVisualState extends State<RestoreVisual>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2200),
    )..repeat();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: CustomPaint(
            painter: _RestorePainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              surface: widget.surface,
              t: _c.value,
            ),
          ),
        );
      },
    );
  }
}

class _RestorePainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final Color surface;
  final double t;
  _RestorePainter({
    required this.primary,
    required this.onPrimary,
    required this.surface,
    required this.t,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    // file card
    final w = size.width * 0.46;
    final h = size.width * 0.56;
    final card = RRect.fromRectAndRadius(
      Rect.fromCenter(center: Offset(cx, cy), width: w, height: h),
      Radius.circular(w * 0.12),
    );
    canvas.drawRRect(card, Paint()..color = surface);
    // file fold corner
    final fold = Path()
      ..moveTo(cx + w / 2 - w * 0.22, cy - h / 2)
      ..lineTo(cx + w / 2, cy - h / 2 + w * 0.22)
      ..lineTo(cx + w / 2 - w * 0.22, cy - h / 2 + w * 0.22)
      ..close();
    canvas.drawPath(fold, Paint()..color = primary.withOpacity(0.5));
    // content lines on card
    for (int i = 0; i < 3; i++) {
      canvas.drawRect(
        Rect.fromLTWH(
            cx - w * 0.28, cy - h * 0.08 + i * h * 0.14, w * 0.56, h * 0.04),
        Paint()..color = primary.withOpacity(0.3),
      );
    }
    // rotating restore arrow (arc + arrowhead) around the card
    final ringR = size.width * 0.42;
    const sweep = 1.4; // radians of arc
    final start = -math.pi / 2 + t * 2 * math.pi;
    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: ringR),
      start,
      sweep,
      false,
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.035
        ..strokeCap = StrokeCap.round,
    );
    // arrowhead at end of arc
    final endAngle = start + sweep;
    final tip = Offset(cx + ringR * math.cos(endAngle), cy + ringR * math.sin(endAngle));
    final ahead = Offset(
        cx + (ringR - 10) * math.cos(endAngle), cy + (ringR - 10) * math.sin(endAngle));
    final p = Paint()
      ..color = primary
      ..style = PaintingStyle.fill;
    canvas.drawCircle(tip, size.width * 0.03, p);
    canvas.drawLine(
        tip, ahead, Paint()..color = primary..strokeWidth = size.width * 0.035..strokeCap = StrokeCap.round);
  }

  @override
  bool shouldRepaint(covariant _RestorePainter old) =>
      old.t != t || old.primary != primary;
}

// ============================================================================
// FORMAT — warning mark with a wobbling badge (kept "good" per spec)
// ============================================================================

class FormatVisual extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final double size;
  const FormatVisual({
    super.key,
    required this.primary,
    required this.onPrimary,
    this.size = 150,
  });

  @override
  State<FormatVisual> createState() => _FormatVisualState();
}

class _FormatVisualState extends State<FormatVisual>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return Transform.translate(
          offset: Offset(0, 6 * math.sin(_c.value * math.pi)),
          child: SizedBox(
            width: widget.size,
            height: widget.size,
            child: CustomPaint(
              painter: _FormatPainter(
                primary: widget.primary,
                onPrimary: widget.onPrimary,
              ),
            ),
          ),
        );
      },
    );
  }
}

class _FormatPainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  _FormatPainter({required this.primary, required this.onPrimary});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final r = size.width * 0.40;
    // rounded badge
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(center: Offset(cx, cy), width: r * 2, height: r * 2),
        Radius.circular(r * 0.32),
      ),
      Paint()..color = primary.withOpacity(0.16),
    );
    // exclamation
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(center: Offset(cx, cy - r * 0.28), width: r * 0.16, height: r * 0.5),
        Radius.circular(r * 0.08),
      ),
      Paint()..color = primary,
    );
    canvas.drawCircle(Offset(cx, cy + r * 0.34), r * 0.10, Paint()..color = primary);
  }

  @override
  bool shouldRepaint(covariant _FormatPainter old) => old.primary != primary;
}

// ============================================================================
// PROCESSING — file unfolding into data rows being parsed
// ============================================================================

class ProcessingVisual extends StatefulWidget {
  final Color primary;
  final Color surface;
  final double size;
  const ProcessingVisual({
    super.key,
    required this.primary,
    required this.surface,
    this.size = 150,
  });

  @override
  State<ProcessingVisual> createState() => _ProcessingVisualState();
}

class _ProcessingVisualState extends State<ProcessingVisual>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
    )..repeat();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: CustomPaint(
            painter: _ProcessingPainter(
              primary: widget.primary,
              surface: widget.surface,
              t: _c.value,
            ),
          ),
        );
      },
    );
  }
}

class _ProcessingPainter extends CustomPainter {
  final Color primary;
  final Color surface;
  final double t;
  _ProcessingPainter({required this.primary, required this.surface, required this.t});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final w = size.width * 0.66;
    final rowH = size.width * 0.10;
    final gap = size.width * 0.03;
    const rows = 4;
    final totalH = rows * rowH + (rows - 1) * gap;
    final top = (size.height - totalH) / 2;
    for (int i = 0; i < rows; i++) {
      final y = top + i * (rowH + gap);
      final reveal = ((t * rows) - i).clamp(0.0, 1.0);
      final filled = reveal * w;
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(cx - w / 2, y, w, rowH),
          Radius.circular(rowH * 0.3),
        ),
        Paint()..color = surface,
      );
      if (filled > 0) {
        canvas.drawRRect(
          RRect.fromRectAndRadius(
            Rect.fromLTWH(cx - w / 2, y, filled, rowH),
            Radius.circular(rowH * 0.3),
          ),
          Paint()..color = primary.withOpacity(0.85),
        );
      }
    }
  }

  @override
  bool shouldRepaint(covariant _ProcessingPainter old) =>
      old.t != t || old.primary != primary;
}

// ============================================================================
// FINISH / SUCCESS — bold check-in-circle that draws smoothly + calm glow
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
    this.size = 150,
    this.withConfetti = false,
  });

  @override
  State<CheckCircleVisual> createState() => _CheckCircleVisualState();
}

class _CheckCircleVisualState extends State<CheckCircleVisual>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1100),
    )..forward();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: CustomPaint(
            painter: _CheckCirclePainter(
              primary: widget.primary,
              onPrimary: widget.onPrimary,
              progress: _c.value,
              confetti: widget.withConfetti,
            ),
          ),
        );
      },
    );
  }
}

class _CheckCirclePainter extends CustomPainter {
  final Color primary;
  final Color onPrimary;
  final double progress; // 0..1
  final bool confetti;
  _CheckCirclePainter({
    required this.primary,
    required this.onPrimary,
    required this.progress,
    required this.confetti,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final r = size.width * 0.36;
    // glow
    canvas.drawCircle(
        Offset(cx, cy), r * 1.25, Paint()..color = primary.withOpacity(0.22));
    // circle (draws in)
    final circleSweep = (progress * 1.2).clamp(0.0, 1.0);
    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: r),
      -math.pi / 2,
      circleSweep * 2 * math.pi,
      false,
      Paint()
        ..color = primary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.05
        ..strokeCap = StrokeCap.round,
    );
    // fill once drawn
    if (circleSweep >= 1.0) {
      canvas.drawCircle(Offset(cx, cy), r, Paint()..color = primary);
    }
    // check (draws after circle)
    final checkP = (progress * 1.6 - 0.6).clamp(0.0, 1.0);
    if (checkP > 0) {
      final p1 = Offset(cx - r * 0.30, cy);
      final p2 = Offset(cx - r * 0.05, cy + r * 0.28);
      final p3 = Offset(cx + r * 0.34, cy - r * 0.28);
      final mid = Offset(p1.dx + (p2.dx - p1.dx) * checkP.clamp(0.0, 0.5) * 2,
          p1.dy + (p2.dy - p1.dy) * checkP.clamp(0.0, 0.5) * 2);
      final paint = Paint()
        ..color = onPrimary
        ..style = PaintingStyle.stroke
        ..strokeWidth = size.width * 0.06
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round;
      if (checkP <= 0.5) {
        canvas.drawLine(p1, mid, paint);
      } else {
        canvas.drawLine(p1, p2, paint);
        final k = (checkP - 0.5) * 2;
        canvas.drawLine(p2, Offset(p2.dx + (p3.dx - p2.dx) * k, p2.dy + (p3.dy - p2.dy) * k), paint);
      }
    }
    // confetti
    if (confetti && progress > 0.6) {
      final rng = math.Random(42);
      for (int i = 0; i < 18; i++) {
        final a = rng.nextDouble() * 2 * math.pi;
        final dist = r * (1.3 + 0.5 * rng.nextDouble()) * progress;
        final dx = cx + dist * math.cos(a);
        final dy = cy + dist * math.sin(a);
        canvas.drawCircle(
            Offset(dx, dy), size.width * 0.012, Paint()..color = primary.withOpacity(0.6));
      }
    }
  }

  @override
  bool shouldRepaint(covariant _CheckCirclePainter old) =>
      old.progress != progress || old.primary != primary;
}

// ============================================================================
// GENERIC PROGRESS RING (restore-processing)
// ============================================================================

class ProgressRingVisual extends StatefulWidget {
  final Color primary;
  final Color track;
  final IconData icon;
  final double size;
  const ProgressRingVisual({
    super.key,
    required this.primary,
    required this.track,
    required this.icon,
    this.size = 150,
  });

  @override
  State<ProgressRingVisual> createState() => _ProgressRingVisualState();
}

class _ProgressRingVisualState extends State<ProgressRingVisual>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1600),
    )..repeat();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: Stack(
            alignment: Alignment.center,
            children: [
              CustomPaint(
                size: Size(widget.size, widget.size),
                painter: _ProgressRingPainter(
                  primary: widget.primary,
                  track: widget.track,
                  progress: _c.value,
                ),
              ),
              Icon(widget.icon, color: widget.primary, size: widget.size * 0.30),
            ],
          ),
        );
      },
    );
  }
}

class _ProgressRingPainter extends CustomPainter {
  final Color primary;
  final Color track;
  final double progress;
  _ProgressRingPainter({
    required this.primary,
    required this.track,
    required this.progress,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;
    final r = size.width * 0.38;
    canvas.drawCircle(
        Offset(cx, cy), r, Paint()..color = track..style = PaintingStyle.stroke..strokeWidth = size.width * 0.05);
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
  }

  @override
  bool shouldRepaint(covariant _ProgressRingPainter old) =>
      old.progress != progress || old.primary != primary;
}
