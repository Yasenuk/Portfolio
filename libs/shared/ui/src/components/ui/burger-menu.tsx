import * as React from "react";
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@portfolio/shared-utils';

import { Button } from "./button";

const contentVariants = cva(
  'fixed md:static top-0 z-40 flex h-full flex-col md:flex-row transition-transform duration-300 ease-in-out',
  {
    variants: {
      size: {
        full: 'w-full',
        half: 'w-1/2 max-sm:w-full',
        custom: '',
      },
      side: {
        left: 'left-0',
        right: 'right-0',
      }
    },
    defaultVariants: {
      size: 'full',
      side: 'right'
    },
  }
);

const triggerVariants = cva(
  'relative z-50 flex h-10 w-10 flex-col items-center justify-center',
  {
    variants: {
      t_variant: {
        default: 'gap-1.5 rounded-md p-2',
        custom: ''
      }
    },
    defaultVariants: {
      t_variant: 'default'
    }
  }
);

type BurgerMenuProps = VariantProps<typeof contentVariants>;
type BurgerMenuTriggerProps = VariantProps<typeof triggerVariants> & {
  iconClassName?: string;
};

type BurgerMenuContextProps = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
} & BurgerMenuProps;

const BurgerMenuContext = React.createContext<BurgerMenuContextProps | null>(null);

const useBurgerMenu = () => {
  const context = React.useContext(BurgerMenuContext);

  if (!context) {
    throw new Error('useBurgerMenu must be used within a <BurgerMenu.Root>');
  }

  return context;
}

const BurgerMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & BurgerMenuProps>((
  { children, size, side, className, ...props },
  ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const burgerMenuRef = React.useRef<HTMLDivElement | null>(null);

  const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [close])

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <BurgerMenuContext.Provider value={{ isOpen, toggle, close, size, side }}>
      <div
        ref={(node) => {
          burgerMenuRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(className)}
        {...props}>
        {children}
      </div>
    </BurgerMenuContext.Provider>
  );
});

BurgerMenu.displayName = 'BurgerMenu';

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> &
  BurgerMenuTriggerProps
>(({ className, iconClassName, t_variant, variant = "ghost", size = "icon", ...props }, ref) => {
  const { isOpen, toggle } = useBurgerMenu();

  const lineClass = cn('block h-0.5 w-5 transition-all duration-300 bg-foreground', iconClassName)

  return (
    <Button
      onClick={toggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="burger-nav"
      variant={variant}
      size={size}
      className={cn(
        'md:hidden',
        triggerVariants({ t_variant }),
        className
      )}
      {...props}
    >
      <span className={cn(lineClass, isOpen && 'translate-y-2 rotate-45')} />
      <span className={cn(lineClass, isOpen && 'opacity-0 scale-x-0')} />
      <span className={cn(lineClass, isOpen && '-translate-y-2 -rotate-45')} />
    </Button>
  )
});

Trigger.displayName = 'BurgerMenuTrigger';

const Backdrop = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { isOpen, close } = useBurgerMenu()

  return (
    <div
      onClick={close}
      aria-hidden={true}
      className={cn(
        'fixed inset-0 z-30 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'md:hidden',
        className
      )}
      {...props}
    />
  )
}

Backdrop.displayName = 'BurgerMenuBackdrop';

const BurgerMenuBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { isOpen, side, size } = useBurgerMenu();

  const translateClass = isOpen
    ? 'translate-x-0'
    : side === 'left' ? '-translate-x-full' : 'translate-x-full'

  return (
    <div
      ref={ref}
      className={cn(
        contentVariants({ size, side }),
        'md:translate-x-0',
        translateClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
});

BurgerMenuBody.displayName = 'BurgerMenuBody';

export { BurgerMenu, Trigger, Backdrop, BurgerMenuBody };