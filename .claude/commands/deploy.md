Deploy the site via Hostinger Git integration.

Preconditions (verify, do not assume): phase 6 qa = done in
state/BUILD_STATE.md; working tree committed; human has confirmed deploy
in this session. Then follow the deploy-hostinger skill exactly - the
Hostinger path runs `bash scripts/deploy-split.sh`, which regenerates the
site-only `production` branch (contents of site/ at branch root, zero OS
files - the script proves it) and force-pushes it for the webhook to pull.
After deploy: record live URL + date in BUILD_STATE.md, run the
post-deploy checks from the skill.
