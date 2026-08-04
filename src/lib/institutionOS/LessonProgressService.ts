/**
 * LessonProgressService.ts
 * InstitutionOS Academic Delivery Engine — Timestamped Notes, Bookmarks & Progress Tracking
 */

export interface TimestampedNote {
  id: string;
  lessonId: string;
  timestampSeconds: number;
  timestampFormatted: string;
  noteText: string;
  createdAt: string;
}

export interface LessonBookmark {
  lessonId: string;
  title: string;
  timestampSeconds: number;
}

export class LessonProgressService {
  private static notes: TimestampedNote[] = [
    { id: "NOTE-1", lessonId: "mod-501", timestampSeconds: 145, timestampFormatted: "02:25", noteText: "Server components run exclusively on the Node server environment — no window/document DOM access.", createdAt: "Aug 04, 2026" },
    { id: "NOTE-2", lessonId: "mod-501", timestampSeconds: 520, timestampFormatted: "08:40", noteText: "Always pass serializable props across Server -> Client component boundaries.", createdAt: "Aug 04, 2026" },
  ];

  private static bookmarks: LessonBookmark[] = [
    { lessonId: "mod-501", title: "RSC vs Client Boundaries Breakdown", timestampSeconds: 320 },
  ];

  private static completedLessons: Set<string> = new Set(["mod-501"]);

  public static getNotesForLesson(lessonId: string): TimestampedNote[] {
    return this.notes.filter((n) => n.lessonId === lessonId);
  }

  public static addNote(lessonId: string, timestampSeconds: number, noteText: string): TimestampedNote {
    const minutes = Math.floor(timestampSeconds / 60);
    const seconds = Math.floor(timestampSeconds % 60);
    const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const note: TimestampedNote = {
      id: `NOTE-${Date.now()}`,
      lessonId,
      timestampSeconds,
      timestampFormatted: formatted,
      noteText,
      createdAt: new Date().toLocaleDateString(),
    };
    this.notes.unshift(note);
    return note;
  }

  public static isLessonCompleted(lessonId: string): boolean {
    return this.completedLessons.has(lessonId);
  }

  public static toggleLessonComplete(lessonId: string): boolean {
    if (this.completedLessons.has(lessonId)) {
      this.completedLessons.delete(lessonId);
      return false;
    } else {
      this.completedLessons.add(lessonId);
      return true;
    }
  }
}
