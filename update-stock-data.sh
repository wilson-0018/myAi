#!/usr/bin/env bash
# 每日更新 stock-data.json 并推送到 GitHub
# 运行时间: 交易日 15:05 (收盘后5分钟)
# 使用新版 27+1 只精选标的

set -e
cd /Users/mac/.openclaw/workspace

python3 .github/scripts/update_stock_data.py

# 也推送到 gh-pages 分支（如果 worktree 存在）
if [ -d /tmp/gh-pages ]; then
  cp stock/chip-stock-data.json /tmp/gh-pages/stock/chip-stock-data.json
  cp stock-data.json /tmp/gh-pages/stock/stock-data.json
  cd /tmp/gh-pages
  git config user.name 'Stock Bot'
  git config user.email 'bot@github.com'
  git add stock/stock-data.json stock/chip-stock-data.json
  if ! git diff --quiet --cached; then
    git commit -m "Update stock data $(date '+%Y-%m-%d %H:%M')"
    git push origin gh-pages
    echo "Pushed to gh-pages OK"
  else
    echo "No changes to push"
  fi
else
  echo "gh-pages worktree not available, skip push"
fi

echo "Done"
