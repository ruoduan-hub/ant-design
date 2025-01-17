import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook } from '../../theme';
import {
  getCopiableStyles,
  getEditableStyles,
  getEllipsisStyles,
  getLinkStyles,
  getResetStyles,
  getTitleStyles,
} from './mixins';
import { operationUnit } from '../../style';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  sizeMarginHeadingVerticalStart: number | string;
  sizeMarginHeadingVerticalEnd: number | string;
}

export type TypographyToken = FullToken<'Typography'>;

const genTypographyStyle: GenerateStyle<TypographyToken> = (token) => {
  const { componentCls, sizeMarginHeadingVerticalStart } = token;

  return {
    [componentCls]: {
      color: token.colorText,
      wordBreak: 'break-word',
      lineHeight: token.lineHeight,
      '&&-secondary': {
        color: token.colorTextDescription,
      },

      '&&-success': {
        color: token.colorSuccess,
      },

      '&&-warning': {
        color: token.colorWarning,
      },

      '&&-danger': {
        color: token.colorError,
        'a&:active, a&:focus': {
          color: token.colorErrorActive,
        },
        'a&:hover': {
          color: token.colorErrorHover,
        },
      },

      '&&-disabled': {
        color: token.colorTextDisabled,
        cursor: 'not-allowed',
        userSelect: 'none',
      },

      [`
        div&,
        p
      `]: {
        marginBottom: '1em',
      },

      ...getTitleStyles(token),

      [`
      & + h1&,
      & + h2&,
      & + h3&,
      & + h4&,
      & + h5&
      `]: {
        marginTop: sizeMarginHeadingVerticalStart,
      },

      [`
      div,
      ul,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5`]: {
        [`
        + h1,
        + h2,
        + h3,
        + h4,
        + h5
        `]: {
          marginTop: sizeMarginHeadingVerticalStart,
        },
      },

      ...getResetStyles(),

      ...getLinkStyles(token),

      // Operation
      [`
        ${componentCls}-expand,
        ${componentCls}-edit,
        ${componentCls}-copy
      `]: {
        ...operationUnit(token),
        marginInlineStart: token.marginXXS,
      },

      ...getEditableStyles(token),

      ...getCopiableStyles(token),

      ...getEllipsisStyles(),

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Typography', (token) => [genTypographyStyle(token)], {
  sizeMarginHeadingVerticalStart: '1.2em',
  sizeMarginHeadingVerticalEnd: '0.5em',
});
