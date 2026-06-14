import * as React from 'react';
import { cn } from '@portfolio/shared-utils';

const tableRowClass = "[&>*:first-child]:border [&>*:first-child]:border-text [&>*:first-child]:text-center ";

const RankingList = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <table
    ref={ref}
    className={cn('w-full table-fixed border-separate border-spacing-y-5 text-left', className)}
    {...props}
	>
    {children}
  </table>
));
RankingList.displayName = 'RankingList';

const RankingListHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn('outline-bg-secondary outline rounded', className)} {...props}>
    <tr className={cn("[&>*]:font-display text-label [&>*]:text-body [&>*]:py-3")}>
      <th className='text-center'>#</th>
      <th>Artist</th>
      <th>Change</th>
      <th>NFTs Sold</th>
      <th>Volume</th>
    </tr>
  </thead>
));
RankingListHeader.displayName = 'RankingListHeader';

const RankingListItem = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      '[&>*]:py-3 [&>*:first-child]:w-6',
			tableRowClass,
      className
    )}
    {...props}
  >
    {children}
  </tr>
));
RankingListItem.displayName = 'RankingListItem';

export { RankingList, RankingListHeader, RankingListItem };