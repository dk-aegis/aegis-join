
import type { Coupon } from "./Coupon.Types"
import { useEffect, useState } from "react";
import NavigationButtons from "../../ui/custom/navigationButton";
import { fetchCoupon, submitCoupon } from "./Coupon.Api";
import { CouponList } from "./Coupon.CouponList";
import { TotalAmount } from "./Coupon.TotalAmount";

export default function Coupon({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);  

  useEffect(() => {
    fetchCoupon()
      .then((data) => {
        setCoupons(data);
      })
      .catch((error) => {
        console.log("please error", error);
      });
  }, [])

  const onSubmit = () => {
    submitCoupon(selectedCoupons);
    onNext();
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">쿠폰을 선택해주세요 !</h3>
      <CouponList 
        coupons={coupons}
        selectedCoupons={selectedCoupons}
        setSelectedCoupons={setSelectedCoupons}
      />
      <TotalAmount
        coupons={coupons}
        selectedCoupons={selectedCoupons}
      />
      <NavigationButtons prev={onPrev} next={onSubmit} isValid={true} />
    </div>
  );
}
