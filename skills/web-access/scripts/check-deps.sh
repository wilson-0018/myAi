#!/usr/bin/env bash
# OpenClaw 浏览器环境检查

echo "=== OpenClaw Browser Check ==="
STATUS=$(openclaw browser status 2>/dev/null)
echo "$STATUS"

# 检查是否有支持的浏览器
if echo "$STATUS" | grep -qi "unknown\|not found\|no supported browser"; then
  echo ""
  echo "⚠️  未检测到支持的浏览器（Chrome/Brave/Edge/Chromium）"
  echo "CDP 浏览器模式需要安装以下任一浏览器："
  echo "  - Chrome: https://www.google.com/chrome/"
  echo "  - Brave: https://brave.com/download/"
  echo "  - Edge:  https://www.microsoft.com/edge"
  echo "  - Chromium: https://www.chromium.org/getting-involved/download-chromium"
  echo ""
  echo "安装后重新运行此脚本验证"
fi

# 检查 Gateway
echo ""
echo "=== OpenClaw Gateway Check ==="
if openclaw status 2>/dev/null | grep -qi "running\|RPC probe.*ok"; then
  echo "gateway: ok"
else
  echo "gateway: 需要启动 — 运行 openclaw gateway start"
fi
