/* Irish Studies - emoji for every myth and history entry, plus short "tell it simply" versions for younger readers.
 * IR.kid[id] = { e: emoji, t: simple text (2-4 sentences) }. Entries without t fall back to their summary. */
(function () {
  'use strict';
  const IR = window.IR; const K = IR.kid = IR.kid || {};
  const E = (id, e, t) => { K[id] = { e, t: t || '' }; };

  /* ---------- myth & folklore ---------- */
  E('m-tuatha', '🧚', 'Long, long ago, magical people called the Tuatha Dé Danann (TOO-ha day DAN-an) lived in Ireland. They were clever, beautiful and full of magic. When they lost a great battle they went to live under the hills, and some people say they became the fairies.');
  E('m-lugh', '☀️', 'Lugh was a hero who was good at everything: building, music, poetry and fighting. When a terrible giant named Balor opened his one evil eye, Lugh flung a stone from his sling right into it and saved Ireland.');
  E('m-dagda', '🥣', 'The Dagda was a big, jolly god with a huge club and a magic cauldron that was never empty, so nobody ever left his table hungry. His harp could make people cry, laugh, or fall fast asleep!');
  E('m-morrigan', '🐦‍⬛', 'The Morrígan (MOR-ee-gan) was a powerful goddess who could turn into a crow. She flew over battles and helped decide who would win. In Irish stories, crows can be a sign that she is near.');
  E('m-brigid', '🔥', 'Brigid was a goddess of poetry, healing and blacksmiths, linked with fire and with the first days of spring. Later Irish people remembered her again as Saint Brigid, and we still make Brigid’s crosses from rushes.');
  E('m-manannan', '🌊', 'Manannán mac Lir was the god of the sea. He had a magic cloak of mist and a boat that sailed itself without oars. The Isle of Man is said to be named after him.');
  E('m-nuada', '🖐️', 'King Nuada lost his hand in battle. A king was not allowed to rule if his body was not whole, so the healer Dian Cécht made him a silver hand that worked just like a real one.');
  E('m-fomorians', '👹', '');
  E('m-magtuired', '⚔️', '');
  E('m-lir', '🦢', 'A jealous stepmother turned the four children of King Lir into swans. They had to live as swans for 900 years, singing the most beautiful songs, until the spell was finally broken.');
  E('m-aengus', '💘', 'Aengus Óg was the young god of love. His kisses turned into little birds that flew around his head and sang.');
  E('m-boann', '💧', 'Boann was a goddess whose name became the River Boyne. When she walked around a sacred well of wisdom against the rules, its water rose up and chased her all the way to the sea, and the river was born.');
  E('m-cuchulainn', '🐕', 'Cú Chulainn means “the Hound of Culann”. As a boy he stopped a fierce guard dog and promised to guard Culann’s house himself until a new puppy had grown. He became Ulster’s greatest hero and defended his land against a whole army.');
  E('m-tain', '🐂', 'Queen Medb wanted the finest bull in Ireland, so she led her army to steal one from Ulster. The Ulster warriors were under a spell that made them weak, so only young Cú Chulainn stood in her way.');
  E('m-medb', '👑', 'Queen Medb of Connacht was fierce, clever and proud. One day she and her husband argued over who had more treasure, and that argument led to the great cattle raid of the Táin.');
  E('m-deirdre', '🎻', ''); E('m-conchobar', '👑', ''); E('m-fergus', '🛡️', ''); E('m-emain', '🏰', '');
  E('m-fionn', '🧙', 'Fionn mac Cumhaill (FINN mac COOL) was the leader of the Fianna, a band of mighty warriors. He was the wisest and bravest of them all. When Fionn put his thumb in his mouth, he gained great wisdom.');
  E('m-fianna', '⚔️', 'The Fianna were a band of warriors who lived in the forest and guarded Ireland. To join, you had to be brave, fast and clever, and you had to be a poet as well!');
  E('m-salmon', '🐟', 'A wise old poet spent seven years trying to catch the Salmon of Knowledge, a fish that held all the wisdom in the world. When young Fionn was cooking it for him, a drop of hot fat burned his thumb. He popped it in his mouth, and all the wisdom of the salmon became his!');
  E('m-diarmuid', '🐗', ''); E('m-cormac', '🏆', ''); E('m-conn', '🛡️', '');
  E('m-oisin', '🐎', 'Oisín, son of Fionn, rode away on a white horse with beautiful Niamh to Tír na nÓg, the Land of Youth, where nobody grows old. When he came back to visit Ireland, 300 years had passed, and everyone he knew was gone.');
  E('m-tirnanog', '🌈', 'Tír na nÓg (teer na NOHG) is the Land of Youth, a beautiful island across the sea where nobody gets old or sad. Time moves differently there: a few years in Tír na nÓg can be hundreds of years in Ireland.');
  E('m-banshee', '😱', 'The banshee is a spirit who wails near a house when someone in an old Irish family is about to die. Her cry is eerie, but she is not wicked. She is there to mourn.');
  E('m-leprechaun', '🍀', 'Leprechauns are tiny shoemakers in Irish folklore. They are said to hide a pot of gold, and if you catch one he must tell you where it is. But leprechauns are tricky, and will try to make you look away.');
  E('m-puca', '🐴', 'The púca (POO-ka) is a shape-shifter that can look like a black horse, a goat or a rabbit. It plays tricks on travellers on dark nights, but it can be kind to those who are kind to it.');
  E('m-dullahan', '🎃', ''); E('m-changeling', '👶', '');
  E('m-aossi', '🧚', 'The Aos Sí (ees shee) are the fairy folk who live inside ancient mounds. People are careful to treat them with respect, and never cut down a lone hawthorn tree, because it may be a fairy tree.');
  E('m-merrow', '🧜', 'Merrows are the mermaids and mermen of Irish stories. They wear a magic red cap that lets them dive deep into the sea. If a person steals the cap, the merrow cannot go home.');
  E('m-selkie', '🦭', 'A selkie is a seal that can take off its skin and become a person. Stories say that if someone hides the skin, the selkie cannot return to the sea, and that is always a sad ending.');
  E('m-samhain', '🎃', 'Samhain (SOW-in) is the old festival at the end of October, when summer ends and winter begins. People lit bonfires, wore costumes and believed that the walls between our world and the Otherworld grew thin. It is where Halloween comes from!');
  E('m-imbolc', '🕯️', 'Imbolc (IM-olk) is on 1 February and marks the first stirrings of spring. Lambs are born and days grow longer. It is also the day of Saint Brigid.');
  E('m-bealtaine', '🔥', 'Bealtaine (BYAL-tin-eh) is on 1 May and is the start of summer. People lit big bonfires, drove their cattle between two fires for luck, and decorated their doors with yellow May flowers.');
  E('m-lughnasadh', '🌾', 'Lughnasadh (LOO-na-sa) is on 1 August and is the start of harvest. It is named after the god Lugh. People held fairs and games, and climbed hills and mountains.');
  E('m-newgrange', '🌅', 'Newgrange is a huge mound built about 5,000 years ago, which is older than Stonehenge and the pyramids of Giza. On the shortest day of the year, around 21 December, the rising sun shines down a long passage into the middle of the tomb.');
  E('m-tara', '👑', 'The Hill of Tara was the seat of the High Kings of Ireland. A standing stone there, the Lia Fáil, was said to cry out when the rightful king touched it.');
  E('m-causeway', '🪨', 'The Giant’s Causeway is made of about 40,000 stone columns on the coast of Antrim. A legend says the giant Fionn built a path across the sea to fight a Scottish giant. Scientists say it was made when lava cooled millions of years ago.');
  E('m-stbrigid', '🌿', 'Saint Brigid of Kildare was an abbess, a woman who led a community of nuns. Stories say she asked a king for as much land as her cloak would cover, and the cloak spread wider and wider until it covered a whole plain.');
  E('m-stpatrick', '☘️', 'Patrick was taken to Ireland as a teenager and made to work as a shepherd. He escaped, but years later he came back to teach people about Christianity. Ireland has no snakes, so the story of him driving them out is a legend.');
  E('m-triskele', '🌀', 'The triskele is a swirl with three arms, carved on stones at Newgrange 5,000 years ago. Nobody knows for sure what it meant, but it makes you think of the sun, the sea and the land.');

  /* ---------- history ---------- */
  E('h-celts', '🛡️', 'About 2,500 years ago, people called the Celts came to Ireland. They spoke an early kind of Irish, lived in small kingdoms, and had storytellers, poets and craftspeople who made beautiful gold and bronze jewellery.');
  E('h-patrick', '☘️', 'Patrick was taken to Ireland as a teenager and made to work as a shepherd. He escaped, but later he came back to teach people about Christianity. Today St Patrick’s Day is celebrated on 17 March all over the world.');
  E('h-vikings', '⛵', 'About 1,200 years ago, Viking sailors came from the north in long, fast ships. At first they raided monasteries, but later they settled and built the first towns in Ireland, including Dublin, Waterford and Limerick.');
  E('h-clontarf', '⚔️', 'In 1014 Brian Boru, the High King, led an army against the Vikings and their allies at Clontarf. His side won, but Brian was killed in his tent that day.');
  E('h-normans', '🏰', 'In 1169 knights from Wales called Normans landed in Wexford. They built stone castles, and over time many of them became very Irish themselves.');
  E('h-kilkenny', '📜', ''); E('h-silken', '🧵', ''); E('h-nineyears', '⚔️', ''); E('h-flight', '⛵', ''); E('h-plantation', '🌾', ''); E('h-1641', '🔥', ''); E('h-cromwell', '⚔️', ''); E('h-boyne', '⚔️', ''); E('h-aughrim', '⚔️', '');
  E('h-penal', '📜', ''); E('h-1798', '⚔️', ''); E('h-union', '📜', ''); E('h-emancipation', '🗳️', '');
  E('h-famine', '🥔', 'In 1845 a disease killed the potato crop, which was the main food for many families. This is called An Gorta Mór, the Great Hunger. About a million people died and about a million more left Ireland, often for America. We remember them with sadness and respect.');
  E('h-fenian', '✊', ''); E('h-landwar', '🌾', ''); E('h-homerule', '📜', '');
  E('h-easter', '🏴', 'On Easter Monday 1916 a group of Irish men and women took over buildings in Dublin and read out a proclamation saying that Ireland should be free. The Rising was put down after a week, but it changed how many people felt about independence.');
  E('h-warind', '⚔️', ''); E('h-partition', '🗺️', ''); E('h-treaty', '✍️', ''); E('h-civilwar', '⚔️', ''); E('h-bunreacht', '📘', ''); E('h-republic', '🇮🇪', '');
  E('h-troubles', '🕊️', ''); E('h-bloodysunday', '🕯️', ''); E('h-eec', '🇪🇺', ''); E('h-hunger', '🕯️', '');
  E('h-gfa', '🕊️', 'In 1998, after about thirty years of violence in Northern Ireland, called the Troubles, leaders agreed a peace deal on Good Friday. It is called the Good Friday Agreement, and it helped people share power and live more peacefully.');
  E('h-marriage', '🗳️', ''); E('h-repeal', '🗳️', ''); E('h-brexit', '🗺️', '');
})();
