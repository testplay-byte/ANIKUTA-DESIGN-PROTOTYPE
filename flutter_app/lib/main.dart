import 'package:flutter/material.dart';
import 'theme/anikuta_theme.dart';
import 'data/mock_data.dart';
import 'models/anime_models.dart';
import 'widgets/anikuta_widgets.dart';

void main() {
  runApp(const AnikutaApp());
}

class AnikutaApp extends StatelessWidget {
  const AnikutaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ANIKUTA',
      debugShowCheckedModeBanner: false,
      theme: AnikutaTheme.darkTheme,
      home: const AnikutaMainScreen(),
    );
  }
}

class AnikutaMainScreen extends StatefulWidget {
  const AnikutaMainScreen({super.key});

  @override
  State<AnikutaMainScreen> createState() => _AnikutaMainScreenState();
}

class _AnikutaMainScreenState extends State<AnikutaMainScreen> {
  int _navIndex = 0;
  int? _detailAnimeId;
  int? _watchAnimeId;
  String? _pushedScreen; // 'search', 'history', 'my', 'backup', 'downloads', 'extensions'

  void _onNavTap(int index) {
    setState(() {
      _navIndex = index;
      _detailAnimeId = null;
      _watchAnimeId = null;
      _pushedScreen = null;
    });
  }

  void _openAnime(int id) {
    setState(() => _detailAnimeId = id);
  }

  void _openWatch(int id) {
    setState(() => _watchAnimeId = id);
  }

  void _openPushed(String screen) {
    setState(() => _pushedScreen = screen);
  }

  void _pop() {
    setState(() {
      if (_watchAnimeId != null) {
        _watchAnimeId = null;
      } else if (_detailAnimeId != null) {
        _detailAnimeId = null;
      } else if (_pushedScreen != null) {
        _pushedScreen = null;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // Determine what to show
    Widget content;
    bool showNav = true;

    if (_watchAnimeId != null) {
      content = WatchScreen(animeId: _watchAnimeId!, onBack: _pop);
      showNav = false;
    } else if (_detailAnimeId != null) {
      content = DetailScreen(
        animeId: _detailAnimeId!,
        onBack: _pop,
        onOpenWatch: (id) => setState(() => _watchAnimeId = id),
      );
      showNav = false;
    } else if (_pushedScreen != null) {
      switch (_pushedScreen!) {
        case 'search':
          content = SearchScreen(onBack: _pop, onOpenAnime: _openAnime);
          break;
        case 'history':
          content = HistoryScreen(onBack: _pop, onOpenWatch: _openWatch);
          break;
        case 'my':
          content = const ProfileScreen();
          break;
        case 'backup':
          content = const BackupScreen();
          break;
        case 'downloads':
          content = const DownloadsScreen();
          break;
        case 'extensions':
          content = const ExtensionsScreen();
          break;
        default:
          content = _buildTabScreen();
      }
      showNav = false;
    } else {
      content = _buildTabScreen();
    }

    return Scaffold(
      body: SafeArea(
        top: false,
        child: Stack(
          children: [
            content,
            if (showNav)
              Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                child: AnikutaBottomNav(
                  currentIndex: _navIndex,
                  onTap: _onNavTap,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildTabScreen() {
    switch (_navIndex) {
      case 0:
        return HomeScreen(
          onOpenAnime: _openAnime,
          onOpenSearch: () => _openPushed('search'),
          onOpenHistory: () => _openPushed('history'),
          onOpenWatch: _openWatch,
        );
      case 1:
        return LibraryScreen(onOpenAnime: _openAnime);
      case 2:
        return UpdatesScreen(onOpenAnime: _openAnime);
      case 3:
        return MoreScreen(
          onOpenBackup: () => _openPushed('backup'),
          onOpenDownloads: () => _openPushed('downloads'),
          onOpenExtensions: () => _openPushed('extensions'),
          onOpenProfile: () => _openPushed('my'),
        );
      default:
        return Container();
    }
  }
}

// ==================== HOME SCREEN ====================
class HomeScreen extends StatelessWidget {
  final ValueChanged<int> onOpenAnime;
  final VoidCallback onOpenSearch;
  final VoidCallback onOpenHistory;
  final ValueChanged<int> onOpenWatch;

  const HomeScreen({
    super.key,
    required this.onOpenAnime,
    required this.onOpenSearch,
    required this.onOpenHistory,
    required this.onOpenWatch,
  });

  @override
  Widget build(BuildContext context) {
    final hero = allAnime[0];
    return Container(
      color: AnikutaColors.background,
      child: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 80,
            pinned: true,
            backgroundColor: AnikutaColors.background,
            automaticallyImplyLeading: false,
            title: const Text('Home', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800)),
            actions: [
              IconButton(onPressed: onOpenSearch, icon: const Icon(Icons.search, color: AnikutaColors.onBackground)),
              IconButton(onPressed: onOpenHistory, icon: const Icon(Icons.history, color: AnikutaColors.onBackground)),
            ],
          ),
          // Trending hero
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: GestureDetector(
                onTap: () => onOpenAnime(hero.id),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: SizedBox(
                    height: 180,
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: hero.coverColors,
                            ),
                          ),
                          child: Center(child: Text(hero.letter, style: TextStyle(color: Colors.white.withOpacity(0.2), fontSize: 80, fontWeight: FontWeight.w900))),
                        ),
                        Container(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [Colors.transparent, Colors.black.withOpacity(0.7)],
                            ),
                          ),
                        ),
                        Positioned(
                          top: 12,
                          left: 12,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: AnikutaColors.primary,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text('TRENDING #1', style: TextStyle(color: AnikutaColors.onPrimary, fontSize: 10, fontWeight: FontWeight.w900)),
                          ),
                        ),
                        Positioned(
                          bottom: 12,
                          left: 12,
                          right: 12,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(hero.title, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w800), maxLines: 1, overflow: TextOverflow.ellipsis),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  const Icon(Icons.star, color: AnikutaColors.warn, size: 14),
                                  const SizedBox(width: 4),
                                  Text('${(hero.averageScore / 10).toStringAsFixed(1)}', style: const TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold)),
                                  const SizedBox(width: 8),
                                  Text('${hero.episodes} eps', style: const TextStyle(color: Colors.white54, fontSize: 12, fontWeight: FontWeight.bold)),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          // Continue Watching
          SliverToBoxAdapter(
            child: SectionHeader(text: 'Continue Watching'),
          ),
          SliverToBoxAdapter(
            child: SizedBox(
              height: 140,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: continueWatching.length,
                itemBuilder: (context, i) {
                  final cw = continueWatching[i];
                  return GestureDetector(
                    onTap: () => onOpenWatch(cw.animeId),
                    child: Container(
                      width: 220,
                      margin: const EdgeInsets.only(right: 10),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            Container(
                              decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: cw.bannerColors)),
                              child: Center(child: Text(cw.letter, style: TextStyle(color: Colors.white.withOpacity(0.2), fontSize: 50, fontWeight: FontWeight.w900))),
                            ),
                            Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, Colors.black54]))),
                            Positioned(
                              top: 8,
                              right: 8,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(color: Colors.black54, borderRadius: BorderRadius.circular(4)),
                                child: Text('EP ${cw.episode}', style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                            ),
                            Positioned(
                              bottom: 8,
                              left: 8,
                              right: 8,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(cw.title, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
                                  const SizedBox(height: 6),
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(2),
                                    child: LinearProgressIndicator(
                                      value: cw.progress,
                                      backgroundColor: Colors.white24,
                                      valueColor: AlwaysStoppedAnimation(AnikutaColors.primary),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          // Popular This Season
          SliverToBoxAdapter(child: SectionHeader(text: 'Popular This Season')),
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 0.55,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              delegate: SliverChildBuilderDelegate(
                (context, i) => AnimeCard(anime: allAnime[i], onTap: () => onOpenAnime(allAnime[i].id)),
                childCount: 6,
              ),
            ),
          ),
          // Top Rated
          SliverToBoxAdapter(child: SectionHeader(text: 'Top Rated')),
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 0.55,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              delegate: SliverChildBuilderDelegate(
                (context, i) => AnimeCard(anime: allAnime[i + 6], onTap: () => onOpenAnime(allAnime[i + 6].id)),
                childCount: 6,
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 100)),
        ],
      ),
    );
  }
}

// ==================== LIBRARY SCREEN ====================
class LibraryScreen extends StatelessWidget {
  final ValueChanged<int> onOpenAnime;
  const LibraryScreen({super.key, required this.onOpenAnime});

  @override
  Widget build(BuildContext context) {
    final libAnime = allAnime.where((a) => a.inLibrary).toList();
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 16, left: 16, right: 16),
            child: Row(
              children: [
                const Text('Library', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
                const Spacer(),
                IconButton(onPressed: () {}, icon: const Icon(Icons.tune, color: AnikutaColors.onSurfaceVariant)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: SegmentedToggle(options: ['All', 'Watching', 'Completed', 'Plan'], selected: 0, onChanged: (i) {}),
          ),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(16).copyWith(bottom: 100),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 0.55,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: libAnime.length,
              itemBuilder: (context, i) => AnimeCard(anime: libAnime[i], onTap: () => onOpenAnime(libAnime[i].id)),
            ),
          ),
        ],
      ),
    );
  }
}

// ==================== SEARCH SCREEN ====================
class SearchScreen extends StatelessWidget {
  final VoidCallback onBack;
  final ValueChanged<int> onOpenAnime;
  const SearchScreen({super.key, required this.onBack, required this.onOpenAnime});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 8, right: 16),
            child: Row(
              children: [
                IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back, color: AnikutaColors.onBackground)),
                Expanded(
                  child: Container(
                    height: 44,
                    decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(999)),
                    child: const TextField(
                      decoration: InputDecoration(
                        hintText: 'Search anime…',
                        hintStyle: TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 14),
                        prefixIcon: Icon(Icons.search, color: AnikutaColors.onSurfaceVariant, size: 20),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(horizontal: 16),
                      ),
                      style: TextStyle(color: AnikutaColors.onBackground, fontSize: 14),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: SegmentedToggle(options: ['AniList', 'Extension'], selected: 0, onChanged: (i) {}),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: SizedBox(
              height: 32,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi']
                    .map((g) => Container(
                          margin: const EdgeInsets.only(right: 6),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(999)),
                          child: Text(g, style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.bold)),
                        ))
                    .toList(),
              ),
            ),
          ),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(16).copyWith(bottom: 20),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, childAspectRatio: 0.55, crossAxisSpacing: 10, mainAxisSpacing: 10),
              itemCount: allAnime.length,
              itemBuilder: (context, i) => AnimeCard(anime: allAnime[i], onTap: () => onOpenAnime(allAnime[i].id)),
            ),
          ),
        ],
      ),
    );
  }
}

// ==================== DETAIL SCREEN ====================
class DetailScreen extends StatelessWidget {
  final int animeId;
  final VoidCallback onBack;
  final ValueChanged<int> onOpenWatch;
  const DetailScreen({super.key, required this.animeId, required this.onBack, required this.onOpenWatch});

  @override
  Widget build(BuildContext context) {
    final anime = getAnimeById(animeId);
    if (anime == null) return const SizedBox.shrink();
    final episodes = getEpisodesForAnime(animeId);
    return Container(
      color: AnikutaColors.background,
      child: CustomScrollView(
        slivers: [
          // Blurred cover header
          SliverAppBar(
            expandedHeight: 280,
            pinned: false,
            backgroundColor: AnikutaColors.background,
            leading: IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back, color: Colors.white)),
            actions: [
              IconButton(onPressed: () {}, icon: const Icon(Icons.bookmark_border, color: Colors.white)),
              IconButton(onPressed: () {}, icon: const Icon(Icons.share, color: Colors.white)),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: anime.coverColors),
                    ),
                    child: Center(child: Text(anime.letter, style: TextStyle(color: Colors.white.withOpacity(0.15), fontSize: 100, fontWeight: FontWeight.w900))),
                  ),
                  Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.black26, AnikutaColors.background]))),
                ],
              ),
            ),
          ),
          // Title + meta
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Cover thumbnail
                      ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: SizedBox(
                          width: 90,
                          height: 130,
                          child: Container(
                            decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: anime.coverColors)),
                            child: Center(child: Text(anime.letter, style: const TextStyle(color: Colors.white54, fontSize: 32, fontWeight: FontWeight.w900))),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(anime.title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
                            const SizedBox(height: 6),
                            Row(children: [
                              const Icon(Icons.star, color: AnikutaColors.warn, size: 14),
                              const SizedBox(width: 4),
                              Text('${(anime.averageScore / 10).toStringAsFixed(1)}', style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 12, fontWeight: FontWeight.bold)),
                              const SizedBox(width: 8),
                              Text('${anime.format} · ${anime.episodes} eps', style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 12, fontWeight: FontWeight.bold)),
                            ]),
                            const SizedBox(height: 4),
                            Text('${anime.studio} · ${anime.season} ${anime.seasonYear}', style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 12, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  // Genre chips
                  Wrap(
                    spacing: 6,
                    runSpacing: 4,
                    children: anime.genres.map((g) => Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(6)),
                      child: Text(g, style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.bold)),
                    )).toList(),
                  ),
                  const SizedBox(height: 12),
                  // Synopsis
                  const Text('SYNOPSIS', style: TextStyle(color: AnikutaColors.primary, fontSize: 13, fontWeight: FontWeight.w800, letterSpacing: 0.8)),
                  const SizedBox(height: 6),
                  Text(anime.synopsis, style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 13, height: 1.5)),
                  const SizedBox(height: 16),
                  // Episodes header
                  const Text('EPISODES', style: TextStyle(color: AnikutaColors.primary, fontSize: 13, fontWeight: FontWeight.w800, letterSpacing: 0.8)),
                  const SizedBox(height: 8),
                ],
              ),
            ),
          ),
          // Episode list
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, i) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: EpisodeRow(
                  episode: episodes[i],
                  onTap: () => onOpenWatch(animeId),
                ),
              ),
              childCount: episodes.length,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 40)),
        ],
      ),
    );
  }
}

// ==================== WATCH SCREEN ====================
class WatchScreen extends StatelessWidget {
  final int animeId;
  final VoidCallback onBack;
  const WatchScreen({super.key, required this.animeId, required this.onBack});

  @override
  Widget build(BuildContext context) {
    final anime = getAnimeById(animeId);
    if (anime == null) return const SizedBox.shrink();
    final episodes = getEpisodesForAnime(animeId);
    final currentEp = episodes.isNotEmpty ? episodes[anime.watchedEpisodes.clamp(0, episodes.length - 1)] : null;
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          // Top bar
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 4, left: 4, right: 8),
            child: Row(
              children: [
                IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back, color: AnikutaColors.onBackground)),
                Expanded(child: Text(anime.title, style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 16, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis)),
                IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert, color: AnikutaColors.onSurfaceVariant)),
              ],
            ),
          ),
          // Mini player
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(8),
            ),
            child: AspectRatio(
              aspectRatio: 16 / 9,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: anime.coverColors),
                    ),
                  ),
                  const Icon(Icons.play_circle_fill, color: Colors.white70, size: 48),
                  Positioned(
                    bottom: 4,
                    right: 4,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(color: Colors.black54, borderRadius: BorderRadius.circular(4)),
                      child: const Icon(Icons.fullscreen, color: Colors.white70, size: 16),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Episode info
          if (currentEp != null)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('EP ${currentEp.number} — ${currentEp.title}', style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 14, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text(currentEp.description, style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 12), maxLines: 2, overflow: TextOverflow.ellipsis),
                ],
              ),
            ),
          const Divider(color: AnikutaColors.outlineVariant, height: 1),
          // Episode list
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16).copyWith(bottom: 20),
              itemCount: episodes.length,
              itemBuilder: (context, i) => EpisodeRow(
                episode: episodes[i],
                isCurrent: currentEp != null && episodes[i].number == currentEp.number,
                onTap: () {},
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ==================== HISTORY SCREEN ====================
class HistoryScreen extends StatelessWidget {
  final VoidCallback onBack;
  final ValueChanged<int> onOpenWatch;
  const HistoryScreen({super.key, required this.onBack, required this.onOpenWatch});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 8, right: 16),
            child: Row(
              children: [
                IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back, color: AnikutaColors.onBackground)),
                const Text('History', style: TextStyle(fontSize: 30, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
                const Spacer(),
                IconButton(onPressed: () {}, icon: const Icon(Icons.delete_outline, color: AnikutaColors.onSurfaceVariant)),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16).copyWith(bottom: 20),
              children: [
                // Continue Watching section
                const SectionHeader(text: 'Continue Watching'),
                SizedBox(
                  height: 120,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: continueWatching.length,
                    itemBuilder: (context, i) {
                      final cw = continueWatching[i];
                      return GestureDetector(
                        onTap: () => onOpenWatch(cw.animeId),
                        child: Container(
                          width: 200,
                          margin: const EdgeInsets.only(right: 10),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(10),
                            child: Stack(
                              fit: StackFit.expand,
                              children: [
                                Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: cw.bannerColors))),
                                Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, Colors.black54]))),
                                Positioned(
                                  bottom: 8,
                                  left: 8,
                                  right: 8,
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(cw.title, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
                                      Text('EP ${cw.episode}', style: const TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold)),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                // Today
                const SectionHeader(text: 'Today'),
                ...historyEntries.take(2).map((e) => _historyRow(e, () => onOpenWatch(e.animeId))),
                // Yesterday
                const SectionHeader(text: 'Yesterday'),
                ...historyEntries.skip(2).map((e) => _historyRow(e, () => onOpenWatch(e.animeId))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _historyRow(HistoryEntry e, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(10)),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: SizedBox(
                width: 64,
                height: 40,
                child: Container(
                  decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: e.thumbColors)),
                  child: Center(child: Text(e.thumbLetter, style: TextStyle(color: Colors.white.withOpacity(0.3), fontSize: 14, fontWeight: FontWeight.w900))),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(e.title, style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 13, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
                  Text('EP ${e.episode} · ${e.timeAgo}', style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ==================== UPDATES SCREEN ====================
class UpdatesScreen extends StatelessWidget {
  final ValueChanged<int> onOpenAnime;
  const UpdatesScreen({super.key, required this.onOpenAnime});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 16, left: 16, right: 16),
            child: const Row(
              children: [
                Text('Updates', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: SegmentedToggle(options: ['Updates', 'Schedule'], selected: 0, onChanged: (i) {}),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16).copyWith(bottom: 100),
              itemCount: updatesList.length,
              itemBuilder: (context, i) {
                final u = updatesList[i];
                return GestureDetector(
                  onTap: () => onOpenAnime(u.animeId),
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(12)),
                    child: Row(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(6),
                          child: SizedBox(
                            width: 48,
                            height: 64,
                            child: Container(
                              decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: u.coverColors)),
                              child: Center(child: Text(u.letter, style: TextStyle(color: Colors.white.withOpacity(0.3), fontSize: 16, fontWeight: FontWeight.w900))),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(u.title, style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 13, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
                              Text('EP ${u.episode} · ${u.timeAgo}', style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  if (u.subAvailable) Container(padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1), margin: const EdgeInsets.only(right: 4), decoration: BoxDecoration(color: AnikutaColors.primaryContainer, borderRadius: BorderRadius.circular(4)), child: const Text('SUB', style: TextStyle(color: AnikutaColors.onPrimaryContainer, fontSize: 9, fontWeight: FontWeight.bold))),
                                  if (u.dubAvailable) Container(padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1), decoration: BoxDecoration(color: AnikutaColors.secondaryContainer, borderRadius: BorderRadius.circular(4)), child: const Text('DUB', style: TextStyle(color: AnikutaColors.secondary, fontSize: 9, fontWeight: FontWeight.bold))),
                                  if (u.isNew) const Padding(padding: EdgeInsets.only(left: 4), child: Text('NEW', style: TextStyle(color: AnikutaColors.primary, fontSize: 9, fontWeight: FontWeight.bold))),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// ==================== MORE SCREEN ====================
class MoreScreen extends StatelessWidget {
  final VoidCallback onOpenBackup;
  final VoidCallback onOpenDownloads;
  final VoidCallback onOpenExtensions;
  final VoidCallback onOpenProfile;
  const MoreScreen({super.key, required this.onOpenBackup, required this.onOpenDownloads, required this.onOpenExtensions, required this.onOpenProfile});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 16, left: 16, right: 16),
            child: const Text('More', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16).copyWith(bottom: 100),
              children: [
                _settingsSection('APPEARANCE', [
                  _settingsRow(Icons.palette, 'Theme', 'Dark'),
                  _settingsRow(Icons.font_download, 'Font', 'Inter'),
                ]),
                _settingsSection('DATA', [
                  _settingsRow(Icons.backup, 'Backup & Restore', null, onTap: onOpenBackup),
                  _settingsRow(Icons.download, 'Downloads', null, onTap: onOpenDownloads),
                  _settingsRow(Icons.extension, 'Extensions', null, onTap: onOpenExtensions),
                ]),
                _settingsSection('ACCOUNT', [
                  _settingsRow(Icons.person, 'Profile', null, onTap: onOpenProfile),
                  _settingsRow(Icons.link, 'Trackers', 'AniList, MAL'),
                ]),
                _settingsSection('ABOUT', [
                  _settingsRow(Icons.info, 'About ANIKUTA', 'v1.0.0'),
                ]),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _settingsSection(String title, List<Widget> rows) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 16, bottom: 8),
          child: Text(title, style: const TextStyle(color: AnikutaColors.primary, fontSize: 12, fontWeight: FontWeight.w800, letterSpacing: 0.8)),
        ),
        Container(
          decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(12)),
          child: Column(children: rows),
        ),
      ],
    );
  }

  Widget _settingsRow(IconData icon, String title, String? subtitle, {VoidCallback? onTap}) {
    return ListTile(
      leading: Icon(icon, color: AnikutaColors.primary, size: 22),
      title: Text(title, style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 14, fontWeight: FontWeight.bold)),
      subtitle: subtitle != null ? Text(subtitle, style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 12)) : null,
      trailing: const Icon(Icons.chevron_right, color: AnikutaColors.onSurfaceVariant, size: 20),
      onTap: onTap,
    );
  }
}

// ==================== PROFILE SCREEN ====================
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 16, left: 16, right: 16),
            child: const Text('My Profile', style: TextStyle(fontSize: 30, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16).copyWith(bottom: 20),
              children: [
                _statCard('Total Anime', '247'),
                _statCard('Episodes Watched', '1,432'),
                _statCard('Hours Watched', '578'),
                const SizedBox(height: 16),
                const SectionHeader(text: 'Genre Distribution'),
                _barChart(['Action', 'Drama', 'Comedy', 'Fantasy', 'Supernatural'], [30, 25, 20, 15, 10]),
                const SectionHeader(text: 'Status Breakdown'),
                _barChart(['Watching', 'Completed', 'Plan', 'Dropped'], [45, 120, 70, 12]),
                const SectionHeader(text: 'Score Distribution'),
                _barChart(['1-3', '4-6', '7-8', '9-10'], [5, 30, 120, 92]),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _statCard(String label, String value) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(12)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 13, fontWeight: FontWeight.bold)),
          Text(value, style: const TextStyle(color: AnikutaColors.primary, fontSize: 20, fontWeight: FontWeight.w800)),
        ],
      ),
    );
  }

  Widget _barChart(List<String> labels, List<int> values) {
    final max = values.reduce((a, b) => a > b ? a : b);
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(12)),
      child: Column(
        children: List.generate(labels.length, (i) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                SizedBox(width: 80, child: Text(labels[i], style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.bold))),
                const SizedBox(width: 8),
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: values[i] / max,
                      backgroundColor: AnikutaColors.surface4,
                      valueColor: AlwaysStoppedAnimation(AnikutaColors.primary),
                      minHeight: 12,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                SizedBox(width: 30, child: Text('${values[i]}', style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 11, fontWeight: FontWeight.bold), textAlign: TextAlign.right)),
              ],
            ),
          );
        }),
      ),
    );
  }
}

// ==================== BACKUP SCREEN ====================
class BackupScreen extends StatelessWidget {
  const BackupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 8, right: 16),
            child: Row(
              children: [
                IconButton(onPressed: () => Navigator.of(context).pop(), icon: const Icon(Icons.arrow_back, color: AnikutaColors.onBackground)),
                const Text('Backup & Restore', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16).copyWith(bottom: 20),
              children: [
                const SectionHeader(text: 'Backup & Restore'),
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(12)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(children: [const Icon(Icons.cloud, color: AnikutaColors.primary), const SizedBox(width: 8), const Text('Backup & Restore', style: TextStyle(color: AnikutaColors.onBackground, fontSize: 14, fontWeight: FontWeight.bold))]),
                      const SizedBox(height: 4),
                      const Text('Create a backup or restore from file.', style: TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 12)),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(child: ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(backgroundColor: AnikutaColors.primary, foregroundColor: AnikutaColors.onPrimary), child: const Text('Create Backup', style: TextStyle(fontWeight: FontWeight.bold)))),
                          const SizedBox(width: 8),
                          Expanded(child: OutlinedButton(onPressed: () {}, style: OutlinedButton.styleFrom(foregroundColor: AnikutaColors.primary), child: const Text('Restore', style: TextStyle(fontWeight: FontWeight.bold)))),
                        ],
                      ),
                    ],
                  ),
                ),
                const SectionHeader(text: 'Auto-backup'),
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(12)),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.schedule, color: AnikutaColors.primary),
                          const SizedBox(width: 8),
                          const Expanded(child: Text('Automatic backups', style: TextStyle(color: AnikutaColors.onBackground, fontSize: 14, fontWeight: FontWeight.bold))),
                          Switch(value: true, onChanged: (v) {}),
                        ],
                      ),
                      const SizedBox(height: 8),
                      SegmentedToggle(options: ['6h', '12h', '24h', 'Weekly'], selected: 2, onChanged: (i) {}),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ==================== DOWNLOADS SCREEN ====================
class DownloadsScreen extends StatelessWidget {
  const DownloadsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 8, right: 16),
            child: Row(
              children: [
                IconButton(onPressed: () => Navigator.of(context).pop(), icon: const Icon(Icons.arrow_back, color: AnikutaColors.onBackground)),
                const Text('Downloads', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16).copyWith(bottom: 20),
              itemCount: downloadsList.length,
              itemBuilder: (context, i) {
                final d = downloadsList[i];
                return Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(12)),
                  child: Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: SizedBox(
                          width: 48,
                          height: 64,
                          child: Container(
                            decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: d.coverColors)),
                            child: Center(child: Text(d.letter, style: TextStyle(color: Colors.white.withOpacity(0.3), fontSize: 16, fontWeight: FontWeight.w900))),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('${d.title} · EP ${d.episode}', style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 13, fontWeight: FontWeight.bold)),
                            Text('${d.size} · ${d.status}', style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.bold)),
                            if (d.progress < 100) ...[
                              const SizedBox(height: 4),
                              ClipRRect(
                                borderRadius: BorderRadius.circular(2),
                                child: LinearProgressIndicator(value: d.progress / 100, backgroundColor: AnikutaColors.surface4, valueColor: AlwaysStoppedAnimation(AnikutaColors.primary), minHeight: 4),
                              ),
                            ],
                          ],
                        ),
                      ),
                      if (d.status == 'completed') const Icon(Icons.check_circle, color: AnikutaColors.primary, size: 20),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// ==================== EXTENSIONS SCREEN ====================
class ExtensionsScreen extends StatelessWidget {
  const ExtensionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final trusted = extensionsList.where((e) => e.isTrustedSource).toList();
    final installed = extensionsList.where((e) => e.installed && !e.isTrustedSource).toList();
    final available = extensionsList.where((e) => !e.installed).toList();

    return Container(
      color: AnikutaColors.background,
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 8, right: 16),
            child: Row(
              children: [
                IconButton(onPressed: () => Navigator.of(context).pop(), icon: const Icon(Icons.arrow_back, color: AnikutaColors.onBackground)),
                const Text('Extensions', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: AnikutaColors.onBackground)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: SegmentedToggle(options: ['Anime', 'Manga'], selected: 0, onChanged: (i) {}),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16).copyWith(bottom: 20),
              children: [
                const SectionHeader(text: 'Trusted Sources'),
                ...trusted.map((e) => _extRow(e)),
                const SectionHeader(text: 'Installed'),
                ...installed.map((e) => _extRow(e)),
                const SectionHeader(text: 'Available'),
                ...available.map((e) => _extRow(e)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _extRow(Extension e) {
    return Container(
      margin: const EdgeInsets.only(bottom: 6),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(color: AnikutaColors.surface2, borderRadius: BorderRadius.circular(10)),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: e.iconColors),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(child: Text(e.iconLetter, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w900))),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(e.name, style: const TextStyle(color: AnikutaColors.onBackground, fontSize: 13, fontWeight: FontWeight.bold)),
                Text('${e.lang} · v${e.version}', style: const TextStyle(color: AnikutaColors.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          if (e.installed && !e.isTrustedSource)
            IconButton(onPressed: () {}, icon: const Icon(Icons.shield, color: AnikutaColors.primary, size: 18))
          else if (!e.installed)
            IconButton(onPressed: () {}, icon: const Icon(Icons.download, color: AnikutaColors.primary, size: 18))
          else
            const Icon(Icons.check_circle, color: AnikutaColors.primary, size: 18),
        ],
      ),
    );
  }
}
