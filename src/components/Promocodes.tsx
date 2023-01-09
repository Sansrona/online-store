import React, {useEffect, useState} from "react";
import {PromocodeType} from "../api/types";

type PromocodesTypes = {
  setDiscount: (promo: PromocodeType) => void;
  dropDiscount: (promoName: string) => void;
  discountList: PromocodeType[];
};

const promocodes: PromocodeType[] = [
  {name: "rs", value: 10, title: "Rolling Scopes School"},
  {name: "epam", value: 10, title: "EPAM systems"},
  {name: "new-year", value: 20, title: "Happy New Year!"},
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
    <div className="pb-8 flex flex-col items-center">
      {discountList.length > 0 &&
        discountList.map((discount) => {
          return (
            <div className="flex items-center gap-3 py-2 px-4 rounded-xl border border-slate-300 mt-4 mb-4"
                 key={discount.name}>
              <p>
                {discount?.title} - {discount?.value}%
              </p>
              <button
                className="px-2 py-1 rounded bg-red-300 hover:bg-red-400 transition-colors text-sm uppercase font-medium"
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
        placeholder="Enter promocode"
        className="border p-1 px-3 rounded-lg"
      />

      {isActive && (
        <div className="flex items-center gap-3 py-2 px-4 rounded-xl border border-slate-300 mt-4 mb-4">
          <p>
            {promo?.title} - {promo?.value}%
          </p>
          {promo && !discountList.map((x) => x.name).includes(promo.name) && (
            <button
              className="px-2 py-1.5 rounded bg-green-200 hover:bg-green-300 transition-colors text-sm uppercase font-medium"
              onClick={onPromoAdd}>Add
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Promocodes;
