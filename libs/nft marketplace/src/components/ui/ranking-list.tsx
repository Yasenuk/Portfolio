import * as React from 'react';
import { cn } from '@portfolio/shared-utils';
import { TRRanckingItem } from '@portfolio/nft marketplace-types';

const rankClass = cn("size-6 md:size-[1.875rem] text-label grid place-items-center text-body");
const rankFilledClass = cn("md:text-text rounded-full md:bg-bg");
const labelClass = cn("text-caption sm:text-body");
const avatarClass = cn("size-6 sm:size-[3.75rem] rounded-full object-cover object-center");

const RankingList = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <table
    ref={ref}
    className={cn('w-full border-separate border-spacing-y-5 text-left', className)}
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
	<thead
		ref={ref}
		className={cn('outline-bg-secondary outline rounded',
			className)}
		{...props}
	>
    <tr className={cn("[&>*]:font-display text-label [&>*]:py-3 [&>*:not(:first-child)]:pr-5")}>
      <th className={cn('pl-5 pr-4')}><span className={cn(rankClass)}>#</span></th>
      <th className={cn('pl-1.5 md:pl-0', labelClass)}>Artist</th>
      <th className={cn('hidden sm:table-cell', labelClass)}>Change</th>
      <th className={cn('hidden md:table-cell', labelClass)}>NFTs Sold</th>
      <th className={cn('', labelClass)}>Volume</th>
    </tr>
  </thead>
));
RankingListHeader.displayName = 'RankingListHeader';

const RankingListItems = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={className}
    {...props}
  />
));
RankingListItems.displayName = 'RankingListItems';

const RankingListItem = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & TRRanckingItem
>(({ className, rank, avatar, artist, change, sold, volume, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
			"[&>*]:bg-bg-secondary [&>*]:font-display [&>*]:text-text [&>*]:py-3 [&>*:not(:first-child)]:pr-5",
			"[&>*:first-child]:bg-bg-secondary [&>*:first-child]:rounded-l [&>*:last-child]:bg-bg-secondary [&>*:last-child]:rounded-r",
      className
    )}
    {...props}
  >
    <td className='pl-5 pr-4 size-6 md:size-[1.875rem]'><span className={cn('', rankClass, rankFilledClass, labelClass)}>{ rank }</span></td>
		<td>
			<div className='w-full flex items-center gap-x-3 md:gap-x-5'>
				<img loading='lazy' className={cn(avatarClass)} src={avatar} alt={artist} />
				<span className={cn("w-full font-sans text-body sm:text-h5 block")}>{artist}</span>
			</div>
		</td>
    <td className='hidden sm:table-cell'><span className={cn("w-20 sm:w-[6.25rem] md:w-[10rem] block text-success", labelClass)}>+{ change }%</span></td>
    <td className='hidden md:table-cell'><span className={cn("w-20 sm:w-[6.25rem] md:w-[10rem] block", labelClass)}>{ sold }</span></td>
    <td><span className={cn("w-20 sm:w-[6.25rem] md:w-[10rem] block", labelClass)}>{ volume } ETH</span></td>
  </tr>
));
RankingListItem.displayName = 'RankingListItem';

export { RankingList, RankingListHeader, RankingListItems, RankingListItem };