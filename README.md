# Task Force Gambit // CHECKMATE (ASCC 2026 Round 4 Finals)

A high-fidelity recreation of the **Australian Cyber Security Challenge (ASCC) 2026 Round 4 Finals** challenge website (`checkmate.local`).

---

## ♚ Overview

> **"ONE MEMBER REMAINS."**  
> The Queen is in custody. Evidence recovered from her devices suggests the final Archaic operator has activated **ENDGAME**. Investigate the evidence, collect flags, identify the King and stop the final move.

This repository recreates the full CTF competition portal, including:
- **13 Complete Intelligence & Forensics Challenges** across 8 categories (Forensics, Network, Log Analysis, Crypto, Passwords, OSINT, Web, Reverse Engineering, and Final Attribution).
- **Embedded Challenge Evidence Files**: Downloadable pcaps, triage archives, logs, snapshots, encrypted diaries, wordlists, and binaries.
- **Interactive Intel Archives**: Simulated mirror snapshots for ChessForum, Loopr, GitForge, and the Archaic Message Console.
- **Client-Side Progressive Unlock**: The final attribution challenge (`ch13` // CHECKMATE) is locked until at least **8 of the first 12 challenges** are solved.
- **Persistent State**: Progress, team score, and solve status are preserved across browser sessions via `localStorage`.

---

## 🚀 Getting Started

### Option 1: Direct File Opening (No Server / Zero Dependencies)
Simply open `index.html` in any modern web browser (Safari, Chrome, Firefox, Arc, etc.):
```bash
open index.html
```
All challenge descriptions, hints, downloads, flag submissions, scoring, and the final attribution checker run 100% in the browser with no background services needed.

### Option 2: Local HTTP Server (Optional)
If you prefer running via a local server:
```bash
python3 server.py
# Open http://localhost:8000
```
Or with standard Python HTTP server:
```bash
python3 -m http.server 8000
```

---

## 📁 Repository Structure

```
.
├── index.html                   # Main challenge portal UI
├── static/
│   ├── style.css                # Cyber-ops terminal stylesheet with scanlines
│   └── app.js                   # Client-side state and challenge validator engine
├── api/                         # Static API JSON data for challenges, team, scoreboard
│   ├── challenges.json
│   ├── team.json
│   ├── scoreboard.json
│   └── event.json
├── evidence/                    # Actual challenge evidence files
│   ├── ch01/ (queen_triage.zip)
│   ├── ch02/ (family_photo.jpg)
│   ├── ch03/ (queen_capture.pcap)
│   ├── ch04/ (dns_beacon.pcap, analyst_note.txt)
│   ├── ch05/ (auth.log, proxy.log, endpoint.log)
│   ├── ch06/ (host_snapshot.tar.gz)
│   ├── ch07/ (rebecca_diary.enc, readme.txt)
│   ├── ch08/ (password.hash, candidate_words.txt, king_backup.zip, readme.txt)
│   ├── ch11/ (blackvault_final)
│   └── ch12/ (board.txt, moves.txt, readme.txt)
├── archive/                     # Reconstructed intelligence web archives
│   ├── chessforum/blackking77/
│   ├── loopr/michael-p/
│   └── gitforge/mp1979/
├── king-console/                # Recovered Archaic message query interface
│   └── index.html
├── live/                        # Public live scoreboard display
│   └── index.html
└── server.py                    # Optional backend server emulator
```

---

## 🎯 Challenges Summary

| ID | Title | Category | Points | Description / Goal |
|---|---|---|---|---|
| **ch01** | Queen's Cache | Forensics | 100 | Targeted triage export from Rebecca Parker's profile |
| **ch02** | Ghost Photograph | Forensics | 100 | Steganography / metadata analysis of family archive photo |
| **ch03** | 96 Seconds | Network | 150 | PCAP analysis of network traffic during device seizure |
| **ch04** | DNS Trail | Network | 200 | Repetitive DNS queries carrying fragmented data |
| **ch05** | 18:07:43 | Log Analysis | 150 | Auth, proxy, and endpoint correlation around ENDGAME |
| **ch06** | Host Snapshot | Log Analysis | 150 | Network operations host snapshot investigation |
| **ch07** | Seven Rabbits Returns | Crypto | 200 | Decode Rebecca's encrypted diary using Seven Rabbits technique |
| **ch08** | Old Habits | Passwords | 200 | Legacy password hash cracking against candidate list |
| **ch09** | Three Names, One Person | OSINT | 200 | Correlate archived profile usernames across platforms |
| **ch10** | The King's Console | Web | 200 | SQL injection on message query interface |
| **ch11** | blackvault_final | Reverse Eng. | 250 | Reverse engineering Archaic node binary authentication |
| **ch12** | The Board Is the Key | Puzzle | 200 | Chessboard coordinate cipher decryption |
| **ch13** | **CHECKMATE** | Final | 700 | Disarm ENDGAME by attributing King, Activation ID & Final Phrase |

---

*Classified Training Environment // ASCC 2026*
