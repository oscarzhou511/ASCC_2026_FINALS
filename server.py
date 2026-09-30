#!/usr/bin/env python3
"""
Task Force Gambit // CHECKMATE Server Emulator
Faithfully recreates the checkmate.local environment for ASCC 2026 Round 4 Finals.
"""

import http.server
import socketserver
import json
import os
import re
import urllib.parse

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

FLAG_HASHES = {
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
}

FINAL_ATTRIBUTION_PACKAGES = [
    {
        "key_hash": "8109264ed7ae614ad562870e9d47b6eaf973498c9139d17edbba91a73a457921",
        "cipher_hex": "c05a650daced290f9629ca4fc902e9afb7370ecddc7c8e3a92e9d0f577003d7eb948140de0e81c"
    },
    {
        "key_hash": "3d6c40eb08b0a81533e52725b10dafe7c3c9b6219679475320f359e469e3f2bc",
        "cipher_hex": "7c3f03a873f3e05070ae6a64e548f0a28d8df160db3c181769a018b624a6b6e3052d72a83ff6d5"
    }
]

TEAM_STATE = {
    "logged_in": True,
    "name": "Team Gambit",
    "score": 0,
    "solves": {}
}

class CheckmateHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Routing for checkmate.local URLs
        if path in ("/", ""):
            self.path = "/index.html"
            return super().do_GET()
        elif path in ("/live", "/live/"):
            self.path = "/live/index.html"
            return super().do_GET()
        elif path.startswith("/king-console"):
            self.path = "/king-console/index.html"
            return super().do_GET()
        elif path == "/archive/chessforum/blackking77":
            self.path = "/archive/chessforum/blackking77/index.html"
            return super().do_GET()
        elif path == "/archive/loopr/michael-p":
            self.path = "/archive/loopr/michael-p/index.html"
            return super().do_GET()
        elif path == "/archive/gitforge/mp1979":
            self.path = "/archive/gitforge/mp1979/index.html"
            return super().do_GET()

        # Dynamic API endpoints
        if path == "/api/challenges":
            self.send_json(self.get_challenges())
            return
        elif path == "/api/team":
            score = sum(self.get_challenge_points(cid) for cid in TEAM_STATE["solves"])
            self.send_json({
                "logged_in": TEAM_STATE["logged_in"],
                "name": TEAM_STATE["name"],
                "score": score,
                "solves": len(TEAM_STATE["solves"])
            })
            return
        elif path == "/api/scoreboard":
            score = sum(self.get_challenge_points(cid) for cid in TEAM_STATE["solves"])
            scoreboard = [
                {"rank": 1, "name": TEAM_STATE["name"], "points": score, "solves": len(TEAM_STATE["solves"])},
                {"rank": 2, "name": "NullSec", "points": 1850, "solves": 9},
                {"rank": 3, "name": "ByteBandits", "points": 1400, "solves": 7},
                {"rank": 4, "name": "CipherSquad", "points": 1150, "solves": 6},
                {"rank": 5, "name": "KernelPanics", "points": 800, "solves": 4}
            ]
            scoreboard.sort(key=lambda x: -x["points"])
            for i, item in enumerate(scoreboard):
                item["rank"] = i + 1
            self.send_json(scoreboard)
            return
        elif path == "/api/event":
            self.send_json({
                "running": True,
                "now": 1790680000,
                "ends_at": 1790690800
            })
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length) if length > 0 else b"{}"

        try:
            data = json.loads(body.decode("utf-8"))
        except Exception:
            data = {}

        if path == "/api/submit":
            cid = data.get("challenge_id", "")
            flag = data.get("flag", "").strip()

            # Check if attempting ch13 while locked (< 8 solves)
            if cid == "ch13":
                solved_count = sum(1 for k in TEAM_STATE["solves"] if k != "ch13")
                if solved_count < 8:
                    self.send_error_json("CHECKMATE is locked. You must solve at least 8 intelligence tasks first.", 403)
                    return

            expected_hash = FLAG_HASHES.get(cid, "")
            submitted_hash = hashlib.sha256(flag.encode("utf-8")).hexdigest()
            if expected_hash and submitted_hash == expected_hash:
                pts = self.get_challenge_points(cid)
                already = cid in TEAM_STATE["solves"]
                TEAM_STATE["solves"][cid] = True
                msg = "Flag accepted! (Already solved)" if already else f"Flag accepted! +{pts} PTS"
                self.send_json({"status": "success", "message": msg})
            else:
                self.send_error_json("Incorrect flag. Check formatting and try again.", 400)
            return

        elif path == "/final-check":
            # Must have solved at least 8 challenges before attempting attribution package
            solved_count = sum(1 for k in TEAM_STATE["solves"] if k != "ch13")
            if solved_count < 8:
                self.send_error_json("CHECKMATE remains locked. You must solve at least 8 intelligence tasks first.", 403)
                return

            identity = data.get("identity", "").strip()
            activation = data.get("activation", "").strip()
            phrase = data.get("phrase", "").strip()

            id_ok = bool(re.search(r"michael.*parker|mparker", identity, re.I))
            act_ok = bool(re.search(r"nbn[-_]?0?417", activation, re.I))
            phr_ok = bool(re.search(r"the board is yours|still mine to destroy", phrase, re.I))

            if not id_ok:
                self.send_error_json("Attribution verification failed: King identity not recognized.", 400)
            elif not act_ok:
                self.send_error_json("Attribution verification failed: Invalid ENDGAME activation identifier.", 400)
            elif not phr_ok:
                self.send_error_json("Attribution verification failed: Final phrase does not match recovered evidence.", 400)
            else:
                phrase_canon = "THE BOARD IS YOURS" if re.search(r"the board is yours", phrase, re.I) else "IT IS STILL MINE TO DESTROY"
                key_str = f"MICHAEL PARKER|NBN-0417|{phrase_canon}"
                key_hash = hashlib.sha256(key_str.encode("utf-8")).hexdigest()
                pkg = next((p for p in FINAL_ATTRIBUTION_PACKAGES if p["key_hash"] == key_hash), None)
                if pkg:
                    cipher_bytes = bytes.fromhex(pkg["cipher_hex"])
                    key_bytes = hashlib.sha256(key_str.encode("utf-8")).digest()
                    decrypted_flag = bytes([b ^ key_bytes[i % len(key_bytes)] for i, b in enumerate(cipher_bytes)]).decode("utf-8")
                    self.send_json({
                        "status": "success",
                        "flag": decrypted_flag
                    })
                else:
                    self.send_error_json("Attribution package could not be verified.", 400)
            return

        elif path in ("/api/register", "/api/login"):
            name = data.get("name", "Team Gambit").strip() or "Team Gambit"
            TEAM_STATE["logged_in"] = True
            TEAM_STATE["name"] = name
            self.send_json({"name": name, "logged_in": True})
            return

        elif path == "/api/logout":
            TEAM_STATE["logged_in"] = False
            self.send_json({"ok": True})
            return

        self.send_error_json("Endpoint not found", 404)

    def send_json(self, data, status=200):
        res = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(res)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(res)

    def send_error_json(self, message, status=400):
        res = json.dumps({"status": "error", "message": message}).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(res)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(res)

    def get_challenges(self):
        c_path = os.path.join(BASE_DIR, "api", "challenges.json")
        with open(c_path, "r", encoding="utf-8") as f:
            ch_list = json.load(f)
        
        # 8 of the first 12 challenges must be solved to unlock ch13 (CHECKMATE)
        solved_count = sum(1 for c in ch_list if c["id"] != "ch13" and c["id"] in TEAM_STATE["solves"])
        for c in ch_list:
            c["solved"] = (c["id"] in TEAM_STATE["solves"])
            if c["id"] == "ch13":
                c["locked"] = (solved_count < 8)
        return ch_list

    def get_challenge_points(self, cid):
        for c in self.get_challenges():
            if c["id"] == cid:
                return c.get("points", 100)
        return 100

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CheckmateHandler) as httpd:
        print(f"[*] Task Force Gambit // CHECKMATE local instance running on http://localhost:{PORT}")
        print(f"[*] Simulating checkmate.local (Round 4 Finals)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
