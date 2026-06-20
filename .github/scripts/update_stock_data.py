#!/usr/bin/env python3
"""
从新浪财经获取股票实时行情，生成 stock-data.json
按新版 chip-supply.html 的 27+1只精选标的结构输出
支持 chip-supply 和 chip-supply-chain 两个页面使用
"""

import json
import os
import re
import sys
import urllib.request
import urllib.parse

# === 新版 chip-supply.html 的 27只股票 + 1 ETF ===
# 短代码 -> {名称, 新浪完整代码}
CODES = {
    # 一、存储芯片 · 国产替代龙头 (4只)
    "603986": {"n": "兆易创新", "s": "sh603986"},
    "688008": {"n": "澜起科技", "s": "sh688008"},
    "688126": {"n": "沪硅产业", "s": "sh688126"},
    "688037": {"n": "芯源微",   "s": "sh688037"},
    
    # 二、半导体设备 · 先进制程 (6只)
    "688012": {"n": "中微公司", "s": "sh688012"},
    "002371": {"n": "北方华创", "s": "sz002371"},
    "688072": {"n": "拓荆科技", "s": "sh688072"},
    "688082": {"n": "盛美上海", "s": "sh688082"},
    "688361": {"n": "中科飞测", "s": "sh688361"},
    "600641": {"n": "万业企业", "s": "sh600641"},
    
    # 三、芯片上游材料 · 精密工艺 (6只)
    "603650": {"n": "彤程新材", "s": "sh603650"},
    "688268": {"n": "华特气体", "s": "sh688268"},
    "300666": {"n": "江丰电子", "s": "sz300666"},
    "688019": {"n": "安集科技", "s": "sh688019"},
    "002409": {"n": "雅克科技", "s": "sz002409"},
    "300395": {"n": "菲利华",   "s": "sz300395"},
    
    # 四、PCB · 线路板 · AI算力硬件 (3只)
    "002463": {"n": "沪电股份", "s": "sz002463"},
    "002916": {"n": "深南电路", "s": "sz002916"},
    "002938": {"n": "鹏鼎控股", "s": "sz002938"},
    
    # 五、光模块 & CPO · AI数据中心链 (5只)
    "300308": {"n": "中际旭创", "s": "sz300308"},
    "300502": {"n": "新易盛",   "s": "sz300502"},
    "300394": {"n": "天孚通信", "s": "sz300394"},
    "002281": {"n": "光迅科技", "s": "sz002281"},
    "688498": {"n": "源杰科技", "s": "sh688498"},
    
    # 六、AI服务器 & 国产算力 (3只)
    "601138": {"n": "工业富联", "s": "sh601138"},
    "000977": {"n": "浪潮信息", "s": "sz000977"},
    "603019": {"n": "中科曙光", "s": "sh603019"},
    
    # 七、光纤光缆 · 数据中心互联 (3只)
    "601869": {"n": "长飞光纤", "s": "sh601869"},
    "600487": {"n": "亨通光电", "s": "sh600487"},
    "600522": {"n": "中天科技", "s": "sh600522"},
    
    # 八、封装测试 & 存储模组 (4只)
    "600584": {"n": "长电科技", "s": "sh600584"},
    "000021": {"n": "深科技",   "s": "sz000021"},
    "002156": {"n": "通富微电", "s": "sz002156"},
    # ETF
    "513310": {"n": "中韩半导ETF", "s": "sh513310"},
}

def fetch_from_sina():
    """从新浪财经拉实时行情"""
    # 用完整新浪代码 (s字段) 去请求
    sina_codes = [v["s"] for v in CODES.values()]
    code_str = ','.join(sina_codes)
    url = f'https://hq.sinajs.cn/list={code_str}'
    req = urllib.request.Request(url, headers={
        'Referer': 'https://finance.sina.com.cn',
        'User-Agent': 'Mozilla/5.0'
    })
    resp = urllib.request.urlopen(req, timeout=15)
    raw = resp.read().decode('gbk')
    return raw

def parse_sina_data(text):
    """解析新浪返回的行情数据，输出以短代码为 key"""
    stocks = {}
    trade_date = None
    
    # 构建 新浪完整代码 -> 短代码 映射
    sinav2short = {v["s"]: k for k, v in CODES.items()}
    
    for line in text.strip().split('\n'):
        m = re.search(r'hq_str_(\w+)="([^"]+)"', line)
        if not m:
            continue
        sina_code = m.group(1)
        vals = m.group(2).split(',')
        if len(vals) < 8:
            continue
        
        short = sinav2short.get(sina_code)
        if not short:
            continue
        
        name = vals[0]
        price = float(vals[3]) if vals[3] else 0
        prev_close = float(vals[2]) if vals[2] else price
        change_pct = round((price - prev_close) / prev_close * 100, 2) if prev_close > 0 else 0.0
        date_str = vals[30] if len(vals) > 30 else ''
        
        stocks[short] = {
            "name": name,
            "price": price,
            "change_pct": change_pct,
            "date": date_str,
            "sina_code": sina_code
        }
        if not trade_date and date_str:
            trade_date = date_str
    
    return stocks, trade_date

def fetch_pe_data():
    """从东方财富批量获取动态市盈率 (PE)"""
    pe_stocks = {}
    for short, info in CODES.items():
        s = info["s"]
        if s.startswith("sz"):
            secid = f"0.{short}"
        elif s.startswith("sh"):
            secid = f"1.{short}"
        else:
            continue
        pe_stocks[short] = secid
    
    try:
        secids = ",".join(pe_stocks.values())
        url = f'https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f2,f3,f12,f14,f20,f21&secids={urllib.parse.quote(secids)}'
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://quote.eastmoney.com/'
        })
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read().decode())
        
        result = {}
        for item in data.get('data', {}).get('diff', []):
            code = item.get('f12', '')
            f20 = item.get('f20')  # 动态市盈率 (×100)
            f21 = item.get('f21')  # TTM市盈率
            pe = round(f20 / 100, 2) if f20 and isinstance(f20, (int, float)) and f20 > 0 else None
            pe_ttm = round(f21 / 100, 2) if f21 and isinstance(f21, (int, float)) and f21 > 0 else None
            result[code] = {"pe": pe, "pe_ttm": pe_ttm}
        return result
    except Exception as e:
        print(f"⚠️ 获取PE数据失败: {e}")
        return {}

def fetch_stock_data():
    """获取股票数据"""
    print("从新浪财经拉取实时行情...")
    
    raw = fetch_from_sina()
    stocks, trade_date = parse_sina_data(raw)
    
    # 判断交易时段
    from datetime import datetime, timezone, timedelta
    bj_now = datetime.now(timezone(timedelta(hours=8)))
    hour = bj_now.hour
    minute = bj_now.minute
    weekday = bj_now.weekday()
    
    # 非交易日标记
    if weekday >= 5:
        time_label = "非交易日"
    elif hour < 9 or (hour == 9 and minute < 30):
        time_label = "盘前"
    elif hour < 11 or (hour == 11 and minute <= 30):
        time_label = "盘中实时"
    elif hour < 13:
        time_label = "午休 · 盘中实时"
    elif hour < 15:
        time_label = "盘中实时"
    else:
        time_label = "收盘"
    
    update_time = f"{bj_now.strftime('%Y-%m-%d %H:%M')} ({time_label})"
    
    if not stocks:
        print("⚠️ 未获取到数据，使用备选逻辑")
        raise Exception("未能从新浪获取数据")
    
    print(f"✓ 成功获取 {len(stocks)} 只股票数据")
    print(f"  交易日期: {trade_date}")
    
    # 获取动态市盈率
    print("从东方财富获取动态市盈率...")
    pe_data = fetch_pe_data()
    pe_count = 0
    for short in stocks:
        if short in pe_data and pe_data[short]["pe"]:
            stocks[short]["pe"] = pe_data[short]["pe"]
            pe_count += 1
        else:
            stocks[short]["pe"] = None
    print(f"✓ 成功获取 {pe_count} 只市盈率")
    print(f"  更新类型: {time_label}")
    
    return {
        "update_time": update_time,
        "stocks": stocks
    }

def main():
    try:
        print("=" * 60)
        print("股票数据更新脚本启动 (v2)")
        print(f"目标标的: {len(CODES)} 只")
        print("=" * 60)
        
        data = fetch_stock_data()
        
        # 三个输出位置：
        # 1. stock-data.json — 旧版 chip-supply-chain 用（保持新浪全码格式向后兼容）
        # 2. stock/stock-data.json — gh-pages stock/ 目录
        # 3. stock/chip-stock-data.json — 新版 chip-supply 用（短码key，含sina_code）
        paths = [
            'stock-data.json',            # 旧版兼容
            'stock/stock-data.json',      # gh-pages
            'stock/chip-stock-data.json', # 新版chip-supply专用
        ]
        
        for output_path in paths:
            try:
                os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print(f"✓ 文件已生成: {output_path}")
                print(f"  文件大小: {os.path.getsize(output_path)} 字节")
            except Exception as e:
                print(f"✗ 生成文件失败 {output_path}: {e}")
        
        print(f"✓ 共更新 {len(data['stocks'])} 只股票")
        print(f"✓ 更新时间: {data['update_time']}")
        print("=" * 60)
        
    except Exception as e:
        print(f"✗ 错误: {e}")
        import traceback
        traceback.print_exc()
        exit(1)

if __name__ == "__main__":
    main()
