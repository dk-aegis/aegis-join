import { Button } from "@/components/ui/button";

function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-[400px] space-y-6 p-4">
        <div className="flex flex-col space-y-2 text-center">
          <img
            src="/aegis-logo.png"
            alt="Aegis Logo"
            className="mx-auto mb-4 h-32 w-32"
          />
          <h1 className="font-semibold text-2xl tracking-tight">
            Aegis 회원 가입
          </h1>
          <p className="text-muted-foreground text-sm">
            단국대학교 구글 계정으로 로그인해주세요
          </p>
        </div>
        <Button className="w-full" asChild>
          <a
            href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`}
          >
            Google로 로그인
          </a>
        </Button>
        <Button className="w-full" asChild>
          <a href="https://sites.google.com/dankook.ac.kr/help">
            단국대 Gmail 생성 가이드
          </a>
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
