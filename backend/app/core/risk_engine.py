def calculate_kelly(win_rate, reward_to_risk=1.0):
    """
    Standard Kelly Criterion: (bp - q) / b
    win_rate (p): The probability from our ML model
    reward_to_risk (b): Assuming 1:1 for a basic swing
    """
    p = win_rate
    q = 1 - p
    b = reward_to_risk
    
    kelly_f = (b * p - q) / b
    
    # We use "Quarter Kelly" for professional safety
    safe_kelly = (kelly_f / 4) * 100
    
    return max(0, round(safe_kelly, 2))