import { createCn } from '@portfolio/shared-utils';;

export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [{ text: ['h1', 'h2', 'h3', 'h4', 'h5', 'body', 'caption'] }],
    },
  },
});