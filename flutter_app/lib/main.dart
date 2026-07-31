import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';

void main() => runApp(const SetupWizardApp());

// ═══════════════════════════════════════════════════════════════════════════
// MODELS & DATA
// ═══════════════════════════════════════════════════════════════════════════

enum WizardStep {
  welcome, theme, folder, permissions, restore, format, processing,
  summary, linking, manual, restoreSummary, restoreProcessing,
  restoreSuccess, poison, finish,
}

class WizardPalette {
  final String name;
  final Color primary, onPrimary, primaryContainer, onPrimaryContainer;
  final Color bg, s1, s2, s3, s4, s5;
  const WizardPalette({
    required this.name, required this.primary, required this.onPrimary,
    required this.primaryContainer, required this.onPrimaryContainer,
    required this.bg, required this.s1, required this.s2, required this.s3, required this.s4, required this.s5,
  });
}

const palettes = [
  WizardPalette(name: 'Lime', primary: Color(0xFFB3F35A), onPrimary: Color(0xFF0A1A00), primaryContainer: Color(0xFF2A4A10), onPrimaryContainer: Color(0xFFE8FFD4), bg: Color(0xFF0A120A), s1: Color(0xFF0F1A0F), s2: Color(0xFF142214), s3: Color(0xFF1A2A1A), s4: Color(0xFF1F321F), s5: Color(0xFF253A25)),
  WizardPalette(name: 'Teal', primary: Color(0xFF2596BE), onPrimary: Color(0xFFFFFFFF), primaryContainer: Color(0xFF0A4A63), onPrimaryContainer: Color(0xFFE0F7FF), bg: Color(0xFF0A1A1F), s1: Color(0xFF0F2329), s2: Color(0xFF142D35), s3: Color(0xFF1A3740), s4: Color(0xFF1F414B), s5: Color(0xFF254B56)),
  WizardPalette(name: 'Purple', primary: Color(0xFF6750A4), onPrimary: Color(0xFFFFFFFF), primaryContainer: Color(0xFF4F378B), onPrimaryContainer: Color(0xFFEADDFF), bg: Color(0xFF14111F), s1: Color(0xFF1B1729), s2: Color(0xFF221E33), s3: Color(0xFF2A2540), s4: Color(0xFF332D4C), s5: Color(0xFF3D3656)),
  WizardPalette(name: 'Coral', primary: Color(0xFFE85D5D), onPrimary: Color(0xFFFFFFFF), primaryContainer: Color(0xFF5C2A2A), onPrimaryContainer: Color(0xFFFFE0E0), bg: Color(0xFF1F0E0E), s1: Color(0xFF291515), s2: Color(0xFF331C1C), s3: Color(0xFF3D2424), s4: Color(0xFF472C2C), s5: Color(0xFF523434)),
  WizardPalette(name: 'Forest', primary: Color(0xFF2E7D32), onPrimary: Color(0xFFFFFFFF), primaryContainer: Color(0xFF1B4A1F), onPrimaryContainer: Color(0xFFD4F5D6), bg: Color(0xFF0A1A0A), s1: Color(0xFF0F2310), s2: Color(0xFF142D16), s3: Color(0xFF1A371C), s4: Color(0xFF1F4122), s5: Color(0xFF254B28)),
  WizardPalette(name: 'Amber', primary: Color(0xFFE6912C), onPrimary: Color(0xFFFFFFFF), primaryContainer: Color(0xFF5C3C10), onPrimaryContainer: Color(0xFFFFF0D4), bg: Color(0xFF1F1505), s1: Color(0xFF291F0A), s2: Color(0xFF332910), s3: Color(0xFF3D3316), s4: Color(0xFF473D1C), s5: Color(0xFF524722)),
];

const poisonPalette = WizardPalette(
  name: 'Poison', primary: Color(0xFFFF5252), onPrimary: Color(0xFF1A0000),
  primaryContainer: Color(0xFF5C1A1A), onPrimaryContainer: Color(0xFFFFE5E5),
  bg: Color(0xFF1A0808), s1: Color(0xFF240D0D), s2: Color(0xFF2E1414), s3: Color(0xFF3A1C1C), s4: Color(0xFF462424), s5: Color(0xFF522C2C),
);

class LinkedAnime {
  final int id;
  final String backupName;
  bool linked;
  String? matchedName;
  LinkedAnime({required this.id, required this.backupName, required this.linked, this.matchedName});
}

final mockAnime = [
  LinkedAnime(id: 1, backupName: "Frieren: Beyond Journey's End", linked: true, matchedName: 'Sousou no Frieren'),
  LinkedAnime(id: 2, backupName: 'Jujutsu Kaisen Season 2', linked: true, matchedName: 'Jujutsu Kaisen 2nd Season'),
  LinkedAnime(id: 3, backupName: 'Demon Slayer: Hashira Training', linked: false),
  LinkedAnime(id: 4, backupName: 'Attack on Titan Final', linked: true, matchedName: 'Shingeki no Kyojin: The Final Season'),
  LinkedAnime(id: 5, backupName: 'Spy x Family Code: White', linked: false),
  LinkedAnime(id: 6, backupName: 'Chainsaw Man', linked: true, matchedName: 'Chainsaw Man'),
  LinkedAnime(id: 7, backupName: 'One Piece Egghead Arc', linked: false),
  LinkedAnime(id: 8, backupName: 'Solo Leveling', linked: true, matchedName: 'Ore dake Level Up na Ken'),
];

enum AdName { poison, pills }
enum AdTiming { appOpen, episodeStart, both }

class AdSettings {
  AdName name; int frequency; AdTiming timing;
  AdSettings({this.name = AdName.poison, this.frequency = 2, this.timing = AdTiming.appOpen});
}

// ═══════════════════════════════════════════════════════════════════════════
// APP ENTRY
// ═══════════════════════════════════════════════════════════════════════════

class SetupWizardApp extends StatelessWidget {
  const SetupWizardApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Setup Wizard',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(useMaterial3: true).copyWith(
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFB3F35A),
          onPrimary: Color(0xFF0A1A00),
          surface: Color(0xFF0A120A),
          onSurface: Color(0xFFECE6F5),
        ),
        scaffoldBackgroundColor: const Color(0xFF0A120A),
      ),
      home: const WizardHome(),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// WIZARD HOME (State + Screen Router)
// ═══════════════════════════════════════════════════════════════════════════

class WizardHome extends StatefulWidget {
  const WizardHome({super.key});
  @override
  State<WizardHome> createState() => _WizardHomeState();
}

class _WizardHomeState extends State<WizardHome> {
  int _stepIndex = 0;
  int _paletteIndex = 0;
  bool _folderSelected = false;
  bool _scanning = false;
  Map<String, bool> _perms = {'installApps': false, 'notifications': false, 'battery': false, 'allFiles': false};
  List<LinkedAnime> _anime = List.from(mockAnime);
  AdSettings _ads = AdSettings();
  int _poisonStep = 0;

  WizardPalette get _palette => _stepIndex == WizardStep.poison.index ? poisonPalette : palettes[_paletteIndex];
  WizardStep get _step => WizardStep.values[_stepIndex];

  void _next() => setState(() => _stepIndex = (_stepIndex + 1).clamp(0, WizardStep.values.length - 1));
  void _back() => setState(() => _stepIndex = (_stepIndex - 1).clamp(0, WizardStep.values.length - 1));
  void _goTo(int i) => setState(() => _stepIndex = i);
  void _skipToPoison() => setState(() => _stepIndex = WizardStep.poison.index);
  void _restart() => setState(() {
    _stepIndex = 0; _paletteIndex = 0; _folderSelected = false; _scanning = false;
    _perms = {'installApps': false, 'notifications': false, 'battery': false, 'allFiles': false};
    _anime = List.from(mockAnime); _ads = AdSettings(); _poisonStep = 0;
  });

  @override
  Widget build(BuildContext context) {
    final p = _palette;
    return Scaffold(
      body: SafeArea(
        top: false,
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
              child: LinearProgressIndicator(
                value: (_stepIndex + 1) / WizardStep.values.length,
                minHeight: 3,
                backgroundColor: p.s3,
                valueColor: AlwaysStoppedAnimation(p.primary),
              ),
            ),
            Expanded(child: _buildScreen(p)),
          ],
        ),
      ),
    );
  }

  Widget _buildScreen(WizardPalette p) {
    switch (_step) {
      case WizardStep.welcome:
        return _WelcomeScreen(p: p, onNext: _next);
      case WizardStep.theme:
        return _ThemeScreen(p: p, paletteIndex: _paletteIndex, onPaletteChange: (i) => setState(() => _paletteIndex = i), onBack: _back, onNext: _next);
      case WizardStep.folder:
        return _FolderScreen(p: p, folderSelected: _folderSelected, scanning: _scanning, onSelect: () => setState(() {_folderSelected = true; _scanning = true; Future.delayed(const Duration(milliseconds: 1500), () => setState(() => _scanning = false));}), onBack: _back, onNext: _next);
      case WizardStep.permissions:
        return _PermissionsScreen(p: p, perms: _perms, onToggle: (k) => setState(() => _perms[k] = !(_perms[k] ?? false)), onBack: _back, onNext: _next);
      case WizardStep.restore:
        return _RestoreScreen(p: p, onBack: _back, onNext: _next, onSkip: _skipToPoison);
      case WizardStep.format:
        return _FormatScreen(p: p, onBack: _back, onNext: _next);
      case WizardStep.processing:
        return _ProcessingScreen(p: p, onNext: _next);
      case WizardStep.summary:
        return _SummaryScreen(p: p, onCancel: () => _goTo(WizardStep.format.index), onNext: _next);
      case WizardStep.linking:
        return _LinkingScreen(p: p, anime: _anime, onUnlink: (id) => setState(() {final a = _anime.firstWhere((e) => e.id == id); a.linked = false; a.matchedName = null;}), onBack: _back, onNext: _next);
      case WizardStep.manual:
        return _ManualScreen(p: p, anime: _anime, onLink: (id, name) => setState(() {final a = _anime.firstWhere((e) => e.id == id); a.linked = true; a.matchedName = name;}), onBack: _back, onNext: _next);
      case WizardStep.restoreSummary:
        return _RestoreSummaryScreen(p: p, anime: _anime, onBack: _back, onNext: _next);
      case WizardStep.restoreProcessing:
        return _RestoreProcessingScreen(p: p, onNext: _next);
      case WizardStep.restoreSuccess:
        return _RestoreSuccessScreen(p: p, onNext: _next);
      case WizardStep.poison:
        return _PoisonScreen(p: p, ads: _ads, onUpdate: (a) => setState(() => _ads = a), step: _poisonStep, onStepChange: (s) => setState(() => _poisonStep = s), onBack: _back, onNext: _next);
      case WizardStep.finish:
        return _FinishScreen(p: p, paletteName: palettes[_paletteIndex].name, folderSelected: _folderSelected, ads: _ads, anime: _anime, onRestart: _restart);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED WIDGETS
// ═══════════════════════════════════════════════════════════════════════════

class _PageHeading extends StatelessWidget {
  final String text;
  final WizardPalette p;
  const _PageHeading(this.text, this.p);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 20, top: 16, right: 20),
      child: Text(text, style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: p.primary, letterSpacing: -0.5)),
    );
  }
}

class _ActionRow extends StatelessWidget {
  final VoidCallback? onBack;
  final VoidCallback? onNext;
  final String nextText;
  final WizardPalette p;
  final bool nextEnabled;
  const _ActionRow({this.onBack, this.onNext, this.nextText = 'Next', required this.p, this.nextEnabled = true});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Row(children: [
        if (onBack != null)
          Expanded(child: ElevatedButton(
            onPressed: onBack,
            style: ElevatedButton.styleFrom(backgroundColor: p.s3, foregroundColor: Colors.white, minimumSize: const Size(0, 52), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999))),
            child: const Text('Back', style: TextStyle(fontWeight: FontWeight.w800)),
          )),
        if (onBack != null && onNext != null) const SizedBox(width: 12),
        if (onNext != null)
          Expanded(child: ElevatedButton(
            onPressed: nextEnabled ? onNext : null,
            style: ElevatedButton.styleFrom(backgroundColor: p.primary, foregroundColor: p.onPrimary, disabledBackgroundColor: p.primary.withOpacity(0.3), minimumSize: const Size(0, 52), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999))),
            child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              Text(nextText, style: const TextStyle(fontWeight: FontWeight.w800)),
              const SizedBox(width: 6),
              const Icon(Icons.arrow_forward, size: 20),
            ]),
          )),
      ]),
    );
  }
}

class _SegmentedToggle extends StatelessWidget {
  final List<String> options;
  final int selected;
  final ValueChanged<int> onChanged;
  final WizardPalette p;
  const _SegmentedToggle({required this.options, required this.selected, required this.onChanged, required this.p});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(999)),
      child: Row(children: List.generate(options.length, (i) {
        final active = i == selected;
        return Expanded(child: GestureDetector(
          onTap: () => onChanged(i),
          child: Container(
            height: 40,
            decoration: BoxDecoration(color: active ? p.primary : Colors.transparent, borderRadius: BorderRadius.circular(999)),
            child: Center(child: Text(options[i], style: TextStyle(color: active ? p.onPrimary : Colors.white54, fontSize: 12, fontWeight: FontWeight.w800), overflow: TextOverflow.ellipsis, maxLines: 1)),
          ),
        ));
      })),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM PAINTERS (Animations)
// ═══════════════════════════════════════════════════════════════════════════

class _PlayMarkPainter extends CustomPainter {
  final WizardPalette p;
  _PlayMarkPainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final c = size.center(Offset.zero);
    final glowPaint = Paint()..color = p.primary.withOpacity(0.3)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 12);
    canvas.drawCircle(c, 60, glowPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromCenter(center: c, width: 80, height: 80), const Radius.circular(22)), Paint()..color = p.primary);
    final path = Path()..moveTo(c.dx - 8, c.dy - 16)..lineTo(c.dx - 8, c.dy + 16)..lineTo(c.dx + 18, c.dy)..close();
    canvas.drawPath(path, Paint()..color = p.onPrimary);
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _FolderPainter extends CustomPainter {
  final WizardPalette p;
  final bool selected;
  _FolderPainter(this.p, this.selected);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    canvas.save();
    canvas.scale(s);
    final glowPaint = Paint()..color = p.primary.withOpacity(0.2)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 8);
    canvas.drawCircle(const Offset(100, 130), 56, glowPaint);
    // back lid
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(40, 88, 118, 28), const Radius.circular(8)), Paint()..color = p.primary);
    // files
    for (final f in [(56.0, 56.0, 34.0, p.s5), (86.0, 50.0, 40.0, p.s4), (116.0, 56.0, 34.0, p.s3)]) {
      canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(f.$1, f.$2, 28, f.$3), const Radius.circular(3)), Paint()..color = f.$4..style = PaintingStyle.stroke..strokeWidth = 1.3);
      canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(f.$1, f.$2, 28, 10), const Radius.circular(3)), Paint()..color = p.primary.withOpacity(0.5));
    }
    // front pocket
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(38, 116, 124, 58), const Radius.circular(8)), Paint()..color = p.s3);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(38, 116, 124, 58), const Radius.circular(8)), Paint()..color = p.s5..style = PaintingStyle.stroke..strokeWidth = 2.2);
    // content lines
    for (final l in [(134.0, 92.0, 0.4), (148.0, 72.0, 0.3), (162.0, 82.0, 0.3)]) {
      canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(54, l.$1, l.$2, 4), const Radius.circular(2)), Paint()..color = p.primary.withOpacity(l.$3));
    }
    if (selected) {
      canvas.drawCircle(const Offset(150, 92), 20, Paint()..color = p.primary);
      canvas.drawLine(const Offset(141, 92), const Offset(148, 99), Paint()..color = p.bg..strokeWidth = 3.5..strokeCap = StrokeCap.round);
      canvas.drawLine(const Offset(148, 99), const Offset(160, 85), Paint()..color = p.bg..strokeWidth = 3.5..strokeCap = StrokeCap.round);
    }
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _ShieldPainter extends CustomPainter {
  final WizardPalette p;
  _ShieldPainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    canvas.save();
    canvas.scale(s);
    final glowPaint = Paint()..color = p.primary.withOpacity(0.22)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 8);
    canvas.drawCircle(const Offset(100, 100), 52, glowPaint);
    final path = Path()
      ..moveTo(100, 56)..lineTo(138, 70)..lineTo(138, 104)
      ..quadraticBezierTo(138, 134, 100, 150)
      ..quadraticBezierTo(62, 134, 62, 104)..lineTo(62, 70)..close();
    canvas.drawPath(path, Paint()..color = p.primaryContainer);
    canvas.drawPath(path, Paint()..color = p.primary..style = PaintingStyle.stroke..strokeWidth = 2.5);
    canvas.drawLine(const Offset(84, 100), const Offset(95, 112), Paint()..color = p.primary..strokeWidth = 5..strokeCap = StrokeCap.round);
    canvas.drawLine(const Offset(95, 112), const Offset(118, 88), Paint()..color = p.primary..strokeWidth = 5..strokeCap = StrokeCap.round);
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _RestorePainter extends CustomPainter {
  final WizardPalette p;
  _RestorePainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    canvas.save();
    canvas.scale(s);
    final glowPaint = Paint()..color = p.primary.withOpacity(0.3)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 14);
    canvas.drawCircle(const Offset(100, 100), 62, glowPaint);
    // file
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(70, 60, 60, 80), const Radius.circular(6)), Paint()..style = PaintingStyle.stroke..strokeWidth = 2..color = p.primary);
    for (final l in [(88.0, 40.0, 0.6), (98.0, 32.0, 0.4), (108.0, 36.0, 0.4)]) {
      canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(80, l.$1, l.$2, 4), const Radius.circular(2)), Paint()..color = p.primary.withOpacity(l.$3));
    }
    // circular arrows
    canvas.drawArc(const Rect.fromLTWH(30, 30, 140, 140), 0.3, 1.2, false, Paint()..color = p.primary..style = PaintingStyle.stroke..strokeWidth = 3..strokeCap = StrokeCap.round);
    canvas.drawArc(const Rect.fromLTWH(30, 30, 140, 140), 3.5, 1.2, false, Paint()..color = p.primary..style = PaintingStyle.stroke..strokeWidth = 3..strokeCap = StrokeCap.round);
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _WarningPainter extends CustomPainter {
  final WizardPalette p;
  _WarningPainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    canvas.save();
    canvas.scale(s);
    final warn = const Color(0xFFFFCC80);
    final glowPaint = Paint()..color = warn.withOpacity(0.18)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10);
    canvas.drawCircle(const Offset(100, 100), 64, glowPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(60, 52, 80, 104), const Radius.circular(6)), Paint()..style = PaintingStyle.stroke..strokeWidth = 2..color = warn);
    for (final l in [(88.0, 52.0, 0.5), (100.0, 40.0, 0.4)]) {
      canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(74, l.$1, l.$2, 4), const Radius.circular(2)), Paint()..color = warn.withOpacity(l.$3));
    }
    // warning triangle
    final tp = Path()..moveTo(140, 118)..lineTo(162, 158)..lineTo(118, 158)..close();
    canvas.drawPath(tp, Paint()..color = warn);
    canvas.drawLine(const Offset(140, 132), const Offset(140, 146), Paint()..color = p.bg..strokeWidth = 3..strokeCap = StrokeCap.round);
    canvas.drawCircle(const Offset(140, 153), 2, Paint()..color = p.bg);
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _ClipboardPainter extends CustomPainter {
  final WizardPalette p;
  _ClipboardPainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    canvas.save();
    canvas.scale(s);
    final glowPaint = Paint()..color = p.primary.withOpacity(0.22)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 8);
    canvas.drawCircle(const Offset(100, 100), 54, glowPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(62, 58, 76, 96), const Radius.circular(10)), Paint()..style = PaintingStyle.stroke..strokeWidth = 2..color = p.primary);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(84, 52, 32, 12), const Radius.circular(4)), Paint()..color = p.primary);
    for (final l in [(84.0, 24.0, 0.55), (98.0, 40.0, 0.35), (112.0, 40.0, 0.35)]) {
      canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(74, l.$1, l.$2, 6), const Radius.circular(3)), Paint()..color = p.primary.withOpacity(l.$3));
    }
    canvas.drawCircle(const Offset(134, 138), 14, Paint()..color = p.primary);
    canvas.drawLine(const Offset(127, 138), const Offset(132, 143), Paint()..color = p.bg..strokeWidth = 3..strokeCap = StrokeCap.round);
    canvas.drawLine(const Offset(132, 143), const Offset(142, 132), Paint()..color = p.bg..strokeWidth = 3..strokeCap = StrokeCap.round);
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _DatabasePainter extends CustomPainter {
  final WizardPalette p;
  _DatabasePainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    canvas.save();
    canvas.scale(s);
    final glowPaint = Paint()..color = p.primary.withOpacity(0.25)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 16);
    canvas.drawCircle(const Offset(100, 100), 62, glowPaint);
    // top ellipse
    canvas.drawOval(const Rect.fromLTWH(56, 44, 88, 24), Paint()..color = p.primaryContainer);
    canvas.drawOval(const Rect.fromLTWH(56, 44, 88, 24), Paint()..color = p.primary..style = PaintingStyle.stroke..strokeWidth = 2.5);
    // body
    canvas.drawRect(const Rect.fromLTWH(56, 56, 88, 76), Paint()..color = p.primaryContainer);
    canvas.drawLine(const Offset(56, 56), const Offset(56, 132), Paint()..color = p.primary..strokeWidth = 2.5);
    canvas.drawLine(const Offset(144, 56), const Offset(144, 132), Paint()..color = p.primary..strokeWidth = 2.5);
    canvas.drawArc(const Rect.fromLTWH(56, 108, 88, 48), 0, math.pi, false, Paint()..color = p.primary..style = PaintingStyle.stroke..strokeWidth = 2.5);
    // rings
    canvas.drawOval(const Rect.fromLTWH(56, 66, 88, 24), Paint()..color = p.primary.withOpacity(0.5)..style = PaintingStyle.stroke..strokeWidth = 1.5);
    canvas.drawOval(const Rect.fromLTWH(56, 88, 88, 24), Paint()..color = p.primary.withOpacity(0.4)..style = PaintingStyle.stroke..strokeWidth = 1.5);
    // check badge
    canvas.drawCircle(const Offset(142, 58), 22, Paint()..color = p.primary);
    canvas.drawLine(const Offset(132, 58), const Offset(139, 65), Paint()..color = p.onPrimary..strokeWidth = 4..strokeCap = StrokeCap.round);
    canvas.drawLine(const Offset(139, 65), const Offset(153, 51), Paint()..color = p.onPrimary..strokeWidth = 4..strokeCap = StrokeCap.round);
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _PoisonBottlePainter extends CustomPainter {
  final WizardPalette p;
  _PoisonBottlePainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 140;
    canvas.save();
    canvas.scale(s);
    final cx = 50.0;
    // bottle body
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(30, 30, 40, 90), const Radius.circular(12)), Paint()..color = p.primaryContainer);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(30, 30, 40, 90), const Radius.circular(12)), Paint()..color = p.primary..style = PaintingStyle.stroke..strokeWidth = 2.5);
    // neck + cap
    canvas.drawRRect(RRect.fromLTRBR(38, 14, 62, 32, const Radius.circular(2)), Paint()..color = p.s4);
    canvas.drawRRect(RRect.fromLTRBR(36, 8, 64, 16, const Radius.circular(2)), Paint()..color = p.primary);
    // liquid
    canvas.drawRect(const Rect.fromLTWH(30, 72, 40, 48), Paint()..color = p.primary.withOpacity(0.55));
    // label
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(34, 74, 32, 38), const Radius.circular(3)), Paint()..color = p.bg.withOpacity(0.94));
    // crossed bones
    canvas.drawLine(const Offset(40, 106), const Offset(60, 82), Paint()..color = p.primary..strokeWidth = 2.5..strokeCap = StrokeCap.round);
    canvas.drawLine(const Offset(60, 106), const Offset(40, 82), Paint()..color = p.primary..strokeWidth = 2.5..strokeCap = StrokeCap.round);
    for (final pos in [const Offset(40, 106), const Offset(60, 82), const Offset(60, 106), const Offset(40, 82)]) {
      canvas.drawCircle(pos, 2.5, Paint()..color = p.primary);
    }
    // skull
    canvas.drawCircle(const Offset(50, 92), 8, Paint()..color = p.primary);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(44, 99, 12, 6), const Radius.circular(2)), Paint()..color = p.primary);
    canvas.drawCircle(const Offset(47, 91), 2, Paint()..color = p.bg);
    canvas.drawCircle(const Offset(53, 91), 2, Paint()..color = p.bg);
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _FinishPainter extends CustomPainter {
  final WizardPalette p;
  _FinishPainter(this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 200;
    canvas.save();
    canvas.scale(s);
    final glowPaint = Paint()..color = p.primary.withOpacity(0.3)..maskFilter = const MaskFilter.blur(BlurStyle.normal, 14);
    canvas.drawCircle(const Offset(100, 100), 60, glowPaint);
    canvas.drawCircle(const Offset(100, 100), 40, Paint()..color = p.primary);
    canvas.drawLine(const Offset(82, 100), const Offset(94, 113), Paint()..color = p.onPrimary..strokeWidth = 6..strokeCap = StrokeCap.round);
    canvas.drawLine(const Offset(94, 113), const Offset(120, 87), Paint()..color = p.onPrimary..strokeWidth = 6..strokeCap = StrokeCap.round);
    for (final pos in [const Offset(50, 60), const Offset(152, 58), const Offset(156, 140), const Offset(46, 142)]) {
      canvas.drawCircle(pos, 2, Paint()..color = p.primary);
    }
    canvas.restore();
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED VISUAL WRAPPER
// ═══════════════════════════════════════════════════════════════════════════

class _AnimatedVisual extends StatefulWidget {
  final CustomPainter Function() painterFn;
  final double size;
  const _AnimatedVisual({required this.painterFn, this.size = 150});

  @override
  State<_AnimatedVisual> createState() => _AnimatedVisualState();
}

class _AnimatedVisualState extends State<_AnimatedVisual> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(seconds: 3));
    _anim = Tween(begin: 0.96, end: 1.04).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut));
    _ctrl.repeat(reverse: true);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _anim,
      builder: (_, __) => SizedBox(
        width: widget.size,
        height: widget.size,
        child: CustomPaint(painter: _ScaledPainter(widget.painterFn(), _anim.value)),
      ),
    );
  }
}

class _ScaledPainter extends CustomPainter {
  final CustomPainter base;
  final double scale;
  _ScaledPainter(this.base, this.scale);

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(scale);
    base.paint(canvas, size);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

// ═══════════════════════════════════════════════════════════════════════════
// SCREENS (all 15)
// ═══════════════════════════════════════════════════════════════════════════

// 1. WELCOME
class _WelcomeScreen extends StatelessWidget {
  final WizardPalette p;
  final VoidCallback onNext;
  const _WelcomeScreen({required this.p, required this.onNext});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Welcome to Anime App!', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(height: 8),
          Text("Let's get things quickly set up for you.", style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 16)),
          const SizedBox(height: 16),
          _AnimatedVisual(painterFn: () => _PlayMarkPainter(p), size: 140),
          const SizedBox(height: 16),
          for (final item in [('Track what you watch', Icons.check_circle_outline), ('Pick up anywhere', Icons.sync), ('Never miss a release', Icons.notifications_outlined)])
            Container(margin: const EdgeInsets.only(bottom: 8), padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(16)),
              child: Row(children: [
                Container(width: 32, height: 32, decoration: BoxDecoration(color: p.primary.withOpacity(0.16), borderRadius: BorderRadius.circular(9)),
                  child: Icon(item.$2, color: p.primary, size: 18)),
                const SizedBox(width: 12),
                Text(item.$1, style: const TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.bold)),
              ])),
        ]),
      )),
      _ActionRow(onNext: onNext, nextText: 'Get Started', p: p),
    ]);
  }
}

// 2. THEME
class _ThemeScreen extends StatelessWidget {
  final WizardPalette p;
  final int paletteIndex;
  final ValueChanged<int> onPaletteChange;
  final VoidCallback onBack, onNext;
  const _ThemeScreen({required this.p, required this.paletteIndex, required this.onPaletteChange, required this.onBack, required this.onNext});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Theme', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(children: [
          const SizedBox(height: 16),
          // Mini smartphone preview
          Container(width: 130, height: 240, margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(18), border: Border.all(color: p.s5, width: 3)),
            child: Container(margin: const EdgeInsets.all(5), decoration: BoxDecoration(color: p.bg, borderRadius: BorderRadius.circular(14)),
              child: Padding(padding: const EdgeInsets.only(top: 22), child: Column(children: [
                Container(width: double.infinity, height: 42, margin: const EdgeInsets.symmetric(horizontal: 9, vertical: 6), decoration: BoxDecoration(color: p.primary.withOpacity(0.5), borderRadius: BorderRadius.circular(10))),
                for (int i = 0; i < 3; i++) Container(width: 100, height: 8, margin: const EdgeInsets.symmetric(vertical: 3), decoration: BoxDecoration(color: p.s3, borderRadius: BorderRadius.circular(999))),
                const SizedBox(height: 4),
                Row(children: List.generate(3, (i) => Expanded(child: Container(height: 42, margin: const EdgeInsets.symmetric(horizontal: 2), decoration: BoxDecoration(color: p.s4, borderRadius: BorderRadius.circular(6)))))),
              ])),
            ),
          ),
          const Text('Choose your theme', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 2),
          Text('Pick a mode and a color and we are set with it.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14)),
          const SizedBox(height: 12),
          _SegmentedToggle(options: ['Dark', 'Light', 'System'], selected: 0, onChanged: (_) {}, p: p),
          const SizedBox(height: 12),
          SizedBox(height: 100, child: ListView.builder(scrollDirection: Axis.horizontal, itemCount: palettes.length,
            itemBuilder: (_, i) {
              final pal = palettes[i];
              final active = i == paletteIndex;
              return GestureDetector(onTap: () => onPaletteChange(i),
                child: Container(width: 92, margin: const EdgeInsets.only(right: 12),
                  decoration: BoxDecoration(color: active ? pal.primary.withOpacity(0.12) : p.s2, borderRadius: BorderRadius.circular(16), border: Border.all(color: active ? pal.primary : Colors.transparent, width: 2)),
                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Container(width: 44, height: 44, decoration: BoxDecoration(shape: BoxShape.circle, gradient: LinearGradient(colors: [pal.primary, pal.primary.withOpacity(0.7)]))),
                    const SizedBox(height: 8),
                    Text(pal.name, style: TextStyle(color: active ? pal.primary : Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                  ])),
                );
            },
          )),
        ]),
      )),
      _ActionRow(onBack: onBack, onNext: onNext, p: p),
    ]);
  }
}

// 3. FOLDER
class _FolderScreen extends StatelessWidget {
  final WizardPalette p;
  final bool folderSelected, scanning;
  final VoidCallback onSelect, onBack, onNext;
  const _FolderScreen({required this.p, required this.folderSelected, required this.scanning, required this.onSelect, required this.onBack, required this.onNext});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Folder', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(height: 12),
          _AnimatedVisual(painterFn: () => _FolderPainter(p, folderSelected && !scanning), size: 150),
          const SizedBox(height: 12),
          Text(folderSelected ? 'Folder connected!' : 'Select your anime folder', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 4),
          Text(folderSelected ? (scanning ? 'Scanning your library...' : 'Your library is ready to go. Continue when you are.') : "Pick the folder where your anime library lives. We'll scan it and organize everything for you.",
            style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14), textAlign: TextAlign.center),
          const SizedBox(height: 12),
          if (!folderSelected)
            OutlinedButton(onPressed: onSelect, style: OutlinedButton.styleFrom(foregroundColor: p.primary, side: BorderSide(color: p.primary, width: 1.5), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)), minimumSize: const Size(0, 44)),
              child: Row(mainAxisSize: MainAxisSize.min, children: [Icon(Icons.folder_outlined, color: p.primary, size: 18), const SizedBox(width: 6), const Text('Select Folder', style: TextStyle(fontWeight: FontWeight.bold))])),
          if (folderSelected)
            Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(16), border: Border.all(color: p.primary)),
              child: Row(children: [
                Container(width: 48, height: 48, decoration: BoxDecoration(color: p.primaryContainer, borderRadius: BorderRadius.circular(12)), child: Icon(Icons.folder, color: p.onPrimaryContainer)),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Text('/storage/anime-library', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                  Text(scanning ? 'Scanning...' : '247 items - ready', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12)),
                ])),
                if (!scanning) Icon(Icons.check_circle, color: p.primary),
              ])),
        ]),
      )),
      if (scanning) _ActionRow(onBack: onBack, p: p, nextText: 'Scanning...', nextEnabled: false)
      else _ActionRow(onBack: onBack, onNext: onNext, nextText: 'Continue', p: p, nextEnabled: folderSelected),
    ]);
  }
}

// 4. PERMISSIONS
class _PermissionsScreen extends StatelessWidget {
  final WizardPalette p;
  final Map<String, bool> perms;
  final ValueChanged<String> onToggle;
  final VoidCallback onBack, onNext;
  const _PermissionsScreen({required this.p, required this.perms, required this.onToggle, required this.onBack, required this.onNext});

  @override
  Widget build(BuildContext context) {
    final rows = [('installApps', 'Install apps', 'Allow installing anime extensions', Icons.download), ('notifications', 'Notifications', 'Get notified about new episodes', Icons.notifications), ('battery', 'Battery', 'Allow background sync for updates', Icons.battery_full), ('allFiles', 'All files access', 'Access all files on your device', Icons.folder)];
    return Column(children: [
      _PageHeading('Permissions', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(height: 8),
          _AnimatedVisual(painterFn: () => _ShieldPainter(p), size: 150),
          const SizedBox(height: 8),
          const Text('Grant permissions', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          Text('Optional: you can skip these', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14)),
          const SizedBox(height: 12),
          for (final row in rows)
            Container(margin: const EdgeInsets.only(bottom: 6), padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(16)),
              child: Row(children: [
                Container(width: 40, height: 40, decoration: BoxDecoration(color: (perms[row.$1] ?? false) ? p.primary : p.s3, borderRadius: BorderRadius.circular(12)), child: Icon(row.$4, color: (perms[row.$1] ?? false) ? p.onPrimary : Colors.white, size: 20)),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(row.$2, style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                  Text(row.$3, style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 11), maxLines: 1, overflow: TextOverflow.ellipsis),
                ])),
                Switch(value: perms[row.$1] ?? false, onChanged: row.$1 == 'allFiles' ? null : (_) => onToggle(row.$1), activeColor: p.primary),
              ])),
        ]),
      )),
      _ActionRow(onBack: onBack, onNext: onNext, nextText: 'Continue', p: p),
    ]);
  }
}

// 5. RESTORE BACKUP
class _RestoreScreen extends StatelessWidget {
  final WizardPalette p;
  final VoidCallback onBack, onNext, onSkip;
  const _RestoreScreen({required this.p, required this.onBack, required this.onNext, required this.onSkip});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Restore Backup', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(height: 12),
          _AnimatedVisual(painterFn: () => _RestorePainter(p), size: 150),
          const SizedBox(height: 12),
          const Text('Restore backup', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 4),
          Text('Got a backup from a previous install? Restore your library, history, and settings in one tap.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14), textAlign: TextAlign.center),
          const SizedBox(height: 12),
          OutlinedButton(onPressed: onNext, style: OutlinedButton.styleFrom(foregroundColor: p.primary, side: BorderSide(color: p.primary, width: 1.5), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)), minimumSize: const Size(0, 44)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [Icon(Icons.file_download, color: p.primary, size: 18), const SizedBox(width: 6), const Text('Select Backup File', style: TextStyle(fontWeight: FontWeight.bold))])),
        ]),
      )),
      Padding(padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        child: Row(children: [
          Expanded(child: ElevatedButton(onPressed: onBack, style: ElevatedButton.styleFrom(backgroundColor: p.s3, foregroundColor: Colors.white, minimumSize: const Size(0, 52), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999))), child: const Text('Back', style: TextStyle(fontWeight: FontWeight.w800)))),
          const SizedBox(width: 12),
          TextButton(onPressed: onSkip, child: Text('Skip', style: TextStyle(color: Colors.white.withOpacity(0.5), fontWeight: FontWeight.bold))),
        ]),
      ),
    ]);
  }
}

// 6. FORMAT NOT SUPPORTED
class _FormatScreen extends StatelessWidget {
  final WizardPalette p;
  final VoidCallback onBack, onNext;
  const _FormatScreen({required this.p, required this.onBack, required this.onNext});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Restore Backup', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(height: 12),
          _AnimatedVisual(painterFn: () => _WarningPainter(p), size: 150),
          const SizedBox(height: 12),
          const Text('This is not the format I was expecting.', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: Colors.white), textAlign: TextAlign.center),
          const SizedBox(height: 6),
          Text('Still, I can try to restore from it properly.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 13), textAlign: TextAlign.center),
          const SizedBox(height: 12),
          Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(16)),
            child: Row(children: [
              Container(width: 48, height: 48, decoration: BoxDecoration(color: p.primary.withOpacity(0.15), borderRadius: BorderRadius.circular(12)), child: Icon(Icons.description, color: p.primary)),
              const SizedBox(width: 12),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text('anime_backup_2025-01-15.json', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                Text('2.3 MB - JSON (unknown schema)', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12)),
              ]),
            ]),
        ]),
      )),
      _ActionRow(onBack: onBack, onNext: onNext, nextText: 'Try restoring anyway', p: p),
    ]);
  }
}

// 7. PROCESSING BACKUP
class _ProcessingScreen extends StatefulWidget {
  final WizardPalette p;
  final VoidCallback onNext;
  const _ProcessingScreen({required this.p, required this.onNext});
  @override
  State<_ProcessingScreen> createState() => _ProcessingScreenState();
}

class _ProcessingScreenState extends State<_ProcessingScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 2500), () => widget.onNext());
  }
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Restore Backup', widget.p),
      Expanded(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        SizedBox(width: 150, height: 150, child: CustomPaint(painter: _RestorePainter(widget.p))),
        const SizedBox(height: 12),
        const Text('Processing backup', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 4),
        Text('Reading your backup file and extracting data...', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14)),
        const SizedBox(height: 12),
        Container(padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8), decoration: BoxDecoration(color: widget.p.primary.withOpacity(0.15), borderRadius: BorderRadius.circular(999)),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            Text('Processing', style: TextStyle(color: widget.p.primary, fontSize: 13, fontWeight: FontWeight.w800)),
            const SizedBox(width: 8),
            for (int i = 0; i < 3; i++) ...[Container(width: 6, height: 6, margin: const EdgeInsets.only(right: 4), decoration: BoxDecoration(color: widget.p.primary, shape: BoxShape.circle)),],
          ]),
        ),
      ])),
      Padding(padding: const EdgeInsets.all(20), child: Text('Please wait...', style: TextStyle(color: Colors.white.withOpacity(0.5)))),
    ]);
  }
}

// 8. BACKUP SUMMARY
class _SummaryScreen extends StatelessWidget {
  final WizardPalette p;
  final VoidCallback onCancel, onNext;
  const _SummaryScreen({required this.p, required this.onCancel, required this.onNext});

  @override
  Widget build(BuildContext context) {
    final items = [('Anime detected', '247', Icons.play_circle), ('Categories', '12', Icons.category), ('Episodes tracked', '1,432', Icons.movie), ('Watch history', '89', Icons.history), ('Settings', '-', Icons.settings), ('Manga entries', '12', Icons.menu_book)];
    return Column(children: [
      _PageHeading('Restore Backup', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(children: [
          const SizedBox(height: 8),
          SizedBox(width: 130, height: 130, child: CustomPaint(painter: _ClipboardPainter(p))),
          const SizedBox(height: 8),
          const Text('Backup summary', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 8),
          for (int i = 0; i < items.length; i++)
            Container(margin: const EdgeInsets.only(bottom: 6), padding: const EdgeInsets.all(11),
              decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(16), border: Border.all(color: i == 5 ? const Color(0xFFF2B8B5).withOpacity(0.4) : p.s3)),
              child: Row(children: [
                Container(width: 34, height: 34, decoration: BoxDecoration(color: i == 5 ? const Color(0xFFF2B8B5).withOpacity(0.18) : p.primary.withOpacity(0.16), borderRadius: BorderRadius.circular(9)), child: Icon(items[i].$3, color: i == 5 ? const Color(0xFFF2B8B5) : p.primary, size: 18)),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(items[i].$1, style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                  Text(i == 5 ? 'Not supported - will be skipped' : 'Ready to restore', style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 11)),
                ])),
                Text(items[i].$2, style: TextStyle(color: i == 5 ? const Color(0xFFF2B8B5) : p.primary, fontSize: 18, fontWeight: FontWeight.w800)),
              ])),
        ]),
      )),
      _ActionRow(onBack: onCancel, onNext: onNext, nextText: 'Restore', p: p),
    ]);
  }
}

// 9. LINKING ANIME
class _LinkingScreen extends StatefulWidget {
  final WizardPalette p;
  final List<LinkedAnime> anime;
  final ValueChanged<int> onUnlink;
  final VoidCallback onBack, onNext;
  const _LinkingScreen({required this.p, required this.anime, required this.onUnlink, required this.onBack, required this.onNext});
  @override
  State<_LinkingScreen> createState() => _LinkingScreenState();
}

class _LinkingScreenState extends State<_LinkingScreen> {
  int _revealed = 0;
  int? _popupId;

  @override
  void initState() {
    super.initState();
    _revealNext();
  }

  void _revealNext() {
    if (_revealed < widget.anime.length) {
      Future.delayed(const Duration(milliseconds: 400), () {
        if (mounted) { setState(() => _revealed++); _revealNext(); }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final linked = widget.anime.where((a) => a.linked).length;
    final unlinked = widget.anime.where((a) => !a.linked).length;
    final total = widget.anime.length;
    final remaining = (total - _revealed).clamp(0, total);
    final allRevealed = _revealed >= total;

    return Column(children: [
      Padding(padding: const EdgeInsets.only(left: 20, top: 16, right: 20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
          Text('Backup Restore', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: widget.p.primary)),
          const Text('Linking anime', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          Text('Matching your backup entries', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14)),
          const SizedBox(height: 8),
          Row(children: [
            for (final item in [('Linked', linked, widget.p.primary), ('No match', unlinked, const Color(0xFFF2B8B5)), ('Total', total, Colors.white), ('Remaining', remaining, Colors.white.withOpacity(0.5))])
              Expanded(child: Container(margin: const EdgeInsets.symmetric(horizontal: 2), padding: const EdgeInsets.symmetric(vertical: 5),
                decoration: BoxDecoration(color: widget.p.s2, borderRadius: BorderRadius.circular(10), border: Border.all(color: widget.p.s3)),
                child: Column(children: [
                  Text('${item.$2}', style: TextStyle(color: item.$3, fontSize: 18, fontWeight: FontWeight.w800)),
                  Text(item.$1, style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 8, fontWeight: FontWeight.bold)),
                ]))),
              ]),
          ]),
        ),
      Expanded(child: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        itemCount: widget.anime.take(_revealed).length,
        itemBuilder: (_, i) {
          final a = widget.anime[i];
          return GestureDetector(onTap: a.linked ? () => setState(() => _popupId = a.id) : null,
            child: Container(height: 48, margin: const EdgeInsets.only(bottom: 6), padding: const EdgeInsets.symmetric(horizontal: 11),
              decoration: BoxDecoration(color: widget.p.s2, borderRadius: BorderRadius.circular(12), border: Border.all(color: widget.p.s3)),
              child: Row(children: [
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.center, children: [
                  Text(a.backupName, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold), maxLines: 2, overflow: TextOverflow.ellipsis),
                  if (a.linked && a.matchedName != null) Text(a.matchedName!, style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10), maxLines: 1, overflow: TextOverflow.ellipsis),
                ])),
                const SizedBox(width: 8),
                Container(width: 26, height: 26, decoration: BoxDecoration(shape: BoxShape.circle, color: a.linked ? widget.p.primary.withOpacity(0.18) : const Color(0xFFF2B8B5).withOpacity(0.16)),
                  child: Icon(a.linked ? Icons.check : Icons.close, color: a.linked ? widget.p.primary : const Color(0xFFF2B8B5), size: 16)),
                const SizedBox(width: 8),
                if (a.linked) Container(width: 30, height: 42, decoration: BoxDecoration(gradient: LinearGradient(colors: [widget.p.primary, widget.p.primary.withOpacity(0.5)]), borderRadius: BorderRadius.circular(5)),
                    child: Center(child: Text(a.backupName[0], style: TextStyle(color: widget.p.onPrimary, fontSize: 14, fontWeight: FontWeight.w800))))
                else const SizedBox(width: 30, height: 42),
              ])),
            );
        },
      )),
      _ActionRow(onBack: widget.onBack, onNext: widget.onNext, p: widget.p, nextEnabled: allRevealed),
      if (_popupId != null)
        GestureDetector(onTap: () => setState(() => _popupId = null),
          child: Container(color: Colors.black.withOpacity(0.5), child: Center(child: GestureDetector(onTap: () {},
            child: Container(margin: const EdgeInsets.all(20), padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: widget.p.s2, borderRadius: BorderRadius.circular(20), border: Border.all(color: widget.p.s4)),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                const Text('Linked entry', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w800)),
                const SizedBox(height: 12),
                Text('This entry was auto-linked. If the match is wrong, mark it as not linked.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12)),
                const SizedBox(height: 12),
                Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: widget.p.s3, borderRadius: BorderRadius.circular(12)),
                  child: Text(widget.anime.firstWhere((e) => e.id == _popupId).backupName, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold))),
                const SizedBox(height: 12),
                Row(children: [
                  Expanded(child: ElevatedButton(onPressed: () => setState(() => _popupId = null), style: ElevatedButton.styleFrom(backgroundColor: widget.p.s3, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999))), child: const Text('Keep linked', style: TextStyle(fontWeight: FontWeight.bold)))),
                  const SizedBox(width: 12),
                  Expanded(child: ElevatedButton(onPressed: () { widget.onUnlink(_popupId!); setState(() => _popupId = null); }, style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFF2B8B5), foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999))), child: const Text('Mark as not linked', style: TextStyle(fontWeight: FontWeight.bold)))),
                ]),
              ])),
            ),
            ),
            ),
          ),
    ]);
  }
}

// 10. MANUAL LINKING
class _ManualScreen extends StatefulWidget {
  final WizardPalette p;
  final List<LinkedAnime> anime;
  final void Function(int, String) onLink;
  final VoidCallback onBack, onNext;
  const _ManualScreen({required this.p, required this.anime, required this.onLink, required this.onBack, required this.onNext});
  @override
  State<_ManualScreen> createState() => _ManualScreenState();
}

class _ManualScreenState extends State<_ManualScreen> {
  bool _searchOpen = false;
  int? _selectedId;
  String _query = '';
  final _mockResults = [('Demon Slayer: Hashira Training Arc', 'Kimetsu no Yaiba - 2024'), ('Kimetsu no Yaiba: Hashira Geiko-hen', 'Japanese title - 2024'), ('Demon Slayer Season 4', 'Sequel - 8 eps')];

  @override
  Widget build(BuildContext context) {
    final unlinked = widget.anime.where((a) => !a.linked).toList();
    if (_searchOpen) return _buildSearch();
    return Column(children: [
      _PageHeading('Restore Backup', widget.p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(children: [
          const SizedBox(height: 8),
          const Text('Manual linking', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          Text(unlinked.isEmpty ? 'All anime are linked!' : '${unlinked.length} anime need your help. Tap any entry to search for a match.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14), textAlign: TextAlign.center),
          const SizedBox(height: 12),
          for (final a in unlinked)
            GestureDetector(onTap: () { setState(() { _selectedId = a.id; _query = a.backupName; _searchOpen = true; }); },
              child: Container(margin: const EdgeInsets.only(bottom: 6), padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: widget.p.s2, borderRadius: BorderRadius.circular(12), border: Border.all(color: widget.p.s3)),
                child: Row(children: [
                  Expanded(child: Text(a.backupName, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold), maxLines: 2, overflow: TextOverflow.ellipsis)),
                  Container(width: 28, height: 28, decoration: BoxDecoration(shape: BoxShape.circle, color: widget.p.primary.withOpacity(0.16)), child: Icon(Icons.add, color: widget.p.primary, size: 16)),
                ])),
            ),
        ]),
      )),
      _ActionRow(onBack: widget.onBack, onNext: widget.onNext, nextText: 'Continue', p: widget.p),
    ]);
  }

  Widget _buildSearch() {
    final selected = widget.anime.where((a) => a.id == _selectedId).firstOrNull;
    final filtered = _mockResults.where((r) => r.$1.toLowerCase().contains(_query.toLowerCase()) || r.$2.toLowerCase().contains(_query.toLowerCase())).toList();
    return Column(children: [
      Padding(padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 8, right: 16),
        child: Row(children: [
          IconButton(onPressed: () => setState(() => _searchOpen = false), icon: const Icon(Icons.arrow_back, color: Colors.white)),
          const Text('Find a match', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Colors.white)),
        ]),
      ),
      Padding(padding: const EdgeInsets.all(16),
        child: Text('Linking: ${selected?.backupName ?? ''}', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12)),
      ),
      Padding(padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(children: [
          Expanded(child: Container(height: 48, decoration: BoxDecoration(color: widget.p.s2, borderRadius: BorderRadius.circular(999), border: Border.all(color: widget.p.s4)),
            child: TextField(onChanged: (v) => setState(() => _query = v), style: const TextStyle(color: Colors.white, fontSize: 14),
              decoration: InputDecoration(hintText: 'Search for anime...', hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)), prefixIcon: const Icon(Icons.search, color: Colors.white54, size: 20), border: InputBorder.none, contentPadding: const EdgeInsets.symmetric(horizontal: 16)))),
          const SizedBox(width: 6),
          Container(width: 38, height: 38, decoration: BoxDecoration(shape: BoxShape.circle, color: widget.p.primary), child: Icon(Icons.search, color: widget.p.onPrimary, size: 18)),
        ]),
      ),
      const SizedBox(height: 12),
      Expanded(child: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: filtered.isEmpty ? 1 : filtered.length,
        itemBuilder: (_, i) {
          if (filtered.isEmpty) return Padding(padding: const EdgeInsets.all(32), child: Text('No results found.', style: TextStyle(color: Colors.white.withOpacity(0.5))));
          return GestureDetector(onTap: () { widget.onLink(_selectedId!, filtered[i].$1); setState(() { _searchOpen = false; _selectedId = null; }); },
            child: Container(margin: const EdgeInsets.only(bottom: 7), padding: const EdgeInsets.all(9),
              decoration: BoxDecoration(color: widget.p.s2, borderRadius: BorderRadius.circular(12), border: Border.all(color: widget.p.s3)),
              child: Row(children: [
                Container(width: 34, height: 48, decoration: BoxDecoration(gradient: LinearGradient(colors: [widget.p.primary, widget.p.primary.withOpacity(0.5)]), borderRadius: BorderRadius.circular(5)), child: Center(child: Text(filtered[i].$1[0], style: TextStyle(color: widget.p.onPrimary, fontSize: 13, fontWeight: FontWeight.w800)))),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(filtered[i].$1, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold), maxLines: 2), Text(filtered[i].$2, style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10))])),
                Container(width: 28, height: 28, decoration: BoxDecoration(shape: BoxShape.circle, color: widget.p.primary.withOpacity(0.16)), child: Icon(Icons.add, color: widget.p.primary, size: 16)),
              ])),
            );
        },
      )),
    ]);
  }
}

// 11. RESTORE SUMMARY
class _RestoreSummaryScreen extends StatelessWidget {
  final WizardPalette p;
  final List<LinkedAnime> anime;
  final VoidCallback onBack, onNext;
  const _RestoreSummaryScreen({required this.p, required this.anime, required this.onBack, required this.onNext});

  @override
  Widget build(BuildContext context) {
    final linked = anime.where((a) => a.linked).length;
    final toRestore = linked + 239;
    return Column(children: [
      _PageHeading('Restore Backup', p),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(children: [
          const SizedBox(height: 12),
          const Text('Restore summary', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
          Text('Ready to restore. Review the details below.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14)),
          const SizedBox(height: 12),
          Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(20), border: Border.all(color: p.s3)),
            child: Column(children: [
              Row(children: [
                Container(width: 40, height: 40, decoration: BoxDecoration(color: p.primary.withOpacity(0.16), borderRadius: BorderRadius.circular(12)), child: Icon(Icons.download, color: p.primary)),
                const SizedBox(width: 12),
                const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('Ready to restore', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w800)), Text('Your library will be overwritten.', style: TextStyle(color: Colors.white54, fontSize: 11))]),
              ]),
              const SizedBox(height: 8),
              Row(children: [
                Expanded(child: Container(padding: const EdgeInsets.all(10), color: p.s3, child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('$toRestore', style: TextStyle(color: p.primary, fontSize: 20, fontWeight: FontWeight.w800)), Text('Anime to restore', style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10, fontWeight: FontWeight.bold))]))),
                const SizedBox(width: 1),
                Expanded(child: Container(padding: const EdgeInsets.all(10), color: p.s3, child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('$linked', style: TextStyle(color: p.primary, fontSize: 20, fontWeight: FontWeight.w800)), Text('Auto-linked', style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10, fontWeight: FontWeight.bold))]))),
              ]),
              const SizedBox(height: 1),
              Row(children: [
                Expanded(child: Container(padding: const EdgeInsets.all(10), color: p.s3, child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('0', style: TextStyle(color: Color(0xFFB3F35A), fontSize: 20, fontWeight: FontWeight.w800)), Text('Manually linked', style: TextStyle(color: Colors.white54, fontSize: 10, fontWeight: FontWeight.bold))]))),
                const SizedBox(width: 1),
                Expanded(child: Container(padding: const EdgeInsets.all(10), color: p.s3, child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('1,432', style: TextStyle(color: Color(0xFFB3F35A), fontSize: 20, fontWeight: FontWeight.w800)), Text('Episodes', style: TextStyle(color: Colors.white54, fontSize: 10, fontWeight: FontWeight.bold))]))),
              ]),
            ]),
          ),
          const SizedBox(height: 8),
          Container(padding: const EdgeInsets.all(11), decoration: BoxDecoration(color: p.primary.withOpacity(0.07), borderRadius: BorderRadius.circular(16), border: Border.all(color: p.primary.withOpacity(0.33))),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [Icon(Icons.info, color: p.primary, size: 20), const SizedBox(width: 10), Expanded(child: Text('This will overwrite any existing library data. The restore process may take a few moments.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12)))]),
        ]),
      )),
      _ActionRow(onBack: onBack, onNext: onNext, nextText: 'Restore Now', p: p),
    ]);
  }
}

// 12. RESTORE PROCESSING
class _RestoreProcessingScreen extends StatefulWidget {
  final WizardPalette p;
  final VoidCallback onNext;
  const _RestoreProcessingScreen({required this.p, required this.onNext});
  @override
  State<_RestoreProcessingScreen> createState() => _RestoreProcessingScreenState();
}

class _RestoreProcessingScreenState extends State<_RestoreProcessingScreen> {
  @override
  void initState() { super.initState(); Future.delayed(const Duration(milliseconds: 3200), () => widget.onNext()); }
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Restore Backup', widget.p),
      Expanded(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        SizedBox(width: 150, height: 150, child: CustomPaint(painter: _RestorePainter(widget.p))),
        const SizedBox(height: 12),
        const Text('Restoring your library', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 4),
        Text('Please wait while we restore 247 anime to your library.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14), textAlign: TextAlign.center),
      ])),
      Padding(padding: const EdgeInsets.all(20), child: Text('Restoring...', style: TextStyle(color: Colors.white.withOpacity(0.5)))),
    ]);
  }
}

// 13. RESTORE SUCCESS
class _RestoreSuccessScreen extends StatelessWidget {
  final WizardPalette p;
  final VoidCallback onNext;
  const _RestoreSuccessScreen({required this.p, required this.onNext});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      _PageHeading('Restore Backup', p),
      Expanded(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        _AnimatedVisual(painterFn: () => _DatabasePainter(p), size: 160),
        const SizedBox(height: 12),
        const Text('Restore successful!', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
        const SizedBox(height: 4),
        Text('Your library has been restored and is ready to go.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14), textAlign: TextAlign.center),
      ])),
      _ActionRow(onNext: onNext, nextText: 'Continue', p: p),
    ]);
  }
}

// 14. POISON
class _PoisonScreen extends StatelessWidget {
  final WizardPalette p;
  final AdSettings ads;
  final ValueChanged<AdSettings> onUpdate;
  final int step;
  final ValueChanged<int> onStepChange;
  final VoidCallback onBack, onNext;
  const _PoisonScreen({required this.p, required this.ads, required this.onUpdate, required this.step, required this.onStepChange, required this.onBack, required this.onNext});

  @override
  Widget build(BuildContext context) {
    final visualCount = step == 0 ? 1 : ads.frequency;
    return Column(children: [
      Padding(padding: const EdgeInsets.only(left: 20, top: 16, right: 20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('Choose Your Poison', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Color(0xFFFF6B6B))),
          const Text("Ads keep the app free. Let's make them non-intrusive - pick your daily dose.", style: TextStyle(color: Color(0xFFD9A0A0), fontSize: 14)),
        ]),
      ),
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(height: 12),
          SizedBox(height: 180, child: Row(mainAxisAlignment: MainAxisAlignment.center, children: List.generate(visualCount, (i) {
            return Container(width: 100, margin: const EdgeInsets.symmetric(horizontal: 4),
              child: ads.name == AdName.poison
                ? _AnimatedVisual(painterFn: () => _PoisonBottlePainter(p), size: 100)
                : _buildPill(p),
            );
          }))),
          const SizedBox(height: 8),
          Row(children: List.generate(3, (i) => Expanded(child: Container(height: 4, margin: const EdgeInsets.symmetric(horizontal: 3), decoration: BoxDecoration(color: i <= step ? p.primary : p.s3, borderRadius: BorderRadius.circular(999)))))),
          const SizedBox(height: 16),
          if (step == 0) ...[
            const Text('What should we call it?', style: TextStyle(color: Color(0xFFD9A0A0), fontSize: 11, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            _SegmentedToggle(options: ['Daily dose of poison', 'Daily dose of pills'], selected: ads.name == AdName.poison ? 0 : 1, onChanged: (i) => onUpdate(AdSettings(name: i == 0 ? AdName.poison : AdName.pills, frequency: ads.frequency, timing: ads.timing)), p: p),
            const SizedBox(height: 8),
            Container(padding: const EdgeInsets.all(11), decoration: BoxDecoration(color: p.primary.withOpacity(0.12), borderRadius: BorderRadius.circular(16), border: Border.all(color: p.primary.withOpacity(0.35))),
              child: Text('Your daily ads will be shown as your ${ads.name == AdName.poison ? 'Daily dose of poison' : 'Daily dose of pills'}.', style: const TextStyle(color: Color(0xFFFFEAEA), fontSize: 12))),
          ],
          if (step == 1) ...[
            const Text('How many per day?', style: TextStyle(color: Color(0xFFD9A0A0), fontSize: 11, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            _SegmentedToggle(options: ['1 ad', '2 ads', '3 ads'], selected: ads.frequency - 1, onChanged: (i) => onUpdate(AdSettings(name: ads.name, frequency: i + 1, timing: ads.timing)), p: p),
            const SizedBox(height: 8),
            Container(padding: const EdgeInsets.all(11), decoration: BoxDecoration(color: p.primary.withOpacity(0.12), borderRadius: BorderRadius.circular(16), border: Border.all(color: p.primary.withOpacity(0.35))),
              child: Text("You'll see at most ${ads.frequency} ${ads.frequency == 1 ? 'ad' : 'ads'} per day.", style: const TextStyle(color: Color(0xFFFFEAEA), fontSize: 12))),
          ],
          if (step == 2) ...[
            const Text('When should they appear?', style: TextStyle(color: Color(0xFFD9A0A0), fontSize: 11, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Wrap(spacing: 6, children: [
              for (final item in [(AdTiming.appOpen, 'On app open'), (AdTiming.episodeStart, 'On episode start'), (AdTiming.both, 'Both')])
                GestureDetector(onTap: () => onUpdate(AdSettings(name: ads.name, frequency: ads.frequency, timing: item.$1)),
                  child: Container(padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8), decoration: BoxDecoration(color: ads.timing == item.$1 ? p.primary : p.s2, borderRadius: BorderRadius.circular(999), border: Border.all(color: ads.timing == item.$1 ? p.primary : p.s3)),
                    child: Text(item.$2, style: TextStyle(color: ads.timing == item.$1 ? p.onPrimary : const Color(0xFFD9A0A0), fontSize: 12, fontWeight: FontWeight.bold)))),
            ]),
          ],
        ]),
      )),
      _ActionRow(
        onBack: step > 0 ? () => onStepChange(step - 1) : onBack,
        onNext: () { if (step < 2) onStepChange(step + 1); else onNext(); },
        nextText: step < 2 ? 'Next' : 'Confirm', p: p,
      ),
    ]);
  }

  Widget _buildPill(WizardPalette p) {
    return Center(child: Container(width: 80, height: 36, decoration: BoxDecoration(borderRadius: BorderRadius.circular(999), color: Colors.transparent),
      child: Row(children: [
        Expanded(child: Container(decoration: BoxDecoration(gradient: LinearGradient(colors: [p.primary, p.primary.withOpacity(0.85)]), borderRadius: const BorderRadius.horizontal(left: Radius.circular(999))))),
        Expanded(child: Container(decoration: BoxDecoration(color: p.s5, borderRadius: const BorderRadius.horizontal(right: Radius.circular(999))))),
      ]),
    ));
  }
}

// 15. FINISH
class _FinishScreen extends StatelessWidget {
  final WizardPalette p;
  final String paletteName;
  final bool folderSelected;
  final AdSettings ads;
  final List<LinkedAnime> anime;
  final VoidCallback onRestart;
  const _FinishScreen({required this.p, required this.paletteName, required this.folderSelected, required this.ads, required this.anime, required this.onRestart});

  @override
  Widget build(BuildContext context) {
    final restored = anime.where((a) => a.linked).length + 239;
    return Column(children: [
      Expanded(child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(height: 16),
          _AnimatedVisual(painterFn: () => _FinishPainter(p), size: 160),
          const SizedBox(height: 12),
          Container(padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6), decoration: BoxDecoration(color: p.primary.withOpacity(0.16), borderRadius: BorderRadius.circular(999)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [Icon(Icons.star, color: p.primary, size: 14), const SizedBox(width: 6), Text('Setup complete', style: TextStyle(color: p.primary, fontSize: 12, fontWeight: FontWeight.w800))])),
          const SizedBox(height: 8),
          Text("You're all set!", style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: p.primary)),
          const SizedBox(height: 4),
          Text('Hope you have a beautiful journey ahead. Explore thousands of titles, track your progress, and never miss a new episode.', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 14), textAlign: TextAlign.center),
          const SizedBox(height: 12),
          Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: p.s2, borderRadius: BorderRadius.circular(16), border: Border.all(color: p.s3)),
            child: Column(children: [
              _summaryRow('Theme', '$paletteName - dark'),
              _summaryRow('Anime folder', folderSelected ? 'Connected' : 'Skipped'),
              _summaryRow('Library restored', '$restored anime'),
              _summaryRow('Ads', '${ads.frequency}/day - ${ads.timing == AdTiming.appOpen ? 'On app open' : ads.timing == AdTiming.episodeStart ? 'On episode start' : 'Both'}'),
              _summaryRow('Daily dose', ads.name == AdName.poison ? 'Daily dose of poison' : 'Daily dose of pills'),
            ]),
        ]),
      )),
      _ActionRow(onNext: onRestart, nextText: 'Start Exploring', p: p),
    ]);
  }

  Widget _summaryRow(String label, String value) {
    return Padding(padding: const EdgeInsets.symmetric(vertical: 4), child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      Text(label, style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 12)),
      Text(value, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
    ]));
  }
}
