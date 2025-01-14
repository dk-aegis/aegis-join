
export enum InterestField {
    // 보안 분야
    SECURITY_WEBHACKING = "SECURITY_WEBHACKING",
    SECURITY_SYSTEMHACKING = "SECURITY_SYSTEMHACKING",
    SECURITY_REVERSING = "SECURITY_REVERSING",
    SECURITY_FORENSIC = "SECURITY_FORENSIC",
    SECURITY_MALWARE = "SECURITY_MALWARE",
    SECURITY_CRYPTOGRAPHY = "SECURITY_CRYPTOGRAPHY",
    SECURITY_ETC = "SECURITY_ETC",
  
    // 웹 분야
    WEB_FRONTEND = "WEB_FRONTEND",
    WEB_BACKEND = "WEB_BACKEND",
    WEB_ETC = "WEB_ETC",
  
    // 게임 분야
    GAME_CLIENT = "GAME_CLIENT",
    GAME_SERVER = "GAME_SERVER",
    GAME_ETC = "GAME_ETC",
  
    // 기타 분야
    APP = "APP",
    DEVOPS = "DEVOPS",
    AI = "AI",
    NOT_SURE = "NOT_SURE",
    ETC = "ETC",
}


export interface SurveyForm {
    interestFields: InterestField[],
    interestEtc: Record<InterestField,string>,
    registrationReason: string,
    feedBack: string,
}
