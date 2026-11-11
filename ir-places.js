/* Irish Studies - Places: the four provinces (32 counties) and natural Ireland. */
(function () {
  'use strict';
  const IR = window.IR;
  // county: [English, Irish, pronunciation guide, county town, landmark, fact]
  const C = r => ({ en: r[0], ga: r[1], say: r[2], town: r[3], land: r[4], fact: r[5] });
  const P = (id, prov, provGa, emoji, fact, rows) => IR.addUnit({ id: 'geo-' + id, mod: 'geography', kind: 'counties', title: prov, ga: 'Cúige ' + provGa, emoji, min: 1, prov, provGa, fact, items: rows.map(C) });

  P('leinster', 'Leinster', 'Laighean', '🏛️', 'Leinster is in the east and holds Dublin, the capital. It has 12 counties. “Cúige” means “a fifth”, because Ireland once had five provinces, with Meath as the fifth.', [
    ['Carlow', 'Ceatharlach', 'KAH-har-lakh', 'Carlow', 'the Brownshill Dolmen', 'Its dolmen has a giant capstone weighing around 100 tonnes.'],
    ['Dublin', 'Baile Átha Cliath', 'BAL-eh aw KLEE-ah', 'Dublin', 'the Book of Kells at Trinity College', 'The capital city. The Viking name was Dubh Linn, “black pool”.'],
    ['Kildare', 'Cill Dara', 'kil DAR-a', 'Naas', 'the Curragh racecourse', 'Cill Dara means “church of the oak”, linked to St Brigid.'],
    ['Kilkenny', 'Cill Chainnigh', 'kil KHAN-ee', 'Kilkenny', 'Kilkenny Castle', 'The “Marble City” is famous for hurling.'],
    ['Laois', 'Laois', 'leesh', 'Portlaoise', 'the Rock of Dunamase', 'A ruined hilltop fortress rises from the flat land.'],
    ['Longford', 'An Longfort', 'un LUNG-furt', 'Longford', 'the Corlea Trackway', 'An Iron Age road of oak planks, built across a bog about 2,000 years ago.'],
    ['Louth', 'Lú', 'loo', 'Dundalk', 'Monasterboice High Cross', 'The smallest county in Ireland. The Táin story is set here.'],
    ['Meath', 'An Mhí', 'un VEE', 'Navan', 'the Hill of Tara and Newgrange', 'The “Royal County”, home of the High Kings at Tara.'],
    ['Offaly', 'Uíbh Fhailí', 'iv AL-ee', 'Tullamore', 'Clonmacnoise monastery', 'St Ciarán founded Clonmacnoise on the River Shannon in 544.'],
    ['Westmeath', 'An Iarmhí', 'un EER-vee', 'Mullingar', 'the Hill of Uisneach', 'Legend says Uisneach is the centre of Ireland. Lough Ennell and Lough Owel are here.'],
    ['Wexford', 'Loch Garman', 'lokh GAR-man', 'Wexford', 'Hook Lighthouse', 'The Normans landed in Wexford in 1169. Hook is one of the oldest working lighthouses in the world.'],
    ['Wicklow', 'Cill Mhantáin', 'kil WAN-tawn', 'Wicklow', 'Glendalough', 'The “Garden of Ireland”. St Kevin founded a monastery in the glen.']
  ]);
  P('munster', 'Munster', 'Mumhan', '🌊', 'Munster is in the south-west and is the biggest province. It has 6 counties, a wild coast and many of Ireland’s mountains.', [
    ['Clare', 'An Clár', 'un KLAWR', 'Ennis', 'the Cliffs of Moher', 'The cliffs rise about 214 metres above the Atlantic. The Burren is here too.'],
    ['Cork', 'Corcaigh', 'KUR-kig', 'Cork', 'Blarney Castle', 'The biggest county by area. Kiss the Blarney Stone for “the gift of the gab”.'],
    ['Kerry', 'Ciarraí', 'KEER-ee', 'Tralee', 'Skellig Michael', 'Home of Carrauntoohil, Ireland’s highest mountain at 1,038 metres.'],
    ['Limerick', 'Luimneach', 'LIM-nakh', 'Limerick', 'King John’s Castle', 'On the River Shannon. The Treaty Stone recalls the 1691 treaty.'],
    ['Tipperary', 'Tiobraid Árann', 'TIB-rid AR-un', 'Clonmel', 'the Rock of Cashel', 'The Rock of Cashel was a seat of the kings of Munster.'],
    ['Waterford', 'Port Láirge', 'port LAWR-ig-eh', 'Dungarvan', 'the Viking Triangle in Waterford city', 'Waterford city was founded by Vikings in 914, making it one of the oldest cities in Ireland.']
  ]);
  P('connacht', 'Connacht', 'Chonnacht', '🌾', 'Connacht is in the west. It has 5 counties, lots of Irish speakers and a lot of rain.', [
    ['Galway', 'Gaillimh', 'GAL-iv', 'Galway', 'the Aran Islands and Connemara', 'Part of Galway is a Gaeltacht, where Irish is spoken every day.'],
    ['Leitrim', 'Liatroim', 'LEE-uh-trim', 'Carrick-on-Shannon', 'Lough Allen', 'The least populated county. The River Shannon runs through it.'],
    ['Mayo', 'Maigh Eo', 'mwy OH', 'Castlebar', 'Croagh Patrick', 'Pilgrims climb the 764-metre mountain on Reek Sunday.'],
    ['Roscommon', 'Ros Comáin', 'ros KUM-awn', 'Roscommon', 'Rathcroghan (Cruachan)', 'The ancient royal site linked to Queen Medb of the Táin.'],
    ['Sligo', 'Sligeach', 'SHLEE-gakh', 'Sligo', 'Benbulben', 'The poet W. B. Yeats is buried in Drumcliff, under Benbulben.']
  ]);
  P('ulster', 'Ulster', 'Uladh', '🔺', 'Ulster is in the north. It has 9 counties: 6 are in Northern Ireland and 3 (Cavan, Donegal and Monaghan) are in the Republic of Ireland.', [
    ['Antrim', 'Aontroim', 'AYN-trim', 'Antrim', 'the Giant’s Causeway', 'About 40,000 stone columns. Legend says the giant Fionn built it.'],
    ['Armagh', 'Ard Mhacha', 'ard WAKH-a', 'Armagh', 'Navan Fort (Emain Macha)', 'Armagh is the church capital of Ireland, linked to St Patrick.'],
    ['Cavan', 'An Cabhán', 'un KOW-awn', 'Cavan', 'the Shannon Pot', 'The River Shannon begins here, on the slopes of Cuilcagh mountain.'],
    ['Derry', 'Doire', 'DIR-eh', 'Derry', 'the city walls of Derry', 'Doire means “oak grove”. St Colmcille founded a monastery here.'],
    ['Donegal', 'Dún na nGall', 'doon na NGAL', 'Lifford', 'Slieve League sea cliffs', 'A big Gaeltacht county, and Slieve League is one of Europe’s highest sea cliffs.'],
    ['Down', 'An Dún', 'un DOON', 'Downpatrick', 'the Mourne Mountains', 'St Patrick is said to be buried at Downpatrick.'],
    ['Fermanagh', 'Fear Manach', 'far MAN-akh', 'Enniskillen', 'Lough Erne', 'A lake county with islands, castles and the Marble Arch Caves.'],
    ['Monaghan', 'Muineachán', 'mwin-akh-AWN', 'Monaghan', 'Castle Leslie', 'Gentle hills called drumlins. The poet Patrick Kavanagh was from here.'],
    ['Tyrone', 'Tír Eoghain', 'teer OH-in', 'Omagh', 'the Ulster American Folk Park', 'The biggest county in Northern Ireland. The name means “land of Eoghan”.']
  ]);

  /* ---------- natural Ireland ---------- */
  const Q = (q, options, answer) => ({ q, options, answer });
  IR.addUnit({
    id: 'geo-nature', mod: 'geography', kind: 'entries', title: 'Wild Ireland', ga: 'Éire Fhiáin', emoji: '🌿', min: 1,
    intro: 'Mountains, rivers, islands and the animals that live there.',
    entries: [
      { id: 'n-carrauntoohil', group: 'Land & water', e: '⛰️', title: 'Carrauntoohil', period: 'Co. Kerry', summary: 'Ireland’s highest mountain, 1,038 metres tall, in the Macgillycuddy’s Reeks.', detail: 'Carrauntoohil (Corrán Tuathail) stands 1,038 metres high in the Macgillycuddy’s Reeks in County Kerry. A large cross stands on the summit. Many people climb it each year, but the weather can change very quickly, so walkers need to be careful.', quiz: [Q('What is the highest mountain in Ireland?', ['Carrauntoohil', 'Croagh Patrick', 'Benbulben', 'Slieve League'], 0)] },
      { id: 'n-shannon', group: 'Land & water', e: '🌊', title: 'The River Shannon', period: 'An tSionainn', summary: 'The longest river in Ireland, about 360 kilometres long.', detail: 'The Shannon rises at the Shannon Pot in County Cavan and flows south and west for about 360 kilometres before it reaches the Atlantic Ocean beyond Limerick. It is the longest river in Ireland and in the British Isles, and it widens into lakes such as Lough Ree and Lough Derg along the way.', quiz: [Q('Where does the River Shannon begin?', ['The Shannon Pot in Cavan', 'Lough Neagh', 'The Cliffs of Moher', 'Dublin Bay'], 0)] },
      { id: 'n-neagh', group: 'Land & water', e: '💧', title: 'Lough Neagh', period: 'Northern Ireland', summary: 'The biggest lake in the British Isles.', detail: 'Lough Neagh covers about 392 square kilometres, which makes it the largest lake in the British Isles. Five of the six counties of Northern Ireland touch its shore. A legend says the giant Fionn scooped out the earth to throw at a rival, and the lake filled the hole.', quiz: [Q('What is the biggest lake in the British Isles?', ['Lough Neagh', 'Lough Derg', 'Lough Corrib', 'Lough Erne'], 0)] },
      { id: 'n-moher', group: 'Land & water', e: '🌊', title: 'Cliffs of Moher', period: 'Co. Clare', summary: 'Huge sea cliffs on the west coast, up to about 214 metres high.', detail: 'The Cliffs of Moher (Aillte an Mhothair) run for about 14 kilometres along the coast of County Clare and reach about 214 metres at their highest. Thousands of seabirds nest on the ledges, including puffins in summer.', quiz: [Q('In which county are the Cliffs of Moher?', ['Clare', 'Kerry', 'Donegal', 'Wicklow'], 0)] },
      { id: 'n-burren', group: 'Land & water', e: '🌸', title: 'The Burren', period: 'Co. Clare', summary: 'A rocky limestone landscape where Arctic and Mediterranean flowers grow side by side.', detail: 'Boirinn means “rocky place”. The Burren is a wide landscape of grey limestone with cracks called grikes, and in spring its flowers are famous because plants from the Arctic, the Alps and the Mediterranean all grow together there. It also has ancient tombs, like the Poulnabrone dolmen.', quiz: [Q('What does the Burren’s name mean?', ['Rocky place', 'Green hill', 'Big river', 'Fairy fort'], 0)] },
      { id: 'n-skellig', group: 'Land & water', e: '🏝️', title: 'Skellig Michael', period: 'Co. Kerry', summary: 'A steep island with a monastery from over 1,000 years ago, and puffins.', detail: 'About 12 kilometres off the Kerry coast, Skellig Michael rises like a pointed rock from the sea. Monks built stone beehive huts near the top around 1,400 years ago and lived there in prayer and study. It is a World Heritage Site. Puffins nest there in summer, and nearby Little Skellig is home to one of the biggest gannet colonies in the world.', quiz: [Q('Who built beehive huts on Skellig Michael?', ['Monks', 'Vikings', 'Normans', 'Fairies'], 0)] },
      { id: 'n-hare', group: 'Animals', e: '🐇', title: 'The Irish hare', period: 'Giorria', summary: 'A wild hare found only in Ireland, bigger and faster than a rabbit.', detail: 'The Irish hare is a special kind of mountain hare that lives only in Ireland. It has long black-tipped ears, lives above ground in a shallow hollow called a form, and can run very fast. In spring you may see hares “boxing” in fields.', quiz: [Q('Where does an Irish hare sleep?', ['In a shallow hollow called a form', 'In a deep burrow', 'In a tree', 'In a cave'], 0)] },
      { id: 'n-squirrel', group: 'Animals', e: '🐿️', title: 'Red squirrels and pine martens', period: 'Iora rua', summary: 'Native woodland animals, and a clever pine marten helps the red squirrel.', detail: 'The red squirrel is Ireland’s native squirrel. The larger grey squirrel, brought from America, pushed it out of many woods. But in places where the pine marten, a bushy-tailed relative of the weasel, has returned, grey squirrels have become fewer and red squirrels have recovered.', quiz: [Q('Which squirrel is native to Ireland?', ['Red squirrel', 'Grey squirrel', 'Flying squirrel', 'Black squirrel'], 0)] },
      { id: 'n-deer', group: 'Animals', e: '🦌', title: 'Red deer of Killarney', period: 'Fia rua', summary: 'Ireland’s only native herd of red deer lives in Killarney National Park.', detail: 'Red deer have lived in Ireland since the end of the last ice age. The herd in Killarney National Park in County Kerry is the only native one left. In autumn the stags roar to claim their herds in what is called the rut.', quiz: [Q('Where does Ireland’s native herd of red deer live?', ['Killarney National Park', 'The Burren', 'Phoenix Park', 'The Aran Islands'], 0)] },
      { id: 'n-elk', group: 'Animals', e: '🦴', title: 'The giant Irish elk', period: 'Extinct', summary: 'A huge deer with antlers up to 3.5 metres across, extinct for thousands of years.', detail: 'The giant Irish deer, often called the Irish elk, had antlers that could spread about 3.5 metres from tip to tip, the biggest of any deer. It died out thousands of years ago. Skeletons found preserved in Irish bogs and caves are on show in museums.', quiz: [Q('What is special about the Irish elk?', ['Enormous antlers', 'A tiny body', 'It could fly', 'It lived underwater'], 0)] },
      { id: 'n-snakes', group: 'Animals', e: '🦎', title: 'No snakes!', period: 'Ireland', summary: 'Ireland has no native snakes. Its only native reptile is a little lizard.', detail: 'Ireland has no snakes in the wild. After the last ice age, the land bridge to Britain disappeared before snakes could cross, and the sea kept them out. The common lizard is Ireland’s only native reptile. The story that St Patrick drove out the snakes is a legend.', quiz: [Q('What is Ireland’s only native reptile?', ['The common lizard', 'The adder', 'The grass snake', 'The crocodile'], 0)] },
      { id: 'n-wolfhound', group: 'Animals', e: '🐕', title: 'The Irish wolfhound', period: 'Cú Faoil', summary: 'One of the tallest dog breeds in the world, bred long ago to hunt wolves.', detail: 'The Irish wolfhound is a huge, gentle, rough-coated hound, among the tallest of all dog breeds. Long ago it hunted wolves and deer, and in the stories the great hound Bran belonged to Fionn mac Cumhaill.', quiz: [Q('The Irish wolfhound was first bred to...', ['Hunt wolves', 'Herd sheep', 'Pull sleds', 'Guard fish'], 0)] },
      { id: 'n-puffin', group: 'Animals', e: '🐧', title: 'Puffins', period: 'Puifín', summary: 'Colourful seabirds with big striped beaks, nesting on Irish islands in summer.', detail: 'Puffins spend most of the year at sea and come ashore to nest on islands such as the Saltee Islands and the Skelligs from around April to August. They dig burrows, carry silvery fish in their bright beaks, and can flap their wings hundreds of times a minute.', quiz: [Q('When do puffins come ashore to nest in Ireland?', ['Summer', 'Winter', 'Never', 'Only at night in December'], 0)] },
      { id: 'n-shamrock', group: 'Plants', e: '☘️', title: 'The shamrock', period: 'Seamróg', summary: 'A small three-leaved clover, the national emblem of Ireland.', detail: 'Seamróg means “little clover”. It is a three-leaved plant, usually a kind of clover, and by tradition St Patrick used it to explain the Trinity. Four-leaved clovers are rare and said to bring luck, but they are not the shamrock.', quiz: [Q('How many leaves does a shamrock have?', ['Three', 'Four', 'Five', 'Two'], 0)] }
    ]
  });
})();
