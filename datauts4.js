/* =========================================================
   data.js – semua data wiki ada di sini.
   Edit file ini untuk mengganti video, kartu, atau catatan.
   ========================================================= */

/* ---------- Gambar ---------- */
// Folder gambar. Nama file default = nama kartu huruf kecil + tanda hubung
// (contoh: "Junk Synchron" → images/junk-synchron.jpg)
const IMG_DIR = "images/";

const MAIN_CARD = { name: "Shooting Quasar Dragon", img: "shooting-quasar-dragon.jpg" };
const HOLDER    = { name: "Yusei Fudo",             img: "yusei-fudo.jpg" };

/* ---------- Video ---------- */
// Pemilik video bisa melarang embed, jadi setiap video punya tombol "Buka di YouTube".
const VIDEOS = [
  { id: "kj3WS1pT18k", title: "Ep. 150: Yusei Summons Shooting Quasar Dragon", by: "Anime (JP sub)" },
  { id: "DQXXhE6Z6QM", title: "Limit Over Accel Synchro! Full Summon",         by: "Knuckles1997" },
  { id: "NqdIw-dXuMQ", title: "Shooting Quasar Dragon Theme",                  by: "Yu-Gi-Oh! Official" },
  { id: "I66yrqX3Ixk", title: "Summon Animation (Duel Links, 4K)",             by: "Duel Links" },
  { id: "79omHbUP4LE", title: "Quasar OTK Deck (Tag Force 6)",                 by: "Game" }
];

/* ---------- Deck ---------- */
// Kategori: extra | tuner | monster | spell | trap | support
const CATEGORIES = {
  extra:   "Extra Deck",
  tuner:   "Tuner",
  monster: "Monster",
  spell:   "Spell",
  trap:    "Trap",
  support: "Pendukung"
};

// Pembantu: ubah daftar nama menjadi daftar kartu satu kategori
const cards = (category, names) => names.map(name => ({ name, category }));

// Extra Deck Yusei di anime (Season 5). Juga dipakai di tab Pemegang.
const YUSEI_EXTRA = [
  "Ancient Fairy Dragon", "Black Rose Dragon", "Black-Winged Dragon", "Formula Synchron",
  "Junk Berserker", "Junk Warrior", "Life Stream Dragon", "Nitro Warrior", "Power Tool Dragon",
  "Red Dragon Archfiend", "Shooting Star Dragon", "Shooting Quasar Dragon", "Stardust Dragon", "Turbo Warrior"
];

// Sumber: Yugipedia "Yusei Fudo's Decks" (Turbo Deck Season 5 / Ark Cradle).
// Properti opsional per kartu: qty (jumlah), img (nama file), desc (deskripsi).
const DECK = [
  ...cards("extra", YUSEI_EXTRA),

  ...cards("tuner", [
    "Big Eater", "Blue Expense Falcon", "Debris Dragon", "Drill Synchron", "Effect Veiler",
    "Hyper Synchron", "Junk Synchron", "Mach Synchron", "Mono Synchron", "Nitro Synchron",
    "Quickdraw Synchron", "Steam Synchron", "Turbo Synchron", "Unknown Synchron"
  ]),

  ...cards("monster", [
    "Balance Blaster", "Bright Star Dragon", "Clear Effector", "Devoted Gardna", "Doppelwarrior",
    "Double Delta Warrior", "Fake Gardna", "Guard Master", "Junk Servant", "Max Warrior",
    "Mystic Piper", "Necro Defender", "Quillbolt Hedgehog", "Regen Warrior", "Salvagent",
    "Salvage Warrior", "Scouting Warrior", "Shield Wing", "Sneak Giant", "Sonic Chick",
    "Sonic Warrior", "Speed Warrior", "Stardust Xiaolong", "Synchron Believer", "Synchron Keeper",
    "Triangle Warrior", "Wave Wall", "Wild Heart"
  ]),

  { name: "Speed Spell - Angel Baton",    category: "spell", qty: 2 },
  { name: "Speed Spell - Defense Buster", category: "spell" },
  { name: "Speed Spell - Synchro Panic",  category: "spell" },
  { name: "Speed World 2",                category: "spell" },

  ...cards("trap", [
    "Crush Star", "Dimension Voyage", "Enduring Soul", "Converging Wishes", "Ghoul Summoner",
    "Graceful Revival", "Hardship", "High and Low", "Revenge Return", "Scramble Egg",
    "Scrap-Iron Scarecrow", "Star Excursion", "Starlight Road", "Synchro Barrier Force",
    "Synchro Striker Unit", "Talisman of Reversal", "Trust Chain", "Wasteland Tornado"
  ]),

  // Kartu pendukung TCG/OCG (dari catatan Card Tips Yugipedia)
  { name: "Crimson Dragon", category: "support",
    desc: "Disebut di Card Tips Yugipedia sebagai kartu yang mempermudah Special Summon Shooting Quasar Dragon." },
  { name: "Limit Overdrive", category: "support",
    desc: "Disebut di Card Tips sebagai pendukung summon Quasar. Monster ini juga tampil di ilustrasi kartunya." }
];

// Deskripsi khusus untuk kartu di deck (dipakai di modal)
const NOTES = {
  "Shooting Quasar Dragon":`1 Tuner Synchro Monster + 2+ non-Tuner Synchro Monsters.
  Must be Synchro Summoned.
  Can attack a number of times each Battle Phase, up to the number of non-Tuners used for its Synchro Summon.
  Once per turn, when a card or effect is activated (Quick Effect): You can negate the activation, and if you do, destroy it. When this face-up card leaves the field: You can Special Summon 1 "Shooting Star Dragon" from your Extra Deck.`,
  "Shooting Star Dragon":`1 Tuner Synchro Monster + "Stardust Dragon"
Once per turn: You can excavate the top 5 cards of your Deck, shuffle them back in, also this card's maximum number of attacks per Battle Phase this turn equals the number of Tuners excavated.
Once per turn, when a card or effect is activated that would destroy a card(s) on the field (Quick Effect): You can negate the effect, and if you do, destroy it. Once per turn, when an opponent's monster declares an attack: You can target the attacking monster; banish this card, and if you do, negate that attack. Once per turn, during the End Phase, if this card was banished by its effect this turn: Special Summon this card.`,
  "Ancient Fairy Dragon":`1 Tuner + 1+ non-Tuner monsters
During your Main Phase: You can Special Summon 1 Level 4 or lower monster from your hand. You cannot conduct your Battle Phase the turn you activate this effect.
During your Main Phase: You can destroy as many cards in the Field Zones as possible (min. 1), and if you do, gain 1000 LP, then you can add 1 Field Spell with a different name than the destroyed card(s), from your Deck to your hand. You can only use each effect of "Ancient Fairy Dragon" once per turn.`,
"Black Rose Dragon":`1 Tuner + 1+ non-Tuners
When this card is Synchro Summoned: You can destroy all cards on the field.
Once per turn: You can banish 1 Plant monster from your GY, then target 1 Defense Position monster your opponent controls; change that target to face-up Attack Position, and if you do, its ATK becomes 0 until the end of this turn.`,
"Black-Winged Dragon":`1 Tuner + 1+ non-Tuner monsters
If you would take damage from a card effect, place 1 Black Feather Counter on this card instead. This card loses 700 ATK for each Black Feather Counter on it. Once per turn: You can remove all Black Feather Counters from this card, then target 1 face-up monster your opponent controls; that target loses 700 ATK for each Black Feather Counter removed, and if it does, inflict damage to your opponent equal to the ATK lost by this effect.`,
"Formula Synchron":`1 Tuner + 1 non-Tuner monster
When this card is Synchro Summoned: You can draw 1 card. Once per Chain, during your opponent's Main Phase, you can (Quick Effect): Immediately after this effect resolves, Synchro Summon using this card you control.`,
"Junk Berserker":`"Junk Synchron" + 1 or more non-Tuner monsters
You can banish 1 "Junk" monster from your Graveyard, then target 1 face-up monster your opponent controls; that target loses ATK equal to the banished monster's ATK. At the start of the Damage Step, if this card attacks a Defense Position monster: Destroy that monster.`,
"Junk Warrior":`"Junk Synchron" + 1+ non-Tuner monsters
If this card is Synchro Summoned: It gains ATK equal to the total ATK of all Level 2 or lower monsters you currently control.`,
"Life Stream Dragon":`1 Tuner + "Power Tool Dragon"
When this card is Synchro Summoned: You can make your LP become 4000. You take no effect damage. If this face-up card on the field would be destroyed, you can banish 1 Equip Spell Card from your Graveyard instead.`,
"Nitro Warrior":`"Nitro Synchron" + 1 or more non-Tuner monsters
Once during each of your turns, if you activate a Spell Card, this card gains 1000 ATK during the next attack this turn involving this card, during damage calculation only. If this attacking card destroys an opponent's monster by battle, after damage calculation: You can target 1 face-up Defense Position monster your opponent controls; change that target to Attack Position, then this card can make a second attack in a row, on that monster.`,
"Power Tool Dragon":`1 Tuner + 1+ non-Tuner monsters
Once per turn: You can reveal 3 Equip Spells from your Deck, then your opponent randomly adds 1 of them to your hand, and shuffle the other cards into the Deck. If this card would be destroyed while equipped with an Equip Spell(s), you can send 1 of those cards to the GY instead.`,
"Red Dragon Archfiend":`1 Tuner + 1+ non-Tuner monsters
After damage calculation, if this card attacked an opponent's Defense Position monster: Destroy all Defense Position monsters your opponent controls. Once per turn, during your End Phase: Destroy all other monsters you control that did not declare an attack this turn. This card must be face-up on the field to activate and to resolve this effect.`,
"Stardust Dragon":`1 Tuner + 1+ non-Tuner monsters
When a card or effect is activated that would destroy a card(s) on the field (Quick Effect): You can Tribute this card; negate the activation, and if you do, destroy it. During the End Phase, if this effect was activated this turn (and was not negated): You can Special Summon this card from your GY.`,
"Turbo Warrior":`"Turbo Synchron" + 1 or more non-Tuner monsters
When this card declares an attack on a Level 6 or higher Synchro Monster: Halve the ATK of the attack target until the end of the Damage Step. This card cannot be targeted by the effects of Level 6 or lower monsters.`,
"Big Eater":`[ Fiend / Tuner ]
You can send 2 cards from your hand to the Graveyard to Special Summon this card.`,
"Blue Expense Falcon":`[ Winged Beast / Tuner ]
When this card is Normal Summoned, you can Special Summon 1 Level 4 or lower Dragon-Type monster from your hand. This card cannot be used as a Synchro Material Monster, except for the Synchro Summon of a WIND monster.`,
"Debris Dragon":`[ Dragon / Tuner / Effect ]
When this card is Normal Summoned: You can target 1 monster with 500 or less ATK in your GY; Special Summon that target in Attack Position, but negate its effects. Cannot be used as Synchro Material, except for the Synchro Summon of a Dragon monster. The other Synchro Material(s) cannot be Level 4.`,
"Drill Synchron":`[ Machine / Tuner / Effect ]
If a Warrior-Type monster you control attacks a Defense Position monster, inflict piercing battle damage to your opponent. Once per turn, when you inflict battle damage to your opponent with this effect: You can draw 1 card.`,
"Effect Veiler":`[ Spellcaster / Tuner / Effect ]
During your opponent's Main Phase (Quick Effect): You can send this card from your hand to the GY, then target 1 Effect Monster your opponent controls; negate the effects of that face-up monster your opponent controls, until the end of this turn.`,
"Hyper Synchron":`[ Machine / Tuner / Effect ]
If this card is sent to the Graveyard for the Synchro Summon of a Dragon-Type monster: That monster gains 800 ATK, also banish that face-up monster during the End Phase.`,
"Junk Synchron":`[ Warrior / Tuner / Effect ]
When this card is Normal Summoned: You can target 1 Level 2 or lower monster in your GY; Special Summon that target in Defense Position, but negate its effects.`,
"Mach Synchron":`[ Machine / Tuner / Effect ]
During the End Phase of the turn this card was sent to the Graveyard as a Synchro Material Monster for a Synchro Summon: You can target 1 other Synchro Material Monster in your Graveyard; add it to your hand.`,
"Mono Synchron":`[ Machine / Tuner / Effect ]
When using this card as Synchro Material, the other Synchro Material(s) must be Level 4 or lower Warrior or Machine-Type monsters, and they are treated as Level 1.`,
"Nitro Synchron":`[ Machine / Tuner / Effect ]
If this card is sent to the Graveyard for the Synchro Summon of a "Nitro" Synchro Monster: Draw 1 card.`,
"Quickdraw Synchron":`[ Machine / Tuner / Effect ]
You can Special Summon this card (from your hand) by sending 1 monster from your hand to the GY. For a Synchro Summon, you can substitute this card for any 1 "Synchron" Tuner. Cannot be used as a Synchro Material, except for the Synchro Summon of a monster that mentions a "Synchron" Tuner as material.`,
"Steam Synchron":`[ Machine / Tuner / Effect ]
During your opponent's Main Phase, you can (Quick Effect): Immediately after this effect resolves, Synchro Summon using this card you control.`,
"Turbo Synchron":`[ Machine / Tuner / Effect ]
When this card declares an attack: You can change the attack target to Defense Position. When you take battle damage while this card is attacking: You can Special Summon 1 monster from your hand with ATK less than or equal to the battle damage you took.`,
"Unknown Synchron":`[ Machine / Tuner / Effect ]
If only your opponent controls a monster, you can Special Summon this card (from your hand). You can only Special Summon "Unknown Synchron" once per Duel this way.`,
"Balance Blaster":`[ Machine / Effect ]
If 1 face-up monster you control would lose ATK because of a card effect, inflict damage to your opponent equal to the amount of ATK it would have lost instead.`,
"Bright Star Dragon":`[ Dragon / Effect ]
When this card is Normal Summoned: You can target 1 other face-up monster on the field; increase that target's Level by 2 until the end of this turn.`,
"Clear Effector":`[ Spellcaster / Effect ]
If this card is sent to the Graveyard as a Synchro Material: Draw 1 card. A Synchro Monster that used this card as a Synchro Material cannot be destroyed by card effects.`,
"Devoted Gardna":`[ Warrior / Effect ]
When a face-up monster you control with 1000 or less ATK is selected as an attack target, you can send this card from your hand to the Graveyard to reduce any Battle Damage you would take from this battle to 0.`,
"Doppelwarrior":`[ Warrior / Effect ]
When a monster(s) is Special Summoned from your GY (except during the Damage Step): You can Special Summon this card from your hand. If this card is sent to the GY as Synchro Material: You can Special Summon 2 "Doppel Tokens" (Warrior/DARK/Level 1/ATK 400/DEF 400) in Attack Position.`,
"Double Delta Warrior":`[ Warrior / Effect ]
If your opponent controls a monster and you control no monsters, you can Special Summon this card from your hand. If this card is used as a Synchro Material Monster, monsters you control cannot attack this turn.`,
"Fake Gardna":`[ Warrior / Effect ]
When your opponent's monster declares a direct attack, you can Special Summon this card from your Graveyard in face-up Defense Position. If this card is Special Summoned with this effect, remove it from play when it is destroyed.`,
"Guard Master":`[ Warrior / Effect ]
If this card is in your Graveyard when a face-up Attack Position monster you control is attacked, you can remove this card from play to activate its effect. If you do, change the attacked monster to Defense Position. During this turn, that monster cannot be destroyed by battle.`,
"Junk Servant":`[ Warrior / Effect ]
If you control a "Junk" monster, you can Special Summon this card (from your hand)`,
"Max Warrior":`[ Warrior / Effect ]
If this card attacks an opponent's monster, this card gains 400 ATK during the Damage Step only. If this card destroys an opponent's monster by battle, until your next Standby Phase: this card becomes Level 2 and its original ATK and DEF are halved.`,
"Mystic Piper":`[ Spellcaster / Effect ]
You can Tribute this card to draw and reveal 1 card. If that card is a Level 1 Monster Card, draw 1 more card. The effect of "Mystic Piper" can only be activated once per turn.`,
"Necro Defender":`[ Fiend / Effect ]
During your Main Phase, you can remove from play this card from your Graveyard to select 1 monster you control. Until your opponent's next End Phase, that monster cannot be destroyed by battle, and you take no Battle Damage from battles involving it.`,
"Quillbolt Hedgehog":`[ Machine / Effect ]
If this card is in your GY: You can Special Summon this card, but banish it when it leaves the field. You must control a Tuner to activate and to resolve this effect.`,
"Regen Warrior":`[ Warrior / Effect ]
When this card is sent from your hand to the Graveyard, you can Special Summon it.`,
"Salvagent":`[ Spellcaster / Effect ]
You can Tribute this card to select 1 Synchro Monster in your Graveyard, and Special Summon it in Defense Position. While face-up on the field, its effect(s) is negated, and it is treated as a non-Synchro Monster.`,
"Salvage Warrior":`[ Warrior / Effect ]
When this card is Tribute Summoned, you can Special Summon 1 Tuner monster from your hand or Graveyard.`,
"Scouting Warrior":`[ Warrior / Effect ]
If this card is added from your Deck to your hand by a card effect, you can Special Summon it.`,
"Shield Wing":`[ Winged Beast / Effect ]
Twice per turn, this card cannot be destroyed by battle.`,
"Sneak Giant":`[ Rock / Effect ]
If your opponent controls a monster and you control no monsters, you can Special Summon 1 Level 1 monster from your Graveyard to Normal Summon this card without Tributing.`,
"Sonic Chick":`[ Winged Beast / Effect ]
Cannot be destroyed by battle with a monster that has 1900 or more ATK.`,
"Sonic Warrior":`[ Warrior / Effect ]
If this card is sent to the Graveyard: All Level 2 or lower monsters you currently control gain 500 ATK.`,
"Speed Warrior":`[ Warrior / Effect ]
Once per Battle Phase, if this card was Normal Summoned this turn (except during the Damage Step): You can make its ATK become double its original ATK, until the end of the Battle Phase.`,
"Stardust Xiaolong":`[ Dragon / Effect ]
When you Synchro Summon "Stardust Dragon": You can Special Summon this card from your GY in Attack Position. Each turn, the first time this card would be destroyed by battle, it is not destroyed.`,
"Synchron Believer":`[ Fairy / Effect ]
When a face-up Synchro Monster you control is selected as an attack target, you can negate that attack and Special Summon this card from your hand.`,
"Synchron Keeper":`[ Zombie / Effect ]
When you would take damage by a card effect, you can remove from play 1 Tuner monster from your Graveyard and this card from your hand to activate this card's effect. Negate that effect, and Special Summon 1 Synchro Monster from your Extra Deck whose Level is equal to the combined Levels of the removed monsters. (This Special Summon is treated as a Synchro Summon.) Negate the effect(s) of that Synchro Monster.`,
"Triangle Warrior":`[ Warrior / Effect ]
You can Special Summon 2 "Triangle Tokens" (Warrior-Type/LIGHT/Level 2/ATK 1200/DEF 1200) to your opponent's side of the field in Defense Position to Special Summon this card from your hand.`,
"Wave Wall":`[ Rock / Effect ]
During each of your opponent's Battle Phases, you can negate attacks from monsters your opponent controls, up to the number of face-up Synchro Monsters you control.`,
"Wild Heart":`[ Warrior / Effect ]
When a Monster Card is sent from the hand to the Graveyard, you can Special Summon this card from your hand. This card can attack your opponent directly. If it does with this effect, destroy it at the end of the Damage Step. If this card on the field is destroyed by a card effect, except its own, you can Special Summon it from the Graveyard. If this card is Special Summoned this way, remove it from play during the End Phase.`,
"Speed Spell - Angel Baton":`[ Quick-Play Spell ]
Activate only by removing 4 of your Speed Counters. Draw 2 cards from your Deck and send 1 card from your hand to the Graveyard.`,
"Speed Spell - Defense Buster":`[ Quick-Play Spell ]
Activate only if you have 2 or more Speed Counters. Select 1 Defense Position monster your opponent controls and change it to face-up Attack Position.`,
"Speed Spell - Synchro Panic":`[ Quick-Play Spell ]
Activate only while you have 7 or more Speed Counters. Special Summon as many Synchro Monsters as possible that have been Synchro Summoned during this Duel from your Extra Deck. The effect(s) of the Special Summoned monster(s) are negated, and their ATK becomes 0. During the End Phase, remove from play all Synchro Monsters Special Summoned by this card's effect.`,
"Speed World 2":`[ Field Spell ]
Spell Cards other than "Speed Spell" Cards cannot be activated. During each player's Standby Phases, each player places 1 Speed Counter of their own on this card (up to 12 each). You can remove Speed Counters of your own and reveal 1 "Speed Spell" Card in your hand to apply the following effects.
●4 Counters: Inflict 800 damage to your opponent.
●7 Counters: Draw 1 card.
●10 Counters: Destroy 1 card on the field.`,
"Crush Star":`[ Trap ]
Activate only when a Synchro Monster on the field is destroyed. Select 2 monsters with 1000 or less ATK (1 in your hand and 1 in your Graveyard), and Special Summon them in face-up Defense Position.`,
"Dimension Voyage":`[ Trap ]
Select as many of your Synchro Monsters as possible that are removed from play and Special Summon them to your side of the field. Their monster effects are negated, and they cannot attack. During the End Phase, remove from play all monsters that were Special Summoned by this effect.`,
"Enduring Soul":`[ Trap ]
If a face-up Attack Position monster you control would be destroyed by battle, you can activate this card's effect. If you do, that monster is not destroyed by this battle, and loses 800 ATK after damage calculation.`,
"Converging Wishes":`[ Trap ]
If you have 5 or more Dragon Synchro Monsters with different names in your GY: Special Summon 1 "Stardust Dragon" from your Extra Deck (this is treated as a Synchro Summon), and equip it with this card, but banish it during the End Phase. That equipped monster gains ATK equal to the combined ATK of all Dragon Synchro Monsters in your GY. Each time that equipped monster destroys an opponent's monster by battle: You can banish 1 Dragon Synchro Monster from your GY; that equipped monster can attack an opponent's monster again in a row.`,
"Ghoul Summoner":`[ Continuous Trap ]
Select 1 Synchro Monster in the Graveyard that was destroyed and sent there this turn, Special Summon it, and equip it with this card. When the equipped monster is removed from the field, destroy this card. You can discard 1 card from your hand and select 1 Synchro Monster in your Graveyard to Special Summon that monster and take damage equal to its current ATK.`,
"Graceful Revival":`[ Continuous Trap ]
Activate this card by targeting 1 Level 2 or lower monster in your Graveyard; Special Summon that target in Attack Position. When this card leaves the field, destroy that monster. When that monster leaves the field, destroy this card.`,
"Hardship":`[ Continuous Trap ]
Equip this card as an Equip Card to a monster you control. If you would take damage by the effect of an opponent's monster, you can reduce the ATK and DEF of the equipped monster to 0 to reduce all damage from that monster's effects to 0 this turn. When the equipped monster is removed from the field, destroy this card. You can send this face-up card to the Graveyard to destroy the equipped monster, then destroy all face-up Equip Cards on the field and send them to the Graveyard.`,
"High and Low":`[ Trap ]
When a face-up monster you control is targeted for an attack: Send the top card of your Deck to the Graveyard, and if it is a monster, the attack target gains ATK equal to the ATK of the monster sent to the Graveyard, until the End Phase. If the attack target's ATK becomes higher than the attacking monster's ATK, destroy the attack target. You can repeat this effect up to 3 times.`,
"Revenge Return":`[ Trap ]
Activate only when a monster is destroyed by battle. Draw 1 card. You can remove from play this card from your Graveyard to select 1 monster in your Graveyard that was destroyed by a card effect this turn, and Special Summon it.`,
"Scramble Egg":`[ Trap ]
If a monster you control is destroyed by battle or card effect and sent to the GY: You can Special Summon 1 "Sonic Chick" from your hand, Deck or GY.`,
"Scrap-Iron Scarecrow":`[ Trap ]
When an opponent's monster declares an attack: Target the attacking monster; negate the attack, also, after that, Set this card face-down instead of sending it to the GY.`,
"Star Excursion":`[ Trap ]
Activate only during your opponent's Battle Phase, when a Synchro Monster you control is attacked by an opponent's Synchro Monster. Remove both battling monsters from play, and Special Summon them to each player's field at the end of the Battle Phase of your opponent's 3rd turn after activation.`,
"Starlight Road":`[ Trap ]
When a card or effect is activated that would destroy 2 or more cards you control: Negate the effect, and if you do, destroy that card, then you can Special Summon 1 "Stardust Dragon" from your Extra Deck.`,
"Synchro Barrier Force":`[ Trap ]
Negate a card or effect that would destroy a card(s) on the field, and inflict 500 damage to your opponent for each face-up Synchro Monster you control.`,
"Synchro Striker Unit":`[ Trap ]
Equip this card as an Equip Card to a face-up Synchro Monster you control. It gains 1000 ATK. During each of your End Phases, it loses 800 ATK.`,
"Talisman of Reversal":`[ Trap ]
When your opponent adds a card(s) to the hand, except during their Draw Phase, draw cards until you have the same number of cards in your hand as your opponent.`,
"Wasteland Tornado":`[ Trap ]
Select 1 card in the Spell & Trap Card Zones and destroy it. The controller of the destroyed card can then Set 1 Spell or Trap Card from their hand.`,
"Crimson Dragon":`[ Dragon / Synchro /Effect ]
1 Tuner + 1+ non-Tuner monsters
If this card is Special Summoned: You can add 1 Spell/Trap that mentions "Crimson Dragon" from your Deck to your hand. (Quick Effect): You can target 1 Level 7 or higher Synchro Monster on the field, except "Crimson Dragon"; return this card to the Extra Deck, and if you do, Special Summon 1 Dragon Synchro Monster from your Extra Deck with the same Level as the targeted monster (this is treated as a Synchro Summon). You can only use each effect of "Crimson Dragon" once per turn.`,
"Limit Overdrive":`[ Quick-play Spell ]
Return 1 Tuner Synchro Monster and 1 non-Tuner Synchro Monster you control to the Extra Deck; Special Summon 1 Synchro Monster from your Extra Deck that has a Level equal to the combined Levels the 2 monsters had on the field, ignoring its Summoning conditions. You can only activate 1 "Limit Overdrive" per turn.`
};