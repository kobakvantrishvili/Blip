const WEBSOCKET_URL = "wss://stream.openseabeta.com/socket/websocket";
const API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY; // Make sure to add your API key in the .env.local file

type EventHandler = (data: any) => void;

interface EventHandlers {
  [eventType: string]: EventHandler | null;
}

interface OpenSeaClientConfig {
  collectionSlug: string;
}

class OpenSeaClient {
  private ws: WebSocket | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private refCounter: number = 0;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 5000; // 5 seconds
  private isConnected: boolean = false;
  private config: OpenSeaClientConfig;

  private subscribedEvents: Set<string> = new Set();

  private eventHandlers: EventHandlers = {
    item_metadata_updated: null,
    item_listed: null,
    item_sold: null,
    item_transferred: null,
    item_received_offer: null,
    item_received_bid: null,
    item_cancelled: null,
    collection_offer: null,
    // Add more event types as needed
  };

  constructor(config: OpenSeaClientConfig) {
    this.config = config;
  }

  public subscribe(eventType: string, handler: EventHandler) {
    if (this.subscribedEvents.has(eventType)) {
      console.log(`Already subscribed to event type '${eventType}'`);
      return;
    }

    this.subscribedEvents.add(eventType);

    if (this.eventHandlers.hasOwnProperty(eventType)) {
      this.eventHandlers[eventType] = handler;
      console.log(`Subscribed to event type '${eventType}'`);
    } else {
      console.warn(`Event type '${eventType}' is not handled`);
    }
  }

  public unsubscribe(eventType: string) {
    if (this.subscribedEvents.has(eventType)) {
      this.subscribedEvents.delete(eventType);
    }

    if (this.eventHandlers.hasOwnProperty(eventType)) {
      this.eventHandlers[eventType] = null;
    }
  }

  public connect() {
    if (this.isConnected) {
      console.log("Already connected to OpenSea Stream API");
      return;
    }

    const url = `${WEBSOCKET_URL}?token=${API_KEY}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = this.onSocketOpen.bind(this);
    this.ws.onmessage = this.onSocketMessage.bind(this);
    this.ws.onclose = this.onSocketClose.bind(this);
    this.ws.onerror = this.onSocketError.bind(this);

    window.addEventListener("beforeunload", this.disconnect.bind(this));
  }

  private onSocketOpen() {
    console.log("Connected to OpenSea Stream API");
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.sendHeartbeat();
    this.heartbeatInterval = setInterval(this.sendHeartbeat.bind(this), 30000);
    this.subscribeToCollection();
    this.reconnectAttempts = 0;
  }

  private onSocketMessage(message: MessageEvent) {
    const data = JSON.parse(message.data);
    const { event } = data;
    if (this.subscribedEvents.has(event)) this.handleEvent(event, data);
  }

  private onSocketClose(event: CloseEvent) {
    console.log("Disconnected from OpenSea Stream API");
    console.log(`WebSocket closed with code: ${event.code} ${event.reason != "" ? `, reason ${event.reason}` : ""}`);
    this.isConnected = false;
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    const reconnectInterval = setInterval(() => {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        clearInterval(reconnectInterval);
        console.error("Max reconnect attempts reached. Giving up.");
        return;
      }

      console.log(`Attempting to reconnect... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
      this.reconnectAttempts++;
      this.connect();

      if (this.isConnected) {
        clearInterval(reconnectInterval);
        return;
      }
    }, this.reconnectDelay);
  }

  private onSocketError(event: Event) {
    console.error("WebSocket error:", event);
  }

  private getRef(): number {
    return this.refCounter++;
  }

  private handleEvent(event: string, data: any) {
    const handler = this.eventHandlers[event];
    if (handler) {
      handler(data);
    }
  }

  private sendHeartbeat() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.getRef(),
        })
      );
    }
  }

  private subscribeToCollection() {
    const { collectionSlug } = this.config;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          topic: `collection:${collectionSlug}`,
          event: "phx_join",
          payload: {},
          ref: this.getRef(),
        })
      );
    }
  }

  public disconnect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const { collectionSlug } = this.config;
      this.ws.send(
        JSON.stringify({
          topic: `collection:${collectionSlug}`,
          event: "phx_leave",
          payload: {},
          ref: this.getRef(),
        })
      );
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
}

export default OpenSeaClient;
