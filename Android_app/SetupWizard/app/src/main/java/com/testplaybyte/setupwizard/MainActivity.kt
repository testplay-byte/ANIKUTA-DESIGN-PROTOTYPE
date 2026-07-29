package com.testplaybyte.setupwizard

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            // SetupWizardApp() applies the theme internally
            // (it needs to switch palettes for the poison screen)
            SetupWizardApp()
        }
    }
}
