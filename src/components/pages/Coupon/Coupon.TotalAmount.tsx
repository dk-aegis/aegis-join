import { Coupon, TotalAmountProps } from "./Coupon.Types";

const totalAmount = (coupons: Coupon[], selectedCoupons: string[]) => 
    coupons.reduce((sum, coupon) => {
    if(selectedCoupons.includes(coupon.id)) {
        return sum + coupon.amount;
    }
    return sum;
}, 0);


export const TotalAmount = ({coupons, selectedCoupons}: TotalAmountProps) => {
    const total = totalAmount(coupons, selectedCoupons);
    if (selectedCoupons.length > 0) {
        return (
        <div className="mt-4 p-4 text-center">
        <p className="text-lg font-semibold">선택된 쿠폰 금액: {total.toLocaleString()}원</p>
        </div>
        )   
    }
    else {
        return null
    }
}