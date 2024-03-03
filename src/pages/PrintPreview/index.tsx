import Container from "@/components/Container";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";

const PrintPreview = () => {
  const { t } = useTranslation();
  const { checkid } = useParams();

  const [count, $count] = useState(1);

  const handleIncrement = () => $count((prev) => prev + 1);
  const handleDecrement = () => count > 1 && $count((prev) => prev - 1);

  const renderLeft = useMemo(() => {
    return (
      <div className="bg-white px-4 py-3 rounded-[40px] pb-4 flex flex-col flex-[20]">
        <h2 className="text-center text-3xl mb-6">Банан</h2>

        <div className="flex justify-between items-center">
          <span className="text-xl">{t("date_from")}</span>
          <span className="text-3xl">22.02.2024 12:00</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl">{t("date_expire")}</span>
          <span className="text-3xl">27.02.2024 12:00</span>
        </div>

        <div className="flex gap-2 items-center w-full mt-5 justify-center ">
          <div className="w-16 h-16">
            <QRCode value="fu*k" size={60} />
          </div>
          <p className="text-[8px] max-w-[260px]">
            Хранить при температуре от +5°C до +25°C. Избегать прямого
            солнечного света. Соблюдать срок годности. Хранить в сухом месте.
            При необходимости, хранить в оригинальной упаковке.
          </p>
        </div>
      </div>
    );
  }, []);
  return (
    <>
      <Container className="bg-[#ECECEC] rounded-xl flex flex-1 max-h-[70vh] h-full min-h-[700px]">
        <div className="flex items-center justify-center gap-8 flex-1 max-h-[260px]">
          {renderLeft}
          <div className="py-10 px-8 flex flex-col justify-between bg-[#CCCCCC] rounded-[20px] items-center flex-1">
            <button
              className="text-[50px] cursor-pointer leading-10"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="text-[50px] ">{count}</span>
            <button
              className="text-[50px] cursor-pointer leading-10"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrintPreview;
