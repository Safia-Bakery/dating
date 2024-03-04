import cl from "classnames";
import styles from "./index.module.scss";

type Props = {
  green?: boolean;
  text: string;
  className: string;
};

const Button = ({ green, text, className = "", ...others }: Props) => {
  return (
    <button
      className={`${className} ${cl(styles.btn, { [styles.green]: green })}`}
      {...others}
    >
      {text}
    </button>
  );
};

export default Button;
