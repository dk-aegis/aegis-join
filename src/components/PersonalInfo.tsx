import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";

function phoneNumberCheck(number: string): boolean {
  const result = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  return result.test(number);
}

function PersonalInfo({
  onValidate,
  showErrors,
}: {
  onValidate: (isValid: boolean) => void;
  showErrors: boolean;
}) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<string>("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [academicStatus, setAcademicStatus] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [academicSemester, setAcademicSemester] = useState("");

  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

  const validateForm = useCallback(() => {
    const isGenderValid = gender === "male" || gender === "female";
    const isPhoneNumberValid = phoneNumberCheck(phoneNumber);
    const isValid: boolean =
      !!name &&
      !!birthDate &&
      isGenderValid &&
      !!studentId &&
      !!phoneNumber &&
      isPhoneNumberValid &&
      !!department &&
      !!academicStatus &&
      !!academicYear &&
      !!academicSemester;

    onValidate(isValid);
    return {
      name: !name,
      birthDate: !birthDate,
      gender: !isGenderValid,
      studentId: !studentId,
      phoneNumber: !phoneNumber || !isPhoneNumberValid,
      department: !department,
      academicStatus: !academicStatus,
      academicYear: !academicYear,
      academicSemester: !academicSemester,
    };
  }, [
    name,
    birthDate,
    gender,
    studentId,
    phoneNumber,
    department,
    academicStatus,
    academicYear,
    academicSemester,
    onValidate,
  ]);

  const [errors, setErrors] = useState(validateForm());

  useEffect(() => {
    if (showErrors) {
      setErrors(validateForm());
    }
  }, [showErrors, validateForm]);

  useEffect(() => {
    if (phoneNumber) {
      const isValidPhoneNumber = phoneNumberCheck(phoneNumber);
      if (!isValidPhoneNumber) {
        setPhoneNumberError("양식에 맞게 입력해주세요. ex) 010-1234-5678");
      } else {
        setPhoneNumberError(null);
      }
    }
  }, [phoneNumber]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">기본 인적사항</h3>

      {/* 이름 필드 */}
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          className={errors.name && showErrors ? "border-red-500" : ""}
        />
        {errors.name && showErrors && (
          <p className="text-red-500 text-xs">이름을 입력해주세요</p>
        )}
      </div>

      {/* 생년월일 필드 */}
      <div className="space-y-2">
        <Label htmlFor="birthDate">생년월일</Label>
        <Input
          id="birthDate"
          value={birthDate}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
            setBirthDate(rawValue);
          }}
          placeholder="020101"
          className={errors.birthDate && showErrors ? "border-red-500" : ""}
        />
        {errors.birthDate && showErrors && (
          <p className="text-red-500 text-xs">생년월일을 입력해주세요</p>
        )}
      </div>

      {/* 성별 라디오 버튼 */}
      <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup value={gender} onValueChange={setGender}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">남자</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">여자</Label>
          </div>
        </RadioGroup>
        {errors.gender && showErrors && (
          <p className="text-red-500 text-xs">성별을 선택해주세요</p>
        )}
      </div>

      {/* 학번 필드 */}
      <div className="space-y-2">
        <Label htmlFor="studentId">학번</Label>
        <Input
          id="studentId"
          value={studentId}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
            setStudentId(rawValue);
          }}
          placeholder="32000000"
          className={errors.studentId && showErrors ? "border-red-500" : ""}
        />
        {errors.studentId && showErrors && (
          <p className="text-red-500 text-xs">학번을 입력해주세요</p>
        )}
      </div>

      {/* 전화번호 필드 */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">전화번호</Label>
        <Input
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            // 숫자만 남기기
            const rawValue = e.target.value.replace(/[^0-9]/g, "");

            // 형식 적용
            if (rawValue.length <= 3) {
              setPhoneNumber(rawValue);
            } else if (rawValue.length <= 7) {
              setPhoneNumber(`${rawValue.slice(0, 3)}-${rawValue.slice(3)}`);
            } else {
              setPhoneNumber(
                `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`
              );
            }
          }}
          placeholder="010-1234-5678"
          className={errors.phoneNumber && showErrors ? "border-red-500" : ""}
        />
        {phoneNumberError && showErrors && (
          <p className="text-red-500 text-xs">{phoneNumberError}</p>
        )}
        {errors.phoneNumber && showErrors && !phoneNumberError && (
          <p className="text-red-500 text-xs">전화번호를 입력해주세요</p>
        )}
      </div>

      {/* 소속 선택 */}
      <div className="space-y-2">
        <Label htmlFor="department">소속</Label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="학과 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="software">SW융합대학 소프트웨어학과</SelectItem>
            <SelectItem value="computer">SW융합대학 컴퓨터공학과</SelectItem>
            <SelectItem value="mobile">
              SW융합대학 모바일시스템공학과
            </SelectItem>
            <SelectItem value="security">SW융합대학 사이버보안학과</SelectItem>
            <SelectItem value="data">
              SW융합대학 통계데이터사이언스학과
            </SelectItem>
            <SelectItem value="sw">SW융합대학 SW융합학부</SelectItem>
          </SelectContent>
        </Select>
        {errors.department && showErrors && (
          <p className="text-red-500 text-xs">학과를 선택해주세요</p>
        )}
      </div>

      {/* 학적 상태 선택 */}
      <div className="space-y-2">
        <Label htmlFor="academicStatus">모집 학기 기준 학적</Label>
        <Select value={academicStatus} onValueChange={setAcademicStatus}>
          <SelectTrigger>
            <SelectValue placeholder="학적 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enrolled">재학</SelectItem>
            <SelectItem value="leave">휴학</SelectItem>
            <SelectItem value="graduated">졸업</SelectItem>
          </SelectContent>
        </Select>
        {errors.academicStatus && showErrors && (
          <p className="text-red-500 text-xs">학적을 선택해주세요</p>
        )}
      </div>

      {/* 학년 선택 */}
      <div className="space-y-2">
        <Label htmlFor="academicYear">모집 학기 기준 학년</Label>
        <Select value={academicYear} onValueChange={setAcademicYear}>
          <SelectTrigger>
            <SelectValue placeholder="학년 선택" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}학년
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.academicYear && showErrors && (
          <p className="text-red-500 text-xs">학년을 선택해주세요</p>
        )}
      </div>

      {/* 학기 선택 */}
      <div className="space-y-2">
        <Label htmlFor="academicSemester">모집 학기 기준 학기</Label>
        <Select value={academicSemester} onValueChange={setAcademicSemester}>
          <SelectTrigger>
            <SelectValue placeholder="학기 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1학기</SelectItem>
            <SelectItem value="2">2학기</SelectItem>
          </SelectContent>
        </Select>
        {errors.academicSemester && showErrors && (
          <p className="text-red-500 text-xs">학기를 선택해주세요</p>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;
