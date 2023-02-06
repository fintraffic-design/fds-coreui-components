import {
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
    font-style: 'medium';
    font-weight: ${tokenVar(FdsTypographyUiLabelFontWeight)};
    font-size: ${tokenVar(FdsTypographyUiLabelFontSize)};
    line-height: ${tokenVar(FdsTypographyUiLabelLineHeight)};
    letter-spacing: ${tokenVar(FdsTypographyUiLabelLetterSpacing)};
  }
`

export const uiHelperTextClass = css`
  .ui-helper-text {
    font-family: ${tokenVar(FdsTypographyUiHelperFontFamily)};
    font-style: 'medium';
    font-weight: ${tokenVar(FdsTypographyUiHelperFontWeight)};
    font-size: ${tokenVar(FdsTypographyUiHelperFontSize)};
    line-height: ${tokenVar(FdsTypographyUiHelperLineHeight)};
    letter-spacing: ${tokenVar(FdsTypographyUiHelperLetterSpacing)};
  }
`
