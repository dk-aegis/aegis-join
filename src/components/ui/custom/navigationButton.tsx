import { Button } from "@/components/ui/button"

export default function NavigationButtons({
  prev,
  next,
  isValid,
}: {
  prev: () => void
  next: () => void
  isValid?: boolean
}) {
  return (
    <div className="p- fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-md justify-between px-4 py-4">
        <Button onClick={prev}>이전</Button>
        <Button onClick={next} disabled={!isValid} variant={isValid ? "default" : "secondary" }>다음</Button>
      </div>
    </div>
  )
}
