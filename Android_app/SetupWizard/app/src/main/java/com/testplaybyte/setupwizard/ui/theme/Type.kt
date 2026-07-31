package com.testplaybyte.setupwizard.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.testplaybyte.setupwizard.R

/* =====================================================================================
 *  Type.kt — BIG, BOLD typography for the Setup Wizard.
 *
 *  Bundles Roboto TTF files (regular/medium/bold/black) in res/font/ so
 *  ExtraBold (800) renders on ALL devices — system fonts may not have
 *  weight 800 installed, causing bold text to fall back to 400/700.
 * ===================================================================================== */

val RobotoFamily = FontFamily(
    Font(R.font.roboto_regular, FontWeight.Normal),
    Font(R.font.roboto_medium, FontWeight.Medium),
    Font(R.font.roboto_bold, FontWeight.Bold),
    Font(R.font.roboto_black, FontWeight.ExtraBold),
)

val SetupWizardTypography = Typography(
    // Screen titles — "Welcome to Anime App!", "Restore Successful!", etc.
    displayLarge = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 36.sp,
        fontWeight = FontWeight.ExtraBold,
        letterSpacing = (-0.75).sp,
        lineHeight = 42.sp,
    ),
    // Most screen titles — "Choose Your Theme", "Backup Summary", etc.
    displayMedium = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 30.sp,
        fontWeight = FontWeight.ExtraBold,
        letterSpacing = (-0.5).sp,
        lineHeight = 36.sp,
    ),
    // Smaller titles / "Restore Backup" style headers
    displaySmall = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 26.sp,
        fontWeight = FontWeight.ExtraBold,
        letterSpacing = (-0.25).sp,
        lineHeight = 32.sp,
    ),
    // Big section headers inside cards
    headlineLarge = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 24.sp,
        fontWeight = FontWeight.Bold,
        letterSpacing = 0.sp,
        lineHeight = 30.sp,
    ),
    // Card headers
    headlineMedium = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 20.sp,
        fontWeight = FontWeight.Bold,
        letterSpacing = 0.sp,
        lineHeight = 26.sp,
    ),
    headlineSmall = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 17.sp,
        fontWeight = FontWeight.Bold,
        lineHeight = 22.sp,
    ),
    // Toggle / stat box labels
    titleLarge = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 18.sp,
        fontWeight = FontWeight.Bold,
        lineHeight = 24.sp,
    ),
    titleMedium = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 15.sp,
        fontWeight = FontWeight.Bold,
        lineHeight = 20.sp,
    ),
    titleSmall = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 13.sp,
        fontWeight = FontWeight.SemiBold,
        lineHeight = 18.sp,
    ),
    // Body text / subtitles
    bodyLarge = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 16.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 22.sp,
    ),
    bodyMedium = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 14.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 20.sp,
    ),
    bodySmall = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 13.sp,
        fontWeight = FontWeight.Normal,
        lineHeight = 18.sp,
    ),
    // Button text, badges
    labelLarge = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 13.sp,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = 0.5.sp,
        lineHeight = 16.sp,
    ),
    labelMedium = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 12.sp,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = 0.5.sp,
        lineHeight = 14.sp,
    ),
    labelSmall = TextStyle(
        fontFamily = RobotoFamily,
        fontSize = 11.sp,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = 0.5.sp,
        lineHeight = 14.sp,
    ),
)
