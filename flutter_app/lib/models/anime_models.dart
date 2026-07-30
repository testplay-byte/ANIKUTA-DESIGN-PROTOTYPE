// ANIKUTA mock data models
import 'package:flutter/material.dart';

enum AnimeFormat { tv, movie, ova, ona, special, music }
enum AnimeStatus { releasing, finished, notYetReleased, cancelled }
enum LibraryStatus { watching, completed, plan }
enum UpdatesTab { updates, schedule }
enum ExtType { anime, manga }

class Anime {
  final int id;
  final String title;
  final String? titleEnglish;
  final List<Color> coverColors;
  final String letter;
  final int averageScore;
  final int episodes;
  final String format;
  final String status;
  final String season;
  final int seasonYear;
  final List<String> genres;
  final String country;
  final String studio;
  final String synopsis;
  final bool inLibrary;
  final String? libraryStatus;
  final int watchedEpisodes;

  Anime({
    required this.id,
    required this.title,
    this.titleEnglish,
    required this.coverColors,
    required this.letter,
    required this.averageScore,
    required this.episodes,
    required this.format,
    required this.status,
    required this.season,
    required this.seasonYear,
    required this.genres,
    required this.country,
    required this.studio,
    required this.synopsis,
    this.inLibrary = false,
    this.libraryStatus,
    this.watchedEpisodes = 0,
  });
}

class Episode {
  final int number;
  final String title;
  final String description;
  final String releaseDate;
  final bool subAvailable;
  final bool dubAvailable;
  final List<Color> thumbColors;
  final String thumbLetter;
  final bool watched;

  Episode({
    required this.number,
    required this.title,
    required this.description,
    required this.releaseDate,
    required this.subAvailable,
    required this.dubAvailable,
    required this.thumbColors,
    required this.thumbLetter,
    this.watched = false,
  });
}

class ContinueWatchingItem {
  final int animeId;
  final String title;
  final List<Color> coverColors;
  final String letter;
  final int episode;
  final int totalEpisodes;
  final double progress;
  final List<Color> bannerColors;

  ContinueWatchingItem({
    required this.animeId,
    required this.title,
    required this.coverColors,
    required this.letter,
    required this.episode,
    required this.totalEpisodes,
    required this.progress,
    required this.bannerColors,
  });
}

class HistoryEntry {
  final int animeId;
  final String title;
  final List<Color> coverColors;
  final String letter;
  final int episode;
  final String episodeTitle;
  final List<Color> thumbColors;
  final String thumbLetter;
  final String timeAgo;

  HistoryEntry({
    required this.animeId,
    required this.title,
    required this.coverColors,
    required this.letter,
    required this.episode,
    required this.episodeTitle,
    required this.thumbColors,
    required this.thumbLetter,
    required this.timeAgo,
  });
}

class UpdateItem {
  final int animeId;
  final String title;
  final List<Color> coverColors;
  final String letter;
  final int episode;
  final String episodeTitle;
  final bool subAvailable;
  final bool dubAvailable;
  final bool isNew;
  final String timeAgo;

  UpdateItem({
    required this.animeId,
    required this.title,
    required this.coverColors,
    required this.letter,
    required this.episode,
    required this.episodeTitle,
    required this.subAvailable,
    required this.dubAvailable,
    required this.isNew,
    required this.timeAgo,
  });
}

class ScheduledItem {
  final int animeId;
  final String title;
  final int episode;
  final String day;
  final String time;

  ScheduledItem({
    required this.animeId,
    required this.title,
    required this.episode,
    required this.day,
    required this.time,
  });
}

class Extension {
  final String id;
  final String name;
  final String lang;
  final String version;
  final List<Color> iconColors;
  final String iconLetter;
  final bool installed;
  final bool trusted;
  final bool isTrustedSource;
  final String type;

  Extension({
    required this.id,
    required this.name,
    required this.lang,
    required this.version,
    required this.iconColors,
    required this.iconLetter,
    required this.installed,
    required this.trusted,
    required this.isTrustedSource,
    required this.type,
  });
}

class DownloadItem {
  final String id;
  final int animeId;
  final String title;
  final int episode;
  final List<Color> coverColors;
  final String letter;
  final String size;
  final double progress;
  final String status;

  DownloadItem({
    required this.id,
    required this.animeId,
    required this.title,
    required this.episode,
    required this.coverColors,
    required this.letter,
    required this.size,
    required this.progress,
    required this.status,
  });
}
