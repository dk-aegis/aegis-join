import NavigationButtons from "../../ui/custom/navigationButton";
import { EverytimeSchema, type EverytimeValues } from "./Everytime.Schema";
import { LoadingState } from "@/types/state/loading";
import EverytimeItems from "./Everytime.FieldGroup";
import { useState, useCallback } from "react";
import { ZodError } from "zod";

interface EverytimeProps {
  onNext: (data: EverytimeValues) => Promise<void>;
  onPrev: () => void;
}

function Everytime({ onNext, onPrev }: EverytimeProps) {
  // 폼의 값들을 관리하는 state
  const [everytimeValues, setEverytimeValues] = useState<EverytimeValues>({
    timetableLink: "",
    loading: LoadingState.IDLE,
  });

  // 에러 관리
  const [error, setError] = useState<{ timetableLink?: { message?: string } }>({});

  // 로딩 상태 관리
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  // 입력 값 변경 시 호출되는 콜백
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEverytimeValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // 폼 유효성 검사 함수
  const validate = useCallback((data: EverytimeValues) => {
    try {
      EverytimeSchema.parse(data); // Zod 스키마를 사용하여 데이터 검증
      setError({}); // 기존 에러 초기화
      return true; // 유효성 검사 통과
    } catch (error) {
      // 유효성 검사 실패 시 에러 처리
      if (error instanceof ZodError) {
        const newError: { timetableLink?: { message?: string } } = {};
        for (const err of error.errors) {
          if (err.path[0] === "timetableLink") {
            newError.timetableLink = { message: err.message };
          }
        }
        setError(newError);
      }
      return false; // 유효성 검사 실패
    }
  }, []);

  // 폼 제출 함수 (콜백으로 메모이제이션)
  const handleSubmit = useCallback(async () => {
    if (!validate(everytimeValues)) {
      // 유효성 검사 실패 시 제출 중단
      setLoading(LoadingState.IDLE); // 로딩 상태 초기화
      return;
    }
    setLoading(LoadingState.LOADING); // 로딩 상태 시작
    console.log("제출된 링크:", everytimeValues.timetableLink);

    // 예시: 3초 후에 로딩 상태를 SUCCESS로 변경
    await new Promise((resolve) => setTimeout(resolve, 3000)); // await 추가
    setLoading(LoadingState.SUCCESS); // 로딩 상태 성공으로 변경
  }, [everytimeValues, validate]);

  // 다음 단계로 이동하는 함수
  const handleNext = useCallback(async () => {
    if (loading === LoadingState.SUCCESS) {
      await onNext(everytimeValues); // 다음 단계로 이동
    }
  }, [everytimeValues, onNext, loading]);

  return (
    <div className="mb-12 space-y-4">
      <EverytimeItems
        everytimeValues={everytimeValues}
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      <NavigationButtons
        prev={onPrev}
        next={handleNext}
        isValid={Object.keys(error).length === 0 && loading === LoadingState.SUCCESS}
      />
    </div>
  );
}

export default Everytime;
