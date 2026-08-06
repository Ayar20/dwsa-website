export interface WebhookDeliveryLog {
  id: string;
  endpointId: string;
  event: string;
  statusCode: number;
  attempt: number;
  deliveredAt: string;
  responseMs: number;
}

export class WebhookService {
  static getDeliveryLogs(tenantId: string): WebhookDeliveryLog[] {
    return [
      { id: "log-001", endpointId: "wh-002", event: "payment.success", statusCode: 200, attempt: 1, deliveredAt: "Just now", responseMs: 124 },
      { id: "log-002", endpointId: "wh-001", event: "student.enrolled", statusCode: 200, attempt: 1, deliveredAt: "2 mins ago", responseMs: 88 },
      { id: "log-003", endpointId: "wh-003", event: "course.created", statusCode: 504, attempt: 3, deliveredAt: "1 hour ago", responseMs: 5000 },
    ];
  }
}
