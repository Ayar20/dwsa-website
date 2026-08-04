/**
 * BenchmarkService.ts
 * InstitutionOS Operations — System Performance & Latency Benchmarks
 */

export interface SystemBenchmark {
  metric: string;
  measuredValue: string;
  targetThreshold: string;
  status: "Optimal" | "Pass" | "Warning";
  category: "Page Speed" | "API Response" | "AI Performance" | "Build & Bundle";
}

const mockBenchmarks: SystemBenchmark[] = [
  { metric: "Initial Page Load Time (FCP)", measuredValue: "0.8s", targetThreshold: "< 1.5s", status: "Optimal", category: "Page Speed" },
  { metric: "Route Transition Latency", measuredValue: "45ms", targetThreshold: "< 100ms", status: "Optimal", category: "Page Speed" },
  { metric: "API Response Latency (Avg)", measuredValue: "38ms", targetThreshold: "< 150ms", status: "Optimal", category: "API Response" },
  { metric: "Search Query Latency", measuredValue: "18ms", targetThreshold: "< 50ms", status: "Optimal", category: "API Response" },
  { metric: "AI Response Synthesis Latency", measuredValue: "140ms", targetThreshold: "< 500ms", status: "Optimal", category: "AI Performance" },
  { metric: "Database Query Latency (Prisma)", measuredValue: "12ms", targetThreshold: "< 50ms", status: "Optimal", category: "API Response" },
  { metric: "Static Page Build Duration", measuredValue: "14.3s (76 routes)", targetThreshold: "< 60s", status: "Optimal", category: "Build & Bundle" },
  { metric: "First Load JS Bundle Size", measuredValue: "128 KB", targetThreshold: "< 250 KB", status: "Optimal", category: "Build & Bundle" },
];

export class BenchmarkService {
  public static getBenchmarks(): SystemBenchmark[] {
    return [...mockBenchmarks];
  }
}
