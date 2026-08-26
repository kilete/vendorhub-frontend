/* =========================================================================
   VendorHub — Site-wide i18n engine
   Languages: English (en) · Nigerian Pidgin (pcm) · Yorùbá (yo) · Hausa (ha) · Igbo (ig)

   HOW IT WORKS
   ------------
   Instead of tagging every element with data-i18n keys, this engine translates
   by SOURCE TEXT. It walks the DOM, and any text node / placeholder / title /
   aria-label / alt / button value whose English text is in the dictionary below
   is swapped for the chosen language.

   A MutationObserver keeps watching the page, so text rendered later by
   JavaScript (store cards, product grids, order tables, chat, alerts, empty
   states, modals...) is translated the moment it appears — on every page.

   The original English is remembered per node, so switching languages back and
   forth always works and never double-translates.

   ADDING A NEW STRING:  add  "English text": ["pidgin", "yoruba", "hausa", "igbo"]
   ADDING A NEW LANGUAGE: add its code to VH_LANGS and add one more slot to
   every row (keep the same order as VH_ORDER).
   ========================================================================= */

(function (global) {
  'use strict';

  var VH_LANGS = { en: "English", pcm: "Pidgin", yo: "Yorùbá", ha: "Hausa", ig: "Igbo" };
  var VH_ORDER = ["pcm", "yo", "ha", "ig"]; // order of the arrays below

  /* ---------------------------------------------------------------------
     DICTIONARY   "English"  :  [ Pidgin, Yorùbá, Hausa, Igbo ]
     --------------------------------------------------------------------- */
  var VH_DICT = {


    /* ============ BACKEND API MESSAGES ============ */
    "Access denied": ["You no get access", "A kò fún ọ ní àyè", "Ba a ba ka damar shiga ba", "A jụ́ ịbanye"],
    "Access denied. Insufficient permissions.": ["You no get permission for this.", "A kò fún ọ ní àṣẹ tó tó.", "Ba ka da isasshen izini ba.", "Ị nweghị ikike zuru ezu."],
    "Access denied. No token provided.": ["Access denied. You no provide token.", "A kò fún ọ ní àyè. O kò pèsè token.", "An hana shiga. Ba ka bayar da token ba.", "Ajụrụ ịbanye. I nyeghị token."],
    "Business and items required": ["Business and goods dey required", "A nílò òwò àti ọjà", "Ana buƙatar kasuwanci da kaya", "Achọrọ azụmahịa na ngwaahịa"],
    "Business not found": ["We no find the business", "A kò rí òwò náà", "Ba a sami kasuwancin ba", "Ahụghị azụmahịa ahụ"],
    "Could not load bank list": ["We no fit load bank list", "A kò lè gbé àkójọ báǹkì wọlé", "Ba a iya loda jerin bankuna ba", "Enweghị ike ibudata ndepụta ụlọ akụ"],
    "Could not start payment. Please try again.": ["We no fit start payment. Abeg try again.", "A kò lè bẹ̀rẹ̀ ìsanwó. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kansí.", "Ba a iya fara biyan kuɗi ba. Da fatan za a sake gwadawa.", "Enweghị ike ịmalite ịkwụ ụgwọ. Biko nwaa ọzọ."],
    "Email or username already exists": ["Email or username don already exist", "Ímeèlì tàbí orúkọ ìlò ti wà tẹ́lẹ̀", "Imel ko sunan mai amfani ya riga ya kasance", "Email ma ọ bụ aha njirimara adịlarị"],
    "Invalid email or password": ["Email or password no correct", "Ímeèlì tàbí ọ̀rọ̀ aṣínà kò tọ́", "Imel ko kalmar sirri ba daidai ba ce", "Email ma ọ bụ okwuntughe ezighi ezi"],
    "Invalid payment status": ["Payment status no correct", "Ipò ìsanwó kò tọ́", "Matsayin biyan kuɗi ba daidai ba ne", "Ọnọdụ ịkwụ ụgwọ ezighi ezi"],
    "Invalid status": ["Status no correct", "Ipò kò tọ́", "Matsayi ba daidai ba ne", "Ọnọdụ ezighi ezi"],
    "Invalid token": ["Token no correct", "Token kò tọ́", "Token ba daidai ba ne", "Token ezighi ezi"],
    "Login successful": ["You don login successfully", "Ìwọlé yọrí sí rere", "An shiga cikin nasara", "Ịbanye gara nke ọma"],
    "Marked as read": ["We mark am as read", "A ti samisi rẹ̀ gẹ́gẹ́ bí a ti kà á", "An sanya shi a matsayin an karanta", "Edenyela ya dị ka agụpụtara"],
    "Message content is required": ["You need add message", "A nílò àkóónú ìfiránṣẹ́", "Ana buƙatar saƙon", "Achọrọ ọdịnaya ozi"],
    "Message sent": ["Message don send", "A ti ránṣẹ́ náà", "An aika saƙon", "E zipula ozi"],
    "Name and price are required": ["Name and price dey required", "A nílò orúkọ àti owó", "Ana buƙatar suna da farashi", "Achọrọ aha na ọnụahịa"],
    "No image file provided": ["You no provide image", "O kò pèsè fáìlì àwòrán", "Ba ka bayar da fayil ɗin hoto ba", "I nyeghị faịlụ onyonyo"],
    "One or more items out of stock": ["One or more goods don finish", "Ọ̀kan tàbí jù bẹ́ẹ̀ lọ nínú ọjà kò sí", "Ɗaya ko fiye da kaya sun ƙare", "Otu ma ọ bụ karịa n'ime ihe adịghị n'ahịa"],
    "One or more products are unavailable": ["One or more goods no dey available", "Ọ̀kan tàbí jù bẹ́ẹ̀ lọ nínú ọjà kò sí ní ìpèsè", "Ɗaya ko fiye da kayayyaki ba sa nan", "Otu ma ọ bụ karịa ngwaahịa adịghị"],
    "One or more products not found": ["We no find one or more goods", "A kò rí ọ̀kan tàbí jù bẹ́ẹ̀ lọ nínú ọjà", "Ba a sami kaya ɗaya ko fiye ba", "Ahụghị otu ma ọ bụ karịa ngwaahịa"],
    "Only vendors or the ordering customer can message on an order": ["Na seller or the customer wey order fit message for this order", "Oníṣòwò tàbí oníbàárà tó paṣẹ̀ nìkan ló lè fi ìfiránṣẹ́ ránṣẹ́ lórí àṣẹ", "Mai sayarwa ko abokin cinikin da ya yi oda ne kaɗai za su iya aika saƙo kan oda", "Naanị onye ahịa ma ọ bụ onye zụrụ ihe nwere ike izipu ozi gbasara ndabere"],
    "Order confirmed. SMS tracking link sent.": ["Order don confirm. We don send SMS tracking link.", "A ti jẹ́rìí sí àṣẹ. A ti fi ọ̀nà ìbójútó SMS ránṣẹ́.", "An tabbatar da oda. An aika hanyar bibiya ta SMS.", "A kwadoro ndabere. E zigala njikọ nsochi SMS."],
    "Order not found. Check your order code and phone number.": ["We no find the order. Check your order code and phone number.", "A kò rí àṣẹ náà. Ṣàyẹ̀wò kóòdù àṣẹ àti nọ́mbà fóònù rẹ.", "Ba a sami odar ba. Duba lambar odarka da lambar wayarka.", "Ahụghị ndabere ahụ. Lelee koodu ndabere na nọmba ekwentị gị."],
    "Order ready for confirmation": ["Order don ready for confirmation", "Àṣẹ ti ṣetán fún ìmúdájú", "Oda ya shirya don tabbatarwa", "Ndabere adịla njikere maka nkwenye"],
    "Order status updated successfully": ["Order status don update well well", "A ti ṣe àṣeyọrí ìmúdójúìwọ̀n ipò àṣẹ", "An sabunta matsayin oda cikin nasara", "Emelitela ọnọdụ ndabere nke ọma"],
    "Phone number is required": ["Phone number dey required", "A nílò nọ́mbà fóònù", "Ana buƙatar lambar waya", "Achọrọ nọmba ekwentị"],
    "Phone number required for verification": ["We need phone number to verify am", "A nílò nọ́mbà fóònù fún ìmúdájú", "Ana buƙatar lambar waya don tabbatarwa", "Achọrọ nọmba ekwentị maka nkwenye"],
    "Phone number, business, items, and delivery address are required": ["Phone number, business, goods, and delivery address dey required", "A nílò nọ́mbà fóònù, òwò, ọjà, àti àdírẹ́sì ìfijíṣẹ́", "Ana buƙatar lambar waya, kasuwanci, kaya, da adireshin isarwa", "Achọrọ nọmba ekwentị, azụmahịa, ngwaahịa na adreesị nnyefe"],
    "Please provide all required fields": ["Abeg fill all the required spaces", "Jọ̀wọ́ pèsè gbogbo àwọn ààyè tó ṣe pàtàkì", "Da fatan cika dukkan wuraren da ake buƙata", "Biko dejupụta mpaghara niile achọrọ"],
    "Please provide email and password": ["Abeg provide email and password", "Jọ̀wọ́ pèsè ímeèlì àti ọ̀rọ̀ aṣínà", "Da fatan bayar da imel da kalmar sirri", "Biko nye email na okwuntughe"],
    "Product ID and quantity change are required": ["Product ID and quantity change dey required", "A nílò ID ọjà àti ìyípadà iye", "Ana buƙatar ID na kaya da canjin adadi", "Achọrọ ID ngwaahịa na mgbanwe ọnụọgụ"],
    "Product added successfully": ["Product don add successfully", "A ti fi ọjà kún un ní àṣeyọrí", "An ƙara kaya cikin nasara", "Agbakwunyela ngwaahịa nke ọma"],
    "Product deleted successfully": ["Product don delete successfully", "A ti pa ọjà rẹ́ ní àṣeyọrí", "An goge kaya cikin nasara", "Ehichapụla ngwaahịa nke ọma"],
    "Product not found": ["We no find the product", "A kò rí ọjà náà", "Ba a sami kayan ba", "Ahụghị ngwaahịa ahụ"],
    "Product updated successfully": ["Product don update successfully", "A ti ṣe àṣeyọrí ìmúdójúìwọ̀n ọjà", "An sabunta kaya cikin nasara", "Emelitela ngwaahịa nke ọma"],
    "Profile updated successfully": ["Profile don update successfully", "A ti ṣe àṣeyọrí ìmúdójúìwọ̀n profáìlì", "An sabunta bayanan martaba cikin nasara", "Emelitela profaịlụ nke ọma"],
    "Server error": ["Server get problem", "Àṣìṣe sẹ́fà", "Matsalar uwar garke", "Nsogbu sava"],
    "Server error during login": ["Server get problem while you dey login", "Àṣìṣe sẹ́fà nígbà ìwọlé", "Matsalar uwar garke yayin shiga", "Nsogbu sava mgbe ị na-abanye"],
    "Server error during registration": ["Server get problem while registering", "Àṣìṣe sẹ́fà nígbà ìforúkọsílẹ̀", "Matsalar uwar garke yayin rajista", "Nsogbu sava mgbe ị na-edebanye aha"],
    "Server error loading banks": ["Server get problem while loading banks", "Àṣìṣe sẹ́fà nígbà gbígbé àwọn báǹkì wọlé", "Matsalar uwar garke yayin loda bankuna", "Nsogbu sava mgbe a na-ebudata ụlọ akụ"],
    "Server error starting payment": ["Server get problem while starting payment", "Àṣìṣe sẹ́fà nígbà bẹ̀rẹ̀ ìsanwó", "Matsalar uwar garke yayin fara biyan kuɗi", "Nsogbu sava mgbe ịmalite ịkwụ ụgwọ"],
    "Stock adjusted successfully": ["Stock don adjust successfully", "A ti ṣàtúnṣe iye ọjà ní àṣeyọrí", "An daidaita kaya cikin nasara", "Haziela ihe dị n'ahịa nke ọma"],
    "Store not found": ["We no find the shop", "A kò rí ilé-ìtajà náà", "Ba a sami shagon ba", "Ahụghị ụlọ ahịa ahụ"],
    "This order has already been paid for": ["Dem don pay for this order already", "A ti san owó àṣẹ yìí tẹ́lẹ̀", "An riga an biya wannan oda", "Akwụọla ụgwọ maka ndabere a"],
    "This order was paid through Flutterwave and cannot be manually reverted": ["Dem pay for this order through Flutterwave, so you no fit change am back by hand", "A san owó àṣẹ yìí nípasẹ̀ Flutterwave, kò sì ṣeé dá a padà pẹ̀lú ọwọ́", "An biya wannan oda ta Flutterwave, ba za a iya mayar da shi da hannu ba", "Akwụụrụ ụgwọ ndabere a site na Flutterwave, enweghị ike ịgbanwe ya azụ n'aka"],
    "Upload failed. Please try again.": ["Upload no work. Abeg try again.", "Ìgbésókè kùnà. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kansí.", "Loda ya gaza. Da fatan za a sake gwadawa.", "Bulite ya dara. Biko nwaa ọzọ."],
    "User registered successfully": ["You don register successfully", "A ti forúkọsílẹ̀ rẹ ní àṣeyọrí", "An yi rajista cikin nasara", "Debanyela aha nke ọma"],
    "Vendor approved successfully": ["Seller don approve successfully", "A ti fọwọ́sí oníṣòwò náà ní àṣeyọrí", "An amince da mai sayarwar cikin nasara", "A kwadoro onye na-ere ahịa nke ọma"],
    "Vendor not found": ["We no find the seller", "A kò rí oníṣòwò náà", "Ba a sami mai sayarwar ba", "Ahụghị onye na-ere ahịa ahụ"],
    "Vendor rejected successfully": ["Seller don reject successfully", "A ti kọ oníṣòwò náà ní àṣeyọrí", "An ƙi mai sayarwar cikin nasara", "A ƙaghị onye na-ere ahịa ahụ nke ọma"],
    "order_code and phone are required": ["order code and phone dey required", "A nílò kóòdù àṣẹ àti nọ́mbà fóònù", "Ana buƙatar lambar oda da waya", "Achọrọ koodu ndabere na ekwentị"],
    "order_code and phone_number are required": ["order code and phone number dey required", "A nílò kóòdù àṣẹ àti nọ́mbà fóònù", "Ana buƙatar lambar oda da lambar waya", "Achọrọ koodu ndabere na nọmba ekwentị"],
    "Profile saved, but automatic Flutterwave payouts couldn't be set up — double check your bank details, or contact support.": ["Profile save, but automatic Flutterwave payout no set. Check your bank details or contact support.", "A ti pamọ́ profáìlì, ṣùgbọ́n a kò lè ṣètò ìsanwó Flutterwave fúnra rẹ̀ — tún ṣàyẹ̀wò àlàyé báǹkì rẹ tàbí kàn sí àtìlẹ́yìn.", "An adana bayanan martaba, amma ba a iya saita biyan Flutterwave ta atomatik ba — sake duba bayanan bankinka ko tuntuɓi tallafi.", "Echekwara profaịlụ, mana enweghị ike ịhazi ịkwụ ụgwọ Flutterwave na-akpaghị aka — lelee nkọwa ụlọ akụ gị ọzọ ma ọ bụ kpọtụrụ nkwado."],


    /* ============ ADMIN DASHBOARD ============ */
    "Admin Dashboard": ["Admin Dashboard", "Dásíbọ́ọ̀dù Alábòójútó", "Dashboard Mai Gudanarwa", "Dashboard Onye Nchịkwa"],
    "Review vendor applications and approve stores for the public marketplace.": ["Check seller applications and approve shops for everybody to see.", "Ṣàyẹ̀wò àwọn ìbéèrè oníṣòwò kí o sì fọwọ́sí àwọn ilé-ìtajà fún ọjà gbogbo ènìyàn.", "Duba buƙatun masu sayarwa kuma amince da shaguna don kasuwar jama'a.", "Nyochaa arịrịọ ndị na-ere ahịa ma kwado ụlọ ahịa maka ahịa ọha."] ,
    "Total Vendors": ["All Sellers", "Àpapọ̀ Àwọn Oníṣòwò", "Jimlar Masu Sayarwa", "Ngụkọta Ndị Na-ere Ahịa"],
    "Pending Vendors": ["Sellers Wey Dey Wait", "Àwọn Oníṣòwò Tí Ń Dúró", "Masu Sayarwa Masu Jira", "Ndị Na-ere Ahịa Na-eche"],
    "Vendor Applications": ["Seller Applications", "Àwọn Ìbéèrè Oníṣòwò", "Buƙatun Masu Sayarwa", "Arịrịọ Ndị Na-ere Ahịa"],
    "Approved vendors appear in Browse Stores.": ["Approved sellers go show for Browse Stores.", "Àwọn oníṣòwò tí a fọwọ́sí yóò hàn nínú Wo Àwọn Ilé-Ìtajà.", "Masu sayarwa da aka amince da su za su bayyana a Duba Shaguna.", "Ndị na-ere ahịa a kwadoro ga-apụta na Lelee Ụlọ Ahịa."] ,
    "Refresh": ["Reload", "Tún Gbé Wọlé", "Sake Loda", "Bugharịa Ọzọ"],
    "Approved": ["Approved", "A Fọwọ́sí", "An Amince", "A Kwadoro"],
    "Rejected": ["Rejected", "A Kọ̀", "An Ƙi", "A Jụrụ"],
    "All Vendors": ["All Sellers", "Gbogbo Àwọn Oníṣòwò", "Dukkan Masu Sayarwa", "Ndị Na-ere Ahịa Niile"],
    "Business": ["Business", "Òwò", "Kasuwanci", "Azụmahịa"],
    "Owner": ["Owner", "Oní", "Mai Shi", "Onye Nwe Ya"],
    "Loading vendors...": ["Sellers dey load...", "Ń gbé àwọn oníṣòwò wọlé...", "Ana loda masu sayarwa...", "Na-ebudata ndị na-ere ahịa..."],

    "Review vendor applications and approve stores for the public marketplace": ["Check seller applications and approve shops for everybody to see.", "Ṣàyẹ̀wò àwọn ìbéèrè oníṣòwò kí o sì fọwọ́sí àwọn ilé-ìtajà fún ọjà gbogbo ènìyàn.", "Duba buƙatun masu sayarwa kuma amince da shaguna don kasuwar jama'a.", "Nyochaa arịrịọ ndị na-ere ahịa ma kwado ụlọ ahịa maka ahịa ọha."],
    "Approved vendors appear in Browse Stores": ["Approved sellers go show for Browse Stores.", "Àwọn oníṣòwò tí a fọwọ́sí yóò hàn nínú Wo Àwọn Ilé-Ìtajà.", "Masu sayarwa da aka amince da su za su bayyana a Duba Shaguna.", "Ndị na-ere ahịa a kwadoro ga-apụta na Lelee Ụlọ Ahịa."],
    "Loading vendors": ["Sellers dey load...", "Ń gbé àwọn oníṣòwò wọlé...", "Ana loda masu sayarwa...", "Na-ebudata ndị na-ere ahịa..."],

    /* ============ AUDIT-COMPATIBLE PHRASE ALIASES ============ */
    /* These decoration-stripped forms let the audit and the live engine
       resolve the same visible strings (including emoji/punctuation wrappers). */
    "Loading stores": ["Shops dey load...", "Ń gbé àwọn ilé-ìtajà wọlé...", "Ana loda shaguna...", "Na-ebudata ụlọ ahịa..."],
    "No account needed. Just your phone & address": ["You no need account. Na just your phone and address.", "Kò sí àkàǹtì tí a nílò. Nọ́mbà fóònù àti àdírẹ́sì rẹ nìkan ni.", "Ba sai asusu ba. Lambar wayarka da adireshi kawai.", "Ọ dịghị mkpa akaụntụ. Naanị ekwentị na adreesị gị."],
    "Pay Now (Card / Bank Transfer via Flutterwave": ["Pay Now (Card / Bank Transfer with Flutterwave)", "San Owó Nísinsìnyí (Káàdì / Ìfiránṣẹ́ Báǹkì nípasẹ̀ Flutterwave)", "Biya Yanzu (Kati / Canja Wurin Banki ta Flutterwave)", "Kwụọ Ụgwọ Ugbu A (Kaadị / Nnyefe Ego site na Flutterwave)"],
    "VendorHub connects you directly with small businesses in your area. No middlemen, no hidden charges — just great local products at fair prices": ["VendorHub dey connect you straight to small businesses for your area. No middleman, no hidden charge — na correct local goods for better price.", "VendorHub so ọ́ pọ̀ tààrà mọ́ àwọn iṣẹ́ kékeré ní agbègbè rẹ. Kò sí alárinà, kò sí owó tí a fi pamọ́ — kìkì àwọn ọjà agbègbè tó dára ní owó tó tọ́.", "VendorHub yana haɗa ka kai tsaye da ƙananan kasuwanci a yankinka. Babu ɗan tsaka, babu ɓoyayyen kuɗi — kayayyakin gida masu kyau a farashi mai kyau.", "VendorHub na-ejikọ gị ozugbo na obere azụmahịa dị na mpaghara gị. Ọ dịghị onye ọka, ọ dịghị ụgwọ zoro ezo — naanị ngwaahịa obodo dị mma na ọnụahịa ziri ezi."],
    "Why Choose VendorHub": ["Why You Go Choose VendorHub?", "Kí Ni Ó Fi Yẹ Kí O Yan VendorHub?", "Me Ya Sa Za a Zaɓi VendorHub?", "Gịnị Mere I Ga-eji Họrọ VendorHub?"],
    "Vendors keep 100% of their earnings. We don't take a cut from any sale, helping small businesses thrive": ["Sellers dey keep 100% of dia money. We no dey collect any cut from any sale, so small businesses fit grow.", "Àwọn oníṣòwò ń pa 100% owó wọn mọ́. A kì í gba ìdá kankan nínú títà, èyí ń ran àwọn iṣẹ́ kékeré lọ́wọ́ láti dàgbà.", "Masu sayarwa suna riƙe kashi 100% na kuɗin su. Ba mu karɓar komai daga kowace saya, muna taimaka wa ƙananan kasuwanci su bunƙasa.", "Ndị na-ere ahịa na-ejigide 100% nke ego ha. Anyị anaghị ewere oke n'ire ọ bụla, na-enyere obere azụmahịa aka ito."],
    "Ready to Get Started": ["You Ready To Start?", "Ṣé O Ti Ṣetán Láti Bẹ̀rẹ̀?", "Ka Shirya Ka Fara?", "Ị Dịla Njikere Ịmalite?"],
    "Join thousands of Nigerians shopping and selling locally. It's free to join": ["Join thousands of Naija people wey dey buy and sell for dia area. E free to join!", "Dara pọ̀ mọ́ ẹgbẹẹgbẹ̀rún àwọn ọmọ Nàìjíríà tí ń rajà tí wọ́n sì ń tà ní agbègbè. Ọ̀fẹ́ ni láti dara pọ̀!", "Ka shiga tare da dubban 'yan Nijeriya da ke siyayya da sayarwa a gida. Kyauta ne ka shiga!", "Sonye na puku kwuru puku ndị Naịjirịa na-azụ ma na-ere ahịa n'obodo ha. Ọ bụ n'efu isonye!"],
    "VendorHub": ["VendorHub", "VendorHub", "VendorHub", "VendorHub"],
    "Empowering small businesses in Nigeria through direct customer connections. No commissions, no hassle": ["We dey empower small businesses for Naija through direct customer connection. No commission, no wahala.", "À ń fún àwọn iṣẹ́ kékeré ní Nàìjíríà lágbára nípasẹ̀ ìsopọ̀ tààrà pẹ̀lú oníbàárà. Kò sí kọmíṣọ̀nnì, kò sí wàhálà.", "Muna ƙarfafa ƙananan kasuwanci a Nijeriya ta hanyar haɗin kai kai tsaye da abokan ciniki. Babu kwamiti, babu wahala.", "Anyị na-akwalite obere azụmahịa na Naịjirịa site na njikọ ndị ahịa ozugbo. Ọ dịghị ụgwọ ọkwa, ọ dịghị nsogbu."],
    "2024 VendorHub. Built for Nigerian small businesses. All rights reserved": ["© 2024 VendorHub. We build am for Naija small businesses. All rights reserved.", "© 2024 VendorHub. A kọ́ ọ fún àwọn iṣẹ́ kékeré Nàìjíríà. Gbogbo ẹ̀tọ́ ni a pa mọ́.", "© 2024 VendorHub. An gina shi don ƙananan kasuwancin Nijeriya. Duk haƙƙoƙi na kiyaye.", "© 2024 VendorHub. E wuru ya maka obere azụmahịa Naịjirịa. Ikike niile echekwabara."],
    "Select product": ["Choose goods...", "Yan ọjà...", "Zaɓi kaya...", "Họrọ ngwaahịa..."],
    "Quantity Change (+ to add, - to remove": ["Quantity Change (+ to add, - to remove)", "Ìyípadà Iye (+ láti fi kún, - láti yọ kúrò)", "Canjin Adadi (+ don ƙarawa, - don cirewa)", "Mgbanwe Ọnụọgụ (+ iji tinye, - iji wepụ)"],
    "Demo Accounts": ["Demo Accounts:", "Àwọn Àkàǹtì Àpẹẹrẹ:", "Asusun Gwaji:", "Akaụntụ Nnwale:"],
    "Admin": ["Admin", "Alábòójútó", "Mai Gudanarwa", "Onye Nchịkwa"],
    "admin123": ["admin123", "admin123", "admin123", "admin123"],
    "admin@platform.com": ["admin@platform.com", "admin@platform.com", "admin@platform.com", "admin@platform.com"],
    "Don't have an account": ["You no get account?", "O kò ní àkàǹtì?", "Ba ka da asusu?", "Ị nweghị akaụntụ?"],
    "Login to manage your orders, track deliveries, or manage your store inventory and sales": ["Login to manage your orders, track delivery, or manage your shop stock and sales.", "Wọlé láti ṣàkóso àwọn àṣẹ rẹ, tọpa ìfijíṣẹ́, tàbí ṣàkóso ọjà àti títà ilé-ìtajà rẹ.", "Shiga don sarrafa odojinka, bin diddigin isarwa, ko sarrafa kaya da sayarwar shagonka.", "Banye iji jikwaa ndabere gị, soro nnyefe, ma ọ bụ jikwaa ngwaahịa na ire ere ụlọ ahịa gị."],
    "Loading your orders": ["Your orders dey load...", "Ń gbé àwọn àṣẹ rẹ wọlé...", "Ana loda odojinka...", "Na-ebudata ndabere gị..."],
    "Loading": ["E dey load...", "Ń gbé wọlé...", "Ana lodawa...", "Na-ebudata..."],
    "Loading messages": ["Messages dey load...", "Ń gbé àwọn ìfiránṣẹ́ wọlé...", "Ana loda saƙonni...", "Na-ebudata ozi..."],
    "Already have an account": ["You get account already?", "O ti ní àkàǹtì?", "Kana da asusu?", "Ị nwerela akaụntụ?"],
    "Connect with local businesses in your area. Shop fresh groceries, baked goods, electronics, and more — all without commission fees": ["Connect with businesses for your area. Buy fresh foodstuff, bread, electronics, and more — no commission at all.", "So pọ̀ mọ́ àwọn iṣẹ́ agbègbè rẹ. Ra oúnjẹ tútù, búrẹ́dì, ẹ̀rọ iná, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ — láìsí owó kọmíṣọ̀nnì.", "Haɗa kai da kasuwancin gida a yankinka. Sayi sabbin kayan abinci, gurasa, kayan lantarki, da ƙari — babu kuɗin kwamiti.", "Jikọọ na azụmahịa obodo gị. Zụta nri ọhụrụ, achịcha, ngwa eletrọnịkị, na ndị ọzọ — na-enweghị ụgwọ ọkwa."],
    "Store description goes here": ["Shop description dey here.", "Àlàyé ilé-ìtajà wà níbí.", "Bayanin shago yana nan.", "Nkọwa ụlọ ahịa dị ebe a."],
    "Phone": ["Phone", "Fóònù", "Waya", "Ekwentị"],
    "4.5 Rating": ["4.5 Rating", "4.5 Ìdíwọ̀n", "4.5 Kimantawa", "4.5 Nlele"],
    "Loading products": ["Goods dey load...", "Ń gbé àwọn ọjà wọlé...", "Ana loda kayayyaki...", "Na-ebudata ngwaahịa..."],
    "No login needed. Browse stores on the map, add items to cart, and checkout with just your phone number": ["You no need login. Check shops for the map, put things for cart, and pay with just your phone number.", "Kò sí ìwọlé tí a nílò. Wo àwọn ilé-ìtajà lórí máàpù, fi ọjà sínú kẹ̀kẹ́, kí o sì san owó pẹ̀lú nọ́mbà fóònù rẹ nìkan.", "Ba sai ka shiga ba. Duba shaguna a taswira, saka kaya a keken siyayya, ka biya da lambar wayarka kawai.", "Ọ dịghị mkpa ịbanye. Lelee ụlọ ahịa na maapụ, tinye ihe na nkata, wee kwụọ ụgwọ naanị site na nọmba ekwentị gị."],
    "ID": ["ID", "ID", "ID", "ID"],
    "Loading conversations": ["Chats dey load...", "Ń gbé àwọn ìjíròrò wọlé...", "Ana loda hirarraki...", "Na-ebudata mkparịta ụka..."],
    "Demo": ["Demo:", "Àpẹẹrẹ:", "Gwaji:", "Nnwale:"],
    "Don't have a vendor account": ["You no get seller account?", "O kò ní àkàǹtì oníṣòwò?", "Ba ka da asusun mai sayarwa?", "Ị nweghị akaụntụ onye ahịa?"],
    "Manage your products, track inventory, process orders, and grow your business with VendorHub's vendor tools": ["Manage your goods, track your stock, handle orders, and grow your business with VendorHub seller tools.", "Ṣàkóso àwọn ọjà rẹ, tọpa ọjà tó kù, ṣe àwọn àṣẹ, kí o sì gbé iṣẹ́ rẹ ga pẹ̀lú irinṣẹ́ oníṣòwò VendorHub.", "Sarrafa kayayyakinka, bi kaya, aiwatar da odoji, ka haɓaka kasuwancinka da kayan aikin masu sayarwa na VendorHub.", "Jikwaa ngwaahịa gị, soro ihe dị n'ahịa, rụọ ndabere, ma zụlite azụmahịa gị site na ngwaọrụ VendorHub."],
    "Already a vendor": ["You be seller already?", "O ti jẹ́ oníṣòwò?", "Kai mai sayarwa ne?", "Ị bụzi onye na-ere ahịa?"],
    "Reach thousands of local customers with zero commission fees. Manage your store, track inventory, and grow your business": ["Reach thousands of customers for your area with zero commission. Manage your shop, track your stock, and grow your business.", "Dé ọ̀dọ̀ ẹgbẹẹgbẹ̀rún àwọn oníbàárà agbègbè láìsí owó kọmíṣọ̀nnì. Ṣàkóso ilé-ìtajà rẹ, tọpa ọjà, kí o sì gbé iṣẹ́ rẹ ga.", "Ka isa ga dubban abokan ciniki na gida ba tare da kuɗin kwamiti ba. Sarrafa shagonka, bi kaya, ka haɓaka kasuwancinka.", "Ruo puku kwuru puku ndị ahịa obodo na-enweghị ụgwọ ọkwa. Jikwaa ụlọ ahịa gị, soro ngwaahịa, ma zụlite azụmahịa gị."],
    "Bank Details (For Payouts": ["Bank Details (Make We Fit Pay You)", "Àlàyé Báǹkì (Fún Sísanwó)", "Bayanan Banki (Don Biyan Kuɗi)", "Nkọwa Akaụntụ (Maka Ịkwụ Gị Ụgwọ)"],
    "Loading banks": ["Banks dey load...", "Ń gbé àwọn báǹkì wọlé...", "Ana loda bankuna...", "Na-ebudata ụlọ akụ..."],
    "Store Banner": ["Shop Banner", "Àsíá Ilé-Ìtajà", "Tutar Shago", "Ọkọlọtọ Ụlọ Ahịa"],
    "No banner yet": ["No banner yet", "Kò sí àsíá", "Babu tutar ba", "Enwebeghị ọkọlọtọ"],
    "Gallery": ["Gallery", "Gálárì", "Gallery", "Galari"],
    "Camera": ["Camera", "Kámẹ́rà", "Kyamara", "Kamera"],
    "Store Logo": ["Shop Logo", "Àmì Ilé-Ìtajà", "Alamar Shago", "Akara Ụlọ Ahịa"],
    "No logo yet": ["No logo yet", "Kò sí àmì", "Babu alama ba", "Enwebeghị akara"],


    "Find hidden gems in your neighborhood. Support local entrepreneurs and build community connections": ["Find better shops wey dey hide for your area. Support local business people and build community.", "Wá àwọn ohun iyebíye tí ó farasin ní agbègbè rẹ. Ṣe àtìlẹ́yìn fún àwọn oníṣòwò agbègbè kí o sì kọ́ ìsopọ̀ àwùjọ.", "Nemo kayayyaki masu kyau da ke ɓoye a unguwarka. Taimaki 'yan kasuwa na gida ka gina alaƙar al'umma.", "Chọta ụlọ ahịa magburu onwe ha zoro ezo n'agbata obi gị. Kwado ndị ọchụnta ego obodo ma wuo njikọ obodo."],
    "Simple, streamlined ordering process. Place orders in seconds and track them in real-time": ["Simple and quick way to order. Order for seconds and track am live.", "Ọ̀nà ìpaṣẹ tó rọrùn, tó sì yára. Paṣẹ ní ìṣẹ́jú àáyá díẹ̀ kí o sì bójútó rẹ̀ lẹ́sẹ̀kẹsẹ̀.", "Sauƙin tsarin yin oda. Yi oda cikin daƙiƙu ka bi diddigin sa nan take.", "Usoro ịtụ ihe dị mfe ma dị ngwa. Tụọ ihe n'ime sekọnd ole na ole ma soro ya ozugbo."],
    "Vendors get powerful tools to track stock, manage products, and never miss a sale": ["Sellers get strong tools to track stock, manage goods, and no miss any sale.", "Àwọn oníṣòwò ní àwọn irinṣẹ́ alágbára láti tọpa ọjà, ṣàkóso àwọn ọjà, kí wọ́n má sì pàdánù títà kankan.", "Masu sayarwa suna samun kayan aiki masu ƙarfi don bin kaya, sarrafa kayayyaki, kada su rasa saya.", "Ndị na-ere ahịa na-enweta ngwaọrụ dị ike iji soro ihe dị n'ahịa, jikwaa ngwaahịa, ghara ịtụfu ire ọ bụla."],
    "Understand your business with detailed reports on sales, customers, and top products": ["Understand your business with full report on sales, customers, and best goods.", "Ní òye iṣẹ́ rẹ pẹ̀lú ìjábọ̀ kíkún nípa títà, àwọn oníbàárà, àti àwọn ọjà tó ń tà jùlọ.", "Fahimci kasuwancinka da cikakkun rahotanni kan sayarwa, abokan ciniki, da manyan kayayyaki.", "Ghọta azụmahịa gị site na akụkọ zuru ezu gbasara ire ere, ndị ahịa, na ngwaahịa kacha ere."],
    "All vendors are verified. Your data is protected with enterprise-grade security": ["We dey verify all sellers. Your data dey safe with strong security.", "A ti ṣàyẹ̀wò gbogbo àwọn oníṣòwò. A ń dáàbò bo dátà rẹ pẹ̀lú ààbò tó lágbára.", "An tantance dukkan masu sayarwa. An kare bayananka da tsaro mai ƙarfi.", "A kwadoro ndị na-ere ahịa niile. E chedoro data gị site na nchekwa siri ike."],
    "Sign up as a customer or vendor in under 2 minutes. No complex setup required": ["Register as customer or seller for less than 2 minutes. No wahala setup.", "Forúkọsílẹ̀ gẹ́gẹ́ bí oníbàárà tàbí oníṣòwò ní abẹ́ ìṣẹ́jú méjì. Kò sí ètò tó ṣòro.", "Yi rajista a matsayin abokin ciniki ko mai sayarwa cikin ƙasa da minti biyu. Babu tsari mai wahala.", "Debanye aha dịka onye ahịa ma ọ bụ onye na-ere ahịa n'ime nkeji abụọ. Ọ dịghị nhazi siri ike."],
    "Customers browse local stores. Vendors add products and set up their shop": ["Customers dey check local shops. Sellers dey add goods and set up dia shop.", "Àwọn oníbàárà ń wo àwọn ilé-ìtajà agbègbè. Àwọn oníṣòwò ń fi ọjà kún, wọ́n sì ń ṣètò ilé-ìtajà wọn.", "Abokan ciniki suna duba shagunan gida. Masu sayarwa suna ƙara kayayyaki da shirya shagon su.", "Ndị ahịa na-elele ụlọ ahịa obodo. Ndị na-ere ahịa na-agbakwụnye ngwaahịa ma hazie ụlọ ahịa ha."],
    "Place orders instantly. Vendors manage sales and grow their business": ["Order sharp sharp. Sellers dey manage sales and grow dia business.", "Paṣẹ lẹ́sẹ̀kẹsẹ̀. Àwọn oníṣòwò ń ṣàkóso títà, wọ́n sì ń gbé iṣẹ́ wọn ga.", "Yi oda nan take. Masu sayarwa suna sarrafa sayarwa da haɓaka kasuwancinsu.", "Tụọ ihe ozugbo. Ndị na-ere ahịa na-ejikwa ire ere ma na-eto azụmahịa ha."],
    /* ============ NAVIGATION / GLOBAL UI ============ */
    "Home": ["Home", "Ilé", "Gida", "Ụlọ"],
    "Browse Stores": ["Check Shops", "Wo Àwọn Ilé-Ìtajà", "Duba Shaguna", "Lelee Ụlọ Ahịa"],
    "Browse Store": ["Check Shop", "Wo Ilé-Ìtajà", "Duba Shago", "Lelee Ụlọ Ahịa"],
    "Browse More Stores": ["Check More Shops", "Wo Àwọn Ilé-Ìtajà Mìíràn", "Duba Ƙarin Shaguna", "Lelee Ụlọ Ahịa Ndị Ọzọ"],
    "Vendor Login": ["Seller Login", "Wọlé Oníṣòwò", "Shiga Mai Sayarwa", "Nbanye Onye Ahịa"],
    "Become a Vendor": ["Become Seller", "Di Oníṣòwò", "Zama Mai Sayarwa", "Bụrụ Onye Na-ere Ahịa"],
    "Get Started": ["Start Now", "Bẹ̀rẹ̀", "Fara", "Malite"],
    "Login": ["Login", "Wọlé", "Shiga", "Banye"],
    "Logout": ["Comot", "Jáde", "Fita", "Pụọ"],
    "Dashboard": ["Dashboard", "Dásíbọ́ọ̀dù", "Dashboard", "Dashboard"],
    "Inventory": ["Store Level", "Ìkówójọ Ọjà", "Kaya", "Nchekwa Ngwaahịa"],
    "Settings": ["Settings", "Ètò", "Saituna", "Ntọala"],
    "My Orders": ["My Orders", "Àwọn Àṣẹ Mi", "Odojina", "Ihe M Tụrụ"],
    "Map": ["Map", "Máàpù", "Taswira", "Maapụ"],
    "Store Map": ["Shop Map", "Máàpù Ilé-Ìtajà", "Taswirar Shaguna", "Maapụ Ụlọ Ahịa"],
    "Storefront": ["My Shop", "Ilé-Ìtajà", "Shago", "Ụlọ Ahịa"],
    "Messages": ["Messages", "Àwọn Ìfiránṣẹ́", "Saƙonni", "Ozi"],
    "Orders": ["Orders", "Àwọn Àṣẹ", "Odoji", "Ndabere"],
    "Products": ["Goods", "Àwọn Ọjà", "Kayayyaki", "Ngwaahịa"],
    "Reports": ["Reports", "Àwọn Ìjábọ̀", "Rahotanni", "Akụkọ"],
    "Search": ["Find", "Wá", "Nema", "Chọọ"],
    "Category": ["Category", "Ẹ̀ka", "Nau'i", "Ụdị"],
    "Status": ["Status", "Ipò", "Matsayi", "Ọnọdụ"],
    "Action": ["Action", "Ìgbésẹ̀", "Aiki", "Omume"],
    "Actions": ["Actions", "Àwọn Ìgbésẹ̀", "Ayyuka", "Omume"],
    "Date": ["Date", "Ọjọ́", "Kwanan Wata", "Ụbọchị"],
    "Price": ["Price", "Owó", "Farashi", "Ọnụahịa"],
    "Stock": ["Stock", "Iye Ọjà", "Kaya", "Ihe Dị N'Ahịa"],
    "Product": ["Product", "Ọjà", "Kaya", "Ngwaahịa"],
    "Customer": ["Customer", "Oníbàárà", "Abokin Ciniki", "Onye Ahịa"],
    "Amount": ["Amount", "Iye Owó", "Adadin Kuɗi", "Ego"],
    "Total": ["Total", "Àpapọ̀", "Jimla", "Ngụkọta"],
    "Payment": ["Payment", "Ìsanwó", "Biya", "Ịkwụ Ụgwọ"],
    "Cancel": ["Cancel", "Fagilé", "Soke", "Kagbuo"],
    "Send": ["Send", "Firánṣẹ́", "Aika", "Zipu"],
    "Filter": ["Filter", "Ṣàyẹ̀wò", "Tace", "Nyocha"],
    "View All": ["See All", "Wo Gbogbo", "Duba Duka", "Lelee Ha Niile"],
    "View": ["See", "Wò", "Duba", "Lelee"],
    "View Store": ["See Shop", "Wo Ilé-Ìtajà", "Duba Shago", "Lelee Ụlọ Ahịa"],
    "View Details": ["See Details", "Wo Àlàyé", "Duba Bayani", "Lelee Nkọwa"],
    "Edit": ["Change", "Ṣàtúnṣe", "Gyara", "Dezie"],
    "Delete": ["Delete", "Paarẹ́", "Share", "Hichapụ"],
    "Process": ["Process Am", "Ṣe É", "Aiwatar", "Mezuo"],
    "Adjust": ["Adjust", "Ṣàtúnṣe", "Daidaita", "Hazie"],
    "Remove": ["Remove", "Yọ Kúrò", "Cire", "Wepụ"],
    "Reorder": ["Order Again", "Tún Paṣẹ", "Sake Oda", "Tụọ Ọzọ"],
    "Contact": ["Call Dem", "Pè Wọ́n", "Tuntuɓa", "Kpọtụrụ"],
    "Loading...": ["E dey load...", "Ń gbé wọlé...", "Ana lodawa...", "Na-ebudata..."],
    "Saving...": ["E dey save...", "Ń ń fipamọ́...", "Ana ajiyewa...", "Na-echekwa..."],
    "Guest": ["Guest", "Àlejò", "Baƙo", "Ọbịa"],
    "Vendor": ["Seller", "Oníṣòwò", "Mai Sayarwa", "Onye Ahịa"],
    "Other": ["Other", "Mìíràn", "Wasu", "Ndị Ọzọ"],
    "OR": ["OR", "TÀBÍ", "KO", "MA Ọ BỤ"],
    "All": ["All", "Gbogbo", "Duka", "Ha Niile"],
    "General": ["General", "Gbogbogbò", "Gama-gari", "Izugbe"],
    "General Store": ["General Shop", "Ilé-Ìtajà Gbogbogbò", "Shagon Gama-gari", "Ụlọ Ahịa Izugbe"],
    "Create Account": ["Open Account", "Ṣí Àkàǹtì", "Ƙirƙiri Asusu", "Mepụta Akaụntụ"],
    "Register here": ["Register here", "Forúkọsílẹ̀ níbí", "Yi rajista nan", "Debanye aha ebe a"],
    "Login here": ["Login here", "Wọlé níbí", "Shiga nan", "Banye ebe a"],
    "Back to Home": ["Go Back Home", "Padà sí Ilé", "Koma Gida", "Laghachi Ụlọ"],
    "Back": ["Back", "Padà", "Koma", "Laghachi"],
    "Save Changes": ["Save Am", "Fi Àyípadà Pamọ́", "Ajiye Canje-canje", "Chekwaa Mgbanwe"],
    "Description": ["Description", "Àlàyé", "Bayani", "Nkọwa"],
    "Phone Number": ["Phone Number", "Nọ́mbà Fóònù", "Lambar Waya", "Nọmba Ekwentị"],
    "Email Address": ["Email Address", "Àdírẹ́sì Ímeèlì", "Adireshin Imel", "Adreesị Email"],
    "Password": ["Password", "Ọ̀rọ̀ Aṣínà", "Kalmar Sirri", "Okwuntughe"],
    "First Name": ["First Name", "Orúkọ Àkọ́kọ́", "Sunan Farko", "Aha Mbụ"],
    "Last Name": ["Last Name", "Orúkọ Ìdílé", "Sunan Iyali", "Aha Ezinụlọ"],
    "Username": ["Username", "Orúkọ Ìlò", "Sunan Mai Amfani", "Aha Njirimara"],
    "City": ["City", "Ìlú", "Gari", "Obodo"],
    "Postal Code": ["Postal Code", "Kóòdù Ìfìwéránṣẹ́", "Lambar Gidan Waya", "Koodu Nzipuozi"],
    "Street Address": ["Street Address", "Àdírẹ́sì Òpópónà", "Adireshin Titi", "Adreesị Okporo Ámá"],
    "Delivery Address": ["Delivery Address", "Àdírẹ́sì Ìfijíṣẹ́", "Adireshin Isarwa", "Adreesị Nnyefe"],
    "Payment Method": ["How You Wan Pay", "Ọ̀nà Ìsanwó", "Hanyar Biya", "Ụzọ Ịkwụ Ụgwọ"],
    "Nearby": ["Near You", "Nítòsí", "Kusa", "Dị Nso"],
    "Lagos": ["Lagos", "Èkó", "Legas", "Lagos"],
    "Lagos, Nigeria": ["Lagos, Naija", "Èkó, Nàìjíríà", "Legas, Nijeriya", "Lagos, Naịjirịa"],
    "Rating": ["Rating", "Ìdíwọ̀n", "Kimantawa", "Nlele"],
    "Mon-Sat 8AM-6PM": ["Mon-Sat 8AM-6PM", "Ajé-Àbámẹ́ta 8AM-6PM", "Lit-Asa 8AM-6PM", "Mọnde-Satọde 8AM-6PM"],
    "Network error": ["Network problem", "Àṣìṣe Nẹ́tíwọ̀kì", "Matsalar Sadarwa", "Nsogbu Netwọk"],
    "Network error. Please try again.": ["Network problem. Abeg try again.", "Àṣìṣe nẹ́tíwọ̀kì. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kansí.", "Matsalar sadarwa. Da fatan za a sake gwadawa.", "Nsogbu netwọk. Biko nwaa ọzọ."],
    "Welcome back,": ["Welcome back,", "Kú àbọ̀,", "Barka da dawowa,", "Nnọọ ọzọ,"],
    "Welcome back": ["Welcome back", "Kú àbọ̀", "Barka da dawowa", "Nnọọ ọzọ"],
    "Store:": ["Shop:", "Ilé-Ìtajà:", "Shago:", "Ụlọ Ahịa:"],
    "Save": ["Save", "Fi Pamọ́", "Ajiye", "Chekwaa"],

    /* ============ CATEGORIES ============ */
    "All Categories": ["All Categories", "Gbogbo Ẹ̀ka", "Dukkan Nau'i", "Ụdị Niile"],
    "Groceries": ["Foodstuff", "Oúnjẹ àti Ohun Èlò", "Kayan Abinci", "Ihe Oriri"],
    "Bakery": ["Bread & Cake", "Búrẹ́dì àti Àkàrà Òyìnbó", "Gurasa da Kek", "Achịcha na Keeki"],
    "Electronics": ["Electronics", "Ẹ̀rọ Iná", "Kayan Lantarki", "Ngwa Eletrọnịkị"],
    "Fashion": ["Cloth & Style", "Aṣọ àti Ẹ̀wù", "Tufafi", "Uwe na Ejiji"],

    /* ============ ORDER STATUSES ============ */
    "All Statuses": ["All Status", "Gbogbo Ipò", "Dukkan Matsayi", "Ọnọdụ Niile"],
    "Pending": ["Dey Wait", "Ń Dúró", "Ana Jira", "Na-eche"],
    "pending": ["dey wait", "ń dúró", "ana jira", "na-eche"],
    "Processing": ["Dey Process", "Ń Ṣiṣẹ́", "Ana Aiwatarwa", "Na-arụ"],
    "processing": ["dey process", "ń ṣiṣẹ́", "ana aiwatarwa", "na-arụ"],
    "Ready": ["Don Ready", "Ó Ti Ṣetán", "Ya Shirya", "Adịla Njikere"],
    "ready": ["don ready", "ó ti ṣetán", "ya shirya", "adịla njikere"],
    "Delivered": ["Don Deliver", "A Ti Fi Ránṣẹ́", "An Isar", "Enyefeela"],
    "delivered": ["don deliver", "a ti fi ránṣẹ́", "an isar", "enyefeela"],
    "Cancelled": ["Dem Cancel Am", "A Ti Fagilé", "An Soke", "Akagbuola"],
    "cancelled": ["dem cancel am", "a ti fagilé", "an soke", "akagbuola"],
    "Order Cancelled": ["Dem Cancel This Order", "A Ti Fagilé Àṣẹ Náà", "An Soke Odar", "Akagbuola Ndabere A"],
    "active": ["dey active", "ó ń ṣiṣẹ́", "yana aiki", "na-arụ ọrụ"],
    "inactive": ["no dey active", "kò ń ṣiṣẹ́", "ba ya aiki", "anaghị arụ ọrụ"],
    "Paid": ["Don Pay", "A Ti San", "An Biya", "Akwụọla"],
    "Unpaid": ["No Pay Yet", "Kò Tí Ì San", "Ba a Biya Ba", "Akwụghị"],

    /* ============ PAGE TITLES ============ */
    "VendorHub - Connect with Local Vendors in Nigeria": ["VendorHub - Connect With Sellers Wey Dey Near You For Naija", "VendorHub - So Pọ̀ Mọ́ Àwọn Oníṣòwò Agbègbè Ní Nàìjíríà", "VendorHub - Haɗa Kai da Masu Sayarwa na Gida a Nijeriya", "VendorHub - Jikọọ Na Ndị Ahịa Obodo Na Naịjirịa"],
    "Checkout": ["Pay For Your Order", "Ìsanwó", "Biya", "Ịkwụ Ụgwọ"],
    "Track Order": ["Track Your Order", "Bójútó Àṣẹ", "Bi Diddigin Oda", "Soro Ndabere"],
    "Register": ["Register", "Forúkọsílẹ̀", "Yi Rajista", "Debanye Aha"],
    "Customer Dashboard": ["Customer Dashboard", "Dásíbọ́ọ̀dù Oníbàárà", "Dashboard na Abokin Ciniki", "Dashboard Onye Ahịa"],
    "Vendor Dashboard": ["Seller Dashboard", "Dásíbọ́ọ̀dù Oníṣòwò", "Dashboard na Mai Sayarwa", "Dashboard Onye Ahịa"],
    "Vendor Settings": ["Seller Settings", "Ètò Oníṣòwò", "Saitunan Mai Sayarwa", "Ntọala Onye Ahịa"],
    "Store": ["Shop", "Ilé-Ìtajà", "Shago", "Ụlọ Ahịa"],

    /* ============ HOME / LANDING PAGE ============ */
    "Order from Local Vendors": ["Order From Sellers Wey Dey Near You", "Paṣẹ Láti Ọ̀dọ̀ Àwọn Oníṣòwò Agbègbè", "Yi Oda Daga Masu Sayarwa na Gida", "Tụọ Ihe Site Na Ndị Ahịa Obodo"],
    "No Account Needed": ["You No Need Account", "Kò Sí Àkàǹtì Tí A Nílò", "Ba Sai Asusu Ba", "Ọ Dịghị Mkpa Ịnwe Akaụntụ"],
    "Without Commission Fees": ["Without Any Commission", "Láìsí Owó Kọmíṣọ̀nnì", "Babu Kuɗin Kwamiti", "Na-enweghị Ụgwọ Ọkwa"],
    "VendorHub connects you directly with small businesses in your area. No middlemen, no hidden charges — just great local products at fair prices.": ["VendorHub dey connect you straight to small businesses for your area. No middleman, no hidden charge — na correct local goods for better price.", "VendorHub so ọ́ pọ̀ tààrà mọ́ àwọn iṣẹ́ kékeré ní agbègbè rẹ. Kò sí alárinà, kò sí owó tí a fi pamọ́ — kìkì àwọn ọjà agbègbè tó dára ní owó tó tọ́.", "VendorHub yana haɗa ka kai tsaye da ƙananan kasuwanci a yankinka. Babu ɗan tsaka, babu ɓoyayyen kuɗi — kayayyakin gida masu kyau a farashi mai kyau.", "VendorHub na-ejikọ gị ozugbo na obere azụmahịa dị na mpaghara gị. Ọ dịghị onye ọka, ọ dịghị ụgwọ zoro ezo — naanị ngwaahịa obodo dị mma na ọnụahịa ziri ezi."],
    "Start Selling": ["Start To Sell", "Bẹ̀rẹ̀ Sí Tà", "Fara Sayarwa", "Malite Ire Ahịa"],
    "Local Vendors": ["Local Sellers", "Àwọn Oníṣòwò Agbègbè", "Masu Sayarwa na Gida", "Ndị Ahịa Obodo"],
    "Happy Customers": ["Happy Customers", "Àwọn Oníbàárà Aláyọ̀", "Abokan Ciniki Masu Farin Ciki", "Ndị Ahịa Obi Ụtọ"],
    "Commission": ["Commission", "Owó Kọmíṣọ̀nnì", "Kuɗin Kwamiti", "Ụgwọ Ọkwa"],
    "Why Choose VendorHub?": ["Why You Go Choose VendorHub?", "Kí Ni Ó Fi Yẹ Kí O Yan VendorHub?", "Me Ya Sa Za a Zaɓi VendorHub?", "Gịnị Mere I Ga-eji Họrọ VendorHub?"],
    "Everything you need to shop local or grow your business": ["Everything wey you need to buy local or grow your business", "Gbogbo ohun tí o nílò láti ra ọjà agbègbè tàbí gbé iṣẹ́ rẹ ga", "Duk abin da kake buƙata don siyayya a gida ko haɓaka kasuwancinka", "Ihe niile ị chọrọ iji zụọ ahịa obodo ma ọ bụ zụlite azụmahịa gị"],
    "Zero Commission": ["Zero Commission", "Kò Sí Owó Kọmíṣọ̀nnì", "Babu Kuɗin Kwamiti", "Enweghị Ụgwọ Ọkwa"],
    "Vendors keep 100% of their earnings. We don't take a cut from any sale, helping small businesses thrive.": ["Sellers dey keep 100% of dia money. We no dey collect any cut from any sale, so small businesses fit grow.", "Àwọn oníṣòwò ń pa 100% owó wọn mọ́. A kì í gba ìdá kankan nínú títà, èyí ń ran àwọn iṣẹ́ kékeré lọ́wọ́ láti dàgbà.", "Masu sayarwa suna riƙe kashi 100% na kuɗin su. Ba mu karɓar komai daga kowace saya, muna taimaka wa ƙananan kasuwanci su bunƙasa.", "Ndị na-ere ahịa na-ejigide 100% nke ego ha. Anyị anaghị ewere oke n'ire ọ bụla, na-enyere obere azụmahịa aka ito."],
    "Local Discovery": ["Find Shops Near You", "Ìwádìí Agbègbè", "Gano Shaguna na Kusa", "Ịchọta Ụlọ Ahịa Obodo"],
    "Find hidden gems in your neighborhood. Support local entrepreneurs and build community connections.": ["Find better shops wey dey hide for your area. Support local business people and build community.", "Wá àwọn ohun iyebíye tí ó farasin ní agbègbè rẹ. Ṣe àtìlẹ́yìn fún àwọn oníṣòwò agbègbè kí o sì kọ́ ìsopọ̀ àwùjọ.", "Nemo kayayyaki masu kyau da ke ɓoye a unguwarka. Taimaki 'yan kasuwa na gida ka gina alaƙar al'umma.", "Chọta ụlọ ahịa magburu onwe ha zoro ezo n'agbata obi gị. Kwado ndị ọchụnta ego obodo ma wuo njikọ obodo."],
    "Fast Ordering": ["Quick Order", "Ìpaṣẹ Kíákíá", "Yin Oda Cikin Sauri", "Ịtụ Ihe Ngwa Ngwa"],
    "Simple, streamlined ordering process. Place orders in seconds and track them in real-time.": ["Simple and quick way to order. Order for seconds and track am live.", "Ọ̀nà ìpaṣẹ tó rọrùn, tó sì yára. Paṣẹ ní ìṣẹ́jú àáyá díẹ̀ kí o sì bójútó rẹ̀ lẹ́sẹ̀kẹsẹ̀.", "Sauƙin tsarin yin oda. Yi oda cikin daƙiƙu ka bi diddigin sa nan take.", "Usoro ịtụ ihe dị mfe ma dị ngwa. Tụọ ihe n'ime sekọnd ole na ole ma soro ya ozugbo."],
    "Inventory Management": ["Manage Your Stock", "Ìṣàkóso Ìkówójọ Ọjà", "Sarrafa Kaya", "Njikwa Ngwaahịa"],
    "Vendors get powerful tools to track stock, manage products, and never miss a sale.": ["Sellers get strong tools to track stock, manage goods, and no miss any sale.", "Àwọn oníṣòwò ní àwọn irinṣẹ́ alágbára láti tọpa ọjà, ṣàkóso àwọn ọjà, kí wọ́n má sì pàdánù títà kankan.", "Masu sayarwa suna samun kayan aiki masu ƙarfi don bin kaya, sarrafa kayayyaki, kada su rasa saya.", "Ndị na-ere ahịa na-enweta ngwaọrụ dị ike iji soro ihe dị n'ahịa, jikwaa ngwaahịa, ghara ịtụfu ire ọ bụla."],
    "Sales Analytics": ["Sales Report", "Ìtúpalẹ̀ Títà", "Nazarin Sayarwa", "Nyocha Ire Ere"],
    "Understand your business with detailed reports on sales, customers, and top products.": ["Understand your business with full report on sales, customers, and best goods.", "Ní òye iṣẹ́ rẹ pẹ̀lú ìjábọ̀ kíkún nípa títà, àwọn oníbàárà, àti àwọn ọjà tó ń tà jùlọ.", "Fahimci kasuwancinka da cikakkun rahotanni kan sayarwa, abokan ciniki, da manyan kayayyaki.", "Ghọta azụmahịa gị site na akụkọ zuru ezu gbasara ire ere, ndị ahịa, na ngwaahịa kacha ere."],
    "Secure & Trusted": ["Safe & Trusted", "Ààbò àti Ìgbẹ́kẹ̀lé", "Aminci da Dogaro", "Nchekwa na Ntụkwasị Obi"],
    "All vendors are verified. Your data is protected with enterprise-grade security.": ["We dey verify all sellers. Your data dey safe with strong security.", "A ti ṣàyẹ̀wò gbogbo àwọn oníṣòwò. A ń dáàbò bo dátà rẹ pẹ̀lú ààbò tó lágbára.", "An tantance dukkan masu sayarwa. An kare bayananka da tsaro mai ƙarfi.", "A kwadoro ndị na-ere ahịa niile. E chedoro data gị site na nchekwa siri ike."],
    "How It Works": ["How E Dey Work", "Bí Ó Ṣe Ń Ṣiṣẹ́", "Yadda Yake Aiki", "Otu Ọ Si Arụ Ọrụ"],
    "Get started in three simple steps": ["Start with three simple steps", "Bẹ̀rẹ̀ ní ìgbésẹ̀ mẹ́ta tó rọrùn", "Fara da matakai uku masu sauƙi", "Malite site na nzọụkwụ atọ dị mfe"],
    "Sign up as a customer or vendor in under 2 minutes. No complex setup required.": ["Register as customer or seller for less than 2 minutes. No wahala setup.", "Forúkọsílẹ̀ gẹ́gẹ́ bí oníbàárà tàbí oníṣòwò ní abẹ́ ìṣẹ́jú méjì. Kò sí ètò tó ṣòro.", "Yi rajista a matsayin abokin ciniki ko mai sayarwa cikin ƙasa da minti biyu. Babu tsari mai wahala.", "Debanye aha dịka onye ahịa ma ọ bụ onye na-ere ahịa n'ime nkeji abụọ. Ọ dịghị nhazi siri ike."],
    "Browse or List": ["Check Or List Goods", "Wò Tàbí Kọ Ọjà Sílẹ̀", "Duba ko Jera Kaya", "Lelee Ma Ọ Bụ Depụta"],
    "Customers browse local stores. Vendors add products and set up their shop.": ["Customers dey check local shops. Sellers dey add goods and set up dia shop.", "Àwọn oníbàárà ń wo àwọn ilé-ìtajà agbègbè. Àwọn oníṣòwò ń fi ọjà kún, wọ́n sì ń ṣètò ilé-ìtajà wọn.", "Abokan ciniki suna duba shagunan gida. Masu sayarwa suna ƙara kayayyaki da shirya shagon su.", "Ndị ahịa na-elele ụlọ ahịa obodo. Ndị na-ere ahịa na-agbakwụnye ngwaahịa ma hazie ụlọ ahịa ha."],
    "Order & Grow": ["Order & Grow", "Paṣẹ kí O Sì Dàgbà", "Yi Oda & Bunƙasa", "Tụọ Ihe Ma Too"],
    "Place orders instantly. Vendors manage sales and grow their business.": ["Order sharp sharp. Sellers dey manage sales and grow dia business.", "Paṣẹ lẹ́sẹ̀kẹsẹ̀. Àwọn oníṣòwò ń ṣàkóso títà, wọ́n sì ń gbé iṣẹ́ wọn ga.", "Yi oda nan take. Masu sayarwa suna sarrafa sayarwa da haɓaka kasuwancinsu.", "Tụọ ihe ozugbo. Ndị na-ere ahịa na-ejikwa ire ere ma na-eto azụmahịa ha."],
    "Ready to Get Started?": ["You Ready To Start?", "Ṣé O Ti Ṣetán Láti Bẹ̀rẹ̀?", "Ka Shirya Ka Fara?", "Ị Dịla Njikere Ịmalite?"],
    "Join thousands of Nigerians shopping and selling locally. It's free to join!": ["Join thousands of Naija people wey dey buy and sell for dia area. E free to join!", "Dara pọ̀ mọ́ ẹgbẹẹgbẹ̀rún àwọn ọmọ Nàìjíríà tí ń rajà tí wọ́n sì ń tà ní agbègbè. Ọ̀fẹ́ ni láti dara pọ̀!", "Ka shiga tare da dubban 'yan Nijeriya da ke siyayya da sayarwa a gida. Kyauta ne ka shiga!", "Sonye na puku kwuru puku ndị Naịjirịa na-azụ ma na-ere ahịa n'obodo ha. Ọ bụ n'efu isonye!"],
    "Create Free Account": ["Open Free Account", "Ṣí Àkàǹtì Ọ̀fẹ́", "Ƙirƙiri Asusu Kyauta", "Mepụta Akaụntụ N'efu"],
    "Empowering small businesses in Nigeria through direct customer connections. No commissions, no hassle.": ["We dey empower small businesses for Naija through direct customer connection. No commission, no wahala.", "À ń fún àwọn iṣẹ́ kékeré ní Nàìjíríà lágbára nípasẹ̀ ìsopọ̀ tààrà pẹ̀lú oníbàárà. Kò sí kọmíṣọ̀nnì, kò sí wàhálà.", "Muna ƙarfafa ƙananan kasuwanci a Nijeriya ta hanyar haɗin kai kai tsaye da abokan ciniki. Babu kwamiti, babu wahala.", "Anyị na-akwalite obere azụmahịa na Naịjirịa site na njikọ ndị ahịa ozugbo. Ọ dịghị ụgwọ ọkwa, ọ dịghị nsogbu."],
    "For Customers": ["For Customers", "Fún Àwọn Oníbàárà", "Ga Abokan Ciniki", "Maka Ndị Ahịa"],
    "For Vendors": ["For Sellers", "Fún Àwọn Oníṣòwò", "Ga Masu Sayarwa", "Maka Ndị Na-ere Ahịa"],
    "Support": ["Help", "Ìrànlọ́wọ́", "Taimako", "Nkwado"],
    "Success Stories": ["Success Stories", "Àwọn Ìtàn Àṣeyọrí", "Labarun Nasara", "Akụkọ Ihe Ịga Nke Ọma"],
    "Help Center": ["Help Center", "Ilé Ìrànlọ́wọ́", "Cibiyar Taimako", "Ebe Enyemaka"],
    "Contact Us": ["Contact Us", "Kàn Sí Wa", "Tuntuɓe Mu", "Kpọtụrụ Anyị"],
    "Privacy Policy": ["Privacy Policy", "Òfin Àṣírí", "Manufar Sirri", "Iwu Nzuzo"],
    "© 2024 VendorHub. Built for Nigerian small businesses. All rights reserved.": ["© 2024 VendorHub. We build am for Naija small businesses. All rights reserved.", "© 2024 VendorHub. A kọ́ ọ fún àwọn iṣẹ́ kékeré Nàìjíríà. Gbogbo ẹ̀tọ́ ni a pa mọ́.", "© 2024 VendorHub. An gina shi don ƙananan kasuwancin Nijeriya. Duk haƙƙoƙi na kiyaye.", "© 2024 VendorHub. E wuru ya maka obere azụmahịa Naịjirịa. Ikike niile echekwabara."],

    /* ============ STORE MAP ============ */
    "Welcome to VendorHub": ["Welcome to VendorHub", "Kàábọ̀ sí VendorHub", "Barka da zuwa VendorHub", "Nnọọ na VendorHub"],
    "No login needed. Browse stores on the map, add items to cart, and checkout with just your phone number.": ["You no need login. Check shops for the map, put things for cart, and pay with just your phone number.", "Kò sí ìwọlé tí a nílò. Wo àwọn ilé-ìtajà lórí máàpù, fi ọjà sínú kẹ̀kẹ́, kí o sì san owó pẹ̀lú nọ́mbà fóònù rẹ nìkan.", "Ba sai ka shiga ba. Duba shaguna a taswira, saka kaya a keken siyayya, ka biya da lambar wayarka kawai.", "Ọ dịghị mkpa ịbanye. Lelee ụlọ ahịa na maapụ, tinye ihe na nkata, wee kwụọ ụgwọ naanị site na nọmba ekwentị gị."],
    "Nearby Stores": ["Shops Near You", "Àwọn Ilé-Ìtajà Nítòsí", "Shaguna na Kusa da Kai", "Ụlọ Ahịa Dị Nso"],
    "Search stores...": ["Find shops...", "Wá àwọn ilé-ìtajà...", "Nemo shaguna...", "Chọọ ụlọ ahịa..."],
    "Use My Location": ["Use My Location", "Lo Ipò Mi", "Yi Amfani da Wurina", "Jiri Ebe M Nọ"],
    "Locating...": ["We dey find your location...", "Ń wá ipò...", "Ana neman wuri...", "Na-achọ ebe..."],
    "Location Found": ["We Don Find Your Location", "A Ti Rí Ipò Rẹ", "An Samu Wurin Ka", "Achọtala Ebe Ị Nọ"],
    "Loading stores...": ["Shops dey load...", "Ń gbé àwọn ilé-ìtajà wọlé...", "Ana loda shaguna...", "Na-ebudata ụlọ ahịa..."],
    "Loading products...": ["Goods dey load...", "Ń gbé àwọn ọjà wọlé...", "Ana loda kayayyaki...", "Na-ebudata ngwaahịa..."],
    "No stores found": ["We no see any shop", "A kò rí ilé-ìtajà kankan", "Ba a sami shago ba", "Ahụghị ụlọ ahịa ọ bụla"],
    "Try adjusting your filters": ["Try change your filter", "Gbìyànjú láti ṣàtúnṣe àṣàyàn rẹ", "Gwada canza tacewarka", "Gbalịa ịgbanwe nhazi gị"],
    "Try adjusting your filters or search terms": ["Try change your filter or wetin you dey find", "Gbìyànjú láti ṣàtúnṣe àṣàyàn rẹ tàbí ọ̀rọ̀ ìwáàkiri rẹ", "Gwada canza tacewarka ko kalmomin nema", "Gbalịa ịgbanwe nhazi gị ma ọ bụ okwu ị na-achọ"],
    "You are here": ["Na here you dey", "Ibí ni o wà", "Kana nan", "Ebe a ka ị nọ"],
    "Geolocation is not supported by your browser": ["Your browser no support location", "Ẹ̀rọ aṣàwákiri rẹ kò gba ipò lílò", "Burauzarka ba ta goyon bayan wurin ba", "Ihe nchọgharị gị anaghị akwado ebe"],

    /* ============ BROWSE STORES ============ */
    "Filters": ["Filters", "Àwọn Àṣàyàn", "Tacewa", "Nhazi"],
    "Apply Filters": ["Use Filters", "Lo Àwọn Àṣàyàn", "Yi Amfani da Tacewa", "Tinye Nhazi"],
    "Stores Near You": ["Shops Wey Dey Near You", "Àwọn Ilé-Ìtajà Nítòsí Rẹ", "Shaguna Kusa da Kai", "Ụlọ Ahịa Dị Gị Nso"],
    "Sort by Relevance": ["Arrange by Relevance", "Tò Nípa Ìbáradọ́gba", "Jera ta Dacewa", "Hazie Site Na Mkpa"],
    "Newest First": ["New Ones First", "Tuntun Ní Àkọ́kọ́", "Sabbi da Farko", "Nke Ọhụrụ Buru Ụzọ"],
    "Highest Rated": ["Best Rated", "Èyí Tó Dára Jùlọ", "Mafi Kyawun Kimantawa", "Nke Kacha Mma"],
    "Store name...": ["Shop name...", "Orúkọ ilé-ìtajà...", "Sunan shago...", "Aha ụlọ ahịa..."],
    "Quality products from a trusted local vendor.": ["Correct goods from seller wey you fit trust.", "Àwọn ọjà tó dára láti ọ̀dọ̀ oníṣòwò agbègbè tí a gbẹ́kẹ̀lé.", "Kayayyaki masu inganci daga amintaccen mai sayarwa na gida.", "Ngwaahịa dị mma site n'aka onye ahịa obodo a tụkwasịrị obi."],

    /* ============ STORE DETAIL / CART ============ */
    "Store Name": ["Shop Name", "Orúkọ Ilé-Ìtajà", "Sunan Shago", "Aha Ụlọ Ahịa"],
    "Store description goes here.": ["Shop description dey here.", "Àlàyé ilé-ìtajà wà níbí.", "Bayanin shago yana nan.", "Nkọwa ụlọ ahịa dị ebe a."],
    "Local store offering quality products": ["Local shop wey dey sell correct goods", "Ilé-ìtajà agbègbè tí ń ta ọjà tó dára", "Shagon gida da ke sayar da kayayyaki masu inganci", "Ụlọ ahịa obodo na-ere ngwaahịa dị mma"],
    "Cart": ["Cart", "Kẹ̀kẹ́ Ọjà", "Keken Siyayya", "Nkata"],
    "Your Cart": ["Your Cart", "Kẹ̀kẹ́ Ọjà Rẹ", "Keken Siyayyarka", "Nkata Gị"],
    "Your cart is empty": ["Nothing dey your cart", "Kẹ̀kẹ́ ọjà rẹ ṣófo", "Keken siyayyarka babu komai", "Nkata gị tọgbọrọ chakoo"],
    "Browse stores and add items to checkout": ["Check shops and add things before you pay", "Wo àwọn ilé-ìtajà kí o sì fi ọjà kún kí o tó san owó", "Duba shaguna ka ƙara kaya kafin ka biya", "Lelee ụlọ ahịa ma tinye ihe tupu ị kwụọ ụgwọ"],
    "Proceed to Checkout": ["Go Pay Now", "Tẹ̀síwájú Sí Ìsanwó", "Ci Gaba Zuwa Biya", "Gaa N'ihu Ịkwụ Ụgwọ"],
    "Add to Cart": ["Add To Cart", "Fi Sí Kẹ̀kẹ́", "Saka a Keke", "Tinye Na Nkata"],
    "Out of stock": ["E don finish", "Kò sí ní ilé-ìtajà", "Ya ƙare a shago", "Ọ dịghịzi n'ahịa"],
    "Out of Stock": ["E Don Finish", "Kò Sí Ní Ilé-Ìtajà", "Ya Ƙare a Shago", "Ọ Dịghịzi N'ahịa"],
    "In Stock": ["Dey Ground", "Ó Wà Ní Ilé-Ìtajà", "Yana Nan a Shago", "Ọ Dị N'ahịa"],
    "Low Stock": ["E Don Dey Finish", "Ọjà Ti Fẹ́ Tán", "Kaya Yana Ƙarewa", "Ihe Ahịa Na-agwụ"],
    "No products yet": ["No goods yet", "Kò sí ọjà kankan síbẹ̀", "Babu kayayyaki tukuna", "Enwebeghị ngwaahịa"],
    "This store hasn't added any products": ["This shop never add any goods", "Ilé-ìtajà yìí kò tí ì fi ọjà kankan kún", "Wannan shagon bai ƙara wani kaya ba tukuna", "Ụlọ ahịa a etinyebeghị ngwaahịa ọ bụla"],

    /* ============ GUEST CHECKOUT ============ */
    "No account needed. Just your phone & address.": ["You no need account. Na just your phone and address.", "Kò sí àkàǹtì tí a nílò. Nọ́mbà fóònù àti àdírẹ́sì rẹ nìkan ni.", "Ba sai asusu ba. Lambar wayarka da adireshi kawai.", "Ọ dịghị mkpa akaụntụ. Naanị ekwentị na adreesị gị."],
    "Your Order": ["Wetin You Order", "Àṣẹ Rẹ", "Odarka", "Ihe Ị Tụrụ"],
    "We'll send your order confirmation & tracking link via SMS": ["We go send your order confirmation and tracking link through SMS", "A ó fi ìmúdájú àṣẹ rẹ àti ọ̀nà ìbójútó ránṣẹ́ nípasẹ̀ SMS", "Za mu aiko maka da tabbatar da oda da hanyar bibiya ta SMS", "Anyị ga-ezitere gị nkwenye ndabere na njikọ nsochi site na SMS"],
    "Street, building, landmark...": ["Street, building, landmark...", "Òpópónà, ilé, àmì ìdánimọ̀...", "Titi, gini, alama...", "Okporo ámá, ụlọ, akara ngosi..."],
    "Cash on Delivery": ["Pay When E Reach", "San Nígbà Tí Ó Bá Dé", "Biya Lokacin Isarwa", "Kwụọ Ụgwọ Mgbe E Bufere"],
    "Pay Now (Card / Bank Transfer via Flutterwave)": ["Pay Now (Card / Bank Transfer with Flutterwave)", "San Owó Nísinsìnyí (Káàdì / Ìfiránṣẹ́ Báǹkì nípasẹ̀ Flutterwave)", "Biya Yanzu (Kati / Canja Wurin Banki ta Flutterwave)", "Kwụọ Ụgwọ Ugbu A (Kaadị / Nnyefe Ego site na Flutterwave)"],
    "Direct Bank Transfer to Vendor": ["Send Money Direct To Seller Account", "Ìfiránṣẹ́ Báǹkì Tààrà Sí Oníṣòwò", "Canja Wurin Banki Kai Tsaye Ga Mai Sayarwa", "Zipuga Ego Ozugbo Na Akaụntụ Onye Ahịa"],
    "Place Order & Get Tracking": ["Place Order & Get Tracking", "Paṣẹ Kí O Sì Gba Ọ̀nà Ìbójútó", "Yi Oda & Samu Bibiya", "Tụọ Ihe Ma Nweta Nsochi"],
    "Placing order...": ["We dey place your order...", "Ń fi àṣẹ rẹ sílẹ̀...", "Ana yin oda...", "Na-etinye ndabere..."],
    "Secure": ["Safe", "Ààbò", "Aminci", "Nchekwa"],
    "Lagos Only": ["Lagos Only", "Èkó Nìkan", "Legas Kaɗai", "Naanị Lagos"],
    "SMS Tracking": ["SMS Tracking", "Ìbójútó SMS", "Bibiya ta SMS", "Nsochi SMS"],
    "Vendor's Bank Details": ["Seller Account Details", "Àlàyé Báǹkì Oníṣòwò", "Bayanan Bankin Mai Sayarwa", "Nkọwa Akaụntụ Onye Ahịa"],
    "Not provided": ["Dem no provide am", "A kò pèsè rẹ̀", "Ba a bayar ba", "E nyeghị ya"],
    "This vendor hasn't added bank details yet. Choose \"Pay Now\" or \"Cash on Delivery\" instead.": ["This seller never add bank details. Choose \"Pay Now\" or \"Pay When E Reach\" instead.", "Oníṣòwò yìí kò tí ì fi àlàyé báǹkì kún. Yan \"San Owó Nísinsìnyí\" tàbí \"San Nígbà Tí Ó Bá Dé\" dípò.", "Wannan mai sayarwa bai ƙara bayanan banki ba tukuna. Zaɓi \"Biya Yanzu\" ko \"Biya Lokacin Isarwa\" maimakon haka.", "Onye ahịa a etinyebeghị nkọwa akaụntụ. Họrọ \"Kwụọ Ụgwọ Ugbu A\" ma ọ bụ \"Kwụọ Ụgwọ Mgbe E Bufere\" kama."],
    "Pay with cash when the rider hands you your order.": ["Pay cash when the rider bring your order.", "San owó nígbà tí ẹni tó ń fi ọjà ránṣẹ́ bá gbé àṣẹ rẹ dé.", "Biya da kuɗi lokacin da mai kawo kaya ya kawo maka odarka.", "Kwụọ ụgwọ ego mgbe onye na-ebuga ihe wetara gị ihe ị tụrụ."],
    "You'll be sent to a secure Flutterwave page to pay by card or bank transfer.": ["We go carry you go safe Flutterwave page to pay with card or bank transfer.", "A ó darí rẹ sí ojú-ìwé Flutterwave tó ní ààbò láti san pẹ̀lú káàdì tàbí ìfiránṣẹ́ báǹkì.", "Za a kai ka shafin Flutterwave mai aminci don biya da kati ko canja wurin banki.", "A ga-eduga gị na ibe Flutterwave echedoro iji kwụọ ụgwọ site na kaadị ma ọ bụ nnyefe ego."],
    "Transfer straight to the vendor's account, then chat with them to confirm.": ["Send the money straight to seller account, then chat dem to confirm.", "Fi owó ránṣẹ́ tààrà sí àkàǹtì oníṣòwò, kí o sì bá wọn sọ̀rọ̀ láti mú un dájú.", "Tura kuɗin kai tsaye zuwa asusun mai sayarwa, sannan ka tattauna da su don tabbatarwa.", "Zipuga ego ozugbo n'akaụntụ onye ahịa, wee soro ha kparịta ka ha kwado ya."],

    /* ============ ORDER TRACKING ============ */
    "Track Your Order": ["Track Your Order", "Bójútó Àṣẹ Rẹ", "Bi Diddigin Odarka", "Soro Ndabere Gị"],
    "Enter your order code and phone number": ["Enter your order code and phone number", "Tẹ kóòdù àṣẹ rẹ àti nọ́mbà fóònù rẹ sí i", "Shigar da lambar odarka da lambar waya", "Tinye koodu ndabere gị na nọmba ekwentị"],
    "Order code (e.g. ABC12345)": ["Order code (like ABC12345)", "Kóòdù àṣẹ (bí ABC12345)", "Lambar oda (misali ABC12345)", "Koodu ndabere (dịka ABC12345)"],
    "Phone number": ["Phone number", "Nọ́mbà fóònù", "Lambar waya", "Nọmba ekwentị"],
    "Track": ["Track", "Bójútó", "Bi Diddigi", "Soro"],
    "Order Status": ["Order Status", "Ipò Àṣẹ", "Matsayin Oda", "Ọnọdụ Ndabere"],
    "Items Ordered": ["Wetin You Order", "Àwọn Ọjà Tí O Paṣẹ", "Kayan da Aka Yi Oda", "Ihe Ndị A Tụrụ"],
    "Delivery Address:": ["Delivery Address:", "Àdírẹ́sì Ìfijíṣẹ́:", "Adireshin Isarwa:", "Adreesị Nnyefe:"],
    "Payment:": ["Payment:", "Ìsanwó:", "Biya:", "Ịkwụ Ụgwọ:"],
    "Chat with Vendor": ["Chat The Seller", "Bá Oníṣòwò Sọ̀rọ̀", "Yi Hira da Mai Sayarwa", "Kparịta Ụka Na Onye Ahịa"],
    "Loading messages...": ["Messages dey load...", "Ń gbé àwọn ìfiránṣẹ́ wọlé...", "Ana loda saƙonni...", "Na-ebudata ozi..."],
    "Type a message...": ["Type message...", "Kọ ìfiránṣẹ́...", "Rubuta saƙo...", "Dee ozi..."],
    "No messages yet. Start the conversation!": ["No message yet. Start the gist!", "Kò sí ìfiránṣẹ́ kankan síbẹ̀. Bẹ̀rẹ̀ ìjíròrò!", "Babu saƙo tukuna. Fara tattaunawa!", "Enwebeghị ozi. Malite mkparịta ụka!"],
    "No messages yet.": ["No message yet.", "Kò sí ìfiránṣẹ́ kankan síbẹ̀.", "Babu saƙo tukuna.", "Enwebeghị ozi."],
    "No messages yet": ["No message yet", "Kò sí ìfiránṣẹ́ kankan síbẹ̀", "Babu saƙo tukuna", "Enwebeghị ozi"],
    "No messages yet. Say hello!": ["No message yet. Talk something!", "Kò sí ìfiránṣẹ́ kankan síbẹ̀. Kí wọn!", "Babu saƙo tukuna. Ka gaishe su!", "Enwebeghị ozi. Kelee ha!"],
    "No messages yet — say hello!": ["No message yet — talk something!", "Kò sí ìfiránṣẹ́ kankan síbẹ̀ — kí wọn!", "Babu saƙo tukuna — ka gaishe su!", "Enwebeghị ozi — kelee ha!"],
    "Order not found": ["We no see this order", "A kò rí àṣẹ náà", "Ba a sami odar ba", "Ahụghị ndabere ahụ"],
    "Please enter both order code and phone number": ["Abeg enter order code and phone number", "Jọ̀wọ́ tẹ kóòdù àṣẹ àti nọ́mbà fóònù sí i", "Da fatan shigar da lambar oda da lambar waya", "Biko tinye koodu ndabere na nọmba ekwentị"],
    "Payment received! Your order is now marked as paid.": ["We don receive your payment! Your order don mark as paid.", "A ti gba owó rẹ! Àṣẹ rẹ ti di èyí tí a san.", "An karɓi kuɗinka! An sanya odarka a matsayin an biya.", "Anatala ụgwọ gị! Ndabere gị bụzi nke akwụrụ ụgwọ."],
    "Payment was not completed. You can try again or contact the vendor.": ["Payment no complete. You fit try again or talk to the seller.", "Ìsanwó kò parí. O lè gbìyànjú lẹ́ẹ̀kansí tàbí kàn sí oníṣòwò.", "Biyan bai cika ba. Za ka iya sake gwadawa ko tuntuɓi mai sayarwa.", "Ịkwụ ụgwọ ezughị. Ị nwere ike ịnwa ọzọ ma ọ bụ kpọtụrụ onye ahịa."],
    "cash on delivery": ["pay when e reach", "san nígbà tí ó bá dé", "biya lokacin isarwa", "kwụọ ụgwọ mgbe e bufere"],
    "bank transfer": ["bank transfer", "ìfiránṣẹ́ báǹkì", "canja wurin banki", "nnyefe ego banki"],
    "flutterwave": ["flutterwave", "flutterwave", "flutterwave", "flutterwave"],
    "Cash on delivery": ["Pay when e reach", "San nígbà tí ó bá dé", "Biya lokacin isarwa", "Kwụọ ụgwọ mgbe e bufere"],
    "Payment pending": ["Payment never enter", "Ìsanwó ń dúró", "Ana jiran biya", "Ịkwụ ụgwọ na-eche"],

    /* ============ CHAT WIDGET ============ */
    "Enter your phone number to see your orders and chat with vendors.": ["Enter your phone number to see your orders and chat sellers.", "Tẹ nọ́mbà fóònù rẹ sí i láti rí àwọn àṣẹ rẹ kí o sì bá àwọn oníṣòwò sọ̀rọ̀.", "Shigar da lambar wayarka don ganin odojinka da yin hira da masu sayarwa.", "Tinye nọmba ekwentị gị ka ị hụ ndabere gị ma soro ndị ahịa kparịta ụka."],
    "Find My Orders": ["Find My Orders", "Wá Àwọn Àṣẹ Mi", "Nemo Odojina", "Chọta Ndabere M"],
    "Or jump straight to one order:": ["Or enter one order straight:", "Tàbí lọ tààrà sí àṣẹ kan:", "Ko kai tsaye zuwa oda ɗaya:", "Ma ọ bụ gaa ozugbo na otu ndabere:"],
    "Open That Order's Chat": ["Open That Order Chat", "Ṣí Ìjíròrò Àṣẹ Náà", "Buɗe Hirar Wannan Odar", "Mepee Mkparịta Ụka Ndabere Ahụ"],
    "Loading your orders...": ["Your orders dey load...", "Ń gbé àwọn àṣẹ rẹ wọlé...", "Ana loda odojinka...", "Na-ebudata ndabere gị..."],
    "Could not load orders. Try again.": ["We no fit load your orders. Try again.", "A kò lè gbé àwọn àṣẹ wọlé. Gbìyànjú lẹ́ẹ̀kansí.", "Ba a iya loda odoji ba. Sake gwadawa.", "Enweghị ike ibudata ndabere. Nwaa ọzọ."],
    "Your Conversations": ["Your Chats", "Àwọn Ìjíròrò Rẹ", "Hirarrakinka", "Mkparịta Ụka Gị"],
    "No orders found for that number.": ["We no see any order for that number.", "A kò rí àṣẹ kankan fún nọ́mbà náà.", "Ba a sami oda ga wannan lambar ba.", "Ahụghị ndabere ọ bụla maka nọmba ahụ."],
    "Enter both your phone number and the order code.": ["Abeg enter your phone number and the order code.", "Tẹ nọ́mbà fóònù rẹ àti kóòdù àṣẹ sí i.", "Shigar da lambar wayarka da lambar odar.", "Tinye nọmba ekwentị gị na koodu ndabere."],

    /* ============ CUSTOMER DASHBOARD / ORDERS / SETTINGS ============ */
    "Spent This Month": ["Wetin You Spend This Month", "Owó Tí O Ná Lóṣù Yìí", "Kuɗin da Ka Kashe Wannan Watan", "Ego I Mefuru N'ọnwa A"],
    "Total Orders": ["Total Orders", "Àpapọ̀ Àwọn Àṣẹ", "Jimlar Odoji", "Ngụkọta Ndabere"],
    "Search for stores, products, or categories...": ["Find shops, goods, or category...", "Wá àwọn ilé-ìtajà, ọjà, tàbí ẹ̀ka...", "Nemo shaguna, kayayyaki, ko nau'i...", "Chọọ ụlọ ahịa, ngwaahịa, ma ọ bụ ụdị..."],
    "Featured Stores": ["Top Shops", "Àwọn Ilé-Ìtajà Pàtàkì", "Fitattun Shaguna", "Ụlọ Ahịa Ndị Kachasị"],
    "Recent Orders": ["Recent Orders", "Àwọn Àṣẹ Tuntun", "Odoji na Kwanan Nan", "Ndabere Ndị Na-adịbeghị Anya"],
    "No orders yet": ["No order yet", "Kò sí àṣẹ kankan síbẹ̀", "Babu oda tukuna", "Enwebeghị ndabere"],
    "No orders found": ["We no see any order", "A kò rí àṣẹ kankan", "Ba a sami oda ba", "Ahụghị ndabere ọ bụla"],
    "No orders with this status": ["No order dey with this status", "Kò sí àṣẹ pẹ̀lú ipò yìí", "Babu oda da wannan matsayin", "Ọ dịghị ndabere nwere ọnọdụ a"],
    "Start shopping to see your orders here": ["Start to buy make your orders show here", "Bẹ̀rẹ̀ sí rajà kí àwọn àṣẹ rẹ lè hàn níbí", "Fara siyayya don ganin odojinka a nan", "Malite ịzụ ahịa ka ndabere gị pụta ebe a"],
    "No stores available yet": ["No shop dey available yet", "Kò sí ilé-ìtajà kankan síbẹ̀", "Babu shago da ake da shi tukuna", "Enwebeghị ụlọ ahịa dị"],
    "Track and manage your orders": ["Track and manage your orders", "Bójútó kí o sì ṣàkóso àwọn àṣẹ rẹ", "Bi diddigi ka sarrafa odojinka", "Soro ma jikwaa ndabere gị"],
    "Account Settings": ["Account Settings", "Ètò Àkàǹtì", "Saitunan Asusu", "Ntọala Akaụntụ"],
    "Manage your profile, address, and preferences": ["Manage your profile, address, and choices", "Ṣàkóso profáìlì, àdírẹ́sì, àti àṣàyàn rẹ", "Sarrafa bayananka, adireshi, da zaɓinka", "Jikwaa profaịlụ, adreesị, na nhọrọ gị"],
    "Profile Information": ["Your Details", "Àlàyé Profáìlì", "Bayanan Bayanin Martaba", "Ozi Profaịlụ"],
    "Preferences": ["Choices", "Àwọn Àṣàyàn", "Zaɓuɓɓuka", "Nhọrọ"],
    "Push Notifications": ["Phone Alerts", "Ìfitónilétí Fóònù", "Sanarwar Waya", "Ọkwa Ekwentị"],
    "Receive notifications about order updates": ["Get alert when your order change", "Gba ìfitónilétí nípa ìmúdójúìwọ̀n àṣẹ", "Karɓi sanarwa game da sabunta oda", "Nata ọkwa gbasara mmelite ndabere"],
    "Email Updates": ["Email Updates", "Ìmúdójúìwọ̀n Ímeèlì", "Sabuntawa ta Imel", "Mmelite Email"],
    "Receive promotional emails and newsletters": ["Get promo emails and newsletter", "Gba ímeèlì ìpolówó àti ìwé ìròyìn", "Karɓi imel na tallace-tallace da wasiƙun labarai", "Nata email mgbasa ozi na akwụkwọ akụkọ"],
    "Security": ["Security", "Ààbò", "Tsaro", "Nchekwa"],
    "New Password": ["New Password", "Ọ̀rọ̀ Aṣínà Tuntun", "Sabuwar Kalmar Sirri", "Okwuntughe Ọhụrụ"],
    "Confirm New Password": ["Confirm New Password", "Jẹ́rìí Ọ̀rọ̀ Aṣínà Tuntun", "Tabbatar da Sabuwar Kalmar Sirri", "Kwado Okwuntughe Ọhụrụ"],
    "Confirm new password": ["Confirm new password", "Jẹ́rìí ọ̀rọ̀ aṣínà tuntun", "Tabbatar da sabuwar kalmar sirri", "Kwado okwuntughe ọhụrụ"],
    "Leave blank to keep current": ["Leave am empty if you no wan change am", "Fi sílẹ̀ ní òfìfo bí o kò bá fẹ́ yí i padà", "Bar shi babu komai idan ba za ka canza ba", "Hapụ ya ka ọ tọgbọrọ ma ị chọghị ịgbanwe ya"],
    "Enter your delivery address": ["Enter your delivery address", "Tẹ àdírẹ́sì ìfijíṣẹ́ rẹ sí i", "Shigar da adireshin isarwa", "Tinye adreesị nnyefe gị"],
    "Delete Account": ["Delete Account", "Paarẹ́ Àkàǹtì", "Share Asusu", "Hichapụ Akaụntụ"],
    "Are you sure you want to delete your account? This action cannot be undone.": ["You sure say you wan delete your account? You no fit undo am.", "Ṣé ó dá ọ lójú pé o fẹ́ paarẹ́ àkàǹtì rẹ? A kò lè yí ìgbésẹ̀ yìí padà.", "Ka tabbata kana son share asusunka? Ba za a iya gyara wannan ba.", "Ị ji n'aka na ị chọrọ ihichapụ akaụntụ gị? Enweghị ike ịgbanwe nke a."],
    "Account deletion request submitted. This feature requires admin confirmation.": ["We don send your account deletion request. Admin go confirm am.", "A ti fi ìbéèrè ìparẹ́ àkàǹtì sílẹ̀. Ó nílò ìmúdájú alábòójútó.", "An miƙa buƙatar share asusu. Wannan yana buƙatar tabbatarwar mai gudanarwa.", "E nyefeela arịrịọ ihichapụ akaụntụ. Nke a chọrọ nkwado onye nchịkwa."],
    "Passwords do not match": ["The passwords no match", "Àwọn ọ̀rọ̀ aṣínà kò bára mu", "Kalmomin sirri ba su daidaita ba", "Okwuntughe abụọ adabaghị"],
    "Password must be at least 6 characters": ["Password must reach 6 characters", "Ọ̀rọ̀ aṣínà gbọ́dọ̀ jẹ́ ó kéré tán lẹ́tà mẹ́fà", "Kalmar sirri dole ta kasance aƙalla haruffa 6", "Okwuntughe ga-adịrịrị opekempe mkpụrụedemede 6"],
    "Profile updated successfully!": ["Your profile don update well well!", "A ti ṣe ìmúdójúìwọ̀n profáìlì rẹ ní àṣeyọrí!", "An sabunta bayanan martabarka cikin nasara!", "Emelitela profaịlụ gị nke ọma!"],
    "Failed to update profile": ["We no fit update your profile", "A kò lè ṣe ìmúdójúìwọ̀n profáìlì", "An kasa sabunta bayanan martaba", "Enweghị ike imelite profaịlụ"],

    /* ============ AUTH: LOGIN / REGISTER ============ */
    "Welcome Back": ["Welcome Back", "Kú Àbọ̀", "Barka da Dawowa", "Nnọọ Ọzọ"],
    "Login to your VendorHub account": ["Login to your VendorHub account", "Wọlé sí àkàǹtì VendorHub rẹ", "Shiga asusun VendorHub ɗinka", "Banye n'akaụntụ VendorHub gị"],
    "Demo Accounts:": ["Demo Accounts:", "Àwọn Àkàǹtì Àpẹẹrẹ:", "Asusun Gwaji:", "Akaụntụ Nnwale:"],
    "Demo:": ["Demo:", "Àpẹẹrẹ:", "Gwaji:", "Nnwale:"],
    "Admin:": ["Admin:", "Alábòójútó:", "Mai Gudanarwa:", "Onye Nchịkwa:"],
    "Create customer/vendor accounts via registration": ["Open customer/seller account through registration", "Ṣí àkàǹtì oníbàárà/oníṣòwò nípasẹ̀ ìforúkọsílẹ̀", "Ƙirƙiri asusun abokin ciniki/mai sayarwa ta rajista", "Mepụta akaụntụ onye ahịa/onye na-ere ahịa site na ndebanye aha"],
    "Register as vendor to create new accounts": ["Register as seller to open new account", "Forúkọsílẹ̀ gẹ́gẹ́ bí oníṣòwò láti ṣí àkàǹtì tuntun", "Yi rajista a matsayin mai sayarwa don ƙirƙirar sabon asusu", "Debanye aha dịka onye na-ere ahịa iji mepụta akaụntụ ọhụrụ"],
    "Enter your email": ["Enter your email", "Tẹ ímeèlì rẹ sí i", "Shigar da imel ɗinka", "Tinye email gị"],
    "Enter your password": ["Enter your password", "Tẹ ọ̀rọ̀ aṣínà rẹ sí i", "Shigar da kalmar sirrinka", "Tinye okwuntughe gị"],
    "Logging in...": ["We dey log you in...", "Ń wọlé...", "Ana shiga...", "Na-abanye..."],
    "Login successful! Redirecting...": ["You don login! We dey carry you go...", "Ìwọlé yọrí sí rere! Ń darí rẹ...", "An shiga cikin nasara! Ana tura ka...", "Ịbanye gara nke ọma! Na-eduga gị..."],
    "Login failed": ["Login no work", "Ìwọlé kùnà", "Shiga bai yi nasara ba", "Ịbanye adaghị"],
    "Don't have an account?": ["You no get account?", "O kò ní àkàǹtì?", "Ba ka da asusu?", "Ị nweghị akaụntụ?"],
    "Don't have a vendor account?": ["You no get seller account?", "O kò ní àkàǹtì oníṣòwò?", "Ba ka da asusun mai sayarwa?", "Ị nweghị akaụntụ onye ahịa?"],
    "Already have an account?": ["You get account already?", "O ti ní àkàǹtì?", "Kana da asusu?", "Ị nwerela akaụntụ?"],
    "Already a vendor?": ["You be seller already?", "O ti jẹ́ oníṣòwò?", "Kai mai sayarwa ne?", "Ị bụzi onye na-ere ahịa?"],
    "Glad to See You Again": ["We Happy To See You Again", "Inú Wa Dùn Láti Tún Rí Ọ", "Muna Farin Cikin Sake Ganin Ka", "Obi Dị Anyị Ụtọ Ịhụ Gị Ọzọ"],
    "Login to manage your orders, track deliveries, or manage your store inventory and sales.": ["Login to manage your orders, track delivery, or manage your shop stock and sales.", "Wọlé láti ṣàkóso àwọn àṣẹ rẹ, tọpa ìfijíṣẹ́, tàbí ṣàkóso ọjà àti títà ilé-ìtajà rẹ.", "Shiga don sarrafa odojinka, bin diddigin isarwa, ko sarrafa kaya da sayarwar shagonka.", "Banye iji jikwaa ndabere gị, soro nnyefe, ma ọ bụ jikwaa ngwaahịa na ire ere ụlọ ahịa gị."],
    "Join VendorHub and start shopping or selling locally": ["Join VendorHub make you start to buy or sell for your area", "Dara pọ̀ mọ́ VendorHub kí o sì bẹ̀rẹ̀ sí rajà tàbí tà ní agbègbè rẹ", "Shiga VendorHub ka fara siyayya ko sayarwa a gida", "Sonye na VendorHub ma malite ịzụ ma ọ bụ ire ahịa n'obodo gị"],
    "Must be at least 6 characters long": ["E must reach 6 characters", "Ó gbọ́dọ̀ jẹ́ ó kéré tán lẹ́tà mẹ́fà", "Dole ya kasance aƙalla haruffa 6", "Ọ ga-adịrịrị opekempe mkpụrụedemede 6"],
    "Min 6 characters": ["Minimum 6 characters", "Ó kéré tán lẹ́tà mẹ́fà", "Aƙalla haruffa 6", "Opekempe mkpụrụedemede 6"],
    "Creating account...": ["We dey open your account...", "Ń ṣí àkàǹtì...", "Ana ƙirƙirar asusu...", "Na-emepụta akaụntụ..."],
    "Welcome to VendorHub": ["Welcome to VendorHub", "Kàábọ̀ sí VendorHub", "Barka da zuwa VendorHub", "Nnọọ na VendorHub"],
    "Connect with local businesses in your area. Shop fresh groceries, baked goods, electronics, and more — all without commission fees.": ["Connect with businesses for your area. Buy fresh foodstuff, bread, electronics, and more — no commission at all.", "So pọ̀ mọ́ àwọn iṣẹ́ agbègbè rẹ. Ra oúnjẹ tútù, búrẹ́dì, ẹ̀rọ iná, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ — láìsí owó kọmíṣọ̀nnì.", "Haɗa kai da kasuwancin gida a yankinka. Sayi sabbin kayan abinci, gurasa, kayan lantarki, da ƙari — babu kuɗin kwamiti.", "Jikọọ na azụmahịa obodo gị. Zụta nri ọhụrụ, achịcha, ngwa eletrọnịkị, na ndị ọzọ — na-enweghị ụgwọ ọkwa."],
    "Access your store dashboard and manage orders": ["Enter your shop dashboard and manage orders", "Wọlé sí dásíbọ́ọ̀dù ilé-ìtajà rẹ kí o sì ṣàkóso àwọn àṣẹ", "Shiga dashboard na shagonka ka sarrafa odoji", "Nweta dashboard ụlọ ahịa gị ma jikwaa ndabere"],
    "Vendor Portal": ["Seller Portal", "Ẹnu-ọ̀nà Oníṣòwò", "Shafin Mai Sayarwa", "Ọnụ Ụzọ Onye Ahịa"],
    "Manage your products, track inventory, process orders, and grow your business with VendorHub's vendor tools.": ["Manage your goods, track your stock, handle orders, and grow your business with VendorHub seller tools.", "Ṣàkóso àwọn ọjà rẹ, tọpa ọjà tó kù, ṣe àwọn àṣẹ, kí o sì gbé iṣẹ́ rẹ ga pẹ̀lú irinṣẹ́ oníṣòwò VendorHub.", "Sarrafa kayayyakinka, bi kaya, aiwatar da odoji, ka haɓaka kasuwancinka da kayan aikin masu sayarwa na VendorHub.", "Jikwaa ngwaahịa gị, soro ihe dị n'ahịa, rụọ ndabere, ma zụlite azụmahịa gị site na ngwaọrụ VendorHub."],
    "Join VendorHub and start selling to local customers": ["Join VendorHub make you start to sell to customers for your area", "Dara pọ̀ mọ́ VendorHub kí o sì bẹ̀rẹ̀ sí tà fún àwọn oníbàárà agbègbè", "Shiga VendorHub ka fara sayarwa ga abokan ciniki na gida", "Sonye na VendorHub ma malite ire ahịa nye ndị ahịa obodo"],
    "Create Vendor Account": ["Open Seller Account", "Ṣí Àkàǹtì Oníṣòwò", "Ƙirƙiri Asusun Mai Sayarwa", "Mepụta Akaụntụ Onye Ahịa"],
    "Vendor account created! Redirecting to login...": ["Seller account don open! We dey carry you go login...", "A ti ṣí àkàǹtì oníṣòwò! Ń darí rẹ sí ìwọlé...", "An ƙirƙiri asusun mai sayarwa! Ana tura ka zuwa shiga...", "Emepụtala akaụntụ onye ahịa! Na-eduga gị na nbanye..."],
    "Account created! Redirecting to login...": ["Account don open! We dey carry you go login...", "A ti ṣí àkàǹtì! Ń darí rẹ sí ìwọlé...", "An ƙirƙiri asusu! Ana tura ka zuwa shiga...", "Emepụtala akaụntụ! Na-eduga gị na nbanye..."],
    "Registration failed": ["Registration no work", "Ìforúkọsílẹ̀ kùnà", "Rajista bai yi nasara ba", "Ndebanye aha adaghị"],
    "Sell on VendorHub": ["Sell For VendorHub", "Tà Lórí VendorHub", "Sayar a VendorHub", "Ree Ahịa Na VendorHub"],
    "Reach thousands of local customers with zero commission fees. Manage your store, track inventory, and grow your business.": ["Reach thousands of customers for your area with zero commission. Manage your shop, track your stock, and grow your business.", "Dé ọ̀dọ̀ ẹgbẹẹgbẹ̀rún àwọn oníbàárà agbègbè láìsí owó kọmíṣọ̀nnì. Ṣàkóso ilé-ìtajà rẹ, tọpa ọjà, kí o sì gbé iṣẹ́ rẹ ga.", "Ka isa ga dubban abokan ciniki na gida ba tare da kuɗin kwamiti ba. Sarrafa shagonka, bi kaya, ka haɓaka kasuwancinka.", "Ruo puku kwuru puku ndị ahịa obodo na-enweghị ụgwọ ọkwa. Jikwaa ụlọ ahịa gị, soro ngwaahịa, ma zụlite azụmahịa gị."],

    /* ============ VENDOR DASHBOARD ============ */
    "View Orders": ["See Orders", "Wo Àwọn Àṣẹ", "Duba Odoji", "Lelee Ndabere"],
    "Add Product": ["Add Goods", "Fi Ọjà Kún", "Ƙara Kaya", "Tinye Ngwaahịa"],
    "Edit Product": ["Change Goods", "Ṣàtúnṣe Ọjà", "Gyara Kaya", "Dezie Ngwaahịa"],
    "Check Stock": ["Check Stock", "Ṣàyẹ̀wò Ọjà", "Duba Kaya", "Lelee Ihe Dị N'ahịa"],
    "View Reports": ["See Reports", "Wo Àwọn Ìjábọ̀", "Duba Rahotanni", "Lelee Akụkọ"],
    "Monthly Revenue": ["Money For This Month", "Owó Wíwọlé Oṣooṣù", "Kuɗin Shiga na Wata", "Ego Ọnwa"],
    "Pending Orders": ["Orders Wey Dey Wait", "Àwọn Àṣẹ Tí Ń Dúró", "Odojin da Ake Jira", "Ndabere Na-eche"],
    "Total Customers": ["Total Customers", "Àpapọ̀ Àwọn Oníbàárà", "Jimlar Abokan Ciniki", "Ngụkọta Ndị Ahịa"],
    "Order ID": ["Order ID", "ID Àṣẹ", "Lambar Oda", "ID Ndabere"],
    "Order Management": ["Manage Orders", "Ìṣàkóso Àwọn Àṣẹ", "Sarrafa Odoji", "Njikwa Ndabere"],
    "Manage and update customer orders": ["Manage and update customer orders", "Ṣàkóso kí o sì ṣàtúnṣe àwọn àṣẹ oníbàárà", "Sarrafa da sabunta odojin abokan ciniki", "Jikwaa ma melite ndabere ndị ahịa"],
    "Search orders...": ["Find orders...", "Wá àwọn àṣẹ...", "Nemo odoji...", "Chọọ ndabere..."],
    "Product Management": ["Manage Goods", "Ìṣàkóso Ọjà", "Sarrafa Kayayyaki", "Njikwa Ngwaahịa"],
    "Manage your store products": ["Manage your shop goods", "Ṣàkóso àwọn ọjà ilé-ìtajà rẹ", "Sarrafa kayayyakin shagonka", "Jikwaa ngwaahịa ụlọ ahịa gị"],
    "No products yet. Add your first product!": ["No goods yet. Add your first goods!", "Kò sí ọjà kankan síbẹ̀. Fi ọjà àkọ́kọ́ rẹ kún!", "Babu kayayyaki tukuna. Ƙara kayanka na farko!", "Enwebeghị ngwaahịa. Tinye ngwaahịa mbụ gị!"],
    "Sales Reports": ["Sales Reports", "Àwọn Ìjábọ̀ Títà", "Rahotannin Sayarwa", "Akụkọ Ire Ere"],
    "Insights into your business performance": ["See how your business dey perform", "Ìjìnlẹ̀ òye nípa iṣẹ́ rẹ", "Fahimtar aikin kasuwancinka", "Nghọta banyere arụmọrụ azụmahịa gị"],
    "Monthly Sales": ["Sales For Month", "Títà Oṣooṣù", "Sayarwar Wata", "Ire Ere Ọnwa"],
    "Top Products": ["Best Selling Goods", "Àwọn Ọjà Tó Ń Tà Jùlọ", "Manyan Kayayyaki", "Ngwaahịa Kacha Ere"],
    "Total Revenue": ["Total Money", "Àpapọ̀ Owó Wíwọlé", "Jimlar Kuɗin Shiga", "Ngụkọta Ego"],
    "No sales data yet": ["No sales data yet", "Kò sí dátà títà kankan síbẹ̀", "Babu bayanan sayarwa tukuna", "Enwebeghị data ire ere"],
    "No product sales yet": ["No goods don sell yet", "Kò sí títà ọjà kankan síbẹ̀", "Babu sayarwar kaya tukuna", "Enwebeghị ire ere ngwaahịa"],
    "Every conversation with your customers, in one place": ["Every gist with your customers, for one place", "Gbogbo ìjíròrò pẹ̀lú àwọn oníbàárà rẹ, ní ibì kan", "Duk hirarrakinka da abokan ciniki, a wuri ɗaya", "Mkparịta ụka niile gị na ndị ahịa gị, n'otu ebe"],
    "Loading conversations...": ["Chats dey load...", "Ń gbé àwọn ìjíròrò wọlé...", "Ana loda hirarraki...", "Na-ebudata mkparịta ụka..."],
    "No conversations yet. Messages from customers will show up here.": ["No chat yet. Message from customers go show here.", "Kò sí ìjíròrò kankan síbẹ̀. Àwọn ìfiránṣẹ́ láti ọ̀dọ̀ oníbàárà yóò hàn níbí.", "Babu hira tukuna. Saƙonni daga abokan ciniki za su bayyana nan.", "Enwebeghị mkparịta ụka. Ozi ndị ahịa ga-apụta ebe a."],
    "Could not load conversations.": ["We no fit load the chats.", "A kò lè gbé àwọn ìjíròrò wọlé.", "Ba a iya loda hirarraki ba.", "Enweghị ike ibudata mkparịta ụka."],
    "Order Chat": ["Order Chat", "Ìjíròrò Àṣẹ", "Hirar Oda", "Mkparịta Ụka Ndabere"],
    "Product Name": ["Goods Name", "Orúkọ Ọjà", "Sunan Kaya", "Aha Ngwaahịa"],
    "Price (₦)": ["Price (₦)", "Owó (₦)", "Farashi (₦)", "Ọnụahịa (₦)"],
    "Stock Quantity": ["How Many Dey Ground", "Iye Ọjà Tó Wà", "Adadin Kaya", "Ọnụọgụ Ihe Dị"],
    "Product Image": ["Goods Picture", "Àwòrán Ọjà", "Hoton Kaya", "Foto Ngwaahịa"],
    "Click to upload image": ["Click to upload picture", "Tẹ láti gbé àwòrán sókè", "Danna don loda hoto", "Pịa ka ị bulite foto"],
    "JPG, PNG, WEBP, GIF up to 5MB": ["JPG, PNG, WEBP, GIF reach 5MB", "JPG, PNG, WEBP, GIF títí dé 5MB", "JPG, PNG, WEBP, GIF har zuwa 5MB", "JPG, PNG, WEBP, GIF ruo 5MB"],
    "Paste Image URL": ["Paste Picture Link", "Lẹ̀ URL Àwòrán mọ́", "Manna Hanyar Hoto", "Mado URL Foto"],
    "Save Product": ["Save Goods", "Fi Ọjà Pamọ́", "Ajiye Kaya", "Chekwaa Ngwaahịa"],
    "Failed to save product": ["We no fit save the goods", "A kò lè fi ọjà pamọ́", "An kasa ajiye kayan", "Enweghị ike ịchekwa ngwaahịa"],
    "Are you sure you want to delete this product?": ["You sure say you wan delete this goods?", "Ṣé ó dá ọ lójú pé o fẹ́ paarẹ́ ọjà yìí?", "Ka tabbata kana son share wannan kayan?", "Ị ji n'aka na ị chọrọ ihichapụ ngwaahịa a?"],
    "Confirmed automatically via Flutterwave": ["Flutterwave confirm am automatically", "Flutterwave jẹ́rìí sí i fúnra rẹ̀", "An tabbatar ta atomatik ta Flutterwave", "Flutterwave kwadoro ya na-akpaghị aka"],
    "You:": ["You:", "Ìwọ:", "Kai:", "Gị:"],

    /* ============ INVENTORY ============ */
    "Track stock levels and manage inventory": ["Track your stock and manage am", "Tọpa iye ọjà kí o sì ṣàkóso ìkówójọ", "Bi diddigin kaya ka sarrafa su", "Soro ihe dị n'ahịa ma jikwaa ha"],
    "Total Products": ["Total Goods", "Àpapọ̀ Àwọn Ọjà", "Jimlar Kayayyaki", "Ngụkọta Ngwaahịa"],
    "Low Stock Items": ["Goods Wey Don Dey Finish", "Àwọn Ọjà Tó Ti Fẹ́ Tán", "Kayan da Suke Ƙarewa", "Ngwaahịa Na-agwụ Agwụ"],
    "Well Stocked": ["Plenty Dey Ground", "Ó Kún Fún Ọjà", "Kaya Ya Isa", "Ihe Zuru Ezu"],
    "Current Stock": ["Wetin Dey Ground Now", "Ọjà Tó Wà Lọ́wọ́lọ́wọ́", "Kayan da Ake da Su Yanzu", "Ihe Dị N'ahịa Ugbu A"],
    "Stock Adjustment": ["Adjust Stock", "Ìṣàtúnṣe Ọjà", "Daidaita Kaya", "Nhazi Ihe Dị N'ahịa"],
    "Adjust Stock": ["Adjust Stock", "Ṣàtúnṣe Ọjà", "Daidaita Kaya", "Hazie Ihe Dị N'ahịa"],
    "Stock Movement History": ["Stock Movement History", "Ìtàn Ìgbésẹ̀ Ọjà", "Tarihin Motsin Kaya", "Akụkọ Mmegharị Ngwaahịa"],
    "Every restock, order, and adjustment": ["Every restock, order, and adjustment", "Gbogbo àtúngbé ọjà, àṣẹ, àti ìṣàtúnṣe", "Duk sake cika kaya, oda, da daidaitawa", "Nkwụnye ọhụrụ ọ bụla, ndabere, na nhazi"],
    "Change": ["Change", "Ìyípadà", "Canji", "Mgbanwe"],
    "Reason": ["Reason", "Ìdí", "Dalili", "Ihe Kpatara Ya"],
    "Select product...": ["Choose goods...", "Yan ọjà...", "Zaɓi kaya...", "Họrọ ngwaahịa..."],
    "Quantity Change (+ to add, - to remove)": ["Quantity Change (+ to add, - to remove)", "Ìyípadà Iye (+ láti fi kún, - láti yọ kúrò)", "Canjin Adadi (+ don ƙarawa, - don cirewa)", "Mgbanwe Ọnụọgụ (+ iji tinye, - iji wepụ)"],
    "e.g. 10 or -5": ["like 10 or -5", "bí 10 tàbí -5", "misali 10 ko -5", "dịka 10 ma ọ bụ -5"],
    "Restock, damage, etc.": ["Restock, damage, etc.", "Àtúngbé ọjà, ìbàjẹ́, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ.", "Sake cika, lalacewa, da sauransu.", "Nkwụnye ọhụrụ, mmebi, wdg."],
    "Save Adjustment": ["Save Adjustment", "Fi Ìṣàtúnṣe Pamọ́", "Ajiye Daidaitawa", "Chekwaa Nhazi"],
    "No products in inventory": ["No goods dey your stock", "Kò sí ọjà nínú ìkówójọ", "Babu kayayyaki a cikin kaya", "Ọ dịghị ngwaahịa n'ụlọ nkwakọba"],
    "No movement recorded yet. Orders and adjustments will appear here.": ["No movement dey yet. Orders and adjustments go show here.", "Kò sí ìgbésẹ̀ tí a kọ sílẹ̀ síbẹ̀. Àwọn àṣẹ àti ìṣàtúnṣe yóò hàn níbí.", "Ba a rubuta wani motsi ba tukuna. Odoji da daidaitawa za su bayyana nan.", "Edepụtabeghị mmegharị ọ bụla. Ndabere na nhazi ga-apụta ebe a."],
    "Please select a product and enter a valid quantity": ["Abeg choose goods and enter correct quantity", "Jọ̀wọ́ yan ọjà kí o sì tẹ iye tó tọ́ sí i", "Da fatan zaɓi kaya ka shigar da adadi mai kyau", "Biko họrọ ngwaahịa ma tinye ọnụọgụ ziri ezi"],
    "Failed to adjust stock": ["We no fit adjust the stock", "A kò lè ṣàtúnṣe ọjà", "An kasa daidaita kaya", "Enweghị ike ịhazi ihe dị n'ahịa"],

    /* ============ VENDOR SETTINGS ============ */
    "Business Settings": ["Business Settings", "Ètò Òwò", "Saitunan Kasuwanci", "Ntọala Azụmahịa"],
    "Manage your store profile and business information": ["Manage your shop profile and business info", "Ṣàkóso profáìlì ilé-ìtajà rẹ àti àlàyé òwò", "Sarrafa bayanan shagonka da bayanan kasuwanci", "Jikwaa profaịlụ ụlọ ahịa gị na ozi azụmahịa"],
    "Business Information": ["Business Info", "Àlàyé Òwò", "Bayanan Kasuwanci", "Ozi Azụmahịa"],
    "Business Name": ["Business Name", "Orúkọ Òwò", "Sunan Kasuwanci", "Aha Azụmahịa"],
    "Business Category": ["Business Category", "Ẹ̀ka Òwò", "Nau'in Kasuwanci", "Ụdị Azụmahịa"],
    "Business Description": ["Business Description", "Àlàyé Òwò", "Bayanin Kasuwanci", "Nkọwa Azụmahịa"],
    "Describe your business...": ["Talk about your business...", "Ṣàlàyé òwò rẹ...", "Bayyana kasuwancinka...", "Kọwaa azụmahịa gị..."],
    "Business Phone": ["Business Phone", "Fóònù Òwò", "Wayar Kasuwanci", "Ekwentị Azụmahịa"],
    "Business Email": ["Business Email", "Ímeèlì Òwò", "Imel na Kasuwanci", "Email Azụmahịa"],
    "Business Address": ["Business Address", "Àdírẹ́sì Òwò", "Adireshin Kasuwanci", "Adreesị Azụmahịa"],
    "Location & Hours": ["Location & Opening Hours", "Ipò àti Àkókò", "Wuri & Lokaci", "Ebe na Oge"],
    "Operating Hours": ["Opening Hours", "Àkókò Ìṣiṣẹ́", "Lokacin Aiki", "Oge Ọrụ"],
    "Latitude": ["Latitude", "Ìlà Ìdọ̀gba", "Latitude", "Latitude"],
    "Longitude": ["Longitude", "Ìlà Gígùn", "Longitude", "Longitude"],
    "Bank Details (For Payouts)": ["Bank Details (Make We Fit Pay You)", "Àlàyé Báǹkì (Fún Sísanwó)", "Bayanan Banki (Don Biyan Kuɗi)", "Nkọwa Akaụntụ (Maka Ịkwụ Gị Ụgwọ)"],
    "Bank Name": ["Bank Name", "Orúkọ Báǹkì", "Sunan Banki", "Aha Ụlọ Akụ"],
    "Loading banks...": ["Banks dey load...", "Ń gbé àwọn báǹkì wọlé...", "Ana loda bankuna...", "Na-ebudata ụlọ akụ..."],
    "Select your bank": ["Choose your bank", "Yan báǹkì rẹ", "Zaɓi bankinka", "Họrọ ụlọ akụ gị"],
    "Could not load banks — try again": ["We no fit load banks — try again", "A kò lè gbé àwọn báǹkì wọlé — gbìyànjú lẹ́ẹ̀kansí", "Ba a iya loda bankuna ba — sake gwadawa", "Enweghị ike ibudata ụlọ akụ — nwaa ọzọ"],
    "Needed so Flutterwave can pay you automatically for card/transfer orders": ["We need am so Flutterwave fit pay you automatically for card/transfer orders", "A nílò rẹ̀ kí Flutterwave lè san owó fún ọ fúnra rẹ̀ fún àwọn àṣẹ káàdì/ìfiránṣẹ́", "Ana buƙata don Flutterwave ya biya ka ta atomatik don odojin kati/canja wuri", "Achọrọ ya ka Flutterwave kwụọ gị ụgwọ na-akpaghị aka maka ndabere kaadị/nnyefe"],
    "Account Number": ["Account Number", "Nọ́mbà Àkàǹtì", "Lambar Asusu", "Nọmba Akaụntụ"],
    "Account Holder Name": ["Account Name", "Orúkọ Ẹni Tó Ní Àkàǹtì", "Sunan Mai Asusu", "Aha Onye Nwe Akaụntụ"],
    "Store Appearance": ["How Your Shop Go Look", "Ìrísí Ilé-Ìtajà", "Kamannin Shago", "Ọdịdị Ụlọ Ahịa"],
    "Store Banner URL": ["Shop Banner Link", "URL Àsíá Ilé-Ìtajà", "Hanyar Tutar Shago", "URL Ọkọlọtọ Ụlọ Ahịa"],
    "Store Logo URL": ["Shop Logo Link", "URL Àmì Ilé-Ìtajà", "Hanyar Alamar Shago", "URL Akara Ụlọ Ahịa"],
    "Close Store": ["Close Shop", "Ti Ilé-Ìtajà Pa", "Rufe Shago", "Mechie Ụlọ Ahịa"],
    "Are you sure you want to close your store? This action requires admin approval.": ["You sure say you wan close your shop? Admin go approve am first.", "Ṣé ó dá ọ lójú pé o fẹ́ ti ilé-ìtajà rẹ pa? Ìgbésẹ̀ yìí nílò ìfọwọ́sí alábòójútó.", "Ka tabbata kana son rufe shagonka? Wannan yana buƙatar amincewar mai gudanarwa.", "Ị ji n'aka na ị chọrọ imechi ụlọ ahịa gị? Nke a chọrọ nkwado onye nchịkwa."],
    "Store closure request submitted.": ["We don send your shop closing request.", "A ti fi ìbéèrè títì ilé-ìtajà sílẹ̀.", "An miƙa buƙatar rufe shago.", "E nyefeela arịrịọ imechi ụlọ ahịa."],
    "Business profile updated successfully! Flutterwave payouts are set up for your bank account.": ["Your business profile don update! Flutterwave payout don set for your bank account.", "A ti ṣe ìmúdójúìwọ̀n profáìlì òwò rẹ! A ti ṣètò ìsanwó Flutterwave fún àkàǹtì báǹkì rẹ.", "An sabunta bayanan kasuwancinka! An shirya biyan Flutterwave don asusun bankinka.", "Emelitela profaịlụ azụmahịa gị! Ahaziela ịkwụ ụgwọ Flutterwave maka akaụntụ gị."],
    "Business profile updated successfully!": ["Your business profile don update!", "A ti ṣe ìmúdójúìwọ̀n profáìlì òwò rẹ!", "An sabunta bayanan kasuwancinka!", "Emelitela profaịlụ azụmahịa gị!"]
  };

  /* ---------------------------------------------------------------------
     EXTRA STRINGS (short/edge cases produced by JavaScript)
     --------------------------------------------------------------------- */
  var VH_DICT_EXTRA = {
    "No orders": ["No order dey", "Kò sí àṣẹ kankan", "Babu odoji", "Ọ dịghị ndabere"],
    "Paid (Flutterwave)": ["Don Pay (Flutterwave)", "A Ti San (Flutterwave)", "An Biya (Flutterwave)", "Akwụọla (Flutterwave)"],
    "Paid (Manual)": ["Don Pay (By Hand)", "A Ti San (Ọwọ́)", "An Biya (Da Hannu)", "Akwụọla (N'aka)"],
    "✅ Paid (Flutterwave)": ["✅ Don Pay (Flutterwave)", "✅ A Ti San (Flutterwave)", "✅ An Biya (Flutterwave)", "✅ Akwụọla (Flutterwave)"],
    "✅ Paid (Manual)": ["✅ Don Pay (By Hand)", "✅ A Ti San (Ọwọ́)", "✅ An Biya (Da Hannu)", "✅ Akwụọla (N'aka)"],
    "sold": ["dem sell", "tà", "an sayar", "erere"],
    "orders": ["orders", "àwọn àṣẹ", "odoji", "ndabere"],
    "in stock": ["dey ground", "wà ní ilé-ìtajà", "yana nan a shago", "dị n'ahịa"],
    "stores nearby": ["shops dey near you", "àwọn ilé-ìtajà nítòsí", "shaguna kusa da kai", "ụlọ ahịa dị nso"],
    "Current": ["Now", "Lọ́wọ́lọ́wọ́", "Yanzu", "Ugbu a"],

    /* ============ STORE APPEARANCE UPLOAD (vendor settings) ============ */
    "Store Banner": ["Shop Banner", "Àsíá Ilé-Ìtajà", "Tutar Shago", "Ọkọlọtọ Ụlọ Ahịa"],
    "Store Logo": ["Shop Logo", "Àmì Ilé-Ìtajà", "Alamar Shago", "Akara Ụlọ Ahịa"],
    "Gallery": ["Gallery", "Gálárì", "Gallery", "Galari"],
    "Camera": ["Camera", "Kámẹ́rà", "Kyamara", "Kamera"],
    "Or paste image URL": ["Or paste picture link", "Tàbí lẹ URL àwòrán mọ́", "Ko manna hanyar hoto", "Ma ọ bụ mado URL foto"],
    "No banner yet": ["No banner yet", "Kò sí àsíá", "Babu tutar ba", "Enwebeghị ọkọlọtọ"],
    "No logo yet": ["No logo yet", "Kò sí àmì", "Babu alama ba", "Enwebeghị akara"],
    "Remove": ["Remove", "Yọ Kúrò", "Cire", "Wepụ"],
    "Uploading...": ["Uploading...", "Ń gbà sókè...", "Ana loda...", "Na-ebugo..."]
  };
  for (var __k in VH_DICT_EXTRA) { if (!VH_DICT[__k]) VH_DICT[__k] = VH_DICT_EXTRA[__k]; }


  /* ---------------------------------------------------------------------
     REVIEWED NATURAL LANGUAGE OVERRIDES
     ---------------------------------------------------------------------
     These are phrase-level translations for the main customer, vendor, chat,
     and admin flows. The engine remains source-text based.
     --------------------------------------------------------------------- */
  var VH_DICT_REVIEWED = {
    "Home": ["Home", "Ilé", "Gida", "Ụlọ"],
    "Browse Stores": ["Browse Shops", "Wo Àwọn Ilé-Ìtajà", "Duba Shaguna", "Lelee Ụlọ Ahịa"],
    "Browse Store": ["Browse Shop", "Wo Ilé-Ìtajà", "Duba Shago", "Lelee Ụlọ Ahịa"],
    "Browse More Stores": ["Browse More Shops", "Wo Àwọn Ilé-Ìtajà Mìíràn", "Duba Ƙarin Shaguna", "Lelee Ụlọ Ahịa Ndị Ọzọ"],
    "Vendor Login": ["Seller Login", "Ìwọlé Oníṣòwò", "Shiga Mai Sayarwa", "Nbanye Onye Na-ere Ahịa"],
    "Become a Vendor": ["Become a Seller", "Di Oníṣòwò", "Zama Mai Sayarwa", "Bụrụ Onye Na-ere Ahịa"],
    "Get Started": ["Start Here", "Bẹ̀rẹ̀ Níbí", "Fara Nan", "Malite Ebe A"],
    "Login": ["Login", "Wọlé", "Shiga", "Banye"],
    "Logout": ["Comot", "Jáde", "Fita", "Pụọ"],
    "Dashboard": ["Dashboard", "Dásíbọ́ọ̀dù", "Dashboard", "Ogwe Njikwa"],
    "Inventory": ["Stock", "Ìkójọpọ̀ Ọjà", "Kaya", "Nchekwa Ngwaahịa"],
    "Settings": ["Settings", "Ètò", "Saituna", "Ntọala"],
    "My Orders": ["My Orders", "Àwọn Àṣẹ Mi", "Odojina Na", "Ihe M Tụrụ"],
    "Map": ["Map", "Máàpù", "Taswira", "Maapụ"],
    "Store Map": ["Shop Map", "Máàpù Ilé-Ìtajà", "Taswirar Shaguna", "Maapụ Ụlọ Ahịa"],
    "Storefront": ["My Shop", "Ilé-Ìtajà Mi", "Shagona", "Ụlọ Ahịa M"],
    "Messages": ["Messages", "Àwọn Ìfiránṣẹ́", "Saƙonni", "Ozi"],
    "Orders": ["Orders", "Àwọn Àṣẹ", "Odoji", "Ndabere"],
    "Products": ["Products", "Àwọn Ọjà", "Kayayyaki", "Ngwaahịa"],
    "Reports": ["Reports", "Àwọn Ìjábọ̀", "Rahotanni", "Akụkọ"],
    "Search": ["Search", "Wá", "Nema", "Chọọ"],
    "Category": ["Category", "Ẹ̀ka", "Rukuni", "Ụdị"],
    "Status": ["Status", "Ipò", "Matsayi", "Ọnọdụ"],
    "Action": ["Action", "Ìgbésẹ̀", "Aiki", "Omume"],
    "Actions": ["Actions", "Àwọn Ìgbésẹ̀", "Ayyuka", "Omume"],
    "Date": ["Date", "Ọjọ́", "Kwanan Wata", "Ụbọchị"],
    "Price": ["Price", "Iye Owó", "Farashi", "Ọnụahịa"],
    "Stock": ["Stock", "Ọjà Tó Kù", "Kaya", "Ngwaahịa Fọdụrụ"],
    "Product": ["Product", "Ọjà", "Kaya", "Ngwaahịa"],
    "Customer": ["Customer", "Oníbàárà", "Abokin Ciniki", "Onye Ahịa"],
    "Amount": ["Amount", "Iye Owó", "Adadin Kuɗi", "Ego"],
    "Total": ["Total", "Àpapọ̀", "Jimla", "Ngụkọta"],
    "Payment": ["Payment", "Ìsanwó", "Biyan Kuɗi", "Ịkwụ Ụgwọ"],
    "Cancel": ["Cancel", "Fagilé", "Soke", "Kagbuo"],
    "Send": ["Send", "Ránṣẹ́", "Aika", "Zipu"],
    "Filter": ["Filter", "Àlẹ̀mọ́", "Tace", "Nyocha"],
    "View All": ["See All", "Wo Gbogbo", "Duba Duka", "Lelee Ha Niile"],
    "View": ["See", "Wò", "Duba", "Lelee"],
    "View Store": ["See Shop", "Wo Ilé-Ìtajà", "Duba Shago", "Lelee Ụlọ Ahịa"],
    "View Details": ["See Details", "Wo Àlàyé", "Duba Bayani", "Lelee Nkọwa"],
    "Edit": ["Edit", "Ṣàtúnṣe", "Gyara", "Dezie"],
    "Delete": ["Delete", "Paarẹ́", "Goge", "Hichapụ"],
    "Process": ["Process Am", "Ṣe É", "Aiwatar", "Mezuo"],
    "Adjust": ["Adjust", "Ṣàtúnṣe", "Daidaita", "Hazie"],
    "Remove": ["Remove", "Yọ Kúrò", "Cire", "Wepụ"],
    "Reorder": ["Order Again", "Tún Paṣẹ", "Sake Oda", "Tụọ Ọzọ"],
    "Contact": ["Contact", "Kàn Sí Wọ́n", "Tuntuɓa", "Kpọtụrụ"],
    "Loading...": ["E dey load...", "Ń gbé wọlé...", "Ana lodawa...", "Na-ebudata..."],
    "Saving...": ["E dey save...", "Ń ń fipamọ́...", "Ana ajiyewa...", "Na-echekwa..."],
    "Guest": ["Guest", "Àlejò", "Baƙo", "Ọbịa"],
    "Vendor": ["Seller", "Oníṣòwò", "Mai Sayarwa", "Onye Na-ere Ahịa"],
    "Other": ["Other", "Mìíràn", "Sauran", "Ndị Ọzọ"],
    "OR": ["OR", "TÀBÍ", "KO", "MA Ọ BỤ"],
    "All": ["All", "Gbogbo", "Duka", "Ha Niile"],
    "General": ["General", "Gbogbogbo", "Gabaɗaya", "Izugbe"],
    "Create Account": ["Create Account", "Ṣí Àkàǹtì", "Ƙirƙiri Asusu", "Mepụta Akaụntụ"],
    "Back to Home": ["Go Back Home", "Padà sí Ilé", "Koma Gida", "Laghachi Ụlọ"],
    "Back": ["Back", "Padà", "Koma", "Laghachi"],
    "Save Changes": ["Save Changes", "Fi Àyípadà Pamọ́", "Ajiye Canje-canje", "Chekwaa Mgbanwe"],
    "Description": ["Description", "Àlàyé", "Bayani", "Nkọwa"],
    "Phone Number": ["Phone Number", "Nọ́mbà Fóònù", "Lambar Waya", "Nọmba Ekwentị"],
    "Email Address": ["Email Address", "Àdírẹ́sì Ímeèlì", "Adireshin Imel", "Adreesị Email"],
    "Password": ["Password", "Ọ̀rọ̀ Aṣínà", "Kalmar Sirri", "Okwuntughe"],
    "First Name": ["First Name", "Orúkọ Àkọ́kọ́", "Sunan Farko", "Aha Mbụ"],
    "Last Name": ["Last Name", "Orúkọ Ìdílé", "Sunan Iyali", "Aha Ezinụlọ"],
    "Username": ["Username", "Orúkọ Olùlò", "Sunan Mai Amfani", "Aha Njirimara"],
    "City": ["City", "Ìlú", "Gari", "Obodo"],
    "Postal Code": ["Postal Code", "Kóòdù Ìfìwéránṣẹ́", "Lambar Gidan Waya", "Koodu Nzipụ Ozi"],
    "Street Address": ["Street Address", "Àdírẹ́sì Òpópónà", "Adireshin Titin", "Adreesị Okporo Ụzọ"],
    "Delivery Address": ["Delivery Address", "Àdírẹ́sì Ìfijíṣẹ́", "Adireshin Isarwa", "Adreesị Nnyefe"],
    "Payment Method": ["How You Wan Pay", "Ọ̀nà Ìsanwó", "Hanyar Biyan Kuɗi", "Ụzọ Ịkwụ Ụgwọ"],
    "Nearby": ["Near You", "Nítòsí Rẹ", "Kusa da Kai", "Dị Gị Nso"],
    "Lagos, Nigeria": ["Lagos, Naija", "Èkó, Nàìjíríà", "Legas, Nijeriya", "Lagos, Naịjirịa"],
    "Rating": ["Rating", "Ìdíwọ̀n", "Kimantawa", "Nlele"],
    "Mon-Sat 8AM-6PM": ["Mon-Sat 8AM-6PM", "Ajé-Àbámẹ́ta 8AM-6PM", "Litinin-Asabar 8AM-6PM", "Mọnde-Satọde 8AM-6PM"],
    "Welcome to VendorHub": ["Welcome to VendorHub", "Káàbọ̀ sí VendorHub", "Barka da zuwa VendorHub", "Nnọọ na VendorHub"],
    "No login needed. Browse stores on the map, add items to cart, and checkout with just your phone number.": ["You no need login. Browse shops for the map, add things to cart, then pay with only your phone number.", "Kò sí ìwọlé tí a nílò. Wo àwọn ilé-ìtajà lórí máàpù, fi ọjà sínú kẹ̀kẹ́, kí o sì san owó pẹ̀lú nọ́mbà fóònù rẹ nìkan.", "Ba sai ka shiga ba. Duba shaguna a taswira, saka kaya a cikin keken siyayya, sannan ka biya da lambar wayarka kawai.", "Ọ dịghị mkpa ịbanye. Lelee ụlọ ahịa na maapụ, tinye ihe n'ime nkata, wee jiri naanị nọmba ekwentị gị kwụọ ụgwọ."],
    "Nearby Stores": ["Shops Near You", "Àwọn Ilé-Ìtajà Nítòsí", "Shaguna Kusa da Kai", "Ụlọ Ahịa Dị Nso"],
    "Search stores...": ["Find shops...", "Wá àwọn ilé-ìtajà...", "Nemo shaguna...", "Chọọ ụlọ ahịa..."],
    "Use My Location": ["Use Where I Dey", "Lo Ipò Mi", "Yi Amfani da Wurina", "Jiri Ebe M Nọ"],
    "Locating...": ["We dey find where you dey...", "Ń wá ibi tí o wà...", "Ana neman inda kake...", "Na-achọ ebe ị nọ..."],
    "Location Found": ["We don find where you dey", "A ti rí ibi tí o wà", "An gano inda kake", "Achọtala ebe ị nọ"],
    "Loading stores...": ["Shops dey load...", "Ń gbé àwọn ilé-ìtajà wọlé...", "Ana loda shaguna...", "Na-ebudata ụlọ ahịa..."],
    "Loading products...": ["Goods dey load...", "Ń gbé àwọn ọjà wọlé...", "Ana loda kayayyaki...", "Na-ebudata ngwaahịa..."],
    "No stores found": ["We no see any shop", "A kò rí ilé-ìtajà kankan", "Ba a sami shago ba", "Ahụghị ụlọ ahịa ọ bụla"],
    "Try adjusting your filters": ["Try changing your filters", "Gbìyànjú láti ṣàtúnṣe àwọn àṣàyàn rẹ", "Gwada canza tacewarka", "Gbalịa ịgbanwe nhazi gị"],
    "Try adjusting your filters or search terms": ["Try changing your filters or search words", "Gbìyànjú láti ṣàtúnṣe àwọn àṣàyàn tàbí ọ̀rọ̀ ìwáàkiri rẹ", "Gwada canza tacewarka ko kalmomin nema", "Gbalịa ịgbanwe nhazi gị ma ọ bụ okwu ọchụchọ gị"],
    "You are here": ["Na here you dey", "Ibí ni o wà", "Kana nan", "Ebe a ka ị nọ"],
    "No account needed. Just your phone & address.": ["You no need account. Na your phone and address we need.", "Kò sí àkàǹtì tí a nílò. Nọ́mbà fóònù àti àdírẹ́sì rẹ nìkan ni a nílò.", "Ba sai asusu ba. Lambar wayarka da adireshi kawai muke bukata.", "Ọ dịghị mkpa akaụntụ. Naanị nọmba ekwentị na adreesị gị ka anyị chọrọ."],
    "Your Order": ["Wetin You Order", "Àṣẹ Rẹ", "Odarka", "Ihe Ị Tụrụ"],
    "We'll send your order confirmation & tracking link via SMS": ["We go send your order confirmation and tracking link by SMS.", "A ó fi ìmúdájú àṣẹ rẹ àti ọ̀nà ìbójútó ránṣẹ́ nípasẹ̀ SMS.", "Za mu aiko maka da tabbatar da oda da hanyar bibiya ta SMS.", "Anyị ga-ezitere gị nkwenye ndabere na njikọ nsochi site na SMS."],
    "Cash on Delivery": ["Pay When E Reach", "San Nígbà Tí Ó Bá Dé", "Biya Lokacin Isarwa", "Kwụọ Ụgwọ Mgbe E Bufere"],
    "Place Order & Get Tracking": ["Order Am & Get Tracking", "Paṣẹ Kí O Sì Gba Ọ̀nà Ìbójútó", "Yi Oda Ka Samu Bibiya", "Tụọ Ihe Ma Nweta Nsochi"],
    "Placing order...": ["We dey place your order...", "Ń fi àṣẹ rẹ sílẹ̀...", "Ana yin odarka...", "Na-etinye ndabere gị..."],
    "Secure": ["Safe", "Ààbò", "Aminci", "Nchekwa"],
    "Not provided": ["Dem no provide am", "A kò pèsè rẹ̀", "Ba a bayar da shi ba", "E nyeghị ya"],
    "Product added successfully": ["Product don add successfully", "A ti fi ọjà kún un ní àṣeyọrí", "An ƙara kaya cikin nasara", "Agbakwunyela ngwaahịa nke ọma"],
    "Product updated successfully": ["Product don update successfully", "A ti ṣe àṣeyọrí ìmúdójúìwọ̀n ọjà", "An sabunta kaya cikin nasara", "Emelitela ngwaahịa nke ọma"],
    "Product deleted successfully": ["Product don delete successfully", "A ti pa ọjà rẹ́ ní àṣeyọrí", "An goge kaya cikin nasara", "Ehichapụla ngwaahịa nke ọma"],
    "Profile updated successfully": ["Profile don update successfully", "A ti ṣe àṣeyọrí ìmúdójúìwọ̀n profáìlì", "An sabunta bayanan martaba cikin nasara", "Emelitela profaịlụ nke ọma"],
    "Stock adjusted successfully": ["Stock don adjust successfully", "A ti ṣàtúnṣe iye ọjà ní àṣeyọrí", "An daidaita kaya cikin nasara", "Haziela ihe dị n'ahịa nke ọma"],
    "Server error": ["Server get problem", "Àṣìṣe sẹ́fà", "Matsalar uwar garke", "Nsogbu sava"],
    "Invalid email or password": ["Email or password no correct", "Ímeèlì tàbí ọ̀rọ̀ aṣínà kò tọ́", "Imel ko kalmar sirri ba daidai ba ce", "Email ma ọ bụ okwuntughe ezighi ezi"],
    "Please provide all required fields": ["Abeg fill all the required spaces", "Jọ̀wọ́ pèsè gbogbo àwọn ààyè tó ṣe pàtàkì", "Da fatan cika dukkan wuraren da ake buƙata", "Biko dejupụta mpaghara niile achọrọ"],
    "Please provide email and password": ["Abeg enter your email and password", "Jọ̀wọ́ tẹ ímeèlì àti ọ̀rọ̀ aṣínà rẹ sí", "Da fatan shigar da imel da kalmar sirri", "Biko tinye email na okwuntughe gị"],
    "Order not found": ["We no find this order", "A kò rí àṣẹ náà", "Ba a sami odar ba", "Ahụghị ndabere ahụ"],
    "Order not found. Check your order code and phone number.": ["We no find the order. Check your order code and phone number.", "A kò rí àṣẹ náà. Ṣàyẹ̀wò kóòdù àṣẹ àti nọ́mbà fóònù rẹ.", "Ba a sami odar ba. Duba lambar odarka da lambar wayarka.", "Ahụghị ndabere ahụ. Lelee koodu ndabere na nọmba ekwentị gị."],
    "Order confirmed. SMS tracking link sent.": ["Order don confirm. We don send the tracking link by SMS.", "A ti jẹ́rìí sí àṣẹ. A ti fi ọ̀nà ìbójútó ránṣẹ́ nípasẹ̀ SMS.", "An tabbatar da oda. An aika hanyar bibiya ta SMS.", "A kwadoro ndabere. E zigala njikọ nsochi SMS."],
    "Order status updated successfully": ["Order status don update well well", "A ti ṣe àṣeyọrí ìmúdójúìwọ̀n ipò àṣẹ", "An sabunta matsayin oda cikin nasara", "Emelitela ọnọdụ ndabere nke ọma"],
    "Login to manage your orders, track deliveries, or manage your store inventory and sales.": ["Login to manage your orders, track delivery, or manage your shop stock and sales.", "Wọlé láti ṣàkóso àwọn àṣẹ rẹ, tọpa ìfijíṣẹ́, tàbí ṣàkóso ọjà àti títà ilé-ìtajà rẹ.", "Shiga don sarrafa odojinka, bin diddigin isarwa, ko sarrafa kaya da sayarwar shagonka.", "Banye iji jikwaa ndabere gị, soro nnyefe, ma ọ bụ jikwaa ngwaahịa na ire ere ụlọ ahịa gị."],
    "Don't have an account?": ["You no get account?", "O kò ní àkàǹtì?", "Ba ka da asusu?", "Ị nweghị akaụntụ?"],
    "Already have an account?": ["You get account already?", "O ti ní àkàǹtì?", "Kana da asusu?", "Ị nwerela akaụntụ?"],
    "Don't have a vendor account?": ["You no get seller account?", "O kò ní àkàǹtì oníṣòwò?", "Ba ka da asusun mai sayarwa?", "Ị nweghị akaụntụ onye ahịa?"],
    "Already a vendor?": ["You be seller already?", "O ti jẹ́ oníṣòwò?", "Kai mai sayarwa ne?", "Ị bụzi onye na-ere ahịa?"],
    "Login failed": ["Login no work", "Ìwọlé kùnà", "Shiga bai yi nasara ba", "Ịbanye adaghị"],
    "Registration failed": ["Registration no work", "Ìforúkọsílẹ̀ kùnà", "Rajista bai yi nasara ba", "Ndebanye aha adaghị"],
    "Network error. Please try again.": ["Network problem. Abeg try again.", "Àṣìṣe nẹ́tíwọ̀kì. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kansí.", "Matsalar sadarwa. Da fatan za a sake gwadawa.", "Nsogbu netwọk. Biko nwaa ọzọ."],
    "View Orders": ["See Orders", "Wo Àwọn Àṣẹ", "Duba Odoji", "Lelee Ndabere"],
    "Add Product": ["Add Goods", "Fi Ọjà Kún", "Ƙara Kaya", "Tinye Ngwaahịa"],
    "Check Stock": ["Check Stock", "Ṣàyẹ̀wò Ọjà", "Duba Kaya", "Lelee Ngwaahịa Dị"],
    "View Reports": ["See Reports", "Wo Àwọn Ìjábọ̀", "Duba Rahotanni", "Lelee Akụkọ"],
    "Monthly Revenue": ["Money We Make This Month", "Owó Wíwọlé Oṣooṣù", "Kuɗin Shiga na Wata", "Ego Ọnwa"],
    "Pending Orders": ["Orders Wey Dey Wait", "Àwọn Àṣẹ Tí Ń Dúró", "Odojin da Ake Jira", "Ndabere Na-eche"],
    "Total Customers": ["All Customers", "Àpapọ̀ Àwọn Oníbàárà", "Jimlar Abokan Ciniki", "Ngụkọta Ndị Ahịa"],
    "Manage and update customer orders": ["Manage and update customer orders", "Ṣàkóso kí o sì ṣàtúnṣe àwọn àṣẹ oníbàárà", "Sarrafa da sabunta odojin abokan ciniki", "Jikwaa ma melite ndabere ndị ahịa"],
    "Search orders...": ["Find orders...", "Wá àwọn àṣẹ...", "Nemo odoji...", "Chọọ ndabere..."],
    "Manage your store products": ["Manage your shop goods", "Ṣàkóso àwọn ọjà ilé-ìtajà rẹ", "Sarrafa kayayyakin shagonka", "Jikwaa ngwaahịa ụlọ ahịa gị"],
    "No products yet. Add your first product!": ["No goods yet. Add your first goods!", "Kò sí ọjà kankan síbẹ̀. Fi ọjà àkọ́kọ́ rẹ kún!", "Babu kayayyaki tukuna. Ƙara kayanka na farko!", "Enwebeghị ngwaahịa. Tinye ngwaahịa mbụ gị!"],
    "Insights into your business performance": ["See how your business dey perform", "Ìjìnlẹ̀ òye nípa iṣẹ́ rẹ", "Fahimtar aikin kasuwancinka", "Nghọta banyere arụmọrụ azụmahịa gị"],
    "Monthly Sales": ["Sales This Month", "Títà Oṣooṣù", "Sayarwar Wata", "Ire Ere Ọnwa"],
    "Top Products": ["Best-Selling Goods", "Àwọn Ọjà Tó Ń Tà Jùlọ", "Manyan Kayayyaki", "Ngwaahịa Kacha Ere"],
    "Total Revenue": ["All Money Made", "Àpapọ̀ Owó Wíwọlé", "Jimlar Kuɗin Shiga", "Ngụkọta Ego"],
    "Every conversation with your customers, in one place": ["All your customer chats for one place", "Gbogbo ìjíròrò pẹ̀lú àwọn oníbàárà rẹ, ní ibì kan", "Duk hirarrakinka da abokan ciniki a wuri ɗaya", "Mkparịta ụka niile gị na ndị ahịa gị n'otu ebe"],
    "Order Chat": ["Order Chat", "Ìjíròrò Àṣẹ", "Hirar Oda", "Mkparịta Ụka Ndabere"],
    "Loading conversations...": ["Chats dey load...", "Ń gbé àwọn ìjíròrò wọlé...", "Ana loda hirarraki...", "Na-ebudata mkparịta ụka..."],
    "No conversations yet. Messages from customers will show up here.": ["No chat yet. Customer messages go show here.", "Kò sí ìjíròrò kankan síbẹ̀. Àwọn ìfiránṣẹ́ láti ọ̀dọ̀ oníbàárà yóò hàn níbí.", "Babu hira tukuna. Saƙonnin abokan ciniki za su bayyana nan.", "Enwebeghị mkparịta ụka. Ozi ndị ahịa ga-apụta ebe a."],
    "Could not load conversations.": ["We no fit load the chats.", "A kò lè gbé àwọn ìjíròrò wọlé.", "Ba a iya loda hirarraki ba.", "Enweghị ike ibudata mkparịta ụka."],
    "Enter your phone number to see your orders and chat with vendors.": ["Enter your phone number to see your orders and chat with sellers.", "Tẹ nọ́mbà fóònù rẹ láti rí àwọn àṣẹ rẹ kí o sì bá àwọn oníṣòwò sọ̀rọ̀.", "Shigar da lambar wayarka don ganin odajinka da tattaunawa da masu sayarwa.", "Tinye nọmba ekwentị gị ka ị hụ ndabere gị ma soro ndị na-ere ahịa kparịta ụka."],
    "Find My Orders": ["Find My Orders", "Wá Àwọn Àṣẹ Mi", "Nemo Odojina", "Chọọ Ihe M Tụrụ"],
    "Or jump straight to one order:": ["Or go straight to one order:", "Tàbí lọ tààrà sí àṣẹ kan:", "Ko ka tafi kai tsaye zuwa oda ɗaya:", "Ma ọ bụ gaa ozugbo na otu ndabere:"],
    "Open That Order's Chat": ["Open That Order Chat", "Ṣí Ìjíròrò Àṣẹ Yẹn", "Buɗe Hira ta Wannan Oda", "Mepee Mkparịta Ụka Ndabere Ahụ"],
    "Loading your orders...": ["Your orders dey load...", "Ń gbé àwọn àṣẹ rẹ wọlé...", "Ana loda odajinka...", "Na-ebudata ndabere gị..."],
    "Could not load orders. Try again.": ["We no fit load orders. Try again.", "A kò lè gbé àwọn àṣẹ wọlé. Gbìyànjú lẹ́ẹ̀kansí.", "Ba a iya loda odoji ba. Sake gwadawa.", "Enweghị ike ibudata ndabere. Nwaa ọzọ."],
    "Your Conversations": ["Your Chats", "Àwọn Ìjíròrò Rẹ", "Hirarrakinka", "Mkparịta Ụka Gị"],
    "No orders found for that number.": ["We no find any order for that number.", "A kò rí àṣẹ kankan fún nọ́mbà yẹn.", "Ba a sami oda ga wannan lambar ba.", "Ahụghị ndabere maka nọmba ahụ."],
    "No messages yet — say hello!": ["No message yet — greet them!", "Kò sí ìfiránṣẹ́ síbẹ̀ — kí wọn!", "Babu saƙo tukuna — gaishe su!", "Enwebeghị ozi — kelee ha!"],
    "No messages yet. Say hello!": ["No message yet. Greet them!", "Kò sí ìfiránṣẹ́ síbẹ̀. Kí wọn!", "Babu saƙo tukuna. Gaishe su!", "Enwebeghị ozi. Kelee ha!"],
    "Type a message...": ["Type message...", "Tẹ ìfiránṣẹ́ kan...", "Rubuta saƙo...", "Pịnye ozi..."],
    "Enter both your phone number and the order code.": ["Enter your phone number and order code.", "Tẹ nọ́mbà fóònù àti kóòdù àṣẹ rẹ sí.", "Shigar da lambar wayarka da lambar oda.", "Tinye nọmba ekwentị gị na koodu ndabere."],
    "Admin Dashboard": ["Admin Dashboard", "Dásíbọ́ọ̀dù Alábòójútó", "Dashboard Mai Gudanarwa", "Ogwe Njikwa Onye Nchịkwa"],
    "Vendor Applications": ["Seller Applications", "Àwọn Ìbéèrè Oníṣòwò", "Buƙatun Masu Sayarwa", "Arịrịọ Ndị Na-ere Ahịa"],
    "Pending Vendors": ["Sellers Wey Dey Wait", "Àwọn Oníṣòwò Tí Ń Dúró", "Masu Sayarwa Masu Jira", "Ndị Na-ere Ahịa Na-eche"],
    "Total Vendors": ["All Sellers", "Àpapọ̀ Àwọn Oníṣòwò", "Jimlar Masu Sayarwa", "Ngụkọta Ndị Na-ere Ahịa"],
    "Approved": ["Approved", "A Fọwọ́sí", "An Amince", "A Kwadoro"],
    "Rejected": ["Rejected", "A Kọ̀", "An Ƙi", "A Jụrụ"],
    "All Vendors": ["All Sellers", "Gbogbo Àwọn Oníṣòwò", "Dukkan Masu Sayarwa", "Ndị Na-ere Ahịa Niile"],
    "Approve": ["Approve", "Fọwọ́sí", "Amince", "Kwado"],
    "Reject": ["Reject", "Kọ̀", "Ƙi", "Jụ"],
    "Refresh": ["Reload", "Tún Gbé Wọlé", "Sake Loda", "Bugharịa Ọzọ"],
    "Loading vendors...": ["Sellers dey load...", "Ń gbé àwọn oníṣòwò wọlé...", "Ana loda masu sayarwa...", "Na-ebudata ndị na-ere ahịa..."],
    "No pending vendor applications found.": ["No seller application dey wait.", "Kò sí ìbéèrè oníṣòwò tó ń dúró.", "Babu buƙatar mai sayarwa da ke jira.", "Enweghị arịrịọ onye na-ere ahịa na-eche."],
    "Are you sure you want to approve this vendor?": ["You sure say you wan approve this seller?", "Ṣé ó dá ọ lójú pé o fẹ́ fọwọ́sí oníṣòwò yìí?", "Ka tabbata kana son amincewa da wannan mai sayarwar?", "Ị ji n'aka na ị chọrọ ịkwado onye na-ere ahịa a?"],
    "Are you sure you want to reject this vendor?": ["You sure say you wan reject this seller?", "Ṣé ó dá ọ lójú pé o fẹ́ kọ oníṣòwò yìí?", "Ka tabbata kana son ƙin wannan mai sayarwar?", "Ị ji n'aka na ị chọrọ ịjụ onye na-ere ahịa a?"]
  };
  for (var __reviewedKey in VH_DICT_REVIEWED) {
    VH_DICT[__reviewedKey] = VH_DICT_REVIEWED[__reviewedKey];
  }
  /* ---------------------------------------------------------------------
     PATTERNS — strings that contain live data (numbers, codes, names).
     $1, $2 ... are the captured pieces.  tg: [n] = also translate group n.
     --------------------------------------------------------------------- */
  var VH_PATTERNS = [
    /* Backend messages whose IDs, names, or statuses are dynamic. */
    { re: /^(\d+) Products$/,
      out: ["$1 Goods", "$1 Ọjà", "$1 Kayayyaki", "$1 Ngwaahịa"] },
    { re: /^Product ID (.+) not found$/,
      out: ["Product ID $1 not found", "A kò rí ID ọjà $1", "Ba a sami ID na kaya $1 ba", "Ahụghị ID ngwaahịa $1"] },
    { re: /^Insufficient stock for \"(.+)\"\. Available: (\d+), Requested: (\d+)$/,
      out: ["Stock no reach for \"$1\". E get: $2, dem request: $3", "Ọjà \"$1\" kò tó. Ó wà: $2, a béèrè: $3", "Kayan \"$1\" bai isa ba. Akwai: $2, an nema: $3", "Ngwaahịa \"$1\" ezughị. Dị: $2, Achọrọ: $3"] },
    { re: /^Payment marked as (pending|paid)$/,
      tg: [1],
      out: ["Payment marked as $1", "A samisi ìsanwó gẹ́gẹ́ bí $1", "An sanya biyan kuɗi a matsayin $1", "Edenyela ịkwụ ụgwọ dị ka $1"] },

    { re: /^(\d+) stores nearby$/,
      out: ["$1 shops dey near you", "Àwọn ilé-ìtajà $1 wà nítòsí", "Shaguna $1 kusa da kai", "Ụlọ ahịa $1 dị nso"] },
    { re: /^(\d+) store nearby$/,
      out: ["$1 shop dey near you", "Ilé-ìtajà $1 wà nítòsí", "Shago $1 kusa da kai", "Ụlọ ahịa $1 dị nso"] },
    { re: /^(\d+) in stock$/,
      out: ["$1 dey ground", "$1 wà ní ilé-ìtajà", "$1 na nan a shago", "$1 dị n'ahịa"] },
    { re: /^Order #(\d+)$/,
      out: ["Order #$1", "Àṣẹ #$1", "Oda #$1", "Ndabere #$1"] },
    { re: /^Order ([A-Za-z0-9][A-Za-z0-9\-_]{3,})$/,
      out: ["Order $1", "Àṣẹ $1", "Oda $1", "Ndabere $1"] },
    { re: /^Total: (.+)$/,
      out: ["Total: $1", "Àpapọ̀: $1", "Jimla: $1", "Ngụkọta: $1"] },
    { re: /^(.+) \(Current: (\d+)\)$/,
      out: ["$1 (Now: $2)", "$1 (Lọ́wọ́lọ́wọ́: $2)", "$1 (Yanzu: $2)", "$1 (Ugbu a: $2)"] },
    { re: /^\((\d+) orders?\)$/,
      out: ["($1 orders)", "(àṣẹ $1)", "(odoji $1)", "(ndabere $1)"] },
    { re: /^(\d+) sold$/,
      out: ["$1 don sell", "$1 tà", "an sayar $1", "erere $1"] },
    { re: /^No (\S+) orders$/,
      out: ["No order dey", "Kò sí àṣẹ kankan", "Babu odoji", "Ọ dịghị ndabere"] },
    { re: /^Order confirmed! An SMS with your tracking link has been sent to (.+)$/,
      out: ["Order don enter! We don send SMS with your tracking link to $1",
            "A ti gba àṣẹ rẹ! A ti fi SMS pẹ̀lú ọ̀nà ìbójútó ránṣẹ́ sí $1",
            "An karɓi odarka! An aika SMS da hanyar bibiya zuwa $1",
            "Anabatala ndabere gị! E zigala SMS nwere njikọ nsochi gị na $1"] },
    { re: /^Could not get location: (.+)$/,
      out: ["We no fit get your location: $1", "A kò lè rí ipò rẹ: $1", "Ba a iya samun wurinka ba: $1", "Enweghị ike ịchọta ebe ị nọ: $1"] },
    { re: /^(.+) — ✅ Paid$/, tg: [1],
      out: ["$1 — ✅ Don Pay", "$1 — ✅ A Ti San", "$1 — ✅ An Biya", "$1 — ✅ Akwụọla"] },
    { re: /^(.+) — ⏳ Payment pending$/, tg: [1],
      out: ["$1 — ⏳ Payment never enter", "$1 — ⏳ Ìsanwó ń dúró", "$1 — ⏳ Ana jiran biya", "$1 — ⏳ Ịkwụ ụgwọ na-eche"] },
    { re: /^Bank: (.+)$/,
      out: ["Bank: $1", "Báǹkì: $1", "Banki: $1", "Ụlọ Akụ: $1"] },
    { re: /^Account Number: (.+)$/,
      out: ["Account Number: $1", "Nọ́mbà Àkàǹtì: $1", "Lambar Asusu: $1", "Nọmba Akaụntụ: $1"] },
    { re: /^Account Name: (.+)$/,
      out: ["Account Name: $1", "Orúkọ Àkàǹtì: $1", "Sunan Asusu: $1", "Aha Akaụntụ: $1"] },
    { re: /^You: (.+)$/,
      out: ["You: $1", "Ìwọ: $1", "Kai: $1", "Gị: $1"] },
    { re: /^(.+) - VendorHub$/, tg: [1],
      out: ["$1 - VendorHub", "$1 - VendorHub", "$1 - VendorHub", "$1 - VendorHub"] }
  ];

  /* ---------------------------------------------------------------------
     LEGACY KEYS — so old  t('some_key')  calls in the pages keep working
     --------------------------------------------------------------------- */
  var VH_KEYS = {
    hint_cod: "Pay with cash when the rider hands you your order.",
    hint_flw: "You'll be sent to a secure Flutterwave page to pay by card or bank transfer.",
    hint_bank: "Transfer straight to the vendor's account, then chat with them to confirm.",
    nav_home: "Home", nav_browse: "Browse Stores", nav_vendor_login: "Vendor Login",
    nav_become_vendor: "Become a Vendor", nav_get_started: "Get Started", nav_login: "Login",
    nav_dashboard: "Dashboard", nav_inventory: "Inventory", nav_settings: "Settings",
    nav_logout: "Logout", nav_storefront: "Storefront", nav_map: "Map",
    welcome_title: "Welcome to VendorHub", welcome_back_title: "Welcome Back",
    welcome_text: "No login needed. Browse stores on the map, add items to cart, and checkout with just your phone number.",
    nearby_stores: "Nearby Stores", search_placeholder: "Search stores...", search_stores: "Search stores...",
    cat_all: "All Categories", cat_groceries: "Groceries", cat_bakery: "Bakery",
    cat_electronics: "Electronics", cat_fashion: "Fashion", use_my_location: "Use My Location",
    loading_stores: "Loading stores...", stores_near_you: "Stores Near You",
    checkout_title: "Checkout", checkout_subtitle: "No account needed. Just your phone & address.",
    your_order: "Your Order", total: "Total", phone_number: "Phone Number",
    phone_help: "We'll send your order confirmation & tracking link via SMS",
    delivery_address: "Delivery Address", city: "City", postal_code: "Postal Code",
    payment_method: "Payment Method", pay_cod: "Cash on Delivery",
    pay_flw: "Pay Now (Card / Bank Transfer via Flutterwave)", pay_bank: "Direct Bank Transfer to Vendor",
    place_order: "Place Order & Get Tracking", secure: "Secure", lagos_only: "Lagos Only",
    sms_tracking: "SMS Tracking", track_title: "Track Your Order",
    track_subtitle: "Enter your order code and phone number",
    order_code_placeholder: "Order code (e.g. ABC12345)", phone_placeholder: "Phone number",
    track_btn: "Track", order_status: "Order Status", items_ordered: "Items Ordered",
    delivery_address_label: "Delivery Address:", payment_label: "Payment:",
    chat_with_vendor: "Chat with Vendor", type_message: "Type a message...", send: "Send",
    back_to_home: "Back to Home", my_orders_title: "My Orders", create_account: "Create Account",
    vendor_login_title: "Vendor Login", become_vendor_title: "Become a Vendor",
    dashboard: "Dashboard", orders: "Orders", products: "Products", reports: "Reports",
    vendor_dashboard: "Vendor Dashboard", view_orders: "View Orders", view_reports: "View Reports",
    order_management: "Order Management", product_management: "Product Management",
    sales_reports: "Sales Reports", why_choose_us: "Why Choose VendorHub?",
    how_it_works: "How It Works", ready_to_start: "Ready to Get Started?"
  };

  /* =========================================================================
     ENGINE
     ========================================================================= */
  var LANG = "en";
  var IDX = -1;                       // index into the arrays; -1 = English
  var applying = false;
  var TEXT_MEM = new WeakMap();       // textNode  -> {src, out}
  var ATTR_MEM = new WeakMap();       // element   -> {attr: {src, out}}
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, PRE: 1, IFRAME: 1, CANVAS: 1 };
  var ATTRS = ["placeholder", "title", "aria-label", "alt"];
  var STORAGE_KEY = "vh_lang";

  // lower-case index for case-insensitive matching
  var LOWER = {};
  for (var key in VH_DICT) { LOWER[key.toLowerCase().replace(/\s+/g, " ")] = key; }

  // Unicode-aware decoration stripper (emoji, arrows, punctuation around a phrase)
  var DECOR;
  try { DECOR = new RegExp("^([^\\p{L}\\p{N}]*)([\\s\\S]*?)([^\\p{L}\\p{N}]*)$", "u"); }
  catch (e) { DECOR = /^([^A-Za-z0-9]*)([\s\S]*?)([^A-Za-z0-9]*)$/; }

  function isUpper(ch) { return ch && ch === ch.toUpperCase() && ch !== ch.toLowerCase(); }

  function lookup(str) {
    if (IDX < 0) return null;
    var row = VH_DICT[str];
    if (row) return row[IDX] || null;
    var k = LOWER[str.toLowerCase()];
    if (!k) return null;
    var val = VH_DICT[k][IDX];
    if (!val) return null;
    if (isUpper(str.charAt(0)) && !isUpper(k.charAt(0))) return val.charAt(0).toUpperCase() + val.slice(1);
    if (!isUpper(str.charAt(0)) && isUpper(k.charAt(0))) return val.charAt(0).toLowerCase() + val.slice(1);
    return val;
  }

  function matchPattern(str) {
    if (IDX < 0) return null;
    for (var i = 0; i < VH_PATTERNS.length; i++) {
      var p = VH_PATTERNS[i];
      var m = str.match(p.re);
      if (!m) continue;
      var tpl = p.out[IDX];
      if (!tpl) return null;
      return tpl.replace(/\$(\d)/g, function (_, n) {
        var g = m[+n] || "";
        if (p.tg && p.tg.indexOf(+n) !== -1) { var tr = lookup(g); if (tr != null) g = tr; }
        return g;
      });
    }
    return null;
  }

  /** Translate one standalone phrase (no surrounding whitespace handling). */
  function translatePhrase(str) {
    if (IDX < 0 || !str) return str;
    var s = String(str).replace(/\s+/g, " ").trim();
    if (!s) return str;
    var hit = lookup(s);
    if (hit != null) return hit;
    hit = matchPattern(s);
    if (hit != null) return hit;
    // strip decoration (emoji / arrows / punctuation) and try again
    var m = s.match(DECOR);
    if (m && m[2] && (m[1] || m[3])) {
      var variants = [
        [m[1], m[2], m[3]],            // both sides stripped
        [m[1], m[2] + m[3], ""],       // only the leading decoration stripped
        ["", m[1] + m[2], m[3]]        // only the trailing decoration stripped
      ];
      for (var v = 0; v < variants.length; v++) {
        var pre = variants[v][0], core = variants[v][1], post = variants[v][2];
        if (!core) continue;
        var inner = lookup(core);
        if (inner == null) inner = matchPattern(core);
        if (inner != null) return pre + inner + post;
      }
    }
    return str;
  }

  /** Translate a raw text chunk, preserving its leading/trailing whitespace. */
  function translateChunk(raw) {
    if (IDX < 0) return raw;
    var m = String(raw).match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!m || !m[2]) return raw;
    var mid = translatePhrase(m[2]);
    return m[1] + mid + m[3];
  }

  function skipped(el) {
    if (!el || el.nodeType !== 1) return false;
    if (SKIP_TAGS[el.nodeName]) return true;
    if (el.closest) {
      return !!el.closest('[data-i18n-skip],[translate="no"],.notranslate,.vh-lang-switcher');
    }
    return false;
  }

  function handleTextNode(node) {
    var parent = node.parentNode;
    if (!parent || parent.nodeType !== 1) return;
    if (SKIP_TAGS[parent.nodeName] || skipped(parent)) return;
    var cur = node.nodeValue;
    if (!cur || !/\S/.test(cur)) return;
    var mem = TEXT_MEM.get(node);
    var src = (mem && mem.out === cur) ? mem.src : cur;
    var out = translateChunk(src);
    TEXT_MEM.set(node, { src: src, out: out });
    if (out !== cur) node.nodeValue = out;
  }

  function handleAttributes(el) {
    // Do NOT translate the *content* of a textarea/code/pre, but DO translate
    // its placeholder/title/aria-label/alt/value attributes. TEXTAREA is in
    // SKIP_TAGS only to protect its inner text, so we exempt it here.
    if (el.closest && el.closest('[data-i18n-skip],[translate="no"],.notranslate,.vh-lang-switcher')) return;
    if (SKIP_TAGS[el.nodeName] && el.nodeName !== 'TEXTAREA') return;
    var mem = ATTR_MEM.get(el) || {};
    var list = ATTRS;
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (!el.hasAttribute(a)) continue;
      var cur = el.getAttribute(a);
      if (!cur || !/\S/.test(cur)) continue;
      var rec = mem[a];
      var src = (rec && rec.out === cur) ? rec.src : cur;
      var out = translateChunk(src);
      mem[a] = { src: src, out: out };
      if (out !== cur) el.setAttribute(a, out);
    }
    // value on push-buttons only (never on data-entry fields)
    if (el.nodeName === "INPUT" && /^(button|submit|reset)$/i.test(el.type || "")) {
      var cv = el.value;
      if (cv && /\S/.test(cv)) {
        var r2 = mem.value;
        var s2 = (r2 && r2.out === cv) ? r2.src : cv;
        var o2 = translateChunk(s2);
        mem.value = { src: s2, out: o2 };
        if (o2 !== cv) el.value = o2;
      }
    }
    ATTR_MEM.set(el, mem);
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { handleTextNode(root); return; }
    if (root.nodeType !== 1) return;
    // allow TEXTAREA through so its placeholder/title/aria-label get translated
    // (its inner text is still protected by handleTextNode's parent check)
    if (skipped(root) && root.nodeName !== 'TEXTAREA') return;
    handleAttributes(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, false);
    var n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) handleTextNode(n);
      else handleAttributes(n);
    }
  }

  var TITLE_MEM = null;
  function translateTitle() {
    if (!document.title) return;
    var cur = document.title;
    var src = (TITLE_MEM && TITLE_MEM.out === cur) ? TITLE_MEM.src : cur;
    var out = translateChunk(src);
    TITLE_MEM = { src: src, out: out };
    if (out !== cur) document.title = out;
  }

  function syncSwitchers() {
    var sels = document.querySelectorAll("select.vh-lang-switcher");
    for (var i = 0; i < sels.length; i++) {
      var sel = sels[i];
      sel.setAttribute("data-i18n-skip", "");
      if (sel.getAttribute("data-vh-built") !== "1") {
        var html = "";
        for (var code in VH_LANGS) { html += '<option value="' + code + '">' + VH_LANGS[code] + "</option>"; }
        sel.innerHTML = html;
        sel.setAttribute("data-vh-built", "1");
        if (!sel.getAttribute("onchange")) {
          sel.addEventListener("change", function () { setLanguage(this.value); });
        }
      }
      sel.value = LANG;
    }
  }

  /** Full-page pass. */
  function applyTranslations() {
    applying = true;
    try {
      document.documentElement.setAttribute("lang", LANG);
      walk(document.body || document.documentElement);
      translateTitle();
      syncSwitchers();
    } finally {
      if (observer) observer.takeRecords();
      applying = false;
    }
  }

  /* ---------------- live DOM watching ---------------- */
  var observer = null;
  var queue = [];
  var scheduled = false;

  function flush() {
    scheduled = false;
    var batch = queue; queue = [];
    if (IDX < 0 || !batch.length) return;
    applying = true;
    try {
      for (var i = 0; i < batch.length; i++) walk(batch[i]);
      translateTitle();
    } finally {
      if (observer) observer.takeRecords();
      applying = false;
    }
  }

  function schedule(node) {
    queue.push(node);
    if (!scheduled) {
      scheduled = true;
      (global.requestAnimationFrame || global.setTimeout)(flush, 0);
    }
  }

  function startObserver() {
    if (observer || typeof MutationObserver === "undefined") return;
    observer = new MutationObserver(function (records) {
      if (applying) return;
      for (var i = 0; i < records.length; i++) {
        var r = records[i];
        if (r.type === "childList") {
          for (var j = 0; j < r.addedNodes.length; j++) {
            var n = r.addedNodes[j];
            if (n.nodeType === 1 || n.nodeType === 3) schedule(n);
          }
        } else {
          schedule(r.target);
        }
      }
    });
    observer.observe(document.documentElement, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS.concat(["value"])
    });
  }

  /* ---------------- public API ---------------- */
  function getLang() { return LANG; }

  function setLanguage(lang) {
    if (!VH_LANGS[lang]) return;
    LANG = lang;
    IDX = (lang === "en") ? -1 : VH_ORDER.indexOf(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations();
    try {
      document.dispatchEvent(new CustomEvent("vh:languagechange", { detail: { lang: lang } }));
    } catch (e) {}
  }

  /** t("English text")  or  t("legacy_key") */
  function t(x) {
    if (x == null) return x;
    if (VH_KEYS[x]) return translatePhrase(VH_KEYS[x]);
    return translatePhrase(String(x));
  }

  function langSwitcherHTML(extraStyle) {
    var opts = "";
    for (var code in VH_LANGS) { opts += '<option value="' + code + '">' + VH_LANGS[code] + "</option>"; }
    return '<select class="vh-lang-switcher" data-i18n-skip aria-label="Language" ' +
      'onchange="setLanguage(this.value)" style="padding:0.4rem 0.6rem;border-radius:6px;' +
      'border:1.5px solid var(--gray-200,#ddd);font-size:0.85rem;font-weight:600;background:var(--white,#fff);' +
      'color:var(--gray-700,#333);cursor:pointer;' + (extraStyle || "") + '">' + opts + "</select>";
  }

  /** Adds a floating switcher on pages that do not have one in the nav. */
  function ensureSwitcher() {
    if (document.querySelector(".vh-lang-switcher")) return;
    var box = document.createElement("div");
    box.setAttribute("data-i18n-skip", "");
    box.style.cssText = "position:fixed;left:14px;bottom:14px;z-index:9998;background:#fff;" +
      "border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,0.18);padding:4px;";
    box.innerHTML = "<span style='font-size:0.75rem;font-weight:700;color:#888;padding:0 4px;'>🌐</span>" + langSwitcherHTML();
    document.body.appendChild(box);
    syncSwitchers();
  }

  /* ---------------- translate JS dialogs ---------------- */
  var _alert = global.alert, _confirm = global.confirm;
  global.alert = function (msg) { return _alert.call(global, IDX < 0 ? msg : translatePhrase(String(msg))); };
  global.confirm = function (msg) { return _confirm.call(global, IDX < 0 ? msg : translatePhrase(String(msg))); };

  /* ---------------- boot ---------------- */
  function pickInitialLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (q && VH_LANGS[q]) return q;
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && VH_LANGS[saved]) return saved;
    var nav = (navigator.language || "").toLowerCase().split("-")[0];
    if (VH_LANGS[nav]) return nav;
    return "en";
  }

  LANG = pickInitialLang();
  IDX = (LANG === "en") ? -1 : VH_ORDER.indexOf(LANG);
  startObserver();

  function boot() {
    applyTranslations();
    ensureSwitcher();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  global.addEventListener("load", function () { applyTranslations(); });

  /* ---------------- exports ---------------- */
  global.setLanguage = setLanguage;
  global.getLang = getLang;
  global.applyTranslations = applyTranslations;
  global.t = t;
  global.langSwitcherHTML = langSwitcherHTML;
  global.LANGUAGE_NAMES = VH_LANGS;
  global.VH_I18N = {
    langs: VH_LANGS, dict: VH_DICT, patterns: VH_PATTERNS, keys: VH_KEYS,
    t: t, setLanguage: setLanguage, getLang: getLang, apply: applyTranslations,
    translate: translatePhrase
  };

})(typeof window !== "undefined" ? window : this);

/* ---------------- mobile nav toggle ---------------- */
function toggleMobileNav() {
  var nav = document.querySelector(".nav-links");
  if (nav) nav.classList.toggle("mobile-open");
}
document.addEventListener("click", function (e) {
  var nav = document.querySelector(".nav-links");
  var btn = document.querySelector(".mobile-menu-btn");
  if (!nav || !nav.classList.contains("mobile-open")) return;
  if (nav.contains(e.target) || (btn && btn.contains(e.target))) return;
  nav.classList.remove("mobile-open");
});

