import { InterviewEntity, UpdateInterviewDto } from '../interview.entity';

export interface FieldChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  displayName: string;
}

export interface ChangeTrackingResult {
  hasChanges: boolean;
  changes: FieldChange[];
  message: string;
}

/**
 * Field display name mappings
 */
const FIELD_DISPLAY_NAMES: Record<string, string> = {
  status: 'Status',
  type: 'Interview Type',
  company: 'Company',
  position: 'Position',
  date: 'Date & Time',
  interviewer: 'Interviewer',
  location: 'Location',
  callLink: 'Call Link',
  notes: 'Notes',
  feedback: 'Feedback',
  rating: 'Rating',
  followUpDate: 'Follow-up Date',
};

/**
 * Compares old and new interview data to detect field changes
 */
export function detectInterviewChanges(
  oldInterview: InterviewEntity,
  updateDto: UpdateInterviewDto,
): ChangeTrackingResult {
  const changes: FieldChange[] = [];

  // Check each field in the update DTO
  for (const [field, newValue] of Object.entries(updateDto)) {
    const oldValue = oldInterview[field];

    // Skip if value hasn't changed
    if (oldValue === newValue) continue;

    // Handle null/undefined comparisons
    if (oldValue == null && newValue == null) continue;

    // Handle empty string vs null/undefined
    if (
      (oldValue === '' || oldValue == null) &&
      (newValue === '' || newValue == null)
    ) {
      continue;
    }

    changes.push({
      field,
      oldValue,
      newValue,
      displayName: FIELD_DISPLAY_NAMES[field] || field,
    });
  }

  const message = generateChangeMessage(changes);

  return {
    hasChanges: changes.length > 0,
    changes,
    message,
  };
}

/**
 * Generates a human-readable message from changes
 */
function generateChangeMessage(changes: FieldChange[]): string {
  if (changes.length === 0) return 'No changes detected';

  if (changes.length === 1) {
    const change = changes[0];
    return `Updated ${change.displayName}`;
  }

  if (changes.length === 2) {
    return `Updated ${changes[0].displayName} and ${changes[1].displayName}`;
  }

  // More than 2 changes
  const fields = changes
    .map((c) => c.displayName)
    .slice(0, 2)
    .join(', ');
  const remaining = changes.length - 2;
  return `Updated ${fields}, and ${remaining} more field${remaining > 1 ? 's' : ''}`;
}

/**
 * Formats field values for display
 */
export function formatFieldValue(value: unknown): string {
  if (value == null) return 'Not set';
  if (value === '') return 'Not set';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'string') {
    // Truncate long strings
    return value.length > 50 ? value.substring(0, 47) + '...' : value;
  }
  return String(value);
}
