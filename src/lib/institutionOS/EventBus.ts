import { EventBusPayload, SystemEventType } from "@/types/institutionOS";

type EventHandler = (event: EventBusPayload) => void;

class InstitutionEventBus {
  private handlers: Map<SystemEventType, EventHandler[]> = new Map();
  private eventHistory: EventBusPayload[] = [];

  public subscribe(eventType: SystemEventType, handler: EventHandler): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);

    // Return unsubscribe function
    return () => {
      const currentHandlers = this.handlers.get(eventType) || [];
      this.handlers.set(
        eventType,
        currentHandlers.filter((h) => h !== handler)
      );
    };
  }

  public publish(eventType: SystemEventType, sourceModule: string, payload: Record<string, any>): EventBusPayload {
    const event: EventBusPayload = {
      eventId: `EVT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      eventType,
      timestamp: new Date().toISOString(),
      sourceModule,
      payload,
    };

    this.eventHistory.unshift(event);
    if (this.eventHistory.length > 100) {
      this.eventHistory.pop();
    }

    const handlers = this.handlers.get(eventType) || [];
    handlers.forEach((handler) => {
      try {
        handler(event);
      } catch (err) {
        console.error(`[EventBus] Error executing handler for ${eventType}:`, err);
      }
    });

    return event;
  }

  public getHistory(): EventBusPayload[] {
    return [...this.eventHistory];
  }
}

export const eventBus = new InstitutionEventBus();
