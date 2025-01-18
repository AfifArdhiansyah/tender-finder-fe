import websocket

def on_message(ws, message):
    print(f"Received: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print("Closed connection", close_status_code, close_msg)

def on_open(ws):
    print("Opened connection")
    ws.send("Hello from client")

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(
        "ws://localhost:8080",
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.on_open = on_open
    ws.run_forever()
