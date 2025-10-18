import os
import json
import uuid
from threading import Lock
from typing import List, Optional


class Storage:
    """Simple file-backed storage using JSON files in a temporary directory.

    This is designed to be simple and work in serverless environments where
    the filesystem is ephemeral. Data will persist only for the lifetime of
    the instance (cold start). For production, replace with a real DB.
    """

    def __init__(self, base_dir: Optional[str] = None):
        base = base_dir or os.environ.get("VERCEL_TEMP") or ".data"
        os.makedirs(base, exist_ok=True)
        self.base = base
        self.data_file = os.path.join(self.base, "data_lines.txt")
        self.accounts_file = os.path.join(self.base, "accounts.json")
        self.lock = Lock()
        # ensure accounts file exists
        if not os.path.exists(self.accounts_file):
            with open(self.accounts_file, "w", encoding="utf-8") as f:
                json.dump({}, f)

    def append_lines(self, lines: List[str]) -> int:
        with self.lock:
            with open(self.data_file, "a", encoding="utf-8") as f:
                for line in lines:
                    f.write(line.rstrip("\n") + "\n")
            return len(lines)

    def save_account(self, account: str) -> str:
        with self.lock:
            with open(self.accounts_file, "r", encoding="utf-8") as f:
                accounts = json.load(f)
            key = uuid.uuid4().hex
            accounts[key] = account
            with open(self.accounts_file, "w", encoding="utf-8") as f:
                json.dump(accounts, f)
            return key

    def get_account(self, key: str) -> Optional[str]:
        with self.lock:
            with open(self.accounts_file, "r", encoding="utf-8") as f:
                accounts = json.load(f)
            return accounts.get(key)


