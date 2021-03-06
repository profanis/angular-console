import { Sink } from '../sink';
import { TelemetryType } from '../record';

export interface LogWriter {
  log(...messages: any[]): void;
}

export function header(type: string): string {
  return `[Telemetry ${type}]`;
}

export class LoggerSink implements Sink {
  constructor(private readonly writer: LogWriter = console) {}

  record(type: TelemetryType, data: any) {
    this.writer.log(header(type), data);
  }
}
