import { JP_NAME } from "~constants";
import s from "./text.module.css";

export const MochiText = () => (
  <div className="relative flex flex-col max-w-5xl px-12 py-16 mx-auto -space-y-16 pointer-events-none select-none">
    <div className={[s.text, s.outline, "opacity-5"].join(" ")}>{JP_NAME}</div>
    <div className={[s.text, s.outline, "opacity-10"].join(" ")}>{JP_NAME}</div>
    <div className={[s.text, s.outline, "opacity-20"].join(" ")}>{JP_NAME}</div>
    <div className={[s.text, s.outline, "opacity-30"].join(" ")}>{JP_NAME}</div>
    <div className={s.text}>{JP_NAME}</div>
  </div>
);
