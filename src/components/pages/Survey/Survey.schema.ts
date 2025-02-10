import { InterestField } from "@/types/api/survey";
import { z } from "zod";

export function isETC(field: InterestField): boolean {
  return [
    InterestField.SECURITY_ETC,
    InterestField.WEB_ETC,
    InterestField.GAME_ETC,
    InterestField.ETC,
  ].includes(field);
}

export const surveySchema = z
  .object({
    interestFields: z
      .array(z.nativeEnum(InterestField), {
        invalid_type_error: "올바르지 않은 형식입니다.",
      })
      .nonempty("적어도 하나의 분야를 선택해주세요!"),

    interestEtc: z.record(z.nativeEnum(InterestField), z.string().optional()),

    joinReason: z
      .string()
      .min(1, "가입 이유를 작성해주세요!")
      .max(511, "511자를 초과할 수 없습니다!"),
    feedBack: z.string().max(511, "511자를 초과할 수 없습니다!").optional(),
  })
  .superRefine((data, ctx) => {
    for (const field of data.interestFields) {
      if (isETC(field)) {
        const etcValue = data.interestEtc[field]?.trim() ?? "";
        if (etcValue === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["interestEtc", field],
            message: "기타 분야를 작성해주세요",
          });
        }
      }
    }
  });

export type SurveyFormValues = z.infer<typeof surveySchema>;
