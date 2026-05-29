#!/usr/bin/env python3
"""
更新股票数据并生成 stock-data.json
"""

import json
from datetime import datetime

def fetch_stock_data():
    """获取或生成股票数据"""
    stock_data = {
        "timestamp": datetime.now().isoformat(),
        "updated_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        "stocks": [
            {
                "symbol": "000001",
                "name": "平安银行",
                "price": 0.0,
                "change": 0.0
            }
        ]
        # 根据您的实际需求添加股票数据逻辑
    }
    return stock_data

def main():
    data = fetch_stock_data()
    
    # 生成 stock-data.json 文件到仓库根目录
    with open('stock-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("股票数据已成功更新")

if __name__ == "__main__":
    main()
