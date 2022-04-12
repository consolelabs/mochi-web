import s from "./heading.module.css";

interface Props {
  children: React.ReactNode;
}

export const SidewayHeading = (props: Props) => (
  <h2 className={s.sideway}>{props.children}</h2>
);
