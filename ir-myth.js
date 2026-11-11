/* Irish Studies - mythology, folklore, festivals and sacred sites (ported from IrishStudies.jsx). */
(function(){const IR=window.IR=window.IR||{};IR.myth=[
  // ---------- Mythological Cycle ----------
  {
    id: 'm-tuatha', cycle: 'Mythological Cycle', title: 'Tuatha Dé Danann', period: 'Mythic age',
    summary: 'The "people of the goddess Danu" — supernatural rulers of Ireland before the Gaels.',
    detail: 'A radiant, magical race who arrived in Ireland in dark clouds (or, in another telling, on great ships they then burned) and ruled the island until the Milesians — the ancestors of the modern Irish — defeated them. By treaty, the Tuatha Dé took the half of Ireland that lay underground: the sídhe, the fairy mounds. Over centuries, in popular belief, they shrank from gods into the Aos Sí, the fairy folk.',
    quiz: [{ q: 'What did the Tuatha Dé Danann become after their defeat?', options: ['Vikings', 'The fairy folk (Aos Sí)', 'Christian saints', 'The Fomorians'], answer: 1 }]
  },
  {
    id: 'm-lugh', cycle: 'Mythological Cycle', title: 'Lugh Lámhfhada', period: 'Mythic age',
    summary: 'God of skill, light, and harvest — "Lugh of the Long Arm" or "of the Long Spear."',
    detail: 'Lugh (LOO) is the master of every craft. When he arrives at the gates of Tara seeking entry, he is refused as a smith because they have one, then as a poet, harper, warrior — until he asks if they have one man who is master of all of these, and they have to admit they do not. He kills his Fomorian grandfather Balor at the Second Battle of Mag Tuired by hurling a sling-stone through Balor’s evil eye. The harvest festival Lughnasadh (1 August) is named for him.',
    quiz: [{ q: 'Who killed Balor at the Second Battle of Mag Tuired?', options: ['The Dagda', 'Lugh', 'Cú Chulainn', 'Manannán'], answer: 1 }]
  },
  {
    id: 'm-dagda', cycle: 'Mythological Cycle', title: 'The Dagda', period: 'Mythic age',
    summary: 'Father-god of the Tuatha Dé — "the good god," meaning good at everything.',
    detail: 'The Dagda (DAG-da) is a vast, earthy, slightly comic figure. He carries a club so large it must be wheeled — one end kills, the other revives. He owns the cauldron Coire Ansic, from which no company ever leaves unfed, and a magical harp, Uaithne, that can play three strains: of grief, of mirth, and of sleep. He is associated with the Hill of Tara and with the great passage tomb of Newgrange (Brú na Bóinne).',
    quiz: [{ q: 'What does the Dagda’s magical cauldron do?', options: ['Foretells the future', 'Never empties of food', 'Boils enemies alive', 'Holds the sea'], answer: 1 }]
  },
  {
    id: 'm-morrigan', cycle: 'Mythological Cycle', title: 'The Morrígan', period: 'Mythic age',
    summary: 'Triple goddess of war, fate, and death — often appearing as a crow.',
    detail: 'The Morrígan (MORE-ee-gan, "phantom queen") is a shapeshifter who chooses who lives and who dies in battle. She often appears as a crow or raven on the battlefield. She is sometimes a single goddess, sometimes a trio of sisters: Morrígan, Badb (the carrion-crow), and Macha (whose curse cripples the men of Ulster in the Táin). She propositions Cú Chulainn before the Táin, and when refused, opposes him in three forms during his greatest fight.',
    quiz: [{ q: 'In what bird-form does the Morrígan often appear?', options: ['Owl', 'Eagle', 'Crow / raven', 'Swan'], answer: 2 }]
  },
  {
    id: 'm-brigid', cycle: 'Mythological Cycle', title: 'Brigid', period: 'Mythic age (and Christian)',
    summary: 'Goddess of poetry, healing, smithcraft, and sacred fire — Christianised as St. Brigid.',
    detail: 'Brigid (BREED) is a triple goddess and one of the most beloved figures in Irish tradition. She is patron of poets, healers, and smiths — the three "high" crafts that involved transformation. Her festival is Imbolc (1 February), the first stirring of spring. The historical St. Brigid of Kildare (5th–6th century) absorbed almost all the goddess’s attributes; her perpetual flame burned at Kildare into the 16th century and was relit in 1993.',
    quiz: [{ q: 'On what date is Brigid’s festival Imbolc?', options: ['1 February', '1 May', '1 August', '1 November'], answer: 0 }]
  },
  {
    id: 'm-manannan', cycle: 'Mythological Cycle', title: 'Manannán mac Lir', period: 'Mythic age',
    summary: 'God of the sea and ruler of the otherworld; gives his name to the Isle of Man.',
    detail: 'Manannán (MAN-an-awn, son of Lir, "son of the sea") is the great sea-god. He owns a ship that sails without sail or oar (Wave-Sweeper), a horse that crosses water as easily as land (Enbarr of the Flowing Mane), and a cloak that can become any colour or render him invisible. He carries the souls of warriors to the otherworld. The Isle of Man is named for him, and a giant statue of him stands at Limavady in Derry.',
    quiz: [{ q: 'Manannán mac Lir is the god of what?', options: ['Forests', 'The sea', 'Fire', 'Battle'], answer: 1 }]
  },
  {
    id: 'm-nuada', cycle: 'Mythological Cycle', title: 'Nuada Airgetlám', period: 'Mythic age',
    summary: '"Nuada of the Silver Arm" — the king who lost his arm and his crown.',
    detail: 'In the First Battle of Mag Tuired, Nuada (NOO-uh-dha) lost his arm to Sreng of the Fir Bolg. By the rule that a king must be physically unblemished, he had to step down. The healer Dian Cécht built him a working silver replacement — hence Airgetlám, "silver-arm." Years later, Dian Cécht’s son Miach made him a fully fleshed arm; jealous Dian Cécht killed his own son in a rage, and from Miach’s grave grew every healing herb that exists.',
    quiz: [{ q: 'Why did Nuada have to give up his throne?', options: ['He was too old', 'He lost an arm in battle', 'He converted to Christianity', 'He went into exile'], answer: 1 }]
  },
  {
    id: 'm-fomorians', cycle: 'Mythological Cycle', title: 'The Fomorians', period: 'Mythic age',
    summary: 'Monstrous adversaries of the Tuatha Dé — chaos-beings of the deep sea.',
    detail: 'The Fomorians (foe-MOR-ee-ans) are misshapen, often one-eyed or one-legged sea-raiders who oppose every wave of settlers in Ireland. Their king is Balor of the Evil Eye, whose single eye, when opened, kills with its gaze. The Tuatha Dé finally break Fomorian power at the Second Battle of Mag Tuired. The Fomorians represent destructive, untameable nature; the Tuatha Dé represent culture and craft.',
    quiz: [{ q: 'Who is the Fomorian king with the killing gaze?', options: ['Bres', 'Balor', 'Indech', 'Tethra'], answer: 1 }]
  },
  {
    id: 'm-magtuired', cycle: 'Mythological Cycle', title: 'The Battles of Mag Tuired', period: 'Mythic age',
    summary: 'Two great battles establish the Tuatha Dé as rulers of Ireland.',
    detail: 'The First Battle of Mag Tuired is fought against the Fir Bolg, the previous inhabitants of Ireland. The Tuatha Dé win but Nuada loses his arm. The Second Battle, far more famous, is fought against the Fomorians and their puppet-king Bres. Lugh leads the Tuatha Dé to victory and slays Balor. The mythical battlefield is identified with Moytirra in Sligo.',
    quiz: [{ q: 'Who do the Tuatha Dé fight at the First Battle of Mag Tuired?', options: ['The Fomorians', 'The Fir Bolg', 'The Milesians', 'The Vikings'], answer: 1 }]
  },
  {
    id: 'm-lir', cycle: 'Mythological Cycle', title: 'The Children of Lir', period: 'Mythic age',
    summary: 'Lir’s four children are turned into swans for 900 years by their jealous stepmother.',
    detail: 'When the sea-lord Lir’s wife dies, he marries her sister Aoife. Eaten by jealousy of his children — Fionnuala, Aodh, Fiachra, and Conn — Aoife transforms them into swans for nine hundred years: three centuries on Lake Derravaragh in Westmeath, three on the cold Sea of Moyle, and three off the wild west coast at Erris. They keep the power of speech and song. They are released only when they hear the bell of the first Christian missionary, and turn at last to ancient mortals who die at peace. Lake Derravaragh sits a short drive from Mullingar.',
    quiz: [{ q: 'Where did the Children of Lir spend their first 300 years?', options: ['Lough Neagh', 'Lake Derravaragh', 'The Sea of Moyle', 'Lough Erne'], answer: 1 }]
  },
  {
    id: 'm-aengus', cycle: 'Mythological Cycle', title: 'Aengus Óg', period: 'Mythic age',
    summary: 'Young god of love, son of the Dagda — his kisses become birds.',
    detail: 'Aengus (ENG-us, "Aengus the Young") is the god of love, youth, and poetic inspiration. The four birds that flutter around his head are his kisses made visible. He falls in love with a woman, Caer, whom he sees only in a dream; he searches for a year, finds her among 150 women chained in pairs at a lake, and chooses her by recognition. She turns into a swan; he becomes one too, and they fly together. His home is Brú na Bóinne — Newgrange.',
    quiz: [{ q: 'What are the birds around Aengus Óg’s head?', options: ['His soul', 'His kisses', 'Messengers from the Dagda', 'Druid spirits'], answer: 1 }]
  },
  {
    id: 'm-boann', cycle: 'Mythological Cycle', title: 'Boann', period: 'Mythic age',
    summary: 'Goddess of the River Boyne; her name means "white cow."',
    detail: 'Boann (BOH-an) is the goddess after whom the River Boyne is named. In one telling, she walked widdershins (counterclockwise, against the sun) around a forbidden well of wisdom belonging to her husband Nechtan; the waters surged up and pursued her to the sea, becoming the river. In another, she is the mother of Aengus Óg by the Dagda, by way of a magical day in which the sun stood still. The whole Boyne valley — Newgrange, Knowth, Dowth — is her sacred landscape.',
    quiz: [{ q: 'What does the name "Boann" mean?', options: ['Battle queen', 'White cow', 'Dark river', 'Fair lady'], answer: 1 }]
  },
  // ---------- Ulster Cycle ----------
  {
    id: 'm-cuchulainn', cycle: 'Ulster Cycle', title: 'Cú Chulainn', period: 'Heroic age',
    summary: 'The "Hound of Culann" — Ireland’s greatest warrior, who dies at 27 strapped to a standing stone.',
    detail: 'Born Sétanta, the boy kills the smith Culann’s ferocious guard-dog with a hurling ball (sliotar) and offers to take its place — earning the name Cú Chulainn (KOO HULL-in). Trained in arms by the warrior-woman Scáthach in Scotland, he wields the terrible Gáe Bulg (a barbed spear that opens thirty wounds). In battle frenzy, his "ríastrad" or warp-spasm, he physically twists out of human shape. Knowing he will die young, he dies young — strapped upright to a standing stone so his enemies will not see him fall, his shoulder lit by a raven settling on him.',
    quiz: [{ q: 'What was Cú Chulainn’s birth name?', options: ['Cuán', 'Sétanta', 'Naoise', 'Conchobar'], answer: 1 }, { q: 'How does Cú Chulainn die?', options: ['Drowned', 'Strapped to a standing stone', 'In his sleep', 'Old age'], answer: 1 }]
  },
  {
    id: 'm-tain', cycle: 'Ulster Cycle', title: 'Táin Bó Cúailnge', period: 'Heroic age',
    summary: 'The "Cattle Raid of Cooley" — Ireland’s national epic.',
    detail: 'Queen Medb of Connacht, in pillow-talk with her husband Ailill, learns he owns one prized bull more than she does. She invades Ulster to steal the great brown bull, the Donn Cuailnge. The men of Ulster lie helpless under Macha’s curse — birth-pangs that strike them at moments of need. Only seventeen-year-old Cú Chulainn, immune to the curse, defends the province at the fords, fighting champion after champion in single combat. The two great bulls finally fight each other and both die. The Táin survives in early medieval manuscripts and is the closest Irish equivalent to the Iliad.',
    quiz: [{ q: 'Who invades Ulster in the Táin?', options: ['Queen Medb of Connacht', 'King Conchobar', 'The Fomorians', 'Lugh'], answer: 0 }]
  },
  {
    id: 'm-medb', cycle: 'Ulster Cycle', title: 'Queen Medb', period: 'Heroic age',
    summary: 'Warrior-queen of Connacht — proud, sovereign, and dangerous.',
    detail: 'Medb (MAYV) of Connacht is one of the most striking figures in Irish literature: she rides her own chariot, takes her own lovers, fights her own battles, and refuses to be lesser than her husband Ailill in any respect. Her name is cognate with "mead" and may originally have been the goddess of sovereignty whom kings symbolically married. She is buried, by tradition, standing upright in armour facing her enemies in Ulster, beneath the great cairn at Knocknarea in Sligo.',
    quiz: [{ q: 'In what county is Queen Medb said to be buried?', options: ['Sligo', 'Mayo', 'Galway', 'Kerry'], answer: 0 }]
  },
  {
    id: 'm-deirdre', cycle: 'Ulster Cycle', title: 'Deirdre of the Sorrows', period: 'Heroic age',
    summary: 'Prophesied to bring tragedy; she elopes with Naoise and dies of grief.',
    detail: 'At Deirdre’s birth, the druid Cathbad foretells her beauty will bring ruin. King Conchobar locks her away to marry her himself when she is grown. She instead falls for Naoise, one of the three Sons of Uisneach, and they flee to Scotland. Conchobar lures them back with promises of safety and has Naoise killed. Deirdre lives a year in misery and then takes her own life — in some versions by dashing her head against a stone as she is being driven away. The story is the great Irish tragedy of love and treachery.',
    quiz: [{ q: 'Who does Deirdre run away with?', options: ['Conchobar', 'Naoise', 'Cú Chulainn', 'Fergus'], answer: 1 }]
  },
  {
    id: 'm-conchobar', cycle: 'Ulster Cycle', title: 'Conchobar mac Nessa', period: 'Heroic age',
    summary: 'King of Ulster, ruler at Emain Macha — proud and ultimately tragic.',
    detail: 'Conchobar (CON-uh-khor) reigns at Emain Macha (Navan Fort, near Armagh). His Red Branch warriors include Cú Chulainn, Fergus mac Róich, and Conall Cernach. His treachery toward the Sons of Uisneach over Deirdre causes Fergus and others to defect to Connacht, weakening Ulster on the eve of the Táin. He dies, in one tradition, when a brain-ball — a hardened battle-trophy made from an enemy’s brain — embedded in his skull bursts forth on hearing of Christ’s crucifixion.',
    quiz: [{ q: 'Where is Conchobar’s royal seat?', options: ['Tara', 'Cashel', 'Emain Macha', 'Cruachan'], answer: 2 }]
  },
  {
    id: 'm-fergus', cycle: 'Ulster Cycle', title: 'Fergus mac Róich', period: 'Heroic age',
    summary: 'Former king of Ulster; massive, generous, complicated — Cú Chulainn’s foster-father.',
    detail: 'Fergus once ruled Ulster but was tricked out of his throne by Ness, who made him give it to her son Conchobar for "a year" that became forever. After Conchobar’s treachery to the Sons of Uisneach, Fergus exiles himself to Connacht and rides at Medb’s side in the Táin. He is the largest man of his age — said to need seven women to satisfy him — and eventually dies when Ailill, jealous of Medb taking him as a lover, has him killed while swimming.',
    quiz: [{ q: 'To what province does Fergus exile himself?', options: ['Munster', 'Leinster', 'Connacht', 'Meath'], answer: 2 }]
  },
  {
    id: 'm-emain', cycle: 'Ulster Cycle', title: 'Emain Macha', period: 'Heroic age',
    summary: 'The royal site of Ulster — a great earthwork still visible today.',
    detail: 'Emain Macha (Navan Fort, near Armagh city) was the seat of the kings of Ulster in the heroic age. The great mound preserves the foundations of an enormous timber roundhouse — perhaps a ritual building rather than a palace — built around 95 BC, deliberately filled with stones and burned. The name comes from Macha, the goddess who, made to race the king’s horses while pregnant, won, gave birth on the finish line, and cursed the men of Ulster.',
    quiz: [{ q: 'Near which modern city is Emain Macha?', options: ['Belfast', 'Derry', 'Armagh', 'Newry'], answer: 2 }]
  },
  // ---------- Fenian Cycle ----------
  {
    id: 'm-fionn', cycle: 'Fenian Cycle', title: 'Fionn mac Cumhaill', period: 'Heroic age',
    summary: 'Leader of the Fianna — warrior, hunter, poet, and giant of folk memory.',
    detail: 'Fionn (FYUN) is raised in secret by two warrior-women after his father’s death. As a boy named Demne, he is apprenticed to the poet Finnegas, who has been trying for seven years to catch the Salmon of Knowledge. When Finnegas finally lands the salmon, he sets the boy to cook it, warning him not to taste it. Fionn burns his thumb on the cooking flesh, sucks it, and gains all knowledge of the world. From then on, when he sucks his thumb, he can know anything. He grows into the chieftain of the Fianna.',
    quiz: [{ q: 'How does Fionn get his wisdom?', options: ['By drinking from a sacred well', 'By burning his thumb on the Salmon of Knowledge', 'By eating hazelnuts', 'By dreaming with the druids'], answer: 1 }]
  },
  {
    id: 'm-fianna', cycle: 'Fenian Cycle', title: 'The Fianna', period: 'Heroic age',
    summary: 'A warrior-band who hunt, fight, and protect Ireland under Fionn.',
    detail: 'The Fianna are an elite, semi-independent warrior society, half soldiers and half hunters, living in forest and field. To join, a candidate had to leap a stick at the height of his brow, run through a wood without breaking a twig, and recite the twelve books of poetry. They serve the High King — but warily — and represent a Gaelic ideal of the warrior as poet, hunter, and free man. The 19th-century Fenian movement took its name from them.',
    quiz: [{ q: 'What modern movement took its name from the Fianna?', options: ['Sinn Féin', 'The Fenians', 'The Land League', 'The Volunteers'], answer: 1 }]
  },
  {
    id: 'm-salmon', cycle: 'Fenian Cycle', title: 'The Salmon of Knowledge', period: 'Heroic age',
    summary: 'A salmon that has eaten nine hazelnuts of wisdom from the sacred pool.',
    detail: 'Nine hazel trees of wisdom grow around a sacred pool (Linn Féic on the Boyne, in some tellings). Their nuts drop into the water, and a single salmon eats them all, becoming the wisest creature alive. Whoever eats its flesh inherits all knowledge. Finnegas almost catches him for years. When he finally does — and Fionn cooks it and burns his thumb — the wisdom is transferred. The hazel and the salmon become Irish symbols of poetry and learning.',
    quiz: [{ q: 'How does the salmon become wise?', options: ['By eating an apple', 'By eating nine hazelnuts of wisdom', 'By swimming around Ireland nine times', 'By being blessed by the Dagda'], answer: 1 }]
  },
  {
    id: 'm-diarmuid', cycle: 'Fenian Cycle', title: 'Diarmuid and Gráinne', period: 'Heroic age',
    summary: 'Gráinne is betrothed to Fionn but flees with the young Diarmuid.',
    detail: 'Gráinne, daughter of the High King, is promised to the aging Fionn. At her own betrothal feast she sees the handsome Diarmuid — who bears a love-spot from a fairy woman that makes him irresistible — and places him under a geis (binding magical obligation) to take her away. They flee, pursued across Ireland for seven years. The many "Diarmuid and Gráinne’s beds" — actually neolithic dolmens — mark places they slept. He is killed at last by a magical boar on Ben Bulben in Sligo.',
    quiz: [{ q: 'On what mountain is Diarmuid killed?', options: ['Croagh Patrick', 'Slieve League', 'Ben Bulben', 'Carrauntoohil'], answer: 2 }]
  },
  {
    id: 'm-oisin', cycle: 'Fenian Cycle', title: 'Oisín in Tír na nÓg', period: 'Heroic age',
    summary: 'Fionn’s son rides to the Land of Youth with Niamh; returns 300 years later and turns to dust.',
    detail: 'Oisín (USH-een or OH-sheen, "little deer"), Fionn’s poet-warrior son, falls in love with Niamh of the Golden Hair, daughter of the king of Tír na nÓg. They ride together over the western waves to the Land of Youth, where no one ages or sickens. After what feels like three years, Oisín feels homesick. Niamh gives him a magical horse and warns him: do not touch Irish soil. Returning, he finds the Fianna long dead, Christianity spread. Helping a man lift a stone, his saddle slips; he touches the earth and ages 300 years in an instant. He dies after telling his stories to St. Patrick.',
    quiz: [{ q: 'Why must Oisín not touch Irish soil?', options: ['He’ll be cursed', 'He’ll age 300 years instantly', 'He’ll be invisible', 'He’ll forget Niamh'], answer: 1 }]
  },
  // ---------- Kings' Cycle ----------
  {
    id: 'm-cormac', cycle: 'Kings’ Cycle', title: 'Cormac mac Airt', period: 'Mytho-historical',
    summary: 'Wise High King at Tara — Ireland’s King Solomon.',
    detail: 'Cormac mac Airt is the model of the just king: under his rule, the seasons are right, the harvests good, and Ireland prospers. He is famous for the wisdom of his judgments, collected in the Instructions of Cormac, advice given to his son. He receives a magical cup that breaks at falsehood and mends at truth. He dies, in one tradition, by a salmon bone in his throat — having converted in his last years from druidic religion to belief in a single creator-god, before Patrick.',
    quiz: [{ q: 'What was Cormac mac Airt famous for?', options: ['Conquering Britain', 'His just judgments and wisdom', 'Founding Dublin', 'Killing Balor'], answer: 1 }]
  },
  {
    id: 'm-conn', cycle: 'Kings’ Cycle', title: 'Conn of the Hundred Battles', period: 'Mytho-historical',
    summary: '2nd-century High King whose dynasty rules for centuries.',
    detail: 'Conn Cétchathach ("of the hundred battles") is the legendary ancestor of the Connachta and the Uí Néill, the dynasty that would dominate Ireland for many centuries. In the famous tale "The Phantom’s Frenzy" (Baile in Scáil), he and his druids enter a fairy mist and meet Lug seated on a throne with the goddess of Sovereignty, who hands a cup of red ale to each of his royal descendants — a vision of his entire lineage.',
    quiz: [{ q: 'What does "Cétchathach" mean?', options: ['Of the silver arm', 'Of the hundred battles', 'The wise', 'The just'], answer: 1 }]
  },
  // ---------- Folklore creatures ----------
  {
    id: 'm-banshee', cycle: 'Folklore', title: 'The Banshee (bean sídhe)', period: 'Folklore',
    summary: '"Fairy woman" whose wail (caoineadh) foretells a death.',
    detail: 'The bean sídhe (BAN-shee, "woman of the fairy mound") is attached to specific old Irish families — those whose names began with O’ or Mac, in the older lore. Her cry, the keen, is heard at night: a high, wailing lament. She is sometimes glimpsed combing her long hair by a stream. She does not cause death — she announces it, weeping for the family even before they know to weep. To find her comb on the ground and pick it up is fatal: never pocket what a banshee has dropped.',
    quiz: [{ q: 'What does the banshee’s cry foretell?', options: ['A wedding', 'A death', 'A storm', 'A birth'], answer: 1 }]
  },
  {
    id: 'm-leprechaun', cycle: 'Folklore', title: 'The Leprechaun', period: 'Folklore',
    summary: 'Solitary fairy shoemaker — small, cranky, and richer than he looks.',
    detail: 'The leipreachán (lep-reh-KAWN), possibly from Old Irish luchorpán ("small body"), is a solitary fairy: an old man in green or red, mending shoes with the tap-tap-tap of a tiny hammer. Catch him and he must lead you to his pot of gold — but he is a master trickster, and getting a leprechaun’s gold without him distracting your gaze is harder than it sounds. The cheerful tourist-shop leprechaun is a recent invention; the older leprechaun is grumpier, slier, and not really your friend.',
    quiz: [{ q: 'What is the leprechaun’s traditional craft?', options: ['Smithing', 'Shoemaking', 'Weaving', 'Brewing'], answer: 1 }]
  },
  {
    id: 'm-puca', cycle: 'Folklore', title: 'The Púca', period: 'Folklore',
    summary: 'Shapeshifting spirit — most often a black horse with golden eyes.',
    detail: 'The púca (POO-ka) appears as a black horse, goat, hare, or bull, sometimes a man with animal features. He can be helpful or malicious. The most dangerous time is Samhain night (Halloween): blackberries left on the bramble after Samhain are said to be "the púca’s," and eating them brings bad luck. In some traditions, anyone bold or foolish enough to climb on the púca’s back is taken on a wild ride across the country before being thrown off, dazed, near home.',
    quiz: [{ q: 'When is the púca traditionally most active?', options: ['Imbolc', 'Bealtaine', 'Lughnasadh', 'Samhain'], answer: 3 }]
  },
  {
    id: 'm-dullahan', cycle: 'Folklore', title: 'The Dullahan', period: 'Folklore',
    summary: 'Headless rider who calls out a name — and that person dies.',
    detail: 'The dullahan (DOOL-a-han) is a headless horseman or coachman, riding a black horse (or driving a black coach drawn by six). He carries his own head under one arm — its eyes dart constantly in every direction, and its skin has the texture of mouldering cheese. He uses a human spine as a whip. When he stops, he calls a name, and the person named dies. The only thing that turns him aside is gold, even a tiny piece.',
    quiz: [{ q: 'What can ward off the Dullahan?', options: ['Salt', 'Iron', 'Gold', 'Holy water'], answer: 2 }]
  },
  {
    id: 'm-changeling', cycle: 'Folklore', title: 'The Changeling', period: 'Folklore',
    summary: 'A fairy substitute left in place of a stolen human child.',
    detail: 'A changeling is a fairy — sometimes an old fairy, sometimes a stock of carved wood enchanted to look alive — left behind when the Aos Sí steal a healthy human baby. The "wrong" baby is fretful, withered, never grows. Many of the cruel "tests" used to drive a changeling out (placing on a hot shovel, leaving on a midden) reflect, in retrospect, the tragedies of disabled or ill children in pre-modern Ireland. The folklore is haunting and sad.',
    quiz: [{ q: 'What is a changeling?', options: ['A shapeshifting hero', 'A fairy left in place of a stolen child', 'A type of púca', 'A child who can speak to fairies'], answer: 1 }]
  },
  {
    id: 'm-aossi', cycle: 'Folklore', title: 'The Aos Sí', period: 'Folklore',
    summary: '"The people of the mounds" — the fairy folk, descendants of the Tuatha Dé.',
    detail: 'The Aos Sí (ESS SHEE, also "Sídhe") live in fairy mounds, which are often the great prehistoric tumuli of Ireland (Newgrange, Knowth, the cairns of Loughcrew). They are not "fairies" in the Tinkerbell sense — they are tall, beautiful, dangerous, and easily offended. The polite name is "the Good People" or "the Gentry," because saying their true name draws their attention. You do not cut a fairy thorn (a lone hawthorn tree) — even today, road builders in Ireland sometimes still divert around them.',
    quiz: [{ q: 'Why are the Aos Sí called "the Good People"?', options: ['They are kind', 'They guard farmers', 'It is safer not to say their real name', 'They are Christian saints'], answer: 2 }]
  },
  {
    id: 'm-merrow', cycle: 'Folklore', title: 'The Merrow', period: 'Folklore',
    summary: 'Irish merfolk — beautiful females, grotesque males.',
    detail: 'Merrows (from Irish murúch) live beneath the sea. Female merrows are described as beautiful, with green-tinted hair; they sometimes come ashore and marry mortal men, hiding their cohuleen druith (a magical red cap) that lets them return to the sea. Find and burn the cap, and your wife stays — though she will pine. Male merrows, by contrast, are described as green-skinned, pig-eyed, and amorous; sea-fearing fishermen tell tales of having to escape their hospitality.',
    quiz: [{ q: 'What magical item does a merrow need to return to the sea?', options: ['A green cloak', 'A red cap (cohuleen druith)', 'A silver comb', 'A pearl'], answer: 1 }]
  },
  {
    id: 'm-selkie', cycle: 'Folklore', title: 'The Selkie', period: 'Folklore',
    summary: 'Seal-folk who shed their skins to become human on land.',
    detail: 'Stronger in Scottish, Orcadian, and Donegal lore than further south, the selkie is a seal at sea and a beautiful human on land, transforming by removing or donning her skin. A man who steals and hides a selkie woman’s skin can keep her as a wife — and she will bear him children, and seem content — but if she ever finds her skin again, she will return to the sea without looking back. The selkie story is one of the saddest in northern folklore.',
    quiz: [{ q: 'What does a selkie shed to become human?', options: ['Feathers', 'A seal skin', 'A green cloak', 'A scaled tail'], answer: 1 }]
  },
  // ---------- Festivals ----------
  {
    id: 'm-samhain', cycle: 'Festivals', title: 'Samhain', period: '31 October – 1 November',
    summary: 'End of harvest, beginning of winter — and the night the veil between worlds is thinnest.',
    detail: 'Samhain (SOW-in, "summer’s end") marked the start of the Celtic year. Cattle were brought down from summer pastures and slaughtered for winter; the dead and the Aos Sí walked freely among the living. Bonfires were lit on hilltops, and people wore costumes (perhaps to disguise themselves from spirits or imitate them). When Irish emigrants brought Samhain to America, it became Halloween — pumpkins replacing the older Irish carved turnips.',
    quiz: [{ q: 'What modern festival comes from Samhain?', options: ['Easter', 'May Day', 'Halloween', 'Christmas'], answer: 2 }]
  },
  {
    id: 'm-imbolc', cycle: 'Festivals', title: 'Imbolc', period: '1 February',
    summary: 'Brigid’s day — the first stirring of spring, lambing season, milk and fire.',
    detail: 'Imbolc (IM-olk, possibly "in the belly," referring to pregnant ewes) marks the moment winter begins to ease. It is sacred to Brigid, both goddess and saint. Traditionally, a Brídeog (a doll representing Brigid) was carried from house to house, and a Brigid’s Cross — a four-armed cross woven from rushes — was made and hung over the door for protection through the year ahead. Many Irish kitchens still have one.',
    quiz: [{ q: 'What is woven from rushes for Imbolc?', options: ['A Brigid’s cross', 'A May bush', 'A corn dolly', 'A samhain mask'], answer: 0 }]
  },
  {
    id: 'm-bealtaine', cycle: 'Festivals', title: 'Bealtaine', period: '1 May',
    summary: 'Beginning of summer — bonfires lit, cattle driven between them for protection.',
    detail: 'Bealtaine (BAL-tin-uh, "bright fire") is the great fire-festival of summer. All household fires were extinguished and relit from a sacred bonfire — anciently lit at Uisneach in the centre of Ireland. Cattle were driven between two fires to protect them from disease for the coming season. Yellow flowers — primrose, gorse, marsh marigold — were scattered on doorsteps. The May Bush, a small tree decorated with ribbons and shells, stood outside the house.',
    quiz: [{ q: 'What were cattle driven between at Bealtaine?', options: ['Two streams', 'Two fires', 'Two thorn trees', 'Two stone walls'], answer: 1 }]
  },
  {
    id: 'm-lughnasadh', cycle: 'Festivals', title: 'Lughnasadh', period: '1 August',
    summary: 'Lugh’s harvest festival — fairs, hill-climbs, and the first sheaf of corn.',
    detail: 'Lughnasadh (LOO-na-sa) marked the beginning of harvest. According to legend, Lugh established it as funeral games for his foster-mother Tailtiu. Great fairs (the Aonach Tailteann at Teltown was one) combined athletic contests, marriages, trade, and lawmaking. The tradition of climbing high places — Croagh Patrick is climbed by tens of thousands on the last Sunday of July, "Reek Sunday" — preserves the old festival hill-climb in Christian dress.',
    quiz: [{ q: 'Lughnasadh is named after which god?', options: ['The Dagda', 'Lugh', 'Manannán', 'Aengus'], answer: 1 }]
  },
  // ---------- Sacred places ----------
  {
    id: 'm-tirnanog', cycle: 'Otherworld', title: 'Tír na nÓg', period: 'Otherworld',
    summary: '"The Land of Youth" — the otherworld where no one ages.',
    detail: 'Tír na nÓg (TEER-na-NOAG, "land of the young") lies across the western sea or beneath the waters of certain lakes. There is no sickness, no aging, no winter; music and feasting are endless; the mind never grows weary. Mortals occasionally visit — Oisín most famously — but rarely return to live among the living again. It is one Irish name among several for the Otherworld; others include Mag Mell ("plain of delight") and Tír Tairngire ("land of promise").',
    quiz: [{ q: 'What does "Tír na nÓg" mean?', options: ['Land of the brave', 'Land of the dead', 'Land of the young', 'Land of the gods'], answer: 2 }]
  },
  {
    id: 'm-newgrange', cycle: 'Sacred Sites', title: 'Newgrange (Brú na Bóinne)', period: 'c. 3200 BC',
    summary: '5,200-year-old passage tomb — older than the Pyramids, aligned with the winter solstice.',
    detail: 'Newgrange is a vast neolithic passage tomb in County Meath. On the morning of the winter solstice — and a few days either side — a narrow shaft of sunlight enters through the "roof box" above the entrance and slowly travels along the 19-metre passage to illuminate the inner chamber. Built around 3200 BC, it predates the Egyptian Pyramids by 600 years and Stonehenge by 1,000. In myth, it is the home of the Dagda and his son Aengus Óg.',
    quiz: [{ q: 'What event illuminates the inner chamber of Newgrange?', options: ['Spring equinox sunrise', 'Winter solstice sunrise', 'Summer solstice sunset', 'Lughnasadh sunrise'], answer: 1 }]
  },
  {
    id: 'm-tara', cycle: 'Sacred Sites', title: 'The Hill of Tara', period: 'Bronze Age onwards',
    summary: 'Sacred seat of the High Kings, where the Stone of Destiny once roared.',
    detail: 'Tara (Teamhair na Rí) in County Meath is a low ridge whose summit is crowded with earthworks accumulated over millennia: a passage tomb (the Mound of the Hostages), banqueting halls, ring-forts, and standing stones. The Lia Fáil — the Stone of Destiny — was said to roar with joy when the rightful king of Ireland touched it. Tara was less a place of permanent rule than a place of inauguration: where kings became kings.',
    quiz: [{ q: 'What was the Lia Fáil?', options: ['A holy well', 'A standing stone that roared for the rightful king', 'A bell of St. Patrick', 'A magical sword'], answer: 1 }]
  },
  {
    id: 'm-causeway', cycle: 'Sacred Sites', title: 'The Giant’s Causeway', period: 'Geological & legendary',
    summary: 'Hexagonal basalt columns — geology of volcanism, legend of Fionn.',
    detail: 'Around 60 million years ago, lava cooling slowly cracked into around 40,000 hexagonal columns at what is now the north Antrim coast. Legend says Fionn mac Cumhaill built the Causeway as stepping stones to fight the Scottish giant Benandonner — but seeing how huge Benandonner was, Fionn fled home, and his wife disguised him as a baby in the cradle. Benandonner, looking at this enormous "baby" and imagining the father, ran back to Scotland, ripping up the causeway as he went.',
    quiz: [{ q: 'How does Fionn’s wife trick Benandonner?', options: ['Disguises Fionn as a tree', 'Disguises Fionn as a baby', 'Hides Fionn underwater', 'Pretends Fionn is dead'], answer: 1 }]
  },
  // ---------- Saints & symbols ----------
  {
    id: 'm-stbrigid', cycle: 'Saints & Symbols', title: 'St. Brigid of Kildare', period: '5th–6th century',
    summary: 'Co-patron of Ireland — Christian saint who absorbs much of the goddess Brigid.',
    detail: 'Brigid (Brigit, Bríd) of Kildare founded one of Ireland’s greatest early monasteries — and unusually, a double monastery for both monks and nuns. Many of her miracles concern milk, fire, and care for the poor; she is famously generous to a fault. Her feast (1 February) coincides with the older festival of Imbolc. The Brigid’s Cross woven from rushes is hung in Irish homes for protection. Since 2023, her feast day is a public holiday in the Republic.',
    quiz: [{ q: 'Where did St. Brigid found her monastery?', options: ['Armagh', 'Kildare', 'Glendalough', 'Clonmacnoise'], answer: 1 }]
  },
  {
    id: 'm-stpatrick', cycle: 'Saints & Symbols', title: 'St. Patrick & the Snakes', period: '5th century',
    summary: 'Patron saint who, legend says, drove the snakes out — though Ireland never had any.',
    detail: 'Ireland, separated from Britain after the last ice age before snakes recolonised, has no native serpents — so the famous miracle is symbolic. The "snakes" are usually understood as the druids and pagan religion that Patrick’s Christianity displaced. He is also said to have used the three-leafed shamrock to explain the Trinity to the High King Laoghaire at Tara. His own writings — the Confessio and Letter to Coroticus — are among the earliest surviving Irish texts, and movingly personal.',
    quiz: [{ q: 'What plant did Patrick use to explain the Trinity?', options: ['Oak leaf', 'Shamrock', 'Holly', 'Yew'], answer: 1 }]
  },
  {
    id: 'm-triskele', cycle: 'Saints & Symbols', title: 'The Triskele', period: 'Neolithic onwards',
    summary: 'Triple spiral carved at Newgrange — possibly Ireland’s oldest symbol.',
    detail: 'The triskele or triple spiral is carved on the entrance stone at Newgrange and on stones inside the chamber, made some 5,000 years ago. Its meaning is unknown, but later Celtic and Christian uses suggest themes of three: maiden-mother-crone, life-death-rebirth, sea-land-sky, or in Christian use, the Trinity. The same triple-spiral logic appears in the triskelion, the three-legged emblem of the Isle of Man, and indirectly in the four-armed Brigid’s cross.',
    quiz: [{ q: 'Where is the most famous ancient triskele carved?', options: ['Hill of Tara', 'Newgrange entrance stone', 'Rock of Cashel', 'Skellig Michael'], answer: 1 }]
  }
];})();
