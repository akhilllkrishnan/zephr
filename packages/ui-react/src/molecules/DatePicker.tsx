"use client";
import { CSSProperties, useMemo, useState } from "react";
import { Button } from "../atoms/Button";

export type DatePickerMode = "single" | "range";

export interface DatePickerRangeValue {
  startDay: number | null;
  endDay: number | null;
}

export interface DatePickerValue {
  mode: DatePickerMode;
  singleDay: number | null;
  range: DatePickerRangeValue;
}

export interface DatePickerProps {
  mode?: DatePickerMode;
  showTimeFilters?: boolean;
  showFooter?: boolean;
  className?: string;
  style?: CSSProperties;
  onChange?: (nextValue: DatePickerValue) => void;
  onApply?: (nextValue: DatePickerValue) => void;
  onCancel?: () => void;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const TIME_FILTERS = ["Any time", "Morning", "Afternoon", "Evening"];
const RANGE_PRESETS = [
  "Today",
  "Yesterday",
  "Last 7 days",
  "Last 30 days",
  "This month",
  "Last month"
];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function shiftMonth(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function monthLabel(date: Date): string {
  return date.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function buildMonthCells(date: Date): Array<number | null> {
  const firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const cells: Array<number | null> = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= dayCount; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function isSameDay(day: number | null, target: number): boolean {
  return day !== null && day === target;
}

function inRange(day: number, range: DatePickerRangeValue): boolean {
  if (range.startDay === null || range.endDay === null) {
    return false;
  }
  const min = Math.min(range.startDay, range.endDay);
  const max = Math.max(range.startDay, range.endDay);
  return day > min && day < max;
}

export function DatePicker({
  mode = "single",
  showTimeFilters = false,
  showFooter = false,
  className,
  style,
  onChange,
  onApply,
  onCancel
}: DatePickerProps) {
  const [leftMonth, setLeftMonth] = useState<Date>(() => startOfMonth(new Date(2025, 9, 1)));
  const [singleDay, setSingleDay] = useState<number | null>(16);
  const [range, setRange] = useState<DatePickerRangeValue>({ startDay: 11, endDay: 16 });
  const [timeFilter, setTimeFilter] = useState<string>(TIME_FILTERS[0]);
  const [preset, setPreset] = useState<string>(RANGE_PRESETS[2]);

  const rightMonth = useMemo(() => shiftMonth(leftMonth, 1), [leftMonth]);
  const leftCells = useMemo(() => buildMonthCells(leftMonth), [leftMonth]);
  const rightCells = useMemo(() => buildMonthCells(rightMonth), [rightMonth]);

  function emitChange(nextSingleDay: number | null, nextRange: DatePickerRangeValue): void {
    onChange?.({
      mode,
      singleDay: nextSingleDay,
      range: nextRange
    });
  }

  function handleSingleSelect(day: number): void {
    setSingleDay(day);
    emitChange(day, range);
  }

  function handleRangeSelect(day: number): void {
    setRange((currentRange) => {
      let nextRange: DatePickerRangeValue;
      if (currentRange.startDay === null || currentRange.endDay !== null) {
        nextRange = { startDay: day, endDay: null };
      } else if (day < currentRange.startDay) {
        nextRange = { startDay: day, endDay: currentRange.startDay };
      } else {
        nextRange = { startDay: currentRange.startDay, endDay: day };
      }
      emitChange(singleDay, nextRange);
      return nextRange;
    });
  }

  function renderCalendar(
    currentMonth: Date,
    cells: Array<number | null>,
    options: { showPrev?: boolean; showNext?: boolean; onPrev?: () => void; onNext?: () => void }
  ) {
    return (
      <div
        style={{
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: "10px",
          padding: "10px",
          background: "var(--z-color-surface, #ffffff)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px"
          }}
        >
          <button
            type="button"
            onClick={options.onPrev}
            disabled={!options.showPrev}
            aria-label="Previous month"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              border: "1px solid var(--z-color-border, #ebebeb)",
              background: "var(--z-color-surface, #ffffff)",
              color: "var(--z-color-text, #171717)",
              cursor: options.showPrev ? "pointer" : "default",
              opacity: options.showPrev ? 1 : 0,
              visibility: options.showPrev ? "visible" : "hidden"
            }}
          >
            {"<"}
          </button>
          <strong style={{ fontSize: "14px", fontWeight: 500 }}>{monthLabel(currentMonth)}</strong>
          <button
            type="button"
            onClick={options.onNext}
            disabled={!options.showNext}
            aria-label="Next month"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              border: "1px solid var(--z-color-border, #ebebeb)",
              background: "var(--z-color-surface, #ffffff)",
              color: "var(--z-color-text, #171717)",
              cursor: options.showNext ? "pointer" : "default",
              opacity: options.showNext ? 1 : 0,
              visibility: options.showNext ? "visible" : "hidden"
            }}
          >
            {">"}
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            gap: "4px"
          }}
        >
          {WEEKDAY_LABELS.map((label) => (
            <span
              key={label}
              style={{
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                color: "var(--z-color-muted, #5c5c5c)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              {label}
            </span>
          ))}
          {cells.map((day, index) => {
            if (day === null) {
              return <span key={`empty-${currentMonth.toISOString()}-${index}`} style={{ height: "30px" }} />;
            }

            const isSingleActive = mode === "single" && isSameDay(singleDay, day);
            const isRangeStart = mode === "range" && isSameDay(range.startDay, day);
            const isRangeEnd = mode === "range" && isSameDay(range.endDay, day);
            const isMidRange = mode === "range" && inRange(day, range);
            const isActive = isSingleActive || isRangeStart || isRangeEnd;

            return (
              <button
                key={`${currentMonth.toISOString()}-${day}`}
                type="button"
                onClick={() => (mode === "single" ? handleSingleSelect(day) : handleRangeSelect(day))}
                aria-pressed={isActive}
                style={{
                  height: "30px",
                  borderRadius: "8px",
                  border: isActive ? "1px solid var(--z-color-primary, #121212)" : "1px solid transparent",
                  background: isActive
                    ? "var(--z-color-primary, #121212)"
                    : isMidRange
                      ? "color-mix(in srgb, var(--z-color-primary, #121212) 14%, transparent)"
                      : "transparent",
                  color: isActive
                    ? "var(--z-color-primaryContrast, #ffffff)"
                    : "var(--z-color-text, #171717)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background-color 120ms ease, color 120ms ease"
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const currentValue: DatePickerValue = {
    mode,
    singleDay,
    range
  };

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: mode === "range" ? "920px" : "520px",
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: "12px",
        background: "var(--z-color-surface, #ffffff)",
        padding: "12px",
        display: "grid",
        gap: "12px",
        ...style
      }}
    >
      {showTimeFilters ? (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {TIME_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTimeFilter(item)}
              style={{
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "999px",
                background:
                  timeFilter === item
                    ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))"
                    : "var(--z-color-surface, #ffffff)",
                color: "var(--z-color-text, #171717)",
                padding: "5px 10px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: mode === "range" ? "168px minmax(0, 1fr)" : "minmax(0, 1fr)",
          gap: "12px"
        }}
      >
        {mode === "range" ? (
          <div
            style={{
              border: "1px solid var(--z-color-border, #ebebeb)",
              borderRadius: "10px",
              padding: "8px",
              display: "grid",
              gap: "6px",
              alignContent: "start",
              background: "var(--z-color-surface, #ffffff)"
            }}
          >
            {RANGE_PRESETS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPreset(item)}
                style={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  background:
                    preset === item
                      ? "color-mix(in srgb, var(--z-color-primary, #121212) 12%, transparent)"
                      : "transparent",
                  color: "var(--z-color-text, #171717)",
                  textAlign: "left",
                  fontSize: "13px",
                  lineHeight: "18px",
                  padding: "6px 8px",
                  cursor: "pointer"
                }}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mode === "range" ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
            gap: "10px"
          }}
        >
          {renderCalendar(leftMonth, leftCells, {
            showPrev: true,
            showNext: mode === "single",
            onPrev: () => setLeftMonth((month) => shiftMonth(month, -1)),
            onNext: () => setLeftMonth((month) => shiftMonth(month, 1))
          })}
          {mode === "range"
            ? renderCalendar(rightMonth, rightCells, {
                showNext: true,
                onNext: () => setLeftMonth((month) => shiftMonth(month, 1))
              })
            : null}
        </div>
      </div>

      {showFooter ? (
        <div
          style={{
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px"
          }}
        >
          <Button size="sm" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => onApply?.(currentValue)}>
            Apply
          </Button>
        </div>
      ) : null}
    </div>
  );
}
