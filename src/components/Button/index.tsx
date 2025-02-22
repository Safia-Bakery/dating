import cl from "classnames";
import styles from "./index.module.scss";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};

const Button = ({ children, className = "", ...others }: Props) => {
  return (
    <button className={`${className} ${cl(styles.btn)}`} {...others}>
      {children}
    </button>
  );
};

export default Button;
