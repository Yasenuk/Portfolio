import { cn } from '@portfolio/shared-utils';
import * as React from 'react';

const wrapperClass = cn(`
  relative w-full h-[3.125rem] flex items-center max-w-[28.625rem] rounded-[0.75rem] border border-primary
  transition-all duration-300 overflow-hidden bg-primary
  after:absolute after:w-14 after:h-8 after:bg-dark
  after:rounded-[0.688rem]
  after:right-[0.375rem] after:top-1/2 after:-translate-y-1/2
  after:transition-all after:duration-300
  hover:after:w-full hover:after:right-0 hover:after:h-full
  hover:after:rounded-[0.75rem]
`);

const inputClass = cn(`
  relative z-10 w-full text-sm text-dark bg-transparent
  p-2.5 pl-4 outline-none
  transition-colors duration-300
  hover:text-primary
`);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputMain = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={wrapperClass}>
        <input
          ref={ref}
          type="text"
          className={cn(inputClass, className)}
          {...props}
        />
      </div>
    );
  }
);
InputMain.displayName = 'InputMain';

export { InputMain };