// wizard_controller.dart — central wizard state (ChangeNotifier).
//
// Holds all mutable wizard state and exposes navigation helpers.
// Provided at the root via ChangeNotifierProvider.

import 'package:flutter/foundation.dart';
import '../models/wizard_models.dart';
import '../theme/palettes.dart';

class WizardController extends ChangeNotifier {
  // ---- Theme ----
  WizardPalette _palette = kDefaultPalette;
  ThemeModePref _themeMode = ThemeModePref.dark;

  WizardPalette get palette => _palette;
  ThemeModePref get themeMode => _themeMode;

  void setPalette(WizardPalette p) {
    _palette = p;
    notifyListeners();
  }

  void setThemeMode(ThemeModePref m) {
    _themeMode = m;
    notifyListeners();
  }

  // ---- Folder ----
  bool _folderSelected = false;
  bool get folderSelected => _folderSelected;
  void setFolderSelected(bool v) {
    _folderSelected = v;
    notifyListeners();
  }

  // ---- Backup ----
  bool _backupSelected = false;
  bool get backupSelected => _backupSelected;
  void setBackupSelected(bool v) {
    _backupSelected = v;
    notifyListeners();
  }

  // ---- Permissions ----
  Permissions _permissions = const Permissions();
  Permissions get permissions => _permissions;

  void togglePermission(String key) {
    final p = _permissions;
    switch (key) {
      case 'installApps':
        _permissions = p.copyWith(installApps: !p.installApps);
        break;
      case 'notifications':
        _permissions = p.copyWith(notifications: !p.notifications);
        break;
      case 'battery':
        _permissions = p.copyWith(battery: !p.battery);
        break;
      // allFilesAccess is fixed off — ignored.
    }
    notifyListeners();
  }

  // ---- Linked anime ----
  List<LinkedAnime> _linkedAnime = List.of(kDefaultAnime);
  List<LinkedAnime> get linkedAnime => List.unmodifiable(_linkedAnime);

  int get linkedCount => _linkedAnime.where((a) => a.linked).length;
  int get unlinkedCount => _linkedAnime.where((a) => !a.linked).length;
  int get totalAnime => _linkedAnime.length;

  void unlinkAnime(int id) {
    _linkedAnime = _linkedAnime
        .map((a) => a.id == id ? a.copyWith(linked: false, matchedName: null) : a)
        .toList();
    notifyListeners();
  }

  void linkAnime(int id, String matchedName) {
    _linkedAnime = _linkedAnime
        .map((a) => a.id == id ? a.copyWith(linked: true, matchedName: matchedName) : a)
        .toList();
    notifyListeners();
  }

  // ---- Ad settings (Choose Your Poison) ----
  AdSettings _adSettings = const AdSettings();
  AdSettings get adSettings => _adSettings;

  void setAdName(AdName n) {
    _adSettings = _adSettings.copyWith(name: n);
    notifyListeners();
  }

  void setAdFrequency(int f) {
    _adSettings = _adSettings.copyWith(frequency: f.clamp(1, 3));
    notifyListeners();
  }

  void setAdTiming(AdTiming t) {
    _adSettings = _adSettings.copyWith(timing: t);
    notifyListeners();
  }

  // ---- Poison sub-step (0..2: name / frequency / timing) ----
  int _poisonStep = 0;
  int get poisonStep => _poisonStep;
  void nextPoisonStep() {
    _poisonStep = (_poisonStep + 1).clamp(0, 2);
    notifyListeners();
  }

  void prevPoisonStep() {
    _poisonStep = (_poisonStep - 1).clamp(0, 2);
    notifyListeners();
  }

  /// Reset everything to restart the wizard from the welcome screen.
  void reset() {
    _palette = kDefaultPalette;
    _themeMode = ThemeModePref.dark;
    _folderSelected = false;
    _backupSelected = false;
    _permissions = const Permissions();
    _linkedAnime = List.of(kDefaultAnime);
    _adSettings = const AdSettings();
    _poisonStep = 0;
    notifyListeners();
  }
}
