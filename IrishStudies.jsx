import React, { useState, useMemo, useEffect } from 'react';

// ============================================================================
// DATA: Irish History
// ============================================================================
const HISTORY = [
  {
    id: 'h-celts', era: 'Early Ireland', title: 'Arrival of the Celts', period: 'c. 500 BC',
    summary: 'Celtic peoples migrate to Ireland, bringing the Gaelic language and the tuath system.',
    detail: 'Successive waves of Celtic-speaking peoples arrived from continental Europe, gradually displacing or absorbing earlier inhabitants. They established a society of small kingdoms (tuatha), each ruled by its own king, with shared language (Old Irish), law (Brehon law), and religion (druidic). This Gaelic culture would shape Ireland for the next 1,500 years and survive, in fragments, to the present.',
    quiz: [{ q: 'What was a tuath in early Celtic Ireland?', options: ['A small kingdom', 'A type of weapon', 'A religious festival', 'A mountain fort'], answer: 0 }]
  },
  {
    id: 'h-patrick', era: 'Early Ireland', title: 'St. Patrick’s Mission', period: 'AD 432 (traditional)',
    summary: 'Christianity spreads through Ireland under Patrick and other early missionaries.',
    detail: 'Captured as a teenager from Roman Britain and enslaved in Ireland, Patrick escaped, became a cleric, and returned as a missionary. The traditional date of 432 is symbolic; conversion was gradual and led by many figures, but Patrick became the central one in memory. Ireland’s monasteries — Clonmacnoise, Glendalough, Iona — became beacons of learning while continental Europe sank into the early medieval gloom, earning the island the title "Land of Saints and Scholars."',
    quiz: [{ q: 'How was the young Patrick first brought to Ireland?', options: ['As a Roman soldier', 'As a slave', 'As a merchant', 'As a missionary'], answer: 1 }]
  },
  {
    id: 'h-vikings', era: 'Early Ireland', title: 'First Viking Raids', period: 'AD 795',
    summary: 'Norse raiders attack Lambay Island; Vikings later found Dublin, Waterford, Cork, Limerick.',
    detail: 'The first recorded raid struck Rathlin and Lambay islands in 795. Initial smash-and-grab raids on monasteries gave way to permanent Norse settlements that became Ireland’s first true towns. Dublin (Dubh Linn, "black pool") was founded around 841. The Vikings introduced coinage and overseas trade and were eventually absorbed into Irish society — many became Hiberno-Norse, Christian and Irish-speaking, while still ruling their port towns.',
    quiz: [{ q: 'Which Irish city was founded by the Vikings?', options: ['Galway', 'Dublin', 'Kilkenny', 'Mullingar'], answer: 1 }]
  },
  {
    id: 'h-clontarf', era: 'Early Ireland', title: 'Battle of Clontarf', period: 'AD 1014',
    summary: 'High King Brian Boru defeats a Viking-Leinster alliance but is killed in his tent.',
    detail: 'Brian Boru, the most powerful High King Ireland ever produced, defeated a coalition of Norse Dubliners and the Leinstermen on Good Friday 1014. The Viking threat as a political force was broken, but Brian was cut down in his tent by fleeing Norsemen and his dynasty fragmented. Clontarf became the founding myth of Irish unity against foreign invaders, even though the battle was as much a civil war as a national one.',
    quiz: [{ q: 'Who led the Irish at the Battle of Clontarf?', options: ['Niall of the Nine Hostages', 'Brian Boru', 'Cú Chulainn', 'Hugh O’Neill'], answer: 1 }]
  },
  {
    id: 'h-normans', era: 'Early Ireland', title: 'Norman Invasion', period: '1169–1171',
    summary: 'Norman lords land in Wexford; Henry II of England asserts overlordship.',
    detail: 'Dermot MacMurrough, the deposed King of Leinster, invited Norman mercenaries from Wales — led by Strongbow (Richard de Clare) — to help him reclaim his throne. Henry II of England then arrived to bring the Normans to heel, claiming lordship over Ireland with the dubious authority of the papal bull Laudabiliter. The Normans built castles, founded towns, and would, over generations, become "more Irish than the Irish themselves," intermarrying and adopting Gaelic culture.',
    quiz: [{ q: 'Who invited the Normans to Ireland?', options: ['Brian Boru', 'Dermot MacMurrough', 'Hugh O’Neill', 'Henry II'], answer: 1 }]
  },
  {
    id: 'h-kilkenny', era: 'Late Medieval', title: 'Statutes of Kilkenny', period: '1366',
    summary: 'English law tries to stop Norman settlers "going native"; almost entirely fails.',
    detail: 'The Hiberno-Norman lords had been adopting Gaelic dress, language, marriage customs, and law. The Statutes of Kilkenny, passed by an Anglo-Irish parliament, banned all of it — speaking Irish, fostering children with the Irish, intermarriage, even Irish music. The laws were widely ignored and within a century English authority had shrunk to "the Pale," the area around Dublin. The phrase "beyond the Pale" still survives in English.',
    quiz: [{ q: 'What did "beyond the Pale" originally describe?', options: ['Outside English-controlled territory in Ireland', 'A Viking settlement', 'Forbidden religious practice', 'The high seas'], answer: 0 }]
  },
  {
    id: 'h-silken', era: 'Tudor & Stuart', title: 'Silken Thomas Revolt', period: '1534–1535',
    summary: 'Thomas Fitzgerald rebels against Henry VIII; the Tudors begin systematic conquest.',
    detail: 'Thomas Fitzgerald, the 10th Earl of Kildare — nicknamed "Silken Thomas" for the silk fringes on his men’s helmets — renounced his loyalty to Henry VIII after a false rumour of his father’s execution. The rebellion was crushed, the Fitzgeralds destroyed, and Henry’s government took direct control. From this point, Tudor monarchs pursued conquest, plantation, and Reformation simultaneously, producing the religious-political fault line that would define Irish history for four centuries.',
    quiz: [{ q: 'Why was Thomas Fitzgerald nicknamed "Silken Thomas"?', options: ['He sold silk', 'Silk fringes on his troops’ helmets', 'A poet’s epithet', 'A Gaelic translation of his name'], answer: 1 }]
  },
  {
    id: 'h-nineyears', era: 'Tudor & Stuart', title: 'Nine Years’ War', period: '1594–1603',
    summary: 'Hugh O’Neill’s Ulster confederacy is defeated at Kinsale; Gaelic Ireland ends as a power.',
    detail: 'Hugh O’Neill, Earl of Tyrone, led the most formidable Gaelic resistance Tudor England ever faced. He won Yellow Ford (1598) and held Ulster against the crown for years. Spanish reinforcements landed at Kinsale in 1601, but O’Neill’s forced winter march south ended in defeat at Christmas. The war ended at the Treaty of Mellifont in 1603, just days after Elizabeth I died — leaving the Gaelic order broken but its lords legally intact, briefly.',
    quiz: [{ q: 'Where was the decisive battle of the Nine Years’ War fought?', options: ['Kinsale', 'Aughrim', 'Clontarf', 'Wexford'], answer: 0 }]
  },
  {
    id: 'h-flight', era: 'Tudor & Stuart', title: 'Flight of the Earls', period: '1607',
    summary: 'Hugh O’Neill, Rory O’Donnell, and ninety others sail from Lough Swilly into permanent exile.',
    detail: 'Unable to operate within the new English legal system and fearing arrest, the great Gaelic lords of Ulster boarded a ship at Rathmullan and sailed for the continent. They hoped to raise a Spanish army and return; they died abroad. The Flight is the symbolic end of Gaelic Ireland and opened the door to the Plantation of Ulster, since their vast lands were now forfeit to the crown.',
    quiz: [{ q: 'From which lough did the earls sail in 1607?', options: ['Lough Neagh', 'Lough Swilly', 'Lough Erne', 'Lough Foyle'], answer: 1 }]
  },
  {
    id: 'h-plantation', era: 'Tudor & Stuart', title: 'Plantation of Ulster', period: '1609 onwards',
    summary: 'Confiscated Gaelic lands are settled with Scottish and English Protestants.',
    detail: 'Six counties of Ulster (Donegal, Tyrone, Tyrconnell, Fermanagh, Cavan, Armagh) were systematically planted with settlers from Lowland Scotland and northern England, brought in as a Protestant population loyal to the crown. The Plantation created a religiously and ethnically distinct community in Ulster whose descendants — the Ulster Scots / Ulster Protestants — would shape Irish politics from 1641 to the Troubles.',
    quiz: [{ q: 'Where did most Ulster Plantation settlers come from?', options: ['Wales and Cornwall', 'Lowland Scotland and northern England', 'France', 'The English Midlands'], answer: 1 }]
  },
  {
    id: 'h-1641', era: 'Tudor & Stuart', title: 'The 1641 Rebellion', period: '1641',
    summary: 'Irish Catholics rise; massacres of settlers become foundational in Unionist memory.',
    detail: 'A planned coup by dispossessed Catholic gentry in Ulster spiralled into widespread violence against Protestant settlers. Thousands died, some in pitched fighting, many from exposure after being driven from their homes in winter. The numbers were exaggerated in pamphlets to whip up English opinion. The rebellion became the Catholic side of a vicious religious memory; later Cromwell would cite "1641" as justification for his own atrocities.',
    quiz: [{ q: 'Who were the main victims of the 1641 violence in Ulster?', options: ['Norman lords', 'Protestant settlers', 'Catholic priests', 'Viking traders'], answer: 1 }]
  },
  {
    id: 'h-cromwell', era: 'Tudor & Stuart', title: 'Cromwellian Conquest', period: '1649–1653',
    summary: 'Cromwell crushes Confederate Ireland; mass land confiscation and "to hell or to Connacht."',
    detail: 'Oliver Cromwell landed in 1649 and stormed Drogheda and Wexford, killing thousands of soldiers and civilians. The campaign that followed was less brutal in episodes but more devastating in cumulative effect: famine, plague, and forced removal. Catholic landowners east of the Shannon were ordered to "transplant" to barren Connacht — those who refused were executed. Catholic land ownership collapsed from around 60% to 20% in a generation. Cromwell remains the most hated name in Irish historical memory.',
    quiz: [{ q: 'Where were Catholic landowners told to relocate under Cromwell?', options: ['Ulster', 'Connacht', 'Dublin', 'Wales'], answer: 1 }]
  },
  {
    id: 'h-boyne', era: 'Tudor & Stuart', title: 'Battle of the Boyne', period: '1 July 1690',
    summary: 'William of Orange defeats James II near Drogheda; James flees Ireland.',
    detail: 'Fought along the River Boyne in County Meath, the Boyne pitted the Catholic James II (with French and Irish troops) against his Protestant son-in-law William III (with a multinational coalition including Dutch, Danish, and Ulster Protestant forces, and the Pope’s blessing — Louis XIV being the bigger Vatican worry). William’s 36,000 outnumbered James’s 23,000. Casualties were modest, but James fled to France, earning the Irish nickname Séamus an Chaca. Still commemorated by Orange Order parades on 12 July.',
    quiz: [{ q: 'Who did William of Orange defeat at the Boyne?', options: ['Charles I', 'James II', 'Patrick Sarsfield', 'Hugh O’Neill'], answer: 1 }]
  },
  {
    id: 'h-aughrim', era: 'Tudor & Stuart', title: 'Battle of Aughrim & Treaty of Limerick', period: '1691',
    summary: 'The Williamite War ends bloodily; Irish Catholic officers leave in the "Flight of the Wild Geese."',
    detail: 'Aughrim in County Galway was the bloodiest battle ever fought on Irish soil — around 7,000 dead in a single afternoon. The Jacobite cause collapsed and the Treaty of Limerick followed, promising religious tolerance and property protection. Westminster honoured almost none of it. Some 14,000 Irish Catholic soldiers chose exile in continental armies — the "Wild Geese" — serving France, Spain, and Austria for generations.',
    quiz: [{ q: 'What were the "Wild Geese"?', options: ['Famine emigrants', 'Irish Catholic soldiers in exile', 'A rebel cavalry unit', 'A type of folk song'], answer: 1 }]
  },
  {
    id: 'h-penal', era: '18th–19th C', title: 'Penal Laws', period: '1695 onwards',
    summary: 'Catholics (and Dissenters) are stripped of land, education, office, and arms.',
    detail: 'A web of statutes barred Catholics from holding public office, voting, sitting in parliament, owning a horse worth more than five pounds, attending university, teaching, or inheriting land intact (it had to be split among all sons unless one converted, in which case he took everything). Mass became a furtive affair at "Mass rocks" in fields. The laws were aimed at the Catholic gentry and clergy and largely succeeded in destroying both as social classes.',
    quiz: [{ q: 'What was a "Mass rock"?', options: ['A megalithic monument', 'A secret outdoor place to celebrate Mass', 'A boundary stone', 'A fairy dwelling'], answer: 1 }]
  },
  {
    id: 'h-1798', era: '18th–19th C', title: 'United Irishmen Rebellion', period: '1798',
    summary: 'Wolfe Tone’s republican rising is crushed; a French landing at Killala fails.',
    detail: 'Inspired by the American and French Revolutions, the United Irishmen — founded by the Belfast Presbyterian Theobald Wolfe Tone — sought a non-sectarian Irish republic. The 1798 rising was poorly coordinated: Wexford rebels held out longest before defeat at Vinegar Hill; a small French expedition under General Humbert won at Castlebar before being forced to surrender. Tone was captured and died in prison. The rebellion produced the foundational text of modern Irish republicanism.',
    quiz: [{ q: 'Who founded the United Irishmen?', options: ['Daniel O’Connell', 'Theobald Wolfe Tone', 'Robert Emmet', 'Patrick Pearse'], answer: 1 }]
  },
  {
    id: 'h-union', era: '18th–19th C', title: 'Act of Union', period: '1801',
    summary: 'The Irish Parliament is abolished; Ireland is governed directly from Westminster.',
    detail: 'Pushed through with bribes (peerages, pensions, cash) after the 1798 rising rattled Westminster, the Act of Union dissolved the Dublin parliament and merged the kingdoms of Great Britain and Ireland. Ireland sent 100 MPs to London. Catholic Emancipation, dangled as a carrot to Catholic support, was vetoed by King George III and delayed for 28 years. The Act would dominate Irish politics until partition.',
    quiz: [{ q: 'What did the Act of Union 1801 abolish?', options: ['The Catholic Church', 'The Irish Parliament', 'The Penal Laws', 'The monarchy'], answer: 1 }]
  },
  {
    id: 'h-emancipation', era: '18th–19th C', title: 'Catholic Emancipation', period: '1829',
    summary: 'Daniel O’Connell wins the right of Catholics to sit in the UK Parliament.',
    detail: 'Daniel O’Connell, "the Liberator," built a mass political movement — the Catholic Association, funded by a penny-a-month subscription — that demonstrated Catholic political mobilisation on a scale Westminster could not ignore. His own election for County Clare in 1828, which he could not legally take up as a Catholic, forced the issue. Wellington and Peel passed Emancipation in 1829, fearing civil war if they refused.',
    quiz: [{ q: 'Who is known as "the Liberator"?', options: ['Charles Stewart Parnell', 'Daniel O’Connell', 'Wolfe Tone', 'Michael Davitt'], answer: 1 }]
  },
  {
    id: 'h-famine', era: '18th–19th C', title: 'The Great Famine (An Gorta Mór)', period: '1845–1852',
    summary: 'Potato blight devastates Ireland; one million die, one million emigrate.',
    detail: 'The water mould Phytophthora infestans destroyed the potato crop on which three million Irish poor depended. Through "Black ’47" and beyond, while Britain enforced laissez-faire policies and Ireland continued to export grain and livestock, the rural poor died of starvation, typhus, and dysentery, or fled in coffin ships to America and Canada. Population halved over the next 70 years. The Famine collapsed the Irish language, fuelled the diaspora, and seared a permanent grievance into the national memory.',
    quiz: [{ q: 'What microorganism caused the Famine?', options: ['A bacterium', 'A water mould', 'A virus', 'A fungus only'], answer: 1 }, { q: 'Roughly how many died in the Famine?', options: ['100,000', '500,000', '1 million', '3 million'], answer: 2 }]
  },
  {
    id: 'h-fenian', era: '18th–19th C', title: 'Fenian Rising', period: '1867',
    summary: 'The Irish Republican Brotherhood keeps the physical-force tradition alive — barely.',
    detail: 'Founded in 1858, the IRB was a secret oath-bound republican organisation with strong American support among Famine emigrants. The 1867 rising was a fiasco — bad weather, infiltration, and arrests gutted it before it began. But Fenianism endured underground, eventually becoming the seedbed of 1916. The American wing, Clan na Gael, would fund Irish republicanism for over a century.',
    quiz: [{ q: 'What did "IRB" stand for?', options: ['Irish Royal Brigade', 'Irish Republican Brotherhood', 'Irish Resistance Body', 'Irish Reform Bureau'], answer: 1 }]
  },
  {
    id: 'h-landwar', era: '18th–19th C', title: 'The Land War', period: '1879–1882',
    summary: 'Parnell, Davitt, and the Land League force tenant rights from Westminster.',
    detail: 'Triggered by agricultural depression, the Land War combined parliamentary pressure (Parnell) and grassroots agitation (Michael Davitt’s Land League). It produced the "boycott" — the social shunning of Captain Charles Boycott, an unpopular agent in Mayo, gave English a new word — and ended with the Land Acts that gradually transferred ownership from absentee landlords to working tenants over the next 30 years.',
    quiz: [{ q: 'Where does the word "boycott" come from?', options: ['A type of Irish dance', 'An Irish town', 'Captain Charles Boycott', 'A Gaelic term'], answer: 2 }]
  },
  {
    id: 'h-homerule', era: 'Revolution', title: 'Third Home Rule Crisis', period: '1912–1914',
    summary: 'Ulster Volunteers and Irish Volunteers both arm; civil war is averted only by world war.',
    detail: 'The Third Home Rule Bill would grant Ireland its own parliament. Ulster Unionists, led by Edward Carson, signed the Solemn League and Covenant (some in their own blood) and formed the Ulster Volunteer Force. Nationalists countered with the Irish Volunteers. Both sides ran guns. World War I postponed Home Rule and froze the standoff — but only briefly.',
    quiz: [{ q: 'Who led Ulster opposition to Home Rule?', options: ['James Connolly', 'Edward Carson', 'John Redmond', 'Patrick Pearse'], answer: 1 }]
  },
  {
    id: 'h-easter', era: 'Revolution', title: 'Easter Rising', period: '24–29 April 1916',
    summary: 'Pearse and Connolly proclaim the Irish Republic from the GPO; the rising is crushed in six days.',
    detail: 'About 1,600 republicans seized buildings across Dublin, with the General Post Office as headquarters. Patrick Pearse read the Proclamation of the Irish Republic from the GPO steps. After six days of brutal urban fighting and shelling, the rebels surrendered. The Rising was deeply unpopular — until the British executed 16 leaders, including the wounded James Connolly, strapped to a chair to be shot. Public opinion swung overnight, transforming losers into martyrs.',
    quiz: [{ q: 'Where was the Proclamation of the Republic read in 1916?', options: ['Dublin Castle', 'The GPO', 'Trinity College', 'Kilmainham Gaol'], answer: 1 }, { q: 'What turned public opinion in favour of the rebels?', options: ['Their military success', 'The execution of the leaders', 'A papal blessing', 'A peace treaty'], answer: 1 }]
  },
  {
    id: 'h-warind', era: 'Revolution', title: 'War of Independence', period: '1919–1921',
    summary: 'Michael Collins runs an IRA guerrilla campaign while Sinn Féin sets up a counter-state.',
    detail: 'Sinn Féin, having swept the 1918 election, refused to sit at Westminster and convened the First Dáil in Dublin. The IRA, under Collins’s direction of intelligence, fought a guerrilla war against police and military. Britain deployed the brutal Black and Tans and Auxiliaries; Bloody Sunday (November 1920) saw Collins’s Squad assassinate British intelligence officers in the morning, and Crown forces fire into a Croke Park crowd in retaliation. A truce came in July 1921.',
    quiz: [{ q: 'Who directed IRA intelligence in the War of Independence?', options: ['Éamon de Valera', 'Michael Collins', 'Cathal Brugha', 'Arthur Griffith'], answer: 1 }]
  },
  {
    id: 'h-partition', era: 'Revolution', title: 'Government of Ireland Act', period: '1920',
    summary: 'The island is partitioned; Northern Ireland is created as a Unionist-majority state.',
    detail: 'Westminster’s solution to the Ulster question was to partition the island: six of Ulster’s nine counties became "Northern Ireland" with its own parliament at Stormont, the rest became "Southern Ireland" (which the war on the ground was making meaningless). The Boundary Commission promised to revisit the line later; in 1925 it quietly confirmed the existing border. Partition would prove more durable than anyone expected.',
    quiz: [{ q: 'How many counties form Northern Ireland?', options: ['Three', 'Six', 'Nine', 'Twelve'], answer: 1 }]
  },
  {
    id: 'h-treaty', era: 'Revolution', title: 'Anglo-Irish Treaty', period: 'December 1921',
    summary: 'Ireland becomes a Free State within the Empire; an oath of allegiance sparks the Civil War.',
    detail: 'After months of negotiation, Collins, Griffith, and the other Irish delegates signed a treaty creating the Irish Free State as a self-governing dominion (like Canada), with an oath of allegiance to the Crown and confirmed partition. Collins called it "the freedom to achieve freedom" and reputedly said he had signed his death warrant. The Dáil ratified it 64–57. De Valera walked out. The independence movement split.',
    quiz: [{ q: 'Who said the Treaty gave "the freedom to achieve freedom"?', options: ['Éamon de Valera', 'Michael Collins', 'Arthur Griffith', 'Erskine Childers'], answer: 1 }]
  },
  {
    id: 'h-civilwar', era: 'Revolution', title: 'Irish Civil War', period: '1922–1923',
    summary: 'Pro- and anti-Treaty IRA tear each other apart; Collins is killed at Béal na Bláth.',
    detail: 'The Free State, under British pressure, shelled the anti-Treaty IRA out of the Four Courts in June 1922. Conventional fighting was brief; an ugly guerrilla war followed across Munster. The Free State executed 77 anti-Treaty prisoners — more than the British had executed during the entire War of Independence. Collins was ambushed and killed in his native Cork in August 1922. De Valera ordered the IRA to "dump arms" in May 1923. The bitterness shaped Irish politics for generations.',
    quiz: [{ q: 'Where was Michael Collins killed?', options: ['Dublin', 'Béal na Bláth', 'Cork city', 'Killarney'], answer: 1 }]
  },
  {
    id: 'h-bunreacht', era: 'Modern Ireland', title: 'Bunreacht na hÉireann', period: '1937',
    summary: 'De Valera’s constitution renames the state Éire and asserts sovereignty short of a republic.',
    detail: 'Drafted under de Valera, the new constitution removed the King and Governor-General, claimed jurisdiction over the entire island (the controversial Articles 2 and 3, since amended in 1998), and gave a "special position" to the Catholic Church (removed by referendum in 1972). It is still the constitution today, amended over forty times by referendum, including for divorce, marriage equality, and abortion.',
    quiz: [{ q: 'What is "Bunreacht na hÉireann"?', options: ['The 1916 Proclamation', 'The Irish Constitution', 'The national anthem', 'A Celtic legal code'], answer: 1 }]
  },
  {
    id: 'h-republic', era: 'Modern Ireland', title: 'Republic of Ireland Act', period: '1949',
    summary: 'Ireland formally leaves the Commonwealth and declares itself a Republic.',
    detail: 'Passed under a coalition government led by John A. Costello, the Act severed the last legal ties to the Crown and the Commonwealth. Britain responded with the Ireland Act 1949, guaranteeing that Northern Ireland would not leave the UK without the consent of its parliament — entrenching partition further. The Republic remained neutral in the Cold War and developed an independent foreign policy at the UN.',
    quiz: [{ q: 'In what year did Ireland formally become a republic?', options: ['1922', '1937', '1949', '1973'], answer: 2 }]
  },
  {
    id: 'h-troubles', era: 'Modern Ireland', title: 'The Troubles', period: '1968–1998',
    summary: 'Thirty years of conflict in Northern Ireland kill around 3,500 people.',
    detail: 'A civil rights movement against discrimination in housing, jobs, and voting rights met state and loyalist violence in 1968–69. British troops were deployed; internment without trial in 1971 radicalised a generation. The Provisional IRA waged a long bombing and shooting campaign; loyalist paramilitaries (UVF, UDA) escalated in parallel. Around 3,500 died in a population of 1.5 million — proportionally equivalent to over half a million in Britain. Roughly half the dead were civilian.',
    quiz: [{ q: 'About how many people died in the Troubles?', options: ['350', '3,500', '35,000', '350,000'], answer: 1 }]
  },
  {
    id: 'h-bloodysunday', era: 'Modern Ireland', title: 'Bloody Sunday (Derry)', period: '30 January 1972',
    summary: 'British paratroopers shoot 26 unarmed civil rights marchers, killing 14.',
    detail: 'During a banned civil rights march in the Bogside, the Parachute Regiment opened fire on unarmed civilians, killing 13 outright; another died of wounds. The Widgery Tribunal whitewashed the killings; the 2010 Saville Inquiry, after twelve years of work, found the shootings "unjustified and unjustifiable." Prime Minister David Cameron formally apologised. The day is regarded as one of the IRA’s greatest recruiting successes.',
    quiz: [{ q: 'In what city did Bloody Sunday 1972 take place?', options: ['Belfast', 'Derry', 'Dublin', 'Armagh'], answer: 1 }]
  },
  {
    id: 'h-eec', era: 'Modern Ireland', title: 'Joining the EEC', period: '1973',
    summary: 'Ireland joins the European Economic Community alongside the UK and Denmark.',
    detail: 'EEC membership transformed Ireland economically. Common Agricultural Policy payments modernised farming; structural funds built infrastructure; access to the European market broke the dependence on Britain. By the 1990s Ireland had become a continental rather than purely Anglosphere economy, a shift that mattered when Brexit came along.',
    quiz: [{ q: 'When did Ireland join the EEC?', options: ['1949', '1973', '1992', '2002'], answer: 1 }]
  },
  {
    id: 'h-hunger', era: 'Modern Ireland', title: 'The Hunger Strikes', period: '1981',
    summary: 'Bobby Sands and nine others die in the Maze prison demanding political status.',
    detail: 'Republican prisoners had been protesting for political-prisoner status (the "blanket" and "dirty" protests). When that failed, Bobby Sands began a hunger strike on 1 March 1981. While starving, he was elected MP for Fermanagh-South Tyrone. He died on 5 May after 66 days. Nine more men died before the strike ended. Margaret Thatcher refused to budge: "Crime is crime is crime." Sinn Féin’s electoral rise — the political path to the peace process — began here.',
    quiz: [{ q: 'How many republican hunger strikers died in 1981?', options: ['One', 'Five', 'Ten', 'Twenty'], answer: 2 }]
  },
  {
    id: 'h-gfa', era: 'Modern Ireland', title: 'Good Friday Agreement', period: '10 April 1998',
    summary: 'Power-sharing, North-South cooperation, and decommissioning end most of the Troubles.',
    detail: 'Negotiated under US Senator George Mitchell with Tony Blair and Bertie Ahern as prime ministers, the Agreement created the Northern Ireland Assembly with mandatory cross-community power-sharing, North-South Ministerial bodies, and a British-Irish Council. Endorsed by referendum on both sides of the border (94% in the South, 71% in the North). John Hume and David Trimble shared the Nobel Peace Prize. The peace has held — fragilely, but it has held.',
    quiz: [{ q: 'Which US senator chaired the Good Friday talks?', options: ['Ted Kennedy', 'George Mitchell', 'Joe Biden', 'Bill Clinton'], answer: 1 }]
  },
  {
    id: 'h-marriage', era: 'Modern Ireland', title: 'Marriage Equality Referendum', period: '22 May 2015',
    summary: 'Ireland becomes the first country to legalise same-sex marriage by popular vote.',
    detail: 'On a turnout of over 60%, 62% voted Yes. The vote marked a generational shift in a country where homosexual acts had been illegal as recently as 1993. The campaign was notable for its emotional, conversational tone — Yes voters were urged to "ring your granny" — and for the visible support of the Irish diaspora, who flew home to vote.',
    quiz: [{ q: 'In what year did Ireland legalise same-sex marriage by referendum?', options: ['1993', '2005', '2015', '2018'], answer: 2 }]
  },
  {
    id: 'h-repeal', era: 'Modern Ireland', title: 'Repeal of the Eighth Amendment', period: '25 May 2018',
    summary: '66.4% vote to remove the constitutional ban on abortion.',
    detail: 'The Eighth Amendment, added in 1983, gave equal right-to-life status to the unborn and the mother, effectively banning abortion. Three decades of cases — most painfully Savita Halappanavar, who died in Galway in 2012 after being refused a termination during a miscarriage — eroded support. The 2018 referendum cleared the way for legislation permitting abortion within strict limits. Together with marriage equality, it marked the rapid secularisation of Irish public life.',
    quiz: [{ q: 'What did the Eighth Amendment do?', options: ['Banned divorce', 'Banned abortion in most cases', 'Banned the Irish language', 'Joined the EU'], answer: 1 }]
  },
  {
    id: 'h-brexit', era: 'Modern Ireland', title: 'Brexit & the NI Protocol', period: '2020',
    summary: 'The UK leaves the EU; the Northern Ireland Protocol keeps the land border invisible.',
    detail: 'Brexit reopened the border question that the Good Friday Agreement had quietened. The solution — the Northern Ireland Protocol, later modified by the Windsor Framework (2023) — keeps Northern Ireland inside the EU single market for goods, putting the customs border in the Irish Sea. This solved the land-border problem but enraged Unionists, and Stormont collapsed for two years. It is restored, for now.',
    quiz: [{ q: 'What does the NI Protocol do?', options: ['Removes the Irish border entirely', 'Keeps NI in the EU single market for goods', 'Reunifies Ireland', 'Abolishes Stormont'], answer: 1 }]
  }
];

// ============================================================================
// DATA: Irish Mythology & Folklore
// ============================================================================
const MYTH = [
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
];

// ============================================================================
// HELPERS
// ============================================================================
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildQuizPool = (entries) => {
  const pool = [];
  entries.forEach((e) => {
    (e.quiz || []).forEach((q) => pool.push({ ...q, source: e.title }));
  });
  return pool;
};

// Small ornamental Celtic knot SVG
const KnotIcon = ({ size = 28, color = '#A67C3A' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 8c8 8 8 16 0 24S16 40 16 48s8 8 16 0 16-16 16-16-8-16-16-16-16 8-16 16 8 16 16 16" opacity="0.75" />
    <circle cx="32" cy="32" r="3" fill={color} />
  </svg>
);

const Divider = () => (
  <div className="flex items-center justify-center my-4" aria-hidden>
    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #A67C3A, transparent)' }} />
    <span className="mx-3" style={{ color: '#A67C3A', fontSize: '0.9rem' }}>❦</span>
    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #A67C3A, transparent)' }} />
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function IrishStudies() {
  const [moduleKey, setModuleKey] = useState('history'); // 'history' | 'myth'
  const [mode, setMode] = useState('browse'); // 'browse' | 'cards' | 'quiz'

  const entries = moduleKey === 'history' ? HISTORY : MYTH;
  const groupKey = moduleKey === 'history' ? 'era' : 'cycle';

  // Group entries
  const grouped = useMemo(() => {
    const m = new Map();
    entries.forEach((e) => {
      const k = e[groupKey];
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(e);
    });
    return Array.from(m.entries());
  }, [entries, groupKey]);

  const groupNames = useMemo(() => ['All', ...grouped.map(([k]) => k)], [grouped]);

  // Flashcard state
  const [cardFilter, setCardFilter] = useState('All');
  const [cardOrder, setCardOrder] = useState(() => entries.map((_, i) => i));
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Reset cards when module changes
  useEffect(() => {
    setCardFilter('All');
    setCardIdx(0);
    setFlipped(false);
    setCardOrder(entries.map((_, i) => i));
  }, [moduleKey]); // eslint-disable-line

  const filteredCards = useMemo(() => {
    if (cardFilter === 'All') return entries;
    return entries.filter((e) => e[groupKey] === cardFilter);
  }, [cardFilter, entries, groupKey]);

  const currentCard = filteredCards[cardIdx % filteredCards.length] || filteredCards[0];

  const nextCard = () => { setFlipped(false); setCardIdx((i) => (i + 1) % filteredCards.length); };
  const prevCard = () => { setFlipped(false); setCardIdx((i) => (i - 1 + filteredCards.length) % filteredCards.length); };
  const shuffleCards = () => { setFlipped(false); setCardIdx(0); /* using Math.random in render is fine */ };

  // Quiz state
  const [quizQs, setQuizQs] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    const pool = buildQuizPool(entries);
    const picked = shuffle(pool).slice(0, Math.min(10, pool.length)).map((q) => {
      // Shuffle options, remap answer
      const indexed = q.options.map((opt, i) => ({ opt, isAnswer: i === q.answer }));
      const shuf = shuffle(indexed);
      return {
        q: q.q,
        options: shuf.map((s) => s.opt),
        answer: shuf.findIndex((s) => s.isAnswer),
        source: q.source,
      };
    });
    setQuizQs(picked);
    setQIdx(0);
    setChosen(null);
    setScore(0);
    setQuizDone(false);
    setQuizStarted(true);
  };

  const submitChoice = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === quizQs[qIdx].answer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (qIdx + 1 >= quizQs.length) {
      setQuizDone(true);
    } else {
      setQIdx((i) => i + 1);
      setChosen(null);
    }
  };

  // Reset quiz when module changes
  useEffect(() => {
    setQuizStarted(false);
    setQuizDone(false);
    setQuizQs([]);
  }, [moduleKey]);

  // Browse: expanded id
  const [expandedId, setExpandedId] = useState(null);

  // ---------- STYLES ----------
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
    .font-display { font-family: 'Cinzel', serif; letter-spacing: 0.05em; }
    .font-body { font-family: 'EB Garamond', serif; }
    .font-italic-serif { font-family: 'Cormorant Garamond', serif; font-style: italic; }
    .parchment {
      background-color: #F1E7CE;
      background-image:
        radial-gradient(at 20% 30%, rgba(166,124,58,0.07) 0, transparent 50%),
        radial-gradient(at 80% 20%, rgba(107,45,45,0.05) 0, transparent 50%),
        radial-gradient(at 50% 90%, rgba(44,74,53,0.06) 0, transparent 50%);
    }
    .ink { color: #2A1F14; }
    .ink-soft { color: #5A4632; }
    .gold { color: #A67C3A; }
    .green { color: #2C4A35; }
    .wine { color: #6B2D2D; }
    .bg-green { background-color: #2C4A35; }
    .bg-wine { background-color: #6B2D2D; }
    .bg-gold { background-color: #A67C3A; }
    .bg-cream { background-color: #F7EFD8; }
    .border-gold { border-color: #A67C3A; }
    .border-green { border-color: #2C4A35; }
    .border-ink { border-color: #2A1F14; }
    .drop-cap::first-letter {
      font-family: 'Cinzel', serif;
      font-size: 3.2em;
      float: left;
      line-height: 0.85;
      padding: 0.05em 0.08em 0 0;
      color: #6B2D2D;
      font-weight: 600;
    }
    .card-3d { perspective: 1400px; }
    .card-inner {
      transform-style: preserve-3d;
      transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    .card-inner.flipped { transform: rotateY(180deg); }
    .card-face {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      position: absolute; inset: 0;
    }
    .card-back { transform: rotateY(180deg); }
    .tab-btn {
      transition: all 0.25s ease;
      position: relative;
    }
    .tab-btn.active::after {
      content: '';
      position: absolute;
      left: 20%; right: 20%; bottom: -2px;
      height: 2px;
      background: #6B2D2D;
    }
    .quiz-opt {
      transition: all 0.18s ease;
    }
    .quiz-opt:hover:not(:disabled) {
      transform: translateX(4px);
      background-color: #F7EFD8;
    }
    .fade-in { animation: fadeIn 0.45s ease both; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to {opacity:1; transform:none;} }
  `;

  return (
    <div className="parchment min-h-screen w-full font-body ink">
      <style>{styles}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">

        {/* ---------- HEADER ---------- */}
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <KnotIcon size={32} color="#6B2D2D" />
            <KnotIcon size={36} color="#A67C3A" />
            <KnotIcon size={32} color="#2C4A35" />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold green" style={{ letterSpacing: '0.08em' }}>
            ÉIRE
          </h1>
          <p className="font-italic-serif text-lg sm:text-xl ink-soft mt-1">
            Stair, Miotaseolaíocht &amp; Béaloideas
          </p>
          <p className="text-sm sm:text-base ink-soft mt-1">
            History, Mythology &amp; Folklore — a homeschool elective
          </p>
          <Divider />
        </header>

        {/* ---------- MODULE SWITCHER ---------- */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4 justify-center">
          {[
            { key: 'history', label: 'Irish History', subtitle: 'Stair na hÉireann' },
            { key: 'myth', label: 'Myth & Folklore', subtitle: 'Miotaseolaíocht' },
          ].map(({ key, label, subtitle }) => (
            <button
              key={key}
              onClick={() => setModuleKey(key)}
              className="px-5 py-3 rounded-sm border-2 font-display text-sm sm:text-base"
              style={{
                background: moduleKey === key ? '#2C4A35' : 'transparent',
                color: moduleKey === key ? '#F7EFD8' : '#2C4A35',
                borderColor: '#2C4A35',
                letterSpacing: '0.1em',
              }}
            >
              <div>{label}</div>
              <div className="text-xs font-italic-serif opacity-75 normal-case" style={{ letterSpacing: 0 }}>
                {subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* ---------- MODE TABS ---------- */}
        <div className="flex justify-center gap-1 sm:gap-3 mb-6 border-b" style={{ borderColor: '#A67C3A66' }}>
          {[
            { key: 'browse', label: 'Read' },
            { key: 'cards', label: 'Flashcards' },
            { key: 'quiz', label: 'Quiz' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`tab-btn font-display px-4 sm:px-6 py-2 text-sm sm:text-base ${mode === key ? 'active wine' : 'ink-soft'}`}
              style={{ letterSpacing: '0.15em' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ---------- BROWSE MODE ---------- */}
        {mode === 'browse' && (
          <div className="fade-in">
            {grouped.map(([groupName, items]) => (
              <section key={groupName} className="mb-8">
                <h2 className="font-display text-xl sm:text-2xl wine mb-1" style={{ letterSpacing: '0.08em' }}>
                  {groupName}
                </h2>
                <div className="h-px mb-4" style={{ background: 'linear-gradient(to right, #A67C3A, transparent)' }} />
                <div className="space-y-3">
                  {items.map((e) => {
                    const open = expandedId === e.id;
                    return (
                      <article
                        key={e.id}
                        className="bg-cream border-gold border rounded-sm overflow-hidden"
                        style={{ borderWidth: '1px', boxShadow: '0 1px 2px rgba(42,31,20,0.06)' }}
                      >
                        <button
                          onClick={() => setExpandedId(open ? null : e.id)}
                          className="w-full text-left px-4 sm:px-5 py-3 flex justify-between items-start gap-3 hover:bg-opacity-70"
                        >
                          <div>
                            <div className="font-display text-base sm:text-lg green" style={{ letterSpacing: '0.04em' }}>
                              {e.title}
                            </div>
                            <div className="font-italic-serif ink-soft text-sm">{e.period}</div>
                          </div>
                          <span className="gold text-xl pt-1" aria-hidden>{open ? '−' : '+'}</span>
                        </button>
                        {open && (
                          <div className="px-4 sm:px-5 pb-4 fade-in">
                            <p className="font-italic-serif ink-soft mb-2 text-sm sm:text-base">{e.summary}</p>
                            <p className="drop-cap text-base sm:text-lg leading-relaxed">{e.detail}</p>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ---------- FLASHCARD MODE ---------- */}
        {mode === 'cards' && (
          <div className="fade-in">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 justify-center mb-5">
              {groupNames.map((g) => (
                <button
                  key={g}
                  onClick={() => { setCardFilter(g); setCardIdx(0); setFlipped(false); }}
                  className="px-3 py-1 text-xs sm:text-sm rounded-full border font-display"
                  style={{
                    borderColor: '#A67C3A',
                    background: cardFilter === g ? '#6B2D2D' : 'transparent',
                    color: cardFilter === g ? '#F7EFD8' : '#6B2D2D',
                    letterSpacing: '0.08em',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>

            {currentCard && (
              <>
                <div className="text-center font-italic-serif ink-soft mb-3 text-sm">
                  Card {cardIdx + 1} of {filteredCards.length} · Tap card to flip
                </div>

                <div
                  className="card-3d w-full mx-auto cursor-pointer select-none"
                  style={{ maxWidth: '640px', height: '380px' }}
                  onClick={() => setFlipped((f) => !f)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setFlipped((f) => !f); }}
                >
                  <div className={`card-inner w-full h-full ${flipped ? 'flipped' : ''}`}>
                    {/* FRONT */}
                    <div
                      className="card-face bg-cream border-2 border-gold rounded-sm flex flex-col items-center justify-center p-6 sm:p-10 text-center"
                      style={{ boxShadow: '0 6px 20px rgba(42,31,20,0.12)' }}
                    >
                      <div className="font-italic-serif gold text-xs sm:text-sm uppercase mb-2" style={{ letterSpacing: '0.2em' }}>
                        {currentCard[groupKey]}
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl green mb-2" style={{ letterSpacing: '0.06em' }}>
                        {currentCard.title}
                      </h3>
                      <div className="font-italic-serif ink-soft text-base sm:text-lg mb-5">
                        {currentCard.period}
                      </div>
                      <KnotIcon size={26} color="#A67C3A" />
                      <div className="mt-5 font-italic-serif ink-soft text-sm">
                        Tap to reveal
                      </div>
                    </div>
                    {/* BACK */}
                    <div
                      className="card-face card-back bg-cream border-2 border-green rounded-sm p-5 sm:p-7 overflow-y-auto"
                      style={{ boxShadow: '0 6px 20px rgba(42,31,20,0.12)' }}
                    >
                      <h3 className="font-display text-lg sm:text-xl wine mb-2" style={{ letterSpacing: '0.05em' }}>
                        {currentCard.title}
                      </h3>
                      <p className="font-italic-serif ink-soft text-sm mb-3">{currentCard.summary}</p>
                      <p className="text-sm sm:text-base leading-relaxed">{currentCard.detail}</p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-3 mt-6">
                  <button
                    onClick={prevCard}
                    className="px-4 py-2 border border-gold gold font-display text-sm hover:bg-cream"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => { setCardOrder(shuffle(cardOrder)); setCardIdx(0); setFlipped(false); }}
                    className="px-4 py-2 border border-wine wine font-display text-sm hover:bg-cream"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    Shuffle
                  </button>
                  <button
                    onClick={nextCard}
                    className="px-4 py-2 bg-green text-white font-display text-sm"
                    style={{ letterSpacing: '0.1em', color: '#F7EFD8' }}
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ---------- QUIZ MODE ---------- */}
        {mode === 'quiz' && (
          <div className="fade-in">
            {!quizStarted && (
              <div className="text-center py-10 max-w-xl mx-auto">
                <KnotIcon size={48} color="#6B2D2D" />
                <h2 className="font-display text-2xl sm:text-3xl green mt-4 mb-3" style={{ letterSpacing: '0.08em' }}>
                  Tástáil — Test Your Knowledge
                </h2>
                <p className="font-italic-serif ink-soft mb-6 text-base sm:text-lg">
                  Ten random questions drawn from the {moduleKey === 'history' ? 'history' : 'mythology'} module.
                  Take it as many times as you like — questions and answer order are reshuffled each round.
                </p>
                <button
                  onClick={startQuiz}
                  className="px-6 py-3 bg-wine font-display text-base"
                  style={{ color: '#F7EFD8', letterSpacing: '0.15em' }}
                >
                  Begin Quiz
                </button>
              </div>
            )}

            {quizStarted && !quizDone && quizQs[qIdx] && (
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4 font-italic-serif ink-soft text-sm">
                  <span>Question {qIdx + 1} of {quizQs.length}</span>
                  <span>Score: {score}</span>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-cream mb-6 rounded-full overflow-hidden border border-gold">
                  <div
                    className="h-full bg-green transition-all duration-500"
                    style={{ width: `${((qIdx) / quizQs.length) * 100}%` }}
                  />
                </div>

                <h3 className="font-display text-lg sm:text-xl green mb-5 leading-snug" style={{ letterSpacing: '0.04em' }}>
                  {quizQs[qIdx].q}
                </h3>

                <div className="space-y-3">
                  {quizQs[qIdx].options.map((opt, i) => {
                    const isCorrect = i === quizQs[qIdx].answer;
                    const isChosen = chosen === i;
                    let bg = '#F7EFD8';
                    let border = '#A67C3A';
                    let txt = '#2A1F14';
                    if (chosen !== null) {
                      if (isCorrect) { bg = '#2C4A35'; border = '#2C4A35'; txt = '#F7EFD8'; }
                      else if (isChosen) { bg = '#6B2D2D'; border = '#6B2D2D'; txt = '#F7EFD8'; }
                    }
                    return (
                      <button
                        key={i}
                        disabled={chosen !== null}
                        onClick={() => submitChoice(i)}
                        className="quiz-opt block w-full text-left px-4 py-3 border-2 font-body text-base sm:text-lg"
                        style={{ background: bg, borderColor: border, color: txt }}
                      >
                        <span className="font-display gold mr-3" style={{ color: chosen !== null && (isCorrect || isChosen) ? '#F7EFD8' : '#A67C3A' }}>
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {chosen !== null && (
                  <div className="mt-5 fade-in">
                    <p className="font-italic-serif text-base mb-3">
                      {chosen === quizQs[qIdx].answer ? (
                        <span className="green">✓ Correct.</span>
                      ) : (
                        <span className="wine">✗ Not this time. The answer was {String.fromCharCode(65 + quizQs[qIdx].answer)}.</span>
                      )}
                      {' '}
                      <span className="ink-soft">From: <em>{quizQs[qIdx].source}</em></span>
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="px-5 py-2 bg-green font-display text-sm"
                      style={{ color: '#F7EFD8', letterSpacing: '0.1em' }}
                    >
                      {qIdx + 1 >= quizQs.length ? 'See Results' : 'Next Question →'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {quizDone && (
              <div className="text-center max-w-xl mx-auto py-8 fade-in">
                <KnotIcon size={56} color="#A67C3A" />
                <h2 className="font-display text-3xl green mt-4 mb-2" style={{ letterSpacing: '0.08em' }}>
                  {score === quizQs.length ? 'Slán go fóill!' : score >= 7 ? 'Maith thú!' : score >= 4 ? 'Go maith.' : 'Triail eile?'}
                </h2>
                <p className="font-italic-serif ink-soft text-lg mb-1">
                  {score === quizQs.length ? 'Perfect score!' : score >= 7 ? 'Well done!' : score >= 4 ? 'A good effort.' : 'Try again?'}
                </p>
                <div className="font-display text-5xl wine my-5" style={{ letterSpacing: '0.05em' }}>
                  {score} / {quizQs.length}
                </div>
                <button
                  onClick={startQuiz}
                  className="px-6 py-3 bg-wine font-display text-base mr-2"
                  style={{ color: '#F7EFD8', letterSpacing: '0.12em' }}
                >
                  Take Again
                </button>
                <button
                  onClick={() => { setMode('browse'); setQuizStarted(false); setQuizDone(false); }}
                  className="px-6 py-3 border-2 border-green green font-display text-base"
                  style={{ letterSpacing: '0.12em' }}
                >
                  Back to Reading
                </button>
              </div>
            )}
          </div>
        )}

        <Divider />
        <footer className="text-center font-italic-serif ink-soft text-xs sm:text-sm pb-4">
          Le grá ó Mullingar · For the Siler family
        </footer>
      </div>
    </div>
  );
}
