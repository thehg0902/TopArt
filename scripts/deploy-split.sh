#!/usr/bin/env bash
# deploy-split.sh [commit]
# Generate the site-only `production` branch from site/ and force-push it.
# main = everything (OS + site); production = generated output containing
# ONLY the contents of site/ at its root — the Hostinger webhook pulls
# production, so the hosting server never sees an Agency OS file.
# Optional [commit] arg: split from that main commit instead of HEAD
# (rollback: pass the previous good main commit).
set -euo pipefail

SRC_COMMIT="${1:-main}"
OS_PATHS='^(CLAUDE\.md|\.claude/|contracts/|state/|scripts/|client/|docs/)'

# --- preconditions -------------------------------------------------------
if [ -n "$(git status --porcelain)" ]; then
  echo "ABORT: working tree not clean - commit or stash first." >&2
  exit 1
fi
if [ ! -f site/index.html ]; then
  echo "ABORT: site/index.html missing - nothing to deploy." >&2
  exit 1
fi
# Same grep as .claude/hooks/pre-deploy-qa-gate.sh (belt and suspenders).
if ! grep -E '^\|\s*6\s*\|\s*qa\s*\|\s*done' state/BUILD_STATE.md >/dev/null 2>&1; then
  echo "ABORT: QA phase not marked done in state/BUILD_STATE.md. Run /qa first." >&2
  exit 1
fi

# --- split ---------------------------------------------------------------
echo "Splitting site/ from ${SRC_COMMIT}..."
SPLIT=$(git subtree split --prefix site "$SRC_COMMIT")
echo "Split commit: ${SPLIT}"

# --- cleanliness check (proof the branch is site-only) --------------------
FILES=$(git ls-tree -r --name-only "$SPLIT")
echo "--- files at production tip ---"
echo "$FILES"
echo "-------------------------------"
if echo "$FILES" | grep -E "$OS_PATHS" ; then
  echo "FAIL: OS files found in the split - production would leak Agency OS files. NOT pushing." >&2
  exit 1
fi
echo "PASS: split contains only site files."

# --- push (graceful if no remote) -----------------------------------------
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "NOTE: no 'origin' remote configured - skipping push. Split verified locally."
  exit 0
fi
git push origin "${SPLIT}:refs/heads/production" --force
echo "Pushed ${SPLIT} -> origin/production"
