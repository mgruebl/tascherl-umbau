package com.example.tascherl

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import kotlin.math.abs
import kotlin.random.Random

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MaterialTheme {
                TascherlApp()
            }
        }
    }
}

data class WalletCardData(
    val id: Int,
    val name: String,
    val company: String,
    val type: String,
    val category: String,
    val info: String,
    val code: String,
    val locationHint: String,
    val favorite: Boolean,
    val colors: List<Color>,
    val nfcAid: String? = null,
    val nfcToken: String? = null,
    val nfcStatus: String? = null
)

fun initialCards(): List<WalletCardData> {
    return listOf(
        WalletCardData(
            id = 100,
            name = "Arbeit",
            company = "Arbeitsplatz",
            type = "NFC",
            category = "Zutrittskarte",
            info = "Simulierte NFC-Zutrittskarte für die Arbeit",
            code = "WORK-NFC-7429",
            locationHint = "Am simulierten Arbeitsterminal verwenden",
            favorite = true,
            colors = listOf(Color(0xFF6EE7B7), Color(0xFF14B8A6), Color(0xFF0E7490)),
            nfcAid = "F0010203040506",
            nfcToken = "TASCHERL_WORK_ACCESS_SIM",
            nfcStatus = "Nicht echter Chip - Demo"
        ),
        WalletCardData(
            id = 1,
            name = "Amazon",
            company = "Amazon",
            type = "QR",
            category = "Kundenkarte",
            info = "Kundenkarte",
            code = "AMZ-22341",
            locationHint = "Online verwenden",
            favorite = true,
            colors = listOf(Color(0xFF94A3B8), Color(0xFF020617))
        ),
        WalletCardData(
            id = 2,
            name = "BILLA Karte",
            company = "BILLA",
            type = "Barcode",
            category = "Supermarkt",
            info = "Bonus Punkte",
            code = "BIL-99821",
            locationHint = "Im Store zeigen",
            favorite = true,
            colors = listOf(Color(0xFFFDE047), Color(0xFFEF4444))
        ),
        WalletCardData(
            id = 3,
            name = "McDonalds",
            company = "McDonalds",
            type = "QR",
            category = "Food",
            info = "Rewards",
            code = "MCD-88221",
            locationHint = "Beim Bestellen zeigen",
            favorite = false,
            colors = listOf(Color(0xFFFACC15), Color(0xFFDC2626))
        ),
        WalletCardData(
            id = 4,
            name = "Lidl Karte",
            company = "Lidl",
            type = "NFC",
            category = "Supermarkt",
            info = "NFC-Demo Karte",
            code = "LIDL-NFC-7721",
            locationHint = "Am Terminal halten",
            favorite = false,
            colors = listOf(Color(0xFF60A5FA), Color(0xFFFACC15)),
            nfcAid = "F0010203040507",
            nfcToken = "TASCHERL_LIDL_SIM",
            nfcStatus = "Demo"
        )
    )
}

@Composable
fun TascherlApp() {
    var darkMode by remember { mutableStateOf(true) }
    var biometricLock by remember { mutableStateOf(false) }
    var smartCards by remember { mutableStateOf(true) }
    var notifications by remember { mutableStateOf(true) }
    var securityHints by remember { mutableStateOf(true) }

    var selectedTab by remember { mutableStateOf("cards") }
    var selectedCard by remember { mutableStateOf<WalletCardData?>(null) }
    var showAddCard by remember { mutableStateOf(false) }
    var locked by remember { mutableStateOf(false) }

    val cards = remember {
        mutableStateListOf<WalletCardData>().apply {
            addAll(initialCards())
        }
    }

    val backgroundBrush = if (darkMode) {
        Brush.verticalGradient(
            listOf(
                Color(0xFF020617),
                Color(0xFF171717),
                Color.Black
            )
        )
    } else {
        Brush.verticalGradient(
            listOf(
                Color(0xFFF8FAFC),
                Color.White,
                Color(0xFFE2E8F0)
            )
        )
    }

    val textColor = if (darkMode) Color.White else Color(0xFF020617)

    if (locked) {
        LockScreen(
            darkMode = darkMode,
            onUnlock = {
                locked = false
                selectedCard = cards.firstOrNull { it.name == "Arbeit" } ?: cards.firstOrNull()
            }
        )
        return
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundBrush)
    ) {
        Scaffold(
            containerColor = Color.Transparent,
            bottomBar = {
                BottomNavigationBar(
                    selectedTab = selectedTab,
                    onTabSelected = { selectedTab = it },
                    onAddClick = { showAddCard = true }
                )
            }
        ) { innerPadding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .statusBarsPadding()
                    .padding(horizontal = 16.dp)
            ) {
                AppHeader(textColor = textColor)

                if (smartCards && selectedTab == "cards") {
                    val workCard = cards.firstOrNull { it.name == "Arbeit" }

                    if (workCard != null) {
                        SmartSuggestion(
                            card = workCard,
                            onOpen = { selectedCard = workCard }
                        )
                    }
                }

                when (selectedTab) {
                    "cards" -> CardsScreen(
                        cards = cards,
                        textColor = textColor,
                        onCardClick = { selectedCard = it },
                        onAddClick = { showAddCard = true }
                    )

                    "settings" -> SettingsScreen(
                        darkMode = darkMode,
                        biometricLock = biometricLock,
                        smartCards = smartCards,
                        notifications = notifications,
                        securityHints = securityHints,
                        cardsCount = cards.size,
                        onDarkModeChange = { darkMode = it },
                        onBiometricLockChange = {
                            biometricLock = it
                            locked = it
                        },
                        onSmartCardsChange = { smartCards = it },
                        onNotificationsChange = { notifications = it },
                        onSecurityHintsChange = { securityHints = it },
                        onReset = {
                            cards.clear()
                            cards.addAll(initialCards())
                            darkMode = true
                            biometricLock = false
                            smartCards = true
                            notifications = true
                            securityHints = true
                            locked = false
                        },
                        textColor = textColor
                    )
                }
            }
        }

        selectedCard?.let { card ->
            CardDetailDialog(
                card = card,
                securityHints = securityHints,
                onDismiss = { selectedCard = null }
            )
        }

        if (showAddCard) {
            AddCardDialog(
                onDismiss = { showAddCard = false },
                onAdd = { newCard ->
                    cards.add(0, newCard)
                    showAddCard = false
                }
            )
        }
    }
}

@Composable
fun LockScreen(
    darkMode: Boolean,
    onUnlock: () -> Unit
) {
    val background = if (darkMode) Color.Black else Color(0xFFF1F5F9)
    val textColor = if (darkMode) Color.White else Color.Black

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Card(
            shape = RoundedCornerShape(32.dp),
            colors = CardDefaults.cardColors(
                containerColor = if (darkMode) Color(0xFF111827) else Color.White
            ),
            elevation = CardDefaults.cardElevation(12.dp)
        ) {
            Column(
                modifier = Modifier.padding(28.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .size(82.dp)
                        .clip(RoundedCornerShape(28.dp))
                        .background(
                            Brush.linearGradient(
                                listOf(
                                    Color(0xFFC084FC),
                                    Color(0xFFEC4899),
                                    Color(0xFFFB923C)
                                )
                            )
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text("🔒", style = MaterialTheme.typography.headlineMedium)
                }

                Spacer(modifier = Modifier.height(20.dp))

                Text(
                    text = "Tascherl gesperrt",
                    color = textColor,
                    fontWeight = FontWeight.Black,
                    style = MaterialTheme.typography.headlineSmall
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Demo-App entsperren, um deine Karten zu öffnen.",
                    color = textColor.copy(alpha = 0.6f),
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(24.dp))

                Button(
                    onClick = onUnlock,
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(18.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color.White)
                ) {
                    Text("Entsperren", color = Color.Black, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
fun AppHeader(textColor: Color) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 14.dp, bottom = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(46.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(
                        Brush.linearGradient(
                            listOf(
                                Color(0xFFC084FC),
                                Color(0xFFEC4899),
                                Color(0xFFFB923C)
                            )
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "T",
                    color = Color.White,
                    fontWeight = FontWeight.Black,
                    style = MaterialTheme.typography.titleLarge
                )
            }

            Spacer(modifier = Modifier.width(10.dp))

            Column {
                Text(
                    text = "Tascherl",
                    color = textColor,
                    fontWeight = FontWeight.Black,
                    style = MaterialTheme.typography.headlineSmall
                )

                Text(
                    text = "Alles dabei. Direkt am Handy.",
                    color = textColor.copy(alpha = 0.55f),
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(50))
                .background(Color.White.copy(alpha = 0.12f))
                .border(
                    width = 1.dp,
                    color = Color.White.copy(alpha = 0.16f),
                    shape = RoundedCornerShape(50)
                )
                .padding(horizontal = 12.dp, vertical = 8.dp)
        ) {
            Text(
                text = "🛡 EU",
                color = textColor,
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}

@Composable
fun SmartSuggestion(
    card: WalletCardData,
    onOpen: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 14.dp),
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color.White.copy(alpha = 0.12f)
        )
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(46.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(Brush.linearGradient(card.colors)),
                contentAlignment = Alignment.Center
            ) {
                Text("💼")
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Vorgeschlagen",
                    color = Color.White.copy(alpha = 0.55f),
                    style = MaterialTheme.typography.bodySmall
                )

                Text(
                    text = card.name,
                    color = Color.White,
                    fontWeight = FontWeight.Bold
                )
            }

            Button(
                onClick = onOpen,
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color.White)
            ) {
                Text("Öffnen", color = Color.Black, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun CardsScreen(
    cards: List<WalletCardData>,
    textColor: Color,
    onCardClick: (WalletCardData) -> Unit,
    onAddClick: () -> Unit
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(14.dp),
        modifier = Modifier.fillMaxSize()
    ) {
        item {
            Card(
                shape = RoundedCornerShape(28.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color.White.copy(alpha = 0.12f)
                )
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(18.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "Smart Wallet",
                            color = textColor.copy(alpha = 0.65f)
                        )

                        Text(
                            text = "${cards.size} Karten gespeichert",
                            color = textColor,
                            fontWeight = FontWeight.Black,
                            style = MaterialTheme.typography.titleLarge
                        )

                        Spacer(modifier = Modifier.height(6.dp))

                        Text(
                            text = "QR, Barcode und NFC-Simulation an einem Ort.",
                            color = textColor.copy(alpha = 0.55f),
                            style = MaterialTheme.typography.bodySmall
                        )
                    }

                    Button(
                        onClick = onAddClick,
                        shape = RoundedCornerShape(18.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color.White)
                    ) {
                        Text("+", color = Color.Black, fontWeight = FontWeight.Black)
                    }
                }
            }
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Meine Karten",
                    color = textColor.copy(alpha = 0.72f),
                    fontWeight = FontWeight.Bold
                )

                Text(
                    text = "📍 Smart aktiv",
                    color = Color(0xFF6EE7B7),
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }

        items(cards) { card ->
            WalletCard(
                card = card,
                onClick = { onCardClick(card) }
            )
        }

        item {
            Spacer(modifier = Modifier.height(90.dp))
        }
    }
}

@Composable
fun WalletCard(
    card: WalletCardData,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(132.dp)
            .clickable { onClick() },
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = Color.Transparent),
        elevation = CardDefaults.cardElevation(10.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Brush.linearGradient(card.colors))
                .padding(18.dp)
        ) {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.Top,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row {
                        CompanyLogo(card = card)

                        Spacer(modifier = Modifier.width(12.dp))

                        Column {
                            Text(
                                text = card.company,
                                color = Color.White.copy(alpha = 0.72f),
                                style = MaterialTheme.typography.bodySmall
                            )

                            Text(
                                text = card.name,
                                color = Color.White,
                                fontWeight = FontWeight.Black,
                                style = MaterialTheme.typography.titleMedium
                            )

                            Text(
                                text = card.category,
                                color = Color.White.copy(alpha = 0.72f),
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }

                    TypeBadge(type = card.type)
                }

                Spacer(modifier = Modifier.weight(1f))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.Bottom
                ) {
                    Text(
                        text = card.info,
                        color = Color.White.copy(alpha = 0.82f),
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.weight(1f)
                    )

                    if (card.favorite) {
                        Text("✨")
                    }
                }
            }
        }
    }
}

@Composable
fun CompanyLogo(card: WalletCardData) {
    Box(
        modifier = Modifier
            .size(56.dp)
            .clip(RoundedCornerShape(18.dp))
            .background(Color.White),
        contentAlignment = Alignment.Center
    ) {
        val label = if (card.name == "Arbeit") {
            "💼"
        } else {
            card.company.take(2).uppercase()
        }

        Text(
            text = label,
            color = Color.Black,
            fontWeight = FontWeight.Black
        )
    }
}

@Composable
fun TypeBadge(type: String) {
    val emoji = when (type) {
        "NFC" -> "📡"
        "QR" -> "▦"
        "Barcode" -> "▥"
        else -> "💳"
    }

    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(50))
            .background(Color.Black.copy(alpha = 0.25f))
            .padding(horizontal = 10.dp, vertical = 6.dp)
    ) {
        Text(
            text = "$emoji $type",
            color = Color.White,
            style = MaterialTheme.typography.bodySmall
        )
    }
}

@Composable
fun CardDetailDialog(
    card: WalletCardData,
    securityHints: Boolean,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Fertig")
            }
        },
        title = {
            Text(
                text = card.name,
                fontWeight = FontWeight.Black
            )
        },
        text = {
            Column {
                Card(
                    shape = RoundedCornerShape(26.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.Transparent)
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(150.dp)
                            .background(Brush.linearGradient(card.colors))
                            .padding(18.dp)
                    ) {
                        Column {
                            Text(
                                text = card.company,
                                color = Color.White.copy(alpha = 0.72f)
                            )

                            Text(
                                text = card.name,
                                color = Color.White,
                                fontWeight = FontWeight.Black,
                                style = MaterialTheme.typography.headlineSmall
                            )

                            Spacer(modifier = Modifier.weight(1f))

                            Text(
                                text = card.locationHint,
                                color = Color.White.copy(alpha = 0.8f),
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = "Kartencode",
                    color = Color.Black.copy(alpha = 0.55f),
                    style = MaterialTheme.typography.bodySmall
                )

                Text(
                    text = card.code,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(16.dp))

                when (card.type) {
                    "NFC" -> NFCDisplay(card)
                    "Barcode" -> BarcodeDisplay(card.code)
                    else -> QRDisplay(card.code)
                }

                if (securityHints) {
                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = "🛡 Demo: lokal gespeichert. Keine echte Cloud-Anbindung.",
                        color = Color.Black.copy(alpha = 0.55f),
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        },
        shape = RoundedCornerShape(28.dp)
    )
}

@Composable
fun NFCDisplay(card: WalletCardData) {
    var status by remember(card.id) { mutableStateOf("idle") }

    LaunchedEffect(status) {
        if (status == "scanning") {
            delay(1800)
            status = "success"
        }
    }

    Card(
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF020617))
    ) {
        Column(
            modifier = Modifier.padding(18.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = if (card.name == "Arbeit") "Zutritt Arbeit" else "NFC Demo",
                color = Color.White,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(16.dp))

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(145.dp)
                    .clip(RoundedCornerShape(24.dp))
                    .background(Color.White.copy(alpha = 0.08f))
                    .border(
                        1.dp,
                        Color.White.copy(alpha = 0.12f),
                        RoundedCornerShape(24.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .size(86.dp)
                            .clip(CircleShape)
                            .border(
                                width = 2.dp,
                                color = Color(0xFF6EE7B7),
                                shape = CircleShape
                            )
                            .background(
                                if (status == "success") Color(0xFF34D399).copy(alpha = 0.22f)
                                else Color.Transparent
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = when (status) {
                                "success" -> "✓"
                                "scanning" -> "◎"
                                else -> "📡"
                            },
                            color = Color(0xFF6EE7B7),
                            style = MaterialTheme.typography.headlineLarge,
                            fontWeight = FontWeight.Black
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = when (status) {
                            "idle" -> "Handy ans Terminal halten"
                            "scanning" -> "NFC-Chip wird simuliert..."
                            else -> "Zutritt simuliert erfolgreich"
                        },
                        color = Color.White.copy(alpha = 0.65f),
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            Button(
                onClick = { status = "scanning" },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(18.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF34D399))
            ) {
                Text(
                    text = "NFC Simulation starten",
                    color = Color.Black,
                    fontWeight = FontWeight.Black
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(18.dp))
                    .background(Color.White.copy(alpha = 0.06f))
                    .padding(12.dp)
            ) {
                Text(
                    text = "AID: ${card.nfcAid ?: "Keine AID"}",
                    color = Color.White.copy(alpha = 0.45f),
                    style = MaterialTheme.typography.bodySmall
                )

                Text(
                    text = "Token: ${card.nfcToken ?: card.code}",
                    color = Color.White.copy(alpha = 0.45f),
                    style = MaterialTheme.typography.bodySmall
                )

                Text(
                    text = "Status: ${card.nfcStatus ?: "Demo"}",
                    color = Color.White.copy(alpha = 0.45f),
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}

@Composable
fun QRDisplay(value: String) {
    Card(
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF5F5F5))
    ) {
        Column(
            modifier = Modifier.padding(18.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "QR-Code",
                color = Color.Black.copy(alpha = 0.55f),
                style = MaterialTheme.typography.bodySmall
            )

            Text(
                text = "Zum Scannen bereit",
                color = Color.Black,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(14.dp))

            FakeQrCode(value)

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = value,
                color = Color.Black.copy(alpha = 0.55f),
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}

@Composable
fun FakeQrCode(value: String) {
    val seed = value.sumOf { it.code }

    Column(
        modifier = Modifier
            .size(180.dp)
            .clip(RoundedCornerShape(18.dp))
            .background(Color.White)
            .border(1.dp, Color.Black.copy(alpha = 0.1f), RoundedCornerShape(18.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        repeat(11) { row ->
            Row(
                modifier = Modifier.weight(1f),
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                repeat(11) { col ->
                    val finder =
                        (row < 3 && col < 3) ||
                                (row < 3 && col > 7) ||
                                (row > 7 && col < 3)

                    val filled = finder || abs(row * 17 + col * 11 + seed) % 5 < 2

                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .aspectRatio(1f)
                            .clip(RoundedCornerShape(2.dp))
                            .background(if (filled) Color.Black else Color.Transparent)
                    )
                }
            }
        }
    }
}

@Composable
fun BarcodeDisplay(value: String) {
    val seed = value.sumOf { it.code }

    Card(
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White)
    ) {
        Column(
            modifier = Modifier.padding(18.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Barcode",
                color = Color.Black.copy(alpha = 0.55f),
                style = MaterialTheme.typography.bodySmall
            )

            Text(
                text = "Kassa-Scan bereit",
                color = Color.Black,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(18.dp))

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(110.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(Color.White)
                    .border(1.dp, Color.Black.copy(alpha = 0.08f), RoundedCornerShape(18.dp))
                    .padding(horizontal = 14.dp, vertical = 18.dp),
                horizontalArrangement = Arrangement.spacedBy(3.dp),
                verticalAlignment = Alignment.Bottom
            ) {
                repeat(42) { index ->
                    val width = ((index * 7 + seed) % 4 + 1).dp
                    val height = ((index * 11 + seed) % 46 + 30).dp

                    Box(
                        modifier = Modifier
                            .width(width)
                            .height(height)
                            .background(Color.Black)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = value,
                color = Color.Black.copy(alpha = 0.55f),
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}

@Composable
fun SettingsScreen(
    darkMode: Boolean,
    biometricLock: Boolean,
    smartCards: Boolean,
    notifications: Boolean,
    securityHints: Boolean,
    cardsCount: Int,
    onDarkModeChange: (Boolean) -> Unit,
    onBiometricLockChange: (Boolean) -> Unit,
    onSmartCardsChange: (Boolean) -> Unit,
    onNotificationsChange: (Boolean) -> Unit,
    onSecurityHintsChange: (Boolean) -> Unit,
    onReset: () -> Unit,
    textColor: Color
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(14.dp),
        modifier = Modifier.fillMaxSize()
    ) {
        item {
            Card(
                shape = RoundedCornerShape(28.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color.White.copy(alpha = 0.12f)
                )
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(
                        text = "Einstellungen",
                        color = textColor,
                        fontWeight = FontWeight.Black,
                        style = MaterialTheme.typography.titleLarge
                    )

                    Text(
                        text = "Mobile Demo-App. Daten werden lokal in der App gehalten.",
                        color = textColor.copy(alpha = 0.55f),
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        }

        item {
            SettingsToggle(
                icon = "✨",
                title = "Dark Mode",
                description = "Schaltet das App-Design um.",
                value = darkMode,
                onChange = onDarkModeChange,
                textColor = textColor
            )
        }

        item {
            SettingsToggle(
                icon = "🔒",
                title = "App-Sperre Demo",
                description = "Beim Aktivieren wird ein Lockscreen angezeigt.",
                value = biometricLock,
                onChange = onBiometricLockChange,
                textColor = textColor
            )
        }

        item {
            SettingsToggle(
                icon = "📍",
                title = "Smart Cards",
                description = "Schlägt automatisch die Arbeit-Karte vor.",
                value = smartCards,
                onChange = onSmartCardsChange,
                textColor = textColor
            )
        }

        item {
            SettingsToggle(
                icon = "🔔",
                title = "Benachrichtigungen",
                description = "Demo-Schalter für Push-Hinweise.",
                value = notifications,
                onChange = onNotificationsChange,
                textColor = textColor
            )
        }

        item {
            SettingsToggle(
                icon = "🛡",
                title = "Sicherheitshinweise",
                description = "Zeigt Datenschutz- und Demo-Hinweise an.",
                value = securityHints,
                onChange = onSecurityHintsChange,
                textColor = textColor
            )
        }

        item {
            Card(
                shape = RoundedCornerShape(28.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color.White.copy(alpha = 0.12f)
                )
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(
                        text = "App Status",
                        color = textColor,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        StatusPill("$cardsCount Karten")
                        StatusPill("Mobile Demo")
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        StatusPill("QR aktiv")
                        StatusPill("NFC Simulation")
                    }
                }
            }
        }

        item {
            Button(
                onClick = onReset,
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFFEF4444).copy(alpha = 0.18f)
                )
            ) {
                Text(
                    text = "🗑 Demo zurücksetzen",
                    color = Color(0xFFFCA5A5),
                    fontWeight = FontWeight.Bold
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(90.dp))
        }
    }
}

@Composable
fun SettingsToggle(
    icon: String,
    title: String,
    description: String,
    value: Boolean,
    onChange: (Boolean) -> Unit,
    textColor: Color
) {
    Card(
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color.White.copy(alpha = 0.12f)
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(18.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(Color.White.copy(alpha = 0.1f)),
                contentAlignment = Alignment.Center
            ) {
                Text(icon)
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    color = textColor,
                    fontWeight = FontWeight.Bold
                )

                Text(
                    text = description,
                    color = textColor.copy(alpha = 0.55f),
                    style = MaterialTheme.typography.bodySmall
                )
            }

            Switch(
                checked = value,
                onCheckedChange = onChange
            )
        }
    }
}

@Composable
fun StatusPill(label: String) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(50))
            .background(Color.White.copy(alpha = 0.12f))
            .padding(horizontal = 12.dp, vertical = 8.dp)
    ) {
        Text(
            text = label,
            color = Color.White.copy(alpha = 0.75f),
            style = MaterialTheme.typography.bodySmall
        )
    }
}

@Composable
fun BottomNavigationBar(
    selectedTab: String,
    onTabSelected: (String) -> Unit,
    onAddClick: () -> Unit
) {
    NavigationBar(
        modifier = Modifier.navigationBarsPadding(),
        containerColor = Color(0xFF09090B).copy(alpha = 0.96f)
    ) {
        NavigationBarItem(
            selected = selectedTab == "cards",
            onClick = { onTabSelected("cards") },
            icon = { Text("💳") },
            label = { Text("Karten") }
        )

        NavigationBarItem(
            selected = false,
            onClick = onAddClick,
            icon = { Text("➕") },
            label = { Text("Neu") }
        )

        NavigationBarItem(
            selected = selectedTab == "settings",
            onClick = { onTabSelected("settings") },
            icon = { Text("⚙️") },
            label = { Text("Setup") }
        )
    }
}

@Composable
fun AddCardDialog(
    onDismiss: () -> Unit,
    onAdd: (WalletCardData) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var company by remember { mutableStateOf("") }
    var type by remember { mutableStateOf("QR") }

    val canAdd = name.trim().length > 1 && company.trim().length > 1

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "Neue Karte",
                fontWeight = FontWeight.Black
            )
        },
        text = {
            Column {
                Text(
                    text = "QR, Barcode oder NFC-Simulation hinzufügen.",
                    color = Color.Black.copy(alpha = 0.6f)
                )

                Spacer(modifier = Modifier.height(14.dp))

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf("QR", "Barcode", "NFC").forEach { item ->
                        Button(
                            onClick = { type = item },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (type == item) Color.Black else Color(0xFFE5E7EB),
                                contentColor = if (type == item) Color.White else Color.Black
                            )
                        ) {
                            Text(item)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Name der Karte") },
                    placeholder = { Text("z.B. Arbeit") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedTextField(
                    value = company,
                    onValueChange = { company = it },
                    label = { Text("Unternehmen") },
                    placeholder = { Text("z.B. Arbeitsplatz") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                if (type == "NFC") {
                    Spacer(modifier = Modifier.height(12.dp))

                    Card(
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = Color(0xFFDCFCE7)
                        )
                    ) {
                        Text(
                            text = "Hinweis: Diese NFC-Karte ist eine Simulation. Sie ersetzt keinen echten Zutrittschip.",
                            color = Color(0xFF166534),
                            modifier = Modifier.padding(12.dp),
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }
        },
        confirmButton = {
            Button(
                enabled = canAdd,
                onClick = {
                    val randomCode = Random.nextInt(100000, 999999)
                    val id = Random.nextInt(1000, 999999)

                    val colors = when (type) {
                        "NFC" -> listOf(Color(0xFFF59E0B), Color(0xFFDC2626))
                        "Barcode" -> listOf(Color(0xFF22D3EE), Color(0xFF2563EB))
                        else -> listOf(Color(0xFFA78BFA), Color(0xFFC026D3))
                    }

                    val newCard = WalletCardData(
                        id = id,
                        name = name,
                        company = company,
                        type = type,
                        category = when (type) {
                            "NFC" -> "Zugangskarte"
                            "Barcode" -> "Barcode Karte"
                            else -> "QR Karte"
                        },
                        info = if (type == "NFC") "Neue NFC-Simulationskarte" else "Neu hinzugefügt",
                        code = "$type-$randomCode",
                        locationHint = "Noch keine Standortregel eingerichtet.",
                        favorite = false,
                        colors = colors,
                        nfcAid = if (type == "NFC") "F00102$randomCode" else null,
                        nfcToken = if (type == "NFC") "TASCHERL_${company.uppercase()}_SIM" else null,
                        nfcStatus = if (type == "NFC") "Demo" else null
                    )

                    onAdd(newCard)
                }
            ) {
                Text("Hinzufügen")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Abbrechen")
            }
        },
        shape = RoundedCornerShape(28.dp)
    )
