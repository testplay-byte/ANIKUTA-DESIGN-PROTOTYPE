// models.dart — wizard state data types.
//
// Mirrors the web prototype's hooks/use-wizard-state.ts and lib/ad-settings.ts.


/// Theme mode preference.
enum ThemeModePref { dark, light, system }

String themeModeLabel(ThemeModePref m) {
  switch (m) {
    case ThemeModePref.dark:
      return 'Dark';
    case ThemeModePref.light:
      return 'Light';
    case ThemeModePref.system:
      return 'System';
  }
}

/// What the user calls their daily ad allowance.
enum AdName { poison, pills }

String adNameLabel(AdName n) {
  switch (n) {
    case AdName.poison:
      return 'Daily dose of poison';
    case AdName.pills:
      return 'Daily dose of pills';
  }
}

/// When ads are shown.
enum AdTiming { appOpen, episodeStart, both }

String adTimingLabel(AdTiming t) {
  switch (t) {
    case AdTiming.appOpen:
      return 'On app open';
    case AdTiming.episodeStart:
      return 'On episode start';
    case AdTiming.both:
      return 'Both';
  }
}

class AdSettings {
  final AdName name;
  final int frequency; // 1..3
  final AdTiming timing;

  const AdSettings({
    this.name = AdName.poison,
    this.frequency = 2,
    this.timing = AdTiming.appOpen,
  });

  AdSettings copyWith({AdName? name, int? frequency, AdTiming? timing}) {
    return AdSettings(
      name: name ?? this.name,
      frequency: frequency ?? this.frequency,
      timing: timing ?? this.timing,
    );
  }

  String get summary {
    final n = frequency == 1 ? 'ad' : 'ads';
    return '$frequency $n/day · ${adTimingLabel(timing)} · ${adNameLabel(name)}';
  }
}

/// Wizard permissions (toggleable, except all-files-access which is fixed off).
class Permissions {
  final bool installApps;
  final bool notifications;
  final bool battery;
  // All files access — NOT needed, always off, toggle disabled.
  final bool allFilesAccess;

  const Permissions({
    this.installApps = false,
    this.notifications = false,
    this.battery = false,
    this.allFilesAccess = false,
  });

  Permissions copyWith({
    bool? installApps,
    bool? notifications,
    bool? battery,
  }) {
    return Permissions(
      installApps: installApps ?? this.installApps,
      notifications: notifications ?? this.notifications,
      battery: battery ?? this.battery,
      allFilesAccess: false, // always off
    );
  }
}

/// An anime entry being linked during the restore flow.
class LinkedAnime {
  final int id;
  final String backupName;
  final bool linked;
  final String? matchedName;

  const LinkedAnime({
    required this.id,
    required this.backupName,
    required this.linked,
    this.matchedName,
  });

  LinkedAnime copyWith({bool? linked, String? matchedName}) {
    return LinkedAnime(
      id: id,
      backupName: backupName,
      linked: linked ?? this.linked,
      matchedName: matchedName ?? this.matchedName,
    );
  }
}

const List<LinkedAnime> kDefaultAnime = [
  LinkedAnime(
      id: 1,
      backupName: "Frieren: Beyond Journey's End",
      linked: true,
      matchedName: 'Sousou no Frieren'),
  LinkedAnime(
      id: 2,
      backupName: 'Jujutsu Kaisen Season 2',
      linked: true,
      matchedName: 'Jujutsu Kaisen 2nd Season'),
  LinkedAnime(id: 3, backupName: 'Demon Slayer: Hashira Training', linked: false),
  LinkedAnime(
      id: 4,
      backupName: 'Attack on Titan Final',
      linked: true,
      matchedName: 'Shingeki no Kyojin: The Final Season'),
  LinkedAnime(id: 5, backupName: 'Spy x Family Code: White', linked: false),
  LinkedAnime(id: 6, backupName: 'Chainsaw Man', linked: true, matchedName: 'Chainsaw Man'),
  LinkedAnime(id: 7, backupName: 'One Piece Egghead Arc', linked: false),
  LinkedAnime(
      id: 8, backupName: 'Solo Leveling', linked: true, matchedName: 'Ore dake Level Up na Ken'),
];

/// Backup file mock (Format Not Supported screen).
class BackupFile {
  final String name;
  final String size;
  final String format;
  const BackupFile({
    required this.name,
    required this.size,
    required this.format,
  });
}

const BackupFile kBackupFile = BackupFile(
  name: 'anime_backup_2025-01-15.json',
  size: '2.3 MB',
  format: 'JSON (unknown schema)',
);
