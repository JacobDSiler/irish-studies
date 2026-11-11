/* Irish Studies - Gaeilge (the Irish language) units.
 * Item = [Irish, English, pronunciation guide, emoji, note]. In the guide, CAPITALS = the stressed part; kh = the throaty "ch" of "loch".
 * Guides are approximate (Irish has Ulster, Connacht and Munster dialects) - an Irish voice, if the device has one, is better still. */
(function () {
  'use strict';
  const IR = window.IR;
  const items = rows => rows.map(r => ({ ga: r[0], en: r[1], say: r[2] || '', e: r[3] || '', note: r[4] || '' }));
  const V = (id, title, ga, emoji, min, intro, rows) => IR.addUnit({ id, mod: 'gaeilge', kind: 'vocab', title, ga, emoji, min, intro, items: items(rows) });

  V('g-greet', 'Hello & Manners', 'Beannachtaí', '👋', 0, 'The first words to learn. “Dia duit” literally means “God to you”, and the polite reply is “Dia is Muire duit” (“God and Mary to you”).', [
    ['Dia duit', 'Hello', 'DEE-ah gwit', '👋'],
    ['Dia is Muire duit', 'Hello (the reply)', 'DEE-ah iss MWIR-eh gwit', '🤝'],
    ['Maidin mhaith', 'Good morning', 'MAH-jin wah', '🌅'],
    ['Tráthnóna maith', 'Good afternoon / evening', 'TRAW-noh-na mah', '🌇'],
    ['Oíche mhaith', 'Good night', 'EE-heh wah', '🌙'],
    ['Conas atá tú?', 'How are you?', 'KUN-us a-TAW too', '🙂'],
    ['Tá mé go maith', 'I am well', 'taw may guh mah', '😊'],
    ['Go raibh maith agat', 'Thank you', 'guh rev mah AH-gut', '🙏'],
    ['Le do thoil', 'Please', 'leh duh hull', '🤲'],
    ['Slán', 'Goodbye', 'slawn', '🖐️'],
    ['Fáilte', 'Welcome', 'FAWL-cheh', '🤗'],
    ['Gabh mo leithscéal', 'Excuse me / sorry', 'gow muh LESH-skale', '🙋'],
    ['Cad is ainm duit?', 'What is your name?', 'kod iss AN-im gwit', '❓'],
    ['Is mise ...', 'I am ... (my name is)', 'iss MISH-eh', '🧒', 'Put your name on the end: Is mise Máire.'],
    ['Sláinte!', 'Cheers! Good health!', 'SLAWN-cheh', '🥂'],
    ['Céad míle fáilte', 'A hundred thousand welcomes', 'kayd MEE-leh FAWL-cheh', '💯']
  ]);

  V('g-num1', 'Numbers 1–10', 'Uimhreacha 1–10', '🔢', 0, 'These are the counting numbers, said when you count out loud. (When you count real things, they change a little.)', [
    ['a haon', 'one', 'uh HAYN', '1️⃣'], ['a dó', 'two', 'uh DOH', '2️⃣'], ['a trí', 'three', 'uh TREE', '3️⃣'], ['a ceathair', 'four', 'uh KAH-hir', '4️⃣'], ['a cúig', 'five', 'uh KOO-ig', '5️⃣'],
    ['a sé', 'six', 'uh SHAY', '6️⃣'], ['a seacht', 'seven', 'uh SHAKHT', '7️⃣'], ['a hocht', 'eight', 'uh HUKHT', '8️⃣'], ['a naoi', 'nine', 'uh NWEE', '9️⃣'], ['a deich', 'ten', 'uh DEH', '🔟']
  ]);

  V('g-num2', 'Numbers 11–20', 'Uimhreacha 11–20', '🔢', 1, 'Add “déag” (ten) to get the teens. Twenty is “fiche”, and one hundred is “céad”.', [
    ['a haon déag', 'eleven', 'uh hayn JAYG'], ['a dó dhéag', 'twelve', 'uh doh YAYG'], ['a trí déag', 'thirteen', 'uh tree JAYG'], ['a ceathair déag', 'fourteen', 'uh KAH-hir JAYG'], ['a cúig déag', 'fifteen', 'uh KOO-ig JAYG'],
    ['a sé déag', 'sixteen', 'uh shay JAYG'], ['a seacht déag', 'seventeen', 'uh shakht JAYG'], ['a hocht déag', 'eighteen', 'uh hukht JAYG'], ['a naoi déag', 'nineteen', 'uh nwee JAYG'], ['fiche', 'twenty', 'FIH-heh', '2️⃣'], ['céad', 'one hundred', 'kayd', '💯']
  ]);

  V('g-col', 'Colours', 'Dathanna', '🎨', 0, 'Colours in Irish. “Glas” is green, but it is also used for the grey-green of grass, and “liath” is grey.', [
    ['dearg', 'red', 'DYAR-ug', '🔴'], ['gorm', 'blue', 'GOR-um', '🔵'], ['glas', 'green', 'glass', '🟢'], ['buí', 'yellow', 'bwee', '🟡'], ['bán', 'white', 'bawn', '⚪'], ['dubh', 'black', 'duv', '⚫'],
    ['oráiste', 'orange', 'OR-aw-shteh', '🟠'], ['bándearg', 'pink', 'BAWN-dyar-ug', '🩷'], ['donn', 'brown', 'dun', '🟤'], ['liath', 'grey', 'LEE-ah', '🩶'], ['corcra', 'purple', 'KOR-kra', '🟣']
  ]);

  V('g-fam', 'My Family', 'An Teaghlach', '👨‍👩‍👧‍👦', 0, 'Mam and Dad are “Mamaí” and “Daidí”. Many families say “Mam” and “Daid” too.', [
    ['máthair', 'mother', 'MAW-hir', '👩'], ['athair', 'father', 'AH-hir', '👨'], ['mamaí', 'mammy', 'mam-EE', '👩'], ['daidí', 'daddy', 'DAD-ee', '👨'], ['deirfiúr', 'sister', 'DER-uh-fyoor', '👧'], ['deartháir', 'brother', 'DAR-hawr', '👦'],
    ['seanmháthair', 'grandmother', 'shan-WAW-hir', '👵'], ['seanathair', 'grandfather', 'shan-AH-hir', '👴'], ['leanbh', 'baby', 'LAN-uv', '👶'], ['buachaill', 'boy', 'BOO-ah-khil', '🧒'], ['cailín', 'girl', 'KAL-een', '🙋‍♀️'],
    ['cara', 'friend', 'KAR-a', '🧑‍🤝‍🧑'], ['teaghlach', 'family', 'TYAW-lukh', '👨‍👩‍👧‍👦'], ['aintín', 'aunt', 'an-TEEN', '👩‍🦰'], ['uncail', 'uncle', 'UN-kil', '👨‍🦰']
  ]);

  V('g-ani', 'Animals', 'Ainmhithe', '🐑', 0, 'Animals of the farm, the wood and the shore. The little wren, “dreoilín”, is a special bird in Irish tradition.', [
    ['madra', 'dog', 'MAD-ra', '🐕'], ['cat', 'cat', 'kat', '🐈'], ['capall', 'horse', 'KAP-ul', '🐴'], ['bó', 'cow', 'boh', '🐄'], ['caora', 'sheep', 'KWEE-ra', '🐑'], ['muc', 'pig', 'muk', '🐖'],
    ['éan', 'bird', 'ayn', '🐦'], ['iasc', 'fish', 'EE-usk', '🐟'], ['coinín', 'rabbit', 'kun-EEN', '🐇'], ['sionnach', 'fox', 'SHUN-akh', '🦊'], ['luch', 'mouse', 'lukh', '🐭'], ['gabhar', 'goat', 'GOW-er', '🐐'],
    ['cearc', 'hen', 'kyark', '🐔'], ['lacha', 'duck', 'LAKH-a', '🦆'], ['ulchabhán', 'owl', 'UL-kha-wawn', '🦉'], ['dreoilín', 'wren', 'DROH-leen', '🐦'], ['broc', 'badger', 'bruk', '🦡'], ['fia', 'deer', 'FEE-a', '🦌'], ['rón', 'seal', 'rohn', '🦭']
  ]);

  V('g-food', 'Food & Drink', 'Bia agus Deoch', '🍞', 0, 'Things to eat and drink. “Prátaí” (potatoes) are a very Irish word!', [
    ['arán', 'bread', 'a-RAWN', '🍞'], ['im', 'butter', 'im', '🧈'], ['bainne', 'milk', 'BAN-yeh', '🥛'], ['uisce', 'water', 'ISH-keh', '💧'], ['tae', 'tea', 'tay', '🍵'], ['úll', 'apple', 'ool', '🍎'],
    ['banana', 'banana', 'ba-NAH-na', '🍌'], ['oráiste', 'orange', 'OR-aw-shteh', '🍊'], ['prátaí', 'potatoes', 'PRAW-tee', '🥔'], ['uibheacha', 'eggs', 'IV-yakh-a', '🥚'], ['cáis', 'cheese', 'kawsh', '🧀'], ['feoil', 'meat', 'fyohl', '🥩'],
    ['anraith', 'soup', 'AN-ra', '🍲'], ['císte', 'cake', 'KEESH-teh', '🍰'], ['subh', 'jam', 'suv', '🍓'], ['milseáin', 'sweets', 'mil-SHAWN', '🍬'], ['uachtar reoite', 'ice cream', 'OO-akh-tar ROH-it-eh', '🍦'],
    ['sú', 'juice', 'soo', '🧃'], ['cairéad', 'carrot', 'KAR-ayd', '🥕'], ['ispíní', 'sausages', 'iss-PEEN-ee', '🌭'], ['bricfeasta', 'breakfast', 'BRIK-fast-a', '🥣'], ['lón', 'lunch', 'lohn', '🥪'], ['dinnéar', 'dinner', 'DIN-yar', '🍽️']
  ]);

  V('g-body', 'My Body', 'An Corp', '🖐️', 0, 'Parts of the body. “Cos” means both leg and foot.', [
    ['súil', 'eye', 'sool', '👁️'], ['srón', 'nose', 'srohn', '👃'], ['béal', 'mouth', 'bayl', '👄'], ['cluas', 'ear', 'KLOO-us', '👂'], ['lámh', 'hand', 'lawv', '✋'], ['cos', 'leg / foot', 'kus', '🦵'],
    ['méar', 'finger', 'mayr', '☝️'], ['gruaig', 'hair', 'GROO-ig', '💇'], ['fiacla', 'teeth', 'FEE-ak-la', '🦷'], ['croí', 'heart', 'kree', '❤️'], ['cnámh', 'bone', 'k-NAWV', '🦴'], ['ceann', 'head', 'kyown', ''], ['bolg', 'tummy', 'BUL-ug', ''], ['droim', 'back', 'drim', '']
  ]);

  V('g-days', 'Days & Seasons', 'Laethanta agus Séasúir', '📅', 1, 'The days of the week start with “Dé” (day). The four seasons come from the old farming year.', [
    ['Dé Luain', 'Monday', 'day LOO-in'], ['Dé Máirt', 'Tuesday', 'day MAWRT'], ['Dé Céadaoin', 'Wednesday', 'day KAY-deen'], ['Déardaoin', 'Thursday', 'DAYR-deen'], ['Dé hAoine', 'Friday', 'day HEE-na'],
    ['Dé Sathairn', 'Saturday', 'day SA-hirn'], ['Dé Domhnaigh', 'Sunday', 'day DOW-nee'],
    ['earrach', 'spring', 'AR-akh', '🌱'], ['samhradh', 'summer', 'SOW-ruh', '☀️'], ['fómhar', 'autumn', 'FOH-wur', '🍂'], ['geimhreadh', 'winter', 'GEV-ruh', '❄️'],
    ['inniu', 'today', 'in-YOO', '📍'], ['inné', 'yesterday', 'in-AY', '⏪'], ['amárach', 'tomorrow', 'a-MAW-rakh', '⏩']
  ]);

  V('g-months', 'Months', 'Míonna', '🗓️', 1, 'The Irish months. Some are named for old festivals: Bealtaine (May) and Lúnasa (August) are festival names too, and Samhain (November) is where Halloween began.', [
    ['Eanáir', 'January', 'AN-awr', '❄️'], ['Feabhra', 'February', 'FYOW-ra', '🕯️'], ['Márta', 'March', 'MAWR-ta', '☘️'], ['Aibreán', 'April', 'AB-ran', '🌧️'], ['Bealtaine', 'May', 'BYAL-tin-eh', '🌼'], ['Meitheamh', 'June', 'MEH-hiv', '☀️'],
    ['Iúil', 'July', 'YOOL', '🏖️'], ['Lúnasa', 'August', 'LOO-na-sa', '🌾'], ['Meán Fómhair', 'September', 'myawn FOH-wir', '🍎'], ['Deireadh Fómhair', 'October', 'DER-uh FOH-wir', '🎃'], ['Samhain', 'November', 'SOW-in', '🍂'], ['Nollaig', 'December', 'NUL-ig', '🎄']
  ]);

  V('g-home', 'Home & School', 'Sa Bhaile agus ar Scoil', '🏠', 1, 'Things around the house, in the classroom and on the road.', [
    ['teach', 'house', 'tyakh', '🏠'], ['scoil', 'school', 'skul', '🏫'], ['leabhar', 'book', 'LYOW-er', '📖'], ['peann luaidhe', 'pencil', 'pyown LOO-ee-eh', '✏️'], ['peann', 'pen', 'pyown', '🖊️'], ['cathaoir', 'chair', 'KAH-heer', '🪑'],
    ['doras', 'door', 'DUR-us', '🚪'], ['fuinneog', 'window', 'FIN-yohg', '🪟'], ['cistin', 'kitchen', 'KISH-tin', '🍳'], ['leaba', 'bed', 'LAB-a', '🛏️'], ['múinteoir', 'teacher', 'MOON-chohr', '🧑‍🏫'], ['obair bhaile', 'homework', 'UB-ir WAL-eh', '📝'],
    ['ríomhaire', 'computer', 'REE-wir-eh', '💻'], ['teilifís', 'television', 'tel-if-EESH', '📺'], ['carr', 'car', 'kar', '🚗'], ['bád', 'boat', 'bawd', '⛵'], ['rothar', 'bicycle', 'RUH-her', '🚲'], ['gairdín', 'garden', 'gar-DEEN', '🪴']
  ]);

  V('g-weather', 'Weather', 'An Aimsir', '🌦️', 1, 'Irish people love talking about the weather, and there is plenty of it! “Tá sé” means “it is”.', [
    ['Tá sé fuar', 'It is cold', 'taw shay FOO-ar', '🥶'], ['Tá sé te', 'It is hot', 'taw shay teh', '🥵'], ['Tá sé fliuch', 'It is wet', 'taw shay flyukh', '💦'], ['Tá sé gaofar', 'It is windy', 'taw shay GWEE-fer', '💨'],
    ['Tá sé grianmhar', 'It is sunny', 'taw shay GREE-an-wer', '☀️'], ['Tá sé scamallach', 'It is cloudy', 'taw shay SKAM-al-akh', '☁️'], ['Tá sé ceomhar', 'It is foggy', 'taw shay KYOH-wer', '🌫️'],
    ['Tá sé ag cur báistí', 'It is raining', 'taw shay ag kur BAWSH-tee', '🌧️'], ['Tá sé ag cur sneachta', 'It is snowing', 'taw shay ag kur SHNAKH-ta', '❄️'], ['Tá stoirm ann', 'There is a storm', 'taw STUR-im own', '⛈️'], ['Tá sé go hálainn', 'It is beautiful (lovely)', 'taw shay guh HAW-lin', '🌈']
  ]);

  V('g-phrases', 'Useful Phrases', 'Abairtí Úsáideacha', '💬', 2, 'Short sentences you can use at home. “Tá ... orm” means “I am ...”, but word for word it is “... is on me”.', [
    ['Tá ocras orm', 'I am hungry', 'taw UK-rus OR-um', '🍽️'], ['Tá tart orm', 'I am thirsty', 'taw TART OR-um', '🥤'], ['Tá codladh orm', 'I am sleepy', 'taw KUD-la OR-um', '😴'], ['Tá áthas orm', 'I am happy', 'taw AW-hus OR-um', '😄'],
    ['Tá brón orm', 'I am sad / sorry', 'taw BROHN OR-um', '😢'], ['Tá eagla orm', 'I am afraid', 'taw AG-la OR-um', '😨'], ['Tá mé tuirseach', 'I am tired', 'taw may TIR-shakh', '😩'],
    ['Tuigim', 'I understand', 'TIG-im', '💡'], ['Ní thuigim', 'I do not understand', 'nee HIG-im', '🤷'], ['An bhfuil Gaeilge agat?', 'Do you speak Irish?', 'on will GAYL-geh AH-gut', '🗣️'],
    ['Tá cúpla focal agam', 'I have a few words', 'taw KOO-pla FUK-ul AH-gum', '🤏'], ['Cá bhfuil an leithreas?', 'Where is the toilet?', 'kaw will on LEH-ras', '🚻'], ['Tá madra agam', 'I have a dog', 'taw MAD-ra AH-gum', '🐕'],
    ['Is maith liom úlla', 'I like apples', 'iss mah lum OO-la', '🍎'], ['Ní maith liom ...', 'I do not like ...', 'nee mah lum'], ['Cad é seo?', 'What is this?', 'kod ay shuh', '❓'], ['Tá sé sin go hiontach!', 'That is wonderful!', 'taw shay shin guh HUN-tukh', '🌟']
  ]);

  V('g-proverbs', 'Proverbs', 'Seanfhocail', '📜', 3, 'Seanfhocail (“old sayings”) are short pieces of wisdom passed down for hundreds of years. Many sound better in Irish than in English.', [
    ['Ní neart go cur le chéile', 'There is no strength without unity', 'nee nyart guh kur leh KHAY-leh', '🤝'],
    ['Is fearr an tsláinte ná na táinte', 'Health is better than wealth', 'iss fyar un TLAWN-cheh naw na TAWN-cheh', '❤️'],
    ['Tús maith leath na hoibre', 'A good start is half the work', 'toos mah lyah na HIB-reh', '🏁'],
    ['Ar scáth a chéile a mhaireann na daoine', 'People live in each other’s shelter', 'er skaw uh KHAY-leh uh WAR-un na DEE-neh', '🏘️', 'We all depend on one another.'],
    ['Níl aon tinteán mar do thinteán féin', 'There is no hearth like your own hearth', 'neel ayn tin-CHAWN mar duh hin-CHAWN fayn', '🔥', 'Home is best.'],
    ['Mol an óige agus tiocfaidh sí', 'Praise the young and they will flourish', 'mul un OH-geh AG-us TUK-ee shee', '🌱'],
    ['Is glas iad na cnoic i bhfad uainn', 'Far-away hills are green', 'iss glass EE-ad na k-NUK ih wad OO-in', '⛰️', 'The grass is always greener somewhere else.'],
    ['Is maith an scéalaí an aimsir', 'Time is a good storyteller', 'iss mah un SHKAY-lee un AM-shir', '⏳']
  ]);

  /* ---------- grammar bites (entries-style, read + quiz) ---------- */
  const Q = (q, options, answer) => ({ q, options, answer });
  IR.addUnit({
    id: 'g-grammar', mod: 'gaeilge', kind: 'entries', title: 'Grammar Bites', ga: 'Giotaí Gramadaí', emoji: '🧠', min: 3, lessonSet: ['read', 'quiz'],
    intro: 'Four small pieces of Irish grammar that explain a lot. Read each one, then try the quiz.',
    entries: [
      { id: 'gr-ag', group: 'Grammar', title: 'Having things: “ag”', period: 'tá + ag', summary: 'Irish says “there is a dog AT me” instead of “I have a dog”.',
        detail: 'Irish has no verb “to have”. Instead you say Tá madra agam: “a dog is at me”. The word ag (at) joins with the person: agam (me), agat (you), aige (him), aici (her), againn (us), agaibh (you all), acu (them). So Tá cat agam means I have a cat, Tá cat aici means she has a cat, and Tá cat acu means they have a cat.',
        quiz: [Q('How do you say “He has a cat” in Irish?', ['Tá cat aige', 'Tá cat agam', 'Tá cat aici', 'Tá cat agat'], 0), Q('What does “Tá madra agam” mean?', ['I have a dog', 'You have a dog', 'She has a dog', 'We have a dog'], 0), Q('Which word means “them” in “Tá cat ... ”?', ['acu', 'againn', 'aige', 'agat'], 0)] },
      { id: 'gr-sh', group: 'Grammar', title: 'The soft touch: séimhiú', period: 'lenition', summary: 'After words like “mo” (my) the start of a word goes soft, shown with an h.',
        detail: 'Irish often softens the first sound of a word. This is called séimhiú (SHAY-voo), and in writing it is shown with an h after the first letter. After mo (my) and do (your): cat becomes mo chat, madra becomes mo mhadra, bád becomes mo bhád, teach becomes mo theach, súil becomes mo shúil. Words that start with a vowel do not take an h; instead mo becomes m’, as in m’athair (my father).',
        quiz: [Q('How do you say “my cat”?', ['mo chat', 'mo cat', 'mo hat', 'mo kat'], 0), Q('How do you say “my dog” (madra)?', ['mo mhadra', 'mo madra', 'mo hadra', 'mo madrah'], 0), Q('How do you say “my father” (athair)?', ['m’athair', 'mo hathair', 'mo mhathair', 'mo athair'], 0)] },
      { id: 'gr-fada', group: 'Grammar', title: 'Fadas matter', period: 'long marks', summary: 'The fada (´) makes a vowel long, and can change the meaning.',
        detail: 'Fada means “long”. The little mark over a vowel lengthens the sound, and it can change the whole word: mala is an eyebrow, but mála is a bag. Tá means “is”, and its sound is long, like “taw”. Always write the fadas: á é í ó ú. On a phone, hold down the letter to find the version with the fada.',
        quiz: [Q('What does “mála” mean?', ['bag', 'eyebrow', 'apple', 'day'], 0), Q('What does a fada do?', ['It makes the vowel sound long', 'It makes the letter silent', 'It makes the word plural', 'It shows a question'], 0), Q('Which is the correct way to write “is” in Irish?', ['tá', 'ta', 'tà', 'tâ'], 0)] },
      { id: 'gr-be', group: 'Grammar', title: 'Two ways to “be”: tá and is', period: 'tá / is', summary: '“Tá” says how or where something is. “Is” says what something is.',
        detail: 'Irish has two words for “to be”. Use tá for feelings, weather and places: Tá mé tuirseach (I am tired), Tá sé fuar (It is cold). Use is to say who or what someone or something is: Is mise Seán (I am Seán), Is múinteoir mé (I am a teacher). A good rule: tá is for how things are, is is for what things are.',
        quiz: [Q('Which word do you use for the weather: “Tá sé fuar”?', ['tá', 'is'], 0), Q('Which word do you use to say who you are: “___ mise Máire”?', ['Is', 'Tá'], 0), Q('“Tá mé tuirseach” means...', ['I am tired', 'I am a teacher', 'I am cold', 'I am Seán'], 0)] }
    ]
  });
})();
