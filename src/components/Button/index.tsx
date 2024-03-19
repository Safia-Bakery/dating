import cl from "classnames";
import styles from "./index.module.scss";
import { ReactNode } from "react";

type Props = {
  green?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};

const Button = ({ green, children, className = "", ...others }: Props) => {
  return (
    <button
      className={`${className} ${cl(styles.btn, { [styles.green]: green })}`}
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
