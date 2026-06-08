import { cn } from '@portfolio/shared-utils';
import { Button } from "@portfolio/shared-ui";

const buttonClass = cn(
	'text-sm text-dark rounded-[0.875rem] border-primary',
	'p-2.5 pl-10 relative transition-all duration-300',
	'after:absolute after:w-8 after:h-8 after:bg-dark after:rounded-[0.875rem]',
	'after:left-1 after:top-1/2 after:-translate-y-1/2',
	'hover:text-primary hover:bg-dark hover:px-[1.625rem]',
	'hover:after:w-full hover:after:left-0 hover:after:h-full',
	'after:transition-all',
);

const ButtonMain = ({ className, children, ...props }: React.ComponentProps<typeof Button>) => {
  return (
    <Button className={cn(buttonClass, className)} {...props}>
      <span className="z-10">{children}</span>
    </Button>
  );
};

ButtonMain.displayName = "MainButton"

export { ButtonMain };