# Product Metafields (authoritative)

Source: Shopify admin, captured 2026-07-14. All 8 custom fields are **fixed Choice
lists** (admin mislabels them "Single line text"). Pick values ONLY from these enums;
validate before writing. "multi" = list, else single value.

| Key | Multi | Values |
|-----|-------|--------|
| `custom.crystal_type` | no | Amethyst, Rose Quartz, Black Tourmaline, Fluorite, Labradorite, Citrine, Selenite, Obsidian, Carnelian, Moonstone, Clear Quartz, Smoky Quartz, Tiger's Eye, Malachite, Aventurine, Lapis Lazuli, Sodalite, Pyrite, Hematite, Rhodonite, Angelite, Celestite, Kyanite, Lepidolite, Rhodochrosite, Prehnite, Aquamarine, Garnet |
| `custom.handmade` | boolean | true / false |
| `custom.theme` | yes | Witchcraft, Pagan, Wicca, Spiritual, Gothic, Fantasy, Fairy, Angel, Nature, Celtic, Mystical, Moon, Astrology, Tarot, Crystal Healing |
| `custom.intention` | yes | Love, Self Love, Relationships, Protection, Healing, Grounding, Calm, Meditation, Stress Relief, Energy Cleansing, Spiritual Growth, Abundance, Wealth, Success, Luck, Confidence, Creativity, Manifestation, Psychic Ability, Dream Work, Sleep, Balance, Focus, Courage, Positivity |
| `custom.planet` | yes | Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto |
| `custom.element` | yes | Earth, Air, Fire, Water, Spirit |
| `custom.zodiac` | yes | Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces |
| `custom.chakra` | yes | Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown |

Gotcha: theme `spellbound-celestial-body.liquid` renders "Earth" as a planet but Planet
enum excludes it. Never output Earth for `custom.planet`.

Do NOT modify (other apps' fields): `Unavailable reason`, `Google: Custom Product`,
`Search product boosts`, `Related products`, `Related products settings`,
`Complementary products`.

Proposed new (enricher, not yet created): `custom.enriched` (bool),
`custom.enriched_at` (date). Un-enriched queue = `enriched != true`. Own vs imported =
product `vendor` ("Totally Spellbound" vs "Kate's Clothing"/Collective).

```json
{
  "custom.crystal_type": {"multi": false, "values": ["Amethyst","Rose Quartz","Black Tourmaline","Fluorite","Labradorite","Citrine","Selenite","Obsidian","Carnelian","Moonstone","Clear Quartz","Smoky Quartz","Tiger's Eye","Malachite","Aventurine","Lapis Lazuli","Sodalite","Pyrite","Hematite","Rhodonite","Angelite","Celestite","Kyanite","Lepidolite","Rhodochrosite","Prehnite","Aquamarine","Garnet"]},
  "custom.handmade": {"type": "boolean"},
  "custom.theme": {"multi": true, "values": ["Witchcraft","Pagan","Wicca","Spiritual","Gothic","Fantasy","Fairy","Angel","Nature","Celtic","Mystical","Moon","Astrology","Tarot","Crystal Healing"]},
  "custom.intention": {"multi": true, "values": ["Love","Self Love","Relationships","Protection","Healing","Grounding","Calm","Meditation","Stress Relief","Energy Cleansing","Spiritual Growth","Abundance","Wealth","Success","Luck","Confidence","Creativity","Manifestation","Psychic Ability","Dream Work","Sleep","Balance","Focus","Courage","Positivity"]},
  "custom.planet": {"multi": true, "values": ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"]},
  "custom.element": {"multi": true, "values": ["Earth","Air","Fire","Water","Spirit"]},
  "custom.zodiac": {"multi": true, "values": ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]},
  "custom.chakra": {"multi": true, "values": ["Root","Sacral","Solar Plexus","Heart","Throat","Third Eye","Crown"]}
}
```
