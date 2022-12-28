import React, { useEffect, useState } from "react";
import { PromocodeType } from "../api/types";

type PromocodesTypes = {
  setDiscount: (promo: PromocodeType) => void;
  dropDiscount: (promoName: string) => void;
  discountList: PromocodeType[];
};

const promocodes: PromocodeType[] = [
  { name: "rs", value: 10, title: "Rolling Scopes School" },
  { name: "epam", value: 10, title: "EPAM systems" },
  { name: "new-year", value: 20, title: "Happy New Year!" },
];

const Promocodes: React.FC<PromocodesTypes> = ({
  setDiscount,
  dropDiscount,
  discountList,
}) => {
  const [promoText, setPromoText] = useState("");
  const [promo, setPromo] = useState<PromocodeType | null>();
  const [isActive, setIsActive] = useState(false);
  const onPromoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoText(e.target.value);
  };

  const onPromoAdd = () => {
    if (promo) {
      setDiscount(promo);
      setPromoText("");
      setIsActive(false);
      setPromo(null);
    }
  };

  const onPromoDrop = (promoName: string) => {
    dropDiscount(promoName);
  };

  useEffect(() => {
    const item = promocodes.find((obj) => obj.name === promoText);

    if (item) {
      setPromo(item);
      setIsActive(true);
    }
  }, [promoText]);

  return (
    <div>
      {discountList.length > 0 &&
        discountList.map((discount) => {
          return (
            <div key={discount.name}>
              <p>
                {discount?.title} - {discount?.value}%
              </p>
              <button
                onClick={() => {
                  onPromoDrop(discount.name);
                }}
              >
                Drop
              </button>
            </div>
          );
        })}
      <input
        type="text"
        onChange={onPromoInput}
        value={promoText}
        name="promocode"
        id="promocode"
        placeholder="promocode"
      />

      {isActive && (
        <div>
          <p>
            {promo?.title} - {promo?.value}%
          </p>
          {promo && !discountList.map((x) => x.name).includes(promo.name) && (
            <button onClick={onPromoAdd}>Add</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Promocodes;
