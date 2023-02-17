import {
  FdsTypographyHeadingLargeHeading4FontFamily,
  FdsTypographyHeadingLargeHeading4FontSize,
  FdsTypographyHeadingLargeHeading4FontWeight,
  FdsTypographyHeadingLargeHeading4LetterSpacing,
  FdsTypographyHeadingLargeHeading4LineHeight,
  FdsTypographyHeadingSmallHeading4FontFamily,
  FdsTypographyHeadingSmallHeading4FontSize,
  FdsTypographyHeadingSmallHeading4FontWeight,
  FdsTypographyHeadingSmallHeading4LetterSpacing,
  FdsTypographyHeadingSmallHeading4LineHeight,
  FdsTypographyUiHelperFontFamily,
  FdsTypographyUiHelperFontSize,
  FdsTypographyUiHelperFontWeight,
  FdsTypographyUiHelperLetterSpacing,
  FdsTypographyUiHelperLineHeight,
  FdsTypographyUiLabelFontFamily,
  FdsTypographyUiLabelFontSize,
  FdsTypographyUiLabelFontWeight,
  FdsTypographyUiLabelLetterSpacing,
  FdsTypographyUiLabelLineHeight,
} from '@fintraffic-design/coreui-css'
import { css } from 'lit'
import { tokenVar } from './token-utils'

export const uiLabelTextClass = css`
  .ui-label-text {
    font-family: ${tokenVar(FdsTypographyUiLabelFontFamily)};
    font-weight: ${tokenVar(FdsTypographyUiLabelFontWeight)};
    font-size: ${tokenVar(FdsTypographyUiLabelFontSize)};
    line-height: ${tokenVar(FdsTypographyUiLabelLineHeight)};
    letter-spacing: ${tokenVar(FdsTypographyUiLabelLetterSpacing)};
  }
`

export const uiHelperTextClass = css`
  .ui-helper-text {
    font-family: ${tokenVar(FdsTypographyUiHelperFontFamily)};
    font-weight: ${tokenVar(FdsTypographyUiHelperFontWeight)};
    font-size: ${tokenVar(FdsTypographyUiHelperFontSize)};
    line-height: ${tokenVar(FdsTypographyUiHelperLineHeight)};
    letter-spacing: ${tokenVar(FdsTypographyUiHelperLetterSpacing)};
  }
`

export const heading4SmallTextClass = css`
  .heading-4-small-text {
    font-family: ${tokenVar(FdsTypographyHeadingSmallHeading4FontFamily)};
    font-weight: ${tokenVar(FdsTypographyHeadingSmallHeading4FontWeight)};
    font-size: ${tokenVar(FdsTypographyHeadingSmallHeading4FontSize)};
    line-height: ${tokenVar(FdsTypographyHeadingSmallHeading4LineHeight)};
    letter-spacing: ${tokenVar(FdsTypographyHeadingSmallHeading4LetterSpacing)};
  }
`

export const heading4LargeTextClass = css`
  .heading-4-small-text {
    font-family: ${tokenVar(FdsTypographyHeadingLargeHeading4FontFamily)};
    font-weight: ${tokenVar(FdsTypographyHeadingLargeHeading4FontWeight)};
    font-size: ${tokenVar(FdsTypographyHeadingLargeHeading4FontSize)};
    line-height: ${tokenVar(FdsTypographyHeadingLargeHeading4LineHeight)};
    letter-spacing: ${tokenVar(FdsTypographyHeadingLargeHeading4LetterSpacing)};
  }
`
