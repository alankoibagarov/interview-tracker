import { useEffect, useId, useMemo, useRef } from "react";
import type Quill from "quill";
import "quill/dist/quill.snow.css";
import styles from "./WysiwygEditor.module.css";

type QuillModules = Record<string, unknown>;

export interface WysiwygEditorProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string | null;
  readOnly?: boolean;
  className?: string;
  fullWidth?: boolean;
  minHeight?: number;
  modules?: QuillModules;
}

const EMPTY_QUILL_VALUE = "<p><br></p>";

const defaultToolbar = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ color: [] }, { background: [] }],
  ["link", "blockquote", "code-block"],
  ["clean"],
];

const WysiwygEditor = ({
  label,
  value = "",
  onChange,
  placeholder,
  helperText,
  error = null,
  readOnly = false,
  className = "",
  fullWidth = true,
  minHeight = 300,
  modules,
}: WysiwygEditorProps) => {
  const quillContainerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);
  const labelId = useId();
  const latestOnChange = useRef(onChange);
  const latestValue = useRef(value);
  const initialValueRef = useRef(value);

  const resolvedModules = useMemo<QuillModules>(
    () => modules ?? { toolbar: defaultToolbar },
    [modules]
  );

  useEffect(() => {
    latestOnChange.current = onChange;
  }, [onChange]);

  useEffect(() => {
    latestValue.current = value;
  }, [value]);

  // Mount Quill
  useEffect(() => {
    let isMounted = true;
    const initQuill = async () => {
      if (!quillContainerRef.current || quillInstanceRef.current || !isMounted) {
        return;
      }

      const { default: QuillConstructor } = await import("quill");

      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.querySelectorAll(".ql-toolbar").forEach((toolbar) => {
          toolbar.remove();
        });
      }

      const quill = new QuillConstructor(quillContainerRef.current, {
        theme: "snow",
        readOnly,
        placeholder,
        modules: resolvedModules,
      });

      const handleTextChange = () => {
        const html = quill.root.innerHTML;
        const nextValue = html === EMPTY_QUILL_VALUE ? "" : html;
        if (nextValue !== latestValue.current) {
          latestOnChange.current?.(nextValue);
        }
      };

      quill.on("text-change", handleTextChange);

      quillInstanceRef.current = quill;

      if (initialValueRef.current) {
        quill.clipboard.dangerouslyPasteHTML(initialValueRef.current, "silent");
      } else {
        quill.setText("");
      }
    };

    void initQuill();

    return () => {
      isMounted = false;
      const instance = quillInstanceRef.current;
      if (instance) {
        instance.off("text-change");
      }
      quillInstanceRef.current = null;
      if (quillContainerRef.current) {
        quillContainerRef.current.innerHTML = "";
        quillContainerRef.current.removeAttribute("class");
      }
      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.querySelectorAll(".ql-toolbar").forEach((toolbar) => {
          toolbar.remove();
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedModules]);

  // Keep value in sync if it changes externally
  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill) return;

    const current = quill.root.innerHTML;
    const normalizedCurrent = current === EMPTY_QUILL_VALUE ? "" : current;
    if (value !== undefined && value !== normalizedCurrent) {
      const range = quill.getSelection();
      quill.clipboard.dangerouslyPasteHTML(value || "", "silent");
      if (range) {
        quill.setSelection(range);
      }
    }
  }, [value]);

  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill) return;
    quill.root.style.minHeight = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill) return;
    quill.enable(!readOnly);
  }, [readOnly]);

  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill) return;
    if (placeholder) {
      quill.root.setAttribute("data-placeholder", placeholder);
    } else {
      quill.root.removeAttribute("data-placeholder");
    }
  }, [placeholder]);

  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} ${className}`}>
      {label && (
        <label
          id={labelId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div
        ref={wrapperRef}
        style={{ minHeight }}
        className={`${styles.wrapper} rounded-lg border bg-white text-sm ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <div
          ref={quillContainerRef}
          aria-labelledby={label ? labelId : undefined}
        />
      </div>

      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default WysiwygEditor;

