export interface Prayer {
  id: string;
  title: string;
  text: string;
}

export const prayers: Record<string, Prayer> = {
  signOfCross: {
    id: 'signOfCross',
    title: 'Sign of the Cross',
    text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
  },
  apostlesCreed: {
    id: 'apostlesCreed',
    title: "Apostles' Creed",
    text: "I believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He rose again from the dead. He ascended into heaven, and is seated at the right hand of God the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of Saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  },
  ourFather: {
    id: 'ourFather',
    title: 'Our Father',
    text: 'Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
  },
  hailMary: {
    id: 'hailMary',
    title: 'Hail Mary',
    text: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  },
  gloryBe: {
    id: 'gloryBe',
    title: 'Glory Be',
    text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  },
  fatimaPrayer: {
    id: 'fatimaPrayer',
    title: 'Fatima Prayer',
    text: 'O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy. Amen.',
  },
  hailHolyQueen: {
    id: 'hailHolyQueen',
    title: 'Hail, Holy Queen',
    text: 'Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.',
  },
  rosaryPrayer: {
    id: 'rosaryPrayer',
    title: 'Rosary Prayer',
    text: 'O God, whose Only-Begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life; grant, we beseech Thee, that by meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.',
  },
  stMichaelPrayer: {
    id: 'stMichaelPrayer',
    title: 'Prayer to St. Michael',
    text: 'Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil; May God rebuke him, we humbly pray; And do thou, O Prince of the Heavenly Host, by the power of God, thrust into hell Satan and all evil spirits who wander through the world for the ruin of souls. Amen.',
  },
  memorare: {
    id: 'memorare',
    title: 'Memorare',
    text: "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother; to thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.",
  },
  eternalRest: {
    id: 'eternalRest',
    title: 'Eternal Rest',
    text: 'Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May the souls of the faithful departed, through the mercy of God, rest in peace. Amen.',
  },
  angelOfGod: {
    id: 'angelOfGod',
    title: 'Guardian Angel Prayer',
    text: "Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.",
  },
  subTuum: {
    id: 'subTuum',
    title: 'Sub Tuum Praesidium',
    text: 'We fly to thy patronage, O holy Mother of God. Despise not our petitions in our necessities, but deliver us always from all dangers, O glorious and blessed Virgin. Amen.',
  },
};

export interface MysteryGroup {
  title: string;
  emoji: string;
  mysteries: string[];
  descriptions: string[];
  bibleVerses: string[];
  bibleRefs: string[];
  reflections: string[];
}

export const mysteryGroups: Record<string, MysteryGroup> = {
  joyful: {
    title: 'Joyful Mysteries',
    emoji: '🌟',
    mysteries: [
      'The Annunciation',
      'The Visitation',
      'The Nativity',
      'The Presentation in the Temple',
      'The Finding of Jesus in the Temple',
    ],
    descriptions: [
      'The Angel Gabriel announces to Mary that she is to be the Mother of God.',
      'Mary visits her cousin Elizabeth, who is pregnant with John the Baptist.',
      'Jesus is born in a stable in Bethlehem.',
      'Mary and Joseph present the infant Jesus in the Temple.',
      'Mary and Joseph find the twelve-year-old Jesus teaching in the Temple.',
    ],
    bibleVerses: [
      '"Hail, full of grace, the Lord is with you! Do not be afraid, Mary, for you have found favor with God. Behold, you will conceive in your womb and bear a son, and you shall name him Jesus."',
      '"When Elizabeth heard Mary\'s greeting, the infant leaped in her womb, and Elizabeth, filled with the Holy Spirit, cried out in a loud voice and said, \'Blessed are you among women, and blessed is the fruit of your womb.\'"',
      '"She gave birth to her firstborn son. She wrapped him in swaddling clothes and laid him in a manger, because there was no room for them in the inn."',
      '"When the days were completed for their purification according to the law of Moses, they took him up to Jerusalem to present him to the Lord. Simeon blessed them and said to Mary his mother, \'This child is destined for the fall and rise of many in Israel.\'"',
      '"After three days they found him in the temple, sitting in the midst of the teachers, listening to them and asking them questions. He said to them, \'Why were you looking for me? Did you not know that I must be in my Father\'s house?\'"',
    ],
    bibleRefs: [
      'Luke 1:28-31',
      'Luke 1:41-42',
      'Luke 2:7',
      'Luke 2:22, 34',
      'Luke 2:46, 49',
    ],
    reflections: [
      'In the stillness of an ordinary day, God chose a young woman to change the course of history. Mary\'s "yes" opened the door for our salvation — a reminder that God often begins His greatest works in the quietest, most humble moments of our lives.',
      'Mary, newly carrying the Savior within her, doesn\'t withdraw into herself but goes in haste to serve her elderly cousin. Even the unborn John recognizes the presence of Christ — joy that can\'t be contained, spilling over from one heart to another.',
      'The Creator of the universe arrives not in a palace but in a stable, wrapped in simplicity. God draws near to us not through power and grandeur, but through vulnerability and tenderness — meeting us exactly where we are.',
      'Mary and Joseph faithfully bring Jesus to the Temple, offering Him back to the Father. Simeon\'s words foreshadow the sorrow ahead, yet Mary holds it all in her heart — trusting God even when the path forward is unclear.',
      'Even as a child, Jesus reveals where He truly belongs — in the house of His Father. Mary and Joseph\'s anxious searching reminds us that sometimes we must seek the Lord with persistence, and that He is always found where His word is spoken.',
    ],
  },
  sorrowful: {
    title: 'Sorrowful Mysteries',
    emoji: '✝️',
    mysteries: [
      'The Agony in the Garden',
      'The Scourging at the Pillar',
      'The Crowning with Thorns',
      'The Carrying of the Cross',
      'The Crucifixion',
    ],
    descriptions: [
      'Jesus prays in the Garden of Gethsemane on the night before He dies.',
      'Jesus is tied to a pillar and scourged.',
      'Jesus is mocked and crowned with thorns.',
      'Jesus carries His cross to Calvary.',
      'Jesus is nailed to the cross and dies.',
    ],
    bibleVerses: [
      '"Father, if you are willing, take this cup away from me; still, not my will but yours be done." An angel from heaven appeared to him, strengthening him. He was in such agony and he prayed so fervently that his sweat became like drops of blood falling on the ground.',
      '"Then Pilate took Jesus and had him scourged." — "But he was pierced for our sins, crushed for our iniquity. He bore the punishment that makes us whole; by his wounds we were healed."',
      '"Weaving a crown out of thorns, they placed it on his head, and a reed in his right hand. And kneeling before him, they mocked him, saying, \'Hail, King of the Jews!\'"',
      '"And carrying the cross himself, he went out to what is called the Place of the Skull, in Hebrew, Golgotha." — "Whoever wishes to come after me must deny himself, take up his cross, and follow me."',
      '"And Jesus cried out in a loud voice, \'Father, into your hands I commend my spirit.\' And when he had said this, he breathed his last."',
    ],
    bibleRefs: [
      'Luke 22:42-44',
      'John 19:1; Isaiah 53:5',
      'Matthew 27:29',
      'John 19:17; Matthew 16:24',
      'Luke 23:46',
    ],
    reflections: [
      'Jesus, fully God and fully man, felt the full weight of what lay ahead — and He didn\'t pretend otherwise. He brought His anguish to the Father in prayer. In our own moments of dread and sorrow, we are invited to do the same: not to hide our pain, but to surrender it.',
      'Every lash He endured was borne out of love for us. Isaiah saw it centuries before — that through His suffering, our brokenness would find healing. His wounds speak of a mercy that goes to the most painful lengths to reach us.',
      'The soldiers mocked what they could not understand. They crowned Him with thorns, not knowing they were crowning the true King. In every humiliation Jesus accepted, He dignified every person who has ever been ridiculed, dismissed, or made to feel small.',
      'The cross was heavy, the road was long, and yet Jesus walked it. He asks us to follow — not because suffering is good in itself, but because love carries what it must. Every burden we bear with Him draws us closer to His heart.',
      'On the cross, Jesus held nothing back. He gave everything — His body, His breath, His very life — and placed it all in the Father\'s hands. This is the ultimate act of trust: to let go completely, believing that God\'s love is stronger than death.',
    ],
  },
  glorious: {
    title: 'Glorious Mysteries',
    emoji: '👑',
    mysteries: [
      'The Resurrection',
      'The Ascension',
      'The Descent of the Holy Spirit',
      'The Assumption of Mary',
      'The Coronation of Mary',
    ],
    descriptions: [
      'Jesus rises from the dead on the third day.',
      'Jesus ascends into heaven forty days after His Resurrection.',
      'The Holy Spirit descends upon the Apostles at Pentecost.',
      'Mary is taken body and soul into heaven.',
      'Mary is crowned Queen of Heaven and Earth.',
    ],
    bibleVerses: [
      '"Do not be afraid! I know that you are seeking Jesus the crucified. He is not here, for he has been raised just as he said. Come and see the place where he lay."',
      '"As they were looking on, he was lifted up, and a cloud took him from their sight. \'Men of Galilee, why are you standing there looking at the sky? This Jesus who has been taken up from you into heaven will return in the same way.\'"',
      '"And suddenly there came from the sky a noise like a strong driving wind, and it filled the entire house. Then there appeared to them tongues as of fire, which parted and came to rest on each one of them. And they were all filled with the Holy Spirit."',
      '"A great sign appeared in the sky, a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars."',
      '"The queen stands at your right hand, arrayed in gold." — "All generations will call me blessed. The Mighty One has done great things for me, and holy is his name."',
    ],
    bibleRefs: [
      'Matthew 28:5-6',
      'Acts 1:9-11',
      'Acts 2:2-4',
      'Revelation 12:1',
      'Psalm 45:10; Luke 1:48-49',
    ],
    reflections: [
      'The stone was rolled away, the tomb was empty, and death no longer had the final word. The Resurrection is the heart of our faith — the promise that no darkness, no suffering, no grave can hold back the life God has in store for those who trust in Him.',
      'Jesus ascends to the Father, but He does not leave us orphaned. He goes ahead to prepare a place for us. The disciples stood gazing upward, but the angel\'s words gently redirect them — and us — toward the mission He has entrusted to our hands.',
      'The same Spirit that hovered over the waters at creation now fills the hearts of the apostles with fire. Fear gives way to boldness, confusion to clarity. This same Spirit is poured out on us — not as a distant memory, but as a living, present power.',
      'Mary, who bore Christ in her body and pondered Him in her heart all her life, is brought home to heaven — body and soul. Her Assumption is a glimpse of the glory God desires for each of us: to be fully united with Him, nothing left behind.',
      'She who called herself the handmaid of the Lord is now crowned its Queen. Mary\'s glory is not her own — it is the fruit of her faithful "yes" to God. In honoring her, we honor the One who lifts up the lowly and fills the hungry with good things.',
    ],
  },
  luminous: {
    title: 'Luminous Mysteries',
    emoji: '💡',
    mysteries: [
      'The Baptism of Jesus',
      'The Wedding at Cana',
      'The Proclamation of the Kingdom',
      'The Transfiguration',
      'The Institution of the Eucharist',
    ],
    descriptions: [
      'Jesus is baptized in the Jordan River by John the Baptist.',
      'Jesus performs His first miracle at the wedding feast of Cana.',
      'Jesus calls all to conversion and proclaims the Kingdom of God.',
      'Jesus is transfigured on Mount Tabor.',
      'Jesus institutes the Eucharist at the Last Supper.',
    ],
    bibleVerses: [
      '"After Jesus was baptized, he came up from the water and behold, the heavens were opened for him, and he saw the Spirit of God descending like a dove and coming upon him. And a voice came from the heavens, saying, \'This is my beloved Son, with whom I am well pleased.\'"',
      '"His mother said to the servers, \'Do whatever he tells you.\'... Jesus did this as the beginning of his signs at Cana in Galilee, and so revealed his glory, and his disciples began to believe in him."',
      '"This is the time of fulfillment. The kingdom of God is at hand. Repent, and believe in the gospel." — "Blessed are the poor in spirit, for theirs is the kingdom of heaven."',
      '"His face shone like the sun and his clothes became white as light. And behold, a bright cloud cast a shadow over them, then from the cloud came a voice that said, \'This is my beloved Son, with whom I am well pleased; listen to him.\'"',
      '"Then he took the bread, said the blessing, broke it, and gave it to them, saying, \'This is my body, which will be given for you; do this in remembrance of me.\' And likewise the cup after they had eaten, saying, \'This cup is the new covenant in my blood, which will be shed for you.\'"',
    ],
    bibleRefs: [
      'Matthew 3:16-17',
      'John 2:5, 11',
      'Mark 1:15; Matthew 5:3',
      'Matthew 17:2, 5',
      'Luke 22:19-20',
    ],
    reflections: [
      'At the Jordan, heaven opens and the Father speaks. Jesus, who had no need of baptism, steps into our waters to sanctify them. In this moment the Trinity is revealed — Father, Son, and Spirit — and we hear the words God speaks over each of us: "You are my beloved."',
      'Mary notices before anyone else that the wine has run out. She doesn\'t solve it herself — she simply brings it to Jesus and trusts. Her words to the servants are her words to us: "Do whatever He tells you." It is the simplest and most powerful instruction for the spiritual life.',
      'Jesus walks through towns and villages with an urgent, joyful message: God\'s Kingdom is here, and it is for everyone — especially the poor, the meek, the merciful. He invites us not just to hear this message but to become it, letting His reign begin in our own hearts.',
      'For a brief moment on the mountaintop, the disciples see Jesus as He truly is — radiant with divine glory. The vision fades, but the Father\'s command remains: "Listen to Him." In prayer, we too catch glimpses of His glory that sustain us as we walk back down into daily life.',
      'On the night before He dies, Jesus takes bread and wine — the simplest things — and makes them the vessel of His very self. He gives us not just a memory but His real presence, so that every time we receive Him, we are drawn more deeply into the sacrifice of love He offers for the world.',
    ],
  },
};

export function getSuggestedMystery(): string {
  const day = new Date().getDay();
  switch (day) {
    case 0: return 'glorious';
    case 1: return 'joyful';
    case 2: return 'sorrowful';
    case 3: return 'glorious';
    case 4: return 'luminous';
    case 5: return 'sorrowful';
    case 6: return 'joyful';
    default: return 'joyful';
  }
}

export const availableDecadePrayers: string[] = [
  'fatimaPrayer',
  'eternalRest',
  'subTuum',
];

export const availableClosingPrayers: string[] = [
  'hailHolyQueen',
  'rosaryPrayer',
  'stMichaelPrayer',
  'memorare',
  'angelOfGod',
];

export interface RosaryStep {
  id: string;
  prayerId: string;
  title: string;
  subtitle?: string;
  section: 'opening' | 'decade' | 'closing';
  decade?: number;
  beadType?: 'crucifix' | 'our-father' | 'hail-mary' | 'separator' | 'none';
  hailMaryNum?: number;
  hailMaryTotal?: number;
}

export function generateRosarySteps(
  mysteryKey: string,
  decadePrayers: string[],
  closingPrayers: string[]
): RosaryStep[] {
  const mystery = mysteryGroups[mysteryKey];
  const steps: RosaryStep[] = [];
  let stepId = 0;

  const addStep = (
    prayerId: string,
    title: string,
    subtitle: string | undefined,
    section: RosaryStep['section'],
    decade: number | undefined,
    beadType: RosaryStep['beadType'],
    hmNum?: number,
    hmTotal?: number
  ) => {
    steps.push({
      id: `step-${stepId++}`,
      prayerId,
      title,
      subtitle,
      section,
      decade,
      beadType: beadType || 'none',
      hailMaryNum: hmNum,
      hailMaryTotal: hmTotal,
    });
  };

  // Opening
  addStep('signOfCross', 'Sign of the Cross', 'Begin the Rosary', 'opening', undefined, 'crucifix');
  addStep('apostlesCreed', "Apostles' Creed", 'On the Crucifix', 'opening', undefined, 'crucifix');
  addStep('ourFather', 'Our Father', 'First Bead', 'opening', undefined, 'our-father');
  addStep('hailMary', 'Hail Mary', 'For an increase of Faith', 'opening', undefined, 'hail-mary', 1, 3);
  addStep('hailMary', 'Hail Mary', 'For an increase of Hope', 'opening', undefined, 'hail-mary', 2, 3);
  addStep('hailMary', 'Hail Mary', 'For an increase of Charity', 'opening', undefined, 'hail-mary', 3, 3);
  addStep('gloryBe', 'Glory Be', undefined, 'opening', undefined, 'separator');

  // Five Decades
  for (let d = 0; d < 5; d++) {
    const decadeNum = d + 1;
    const mysteryTitle = mystery.mysteries[d];
    const mysteryDesc = mystery.descriptions[d];

    // Announce mystery
    addStep(
      '__mystery__',
      `${getOrdinal(decadeNum)} Mystery`,
      `${mysteryTitle}\n${mysteryDesc}`,
      'decade',
      decadeNum,
      'separator'
    );

    // Our Father
    addStep('ourFather', 'Our Father', `Decade ${decadeNum} — ${mysteryTitle}`, 'decade', decadeNum, 'our-father');

    // 10 Hail Marys
    for (let h = 1; h <= 10; h++) {
      addStep('hailMary', 'Hail Mary', `Decade ${decadeNum} — ${h} of 10`, 'decade', decadeNum, 'hail-mary', h, 10);
    }

    // Glory Be
    addStep('gloryBe', 'Glory Be', `End of Decade ${decadeNum}`, 'decade', decadeNum, 'separator');

    // Decade-end prayers
    for (const dpId of decadePrayers) {
      const dp = prayers[dpId];
      if (dp) {
        addStep(dpId, dp.title, `After Decade ${decadeNum}`, 'decade', decadeNum, 'none');
      }
    }
  }

  // Closing prayers
  for (const cpId of closingPrayers) {
    const cp = prayers[cpId];
    if (cp) {
      addStep(cpId, cp.title, 'Closing Prayer', 'closing', undefined, 'none');
    }
  }

  // Final Sign of the Cross
  addStep('signOfCross', 'Sign of the Cross', 'End of the Rosary', 'closing', undefined, 'crucifix');

  return steps;
}

function getOrdinal(n: number): string {
  const ordinals = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
  return ordinals[n] || `${n}th`;
}
