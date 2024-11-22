import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function Nav({ className, items, ...props }: NavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start"
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}
