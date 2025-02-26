import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AlertBox from "@/components/ui/custom/alertbox";
import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { Label } from "@/components/ui/label";
import type { GetPaymentInfo } from "@/types/api/payment";
import { CheckCircleIcon, CircleAlert, Copy, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPersonalInfoData } from "../PersonalInfo/PersonalInfo.Api";
import { startPaymentPolling } from "./Payment.Api";
import HowtoDo from "./Payment.HowtoDo";

const ADMIN_INFO = {
  phoneNumber:
    import.meta.env.VITE_ADMIN_PHONE ?? "환경변수가 설정되지 않았습니다.",
  kakaoId:
    import.meta.env.VITE_ADMIN_KAKAO ?? "환경변수가 설정되지 않았습니다.",
  accountNumber:
    import.meta.env.VITE_ADMIN_ACCOUNT_NUMBER ??
    "환경변수가 설정되지 않았습니다.",
};

function Payment({
  onNext,
  onPrev,
}: { onNext: () => void; onPrev: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [senderName, setSenderName] = useState("로딩 중...");
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [payInfo, setPayInfo] = useState<GetPaymentInfo | null>(null);

  const { copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPersonalInfoData();
        const lastSixStudentId = data.studentId.slice(-6);
        setSenderName(`${data.name}${lastSixStudentId}`);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const cleanupPolling = startPaymentPolling(
      setIsValid,
      setPayInfo,
      setRemainingAmount
    );

    return () => {
      cleanupPolling();
    };
  }, []);

  useEffect(() => {
    if (payInfo) {
      setRemainingAmount(
        payInfo.expectedDepositAmount - payInfo.currentDepositAmount
      );
    }
  }, [payInfo]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">회비 납부</h3>
      <Label className="text-base">입금 안내</Label>
      <Alert>
        <AlertDescription className="space-y-2 text-sm sm:text-base">
          <div className="flex items-center">
            <span className="trunum w-20 font-medi">계좌번호:</span>
            <span className="mr-1 pr-0">{ADMIN_INFO.accountNumber}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 flex-shrink-0 p-0"
              onClick={() => copyToClipboard(ADMIN_INFO.accountNumber)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="w-20 font-medium">입금자명:</span>
            <span className="mr-1 pr-0">{senderName}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 flex-shrink-0 p-0"
              onClick={() => copyToClipboard(senderName)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="w-20 font-medium">입금할 금액:</span>
            <span>
              {isLoading
                ? "로딩 중..."
                : payInfo
                  ? `${remainingAmount.toLocaleString()}원`
                  : "정보를 불러오는 중..."}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-20 font-medium">예금주명:</span>
            <span>윤성민</span>
          </div>
        </AlertDescription>
      </Alert>

      {isValid === false && payInfo && payInfo.currentDepositAmount > 0 && (
        <AlertBox
          icon={<CircleAlert className="h-4 w-4" />}
          title="회비 추가 납부 안내"
          description={[
            "아직 회비가 완납되지 않았습니다.",
            `남은 금액 ${remainingAmount.toLocaleString()}원을 납부해주세요.`,
          ]}
        />
      )}

      {payInfo && payInfo.status === "OVERPAID" && (
        <AlertBox
          icon={<CircleAlert className="h-4 w-4" />}
          title="회비 초과 납부 안내"
          description={[
            "초과 납부가 발생한 경우에도 회원가입은 정상적으로 처리됩니다. 환불이 필요하시면 운영진에게 문의해 주세요.",
            `연락처: ${ADMIN_INFO.phoneNumber}`,
            `카카오톡 ID: ${ADMIN_INFO.kakaoId}`,
          ]}
        />
      )}

      <div className="flex items-center justify-center py-4">
        {isValid ? (
          <>
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
            <p className="pl-4 text-green-400">동아리 가입이 완료되었습니다!</p>
          </>
        ) : (
          <>
            <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
            <p className="pl-4">회비를 납부해주세요.</p>
          </>
        )}
      </div>
      <h4 className="pt-8 font-semibold text-lg">납부 방법</h4>
      <HowtoDo />
      <NavigationButtons
        prev={onPrev}
        next={onNext}
        showNext={true}
        showPrev={isValid}
      />
    </div>
  );
}

export default Payment;
