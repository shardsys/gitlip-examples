from workers import Response
import json

def on_fetch(request):
    # Parse User-Agent
    user_agent = request.headers.get('User-Agent', 'Unknown')
    browser = parse_browser(user_agent)
    os = parse_os(user_agent)
    device = parse_device(user_agent)
    
    # Get language preferences
    languages = request.headers.get('Accept-Language', 'Unknown')
    
    # Create response object
    response_data = {
        "device": {
            "userAgent": user_agent,
            "browser": browser,
            "os": os,
            "type": device
        },
        "languages": parse_languages(languages)
    }
    
    return Response(
        json.dumps(response_data, indent=2),
        headers={"Content-Type": "application/json"}
    )

def parse_browser(user_agent):
    if "Firefox" in user_agent: return "Firefox"
    if "Chrome" in user_agent and "Edg" not in user_agent: return "Chrome"
    if "Safari" in user_agent and "Chrome" not in user_agent: return "Safari"
    if "Edg" in user_agent: return "Edge"
    if "MSIE" in user_agent or "Trident/" in user_agent: return "Internet Explorer"
    return "Unknown"

def parse_os(user_agent):
    if "Windows" in user_agent: return "Windows"
    if "Mac OS" in user_agent: return "macOS"
    if "Linux" in user_agent: return "Linux"
    if "Android" in user_agent: return "Android"
    if "iPhone" in user_agent or "iPad" in user_agent: return "iOS"
    return "Unknown"

def parse_device(user_agent):
    if "Mobile" in user_agent: return "Mobile"
    if "Tablet" in user_agent: return "Tablet"
    return "Desktop"

def parse_languages(languages):
    if languages == "Unknown":
        return ["Unknown"]
    return [lang.split(";")[0].strip() for lang in languages.split(",")]
