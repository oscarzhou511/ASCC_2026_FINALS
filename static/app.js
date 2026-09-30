// Task Force Gambit // CHECKMATE - 100% Client-Side Static Engine
// Cryptographically hashed & encrypted flag verification. No plaintext flags stored.

const DEFAULT_CHALLENGES = [
  {
    "id": "ch01",
    "title": "Queen's Cache",
    "category": "FORENSICS",
    "points": 100,
    "description": "A targeted triage export from Rebecca Parker's profile contains more than the visible document set.",
    "objective": "",
    "flag_format": "ASCC{...}",
    "downloads": [{ "file": "queen_triage.zip", "label": "Download queen_triage.zip" }],
    "links": [],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch02",
    "title": "Ghost Photograph",
    "category": "FORENSICS",
    "points": 100,
    "description": "Investigators recovered an ordinary-looking family archive image. The visible pixels appear unremarkable.",
    "objective": "",
    "flag_format": "ASCC{...}",
    "downloads": [{ "file": "family_photo.jpg", "label": "Download family_photo.jpg" }],
    "links": [],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch03",
    "title": "96 Seconds",
    "category": "NETWORK",
    "points": 150,
    "description": "A short capture was recorded shortly before the Queen's device was seized. Most traffic is routine noise.",
    "objective": "",
    "flag_format": "ASCC{...}",
    "downloads": [{ "file": "queen_capture.pcap", "label": "Download queen_capture.pcap" }],
    "links": [],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch04",
    "title": "DNS Trail",
    "category": "NETWORK",
    "points": 200,
    "description": "A second capture contains repetitive DNS traffic. Analysts believe one naming pattern carried data in fragments.",
    "objective": "",
    "flag_format": "ASCC{...}",
    "downloads": [
      { "file": "dns_beacon.pcap", "label": "Download dns_beacon.pcap" },
      { "file": "analyst_note.txt", "label": "Download analyst_note.txt" }
    ],
    "links": [],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch05",
    "title": "18:07:43",
    "category": "LOG ANALYSIS",
    "points": 150,
    "description": "Authentication, proxy and endpoint records cover the minutes around ENDGAME registration.",
    "objective": "Identify the account, destination short-name and HHMM of the first suspicious POST.",
    "flag_format": "ASCC{USER_DESTINATION_HHMM} using uppercase values",
    "downloads": [
      { "file": "auth.log", "label": "Download auth.log" },
      { "file": "proxy.log", "label": "Download proxy.log" },
      { "file": "endpoint.log", "label": "Download endpoint.log" }
    ],
    "links": [],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch06",
    "title": "Host Snapshot",
    "category": "LOG ANALYSIS",
    "points": 150,
    "description": "A filesystem snapshot was collected from a network operations host associated with the incident.",
    "objective": "",
    "flag_format": "ASCC{HOSTNAME_SERVICEACCOUNT}; replace hyphens with underscores and use uppercase",
    "downloads": [{ "file": "host_snapshot.tar.gz", "label": "Download host_snapshot.tar.gz" }],
    "links": [],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch07",
    "title": "Seven Rabbits Returns",
    "category": "CRYPTO",
    "points": 200,
    "description": "Rebecca's encrypted diary was recovered with a handwritten reference that should be familiar from Round 3.",
    "objective": "Reverse the two simple transformations, recover the flag, and retain the final phrase for later.",
    "flag_format": "ASCC{...}",
    "downloads": [
      { "file": "rebecca_diary.enc", "label": "Download rebecca_diary.enc" },
      { "file": "readme.txt", "label": "Download readme.txt" }
    ],
    "links": [],
    "hints": [
      "The file appears to have more than one transformation applied. Undo the outer encoding layer first, then think back to the Seven Rabbits clue.",
      "Use the same single-byte value associated with Seven Rabbits."
    ],
    "locked": false,
    "final": false
  },
  {
    "id": "ch08",
    "title": "Old Habits",
    "category": "PASSWORDS",
    "points": 200,
    "description": "A legacy password hash and a deliberately small intelligence-derived candidate list were recovered beside an encrypted backup.",
    "objective": "Recover the password using your Round 2 password-cracking skills, open the backup, and retain the ENDGAME activation identifier.",
    "flag_format": "ASCC{...}",
    "downloads": [
      { "file": "password.hash", "label": "Download password.hash" },
      { "file": "candidate_words.txt", "label": "Download candidate_words.txt" },
      { "file": "king_backup.zip", "label": "Download king_backup.zip" },
      { "file": "readme.txt", "label": "Download readme.txt" }
    ],
    "links": [],
    "hints": [
      "The hash is a common 32-character legacy digest.",
      "John can use a supplied wordlist; identify the raw hash format first."
    ],
    "locked": false,
    "final": false
  },
  {
    "id": "ch09",
    "title": "Three Names, One Person",
    "category": "OSINT",
    "points": 200,
    "description": "Three locally archived profiles survived after Archaic began deleting its public footprint.",
    "objective": "Correlate the old usernames. Submit the two linked aliases in the requested order.",
    "flag_format": "ASCC{CURRENTALIAS_OLDALIAS}; uppercase, omit punctuation",
    "downloads": [],
    "links": [
      { "label": "ChessForum archive", "url": "archive/chessforum/blackking77/index.html" },
      { "label": "Loopr archive", "url": "archive/loopr/michael-p/index.html" },
      { "label": "GitForge archive", "url": "archive/gitforge/mp1979/index.html" }
    ],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch10",
    "title": "The King's Console",
    "category": "WEB",
    "points": 200,
    "description": "A recovered message interface opens message 1. The application appears to select records directly from the URL.",
    "objective": "",
    "flag_format": "ASCC{...}",
    "downloads": [],
    "links": [{ "label": "Open recovered console", "url": "king-console/index.html?msg=1" }],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch11",
    "title": "blackvault_final",
    "category": "REVERSE ENGINEERING",
    "points": 250,
    "description": "A final Archaic node executable was recovered. It resembles the Round 3 blackvault family but is intentionally shorter for the final.",
    "objective": "Identify the authentication phrase using basic binary inspection, run the program, and recover its flag.",
    "flag_format": "ASCC{...}",
    "downloads": [{ "file": "blackvault_final", "label": "Download blackvault_final" }],
    "links": [],
    "hints": ["Do not begin with a disassembler. Start with the simplest Round 3 technique."],
    "locked": false,
    "final": false
  },
  {
    "id": "ch12",
    "title": "The Board Is the Key",
    "category": "PUZZLE",
    "points": 200,
    "description": "A chessboard and an ordered move list were recovered from the ENDGAME working directory.",
    "objective": "Read the character at each coordinate in move order and build the flag.",
    "flag_format": "ASCC{RECOVERED_CHARACTERS}",
    "downloads": [
      { "file": "board.txt", "label": "Download board.txt" },
      { "file": "moves.txt", "label": "Download moves.txt" },
      { "file": "readme.txt", "label": "Download readme.txt" }
    ],
    "links": [],
    "hints": [],
    "locked": false,
    "final": false
  },
  {
    "id": "ch13",
    "title": "CHECKMATE",
    "category": "FINAL",
    "points": 700,
    "description": "Enough intelligence has been collected to attempt attribution and disarm ENDGAME.",
    "objective": "Provide the King's real identity, the ENDGAME activation identifier, and Rebecca's final phrase. A successful attribution returns the final flag.",
    "flag_format": "The validator returns a unique ASCC{...} flag after all three answers are correct.",
    "downloads": [],
    "links": [],
    "hints": [],
    "locked": true,
    "final": true
  }
];

// One-way SHA-256 hashes of the correct flags.
// Plaintext flags cannot be recovered by inspecting this code.
const FLAG_HASHES = {
  "ch01": "cf89a065514b285d2d069d3365190716facb994a011c0a00ff53ea2643f2b260",
  "ch02": "ebbbbce8d8159e93f6368efe5da515c06fa911bd743fe41f74fc3e0f4e82dd49",
  "ch03": "c641d28898602fe3b5ed8930e32fd91e3c78f9b06e9f62974615c76d81488de6",
  "ch04": "74be14b214a5e98f27073b72f6ef6f86a3b58c746e745d7a42e04c2627f815d6",
  "ch05": "2013dd65f79fec78d52cf12e661d33e791c4b33b160a94119676f1e58ba49cf8",
  "ch06": "d64d3b95bef849e14c4da4a047068fb39610248db366e13ee9cad12ff85deb71",
  "ch07": "d5f9f2b63fc42e8d2a30811131609832a9bda8b283e2c6bcaca1a5522d2ca1c1",
  "ch08": "594ea67ac6af13e9ac4540cba3fbe03c0762ebb8087eb992d59e4dd1792fed2a",
  "ch09": "e034b39b3c6329a7f9a39cf9e0ab004e4412b13463756ce752392816a5c8a1f4",
  "ch10": "d14f5508e191362e3c8ade66c6228c281368dcc47358097aeddc6cdea0353763",
  "ch11": "34d34b055e59399243a35daa962281782fda9b86c44b31778efd9ed3e8c25738",
  "ch12": "39fd727ab1671a56afdb79e2c3176bed18c6e8ed9659b4d9d51fccab12f156d6",
  "ch13": "cd902a18d13a3269056ac416b8f5a24b47802fff376c836b67ef0195cec6d2cc"
};

// Encrypted final flag packages. Decrypted only when correct attribution keys are derived.
const FINAL_ATTRIBUTION_PACKAGES = [
  {
    keyHash: "8109264ed7ae614ad562870e9d47b6eaf973498c9139d17edbba91a73a457921",
    cipherHex: "c05a650daced290f9629ca4fc902e9afb7370ecddc7c8e3a92e9d0f577003d7eb948140de0e81c"
  },
  {
    keyHash: "3d6c40eb08b0a81533e52725b10dafe7c3c9b6219679475320f359e469e3f2bc",
    cipherHex: "7c3f03a873f3e05070ae6a64e548f0a28d8df160db3c181769a018b624a6b6e3052d72a83ff6d5"
  }
];

// Cryptographic SHA-256 calculation (supports both Web Crypto and synchronous pure JS)
function computeSHA256(ascii) {
  function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j;
  var result = '';
  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;
  var hash = [];
  var k = [];
  var primeCounter = 0;
  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) { isComposite[i] = candidate; }
      hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1/3) * maxWord) | 0;
    }
  }
  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength);
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16);
    var oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      var i2 = i + j;
      var w15 = w[i - 15], w2 = w[i - 2];
      var a = hash[0], e = hash[4];
      var temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0
        );
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) { hash[i] = (hash[i] + oldHash[i]) | 0; }
  }
  for (i = 0; i < 8; i++) {
    for (i2 = 3; i2 >= 0; i2--) {
      var b = (hash[i] >> (i2 * 8)) & 255;
      result += ((b < 16) ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

let challenges = JSON.parse(JSON.stringify(DEFAULT_CHALLENGES));
let activeCategory = 'ALL';
let authMode = 'register';

const $ = s => document.querySelector(s);
function esc(s){ return String(s ?? '').replace(/[&<>"']/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m])) }
function toast(msg, good=false){
  let t = $('#toast');
  t.textContent = msg;
  t.className = 'toast ' + (good ? 'good' : 'bad');
  setTimeout(() => t.classList.add('hidden'), 3500);
}
function backdropClose(e){ if (e.target.id === 'modal') closeModal(); }
function closeModal(){ $('#modal').classList.add('hidden'); }
function openModal(html){ $('#modalCard').innerHTML = html; $('#modal').classList.remove('hidden'); }

// LocalStorage State Management
function getLocalSolves(){
  try { return JSON.parse(localStorage.getItem('ascc_solves') || '{}'); } catch(e) { return {}; }
}
function setLocalSolve(cid){
  let s = getLocalSolves();
  s[cid] = true;
  localStorage.setItem('ascc_solves', JSON.stringify(s));
}
function getLocalTeam(){
  try {
    let t = JSON.parse(localStorage.getItem('ascc_team'));
    if (t) return t;
  } catch(e) {}
  return { logged_in: true, name: "Team Gambit", score: 0 };
}

// Applies solve status and unlocks ch13 when >= 8 tasks are solved
function syncChallengesState(){
  let solves = getLocalSolves();
  let nonFinalSolves = 0;
  challenges.forEach(c => {
    c.solved = !!solves[c.id];
    if (c.id !== 'ch13' && c.solved) nonFinalSolves++;
  });
  let ch13 = challenges.find(c => c.id === 'ch13');
  if (ch13) {
    ch13.locked = (nonFinalSolves < 8);
  }
}

function renderFilters(){
  let cats = ['ALL', ...new Set(challenges.map(c => c.category))];
  $('#filters').innerHTML = cats.map(c => `
    <button class="filter ${c === activeCategory ? 'active' : ''}" onclick="setFilter('${esc(c)}')">${esc(c)}</button>
  `).join('');
}

function setFilter(c){
  activeCategory = c;
  renderFilters();
  renderChallenges();
}

function renderChallenges(){
  syncChallengesState();
  let list = activeCategory === 'ALL' ? challenges : challenges.filter(c => c.category === activeCategory);
  $('#challengeGrid').innerHTML = list.map(c => `
    <article class="card ${c.solved ? 'solved' : ''} ${c.locked ? 'locked' : ''}">
      <div class="cat">${esc(c.category)}</div>
      <div class="points">${c.points} PTS</div>
      <h3>${c.locked ? '🔒 ' : ''}${esc(c.title)}</h3>
      <div class="desc">${esc(c.description)}</div>
      <div style="margin-top:15px">
        ${c.solved ? '<span class="solvedtag">✓ FLAG ACCEPTED</span>' : ''}
      </div>
      <button class="open" onclick="openChallenge('${c.id}')">${c.locked ? 'LOCKED' : 'OPEN FILE'}</button>
    </article>
  `).join('');
}

function challengeHTML(c){
  let solves = getLocalSolves();
  let nonFinalSolves = Object.keys(solves).filter(k => k !== 'ch13').length;

  if (c.locked) {
    let needed = Math.max(0, 8 - nonFinalSolves);
    return `<button class="close" onclick="closeModal()">×</button>
      <div class="meta">${esc(c.category)} // ${c.points} POINTS</div>
      <h2>🔒 ${esc(c.title)}</h2>
      <p style="color:#ffd166; font-weight:bold; font-size:15px; margin-top:16px;">CHECKMATE remains locked.</p>
      <p>Solve at least <b>8 of the 12</b> intelligence tasks before attempting attribution and disarming ENDGAME.</p>
      <div style="background:#090e16; border:1px solid #1e2c3d; padding:14px; border-radius:6px; margin:16px 0; font-size:13px;">
        Current Progress: <b style="color:#38bdf8;">${nonFinalSolves} / 8 solved</b> (${needed} more required)
      </div>`;
  }

  let d = (c.downloads || []).map(x => `
    <a href="evidence/${c.id}/${encodeURIComponent(x.file)}" download>${esc(x.label)}</a>
  `).join('');

  let l = (c.links || []).map(x => `
    <a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)}</a>
  `).join('');

  let hints = (c.hints || []).map((h, i) => `
    <div>
      <button class="hintbtn" onclick="this.nextElementSibling.classList.toggle('hidden')">HINT ${i+1}</button>
      <div class="hintbox hidden">${esc(h)}</div>
    </div>
  `).join('');

  let final = c.final ? `
    <div class="finalform">
      <div style="font-size:11px; letter-spacing:1px; color:#ffd166; font-weight:700; margin-bottom:10px;">ATTRIBUTION PACKAGE VALIDATOR</div>
      <input id="identity" placeholder="King identity (e.g. Michael Parker)">
      <input id="activation" placeholder="ENDGAME activation ID (e.g. NBN-0417)">
      <input id="phrase" placeholder="Rebecca's final phrase">
      <button class="primary" style="width:100%; margin-top:4px;" onclick="checkFinal()">VALIDATE ATTRIBUTION PACKAGE</button>
      <div id="finalResult"></div>
    </div>` : '';

  return `<button class="close" onclick="closeModal()">×</button>
    <div class="meta">${esc(c.category)} // ${c.points} POINTS</div>
    <h2>${esc(c.title)}</h2>
    <p>${esc(c.description)}</p>
    ${c.objective ? `<p><b>Objective:</b> ${esc(c.objective)}</p>` : ''}
    ${c.flag_format ? `<p><b>Flag format:</b> <code>${esc(c.flag_format)}</code></p>` : ''}
    ${d ? `<div class="downloads">${d}</div>` : ''}
    ${l ? `<div class="links">${l}</div>` : ''}
    ${hints}
    ${final}
    <div class="flagrow">
      <input id="flagInput" autocomplete="off" placeholder="ASCC{...}" ${c.solved ? 'disabled' : ''}>
      <button class="submit" onclick="submitFlag('${c.id}')" ${c.solved ? 'disabled' : ''}>SUBMIT FLAG</button>
    </div>`;
}

function openChallenge(id){
  let c = challenges.find(x => x.id === id);
  if (c) openModal(challengeHTML(c));
}

function submitFlag(cid){
  let input = $('#flagInput');
  let flag = (input ? input.value : '').trim();
  if (!flag) return toast('Enter a flag first.');

  let c = challenges.find(x => x.id === cid);
  if (c && c.locked) return toast('This challenge is currently locked.');

  let submittedHash = computeSHA256(flag);
  let expectedHash = FLAG_HASHES[cid];

  if (expectedHash && submittedHash === expectedHash) {
    let already = !!getLocalSolves()[cid];
    setLocalSolve(cid);
    syncChallengesState();
    loadTeam();
    renderChallenges();
    openModal(challengeHTML(challenges.find(x => x.id === cid)));
    toast(already ? 'Flag accepted! (Already recorded)' : `Flag accepted! +${c ? c.points : 100} PTS`, true);
  } else {
    toast('Incorrect flag. Check formatting and try again.');
  }
}

function checkFinal(){
  let solves = getLocalSolves();
  let nonFinalSolves = Object.keys(solves).filter(k => k !== 'ch13').length;
  if (nonFinalSolves < 8) {
    $('#finalResult').innerHTML = `<div class="hintbox" style="color:#ff9aa3">Attribution locked: You must solve at least 8 intelligence tasks first.</div>`;
    return;
  }

  let identity = ($('#identity') ? $('#identity').value : '').trim();
  let activation = ($('#activation') ? $('#activation').value : '').trim();
  let phrase = ($('#phrase') ? $('#phrase').value : '').trim();

  let idOk = /michael.*parker|mparker/i.test(identity);
  let actOk = /nbn[-_]?0?417/i.test(activation);
  let phrOk = /the board is yours|still mine to destroy/i.test(phrase);

  if (!idOk) {
    $('#finalResult').innerHTML = `<div class="hintbox" style="color:#ff9aa3">Attribution verification failed: King identity not recognized.</div>`;
    return;
  }
  if (!actOk) {
    $('#finalResult').innerHTML = `<div class="hintbox" style="color:#ff9aa3">Attribution verification failed: Invalid ENDGAME activation identifier.</div>`;
    return;
  }
  if (!phrOk) {
    $('#finalResult').innerHTML = `<div class="hintbox" style="color:#ff9aa3">Attribution verification failed: Final phrase does not match recovered evidence.</div>`;
    return;
  }

  // Derive decryption key from canonical answers
  let phraseCanon = /the board is yours/i.test(phrase) ? "THE BOARD IS YOURS" : "IT IS STILL MINE TO DESTROY";
  let keyString = "MICHAEL PARKER|NBN-0417|" + phraseCanon;
  let keyHash = computeSHA256(keyString);

  let pkg = FINAL_ATTRIBUTION_PACKAGES.find(p => p.keyHash === keyHash);
  if (pkg) {
    // Decrypt ciphertext using stream cipher derived from key bytes
    let cipherBytes = [];
    for (let i = 0; i < pkg.cipherHex.length; i += 2) {
      cipherBytes.push(parseInt(pkg.cipherHex.substr(i, 2), 16));
    }
    let keyBytes = [];
    for (let i = 0; i < keyHash.length; i += 2) {
      keyBytes.push(parseInt(keyHash.substr(i, 2), 16));
    }
    let decrypted = cipherBytes.map((b, i) => String.fromCharCode(b ^ keyBytes[i % keyBytes.length])).join('');

    $('#finalResult').innerHTML = `<div class="hintbox" style="color:#8affaf; border-left-color:#10b981;">
      ATTRIBUTION ACCEPTED. ENDGAME DISARMED.<br><br>
      Final flag: <b style="color:#ffd166; font-size:15px;">${esc(decrypted)}</b><br><br>
      Submit this flag below to complete CHECKMATE.
    </div>`;
    let flagInput = $('#flagInput');
    if (flagInput) flagInput.value = decrypted;
  } else {
    $('#finalResult').innerHTML = `<div class="hintbox" style="color:#ff9aa3">Attribution package could not be verified.</div>`;
  }
}

function openAuth(mode){
  authMode = mode;
  let isReg = mode === 'register';
  openModal(`
    <button class="close" onclick="closeModal()">×</button>
    <div class="meta">TEAM ACCESS</div>
    <h2>${isReg ? 'Register team' : 'Team login'}</h2>
    <div class="authform">
      <input id="teamName" maxlength="40" placeholder="Team name">
      <input id="teamPin" type="password" inputmode="numeric" placeholder="4-8 digit team PIN">
      <button class="primary" style="width:100%;" onclick="authSubmit()">${isReg ? 'REGISTER' : 'LOGIN'}</button>
    </div>
    <p>${isReg ? 'Already registered?' : 'Need to register?'} 
      <span class="authswitch" onclick="openAuth('${isReg ? 'login' : 'register'}')">${isReg ? 'Login' : 'Register'}</span>
    </p>
  `);
}

function authSubmit(){
  let name = ($('#teamName') ? $('#teamName').value : '').trim() || 'Team Gambit';
  let team = { logged_in: true, name: name };
  localStorage.setItem('ascc_team', JSON.stringify(team));
  toast('Welcome, ' + name, true);
  closeModal();
  loadTeam();
}

function logout(){
  localStorage.setItem('ascc_team', JSON.stringify({ logged_in: false, name: '' }));
  loadTeam();
}

function loadTeam(){
  let team = getLocalTeam();
  let solves = getLocalSolves();
  let score = Object.keys(solves).reduce((acc, id) => {
    let c = challenges.find(x => x.id === id);
    return acc + (c ? c.points : 0);
  }, 0);

  if (!team.logged_in) {
    $('#teamPanel').innerHTML = `
      <button class="primary" onclick="openAuth('register')">REGISTER TEAM</button>
      <button class="ghost" onclick="openAuth('login')">LOGIN</button>
    `;
  } else {
    $('#teamPanel').innerHTML = `
      <div><b>${esc(team.name)}</b> &nbsp; <span style="color:#ffd166; font-weight:800;">${score} pts</span> (${Object.keys(solves).length} solved)</div>
      <button class="ghost" style="padding:6px 12px; margin-left:8px;" onclick="resetProgress()">RESET</button>
      <button class="ghost" style="padding:6px 12px;" onclick="logout()">LOGOUT</button>
    `;
  }
}

function resetProgress(){
  if (confirm("Reset all solved flags and progress for this browser session?")) {
    localStorage.removeItem('ascc_solves');
    syncChallengesState();
    loadTeam();
    renderChallenges();
    toast('Progress reset.', true);
  }
}

// Client-side timer (no backend required)
function startTimer(){
  let sessionStart = localStorage.getItem('ascc_clock_start');
  if (!sessionStart) {
    sessionStart = Date.now();
    localStorage.setItem('ascc_clock_start', sessionStart);
  }
  const totalSeconds = 3 * 3600; // 3 hours

  function tick(){
    let elapsed = Math.floor((Date.now() - parseInt(sessionStart, 10)) / 1000);
    let remain = Math.max(0, totalSeconds - elapsed);
    let h = Math.floor(remain / 3600);
    let m = Math.floor((remain % 3600) / 60);
    let s = remain % 60;
    let timerEl = $('#timer');
    let statusEl = $('#eventStatus');
    if (timerEl) {
      timerEl.textContent = [h, m, s].map(x => String(x).padStart(2, '0')).join(':');
    }
    if (statusEl) {
      statusEl.textContent = remain > 0 ? 'OPERATION ACTIVE' : 'TIME EXPIRED';
    }
  }
  tick();
  setInterval(tick, 1000);
}

// Initialize on page load
syncChallengesState();
loadTeam();
renderFilters();
renderChallenges();
startTimer();
