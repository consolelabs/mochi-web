import { JP_NAME } from "~constants";
import s from "./text.module.css";

export const MochiText = ({ className }: { className?: string }) => (
  <div
    className={[
      "relative flex flex-col -space-y-16 pointer-events-none select-none",
      className,
    ].join(" ")}
  >
    <div className={[s.text, s.outline, "opacity-5"].join(" ")}>{JP_NAME}</div>
    <div className={[s.text, s.outline, "opacity-10"].join(" ")}>{JP_NAME}</div>
    <div className={[s.text, s.outline, "opacity-20"].join(" ")}>{JP_NAME}</div>
    <div className={[s.text, s.outline, "opacity-30"].join(" ")}>{JP_NAME}</div>
    <div className={s.text}>{JP_NAME}</div>
  </div>
);
