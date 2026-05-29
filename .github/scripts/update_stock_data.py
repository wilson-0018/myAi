#!/usr/bin/env python3
"""
从新浪财经获取股票实时行情，生成 stock-data.json
盘中拉实时数据，收盘后拉收盘数据
"""

import json
import os
import re
import urllib.request

# 28+2只精选标的（新浪代码格式）
CODES = {
    "sh601600": "中国铝业", "sz002428": "云南锗业", "sh600549": "厦门钨业",
    "sz002155": "湖南黄金", "sz000960": "锡业股份", "sz000831": "中国稀土",
    "sh688126": "沪硅产业", "sh603650": "彤程新材", "sh688268": "华特气体",
    "sz300666": "江丰电子", "sh688019": "安集科技", "sz002409": "雅克科技",
    "sz300395": "菲利华", "sh688012": "中微公司", "sz002371": "北方华创",
    "sh688072": "拓荆科技", "sh688082": "盛美上海", "sh688361": "中科飞测",
    "sh600641": "先导基电", "sh603986": "兆易创新", "sh688008": "澜起科技",
    "sh688037": "芯源微", "sz002156": "通富微电", "sz000021": "深科技",
    "sz000426": "兴业银锡", "sh600584": "长电科技", "sz002185": "华天科技",
    "sz300223": "北京君正", "sz300054": "鼎龙股份", "sz301308": "江波龙",
}

def fetch_from_sina():
    """从新浪财经拉实时行情"""
    code_str = ','.join(CODES.keys())
    url = f'https://hq.sinajs.cn/list={code_str}'
    req = urllib.request.Request(url, headers={
        'Referer': 'https://finance.sina.com.cn',
        'User-Agent': 'Mozilla/5.0'
    })
    resp = urllib.request.urlopen(req, timeout=15)
    raw = resp.read().decode('gbk')
    return raw

def parse_sina_data(text):
    """解析新浪返回的行情数据"""
    stocks = {}
    trade_date = None
    
    for line in text.strip().split('\n'):
        m = re.search(r'hq_str_(\w+)="([^"]+)"', line)
        if not m:
            continue
        code = m.group(1)
        vals = m.group(2).split(',')
        if len(vals) < 8:
            continue
        
        name = vals[0]
        price = float(vals[3]) if vals[3] else 0
        prev_close = float(vals[2]) if vals[2] else price
        change_pct = round((price - prev_close) / prev_close * 100, 2) if prev_close > 0 else 0.0
        date_str = vals[30] if len(vals) > 30 else ''
        
        stocks[code] = {
            "name": name,
            "price": price,
            "change_pct": change_pct,
            "date": date_str
        }
        if not trade_date and date_str:
            trade_date = date_str
    
    return stocks, trade_date

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
    print(f"  更新类型: {time_label}")
    
    return {
        "update_time": update_time,
        "stocks": stocks
    }

def main():
    try:
        print("=" * 60)
        print("股票数据更新脚本启动")
        print("=" * 60)
        
        data = fetch_stock_data()
        
        # 生成两个位置的文件，以兼容不同的配置
        paths = [
            'stock/stock-data.json',      # 新位置（推荐）
            'stock-data.json'             # 旧位置（兼容）
        ]
        
        for output_path in paths:
            try:
                # 确保目录存在
                os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
                
                # 生成文件
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                
                print(f"✓ 文件已生成: {output_path}")
                file_size = os.path.getsize(output_path)
                print(f"  文件大小: {file_size} 字节")
            except Exception as e:
                print(f"✗ 生成文件失败 {output_path}: {e}")
        
        print(f"✓ 共更新 {len(data['stocks'])} 只股票")
        print(f"✓ 更新时间: {data['update_time']}")
        print("=" * 60)
        print("脚本执行成功")
        print("=" * 60)
        
    except Exception as e:
        print(f"✗ 错误: {e}")
        import traceback
        traceback.print_exc()
        exit(1)

if __name__ == "__main__":
    main()
